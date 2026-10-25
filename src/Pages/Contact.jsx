/*
     FileName: Contact.jsx
     @version: II
     Creation: 10/23/2023
     Last modification: 10/25/2026
*/

import { m, LazyMotion, domAnimation } from "motion/react";
import SectionTitle from "../Components/SectionTitle";
import ContactForm from "../Components/ContactForm";

const Contact = () => {
  return (
    <div
      id="contact"
      className="w-full overflow-hidden-web flex flex-col items-center"
    >
      <div className="w-full min-h-[800px] flex flex-col xl:w-[70%]">
        <div className="w-full">
          <SectionTitle title="CONTACT" subtitle="Get in touch" index="07" />
        </div>
        <div className="w-full flex justify-center items-center">
          <LazyMotion features={domAnimation} strict>
            <m.div
              initial={{ x: 200 }}
              whileInView={{ x: 0 }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.25 }}
              className="w-full sm:w-[90%] md:w-[80%] sm:h-[640px] p-4 flex flex-col sm:flex-row gap-4"
            >
              <div className="flex justify-center"></div>
              <ContactForm />
            </m.div>
          </LazyMotion>
        </div>
      </div>
    </div>
  );
};

export default Contact;
