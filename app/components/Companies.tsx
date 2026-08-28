"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Company = {
  number: string;
  company: string;
  role: string;
  location: string;
  period: string;
  description: string;
  stack: string[];
};

const companies: Company[] = [
  {
    number: "01",
    company: "Elevvo",
    role: "Front-End Developer Intern",
    location: "Remote",
    period: "Aug 2025 — Sep 2025",
    description:
      "Developed responsive web applications including dashboards, task management systems, and reusable UI components. Built interactive interfaces using React.js, JavaScript, HTML, and CSS, and improved performance and usability by optimizing components and layouts.",
    stack: ["React.js", "JavaScript", "HTML5", "CSS3", "Responsive UI"],
  },
];

export default function Companies() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".experience-header", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      gsap.utils.toArray<HTMLElement>(".company-item").forEach((item) => {
        const line = item.querySelector<HTMLElement>(".company-line");
        const content = item.querySelector<HTMLElement>(".company-content");
        const number = item.querySelector<HTMLElement>(".company-number");
        const actions = item.querySelector<HTMLElement>(".company-actions");

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 82%",
            once: true,
          },
        });

        if (line) {
          timeline.from(line, {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 1,
            ease: "power3.out",
          });
        }

        if (number) {
          timeline.from(
            number,
            {
              opacity: 0,
              x: -20,
              duration: 0.5,
              ease: "power3.out",
            },
            "-=0.6"
          );
        }

        if (content) {
          timeline.from(
            content,
            {
              y: 50,
              opacity: 0,
              duration: 0.8,
              ease: "power3.out",
            },
            "-=0.4"
          );
        }

        if (actions) {
          timeline.from(
            actions,
            {
              y: 20,
              opacity: 0,
              duration: 0.6,
              ease: "power3.out",
            },
            "-=0.4"
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="bg-[#0a0a0a] px-5 py-28 text-white md:px-10 md:py-36 lg:px-16"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="experience-header mb-24 flex flex-col justify-between gap-10 md:mb-32 md:flex-row md:items-end">
          <div>
            <div className="mb-7 flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-white/40">
              <span className="h-px w-10 bg-white/30" />
              Experience
            </div>

            <h2 className="text-[15vw] font-medium leading-[0.8] tracking-[-0.07em] md:text-[10vw]">
              Experience
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-white/40">
            Professional experience from internships and project work, focused on building
            responsive interfaces and practical full-stack solutions.
          </p>
        </div>

        <div>
          {companies.map((company) => (
            <article
              key={company.number}
              className="company-item group relative py-14 md:py-20"
            >
              <div className="company-line absolute left-0 top-0 h-px w-full bg-white/15" />

              <div className="grid gap-10 md:grid-cols-[80px_1fr_1fr] md:gap-12 lg:gap-16">
                <span className="company-number pt-1 text-sm text-white/30">
                  {company.number}
                </span>

                <div className="company-content">
                  <p className="mb-4 text-xs uppercase tracking-[0.2em] text-white/40">
                    {company.period}
                  </p>

                  <h3 className="company-title text-4xl font-medium tracking-[-0.04em] md:text-6xl lg:text-7xl">
                    {company.company}
                  </h3>

                  <p className="mt-5 text-sm text-white/40">{company.role}</p>
                  <p className="mt-2 text-xs text-white/30">{company.location}</p>
                </div>

                <div className="flex flex-col justify-between gap-10">
                  <p className="max-w-xl text-sm leading-7 text-white/50 md:text-base">
                    {company.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {company.stack.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/15 px-3 py-1.5 text-[10px] uppercase tracking-[0.12em] text-white/40 transition-colors duration-300 group-hover:border-white/30 group-hover:text-white/70"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="companies-see-more mt-10 border-t border-white/15 pt-16">
          <div className="flex justify-center">
            <Link href="#contact" className="group flex items-center gap-5">
              <span className="text-sm font-normal uppercase tracking-[0.2em] text-white/60 transition-colors duration-300 group-hover:text-white">
                Contact Me
              </span>

              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-black">
                <span className="text-lg transition-transform duration-300 group-hover:rotate-45">
                  ↗
                </span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
