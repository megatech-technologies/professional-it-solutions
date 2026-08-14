/*==================================================
TABLE OF CONTENTS
====================================================

1. DOM Ready
2. Initialize Parallax
3. Mouse Tracking
4. Element Movement

==================================================*/


/*==================================================
DOM READY
==================================================*/

document.addEventListener("DOMContentLoaded",()=>{

initParallax();

});


/*==================================================
INITIALIZE
==================================================*/

function initParallax(){

const elements=document.querySelectorAll(".parallax");

if(!elements.length) return;

window.addEventListener("mousemove",(e)=>{

const x=(e.clientX / window.innerWidth - .5) * 2;
const y=(e.clientY / window.innerHeight - .5) * 2;

elements.forEach(el=>{

const speed=parseFloat(el.dataset.speed) || 20;

const moveX=x * speed;
const moveY=y * speed;

el.style.transform=
`translate3d(${moveX}px, ${moveY}px, 0)`;

});

});

}