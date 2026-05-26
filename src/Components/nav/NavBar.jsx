/*
     FileName: NavBar.jsx
     @version: I
     Creation: 10/23/2023
     Last modification: 10/23/2023
*/

import { useState } from "react";
import { styles } from '../../styles.js';
import { navLinks } from "../../Constants/constants";
import { logo, menu, close } from "../../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);

  return (
    <nav
      className={`
      ${styles.paddingX} w-full flex items-center py-5
      fixed top-0 z-20 bg-primary
    `}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <a
          href="#hero"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt="Amiya Islam" className="h-9 w-auto object-contain" />
        </a>
        <ul className="list-none hidden sm:flex flex-row gap-10"  style={{ color: '#FFFFFF' }}>
          {navLinks.map((link) => {
            return (
              <li
                key={link.id}
                className={`${
                  active === link.title ? "text-white" : "text-secondary"
                } hover:text-white text-[18px] font-medium cursor-pointer `}
              >
                <a href={`#${link.id}`} onClick={() => setActive(link.title)}>{link.title}</a>
              </li>
            );
          })}
        </ul>
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <button
            type="button"
            aria-label={toggle ? "Close menu" : "Open menu"}
            className="z-20"
            onClick={() => setToggle(!toggle)}
          >
            <img
              className="w-[28px] h-[28px] object-contain cursor-pointer"
              src={toggle ? close : menu}
              alt=""
            />
          </button>
          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } pt-20 p-6 black-gradient absolute top-2 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className="list-none flex justify-end items-start flex-col gap-4">
              {navLinks.map((link) => {
                return (
                  <li
                    key={link.id}
                    className={`${
                      active === link.title ? "text-white" : "text-secondary"
                    } font-poppins font-medium cursor-pointer text-[16px]`}
                  >
                    <a
                      href={`#${link.id}`}
                      onClick={() => {
                        setActive(link.title);
                        setToggle(false);
                      }}
                    >
                      {link.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
