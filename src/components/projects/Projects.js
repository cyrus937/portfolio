import React from 'react'
import Title from '../layouts/Title'
import { projectOne, projectTwo, projectThree, wallet, gofish, currencyconverter } from "../../assets/index";
import ProjectsCard from './ProjectsCard';

const Projects = () => {
  return (
    <section
      id="projects"
      className="w-full py-20 border-b-[1px] border-b-black"
    >
      <div className="flex justify-center items-center text-center">
        <Title
          title="VISIT MY PORTFOLIO AND KEEP YOUR FEEDBACK"
          des="My Projects"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-14">
        <ProjectsCard
          title="Wallet management"
          des=" A solution for managing your wallet and all your cash inflows and outflows"
          src={wallet}
          link=""
          tech="Angular, Material UI, Spring Boot, MySQL"
        />
        <ProjectsCard
          title="GoFish Mobile App"
          des=" Mobile application that lets you search for fish by family, species and type"
          src={gofish}
          link=""
          tech="Flutter, Django Rest, PostgreSQL"
        />
        <ProjectsCard
          title="API Currency Converter"
          des=" A free, open-source Flask API providing real-time currency conversion with JWT authentication, Redis caching, and production-ready security for fintech applications."
          src={currencyconverter}
          link="https://api-currency-converter.my-finapp.com/docs"
          tech="Flask, PostgreSQL,Redis, Docker, Celery"
        />
        {/* <ProjectsCard
          title="Chatting App"
          des=" Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Explicabo quibusdam voluptate sapiente voluptatibus harum quidem!"
          src={projectThree}
        />
        <ProjectsCard
          title="SOCIAL MEDIA CLONE"
          des=" Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Explicabo quibusdam voluptate sapiente voluptatibus harum quidem!"
          src={projectThree}
        />
        <ProjectsCard
          title="E-commerce Website"
          des=" Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Explicabo quibusdam voluptate sapiente voluptatibus harum quidem!"
          src={projectOne}
        />
        <ProjectsCard
          title="Chatting App"
          des=" Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Explicabo quibusdam voluptate sapiente voluptatibus harum quidem!"
          src={projectTwo}
        /> */}
      </div>
    </section>
  );
}

export default Projects