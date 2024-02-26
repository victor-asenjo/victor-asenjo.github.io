import React from "react";

import { GiEasterEgg } from "react-icons/gi";
import { IoIosFingerPrint } from "react-icons/io";


const Footer = () => {
  return (
    <div id="works" className=" mx-auto m-auto h-[300px]  mt-16 sm:h-[250px]">
      <div className=" bg-yellow-400 h-full flex flex-col gap-8 items-center justify-between p-10 sm:p-7">
        
        <div className="sm:text-[12px]">
          | Copyright &copy; <span>2024 Víctor Asenjo Carvajal -</span> All rights reserved
          <a href="#"></a> |
          <a 
          data-aos="fade-up" data-aos-duration="1400"

            href="https://linktr.ee/victorasenjo"
            target="_blank" 
            className="box font-medium text-white  flex items-center justify-center flex-col"
          >
            <GiEasterEgg className=" text-black text-3xl hover:scale-125 cursor-pointer" />
          </a>
          <a 
          data-aos="fade-up" data-aos-duration="1400"

            href="https://victor-asenjo.github.io/code-blog/"
            target="_blank" 
            className="box font-medium text-white  flex items-center justify-center flex-col"
          >
            <IoIosFingerPrint className=" text-black text-3xl hover:scale-125 cursor-pointer" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
