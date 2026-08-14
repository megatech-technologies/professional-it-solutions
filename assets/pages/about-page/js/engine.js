/*==================================================
TABLE OF CONTENTS
====================================================

1. Engine Variables
2. Register Animation
3. Remove Animation
4. Animation Loop
5. Start Engine

==================================================*/


/*==================================================
ENGINE VARIABLES
==================================================*/

const animationEngine=[];

let previousTime=0;


/*==================================================
REGISTER
==================================================*/

function registerAnimation(callback){

if(typeof callback==="function"){

animationEngine.push(callback);

}

}


/*==================================================
REMOVE
==================================================*/

function removeAnimation(callback){

const index=animationEngine.indexOf(callback);

if(index>-1){

animationEngine.splice(index,1);

}

}


/*==================================================
ENGINE LOOP
==================================================*/

function animationLoop(time){

const delta=time-previousTime;

previousTime=time;

console.log(animationEngine.length);

animationEngine.forEach(animation=>{

animation(delta,time);

});

requestAnimationFrame(animationLoop);

}


/*==================================================
START
==================================================*/

function startEngine(){

requestAnimationFrame(animationLoop);

}


