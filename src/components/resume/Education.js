import React from 'react'
import { motion } from 'framer-motion';
import ResumeCard from './ResumeCard';

const Education = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      className="w-full flex flex-col lgl:flex-row gap-10 lgl:gap-20"
    >
      {/* part one */}
      <div>
        <div className="py-6 lgl:py-12 font-titleFont flex flex-col gap-4">
          <p className="text-sm text-designColor tracking-[4px]">2009 - 2022</p>
          <h2 className="text-3xl md:text-4xl font-bold">Education Quality</h2>
        </div>
        <div className="mt-6 lgl:mt-14 w-full h-[1000px] border-l-[6px] border-l-black border-opacity-30 flex flex-col gap-10">
          <ResumeCard
            title="Master in Computer Science"
            subTitle="Ecole Nationale Supérieure Polytechnique de Yaoundé (2017 - 2022)"
            result="Yaounde, CAMEROON"
            des="The training provided by universities in order to prepare people to work in various sectors."
          />
          <ResumeCard
            title="License I - Mathematics"
            subTitle="Université de Yaoundé I (2016 - 2017)"
            result="Yaounde, CAMEROON"
            des="A public scientific and cultural establishment with legal personality and financial autonomy."
          />
          <ResumeCard
            title="Secondary School Education"
            subTitle="Bilingual High School Of Mendong (2009 - 2016)"
            result="Yaounde, CAMEROON"
            des="Secondary education or post-primary education covers two phases on the International Standard Classification of Education scale."
          />
        </div>
      </div>
      {/* part Two */}

      <div>
        <div className="py-6 lgl:py-12 font-titleFont flex flex-col gap-4">
          <p className="text-sm text-designColor tracking-[4px]">2022 - 2023</p>
          <h2 className="text-3xl md:text-4xl font-bold">Job Experience</h2>
        </div>
        <div className="mt-6 lgl:mt-14 w-full h-[1000px] border-l-[6px] border-l-black border-opacity-30 flex flex-col gap-10">
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
          {/* <ResumeCard
            title="Front-end Developer"
            subTitle="Nike - (2020 - 2011)"
            result="Oman"
            des="The Oman economy has grown strongly over recent years, having transformed itself from a producer and innovation-based economy."
          /> */}
        </div>
      </div>
    </motion.div>
  );
}

export default Education