/*==================================================
TABLE OF CONTENTS
====================================================

1. DOM Ready
2. Initialize Scroll Animation
3. Reveal Observer

==================================================*/


/*==================================================
DOM READY
==================================================*/

document.addEventListener("DOMContentLoaded",()=>{

initScrollAnimations();

});


/*==================================================
INITIALIZE
==================================================*/

function initScrollAnimations(){

const reveals=document.querySelectorAll(".reveal");

if(!reveals.length) return;


/*==================================================
INTERSECTION OBSERVER
==================================================*/

const observer=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("active");

observer.unobserve(entry.target);

}

});

},{

threshold:.15,

rootMargin:"0px 0px -60px 0px"

});


/*==================================================
OBSERVE ELEMENTS
==================================================*/

reveals.forEach(item=>{

observer.observe(item);

});

}