import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, useTexture, AccumulativeShadows, RandomizedLight, Decal, Environment, Center } from '@react-three/drei'
import { easing } from 'maath'
import { useSnapshot } from 'valtio'
import { state } from './store'
import * as THREE from 'three'

export const App = ({ position = [0, 0, 1.75], fov = 80 }) => {
  const snap = useSnapshot(state);

  return (
    <>
      {snap.show3DAsset && (
        <Canvas 
          shadows 
          camera={{ position, fov }} 
          gl={{ preserveDrawingBuffer: true }} 
          eventSource={document.getElementById('root')} 
          eventPrefix="client"
          style={{backgroundColor: "#f3f3f3"}}>
          <ambientLight intensity={1.0} />
          <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/potsdamer_platz_1k.hdr" />
          <CameraRig>
            <Backdrop />
            <Center>
              <Book />
            </Center>
          </CameraRig>
        </Canvas>
      )}
    </>
  );
}

function Backdrop() {
  const shadows = useRef()
  useFrame((state, delta) => easing.dampC(shadows.current.getMesh().material.color, state.color, 0.25, delta))
  return (
    <AccumulativeShadows ref={shadows} temporal frames={60} alphaTest={0.85} scale={20} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.14]}>
      <RandomizedLight amount={4} radius={9} intensity={0.5} ambient={0.5} position={[5, 5, -10]} />
      <RandomizedLight amount={4} radius={5} intensity={0.25} ambient={1.0} position={[-5, 5, -9]} />
    </AccumulativeShadows>
  )
}

function CameraRig({ children }) {
  const group = useRef()
  const snap = useSnapshot(state)
  useFrame((state, delta) => {
    easing.damp3(state.camera.position, [snap.intro ? -state.viewport.width / 4 : 0, 0, 2], 0.25, delta)
    easing.dampE(group.current.rotation, [state.pointer.y / 10, -state.pointer.x / 5, 0], 0.25, delta)
  })
  return <group ref={group}>{children}</group>
}

function Book(props) {
  const { nodes, materials } = useGLTF('/book.glb')

  const materialProps = {
    roughness: 0.6, 
    metalness: 0.2,
    envMapIntensity: 2.0,
    normalScale: [1, 1],
    aoMapIntensity: 1.0
  }

  return (
    <mesh
      castShadow
      geometry={nodes.defaultMaterial.geometry}
      material={
        new THREE.MeshStandardMaterial({
          map: materials.DefaultMaterial.map,
          color: materials.DefaultMaterial.color,
          roughness: materialProps.roughness,
          metalness: materialProps.metalness,
          normalScale: new THREE.Vector2(...materialProps.normalScale),
          aoMapIntensity: materialProps.aoMapIntensity,
          envMapIntensity: materialProps.envMapIntensity
        })
      }
      rotation={[Math.PI / 2, 0, 0]}
      {...props}
      dispose={null}
    >
    </mesh>
  )
}

useGLTF.preload('/book.glb');
