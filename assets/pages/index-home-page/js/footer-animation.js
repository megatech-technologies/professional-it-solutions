/*==================================================
DOM READY
==================================================*/

document.addEventListener("DOMContentLoaded",()=>{

initFooterScan();

});


/*==================================================
FOOTER SCAN
==================================================*/

function initFooterScan(){

const footer=document.querySelector(".footer");

if(!footer) return;

const scan=()=>{

footer.style.setProperty("--scan-transition","none");
footer.style.setProperty("--scan-left","-120%");

requestAnimationFrame(()=>{

requestAnimationFrame(()=>{

footer.style.setProperty("--scan-transition","left 1.6s linear");
footer.style.setProperty("--scan-left","170%");

});

});

};

scan();

setInterval(scan,9000);

}