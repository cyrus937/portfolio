import React from 'react'
import { useTypewriter, Cursor } from "react-simple-typewriter";
import Media from './Media';

const LeftBanner = () => {
    const [text] = useTypewriter({
      words: [ "Full Stack Developer.", "Back-end Developer", "Mobile Developer.", "Web Designer.", "Young Contractor.", "Junior Data Scientist"],
      loop: true,
      typeSpeed: 20,
      deleteSpeed: 10,
      delaySpeed: 2000,
    });
  return (
    <div className="w-full lgl:w-1/2 flex flex-col gap-20">
      <div className="flex flex-col gap-5">
        <h4 className=" text-lg font-normal">WELCOME TO MY WORLD OF FREELANCING</h4>
        <h1 className="text-5xl font-bold text-white">
          Hi, I'm <span className="text-designColor capitalize">Cyrille Kenfack</span>
        </h1>
        <h2 className="text-3xl font-bold text-white">
          a <span>{text}</span>
          <Cursor
            cursorBlinking="false"
            cursorStyle="|"
            cursorColor="#ff014f"
          />
        </h2>
        <p className="text-base font-bodyFont leading-6 tracking-wide">
        Interested in new technologies and working methods. I like to come up with ideas that to permit to improve business processes.<br></br>
        Passionate about development <b>Back-End</b> and <b>Front-End</b>.
        </p>
      </div>
     {/* Media */}
     <Media />
    </div>
  );
}

export default LeftBanner