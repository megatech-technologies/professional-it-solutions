/*==================================================
  PORTFOLIO HERO — INTERACTIVE ARCH SYSTEM
==================================================*/

console.log("PORTFOLIO HERO JS LOADED");


document.addEventListener("DOMContentLoaded", () => {

    const heroVisual =
        document.querySelector(".portfolio-hero-visual");

    const svg =
        document.querySelector(".portfolio-core-svg");


    if (!heroVisual || !svg) {

        console.warn(
            "Portfolio hero elements were not found."
        );

        return;

    }


    /*==================================================
      ELEMENTS
    ==================================================*/

    const nodes =
        svg.querySelectorAll(
            ".portfolio-project-node"
        );

    const labels =
        heroVisual.querySelectorAll(
            ".portfolio-project-label"
        );

    const dataPulses =
        svg.querySelectorAll(
            ".portfolio-data-pulse"
        );

    const scanArc =
        svg.querySelector(
            ".portfolio-scan-arc"
        );


        const connections =
    svg.querySelector(
        ".portfolio-connections"
    );


    /*==================================================
      MOUSE STATE
    ==================================================*/

    let targetX = 0;
    let targetY = 0;

    let currentX = 0;
    let currentY = 0;


    /*==================================================
      MOUSE TRACKING
    ==================================================*/

  svg.addEventListener("mousemove", (event) => {

    const rect = svg.getBoundingClientRect();

    const x =
        (event.clientX - rect.left) /
        rect.width;

    const y =
        (event.clientY - rect.top) /
        rect.height;

    targetX = (x - 0.5) * 2;
    targetY = (y - 0.5) * 2;

});


svg.addEventListener("mouseleave", () => {

    targetX = 0;
    targetY = 0;

});


    


    /*==================================================
      PARALLAX ENGINE
    ==================================================*/

    function animatePortfolioHero() {

        currentX +=
            (targetX - currentX) * 0.06;


        currentY +=
            (targetY - currentY) * 0.06;

            if (connections) {

    const time =
        performance.now() * 0.08;

    connections.style.strokeDashoffset =
        `${-time}px`;

}


        /*----------------------------------------------
          SEND VALUES TO CSS
        ----------------------------------------------*/

        heroVisual.style.setProperty(
            "--portfolio-mouse-x",
            currentX
        );


        heroVisual.style.setProperty(
            "--portfolio-mouse-y",
            currentY
        );


        /*----------------------------------------------
          PROJECT LABEL PARALLAX
        ----------------------------------------------*/

        labels.forEach((label, index) => {

            const strength =
                4 + (index * 2);


            label.style.setProperty(
                "--label-x",
                `${currentX * strength}px`
            );


            label.style.setProperty(
                "--label-y",
                `${currentY * strength}px`
            );

        });


        /*----------------------------------------------
          NODE PARALLAX
        ----------------------------------------------*/

        nodes.forEach((node, index) => {

            const strength =
                2 + (index * 0.8);


            node.style.setProperty(
                "--node-x",
                `${currentX * strength}px`
            );


            node.style.setProperty(
                "--node-y",
                `${currentY * strength}px`
            );

        });


        /*----------------------------------------------
          SCAN ARC SPEED
        ----------------------------------------------*/

        if (scanArc) {

            const intensity =
                Math.abs(currentX) +
                Math.abs(currentY);


            const duration =
                Math.max(
                    3,
                    5 - (intensity * 1.5)
                );


            scanArc.style.setProperty(
                "--scan-speed",
                `${duration}s`
            );

        }


        requestAnimationFrame(
            animatePortfolioHero
        );

    }


    animatePortfolioHero();


    /*==================================================
      DATA PULSE STAGGER
    ==================================================*/

    dataPulses.forEach(
        (pulse, index) => {

            pulse.style.animationDelay =
                `${index * 0.45}s`;

        }
    );


    /*==================================================
      NODE HOVER
    ==================================================*/

    nodes.forEach((node) => {

        node.addEventListener(
            "mouseenter",
            () => {

                node.classList.add(
                    "portfolio-node-hover"
                );

            }
        );


        node.addEventListener(
            "mouseleave",
            () => {

                node.classList.remove(
                    "portfolio-node-hover"
                );

            }
        );

    });


    /*==================================================
      LABEL HOVER
    ==================================================*/

    labels.forEach((label) => {

        label.addEventListener(
            "mouseenter",
            () => {

                label.classList.add(
                    "portfolio-label-hover"
                );

            }
        );


        label.addEventListener(
            "mouseleave",
            () => {

                label.classList.remove(
                    "portfolio-label-hover"
                );

            }
        );

    });


});

