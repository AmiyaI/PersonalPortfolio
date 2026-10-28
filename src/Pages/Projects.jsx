/*
     FileName: Projects.jsx
     @version: III
     Creation: 10/23/2023
     Last modification: 10/25/2026
*/

import SectionHeader from "../Components/SectionHeader";
import ProjectCards from "../Components/ProjectCards";

const Projects = () => {
  return (
    <section id="projects" className="field-ground w-full px-5 py-12 sm:px-8 lg:py-16">
      <SectionHeader kicker="Things I've built" title="Projects" layout="left" className="mb-8 lg:mb-10">
        Products I've shipped at SWA AI and the side projects that got me there.
      </SectionHeader>
      <ProjectCards />
    </section>
  );
};

export default Projects;
