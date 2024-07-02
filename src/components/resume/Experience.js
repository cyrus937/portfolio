import React from "react";
import {motion} from "framer-motion"
import ResumeCard from "./ResumeCard";

const Experience = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      className="py-12 font-titleFont flex gap-20"
    >
      <div>
        <div className="flex flex-col gap-4">
          <p className="text-sm text-designColor tracking-[4px]">2022 - Present</p>
          <h2 className="text-4xl font-bold">Job Experience</h2>
        </div>
        <div className="mt-14 w-full h-[1000px] border-l-[6px] border-l-black border-opacity-30 flex flex-col gap-10">
        <ResumeCard
            title="R&D Engineer"
            subTitle="Inria - (Sept 2023 - Present)"
            result="Rennes, FRANCE"
            des="Developing a framework to test decentralized machine learning algorithms in a cluster environment, in a production environment, and in a combination of the two."
          // des="Google's hiring process is an important part of our culture. Googlers care deeply about their teams and the people who make them up."
          />
          <ResumeCard
            title="Jr. Back-end Developper"
            subTitle="Moobifun - (April 2023 - Aug 2023)"
            result="Yaounde, CAMEROON"
            des="Moobifun's recruitment process is an important part of our culture. Moobifun employees are very attached to their teams and the people who make them up."
          // des="Google's hiring process is an important part of our culture. Googlers care deeply about their teams and the people who make them up."
          />
          <ResumeCard
            title="Full-stack Developper"
            subTitle="Connect Technology - (Oct 2022 - March 2023)"
            result="Yaounde, CAMEROON"
            des="A good place to start if you're thirsty for knowledge"
          // des="A popular destination with a growing number of highly qualified homegrown graduates, it's true that securing a role in Malaysia isn't easy."
          />
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-4">
          <p className="text-sm text-designColor tracking-[4px]">2020 - 2022</p>
          <h2 className="text-4xl font-bold">Internship</h2>
        </div>
        <div className="mt-14 w-full h-[1000px] border-l-[6px] border-l-black border-opacity-30 flex flex-col gap-10">
          <ResumeCard
            title="AI Research Intern"
            subTitle="AI Laboratory of ENSPY (Feb. 2022 - July 2022)"
            result="Yaounde, CAMEROON"
            des="Design and implementation of a dialogue module between a patient and a doctor during a medical consultation in a 3D environment."
          />
          <ResumeCard
            title="Back-end Developper"
            subTitle="CENADI (July 2021 - September 2021)"
            result="Yaounde, CAMEROON"
            des="During this internship I worked on digitising plots of land."
          />
          <ResumeCard
            title="IT Consultant"
            subTitle="Megasoft sarl (2020 - 2021)"
            result="Yaounde, CAMEROON"
            des="During this period I learnt a lot about business communication, time management and taxation.
              I also improved my skills in writing Java code and SQL queries, and learned how to optimise SQL queries."
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Experience;
