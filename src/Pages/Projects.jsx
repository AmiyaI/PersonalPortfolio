/*
     FileName: Projects.jsx
     @version: II
     Creation: 10/23/2023
     Last modification: 10/25/2026
*/

import SectionTitle from "../Components/SectionTitle";
import ProjectCards from "../Components/ProjectCards";

const Projects = () => {
  return (
    <div id="projects" className="w-full overflow-hidden-web flex justify-center py-24">
      <div className="w-full xl:w-[70%] flex flex-col gap-10">
        <SectionTitle title="PROJECTS" subtitle="What I have done so far" index="03" />
        <ProjectCards />
      </div>
    </div>
  );
};

export default Projects;
