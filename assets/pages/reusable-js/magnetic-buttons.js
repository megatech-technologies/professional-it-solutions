/*==================================================
MAGNETIC BUTTONS
==================================================*/

document.addEventListener("DOMContentLoaded",()=>{

const buttons=document.querySelectorAll(".magnetic");

buttons.forEach(button=>{

const glow=button.querySelector(".magnetic-glow");

button.addEventListener("mousemove",(e)=>{

const rect=button.getBoundingClientRect();

const x=e.clientX-rect.left;
const y=e.clientY-rect.top;

const moveX=(x-rect.width/2)*0.18;
const moveY=(y-rect.height/2)*0.18;

button.style.transform=
`translate(${moveX}px,${moveY}px) scale(1.03)`;

if(glow){

glow.style.left=`${x}px`;

glow.style.top=`${y}px`;

glow.style.width="180px";

glow.style.height="180px";

}

});

button.addEventListener("mouseleave",()=>{

button.style.transform="translate(0,0) scale(1)";

if(glow){

glow.style.width="0";

glow.style.height="0";

}

});

});

});