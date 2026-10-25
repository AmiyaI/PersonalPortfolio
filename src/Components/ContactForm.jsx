/*
     FileName: ContactForm.jsx
     @version: III
     Creation: 10/23/2023
     Last modification: 10/25/2026
*/

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const fields = [
  { id: "firstname", name: "from_name", label: "First name", type: "text", autoComplete: "given-name" },
  { id: "lastname", name: "from_last", label: "Last name", type: "text", autoComplete: "family-name" },
];

const inputClass =
  "w-full border-2 border-[#d8d6f0] bg-white px-4 py-3 text-body text-bg transition-colors focus:border-indigo focus:outline-none";

const ContactForm = () => {
  const [status, setStatus] = useState("idle");
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("sending");

    emailjs.sendForm(
      "amiya_personalport",
      "template1",
      e.target,
      { publicKey: "cdoSytMf3BqCdBI3H" }
    )
      .then(
        () => {
          form.current.reset();
          setStatus("sent");
        },
        (error) => {
          console.error(error);
          setStatus("error");
        }
      );
  };

  return (
    <form
      id="contact_form"
      ref={form}
      method="POST"
      onSubmit={sendEmail}
      className="flex w-full flex-col gap-4 text-bg"
    >
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
          className="rounded-full bg-accent px-7 py-3.5 text-body font-extrabold text-bg transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-60"
        >
          {status === "sending" ? "Sending" : status === "sent" ? "Sent" : "Send message"}
        </button>
        <p role="status" aria-live="polite" className="text-body">
          {status === "sent" && "Thank you! I'll get back to you as soon as I can."}
          {status === "error" && "That didn't send. Email me directly instead?"}
        </p>
      </div>
    </form>
  );
};

export default ContactForm;
