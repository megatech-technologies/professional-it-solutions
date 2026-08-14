/*==================================================
  SERVICES NETWORK ANIMATION
  MegaTech Technologies
==================================================*/

document.addEventListener("DOMContentLoaded",()=>{


const container = document.querySelector(".service-network");

const svg = document.querySelector(".service-network-svg");


if(!container || !svg) return;



/*==================================================
  NODE PULSE
==================================================*/

const nodes = svg.querySelectorAll(".service-node");


nodes.forEach((node,index)=>{


    node.animate(

        [
            {
                transform:"scale(1)",
                opacity:.8
            },

            {
                transform:"scale(1.15)",
                opacity:1
            },

            {
                transform:"scale(1)",
                opacity:.8
            }

        ],

        {

            duration:2200 + (index * 300),

            iterations:Infinity,

            easing:"ease-in-out",

            transformOrigin:"center"

        }

    );


});



/*==================================================
  CONNECTION PATH GLOW
==================================================*/

const paths = svg.querySelectorAll(".network-path");


setInterval(()=>{


    const randomPath =
    paths[Math.floor(Math.random()*paths.length)];


    if(!randomPath) return;


    randomPath.style.opacity=".9";


    setTimeout(()=>{

        randomPath.style.opacity="0.35";

    },700);



},900);




/*==================================================
  MOVING DATA PULSES
==================================================*/

const pulses = svg.querySelectorAll(".network-pulse");


pulses.forEach((pulse)=>{


const pathID = pulse.dataset.path;

const path = document.getElementById(pathID);


if(!path) return;



const length = path.getTotalLength();


let progress = Math.random();



function movePulse(){


    progress += .008;


    if(progress > 1){

        progress=0;

    }



    const point =
    path.getPointAtLength(
        length * progress
    );


    pulse.setAttribute(
        "cx",
        point.x
    );


    pulse.setAttribute(
        "cy",
        point.y
    );



    requestAnimationFrame(movePulse);


}


movePulse();


});




/*==================================================
  MOUSE PARALLAX
==================================================*/


container.addEventListener("mousemove",(e)=>{


const rect =
container.getBoundingClientRect();



const x =
(e.clientX - rect.left - rect.width/2) / 50;


const y =
(e.clientY - rect.top - rect.height/2) / 50;



svg.style.transform = 
`
translate(${x}px,${y}px)
`;



});




container.addEventListener("mouseleave",()=>{


svg.style.transform="translate(0,0)";


});




/*==================================================
  CORE MOUSE REACTION
==================================================*/


const core =
svg.querySelector(".network-core");



container.addEventListener("mouseenter",()=>{


core.style.animationDuration="2s";


});



container.addEventListener("mouseleave",()=>{


core.style.animationDuration="5s";


});



});