/*==================================================
  MARKETPLACE HERO — DIGITAL NETWORK CORE
==================================================*/

console.log("MARKETPLACE HERO JS LOADED");


(function () {

    function initMarketplaceHero() {

        const section =
            document.querySelector(".marketplace-hero");

        const network =
            document.querySelector(".marketplace-network");

        const svg =
            document.querySelector(
                ".marketplace-network-svg"
            );


        if (!section || !network || !svg) {

            console.warn(
                "Marketplace hero elements not found."
            );

            return;

        }


        /*==================================================
          PATHS
        ==================================================*/

        const paths = [

            svg.querySelector("#market-path-course"),

            svg.querySelector("#market-path-template"),

            svg.querySelector("#market-path-product"),

            svg.querySelector("#market-path-service")

        ].filter(Boolean);


        const particles =
            svg.querySelectorAll(
                ".market-particle"
            );


        const nodes =
            svg.querySelectorAll(
                ".market-node"
            );


        /*==================================================
          PARTICLE STATE
        ==================================================*/

        const particleState =
            Array.from(particles).map(
                (particle, index) => {

                    return {

                        element: particle,

                        path:
                            paths[
                                index %
                                paths.length
                            ],

                        progress:
                            (index * 0.23) %
                            1,

                        speed:
                            0.00018 +
                            (index * 0.000035)

                    };

                }
            );


        /*==================================================
          MOUSE PARALLAX
        ==================================================*/

        let mouseX = 0;
        let mouseY = 0;

        let currentX = 0;
        let currentY = 0;


        network.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    network.getBoundingClientRect();


                mouseX =
                    (
                        event.clientX -
                        rect.left
                    ) /
                    rect.width;


                mouseY =
                    (
                        event.clientY -
                        rect.top
                    ) /
                    rect.height;


                mouseX =
                    (mouseX - .5) * 2;


                mouseY =
                    (mouseY - .5) * 2;

            }
        );


        network.addEventListener(
            "mouseleave",
            () => {

                mouseX = 0;
                mouseY = 0;

            }
        );


        /*==================================================
          NODE INTERACTION
        ==================================================*/

        nodes.forEach((node) => {

            node.addEventListener(
                "mouseenter",
                () => {

                    node.style.transform =
                        "scale(1.08)";

                }
            );


            node.addEventListener(
                "mouseleave",
                () => {

                    node.style.transform =
                        "";

                }
            );

        });


        /*==================================================
          PARTICLE ENGINE
        ==================================================*/

        function animateParticles() {

            particleState.forEach(
                (particle) => {

                    const path =
                        particle.path;


                    if (!path) return;


                    particle.progress +=
                        particle.speed;


                    if (
                        particle.progress >= 1
                    ) {

                        particle.progress = 0;

                    }


                    const length =
                        path.getTotalLength();


                    const point =
                        path.getPointAtLength(
                            length *
                            particle.progress
                        );


                    particle.element.setAttribute(
                        "cx",
                        point.x
                    );


                    particle.element.setAttribute(
                        "cy",
                        point.y
                    );

                }
            );

        }


        /*==================================================
          PARALLAX ENGINE
        ==================================================*/

        function animateParallax() {

            currentX +=
                (mouseX - currentX) * .06;


            currentY +=
                (mouseY - currentY) * .06;


            network.style.setProperty(
                "--market-mouse-x",
                currentX
            );


            network.style.setProperty(
                "--market-mouse-y",
                currentY
            );


            requestAnimationFrame(
                animateParallax
            );

        }


        /*==================================================
          MAIN ENGINE
        ==================================================*/

        function animationLoop() {

            animateParticles();

            requestAnimationFrame(
                animationLoop
            );

        }


        /*==================================================
          REDUCED MOTION
        ==================================================*/

        const reducedMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;


        if (!reducedMotion) {

            animateParallax();

            animationLoop();

        }


        console.log(
            "Marketplace network initialized:",
            {
                paths: paths.length,
                particles: particles.length,
                nodes: nodes.length
            }
        );

    }


    /*==================================================
      INITIALIZATION
    ==================================================*/

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initMarketplaceHero
        );

    } else {

        initMarketplaceHero();

    }

})();