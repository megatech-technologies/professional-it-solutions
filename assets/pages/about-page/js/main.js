/*==================================================
TABLE OF CONTENTS
====================================================

1. DOM Ready
2. Initialize Website

==================================================*/


/*==================================================
DOM READY
==================================================*/

document.addEventListener("DOMContentLoaded",()=>{

initializeWebsite();

});


/*==================================================
INITIALIZE WEBSITE
==================================================*/

function initializeWebsite(){



if(typeof initScroll==="function"){

initScroll();

}

if(typeof initMouse==="function"){

initMouse();

}

if(typeof initParticles==="function"){

initParticles();

}

if(typeof initPage==="function"){

initPage();

}

if(typeof startEngine==="function"){

startEngine();

}

}