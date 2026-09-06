/*==================================================
ARC REACTOR ANIMATION
SMART PERFORMANCE VERSION
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*==========================================
    SVG ELEMENTS
    ==========================================*/

    const outerOrbit = document.querySelector(".outer-orbit");
    const middleOrbit = document.querySelector(".middle-orbit");
    const innerOrbit = document.querySelector(".inner-orbit");
    const energyCore = document.querySelector(".energy-core");

    const reactorContainer = document.querySelector(".reactor-container");


    /*==========================================
    SAFETY CHECK
    ==========================================*/

    if (
        !outerOrbit ||
        !middleOrbit ||
        !innerOrbit ||
        !energyCore ||
        !reactorContainer
    ) {
        return;
    }


    /*==========================================
    ANGLES
    ==========================================*/

    let outerAngle = 0;
    let middleAngle = 0;
    let innerAngle = 0;
    let coreAngle = 0;


    /*==========================================
    SPEEDS
    (Degrees Per Second)
    ==========================================*/

    const OUTER_SPEED = 18;
    const MIDDLE_SPEED = 24;
    const INNER_SPEED = 30;
    const CORE_SPEED = 42;


    /*==========================================
    ROTATION DIRECTION
    ==========================================*/

    let direction = 1;


    /*==========================================
    DIRECTION TIMER
    ==========================================*/

    let directionTimer = 0;


    /*==========================================
    ANIMATION STATE
    ==========================================*/

    let animationFrame = null;
    let previousTime = 0;
    let reactorVisible = false;


    /*==========================================
    ANIMATION LOOP
    ==========================================*/

    function animate(currentTime) {

        /*
        Stop immediately if the reactor is not
        visible or the browser tab is hidden.
        */

        if (!reactorVisible || document.hidden) {

            animationFrame = null;
            return;

        }


        /*======================================
        FIRST FRAME
        ======================================*/

        if (!previousTime) {
            previousTime = currentTime;
        }


        /*======================================
        DELTA TIME
        ======================================*/

        let deltaTime =
            (currentTime - previousTime) / 1000;

        previousTime = currentTime;


        /*
        Prevent a large jump after the browser
        has been paused or heavily delayed.
        */

        deltaTime = Math.min(deltaTime, 0.05);


        /*======================================
        DIRECTION TIMER
        ======================================*/

        directionTimer += deltaTime;


        /*
        Reverse direction every 10 seconds.
        This replaces the old setInterval().
        */

        if (directionTimer >= 10) {

            direction *= -1;

            directionTimer = 0;

        }


        /*======================================
        UPDATE ANGLES
        ======================================*/

        outerAngle +=
            OUTER_SPEED *
            direction *
            deltaTime;

        middleAngle -=
            MIDDLE_SPEED *
            direction *
            deltaTime;

        innerAngle +=
            INNER_SPEED *
            direction *
            deltaTime;

        /*
        Core always rotates clockwise.
        */

        coreAngle +=
            CORE_SPEED *
            deltaTime;


        /*======================================
        APPLY SVG ROTATIONS
        ======================================*/

        outerOrbit.setAttribute(
            "transform",
            `rotate(${outerAngle} 300 300)`
        );

        middleOrbit.setAttribute(
            "transform",
            `rotate(${middleAngle} 300 300)`
        );

        innerOrbit.setAttribute(
            "transform",
            `rotate(${innerAngle} 300 300)`
        );

        energyCore.setAttribute(
            "transform",
            `rotate(${coreAngle} 300 300)`
        );


        /*======================================
        REQUEST NEXT FRAME
        ======================================*/

        animationFrame =
            requestAnimationFrame(animate);

    }


    /*==========================================
    START ANIMATION
    ==========================================*/

    function startAnimation() {

        /*
        Don't create another animation loop
        if one is already running.
        */

        if (animationFrame !== null) {
            return;
        }


        /*
        Reset timing so the reactor doesn't
        jump when animation resumes.
        */

        previousTime = 0;


        animationFrame =
            requestAnimationFrame(animate);

    }


    /*==========================================
    STOP ANIMATION
    ==========================================*/

    function stopAnimation() {

        if (animationFrame !== null) {

            cancelAnimationFrame(animationFrame);

            animationFrame = null;

        }


        /*
        Reset timing for a smooth restart.
        */

        previousTime = 0;

    }


    /*==========================================
    INTERSECTION OBSERVER
    ==========================================*/

    const observer =
        new IntersectionObserver(
            (entries) => {

                const entry = entries[0];

                reactorVisible =
                    entry.isIntersecting;


                if (
                    reactorVisible &&
                    !document.hidden
                ) {

                    startAnimation();

                } else {

                    stopAnimation();

                }

            },
            {
                /*
                Start when at least 5% of the
                reactor enters the viewport.
                */

                threshold: 0.05
            }
        );


    observer.observe(reactorContainer);


    /*==========================================
    BROWSER TAB VISIBILITY
    ==========================================*/

    document.addEventListener(
        "visibilitychange",
        () => {

            /*
            User left the browser tab.
            */

            if (document.hidden) {

                stopAnimation();

                return;

            }


            /*
            User returned to the tab.
            */

            if (reactorVisible) {

                startAnimation();

            }

        }
    );

});