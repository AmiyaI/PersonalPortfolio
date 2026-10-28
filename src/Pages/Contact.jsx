/*
     FileName: Contact.jsx
     @version: III
     Creation: 10/23/2023
     Last modification: 10/25/2026
*/

// The page closes on a colour sweep that fades in from the light ground:
// a short note and the email on the left, the form on a frosted card.

import { useRef } from "react";
import ContactForm from "../Components/ContactForm";
import SectionHeader from "../Components/SectionHeader";
import { gsap, useGSAP, MOTION_OK } from "../lib/gsap";

const EMAIL = "iamiya@vt.edu";

const Contact = () => {
  const scope = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(".contact-part", {
          y: 40,
          stagger: 0.08,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: scope.current, start: "top 75%", once: true },
        });
      });
    },
    { scope }
  );

  return (
    <section ref={scope} id="contact" className="field-aurora w-full px-5 pt-32 pb-24 text-white sm:px-8 lg:pt-40 lg:pb-28">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="flex flex-col gap-6 lg:col-span-5">
          <SectionHeader kicker="Get in touch" title="Let's talk" tone="light">
            Have an idea, a question, or just want to say hi? Write to me. I usually reply within a day or two.
          </SectionHeader>
          <a
            href={`mailto:${EMAIL}`}
            className="contact-part nav-link w-fit pb-1 text-title font-extrabold tracking-[-0.02em]"
          >
            {EMAIL}
          </a>
        </div>
        <div className="contact-part rounded-3xl bg-white/70 p-6 shadow-[0_30px_80px_-30px_rgba(30,20,90,0.6)] backdrop-blur-md sm:p-8 lg:col-span-6 lg:col-start-7">
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contact;
