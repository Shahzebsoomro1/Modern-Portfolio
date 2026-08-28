"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const expertise = [
  {
    number: "01",
    title: "MERN Stack Development",
    description:
      "Building scalable applications across frontend, backend, APIs, databases, and deployment.",
  },
  {
    number: "02",
    title: "Front-End Development",
    description:
      "Creating responsive, performant interfaces with React, JavaScript, HTML5, and CSS3.",
  },
  {
    number: "03",
    title: "Backend & APIs",
    description:
      "Developing reliable APIs, authentication, business logic, database workflows, and integrations.",
  },
  {
    number: "04",
    title: "Problem Solving",
    description:
      "Applying practical software engineering skills from internships, academic projects, and competitions.",
  },
];

const technicalSkills = [
  {
    category: "Frontend",
    skills: ["React.js", "JavaScript", "HTML5", "CSS3", "Responsive Design", "UI/UX Principles"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express.js", "REST APIs", "Python", "Java", "C", "PHP (Laravel)"],
  },
  {
    category: "Databases",
    skills: ["MongoDB", "MySQL", "SQL"],
  },
  {
    category: "Tools",
    skills: ["Git", "GitHub", "Postman", "JIRA", "Browser DevTools", "VS Code"],
  },
  {
    category: "Certifications",
    skills: ["Software Quality Assurance", "UI/UX Competition", "Machine Learning Competition"],
  },
  {
    category: "Languages",
    skills: ["English", "Urdu"],
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduceMotion) return;

      /* =========================================
         HEADER
      ========================================= */

      gsap.from(".about-eyebrow", {
        y: 18,
        opacity: 0,
        duration: 0.65,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-eyebrow",
          start: "top 90%",
          once: true,
        },
      });

      gsap.from(".about-heading", {
        y: 35,
        opacity: 0,
        duration: 0.8,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".about-heading",
          start: "top 88%",
          once: true,
        },
      });

      /* =========================================
         INTRO
      ========================================= */

      gsap.from(".about-image-wrapper", {
        y: 30,
        opacity: 0,
        scale: 0.985,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-image-wrapper",
          start: "top 90%",
          once: true,
        },
      });

      gsap.from(".about-intro", {
        y: 25,
        opacity: 0,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-intro",
          start: "top 90%",
          once: true,
        },
      });

      gsap.from(".about-description", {
        y: 18,
        opacity: 0,
        duration: 0.65,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-description",
          start: "top 92%",
          once: true,
        },
      });

      /* =========================================
         EXPERTISE
      ========================================= */

      gsap.from(".expertise-header", {
        y: 18,
        opacity: 0,
        duration: 0.65,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".expertise-header",
          start: "top 90%",
          once: true,
        },
      });

      gsap.utils
        .toArray<HTMLElement>(".expertise-item")
        .forEach((item, index) => {
          gsap.from(item, {
            y: 20,
            opacity: 0,
            duration: 0.6,
            delay: index * 0.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 93%",
              once: true,
            },
          });
        });

      /* =========================================
         TECHNICAL SKILLS
      ========================================= */

      gsap.from(".skills-header", {
        y: 18,
        opacity: 0,
        duration: 0.65,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".skills-header",
          start: "top 90%",
          once: true,
        },
      });

      gsap.utils
        .toArray<HTMLElement>(".skill-row")
        .forEach((row, index) => {
          gsap.from(row, {
            y: 16,
            opacity: 0,
            duration: 0.55,
            delay: index * 0.04,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 94%",
              once: true,
            },
          });
        });

      /* =========================================
         IMAGE PARALLAX
      ========================================= */

      const imageWrapper =
        section.querySelector<HTMLElement>(".about-image-wrapper");

      const image =
        section.querySelector<HTMLElement>(".about-image");

      if (imageWrapper && image) {
        gsap.to(image, {
          yPercent: 4,
          ease: "none",
          scrollTrigger: {
            trigger: imageWrapper,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        /* =========================================
           IMAGE HOVER
        ========================================= */

        const handleEnter = () => {
          gsap.to(image, {
            scale: 1.035,
            duration: 0.65,
            ease: "power3.out",
          });
        };

        const handleLeave = () => {
          gsap.to(image, {
            scale: 1,
            duration: 0.65,
            ease: "power3.out",
          });
        };

        imageWrapper.addEventListener(
          "mouseenter",
          handleEnter
        );

        imageWrapper.addEventListener(
          "mouseleave",
          handleLeave
        );

        return () => {
          imageWrapper.removeEventListener(
            "mouseenter",
            handleEnter
          );

          imageWrapper.removeEventListener(
            "mouseleave",
            handleLeave
          );
        };
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-labelledby="about-heading"
      className="relative overflow-hidden bg-[#0a0a0a] px-5 py-[clamp(4.5rem,8vw,7rem)] text-white sm:px-6 md:px-10 lg:px-16"
    >
      <div className="mx-auto w-full max-w-[1600px]">

        {/* =====================================
            HEADER
        ====================================== */}

        <header className="mb-[clamp(3rem,6vw,5.5rem)]">
          <div className="about-eyebrow mb-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-white/40 sm:gap-4 sm:text-xs sm:tracking-[0.3em]">
            <span
              aria-hidden="true"
              className="h-px w-7 bg-white/30 sm:w-10"
            />

            <span>About Me</span>
          </div>

          <h2
            id="about-heading"
            className="about-heading text-[clamp(5rem,17vw,11rem)] font-medium leading-[0.78] tracking-[-0.075em]"
          >
            About
          </h2>
        </header>

        {/* =====================================
            INTRO
        ====================================== */}

        <div className="grid gap-[clamp(2.5rem,5vw,5rem)] lg:grid-cols-[0.8fr_1.2fr] lg:items-center">

          {/* IMAGE */}

          <div className="about-image-wrapper relative overflow-hidden bg-[#111]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-10 border border-white/10"
            />

            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src="/images/Shahzeb_Image.jpg"
                alt="Portrait of Shahzeb Soomro"
                fill
                priority
                unoptimized
                sizes="(max-width: 1023px) 100vw, 38vw"
                className="about-image object-contain object-center will-change-transform"
              />
            </div>
          </div>

          {/* TEXT */}

          <div className="flex min-w-0 flex-col justify-center">

            {/* INTRO HEADING */}

            <div className="about-intro">
              <p className="max-w-3xl text-[clamp(1.5rem,3.2vw,3.2rem)] font-medium leading-[1.07] tracking-[-0.04em]">
                I&apos;m Shahzeb Soomro, a Full-Stack Software Engineer building modern,
                scalable web experiences.
              </p>
            </div>

            {/* DESCRIPTION */}

            <div className="about-description mt-[clamp(1.5rem,3vw,2.25rem)] max-w-xl space-y-3 text-sm leading-6 text-white/45 sm:text-base sm:leading-7">
              <p>
                I build across the stack, from polished interfaces to backend systems and
                APIs.
              </p>

              <p>
                My core stack includes React, Next.js, TypeScript, Node.js, and MongoDB.
              </p>

              <p>
                I enjoy turning complex ideas into reliable, production-ready products.
              </p>
            </div>
          </div>
        </div>

        {/* =====================================
            EXPERTISE
        ====================================== */}

        <section
          aria-labelledby="expertise-heading"
          className="mt-[clamp(4.5rem,8vw,7rem)]"
        >
          <div className="expertise-header mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-[10px] uppercase tracking-[0.28em] text-white/30 sm:text-xs sm:tracking-[0.3em]">
                What I Do
              </p>

              <h3
                id="expertise-heading"
                className="text-[clamp(2.25rem,5vw,4.5rem)] font-medium leading-none tracking-[-0.055em]"
              >
                Expertise
              </h3>
            </div>

            <p className="max-w-sm text-sm leading-6 text-white/35">
              Engineering modern web products, scalable systems,
              and intelligent applications.
            </p>
          </div>

          {/* EXPERTISE GRID */}

          <div className="grid border-l border-t border-white/10 sm:grid-cols-2">
            {expertise.map((item) => (
              <article
                key={item.number}
                className="expertise-item group relative min-h-[230px] border-b border-r border-white/10 p-6 transition-colors duration-500 hover:bg-white/[0.025] sm:min-h-[250px] sm:p-8 md:min-h-[280px] md:p-9"
              >
                <div className="mb-[clamp(2.5rem,5vw,4rem)] flex items-center justify-between">
                  <span
                    className="text-xs text-white/25"
                    aria-label={`Expertise ${item.number}`}
                  >
                    {item.number}
                  </span>

                  <span
                    aria-hidden="true"
                    className="text-xs text-white/20 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                  >
                    ↗
                  </span>
                </div>

                <h4 className="max-w-md text-xl font-medium tracking-[-0.03em] sm:text-2xl md:text-3xl">
                  {item.title}
                </h4>

                <p className="mt-4 max-w-md text-sm leading-6 text-white/35">
                  {item.description}
                </p>

                <div
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-px w-0 bg-white/50 transition-all duration-500 group-hover:w-full"
                />
              </article>
            ))}
          </div>
        </section>

        {/* =====================================
            TECHNICAL SKILLS
        ====================================== */}

        <section
          aria-labelledby="skills-heading"
          className="mt-[clamp(4.5rem,8vw,7rem)]"
        >
          <div className="skills-header mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-[10px] uppercase tracking-[0.28em] text-white/30 sm:text-xs sm:tracking-[0.3em]">
                Education + Certifications
              </p>

              <h3
                id="skills-heading"
                className="text-[clamp(2.25rem,5vw,4.5rem)] font-medium leading-none tracking-[-0.055em]"
              >
                Technical Skills
              </h3>
            </div>

            <p className="max-w-sm text-sm leading-6 text-white/35">
              Technologies and tools I use to design, build, and ship modern applications.
            </p>
          </div>

          {/* SKILLS */}

          <div className="border-y border-white/10">
            {technicalSkills.map((group) => (
              <div
                key={group.category}
                className="skill-row grid gap-4 border-b border-white/10 py-5 last:border-b-0 sm:py-6 md:grid-cols-[160px_1fr] md:items-center md:py-6 lg:grid-cols-[180px_1fr]"
              >
                <span className="text-[10px] uppercase tracking-[0.25em] text-white/30">
                  {group.category}
                </span>

                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-white/10 px-3.5 py-1.5 text-xs text-white/55 transition-colors duration-300 hover:border-white/25 hover:text-white sm:px-4 sm:py-2"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <article className="rounded-[1.5rem] border border-white/10 bg-white/[0.02] p-5 sm:p-6">
              <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-white/30">Education</p>
              <h4 className="text-xl font-medium tracking-[-0.03em]">SZABIST</h4>
              <p className="mt-2 text-sm leading-6 text-white/45">Bachelor of Science in Computer Science · 2021 — 2025</p>
              <p className="mt-3 text-sm leading-6 text-white/35">Fresh graduate with a practical understanding of full-stack development, academic projects, and internship experience.</p>
            </article>

            <article className="rounded-[1.5rem] border border-white/10 bg-white/[0.02] p-5 sm:p-6">
              <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-white/30">Languages</p>
              <h4 className="text-xl font-medium tracking-[-0.03em]">Communication</h4>
              <p className="mt-2 text-sm leading-6 text-white/45">English · Professional</p>
              <p className="mt-2 text-sm leading-6 text-white/45">Urdu · Native</p>
            </article>
          </div>
        </section>
      </div>
    </section>
  );
}