import React from 'react'
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaReact, FaInstagram, FaWhatsapp, FaAngular, FaJava, FaDatabase, FaBootstrap } from "react-icons/fa";
import { SiTailwindcss, SiFigma, SiNextdotjs } from "react-icons/si";
const Media = () => {
  return (
    <div className="flex flex-col xl:flex-row gap-6 lgl:gap-0 justify-between">
        <div>
          <h2 className="text-base uppercase font-titleFont mb-4">
            Find me in
          </h2>
          <div className="flex gap-4">
            <a href="https://wa.me/237695104050">
            <span className="bannerIcon">
              <FaWhatsapp />
            </span>
            </a>
            <a href="https://instagram.com/cyrus_237?utm_source=qr&igshid=MzNlNGNkZWQ4Mg%3D%3D"><span className="bannerIcon">
              <FaInstagram />
            </span></a>
            <a href="https://twitter.com/CyrilleKenfack?t=1ZzTdjK3ICMltMpbWnEySg&s=09"><span className="bannerIcon">
              <FaTwitter />
            </span></a>
            <a href="https://www.linkedin.com/in/cyrille-kenfack-347b64195/"><span className="bannerIcon">
              <FaLinkedinIn />
            </span></a>
          </div>
        </div>
        <div>
          <h2 className="text-base uppercase font-titleFont mb-4">
            BEST SKILL ON
          </h2>
          <div className="flex gap-4">
          <span className="bannerIcon">
              <FaJava />
            </span>
          <span className="bannerIcon">
              <FaAngular />
            </span>
            <span className="bannerIcon">
              <FaReact />
            </span>
            <span className="bannerIcon">
              <FaBootstrap />
            </span>
            {/* <span className="bannerIcon">
              <SiTailwindcss />
            </span>
            <span className="bannerIcon">
              <SiFigma />
            </span> */}
          </div>
        </div>
      </div>
  )
}

export default Media