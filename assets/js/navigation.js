/*==================================================
TABLE OF CONTENTS
====================================================

1. DOM Ready
2. Initialize
3. Mobile Toggle
4. Dropdown Toggle
5. Outside Click Close
6. Escape Close
7. Scroll Navbar Animation

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

    const header = document.querySelector(".header");

    const navbar = document.querySelector(".navbar");

    const nav = document.querySelector(".nav-links");

    const toggle = document.querySelector(".menu-toggle");

    const dropdown = document.querySelector(".nav-dropdown");

    const dropdownToggle =
        document.querySelector(".nav-dropdown-toggle");


    /*==================================================
    HERO ELEMENTS
    ==================================================*/

    const hero =
        document.querySelector(".hero");

    const heroContent =
        document.querySelector(".hero-scroll-content");

    const reactor =
        document.querySelector(".hero-scroll-reactor");

    const heroGrid =
        document.querySelector(".hero-scroll-grid");

    const heroGlow =
        document.querySelector(".hero-scroll-glow");

    const scrollIndicator =
        document.querySelector(".hero-scroll-indicator");


    if(!header || !navbar || !nav || !toggle) return;


    /*==================================================
    MOBILE TOGGLE
    ==================================================*/

    toggle.addEventListener("click",(e)=>{

        e.stopPropagation();

        nav.classList.toggle("show");

        toggle.classList.toggle("active");

    });


    /*==================================================
    DROPDOWN TOGGLE
    ==================================================*/

    if(dropdown && dropdownToggle){

        dropdownToggle.addEventListener("click",(e)=>{

            e.stopPropagation();

            const isOpen =
                dropdown.classList.contains("open");


            /* Close other dropdowns */

            document
                .querySelectorAll(".nav-dropdown.open")
                .forEach(item => {

                    if(item !== dropdown){

                        item.classList.remove("open");

                        const button =
                            item.querySelector(
                                ".nav-dropdown-toggle"
                            );

                        if(button){

                            button.setAttribute(
                                "aria-expanded",
                                "false"
                            );

                        }

                    }

                });


            dropdown.classList.toggle(
                "open",
                !isOpen
            );


            dropdownToggle.setAttribute(
                "aria-expanded",
                String(!isOpen)
            );

        });

    }


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


        if(
            dropdown &&
            !dropdown.contains(e.target)
        ){

            dropdown.classList.remove("open");

            if(dropdownToggle){

                dropdownToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }

    });


    /*==================================================
    ESCAPE KEY
    ==================================================*/

    document.addEventListener("keydown",(e)=>{

        if(e.key === "Escape"){

            nav.classList.remove("show");

            toggle.classList.remove("active");


            if(dropdown){

                dropdown.classList.remove("open");

            }


            if(dropdownToggle){

                dropdownToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }

    });


    /*==================================================
    CLOSE DROPDOWN AFTER SELECTING A LINK
    ==================================================*/

    if(dropdown){

        const dropdownLinks =
            dropdown.querySelectorAll("a");


        dropdownLinks.forEach(link => {

            link.addEventListener("click",()=>{

                dropdown.classList.remove("open");

                if(dropdownToggle){

                    dropdownToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            });

        });

    }


    /*==================================================
    SCROLL ANIMATION
    ==================================================*/

    let lastScroll = 0;


    window.addEventListener("scroll",()=>{

        const current =
            window.scrollY;


        if(current > 60){

            header.classList.add("scrolled");

        }else{

            header.classList.remove("scrolled");

        }


        /*==============================================
        SHRINK NAVBAR
        ==============================================*/

        const progress =
            Math.min(current,120) / 120;


        const height =
            78 - (progress * 6);


        const margin =
            20 - (progress * 8);


        const blur =
            20 + (progress * 5);


        const opacity =
            0.45 + (progress * 0.45);


        const shadow =
            18 + (progress * 20);


        const glow =
            0.08 + (progress * 0.12);


        navbar.style.height =
            `${height}px`;


        navbar.style.marginTop =
            `${margin}px`;


        navbar.style.backdropFilter =
            `blur(${blur}px)`;


        navbar.style.webkitBackdropFilter =
            `blur(${blur}px)`;


        navbar.style.background =
            `rgba(6,11,20,${opacity})`;


        navbar.style.boxShadow =

            `
            0 ${shadow}px ${shadow * 2}px
            rgba(0,0,0,.35),

            0 0 35px
            rgba(0,217,255,${glow})
            `;


        /*==============================================
        HIDE WHILE SCROLLING DOWN
        ==============================================*/

        if(
            current > lastScroll &&
            current > 250
        ){

            header.style.transform =
                "translateY(-120%)";

        }else{

            header.style.transform =
                "translateY(0)";

        }


        lastScroll = current;

    });

}