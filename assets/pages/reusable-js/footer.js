/*==================================================
FOOTER YEAR
==================================================*/

const footerYear=document.getElementById("footerYear");

if(footerYear){

footerYear.textContent=new Date().getFullYear();

}


/*==================================================
BACK TO TOP BUTTON
==================================================*/

const backToTop=document.querySelector(".back-to-top");

if(backToTop){

window.addEventListener("scroll",()=>{

if(window.scrollY>500){

backToTop.classList.add("show");

}else{

backToTop.classList.remove("show");

}

});

backToTop.addEventListener("click",(e)=>{

e.preventDefault();

window.scrollTo({

top:0,

behavior:"smooth"

});

});

}