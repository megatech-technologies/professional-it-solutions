/*==================================================
ARC REACTOR ANIMATION
==================================================*/

const outerOrbit = document.querySelector(".outer-orbit");
const middleOrbit = document.querySelector(".middle-orbit");
const innerOrbit = document.querySelector(".inner-orbit");
const energyCore = document.querySelector(".energy-core");

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

/* Reverse every 10 seconds */

setInterval(() => {

    direction *= -1;

}, 10000);

/*==========================================
ANIMATION LOOP
==========================================*/

let previousTime = performance.now();

function animate(currentTime){

    const deltaTime = (currentTime - previousTime) / 1000;

    previousTime = currentTime;

    /* Update Angles */

    outerAngle += OUTER_SPEED * direction * deltaTime;

    middleAngle -= MIDDLE_SPEED * direction * deltaTime;

    innerAngle += INNER_SPEED * direction * deltaTime;

    /* Core spins forever clockwise */

    coreAngle += CORE_SPEED * deltaTime;

    /* Apply Native SVG Rotation */

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

    requestAnimationFrame(animate);

}

requestAnimationFrame(animate);