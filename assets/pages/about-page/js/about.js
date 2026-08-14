/*==================================================
TABLE OF CONTENTS
====================================================

1. Initialize Page
2. AI Core Animation

==================================================*/


/*==================================================
INITIALIZE PAGE
==================================================*/

console.log("ABOUT.JS LOADED");

let reactorX=0;

let reactorY=0;

function initPage(){

    console.log("initPage started");

const core=document.querySelector(".display-core");

const founder=document.querySelector(".founder-terminal");

const reactor=document.querySelector(".reactor-system");

const display=document.querySelector(".founder-display");

if(reactor && display){

display.addEventListener("mousemove",(e)=>{

const rect=display.getBoundingClientRect();

const x=(e.clientX-rect.left)/rect.width;

const y=(e.clientY-rect.top)/rect.height;

reactorX=(x-.5)*14;

reactorY=(y-.5)*-14;

});

display.addEventListener("mouseleave",()=>{

reactorX=0;

reactorY=0;

});

}

/*==================================================
REACTOR TILT
==================================================*/

function animateReactor(){

const reactor=document.querySelector(".reactor-system");

if(!reactor) return;

reactor.style.transform=

`perspective(1000px)

rotateX(${reactorY}deg)

rotateY(${reactorX}deg)`;

}

if(!core && !founder) return;

console.log("About animation registered");

registerAnimation((delta,time)=>{

if(core){

animateCore(core,time);

animateRings(time);

animateNodes(time);

animateBeams(time);

animatePackets(time);

animateCircuits(time);

animateReactor();

}

if(founder){

animateFounder(time);

console.log("Founder frame", time);

const ring1=document.querySelector(".terminal-ring-1");

console.log(ring1);

}

});

}


/*==================================================
AI CORE
==================================================*/

function animateCore(core,time){

const scale=

1

+

Math.sin(time*0.002)*0.06

+

Math.sin(time*0.006)*0.02;

const glow=

45

+

Math.sin(time*0.002)*18

+

Math.sin(time*0.01)*8;

core.style.transform=
`translate(-50%,-50%) scale(${scale})`;

core.style.boxShadow=
`
0 0 ${glow}px rgba(99,232,255,.8),
0 0 ${glow*2}px rgba(99,232,255,.45),
0 0 ${glow*4}px rgba(99,232,255,.18)
`;

}






/*==================================================
ROTATING RINGS
==================================================*/

function animateRings(time){

const ring1=document.querySelector(".ring-1");
const ring2=document.querySelector(".ring-2");
const ring3=document.querySelector(".ring-3");

if(ring1){

ring1.style.transform=
`translate(-50%,-50%) rotate(${time*0.03}deg)`;

}

if(ring2){

ring2.style.transform=
`translate(-50%,-50%) rotate(${-time*0.02}deg)`;

}

if(ring3){

ring3.style.transform=
`translate(-50%,-50%) rotate(${time*0.01}deg)`;

}

}



/*==================================================
FLOATING NODES
==================================================*/

function animateNodes(time){

const nodes=document.querySelectorAll(".display-node");

nodes.forEach((node,index)=>{

const speed=0.0015+(index*0.0002);

const x=Math.sin(time*speed+index)*8;

const y=Math.cos(time*speed*1.2+index)*8;

const scale=1+Math.sin(time*0.003+index)*0.25;

const glow=15+Math.sin(time*0.003+index)*12;

node.style.transform=
`translate(${x}px,${y}px) scale(${scale})`;

node.style.boxShadow=
`
0 0 ${glow}px rgba(99,232,255,.9),
0 0 ${glow*2}px rgba(99,232,255,.4)
`;

});

}




/*==================================================
ENERGY BEAMS
==================================================*/

function animateBeams(time){

const beams=document.querySelectorAll(".beam");

beams.forEach((beam,index)=>{

const pulse=

0.7 +

Math.sin(time*0.003 + index)*0.3;

const length=

170 +

Math.sin(time*0.002 + index)*25;

const glow=

10 +

Math.sin(time*0.004 + index)*12;

beam.style.opacity=pulse;

beam.style.height=`${length}px`;

beam.style.marginTop=`-${length}px`;

beam.style.boxShadow=
`
0 0 ${glow}px rgba(99,232,255,.9),
0 0 ${glow*2}px rgba(99,232,255,.35)
`;

});

}




/*==================================================
CIRCUIT LINES
==================================================*/

function animateCircuits(time){

const lines=document.querySelectorAll(".circuit-line");

lines.forEach((line,index)=>{

const pulse=

0.25+

Math.sin(time*0.002+index)*0.25;

const glow=

4+

Math.sin(time*0.003+index)*8;

line.style.opacity=pulse;

line.style.boxShadow=
`
0 0 ${glow}px rgba(99,232,255,.7),
0 0 ${glow*2}px rgba(99,232,255,.18)
`;

});

}




/*==================================================
DATA PACKETS
==================================================*/

function animatePackets(time){

const packets=document.querySelectorAll(".packet");

packets.forEach((packet,index)=>{

const speed=0.0006+(index*0.0001);

const move=

(Math.sin(time*speed)+1)/2;

const position=move*150;

packet.style.top=`${position}px`;

});

}





/*==================================================
FOUNDER TERMINAL
==================================================*/

function animateFounder(time){


const ring1=document.querySelector(".terminal-ring-1");
const ring2=document.querySelector(".terminal-ring-2");



if(ring1){

ring1.style.transform=
`translate(-50%,-50%) rotate(${time*0.018}deg)`;

}

if(ring2){

ring2.style.transform=
`translate(-50%,-50%) rotate(${-time*0.012}deg)`;



}

}






