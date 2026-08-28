"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navigation = [
    {
        label: "Home",
        href: "/",
    },
    {
        label: "About",
        href: "#about",
    },
    {
        label: "Work",
        href: "#work",
    },
    {
        label: "Experience",
        href: "#experience",
    },
    {
        label: "Contact",
        href: "#contact",
    },
];

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    /* =========================================
       SCROLL STATE
    ========================================== */

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 30);
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    /* =========================================
       LOCK BODY WHEN MOBILE MENU IS OPEN
    ========================================== */

    useEffect(() => {
        if (!menuOpen) {
            document.body.style.overflow = "";
            return;
        }

        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    /* =========================================
       ESCAPE KEY
    ========================================== */

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setMenuOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    /* =========================================
       CLOSE MENU
    ========================================== */

    const closeMenu = () => {
        setMenuOpen(false);
    };

    /* =========================================
       NAVIGATION
    ========================================== */

    const handleNavigation = (
        e: React.MouseEvent<HTMLAnchorElement>,
        href: string
    ) => {
        /*
         * Home / normal routes
         */
        if (!href.startsWith("#")) {
            setMenuOpen(false);
            return;
        }

        /*
         * Hash navigation
         */
        const target = document.querySelector(href);

        if (target) {
            e.preventDefault();

            setMenuOpen(false);

            /*
             * Give the menu a moment to close before
             * starting the scroll animation.
             */
            window.setTimeout(() => {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });

                window.history.pushState(null, "", href);
            }, 100);
        } else {
            /*
             * If the section isn't on the current page,
             * navigate back to the homepage.
             */
            e.preventDefault();

            setMenuOpen(false);

            window.location.href = `/${href}`;
        }
    };

    return (
        <>
            {/* =========================================
          HEADER
      ========================================== */}

            <header
                className={`fixed left-0 top-0 z-50 w-full transition-all duration-500 ${scrolled || menuOpen
                        ? "bg-black/75 backdrop-blur-xl"
                        : "bg-transparent"
                    }`}
            >
                <div className="mx-auto flex h-16 w-full max-w-[1800px] items-center justify-between px-5 sm:h-20 sm:px-6 md:px-10 lg:px-16">

                    {/* =====================================
              LOGO
          ====================================== */}

                    <Link
                        href="/"
                        onClick={closeMenu}
                        className="group relative z-[60] flex items-center gap-2.5"
                        aria-label="Shahzeb Soomro home"
                    >
                        <span className="text-sm font-medium tracking-tight text-white">
                            Shahzeb Soomro
                        </span>

                        <span
                            aria-hidden="true"
                            className="h-1.5 w-1.5 rounded-full bg-white transition-transform duration-300 group-hover:scale-150 sm:h-2 sm:w-2"
                        />
                    </Link>

                    {/* =====================================
              DESKTOP NAVIGATION
          ====================================== */}

                    <nav
                        aria-label="Main navigation"
                        className="hidden items-center gap-7 md:flex lg:gap-9"
                    >
                        {navigation.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={(e) =>
                                    handleNavigation(e, item.href)
                                }
                                className="group relative py-2 text-[11px] uppercase tracking-[0.18em] text-white/50 transition-colors duration-300 hover:text-white lg:text-xs"
                            >
                                {item.label}

                                <span
                                    aria-hidden="true"
                                    className="absolute bottom-0 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full"
                                />
                            </Link>
                        ))}
                    </nav>

                    {/* =====================================
              DESKTOP AVAILABLE
          ====================================== */}

                    <a
                        href="mailto:soomroshahzeb8819@gmail.com"
                        className="hidden items-center gap-2 text-[11px] uppercase tracking-[0.15em] text-white/50 transition-colors duration-300 hover:text-white sm:flex md:text-xs"
                    >
                        <span
                            aria-hidden="true"
                            className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400 sm:h-2 sm:w-2"
                        />

                        <span>Available</span>
                    </a>

                    {/* =====================================
              MOBILE MENU BUTTON
          ====================================== */}

                    <button
                        type="button"
                        onClick={() => setMenuOpen((prev) => !prev)}
                        className="relative z-[60] flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/40 transition-colors duration-300 hover:border-white/30 hover:bg-white/[0.05] md:hidden"
                        aria-label={
                            menuOpen
                                ? "Close navigation menu"
                                : "Open navigation menu"
                        }
                        aria-expanded={menuOpen}
                        aria-controls="mobile-navigation"
                    >
                        <span
                            aria-hidden="true"
                            className="relative block h-4 w-4"
                        >
                            {/* TOP / LEFT LINE */}

                            <span
                                className={`absolute left-0 top-1/2 h-px w-4 origin-center bg-white transition-transform duration-300 ${menuOpen
                                        ? "rotate-45"
                                        : "-translate-y-[3px]"
                                    }`}
                            />

                            {/* BOTTOM / RIGHT LINE */}

                            <span
                                className={`absolute left-0 top-1/2 h-px w-4 origin-center bg-white transition-transform duration-300 ${menuOpen
                                        ? "-rotate-45"
                                        : "translate-y-[3px]"
                                    }`}
                            />
                        </span>
                    </button>
                </div>

                {/* =========================================
            MOBILE NAVIGATION
        ========================================== */}

                <div
                    id="mobile-navigation"
                    aria-hidden={!menuOpen}
                    className={`absolute left-0 top-full w-full border-t border-white/10 bg-[#0a0a0a]/98 backdrop-blur-xl transition-all duration-300 md:hidden ${menuOpen
                            ? "visible translate-y-0 opacity-100"
                            : "invisible -translate-y-2 opacity-0"
                        }`}
                >
                    <nav
                        aria-label="Mobile navigation"
                        className="px-5 pb-7 pt-5 sm:px-6"
                    >
                        {/* =====================================
                MOBILE LINKS
            ====================================== */}

                        <div className="divide-y divide-white/10 border-y border-white/10">
                            {navigation.map((item, index) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    tabIndex={menuOpen ? 0 : -1}
                                    onClick={(e) =>
                                        handleNavigation(e, item.href)
                                    }
                                    className="group flex min-h-[56px] items-center justify-between py-4 text-lg font-medium tracking-[-0.02em] text-white/75 transition-colors duration-300 hover:text-white"
                                >
                                    <span>{item.label}</span>

                                    <span
                                        aria-hidden="true"
                                        className="text-[10px] uppercase tracking-[0.15em] text-white/25 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white/50"
                                    >
                                        {String(index + 1).padStart(2, "0")} ↗
                                    </span>
                                </Link>
                            ))}
                        </div>

                        {/* =====================================
                MOBILE FOOTER
            ====================================== */}

                        <div className="mt-6 flex items-center justify-between gap-4">
                            <a
                                href="mailto:soomroshahzeb8819@gmail.com"
                                onClick={closeMenu}
                                className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-white/45 transition-colors hover:text-white"
                            >
                                <span
                                    aria-hidden="true"
                                    className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400"
                                />

                                <span>Available</span>
                            </a>

                            <a
                                href="mailto:soomroshahzeb8819@gmail.com"
                                onClick={closeMenu}
                                className="truncate text-[10px] tracking-[0.03em] text-white/30 transition-colors hover:text-white/70"
                            >
                                Email Me
                            </a>
                        </div>
                    </nav>
                </div>
            </header>
        </>
    );
}