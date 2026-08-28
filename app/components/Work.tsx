"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Project = {
  number: string;
  title: string;
  category: string;
  role: string;
  description: string;
  tech: string[];
  image?: string;
  github?: string;
  live?: string;
};

type WorkProps = {
  limit?: number;
  showMore?: boolean;
};

export const projects: Project[] = [
  {
    number: "01",
    title: "ResolveSuite",
    category: "FYP · Complaint Management",
    role: "Full Stack Developer",
    description:
      "Developed a scalable full-stack complaint management system using Node.js, Express.js, React.js, and MongoDB with RESTful APIs and role-based access control.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "RBAC"],
    image: "/images/ResolveSuite.png",
  },
  {
    number: "02",
    title: "MovieMatch",
    category: "Social Movie Platform",
    role: "Full Stack Developer",
    description:
      "Built a full-stack web application for movie discovery and social interaction, including authentication, personalized recommendations, and group features.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "UX"],
    image: "/images/MovieMatch.png",
  },
  {
    number: "03",
    title: "SnapTab",
    category: "Live Bill Splitting",
    role: "MERN Stack Developer",
    description:
      "Developed a real-time bill splitting application using the MERN stack with QR code and room code joining, live item claiming, automatic cost splitting, OCR-based receipt scanning, and host dashboard features.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "OCR"],
    github: "https://github.com/Shahzebsoomro1",
  },
];

export default function Work({
  limit,
  showMore = false,
}: WorkProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const visibleProjects =
    limit !== undefined ? projects.slice(0, limit) : projects;

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      /*
       * Respect reduced-motion preferences.
       */
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduceMotion) {
        gsap.set(
          [
            ".work-eyebrow",
            ".work-heading",
            ".work-description",
            ".project-item",
          ],
          {
            clearProps: "all",
          }
        );

        return;
      }

      /*
       * ================================
       * HEADER
       * ================================
       */

      gsap.from(".work-eyebrow", {
        y: 18,
        opacity: 0,
        duration: 0.65,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".work-header",
          start: "top 88%",
          once: true,
        },
      });

      gsap.from(".work-heading", {
        y: 40,
        opacity: 0,
        duration: 0.85,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".work-header",
          start: "top 88%",
          once: true,
        },
      });

      gsap.from(".work-description", {
        y: 20,
        opacity: 0,
        duration: 0.65,
        delay: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".work-header",
          start: "top 88%",
          once: true,
        },
      });

      /*
       * ================================
       * PROJECTS
       *
       * Important:
       * We animate the project as a whole.
       * This prevents individual children from
       * accidentally remaining invisible.
       * ================================
       */

      const projectItems =
        gsap.utils.toArray<HTMLElement>(".project-item");

      projectItems.forEach((project, index) => {
        const line = project.querySelector<HTMLElement>(
          ".project-line"
        );

        gsap.set(project, {
          opacity: 1,
          y: 0,
        });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: project,
            start: "top 90%",
            once: true,
          },
        });

        timeline.from(project, {
          y: 35,
          opacity: 0,
          duration: 0.75,
          delay: Math.min(index * 0.04, 0.12),
          ease: "power3.out",
        });

        if (line) {
          timeline.from(
            line,
            {
              scaleX: 0,
              transformOrigin: "left center",
              duration: 0.7,
              ease: "power3.out",
            },
            "-=0.55"
          );
        }
      });

      /*
       * ================================
       * IMAGE HOVER
       *
       * Desktop only.
       * ================================
       */

      if (window.matchMedia("(hover: hover)").matches) {
        projectItems.forEach((project) => {
          const preview =
            project.querySelector<HTMLElement>(
              ".project-preview"
            );

          const image =
            project.querySelector<HTMLElement>(
              ".project-image"
            );

          const title =
            project.querySelector<HTMLElement>(
              ".project-title"
            );

          const handleEnter = () => {
            if (preview) {
              gsap.to(preview, {
                y: -5,
                duration: 0.45,
                ease: "power3.out",
              });
            }

            if (image) {
              gsap.to(image, {
                scale: 1.025,
                duration: 0.7,
                ease: "power3.out",
              });
            }

            if (title) {
              gsap.to(title, {
                x: 8,
                duration: 0.4,
                ease: "power3.out",
              });
            }
          };

          const handleLeave = () => {
            if (preview) {
              gsap.to(preview, {
                y: 0,
                duration: 0.45,
                ease: "power3.out",
              });
            }

            if (image) {
              gsap.to(image, {
                scale: 1,
                duration: 0.7,
                ease: "power3.out",
              });
            }

            if (title) {
              gsap.to(title, {
                x: 0,
                duration: 0.4,
                ease: "power3.out",
              });
            }
          };

          project.addEventListener(
            "mouseenter",
            handleEnter
          );

          project.addEventListener(
            "mouseleave",
            handleLeave
          );

          /*
           * Cleanup is handled explicitly here.
           * We do NOT reference `ctx` from inside
           * its own initialization.
           */
          project.dataset.workHover = "true";

          project.addEventListener(
            "work-cleanup",
            () => {
              project.removeEventListener(
                "mouseenter",
                handleEnter
              );

              project.removeEventListener(
                "mouseleave",
                handleLeave
              );
            },
            { once: true }
          );
        });
      }
    }, section);

    return () => {
      /*
       * Remove hover listeners safely.
       */
      const projectItems =
        section.querySelectorAll<HTMLElement>(
          ".project-item"
        );

      projectItems.forEach((project) => {
        project.dispatchEvent(
          new Event("work-cleanup")
        );
      });

      ctx.revert();
    };
  }, [visibleProjects.length]);

  return (
    <section
      ref={sectionRef}
      id="work"
      aria-labelledby="work-heading"
      className="
        relative
        overflow-hidden
        bg-[#0a0a0a]
        px-5
        pb-20
        pt-16
        text-white
        sm:px-6
        sm:pb-24
        sm:pt-20
        md:px-10
        md:pb-28
        md:pt-24
        lg:px-16
        lg:pb-32
        lg:pt-28
      "
    >
      <div className="mx-auto w-full max-w-[1600px]">

        {/* =====================================
            HEADER
        ====================================== */}

        <header
          className="
            work-header
            mb-14
            flex
            flex-col
            gap-7
            sm:mb-16
            sm:gap-8
            md:mb-20
            lg:flex-row
            lg:items-end
            lg:justify-between
            lg:gap-12
          "
        >
          <div className="min-w-0">

            <div
              className="
                work-eyebrow
                mb-5
                flex
                items-center
                gap-3
                text-[9px]
                uppercase
                tracking-[0.24em]
                text-white/40
                sm:mb-6
                sm:gap-4
                sm:text-xs
                sm:tracking-[0.3em]
              "
            >
              <span
                aria-hidden="true"
                className="h-px w-7 shrink-0 bg-white/30 sm:w-10"
              />

              <span>Selected Work</span>
            </div>

            <h2
              id="work-heading"
              className="
                work-heading
                whitespace-nowrap
                text-[18vw]
                font-medium
                leading-[0.8]
                tracking-[-0.075em]
                sm:text-[16vw]
                md:text-[12vw]
                lg:text-[10.5vw]
              "
            >
              Projects
            </h2>
          </div>

          <p
            className="
              work-description
              max-w-md
              text-sm
              leading-6
              text-white/40
              sm:text-base
              sm:leading-7
              lg:max-w-sm
            "
          >
            A selection of full-stack applications,
            platforms, and AI projects built across
            professional and personal work.
          </p>
        </header>

        {/* =====================================
            PROJECTS
        ====================================== */}

        <div>
          {visibleProjects.map((project) => (
            <article
              key={project.number}
              className="
                project-item
                group
                relative
                py-12
                sm:py-16
                md:py-20
                lg:py-24
              "
            >

              {/* TOP LINE */}

              <div
                aria-hidden="true"
                className="
                  project-line
                  absolute
                  left-0
                  top-0
                  h-px
                  w-full
                  bg-white/15
                "
              />

              {/* =================================
                  PROJECT INFO
              ================================== */}

              <div
                className="
                  grid
                  gap-8
                  md:gap-10
                  lg:grid-cols-[60px_minmax(0,1.1fr)_minmax(280px,0.9fr)]
                  lg:gap-12
                  xl:grid-cols-[80px_1.15fr_1fr]
                  xl:gap-16
                "
              >

                {/* NUMBER */}

                <div className="project-number text-xs text-white/30 sm:text-sm">
                  {project.number}
                </div>

                {/* TITLE */}

                <div className="min-w-0">

                  <div
                    className="
                      project-category
                      mb-4
                      text-[9px]
                      uppercase
                      tracking-[0.2em]
                      text-white/40
                      sm:mb-5
                      sm:text-xs
                    "
                  >
                    {project.category}
                  </div>

                  <h3
                    className="
                      project-title
                      break-normal
                      lg:whitespace-nowrap
                      text-[clamp(2.5rem,7vw,6.2rem)]
                      font-medium
                      leading-[0.88]
                      tracking-[-0.055em]
                    "
                  >
                    {project.title}
                  </h3>

                  <p
                    className="
                      project-role
                      mt-4
                      max-w-xl
                      text-[9px]
                      uppercase
                      tracking-[0.14em]
                      leading-5
                      text-white/30
                      sm:mt-5
                      sm:text-xs
                      sm:tracking-[0.15em]
                    "
                  >
                    {project.role}
                  </p>
                </div>

                {/* DESCRIPTION */}

                <div className="flex min-w-0 flex-col justify-between gap-7 lg:pt-7">
                  <p
                    className="
                      project-description
                      max-w-lg
                      text-sm
                      leading-6
                      text-white/50
                      sm:text-base
                      sm:leading-7
                    "
                  >
                    {project.description}
                  </p>

                  <div className="project-tags flex flex-wrap gap-2">
                    {project.tech.map((technology) => (
                      <span
                        key={technology}
                        className="
                          rounded-full
                          border
                          border-white/15
                          px-3
                          py-1.5
                          text-[9px]
                          uppercase
                          tracking-[0.1em]
                          text-white/40
                          transition-colors
                          duration-300
                          group-hover:border-white/30
                          group-hover:text-white/70
                          sm:px-3.5
                          sm:text-[10px]
                        "
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* =================================
                  PROJECT IMAGE
              ================================== */}

              {project.image && (
                <div
                  className="
                    project-preview
                    relative
                    mt-10
                    w-full
                    overflow-hidden
                    bg-[#111]
                    sm:mt-12
                    md:mt-14
                  "
                >

                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      z-10
                      border
                      border-white/10
                    "
                  />

                  <div
                    className="
                      project-image
                      relative
                      aspect-[16/10]
                      w-full
                      origin-center
                      overflow-hidden
                      sm:aspect-[16/9]
                    "
                  >
                    <Image
                      src={project.image}
                      alt={`${project.title} project screenshot`}
                      fill
                      sizes="100vw"
                      className="
                        object-cover
                        object-center
                      "
                    />
                  </div>
                </div>
              )}

              {/* =================================
                  ACTIONS
              ================================== */}

              {(project.github || project.live) && (
                <div
                  className="
                    project-actions
                    mt-5
                    flex
                    flex-wrap
                    items-center
                    gap-2.5
                    sm:mt-6
                    sm:gap-3
                  "
                >
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} source code on GitHub`}
                      className="
                        magnetic-button
                        group
                        inline-flex
                        min-h-11
                        items-center
                        gap-3
                        rounded-full
                        border
                        border-white/15
                        px-4
                        py-2.5
                        text-[10px]
                        uppercase
                        tracking-[0.14em]
                        text-white/55
                        transition-all
                        duration-300
                        hover:border-white/40
                        hover:bg-white
                        hover:text-black
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-white
                        focus-visible:ring-offset-2
                        focus-visible:ring-offset-[#0a0a0a]
                        sm:px-5
                        sm:text-xs
                      "
                    >
                      <span>GitHub</span>

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
                    </a>
                  )}

                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${project.title} live website`}
                      className="
                        magnetic-button
                        group
                        inline-flex
                        min-h-11
                        items-center
                        gap-3
                        rounded-full
                        bg-white
                        px-4
                        py-2.5
                        text-[10px]
                        uppercase
                        tracking-[0.14em]
                        text-black
                        transition-all
                        duration-300
                        hover:bg-white/80
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-white
                        focus-visible:ring-offset-2
                        focus-visible:ring-offset-[#0a0a0a]
                        sm:px-5
                        sm:text-xs
                      "
                    >
                      <span>Live Site</span>

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
                    </a>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>

        {/* =====================================
            SEE MORE
        ====================================== */}

        {showMore && (
          <div
            className="
              flex
              justify-center
              border-t
              border-white/15
              pt-12
              sm:pt-16
            "
          >
            <Link
              href="/work"
              className="
                magnetic-button
                group
                inline-flex
                min-h-11
                items-center
                gap-4
                rounded-full
                px-2
                py-2
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-white
                focus-visible:ring-offset-2
                focus-visible:ring-offset-[#0a0a0a]
              "
            >
              <span
                className="
                  text-[10px]
                  uppercase
                  tracking-[0.18em]
                  text-white/60
                  transition-colors
                  duration-300
                  group-hover:text-white
                  sm:text-sm
                  sm:tracking-[0.2em]
                "
              >
                See All Work
              </span>

              <span
                aria-hidden="true"
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/20
                  transition-colors
                  duration-300
                  group-hover:border-white
                "
              >
                <span
                  className="
                    text-lg
                    transition-transform
                    duration-300
                    group-hover:rotate-45
                  "
                >
                  ↗
                </span>
              </span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}