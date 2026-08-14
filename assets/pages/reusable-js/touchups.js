/*==================================================
  TOUCHUPS.JS
  Reusable Visual Effects & Interactions
  MegaTech Technologies

  Works with:
  TOUCHUPS.CSS

  Includes:
  01. Scroll Reveal
  02. Parallax
  03. Magnetic Buttons
  04. 3D Card Tilt
  05. Card Spotlight
  06. Scroll Progress
==================================================*/


/*==================================================
  01. SCROLL REVEAL
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    const revealItems = document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right, .reveal-scale"
    );

    if (!revealItems.length) return;

    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        revealItems.forEach(item => {
            item.classList.add("active");
        });

        return;
    }


    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add("active");

                observer.unobserve(entry.target);

            });

        },
        {
            threshold:0.12,
            rootMargin:"0px 0px -60px 0px"
        }
    );


    revealItems.forEach(item => {

        revealObserver.observe(item);

    });

});



/*==================================================
  02. PARALLAX
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    const parallaxItems =
        document.querySelectorAll(".fx-parallax");

    if (!parallaxItems.length) return;


    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) return;


    let parallaxTicking = false;


    const updateParallax = () => {

        parallaxItems.forEach(item => {

            const speed =
                parseFloat(
                    item.dataset.speed
                ) || 0.15;


            const rect =
                item.getBoundingClientRect();


            const elementCenter =
                rect.top +
                rect.height / 2;


            const viewportCenter =
                window.innerHeight / 2;


            const distance =
                elementCenter -
                viewportCenter;


            const movement =
                distance *
                speed *
                -0.15;


            item.style.transform =
                `translate3d(0, ${movement}px, 0)`;

        });


        parallaxTicking = false;

    };


    const requestParallaxUpdate = () => {

        if (!parallaxTicking) {

            requestAnimationFrame(
                updateParallax
            );

            parallaxTicking = true;

        }

    };


    window.addEventListener(
        "scroll",
        requestParallaxUpdate,
        {
            passive:true
        }
    );


    window.addEventListener(
        "resize",
        requestParallaxUpdate
    );


    updateParallax();

});



/*==================================================
  03. MAGNETIC BUTTONS
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    const magneticButtons =
        document.querySelectorAll(".fx-magnetic");

    if (!magneticButtons.length) return;


    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) return;


    magneticButtons.forEach(button => {


        button.addEventListener(
            "mousemove",
            event => {

                const rect =
                    button.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;


                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;


                const strength =
                    parseFloat(
                        button.dataset.magneticStrength
                    ) || 0.25;


                button.style.transform =
                    `translate(
                        ${x * strength}px,
                        ${y * strength}px
                    )`;

            }
        );


        button.addEventListener(
            "mouseleave",
            () => {

                button.style.transform = "";

            }
        );

    });

});



/*==================================================
  04. 3D CARD TILT
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    const tiltCards =
        document.querySelectorAll(".fx-tilt");

    if (!tiltCards.length) return;


    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) return;


    /*
      Disable tilt on touch devices.
      This keeps mobile interactions clean.
    */

    if (
        window.matchMedia(
            "(hover:none), (pointer:coarse)"
        ).matches
    ) return;


    tiltCards.forEach(card => {


        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateY =
                    ((x - centerX) /
                    centerX) * 8;


                const rotateX =
                    ((centerY - y) /
                    centerY) * 8;


                card.style.transform =
                    `perspective(1000px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)`;


                /*
                  Update spotlight position
                  when the card also uses
                  .fx-spotlight
                */

                if (
                    card.classList.contains(
                        "fx-spotlight"
                    )
                ) {

                    card.style.setProperty(
                        "--mouse-x",
                        `${x}px`
                    );


                    card.style.setProperty(
                        "--mouse-y",
                        `${y}px`
                    );

                }

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform = "";


                if (
                    card.classList.contains(
                        "fx-spotlight"
                    )
                ) {

                    card.style.setProperty(
                        "--mouse-x",
                        "50%"
                    );


                    card.style.setProperty(
                        "--mouse-y",
                        "50%"
                    );

                }

            }
        );

    });

});



/*==================================================
  05. SCROLL PROGRESS
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    const progress =
        document.querySelector(
            ".scroll-progress"
        );

    if (!progress) return;


    const updateScrollProgress = () => {


        const scrollTop =
            window.scrollY;


        const documentHeight =
            document.documentElement
                .scrollHeight -
            window.innerHeight;


        if (documentHeight <= 0) {

            progress.style.width = "0";

            return;

        }


        const percentage =
            (scrollTop /
            documentHeight) *
            100;


        progress.style.width =
            `${Math.min(
                100,
                Math.max(
                    0,
                    percentage
                )
            )}%`;

    };


    window.addEventListener(
        "scroll",
        updateScrollProgress,
        {
            passive:true
        }
    );


    window.addEventListener(
        "resize",
        updateScrollProgress
    );


    updateScrollProgress();

});



/*==================================================
  END OF TOUCHUPS.JS
==================================================*/