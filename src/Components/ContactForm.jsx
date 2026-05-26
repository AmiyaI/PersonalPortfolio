/*
     FileName: ContactForm.jsx
     @version: I
     Creation: 10/23/2023
     Last modification: 10/23/2023
*/

import { useRef, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import emailjs from "@emailjs/browser";
import noise from "../assets/textures/noise.png";

const ContactForm = () => {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("sending");

    emailjs
      .sendForm("amiya_personalport", "template1", e.target, {
        publicKey: "cdoSytMf3BqCdBI3H",
      })
      .then(
        () => {
          form.current.reset();
          setStatus("sent");
          setTimeout(() => setStatus("idle"), 4000);
        },
        (error) => {
          console.error(error);
          setStatus("error");
        }
      );
  };

  const buttonLabel = {
    idle: "Send",
    sending: "Sending...",
    sent: "Sent!",
    error: "Try again",
  }[status];

  return (
    <div
  style={{
    backgroundImage: `url(${noise})`,
    width: "80%",
    height: "96%",
    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)"
  }}
>
      <div>
        <h2
          style={{ fontFamily: "Morganite Bold, sans-serif" }}
          className="message text-7xl bg-primary-600 p-2 rounded-xl text-grayscale-200 text-center rounded-br-[0%] relative shadow-2xl"
        >
          <Typewriter words={["Let's get in touch!"]} loop={true} />
          &nbsp;
        </h2>
      </div>
      <div className="w-full flex justify-center">
        <form
          id="contact_form"
          ref={form}
          onSubmit={sendEmail}
          style={{ fontFamily: "Poppins, sans-serif" }}
          className="w-[80%] h-full flex flex-col gap-4 pt-4 text-grayscale-200"
        >
          <div className="w-full flex flex-col">
            <label htmlFor="firstname">First Name</label>
            <input
              className="p-[0.5em] rounded-xl text-grayscale-950"
              placeholder="Enter your First Name"
              id="firstname"
              type="text"
              name="from_name"
              required
            />
          </div>
          <div className="w-full flex flex-col">
            <label htmlFor="lastname">Last Name</label>
            <input
              className="p-[0.5em] rounded-xl text-grayscale-950"
              placeholder="Enter your Last Name"
              id="lastname"
              type="text"
              name="from_last"
              required
            />
          </div>
          <div className="w-full flex flex-col">
            <label htmlFor="email">E-mail</label>
            <input
              className="p-[0.5em] rounded-xl text-grayscale-950"
              placeholder="Enter your E-mail"
              id="email"
              type="email"
              name="from_email"
              required
            />
          </div>
          <div className="w-full flex flex-col">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              className="p-[0.5em] rounded-xl text-grayscale-950"
              placeholder="Enter your message..."
              name="message"
              required
            ></textarea>
          </div>
          <div className="w-full flex flex-col items-center gap-2">
            <input
              className="w-[120px] h-[50px] bg-primary-600 rounded-xl cursor-pointer hover:bg-primary-700 disabled:opacity-60"
              type="submit"
              value={buttonLabel}
              disabled={status === "sending"}
            />
            <p
              role="status"
              aria-live="polite"
              className="text-grayscale-200 text-sm text-center min-h-[1.25rem]"
            >
              {status === "sent" && "Thanks! I'll get back to you as soon as possible."}
              {status === "error" && "Something went wrong — please try again or email me directly."}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
