import React, { useRef, useEffect } from "react";
import $ from "jquery";
import "turn.js";

const TurnBook = ({ options, className, style, turnContainerRef }) => {
  const turnContainer = turnContainerRef || useRef(null);

  useEffect(() => {
    if (turnContainer.current) {
      const preloadImages = () => {
        const imageUrls = [
          "./cover.png",
          "./01.png",
          "./02.png",
          "./03.png",
          "./04.png",
          "./05.png",
          "./06.png",
          "./07.png",
          "./08.png",
          "./09.png",
          "./10.png"
        ];

        preloadImages();

        imageUrls.forEach((imageUrl) => {
          const img = new Image();
          img.src = imageUrl;
        });
      };

      const flipbookOptions = Object.assign({}, options, {
        display: 'double',
        autoCenter: true,
        width: 1066.6666666667,
        height: 800,
        page: 2,
      });

      $(turnContainer.current).turn(flipbookOptions);

      $(turnContainer.current).bind("turning", function(event, page) {
        if (page === 1)
          event.preventDefault();
      });

      $(turnContainer.current).bind("start", function(event, pageObject) {
        if (pageObject.page === 1)
          event.preventDefault();
      });
    }
  }, [options]);

  return (
    <div className={className} style={style} ref={turnContainer}>
      <div className="page">
        <img src="./cover.png" alt="Book Cover" />
      </div>
      <div className="page">
        <img src="./01.png" alt="About the Book Cover" />
      </div>
      <div className="page">
        <img src="./02.png" alt="About the Book" />
      </div>
      <div className="page">
        <img src="./03.png" alt="About the Authors Cover" />
      </div>
      <div className="page">
        <img src="./04.png" alt="About the Authors" />
      </div>
      <div className="page">
        <img src="./05.png" alt="Excerpts Cover" />
      </div>
      <div className="page">
        <img src="./06.png" alt="Excerpts" />
      </div>
      <div className="page">
        <img src="./07.png" alt="Reviews Cover" />
      </div>
      <div className="page">
        <img src="./08.png" alt="Reviews" />
      </div>
      <div className="page">
        <img src="./09.png" alt="Contacts Cover" />
      </div>
      <div className="page" style={{ position: "relative", backgroundImage: "url('./10.png')", backgroundSize: "cover", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ padding: "20px", backgroundColor: "#F5F3EF" }}>
          <h1 style={{ color: "#5C5C5C" }}>PAUL’S CONTACTS</h1>
          <p><strong style={{ color: "#5C5C5C", marginRight: "10px" }}>EMAIL</strong> <a href="mailto:pkowalski@teladochealth.com" style={{ color: "#454545", textDecoration: "underline" }}>pkowalski@teladochealth.com</a></p>
          <p><strong style={{ color: "#5C5C5C", marginRight: "10px" }}>FACEBOOK</strong> <a href="https://www.facebook.com/paul.kowalski.9400" target="_blank" style={{ color: "#454545", textDecoration: "underline" }}>Paul Kowalski</a></p>
          <p><strong style={{ color: "#5C5C5C", marginRight: "10px" }}>LINKEDIN</strong> <a href="https://www.linkedin.com/in/paul-kowalski-110b672/" target="_blank" style={{ color: "#454545", textDecoration: "underline" }}>Paul Kowalski</a></p>

          <h1 style={{ marginTop: "40px", color: "#5C5C5C" }}>GAYLE’S CONTACTS</h1>
          <p><strong style={{ color: "#5C5C5C", marginRight: "10px" }}>PERSONAL FACEBOOK</strong> <a href="https://www.facebook.com/gayle.suzanne.7" target="_blank" style={{ color: "#454545", textDecoration: "underline" }}>Gayle Suzanne</a></p>
          <p><strong style={{ color: "#5C5C5C", marginRight: "10px" }}>COACHING FACEBOOK</strong> <a href="https://www.facebook.com/profile.php?id=100063562331331" target="_blank" style={{ color: "#454545", textDecoration: "underline" }}>Gayle Suzanne Coaching</a></p>
          <p><strong style={{ color: "#5C5C5C", marginRight: "10px" }}>WEBSITE</strong> <a href="https://gaylesuzanne.com/" target="_blank" style={{ color: "#454545", textDecoration: "underline" }}>Gayle Suzanne Coaching</a></p>
          <p><strong style={{ color: "#5C5C5C", marginRight: "10px" }}>YOUTUBE</strong> <a href="https://www.youtube.com/channel/UCt6xUvIXCMvjADznBNdRu-A" target="_blank" style={{ color: "#454545", textDecoration: "underline" }}>Gayle Suzanne Coaching</a></p>
          <p><strong style={{ color: "#5C5C5C", marginRight: "10px" }}>TWITTER</strong> <a href="https://twitter.com//gaylesuzanne" target="_blank" style={{ color: "#454545", textDecoration: "underline" }}>Gayle Suzanne</a></p>
        </div>
      </div>
    </div>
  );
};

export default TurnBook;

import React, { useRef, useEffect } from "react";
import $ from "jquery";
import "turn.js";

const TurnBook = ({ options, className, style, turnContainerRef }) => {
  const turnContainer = turnContainerRef || useRef(null);

  useEffect(() => {
    if (turnContainer.current) {
      // Function to preload images
      const preloadImages = () => {
        const imageUrls = [
          "./cover.png",
          "./01.png",
          "./02.png",
          "./03.png",
          "./04.png",
          "./05.png",
          "./06.png",
          "./07.png",
          "./08.png",
          "./09.png",
          "./10.png"
        ];

        imageUrls.forEach((imageUrl) => {
          const img = new Image();
          img.src = imageUrl;
        });
      };

      // Preload images when component mounts
      preloadImages();

      const flipbookOptions = {
        display: 'double',
        autoCenter: true,
        width: 1066.6666666667,
        height: 800,
        page: 2,
        ...options
      };

      $(turnContainer.current).turn(flipbookOptions);

      $(turnContainer.current).bind("turning", function(event, page) {
        if (page === 1)
          event.preventDefault();
      });

      $(turnContainer.current).bind("start", function(event, pageObject) {
        if (pageObject.page === 1)
          event.preventDefault();
      });
    }
  }, [options]);

  return (
    <div className={className} style={style} ref={turnContainer}>
      <div className="page">
        <img src="./cover.png" alt="Book Cover" />
      </div>
      <div className="page">
        <img src="./01.png" alt="About the Book Cover" />
      </div>
      <div className="page">
        <img src="./02.png" alt="About the Book" />
      </div>
      <div className="page">
        <img src="./03.png" alt="About the Authors Cover" />
      </div>
      <div className="page">
        <img src="./04.png" alt="About the Authors" />
      </div>
      <div className="page">
        <img src="./05.png" alt="Excerpts Cover" />
      </div>
      <div className="page">
        <img src="./06.png" alt="Excerpts" />
      </div>
      <div className="page">
        <img src="./07.png" alt="Reviews Cover" />
      </div>
      <div className="page">
        <img src="./08.png" alt="Reviews" />
      </div>
      <div className="page">
        <img src="./09.png" alt="Contacts Cover" />
      </div>
      <div className="page" style={{ position: "relative", backgroundImage: "url('./10.png')", backgroundSize: "cover", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ padding: "20px", backgroundColor: "#F5F3EF" }}>
          <h1 style={{ color: "#5C5C5C" }}>PAUL’S CONTACTS</h1>
          <p><strong style={{ color: "#5C5C5C", marginRight: "10px" }}>EMAIL</strong> <a href="mailto:pkowalski@teladochealth.com" style={{ color: "#454545", textDecoration: "underline" }}>pkowalski@teladochealth.com</a></p>
          <p><strong style={{ color: "#5C5C5C", marginRight: "10px" }}>FACEBOOK</strong> <a href="https://www.facebook.com/paul.kowalski.9400" target="_blank" style={{ color: "#454545", textDecoration: "underline" }}>Paul Kowalski</a></p>
          <p><strong style={{ color: "#5C5C5C", marginRight: "10px" }}>LINKEDIN</strong> <a href="https://www.linkedin.com/in/paul-kowalski-110b672/" target="_blank" style={{ color: "#454545", textDecoration: "underline" }}>Paul Kowalski</a></p>

          <h1 style={{ marginTop: "40px", color: "#5C5C5C" }}>GAYLE’S CONTACTS</h1>
          <p><strong style={{ color: "#5C5C5C", marginRight: "10px" }}>PERSONAL FACEBOOK</strong> <a href="https://www.facebook.com/gayle.suzanne.7" target="_blank" style={{ color: "#454545", textDecoration: "underline" }}>Gayle Suzanne</a></p>
          <p><strong style={{ color: "#5C5C5C", marginRight: "10px" }}>COACHING FACEBOOK</strong> <a href="https://www.facebook.com/profile.php?id=100063562331331" target="_blank" style={{ color: "#454545", textDecoration: "underline" }}>Gayle Suzanne Coaching</a></p>
          <p><strong style={{ color: "#5C5C5C", marginRight: "10px" }}>WEBSITE</strong> <a href="https://gaylesuzanne.com/" target="_blank" style={{ color: "#454545", textDecoration: "underline" }}>Gayle Suzanne Coaching</a></p>
          <p><strong style={{ color: "#5C5C5C", marginRight: "10px" }}>YOUTUBE</strong> <a href="https://www.youtube.com/channel/UCt6xUvIXCMvjADznBNdRu-A" target="_blank" style={{ color: "#454545", textDecoration: "underline" }}>Gayle Suzanne Coaching</a></p>
          <p><strong style={{ color: "#5C5C5C", marginRight: "10px" }}>TWITTER</strong> <a href="https://twitter.com//gaylesuzanne" target="_blank" style={{ color: "#454545", textDecoration: "underline" }}>Gayle Suzanne</a></p>
        </div>
      </div>
    </div>
  );
};

export default TurnBook;
