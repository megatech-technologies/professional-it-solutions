/*==================================================
SOLUTION CARD SCAN LINE
==================================================*/

const solutionCards = document.querySelectorAll(".solution-card");

solutionCards.forEach(card=>{

    const scan = card.querySelector(".scan-line");

    card.addEventListener("mouseenter",()=>{

        scan.style.transition = "none";
        scan.style.left = "-120%";

        requestAnimationFrame(()=>{

            requestAnimationFrame(()=>{

                scan.style.transition = "left 1s linear";
                scan.style.left = "170%";

            });

        });

    });

});