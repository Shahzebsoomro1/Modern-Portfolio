"use client";

import { FormEvent, useState } from "react";
import emailjs from "@emailjs/browser";
import { Check, Copy } from "lucide-react";
import { Toaster, toast } from "sonner";

const EMAIL = "soomroshahzeb8819@gmail.com";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/Shahzebsoomro1",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/shahzeb-soomro",
  },
  {
    label: "Email",
    href: `mailto:${EMAIL}`,
  },
];

export default function Footer() {
  const [status, setStatus] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);

      setCopied(true);

      toast.success("Email copied", {
        description: EMAIL,
        duration: 2500,
      });

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      toast.error("Unable to copy email");
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    setIsSending(true);
    setStatus("");

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      const subject = encodeURIComponent(`Portfolio inquiry from ${name || "a visitor"}`);
      const body = encodeURIComponent([
        `Name: ${name || "N/A"}`,
        `Email: ${email || "N/A"}`,
        "",
        message || "",
      ].join("\n"));

      window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;

      setStatus("Opening your email app so you can send the message directly.");

      setIsSending(false);
      return;
    }

    try {
      /*
       * Add submission time to the form so EmailJS
       * can use {{time}} in the email template.
       */
      const timeInput = document.createElement("input");

      timeInput.type = "hidden";
      timeInput.name = "time";
      timeInput.value = new Date().toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      });

      form.appendChild(timeInput);

      await emailjs.sendForm(
        serviceId,
        templateId,
        form,
        {
          publicKey,
        }
      );

      setStatus(
        "Message sent successfully. I'll get back to you soon."
      );

      toast.success("Message sent", {
        description: "Thanks for reaching out!",
        duration: 3000,
      });

      form.reset();

      timeInput.remove();
    } catch (error) {
      console.error("EmailJS Error:", error);

      setStatus(
        "Something went wrong. Please try again."
      );

      toast.error("Message failed", {
        description: "Please try again in a moment.",
        duration: 3000,
      });
    } finally {
      setIsSending(false);
    }
  };

  const isSuccess = status.includes("successfully");

  return (
    <>
      <Toaster
        position="top-center"
        theme="dark"
        richColors
        closeButton
      />

      <footer
        id="contact"
        aria-labelledby="contact-heading"
        className="
          relative
          overflow-hidden
          bg-[#0a0a0a]
          px-5
          pb-6
          pt-10
          text-white
          sm:px-8
          sm:pb-8
          sm:pt-14
          md:px-10
          md:pt-20
          lg:px-16
          lg:pt-24
        "
      >
        <div className="mx-auto w-full max-w-[1600px]">
          <section
            aria-labelledby="contact-heading"
            className="
              border-b
              border-white/10
              pb-14
              sm:pb-16
              md:pb-20
              lg:pb-24
            "
          >
            <div
              className="
                grid
                gap-12
                md:gap-16
                lg:grid-cols-[0.8fr_1.2fr]
                lg:gap-20
                xl:gap-28
              "
            >
              {/* CONTACT INTRO */}
              <div className="text-center lg:text-left">
                <p
                  className="
                    mb-4
                    text-[10px]
                    uppercase
                    tracking-[0.28em]
                    text-white/40
                    sm:text-xs
                  "
                >
                  Contact
                </p>

                <h2
                  id="contact-heading"
                  className="
                    mx-auto
                    max-w-xl
                    text-[clamp(2.5rem,7vw,5.5rem)]
                    font-medium
                    leading-[0.92]
                    tracking-[-0.055em]
                    lg:mx-0
                  "
                >
                  Let&apos;s build something together.
                </h2>

                <p
                  className="
                    mx-auto
                    mt-6
                    max-w-md
                    text-sm
                    leading-6
                    text-white/40
                    sm:mt-7
                    sm:text-base
                    sm:leading-7
                    lg:mx-0
                  "
                >
                  Have an idea, project, or opportunity? Send me a message and I&apos;ll get back
                  to you as soon as possible.
                </p>

                {/* EMAIL */}
                <div className="mt-8 sm:mt-10">
                  <span
                    className="
                      mb-2
                      block
                      text-[9px]
                      uppercase
                      tracking-[0.25em]
                      text-white/25
                      sm:text-[10px]
                    "
                  >
                    Email
                  </span>

                  <div
                    className="
                      flex
                      flex-col
                      items-center
                      gap-3
                      sm:items-start
                    "
                  >
                    <div
                      className="
                        flex
                        w-full
                        flex-wrap
                        items-center
                        justify-center
                        gap-3
                        sm:w-auto
                        sm:justify-start
                      "
                    >
                      <a
                        href={`mailto:${EMAIL}`}
                        aria-label={`Send email to ${EMAIL}`}
                        className="
                          max-w-[calc(100%-48px)]
                          break-all
                          text-sm
                          text-white/50
                          underline-offset-4
                          transition-colors
                          duration-300
                          hover:text-white
                          hover:underline
                          sm:max-w-none
                          sm:text-base
                        "
                      >
                        {EMAIL}
                      </a>

                      <button
                        type="button"
                        onClick={copyEmail}
                        aria-label={
                          copied
                            ? "Email copied"
                            : "Copy email address"
                        }
                        title={
                          copied
                            ? "Email copied"
                            : "Copy email address"
                        }
                        className="
                          inline-flex
                          h-10
                          w-10
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-white/10
                          text-white/40
                          transition-all
                          duration-300
                          hover:border-white/30
                          hover:bg-white
                          hover:text-black
                          focus:outline-none
                          focus:ring-2
                          focus:ring-white/40
                          focus:ring-offset-2
                          focus:ring-offset-[#0a0a0a]
                        "
                      >
                        {copied ? (
                          <Check
                            size={15}
                            strokeWidth={1.8}
                            aria-hidden="true"
                          />
                        ) : (
                          <Copy
                            size={15}
                            strokeWidth={1.8}
                            aria-hidden="true"
                          />
                        )}
                      </button>
                    </div>

                    <span
                      className="
                        text-center
                        text-[9px]
                        uppercase
                        tracking-[0.16em]
                        text-white/20
                        sm:text-left
                      "
                    >
                      {copied
                        ? "Copied to clipboard"
                        : "Click email to send · Copy icon to copy"}
                    </span>
                  </div>
                </div>
              </div>

              {/* CONTACT FORM */}
              <form
                onSubmit={handleSubmit}
                noValidate
                aria-label="Contact form"
                className="
                  mx-auto
                  flex
                  w-full
                  max-w-2xl
                  flex-col
                  gap-7
                  sm:gap-8
                  lg:mx-0
                  lg:max-w-none
                "
              >
                {/* NAME */}
                <div>
                  <label
                    htmlFor="name"
                    className="
                      mb-2.5
                      block
                      text-[10px]
                      uppercase
                      tracking-[0.2em]
                      text-white/40
                      sm:text-xs
                    "
                  >
                    Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    aria-required="true"
                    className="
                      min-h-12
                      w-full
                      border-b
                      border-white/15
                      bg-transparent
                      px-0
                      py-3
                      text-sm
                      text-white
                      outline-none
                      transition-colors
                      duration-300
                      placeholder:text-white/20
                      focus:border-white/60
                      sm:text-base
                    "
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <label
                    htmlFor="email"
                    className="
                      mb-2.5
                      block
                      text-[10px]
                      uppercase
                      tracking-[0.2em]
                      text-white/40
                      sm:text-xs
                    "
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    inputMode="email"
                    placeholder="you@example.com"
                    aria-required="true"
                    className="
                      min-h-12
                      w-full
                      border-b
                      border-white/15
                      bg-transparent
                      px-0
                      py-3
                      text-sm
                      text-white
                      outline-none
                      transition-colors
                      duration-300
                      placeholder:text-white/20
                      focus:border-white/60
                      sm:text-base
                    "
                  />
                </div>

                {/* MESSAGE */}
                <div>
                  <label
                    htmlFor="message"
                    className="
                      mb-2.5
                      block
                      text-[10px]
                      uppercase
                      tracking-[0.2em]
                      text-white/40
                      sm:text-xs
                    "
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell me about your project..."
                    aria-required="true"
                    className="
                      min-h-[120px]
                      w-full
                      resize-y
                      border-b
                      border-white/15
                      bg-transparent
                      px-0
                      py-3
                      text-sm
                      leading-7
                      text-white
                      outline-none
                      transition-colors
                      duration-300
                      placeholder:text-white/20
                      focus:border-white/60
                      sm:min-h-[130px]
                      sm:text-base
                    "
                  />
                </div>

                {/* SUBMIT */}
                <div
                  className="
                    flex
                    flex-col
                    items-center
                    gap-4
                    pt-1
                    sm:flex-row
                    sm:items-center
                  "
                >
                  <button
                    type="submit"
                    disabled={isSending}
                    aria-busy={isSending}
                    className="
                      group
                      inline-flex
                      min-h-12
                      w-full
                      items-center
                      justify-center
                      gap-4
                      rounded-full
                      bg-white
                      px-6
                      py-3
                      text-[10px]
                      uppercase
                      tracking-[0.18em]
                      text-black
                      transition-all
                      duration-300
                      hover:bg-white/80
                      focus:outline-none
                      focus:ring-2
                      focus:ring-white/50
                      focus:ring-offset-2
                      focus:ring-offset-[#0a0a0a]
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                      sm:w-auto
                      sm:px-7
                      sm:text-xs
                    "
                  >
                    <span>
                      {isSending
                        ? "Sending..."
                        : "Send Message"}
                    </span>

                    {!isSending && (
                      <span
                        aria-hidden="true"
                        className="
                          transition-transform
                          duration-300
                          group-hover:translate-x-1
                          group-hover:-translate-y-1
                        "
                      >
                        ↗
                      </span>
                    )}
                  </button>

                  {status && (
                    <p
                      role="status"
                      aria-live="polite"
                      className={`
                        max-w-sm
                        text-center
                        text-xs
                        leading-5
                        sm:text-left
                        ${
                          isSuccess
                            ? "text-white/60"
                            : "text-white/40"
                        }
                      `}
                    >
                      {status}
                    </p>
                  )}
                </div>
              </form>
            </div>
          </section>

          {/* FOOTER BOTTOM */}
          <div
            className="
              flex
              flex-col
              items-center
              gap-6
              py-8
              text-center
              sm:gap-7
              sm:py-9
              md:flex-row
              md:items-end
              md:justify-between
              md:gap-8
              md:py-8
              md:text-left
            "
          >
            {/* BRAND */}
            <div
              className="
                flex
                flex-col
                items-center
                md:items-start
              "
            >
              <p className="mb-1.5 text-sm font-medium">
                Shahzeb Soomro
              </p>

              <p className="text-xs text-white/40">
                Fresh Computer Science Graduate · Karachi, Sindh, Pakistan
              </p>
            </div>

            {/* SOCIAL LINKS */}
            <nav
              aria-label="Social links"
              className="
                flex
                flex-wrap
                items-center
                justify-center
                gap-x-6
                gap-y-2
                sm:gap-x-8
              "
            >
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={
                    social.label === "Email"
                      ? undefined
                      : "_blank"
                  }
                  rel={
                    social.label === "Email"
                      ? undefined
                      : "noopener noreferrer"
                  }
                  aria-label={
                    social.label === "Email"
                      ? `Email ${EMAIL}`
                      : social.label
                  }
                  className="
                    inline-flex
                    min-h-10
                    items-center
                    justify-center
                    text-[10px]
                    uppercase
                    tracking-[0.15em]
                    text-white/40
                    transition-colors
                    duration-300
                    hover:text-white
                    focus:outline-none
                    focus:ring-1
                    focus:ring-white/50
                    sm:text-xs
                  "
                >
                  {social.label}
                </a>
              ))}
            </nav>

            {/* COPYRIGHT */}
            <p className="text-xs text-white/30">
              © {new Date().getFullYear()} Shahzeb Soomro
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}