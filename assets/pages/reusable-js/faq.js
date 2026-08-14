/*==================================================
FAQ ACCORDION
==================================================*/

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item=>{

    const button=item.querySelector(".faq-question");

    button.addEventListener("click",()=>{

        faqItems.forEach(other=>{

            if(other!==item){

                other.classList.remove("active");

            }

        });

        item.classList.toggle("active");

    });

});