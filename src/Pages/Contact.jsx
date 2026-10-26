/*
     FileName: Contact.jsx
     @version: III
     Creation: 10/23/2023
     Last modification: 10/25/2026
*/

// The page inverts: light ground, the email address set as display type,
// with the original contact form beside it for anyone who prefers a form.

import { useRef } from "react";
import ContactForm from "../Components/ContactForm";
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
    <section ref={scope} id="contact" className="w-full field-light px-5 py-16 text-night sm:px-8 lg:py-20">
      <h2 className="contact-part max-w-[30ch] text-lead font-medium">
        Building with AI agents, or need a hand with the cloud underneath? Write to me.
      </h2>
      <a
        href={`mailto:${EMAIL}`}
        className="contact-part mt-10 block w-fit text-mega leading-[0.95] font-extrabold tracking-[-0.045em] transition-colors duration-300 hover:text-indigo"
      >
        {EMAIL}
      </a>
      <div className="mt-12 grid grid-cols-1 gap-14 lg:grid-cols-12">
        <div className="contact-part flex flex-col gap-4 text-body lg:col-span-4">
          <p>Based in Miami, FL. Open to relocation.</p>
          <p className="text-muted">I usually reply within a day or two.</p>
        </div>
        <div className="contact-part lg:col-span-7 lg:col-start-6">
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contact;
