import { proxy } from 'valtio'

const state = proxy({
  intro: true,
  color: '#444',
  show3DAsset: true,
  showHTMLFlipBook: false,
})

export { state }
