import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { RiSendPlaneFill } from "react-icons/ri";
import { LINKS } from "../../data/links"; // Importa las constantes de los enlaces
import { FaTelegramPlane } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { RiInstagramFill } from "react-icons/ri";
import { SiGmail } from "react-icons/si";

const Contact = () => {
  return (
    <div id="contact" className="container m-auto mt-16">
      {/* heading */}
      <div
        // data-aos="fade-up"
        className="relative mb-5">
        <h3 className=" text-3xl font-black text-gray-400 sm:text-2xl">
          Contact
        </h3>
        <span className="h-[1.1px] right-0 absolute w-[92%] bg-gray-300 block"></span>

      </div>

      <div className=" h-full flex flex-col gap-8 items-center justify-between p-10 sm:p-7">
        <h2
          data-aos="zoom-out"
          className=" font-bold text-5xl sm:text-3xl">Let's Talk</h2>
        <div className=" flex items-center justify-center gap-8 sm:gap-5">
          <a
            data-aos="fade-up" data-aos-duration="1000"

            href={LINKS.email}
            target="_blank"
            className="box font-medium flex items-center justify-center flex-col"
          >
            <SiGmail className=" text-black text-3xl hover:scale-125 cursor-pointer" />
            <p>Mail</p>
          </a>
          <a
            data-aos="fade-up" data-aos-duration="1000"

            href={LINKS.telegram}
            target="_blank"
            className="box font-medium flex items-center justify-center flex-col"
          >
            <FaTelegramPlane className=" text-black text-3xl hover:scale-125 cursor-pointer" />
            <p>Telegram</p>
          </a>
          {/*}
          <a 
          data-aos="fade-up" data-aos-duration="1200"

            href=""
            className="box font-medium text-white  flex items-center justify-center flex-col"
          >
            <IoLogoWhatsapp className=" text-black text-3xl hover:scale-125 cursor-pointer" />
            <p>WhatsApp</p>
          </a>
  */}
          <a
            data-aos="fade-up" data-aos-duration="1400"

            href={LINKS.instagram}
            target="_blank"
            className="box font-medium flex items-center justify-center flex-col"
          >
            <RiInstagramFill className=" text-black text-3xl hover:scale-125 cursor-pointer" />
            <p>Instagram</p>
          </a>
        </div>
      </div>




    </div>
  );
};

export default Contact;
