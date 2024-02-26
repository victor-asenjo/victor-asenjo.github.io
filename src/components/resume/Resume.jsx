import React from "react";

const Resume = () => {
  return (
    <div id="resume" className=" container m-auto   mt-16">
      {/* heading */}
      <div data-aos="fade-up" className="relative mb-5">
        <h3 className=" text-3xl font-black text-gray-400 sm:text-2xl">
          Resume
        </h3>
        <span className="h-[1.1px] right-0 absolute w-[92%] bg-gray-300 block"></span>
      </div>
      <div data-aos="fade-up" className="left flex-1 w-full">
        <p className=" text-gray-700 font-medium w-[100%]">
          Here are my experiences and qualifications.
        </p>
      </div>
      {/* card*/}
      <div className="card-wrapper w-[90%] sm:w-full mt-5 flex md:flex-col sm:gap-5 mx-auto">
  <div className="left flex-1 flex items-center justify-center">
    <fieldset
      data-aos="zoom-in"
      className="w-[80%] p-5 py-12 sm:py-8 sm:w-full sm:p-2"
    >
      <legend className="w-auto ml-[50%] translate-x-[-50%] border-2 border-gray-200 rounded-3xl py-1 px-8 font-semibold text-xl text-yellow-500">
        Experience
      </legend>
      <div className="relative">
        {/* design */}
        <div className="design flex absolute left-[-150px] top-1/2 items-center rotate-[90deg] sm:left-[-160px] ">
          <div className="c1 w-[12px] h-[12px] rounded-full bg-white border-2 border-yellow-500"></div>
          <div className="line w-[230px] bg-gray-300 h-[2px] sm:w-[250px]"></div>
          <div className="c2 w-[12px] h-[12px] rounded-full bg-white border-2 border-yellow-500"></div>
        </div>
        {/* design */}
        <div className="flex flex-col gap-1 sm:gap-1 border-2 border-yellow-400 shadow-[0px_0px_16px_1px_rgba(0,0,0,0.1)] p-3 rounded-lg">
          {/* Experience 9 */}
          <h1 className="text-[1.4rem] font-semibold sm:text-xl">
            Software Engineer
          </h1>
          <span className="text-[.9rem] font-semibold text-gray-500 sm:text-base">
            Oracle Health
          </span>
          <span className="text-[.9rem] font-semibold text-yellow-500 sm:text-base">
            December 2023 - Present
          </span>
          <p className="text-[.9rem] text-justify break-words text-gray-500">
            As a Software Engineer at Oracle Health, I am part of the International Support team, contributing to Oracle's mission of creating a human-centric healthcare experience powered by unified global data. In this dynamic role, I work collaboratively in a team environment to provide functional and technical expertise to our clients, specializing in custom code development and maintenance. My responsibilities extend to overseeing broad custom code design, ensuring code quality, and making critical architecture decisions. I play a key role in developing long-term technical roadmaps for custom products, driving innovation and staying abreast of emerging technologies. Performing software risk analysis and implementing effective mitigation strategies are integral aspects of my role, contributing to the reliability and security of our healthcare solutions.
          </p>
          <p></p>
          {/* Experience 8 */}
          <h1 className="text-[1.4rem] font-semibold sm:text-xl">
            Associate University Professor
          </h1>
          <span className="text-[.9rem] font-semibold text-gray-500 sm:text-base">
            Polytechnic University of Catalonia (UPC)
          </span>
          <span className="text-[.9rem] font-semibold text-yellow-500 sm:text-base">
            September 2023 - Present
          </span>
          <p className="text-[.9rem] text-justify break-words text-gray-500">
          As an Associate University Professor, I teach the course "Project
                          of Software Engineering" at the Faculty of Informatics, Polytechnic University of Catalonia,
                          Barcelona. This course focuses on the management and development of real software
                          projects.

                          Throughout the course, students have the opportunity to apply their previous knowledge in a
                          practical environment, working in multidisciplinary teams and addressing all stages of a
                          software project, from conception to implementation. Emphasis is placed on efficient project
                          management, effective communication, and the application of best practices in software
                          engineering.
                          </p>
                          <p></p>
          {/* Experience 7 */}
          <h1 className="text-[1.4rem] font-semibold sm:text-xl">
            Wheelchair basketball national referee
          </h1>
          <span className="text-[.9rem] font-semibold text-gray-500 sm:text-base">
            Federación Española de Deportes de Personas con Discapacidad Física (FEDDF)
          </span>
          <span className="text-[.9rem] font-semibold text-yellow-500 sm:text-base">
            2023 - Present
          </span>
          <p className="text-[.9rem] text-justify break-words text-gray-500">
          I started refereeing wheelchair basketball in 2023 to learn and
                          contribute to the exciting world of adaptive sports. As a referee for the Federación Española
                          de Deportes de Personas con Discapacidad Física (FEDDF), I officiate games at various levels,
                          ensuring fair play and enforcing the rules of wheelchair basketball. Being a part of the FEDDF
                          allows me to support the development of wheelchair basketball and empower athletes with
                          physical disabilities in their pursuit of competitive excellence.
                          </p>
                          <p></p>
          {/* Experience 6 */}
          <h1 className="text-[1.4rem] font-semibold sm:text-xl">
            Research and Development Support Staff (R&D)
          </h1>
          <span className="text-[.9rem] font-semibold text-gray-500 sm:text-base">
            Polytechnic University of Catalonia (UPC)
          </span>
          <span className="text-[.9rem] font-semibold text-yellow-500 sm:text-base">
            January 2023 - November 2023
          </span>
          <p className="text-[.9rem] text-justify break-words text-gray-500">
          Research support staff in the DTIM research group at the Universitat
                          Politècnica de Catalunya (UPC) assist with research in various areas of data and information
                          management, with a focus on the complete lifecycle of data and information within
                          data-intensive systems. Their research interests include big data management, graph data
                          management, distributed data storage, parallel data processing, data governance, data
                          integration, data analysis, DataOps/MLOps, and business intelligence. The DTIM research group
                          is a subgroup of the inSSIDE research group and is primarily comprised of members from the
                          ESSI department at UPC.
                          </p>
          {/* Experience 5 */}
          <h1 className="text-[1.4rem] font-semibold sm:text-xl">
            Internships - Data Analyst
          </h1>
          <span className="text-[.9rem] font-semibold text-gray-500 sm:text-base">
            SDG group
          </span>
          <span className="text-[.9rem] font-semibold text-yellow-500 sm:text-base">
            2022 - 2023
          </span>
          <p className="text-[.9rem] text-justify break-words text-gray-500">
            During my internship at SDG group, I gained hands-on experience in software development methodologies and practices. I assisted senior developers in designing and implementing software solutions, participating in all stages of the development lifecycle. I collaborated with cross-functional teams to analyze requirements, develop prototypes, and conduct testing to ensure product quality. Through this experience, I developed proficiency in programming languages such as Java and Python, as well as database technologies like SQL. Additionally, I honed my problem-solving skills and learned to adapt to fast-paced environments, laying a solid foundation for my career in software engineering.
          </p>

          {/* Experience 4 */}
          <h1 className="text-[1.4rem] font-semibold sm:text-xl">
          Monitor and animator of children's and youth activities
          </h1>
          <span className="text-[.9rem] font-semibold text-gray-500 sm:text-base">
          Fundesplai; Fundació Cellnex;
          </span>
          <span className="text-[.9rem] font-semibold text-yellow-500 sm:text-base">
            Summer 2022
          </span>
          <p className="text-[.9rem] text-justify break-words text-gray-500">
          During the summer of 2022 I was in a TIC summer camp energizing,
                          organizing and directing children's and youth leisure activities.</p>

          {/* Experience 3 */}
          <h1 className="text-[1.4rem] font-semibold sm:text-xl">
          Monitor and animator of children's and youth activities
          </h1>
          <span className="text-[.9rem] font-semibold text-gray-500 sm:text-base">
          Fundesplai; Xanascat; Generalitat de Catalunya;
          </span>
          <span className="text-[.9rem] font-semibold text-yellow-500 sm:text-base">
          Summer 2021
          </span>
          <p className="text-[.9rem] text-justify break-words text-gray-500">
          During the summer of 2021 I was in several summer camps energizing,
                        organizing and directing children's and youth leisure activities of ingenuity and technology.
                      </p>


          {/* Experience 2 */}
          <h1 className="text-[1.4rem] font-semibold sm:text-xl">
          Basketball Referee
          </h1>
          <span className="text-[.9rem] font-semibold text-gray-500 sm:text-base">
          Federació Catalana de Basquetbol (FCBQ)
          </span>
          <span className="text-[.9rem] font-semibold text-yellow-500 sm:text-base">
          2019 - Present
          </span>
          <p className="text-[.9rem] text-justify break-words text-gray-500">
          Since 2019 I'm a basketball referee on weekends.</p>
                        


          {/* Experience 1 */}
          <h1 className="text-[1.4rem] font-semibold sm:text-xl">
            Basketball Point Scorer
          </h1>
          <span className="text-[.9rem] font-semibold text-gray-500 sm:text-base">
          Federació Catalana de Basquetbol (FCBQ)
          </span>
          <span className="text-[.9rem] font-semibold text-yellow-500 sm:text-base">
          2017 - 2023
          </span>
          <p className="text-[.9rem] text-justify break-words text-gray-500">
          In 2017, I started in the refereeing world by keeping track of points,
                          fouls, time... the game record for basketball matches. In 2019, I began refereeing from the
                          court, and in 2023, after three seasons in state competitions, I decided to fully commit to
                          being a court referee.</p>
        </div>
      </div>
    </fieldset>
  </div>





        <div className="right flex-1 flex items-center justify-center">
          <fieldset
            data-aos="zoom-in"
            className=" w-[80%] p-5 py-12 sm:py-8 sm:w-full sm:p-2"
          >
            <legend className=" w-auto ml-[50%] translate-x-[-50%] border-2 border-gray-200 rounded-3xl py-1 px-8 font-semibold text-xl text-yellow-500">
              Education
            </legend>
            <div className=" relative">
              {/* design */}
              <div className="design flex absolute left-[-150px] top-1/2 items-center rotate-[90deg] sm:left-[-160px] ">
                <div className="c1 w-[12px] h-[12px] rounded-full bg-white border-2 border-yellow-500"></div>
                <div className="line w-[230px] bg-gray-300 h-[2px] sm:w-[250px]"></div>
                <div className="c2 w-[12px] h-[12px] rounded-full bg-white border-2 border-yellow-500"></div>
              </div>
              {/* design */}
              <div className=" flex flex-col gap-1 border-2 border-yellow-400 shadow-[0px_0px_16px_1px_rgba(0,0,0,0.1)] p-3 rounded-lg">
                <h1 className="text-[1.4rem] font-semibold sm:text-xl">
                  B.Tech, Computer Science
                </h1>
                <span className=" text-[.9rem] font-semibold text-gray-500 sm:text-base">
                  College Name
                </span>
                <span className=" text-[.9rem] font-semibold text-yellow-500 sm:text-base">
                  Year 2023 - Year 2027
                </span>
                <p className=" text-[.9rem] text-justify text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Excepturi nihil aut quae obcaecati alias placeat totam aperiam
                  pariatur quam? Accusantium minima aperiam error obcaecati
                  autem doloribus deserunt qui, laborum incidunt amet, numquam
                  eos cum tempora. Debitis, esse quae corporis deserunt officia
                  quos in a, quaerat vero odio vitae.
                </p>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  );
};

export default Resume;
