import React from "react";
import { BsGithub, BsInstagram } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";

const SocialMedia = () => {
  return (
    <div className="app__social">
      <a href="https://github.com/ilija-mihajlovic">
        <div>
          <BsGithub />
        </div>
      </a>
      <a href="https://www.facebook.com/profile.php?id=100078007479488">
        <div>
          <FaFacebookF />
        </div>
      </a>
      <a href="https://www.instagram.com/ilija_mihajlovic230">
        <div>
          <BsInstagram />
        </div>
      </a>
    </div>
  );
};

export default SocialMedia;
