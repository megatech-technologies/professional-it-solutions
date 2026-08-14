
/*==================================================
  PORTFOLIO PROCESS — CINEMATIC SYSTEM
==================================================*/

console.log("PORTFOLIO PROCESS JS LOADED");


(function () {

    /*==================================================
      INITIALIZE
    ==================================================*/

    function initPortfolioProcess() {

        const section =
            document.querySelector(".portfolio-process");


        /*------------------------------------------------
          SAFETY CHECK
        ------------------------------------------------*/

        if (!section) {

            console.warn(
                "Portfolio process section not found."
            );

            return;

        }


        /*==================================================
          ELEMENTS
        ==================================================*/

        const cards =
            section.querySelectorAll(
                ".portfolio-process-card"
            );


        const progress =
            section.querySelector(
                ".portfolio-process-line-progress"
            );


        /*------------------------------------------------
          SAFETY CHECK
        ------------------------------------------------*/

        if (!cards.length) {

            console.warn(
                "Portfolio process cards not found."
            );

            return;

        }


        console.log(
            "Portfolio process initialized:",
            cards.length,
            "cards"
        );


        /*==================================================
          REDUCED MOTION
        ==================================================*/

        const reducedMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;


        if (reducedMotion) {

            cards.forEach((card) => {

                card.style.opacity = "1";

            });


            if (progress) {

                progress.style.width = "100%";

            }


            return;

        }


        /*==================================================
          INITIAL CARD STATE
          
          IMPORTANT:
          Only opacity is controlled here.
          No transform is used.
          
          This prevents conflicts with touchups.js.
        ==================================================*/

        cards.forEach((card) => {

            card.style.opacity = "0";

        });


        /*==================================================
          CARD REVEAL
        ==================================================*/

        function revealCards() {

            cards.forEach((card, index) => {

                card.animate(
                    [
                        {
                            opacity: 0
                        },

                        {
                            opacity: 1
                        }
                    ],
                    {
                        duration: 800,

                        delay:
                            index * 180,

                        easing:
                            "ease-out",

                        fill: "forwards"
                    }
                );

            });

        }


        /*==================================================
          PROGRESS LINE
        ==================================================*/

        function animateProgressLine() {

            if (!progress) return;


            progress.animate(
                [
                    {
                        width: "0%"
                    },

                    {
                        width: "100%"
                    }
                ],
                {
                    duration: 2200,

                    delay: 300,

                    easing:
                        "cubic-bezier(.16,1,.3,1)",

                    fill: "forwards"
                }
            );

        }


        /*==================================================
          INTERSECTION OBSERVER
        ==================================================*/

        let hasAnimated = false;


        const observer =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach((entry) => {

                        if (
                            !entry.isIntersecting ||
                            hasAnimated
                        ) {

                            return;

                        }


                        hasAnimated = true;


                        /*----------------------------------
                          REVEAL CARDS
                        ----------------------------------*/

                        revealCards();


                        /*----------------------------------
                          ANIMATE PROGRESS
                        ----------------------------------*/

                        animateProgressLine();


                        /*----------------------------------
                          STOP OBSERVING
                        ----------------------------------*/

                        observer.unobserve(
                            section
                        );

                    });

                },
                {
                    threshold: 0.2
                }
            );


        observer.observe(section);

    }


    /*==================================================
      DOM READY
    ==================================================*/

    if (
        document.readyState === "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initPortfolioProcess
        );

    } else {

        initPortfolioProcess();

    }

})();