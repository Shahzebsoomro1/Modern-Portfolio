"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
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
];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(
          [
            ".hero-eyebrow",
            ".hero-title",
            ".hero-description",
            ".hero-links",
            ".hero-socials",
            ".hero-scroll",
          ],
          {
            opacity: 1,
            y: 0,
          }
        );

        return;
      }

      const tl = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      tl.from(".hero-eyebrow", {
        y: 20,
        opacity: 0,
        duration: 0.6,
      })
        .from(
          ".hero-title",
          {
            y: 35,
            opacity: 0,
            duration: 0.9,
          },
          "-=0.3"
        )
        .from(
          ".hero-description",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.45"
        )
        .from(
          ".hero-links",
          {
            y: 15,
            opacity: 0,
            duration: 0.5,
          },
          "-=0.35"
        )
        .from(
          ".hero-socials",
          {
            y: 15,
            opacity: 0,
            duration: 0.5,
          },
          "-=0.3"
        )
        .from(
          ".hero-scroll",
          {
            y: 10,
            opacity: 0,
            duration: 0.4,
          },
          "-=0.25"
        );

      gsap.to(".hero-background-text", {
        yPercent: -12,
        ease: "none",
        scrollTrigger: undefined,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

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
      toast.error("Unable to copy email", {
        description: "Please select the email address manually.",
      });
    }
  };

  return (
    <>
      <Toaster
        position="top-center"
        theme="dark"
        richColors
        closeButton
      />

      <section
        ref={heroRef}
        id="home"
        aria-labelledby="hero-heading"
        className="
          relative
          flex
          min-h-[calc(100svh-5rem)]
          items-center
          overflow-hidden
          bg-[#0a0a0a]
          px-5
          py-[clamp(4.5rem,8vh,6.5rem)]
          text-white
          sm:px-7
          md:px-10
          lg:px-16
        "
      >
        {/* =========================================
            BACKGROUND TYPOGRAPHY
        ========================================== */}

        <div
          aria-hidden="true"
          className="
            hero-background-text
            pointer-events-none
            absolute
            right-[-5%]
            top-[8%]
            select-none
            text-[32vw]
            font-bold
            leading-none
            tracking-[-0.1em]
            text-white/[0.025]
            sm:text-[28vw]
            md:right-[-3%]
            md:text-[24vw]
          "
        >
          SS
        </div>

        {/* =========================================
            CONTENT
        ========================================== */}

        <div className="relative z-10 mx-auto w-full max-w-[1600px]">
          {/* =========================================
              EYEBROW
          ========================================== */}

          <div
            className="
              hero-eyebrow
              mb-[clamp(1rem,2.5vh,2rem)]
              flex
              items-center
              gap-3
              text-[9px]
              uppercase
              tracking-[0.22em]
              text-white/40
              sm:gap-4
              sm:text-[10px]
              sm:tracking-[0.28em]
              md:text-xs
            "
          >
            <span
              aria-hidden="true"
              className="h-px w-6 bg-white/30 sm:w-9"
            />

            <span>Full-Stack Developer · Software Engineer</span>
          </div>

          {/* =========================================
              TITLE
          ========================================== */}

          <div className="hero-title max-w-[1200px]">
            <h1
              id="hero-heading"
              className="
                text-[clamp(4.8rem,10vw,10.5rem)]
                font-medium
                leading-[0.78]
                tracking-[-0.075em]
              "
            >
              Shahzeb
            </h1>

            <div
              aria-hidden="true"
              className="
                text-[clamp(4.8rem,10vw,10.5rem)]
                font-medium
                leading-[0.78]
                tracking-[-0.075em]
              "
            >
              Soomro<span className="text-white/20">.</span>
            </div>
          </div>

          {/* =========================================
              LOWER CONTENT
          ========================================== */}

          <div
            className="
              mt-[clamp(2rem,4vh,3.5rem)]
              grid
              gap-[clamp(2rem,4vw,5rem)]
              lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]
              lg:items-end
            "
          >
            {/* =========================================
                DESCRIPTION
            ========================================== */}

            <div className="hero-description max-w-xl">
              <p
                className="
                  max-w-[42rem]
                  text-[clamp(0.875rem,1.2vw,1.125rem)]
                  leading-[1.65]
                  text-white/50
                "
              >
                Fresh Computer Science graduate with practical MERN stack experience through
                internships and academic projects. I build responsive front-end interfaces,
                reliable back-end logic, and full-stack web applications.
              </p>
            </div>

            {/* =========================================
                ACTIONS
            ========================================== */}

            <div className="flex flex-col lg:items-end">
              {/* MAIN ACTIONS */}

              <div
                className="
                  hero-links
                  flex
                  flex-wrap
                  items-center
                  gap-x-[clamp(1rem,2vw,1.75rem)]
                  gap-y-3
                "
              >
                {/* VIEW WORK */}

                <a
                  href="#work"
                  className="
                    group
                    inline-flex
                    min-h-10
                    items-center
                    gap-3
                    rounded-full
                    text-[10px]
                    uppercase
                    tracking-[0.16em]
                    text-white/60
                    transition-colors
                    hover:text-white
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-white/70
                    focus-visible:ring-offset-2
                    focus-visible:ring-offset-[#0a0a0a]
                    sm:text-xs
                  "
                >
                  <span>View Work</span>

                  <span
                    aria-hidden="true"
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/20
                      transition-all
                      duration-300
                      group-hover:border-white
                      group-hover:bg-white
                      group-hover:text-black
                      sm:h-10
                      sm:w-10
                    "
                  >
                    ↘
                  </span>
                </a>

                {/* RESUME */}

                <a
                  href="/documents/Shahzeb-Soomro-Resume.html"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download Shahzeb Soomro resume"
                  className="
                    group
                    inline-flex
                    min-h-10
                    items-center
                    gap-3
                    rounded-full
                    text-[10px]
                    uppercase
                    tracking-[0.16em]
                    text-white/60
                    transition-colors
                    hover:text-white
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-white/70
                    focus-visible:ring-offset-2
                    focus-visible:ring-offset-[#0a0a0a]
                    sm:text-xs
                  "
                >
                  <span>Resume</span>

                  <span
                    aria-hidden="true"
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/20
                      transition-all
                      duration-300
                      group-hover:border-white
                      group-hover:bg-white
                      group-hover:text-black
                      sm:h-10
                      sm:w-10
                    "
                  >
                    ↗
                  </span>
                </a>

                {/* EMAIL */}

                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label={
                    copied
                      ? "Email address copied"
                      : `Copy email address ${EMAIL}`
                  }
                  className="
                    group
                    inline-flex
                    min-h-10
                    items-center
                    gap-3
                    rounded-full
                    text-[10px]
                    uppercase
                    tracking-[0.16em]
                    text-white/60
                    transition-colors
                    hover:text-white
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-white/70
                    focus-visible:ring-offset-2
                    focus-visible:ring-offset-[#0a0a0a]
                    sm:text-xs
                  "
                >
                  <span>Email</span>

                  <span
                    aria-hidden="true"
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/20
                      transition-all
                      duration-300
                      group-hover:border-white
                      group-hover:bg-white
                      group-hover:text-black
                      sm:h-10
                      sm:w-10
                    "
                  >
                    {copied ? (
                      <Check size={15} strokeWidth={1.8} />
                    ) : (
                      <Copy size={15} strokeWidth={1.8} />
                    )}
                  </span>
                </button>
              </div>

              <div className="mt-4 flex flex-wrap gap-3 text-[10px] uppercase tracking-[0.14em] text-white/35 sm:text-xs">
                  <span>Karachi, Sindh, Pakistan</span>
                  <span>+92 331 0238819</span>
                  <span>soomroshahzeb8819@gmail.com</span>
              </div>

              {/* =========================================
                  SOCIAL LINKS
              ========================================== */}

              <div
                className="
                  hero-socials
                  mt-5
                  flex
                  flex-col
                  gap-3
                  border-t
                  border-white/10
                  pt-4
                  sm:flex-row
                  sm:items-center
                  sm:gap-6
                  lg:w-full
                  lg:justify-end
                "
              >
                <span
                  aria-hidden="true"
                  className="
                    text-[9px]
                    uppercase
                    tracking-[0.2em]
                    text-white/25
                  "
                >
                  Connect
                </span>

                <nav
                  aria-label="Social links"
                  className="flex flex-wrap items-center gap-x-5 gap-y-2 sm:gap-x-7"
                >
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${social.label} profile`}
                      className="
                        min-h-8
                        inline-flex
                        items-center
                        text-[10px]
                        uppercase
                        tracking-[0.15em]
                        text-white/40
                        transition-colors
                        hover:text-white
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-white/70
                        focus-visible:ring-offset-2
                        focus-visible:ring-offset-[#0a0a0a]
                        sm:text-xs
                      "
                    >
                      {social.label}
                    </a>
                  ))}
                </nav>
              </div>

              {/* =========================================
                  EMAIL ADDRESS
              ========================================== */}

              <button
                type="button"
                onClick={copyEmail}
                aria-label={`Copy email address ${EMAIL}`}
                className="
                  mt-3
                  w-fit
                  max-w-full
                  truncate
                  text-left
                  text-[10px]
                  tracking-[0.06em]
                  text-white/25
                  transition-colors
                  hover:text-white/60
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-white/50
                  sm:text-xs
                  lg:ml-auto
                "
              >
                {copied ? "Copied to clipboard" : EMAIL}
              </button>
            </div>
          </div>

          {/* =========================================
              METADATA
          ========================================== */}

          <div
            className="
              hero-scroll
              mt-[clamp(2rem,5vh,4rem)]
              flex
              flex-col
              gap-2
              border-t
              border-white/10
              pt-4
              text-[9px]
              uppercase
              tracking-[0.18em]
              text-white/30
              sm:flex-row
              sm:items-center
              sm:justify-between
              sm:text-[10px]
              sm:tracking-[0.22em]
            "
          >
              <span>Karachi, Sindh, Pakistan</span>

            <span>
              React · Node.js · Express.js · MongoDB · MySQL
            </span>
          </div>
        </div>
      </section>
    </>
  );
}