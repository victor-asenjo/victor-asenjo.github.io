import React from "react";
import { GiEasterEgg } from "react-icons/gi";
import { IoIosFingerPrint } from "react-icons/io";

const Footer = () => {
  return (
    <div id="works" className="bg-yellow-400 py-8">
      <div className="container mx-auto flex items-center justify-between">
        <p className="text-xs">
          | Copyright &copy; <span>2024 Víctor Asenjo Carvajal -</span> All rights reserved |
        </p>
        <div className="flex gap-4">
          <a
            data-aos="fade-up"
            data-aos-duration="1400"
            href="https://linktr.ee/victorasenjo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black text-3xl hover:scale-125 cursor-pointer"
          >
            <GiEasterEgg />
          </a>
          <a
            data-aos="fade-up"
            data-aos-duration="1400"
            href="https://victor-asenjo.github.io/code-blog/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black text-3xl hover:scale-125 cursor-pointer"
          >
            <IoIosFingerPrint />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
