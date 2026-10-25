/*
     FileName: Projects.jsx
     @version: III
     Creation: 10/23/2023
     Last modification: 10/25/2026
*/

import SectionTitle from "../Components/SectionTitle";
import ProjectCards from "../Components/ProjectCards";

const Projects = () => {
  return (
    <section id="projects" className="field-ground w-full px-5 py-16 sm:px-8 lg:py-20">
      <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <SectionTitle title="Projects" />
        <p className="max-w-[40ch] text-body text-ink">
          Products I've shipped at SWA AI and the side projects that got me there.
        </p>
      </div>
      <ProjectCards />
    </section>
  );
};

export default Projects;
