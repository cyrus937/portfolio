import React from 'react'
import { HiArrowRight } from "react-icons/hi";
import { Link } from 'react-scroll';

const Card = ({ item: { title, des, icon, tech } }) => {
  return (
    <div className="w-full px-12 h-110 py-10 rounded-lg shadow-shadowOne flex items-center bg-gradient-to-r from-bodyColor to-[#202327] group hover:bg-gradient-to-b hover:from-black hover:to-[#1e2024] transition-colors duration-100 group">
      <div className="h-102 overflow-y-hidden">
        <div className="flex h-full flex-col gap-10 translate-y-16 group-hover:translate-y-0 transition-transform duration-500">
          <div className="w-10 h-8 flex flex-col justify-between">

            {icon ? (
              <span className="text-5xl text-designColor">{icon}</span>
            ) : (
              <>
                <span className="w-full h-[2px] rounded-lg bg-designColor inline-flex"></span>
                <span className="w-full h-[2px] rounded-lg bg-designColor inline-flex"></span>
                <span className="w-full h-[2px] rounded-lg bg-designColor inline-flex"></span>
                <span className="w-full h-[2px] rounded-lg bg-designColor inline-flex"></span>
              </>
            )}
          </div>
          <div className="flex flex-col gap-6">
            <h2 className="text-xl md:text-2xl font-titleFont font-bold text-gray-300">
              {title}
            </h2>
            <p className="base">{des}</p>
            <h4 className="text-xl md:text-1xl font-titleFont font-bold text-gray-300">
              Technologies :
            </h4>
            <p className="base">{tech}</p>
            <Link
              // onClick={() => setShowMenu(false)}
              activeClass="active"
              to="contact"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              Contact Me <span className="text-2xl text-designColor">
                <HiArrowRight />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card