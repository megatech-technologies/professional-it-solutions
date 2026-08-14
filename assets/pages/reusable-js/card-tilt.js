/*==================================================
3D CARD TILT + SPOTLIGHT
==================================================*/

document.addEventListener("DOMContentLoaded",()=>{

const cards=document.querySelectorAll(".tilt-card");

cards.forEach(card=>{

const spotlight=card.querySelector(".card-spotlight");

card.addEventListener("mousemove",(e)=>{

const rect=card.getBoundingClientRect();

const x=e.clientX-rect.left;
const y=e.clientY-rect.top;

const centerX=rect.width/2;
const centerY=rect.height/2;

const rotateY=(x-centerX)/18;
const rotateX=(centerY-y)/18;


/*==============================
CARD ROTATION
==============================*/

card.style.transform=`
perspective(1000px)
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)
scale(1.03)
`;


/*==============================
LAYER DEPTH
==============================*/

const layers=card.querySelectorAll("[data-depth]");

layers.forEach(layer=>{

const depth=parseFloat(layer.dataset.depth);

const moveX=((x-centerX)/centerX)*depth;

const moveY=((y-centerY)/centerY)*depth;

layer.style.transform=`
translate3d(${moveX}px,${moveY}px,${depth}px)
`;

});


/*==============================
SPOTLIGHT
==============================*/

if(spotlight){

spotlight.style.left=`${x}px`;

spotlight.style.top=`${y}px`;

spotlight.style.width="260px";

spotlight.style.height="260px";

}

});


card.addEventListener("mouseleave",()=>{

card.style.transform=`
perspective(1000px)
rotateX(0deg)
rotateY(0deg)
scale(1)
`;

if(spotlight){

spotlight.style.width="0";
spotlight.style.height="0";

}

});

});

});