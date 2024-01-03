import React from 'react'
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { contactImg } from "../../assets/index";

const ContactLeft = () => {
  return (
    <div className="w-full lgl:w-[35%] h-full bg-gradient-to-r from-[#1e2024] to-[#23272b] p-4 lgl:p-8 rounded-lg shadow-shadowOne flex flex-col gap-8 justify-center">
      <img
        className="w-full h-64 object-cover rounded-lg mb-2"
        src={contactImg}
        alt="contactImg"
      />
      <div className="flex flex-col gap-4">
        <h3 className="text-3xl font-bold text-white">Cyrille Kenfack</h3>
        {/* <h4 className="text-2xl font-bold text-white">Software Engineer</h4> */}
        <p className="text-lg font-normal text-gray-400">
          Full-stack Developper
        </p>
        <p className="text-base text-gray-400 tracking-wide">
        A passionate and experienced design engineer with a strong background in the design, development and maintenance of high-performance, 
        scalable data systems. I have in-depth expertise in relational and non-relational databases. I also have knowledge of data analysis.
        </p>
        <p className="text-base text-gray-400 flex items-center gap-2">
          Phone: <span className="text-lightText">+33 758387850</span>
        </p>
        <p className="text-base text-gray-400 flex items-center gap-2">
          Email: <span className="text-lightText">cyrillekenfack4@gmail.com</span>
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-base uppercase font-titleFont mb-4">Find me in</h2>
        <div className="flex gap-4">
        <a href="https://wa.me/33758387850">
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
    </div>
  );
}

export default ContactLeft