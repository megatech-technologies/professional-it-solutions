/*==================================================
  PORTFOLIO CLIENTS — PREMIUM MARQUEE SYSTEM
==================================================*/

console.log("PORTFOLIO CLIENTS JS LOADED");


(function () {

    function initClients() {

        const marquee =
            document.querySelector(".clients-marquee");

        const track =
            document.querySelector(".clients-marquee-track");

        if (!marquee || !track) return;


        const originalCards =
            Array.from(
                track.querySelectorAll(".client-card")
            );


        if (!originalCards.length) return;


        /*==================================================
          DUPLICATE CARDS FOR INFINITE LOOP
        ==================================================*/

        originalCards.forEach((card) => {

            const clone =
                card.cloneNode(true);

            clone.setAttribute(
                "aria-hidden",
                "true"
            );

            track.appendChild(clone);

        });


        /*==================================================
          MARQUEE ENGINE
        ==================================================*/

        let position = 0;

        let speed = 0.45;

        let targetSpeed = 0.45;

        let lastTime = performance.now();


        function marqueeLoop(time) {

            const delta =
                Math.min(
                    time - lastTime,
                    40
                );

            lastTime = time;


            speed +=
                (targetSpeed - speed) * 0.06;


            position -=
                speed * (delta / 16.67);


            const halfWidth =
                track.scrollWidth / 2;


            if (
                Math.abs(position) >=
                halfWidth
            ) {

                position += halfWidth;

            }


            track.style.transform =
                `translate3d(${position}px,0,0)`;


            requestAnimationFrame(
                marqueeLoop
            );

        }


        requestAnimationFrame(
            marqueeLoop
        );


        /*==================================================
          HOVER PAUSE / SLOWDOWN
        ==================================================*/

        marquee.addEventListener(
            "mouseenter",
            () => {

                targetSpeed = 0.06;

            }
        );


        marquee.addEventListener(
            "mouseleave",
            () => {

                targetSpeed = 0.45;

            }
        );


        /*==================================================
          TOUCH SUPPORT
        ==================================================*/

        marquee.addEventListener(
            "touchstart",
            () => {

                targetSpeed = 0.05;

            },
            {
                passive:true
            }
        );


        marquee.addEventListener(
            "touchend",
            () => {

                targetSpeed = 0.35;

            },
            {
                passive:true
            }
        );


        /*==================================================
          PREMIUM POINTER SPOTLIGHT
        ==================================================*/

        marquee.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    marquee.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                marquee.style.setProperty(
                    "--client-mouse-x",
                    `${x}px`
                );


                marquee.style.setProperty(
                    "--client-mouse-y",
                    `${y}px`
                );

            }
        );


        /*==================================================
          VISIBILITY OPTIMIZATION
        ==================================================*/

        document.addEventListener(
            "visibilitychange",
            () => {

                if (
                    document.hidden
                ) {

                    targetSpeed = 0;

                } else {

                    targetSpeed = 0.45;

                }

            }
        );

    }


    /*==================================================
      DOM READY
    ==================================================*/

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initClients
        );

    } else {

        initClients();

    }

})();