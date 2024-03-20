import React from "react";
import ProgressBar from "../../chip/ProgressBar";
import SkillBox from "../../chip/SkillBox";

import { IoLogoHtml5, IoLogoCss3 } from "react-icons/io";
import { SiJavascript, SiRubyonrails, SiMongodb, SiExpress, SiSpring, SiPython, SiMysql, SiGit } from "react-icons/si";
import { GrCode } from "react-icons/gr";
import { FaReact, FaPython } from "react-icons/fa";
import { IoLogoNodejs } from "react-icons/io";
import { SiFlutter, SiCplusplus, SiSpringboot } from "react-icons/si";
import { GrJava, GrMysql } from "react-icons/gr";
import { FaCode } from "react-icons/fa";




const Skills = ({ darkMode }) => {
  return (
    <div id="skills">
      <div className="container m-auto mt-16">
        {/* heading */}
        <div data-aos="fade-up" className="relative mb-5">
          <h3 className="text-3xl font-black text-gray-400 sm:text-2xl">
            My Skills
          </h3>
          <span className="h-[1.1px] right-0 absolute w-[90%] bg-gray-300 block"></span>
        </div>
        {/* content*/}
        <div className="flex md:flex-col ">
          <div className="left flex-1 w-full">
            <p
              data-aos="fade-up"
              className="text-gray-700 font-medium w-[100%]"
            >
              Here are my skills.
            </p>
            {/* left box */}
            <div
              data-aos="zoom-in"
              className="progress flex items-center h-[100%] justify-end md:justify-center"
            >
              <div className="flex flex-col gap-6 w-3/4 my-5 md:w-[90%]">
                <ProgressBar logo={<IoLogoHtml5 />} name={"HTML"} value={70} />
                <ProgressBar logo={<IoLogoCss3 />} name={"CSS"} value={60} />
                <ProgressBar
                  logo={<SiJavascript />}
                  name={"JavaScript"}
                  value={70}
                />
                <ProgressBar logo={<FaReact />} name={"React Js"} value={70} />
                
                <ProgressBar
                  logo={<SiCplusplus />}
                  name={"C++"}
                  value={90}
                />
                
                <ProgressBar
                  logo={<SiFlutter />}
                  name={"Flutter"}
                  value={90}
                />
                
                <ProgressBar
                  logo={<SiMongodb />}
                  name={"MongoDB"}
                  value={80}
                />
                
                <ProgressBar
                  logo={<GrJava />}
                  name={"Java"}
                  value={90}
                />
                <ProgressBar
                  logo={<SiSpring />}
                  name={"Spring"}
                  value={90}
                />
                <ProgressBar
                  logo={<GrMysql />}
                  name={"SQL"}
                  value={90}
                />
                <ProgressBar
                  logo={<FaPython />}
                  name={"Python"}
                  value={90}
                />
                <ProgressBar
                  logo={<SiRubyonrails />}
                  name={"Ruby on Rails"}
                  value={60}
                />
                <ProgressBar
                  logo={<SiGit />}
                  name={"Git & GitHub"}
                  value={80}
                />                
              </div>
            </div>
          </div>
          {/* right box */}
          <div className="right relative flex-1 flex flex-wrap p-5 gap-10 items-center justify-center sm:w-full">
            <div className="first2 flex flex-col gap-10">
              <SkillBox
                logo={<SiPython />}
                black={"white"}
                white={"black"}
                skill={"Python"}
              />
              <SkillBox
                logo={<SiMysql />}
                black={"white"}
                white={"black"}
                skill={"MySQL"}
              />
            </div>
            <div className="last2 flex flex-col gap-10">
              <SkillBox
                logo={<SiFlutter />}
                black={"black"}
                white={"white"}
                skill={"Flutter"}
              />
              <SkillBox
                className=""
                logo={
                  <SiCplusplus/>
                }
                black={"black"}
                white={"white"}
                skill={"C++"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
