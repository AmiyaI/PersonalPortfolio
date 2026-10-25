/*
     FileName: ContactForm.jsx
     @version: III
     Creation: 10/23/2023
     Last modification: 10/25/2026
*/

import { useRef, useState } from "react";

const fields = [
  { id: "firstname", name: "from_name", label: "First name", type: "text", autoComplete: "given-name" },
  { id: "lastname", name: "from_last", label: "Last name", type: "text", autoComplete: "family-name" },
];

const inputClass =
  "w-full border-2 border-[#8a84b8] bg-white px-4 py-3 text-body text-night transition-colors focus:border-indigo focus:outline-none";

// One message a minute per visitor keeps accidental double-sends and scripted
// spam out of the inbox.
const COOLDOWN_MS = 60_000;

const ContactForm = () => {
  const [status, setStatus] = useState("idle");
  const form = useRef();
  const lastSent = useRef(0);

  const sendEmail = async (e) => {
    e.preventDefault();
    // Bots fill the hidden "company" field; people never see it.
    if (form.current.company.value) {
      form.current.reset();
      setStatus("sent");
      return;
    }
    if (Date.now() - lastSent.current < COOLDOWN_MS) {
      setStatus("wait");
      return;
    }
    setStatus("sending");
    try {
      // Loaded on demand: most visitors never send the form.
      const { default: emailjs } = await import("@emailjs/browser");
      await emailjs.sendForm("amiya_personalport", "template1", form.current, { publicKey: "cdoSytMf3BqCdBI3H" });
      lastSent.current = Date.now();
      form.current.reset();
      setStatus("sent");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <form
      id="contact_form"
      ref={form}
      onSubmit={sendEmail}
      className="flex w-full flex-col gap-4 text-night"
    >
      <label className="sr-only" aria-hidden="true">
        Company
        <input type="text" name="company" tabIndex={-1} autoComplete="off" />
      </label>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {fields.map((field) => (
          <label key={field.id} htmlFor={field.id} className="flex flex-col gap-1.5 text-small font-medium">
            {field.label}
            <input className={inputClass} id={field.id} type={field.type} name={field.name} autoComplete={field.autoComplete} required />
          </label>
        ))}
      </div>
      <label htmlFor="email" className="flex flex-col gap-1.5 text-small font-medium">
        Email
        <input className={inputClass} id="email" type="email" name="from_email" autoComplete="email" required />
      </label>
      <label htmlFor="message" className="flex flex-col gap-1.5 text-small font-medium">
        Message
        <textarea className={`${inputClass} min-h-[140px] resize-y`} id="message" name="message" required />
      </label>
      <div className="flex flex-wrap items-center gap-5">
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-full bg-night px-7 py-3.5 text-body font-extrabold text-white transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-60"
        >
          {status === "sending" ? "Sending" : status === "sent" ? "Sent" : "Send message"}
        </button>
        <p role="status" aria-live="polite" className="text-body">
          {status === "sent" && "Thank you! I'll get back to you as soon as I can."}
          {status === "wait" && "Thanks! Give it a minute before sending another."}
          {status === "error" && (
            <>
              That didn't send. Email me at{" "}
              <a className="underline" href="mailto:iamiya@vt.edu">
                iamiya@vt.edu
              </a>{" "}
              instead?
            </>
          )}
        </p>
      </div>
    </form>
  );
};

export default ContactForm;
