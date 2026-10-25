/*
     FileName: Skills.jsx
     @version: II
     Creation: 10/23/2023
     Last modification: 10/25/2026
*/

import MarqueeCards from "../Components/MarqueeCards";
import SectionTitle from "../Components/SectionTitle";
import SkillsCards from "../Components/SkillsCards";
import CertTicker from "../Components/CertTicker";

const Skills = () => {
  return (
    <div id="skills" className="w-full overflow-hidden-web flex flex-col items-center">
      <div className="w-full min-h-[800px] flex flex-col xl:w-[70%]">
        <div className="w-full">
          <SectionTitle title="SKILLS" subtitle="WHAT I DO" index="04" />
        </div>
        <div className="xl:border-l-2 xl:border-r-2 xl:border-primary-400 h-full">
          <div className="relative">
            <div className="absolute top-[45px] w-full h-[1px] bg-primary-400"></div>
            <MarqueeCards direction="left">
              <SkillsCards />
            </MarqueeCards>
          </div>
          <div className="relative">
            <div className="absolute top-[45px] w-full h-[1px] bg-primary-400"></div>
            <MarqueeCards direction="right">
              <SkillsCards />
            </MarqueeCards>
          </div>
        </div>
      </div>
      <div className="w-full">
        <CertTicker />
      </div>
    </div>
  );
};

export default Skills;
