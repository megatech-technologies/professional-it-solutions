/*==================================================
  PORTFOLIO PROJECTS
  PREMIUM INTERACTION ENGINE
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    const section =
        document.querySelector(".portfolio-projects");

    if (!section) return;


    const cards =
        section.querySelectorAll(
            ".portfolio-project-card"
        );


    if (!cards.length) return;



    /*==================================================
      SCROLL REVEAL
    ==================================================*/

    const revealObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) return;

                    const card =
                        entry.target;

                    const index =
                        [...cards].indexOf(card);

                    setTimeout(() => {

                        card.classList.add(
                            "is-visible"
                        );

                    }, index * 180);

                    revealObserver.unobserve(card);

                });

            },
            {
                threshold:.18
            }
        );


    cards.forEach((card) => {

        revealObserver.observe(card);

    });



    /*==================================================
      MOUSE LIGHT SYSTEM
    ==================================================*/

    cards.forEach((card) => {

        const glow =
            card.querySelector(
                ".project-card-glow"
            );


        card.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const percentX =
                    (x / rect.width) * 100;


                const percentY =
                    (y / rect.height) * 100;


                card.style.setProperty(
                    "--glow-x",
                    `${percentX}%`
                );


                card.style.setProperty(
                    "--glow-y",
                    `${percentY}%`
                );


                /*
                 * Subtle perspective movement.
                 *
                 * This is NOT the same as fx-tilt.
                 * It only moves the internal light.
                 */

                if (glow) {

                    glow.style.transform =
                        `translate(
                            ${percentX / 12 - 4}%,
                            ${percentY / 12 - 4}%
                        )`;

                }

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.setProperty(
                    "--glow-x",
                    "50%"
                );


                card.style.setProperty(
                    "--glow-y",
                    "50%"
                );

            }
        );

    });



    /*==================================================
      PROJECT CARD ACTIVE STATE
    ==================================================*/

    cards.forEach((card) => {

        card.addEventListener(
            "mouseenter",
            () => {

                cards.forEach((other) => {

                    if (other !== card) {

                        other.classList.add(
                            "project-dimmed"
                        );

                    }

                });

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                cards.forEach((other) => {

                    other.classList.remove(
                        "project-dimmed"
                    );

                });

            }
        );

    });



    /*==================================================
      VIEW BUTTON ARROW
    ==================================================*/

    const buttons =
        section.querySelectorAll(
            ".project-view-btn"
        );


    buttons.forEach((button) => {

        button.addEventListener(
            "mouseenter",
            () => {

                const icon =
                    button.querySelector("i");

                if (!icon) return;

                icon.style.transform =
                    "translateX(7px)";

            }
        );


        button.addEventListener(
            "mouseleave",
            () => {

                const icon =
                    button.querySelector("i");

                if (!icon) return;

                icon.style.transform =
                    "translateX(0)";

            }
        );

    });



    /*==================================================
      ANIMATED PROJECT COUNTER
    ==================================================*/

    const projectCount =
        section.querySelector(
            ".projects-live-status strong"
        );


    if (projectCount) {

        let displayed = 0;

        const target = cards.length;


        const countObserver =
            new IntersectionObserver(
                (entries) => {

                    if (!entries[0].isIntersecting)
                        return;


                    const counter =
                        setInterval(() => {

                            displayed++;

                            projectCount.textContent =
                                String(displayed)
                                    .padStart(2, "0") +
                                " PROJECTS";


                            if (
                                displayed >= target
                            ) {

                                clearInterval(
                                    counter
                                );

                            }

                        }, 180);


                    countObserver.disconnect();

                },
                {
                    threshold:.8
                }
            );


        countObserver.observe(
            projectCount
        );

    }



    /*==================================================
      REDUCE MOTION SUPPORT
    ==================================================*/

    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        cards.forEach((card) => {

            card.classList.add(
                "is-visible"
            );

        });

    }

});