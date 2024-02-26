import React from "react";
import PhotoCarousel from "../carousel/PhotoCarousel";

const About = ({ darkMode }) => {
  return (
    <div id="about">
      <div className=" container m-auto  mt-16">
        {/* heading */}
        <div data-aos="fade-up" className="relative mb-5">
          <h3 className=" text-3xl font-black text-gray-400 sm:text-2xl">
            About Me
          </h3>
          <span className="h-[1.1px] right-0 absolute w-[90%] bg-gray-300 block"></span>
        </div>
        {/* content*/}
        <div className="flex md:flex-col ">
          <div className="left flex-1 w-full">
            {/* left box */}
            <div
              data-aos="zoom-in"
              className="progress flex items-center h-[100%] justify-center md:justify-center flex-col" // Agregar clase flex-col para que los elementos se apilen verticalmente
            >
              <div className="text-container"> {/* Crear un contenedor para el texto */}
                <h4 className="text-2xl font-black text-gray-400 sm:text-2xl mb-2">Goals</h4> {/* Agregar margen inferior al título */}
                <p
                  data-aos="fade-up"
                  className="text-gray-700 font-medium w-full mb-6" // Agregar margen inferior al párrafo
                >
                  As a software engineer, my professional goals include working in a leading company
                  that develops advanced and innovative technologies, where I would have the opportunity to hold a position
                  that allows me to apply and expand my technical knowledge and skills in software development.
                  Additionally, I seek to be part of a highly collaborative team that fosters idea exchange and creativity
                  to tackle complex technical challenges in challenging and high-complexity projects. With a focus on
                  implementing agile development practices to improve speed and efficiency in delivering results, I am also
                  interested in participating in training and professional development programs to achieve continuous growth
                  in the field of technology. In the long term, my goal is to be a computer engineer with high value based
                  on experience and training, while contributing to the development of projects that have a positive impact
                  on society or provide meaningful solutions for users.
                </p>
              </div>
              <div className="text-container"> {/* Crear un contenedor para el texto */}
                <h4 className="text-2xl font-black text-gray-400 sm:text-2xl mb-2">What I Do ?</h4> {/* Agregar margen inferior al título */}
                <p
                  data-aos="fade-up"
                  className="text-gray-700 font-medium w-full" // Eliminar el margen inferior del último párrafo
                >
                  Hi, I'm Víctor Asenjo, a passionate software engineer from Catalonia, Spain. My
                  passion for software lies with dreaming up ideas and making them come true with elegant interfaces. I pay
                  great attention to details, architecture, and its impact, as well as the code quality of the things I
                  build. I would love to end up being a full-stack developer.
                  In my free time, I enjoy giving university classes, sharing my knowledge and experiences with students.
                  Being a university teacher, allows me to stay engaged with the latest advancements in my field and fosters
                  a sense of fulfillment in contributing to the education and development of the next generation of learners
                  and professionals. Additionally, I am a youth leisure and free time monitor, I am a basketball referee
                  (also wheelchair basketball).
                </p>
              </div>
            </div>
          </div>

          {/* right box */}
          <div className="right relative flex-1 flex flex-wrap p-5 gap-10 items-center justify-center sm:w-full">
            <div className="first2 flex flex-col gap-10">

              <PhotoCarousel />


            </div>
          </div>
        </div>

        {/* icons */}
        {/* <div
          data-aos="fade-up"
          data-aos-duration="1200"
          className=" container m-auto flex items-center justify-center mt-8 gap-8 md:gap-5"
        >
          <img
            className="w-[40px] h-[40px] md:w-[35px] md:h-[35px]"
            src="https://img.icons8.com/ios-filled/50/null/c-plus-plus-logo.png"
          />

          <img
            className="w-[40px] h-[40px] md:w-[35px] md:h-[35px]"
            src="https://img.icons8.com/color/48/null/python--v1.png"
          />
          <img
            className="w-[40px] h-[40px] md:w-[35px] md:h-[35px]"
            src="https://img.icons8.com/ios/50/null/react-native--v1.png"
          />

          <img
            className="w-[40px] h-[40px] md:w-[35px] md:h-[35px]"
            src="https://img.icons8.com/color/48/null/sass.png"
            />
          <img
            className="w-[40px] h-[40px] md:w-[35px] md:h-[35px]"
            src="https://img.icons8.com/ios-filled/50/null/git.png"
            />
            <img
              className="w-[40px] h-[40px] md:w-[35px] md:h-[35px]"
              src="https://img.icons8.com/windows/50/null/sass--v1.png"
            />
          <img
            className="w-[40px] h-[40px] md:w-[35px] md:h-[35px]"
            src="https://img.icons8.com/color/48/null/c-plus-plus-logo.png"
          />
          <img
            className="w-[40px] h-[40px] md:w-[35px] md:h-[35px]"
            src="https://img.icons8.com/ios-filled/50/null/python.png"
          />
          <img className="w-[40px] h-[40px] md:w-[35px] md:h-[35px]" src="https://img.icons8.com/color/48/null/javascript--v1.png"/>
          <img className="w-[40px] h-[40px] md:w-[35px] md:h-[35px]" src="https://img.icons8.com/color/48/null/nodejs.png"/>
          <img className="w-[40px] h-[40px] md:w-[35px] md:h-[35px]" src="https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/24/null/external-mongodb-a-cross-platform-document-oriented-database-program-logo-shadow-tal-revivo.png"/>
        </div> */}
      </div>
    </div>
  );
};

export default About;
