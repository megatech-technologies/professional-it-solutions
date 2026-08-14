/*==================================================
TABLE OF CONTENTS
====================================================

1. DOM Ready
2. Initialize
3. Mobile Toggle
4. Outside Click Close
5. Escape Close
6. Scroll Navbar Animation

==================================================*/


/*==================================================
DOM READY
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    initNavigation();

});




/*==================================================
INITIALIZE
==================================================*/

function initNavigation(){

const header=document.querySelector(".header");
const navbar=document.querySelector(".navbar");
const nav=document.querySelector(".nav-links");
const toggle=document.querySelector(".menu-toggle");

/*==================================================
HERO ELEMENTS
==================================================*/

const hero=document.querySelector(".hero");

const heroContent=document.querySelector(".hero-scroll-content");

const reactor=document.querySelector(".hero-scroll-reactor");

const heroGrid=document.querySelector(".hero-scroll-grid");

const heroGlow=document.querySelector(".hero-scroll-glow");

const scrollIndicator=document.querySelector(".hero-scroll-indicator");

if(!header||!navbar||!nav||!toggle) return;


/*==================================================
MOBILE TOGGLE
==================================================*/

toggle.addEventListener("click",(e)=>{

e.stopPropagation();

nav.classList.toggle("show");

toggle.classList.toggle("active");

});


/*==================================================
BODY CLICK
==================================================*/

document.addEventListener("click",(e)=>{

if(

!nav.contains(e.target) &&
!toggle.contains(e.target)

){

nav.classList.remove("show");
toggle.classList.remove("active");

}

});


/*==================================================
ESCAPE KEY
==================================================*/

document.addEventListener("keydown",(e)=>{

if(e.key==="Escape"){

nav.classList.remove("show");
toggle.classList.remove("active");

}

});


/*==================================================
SCROLL ANIMATION
==================================================*/

let lastScroll=0;

window.addEventListener("scroll",()=>{

const current=window.scrollY;

if(current>60){

header.classList.add("scrolled");

}else{

header.classList.remove("scrolled");

}


/* Shrink Navbar */

const progress=Math.min(current,120)/120;

const height=78-(progress*6);

const margin=20-(progress*8);

const blur=20+(progress*5);

const opacity=0.45+(progress*0.45);

const shadow=18+(progress*20);

const glow=0.08+(progress*0.12);

navbar.style.height=`${height}px`;
navbar.style.marginTop=`${margin}px`;
navbar.style.backdropFilter=`blur(${blur}px)`;
navbar.style.webkitBackdropFilter=`blur(${blur}px)`;

navbar.style.background=
`rgba(6,11,20,${opacity})`;

navbar.style.boxShadow=
`
0 ${shadow}px ${shadow*2}px rgba(0,0,0,.35),
0 0 35px rgba(0,217,255,${glow})
`;


/* Hide while scrolling down */

if(current>lastScroll && current>250){

header.style.transform="translateY(-120%)";

}else{

header.style.transform="translateY(0)";

}

lastScroll=current;

});

}