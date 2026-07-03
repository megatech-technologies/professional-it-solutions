

const searchInput = document.getElementById("searchInput");


const galleryImages = document.querySelectorAll(".gallery-item img, .card-gallery img");
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.querySelector(".close-btn");

galleryImages.forEach(img => {
  img.addEventListener("click", () => {
    modal.style.display = "flex";
    modalImg.src = img.src;
  });
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

modal.addEventListener("click", (e) => {
  if (e.target !== modalImg) {
    modal.style.display = "none";
  }
});

// controls button toggling

document.querySelectorAll(".nav-btn").forEach(button => {
  button.addEventListener("click", function () {
    const parent = this.parentElement;

    // Close other dropdowns
    document.querySelectorAll(".dropdown").forEach(drop => {
      if (drop !== parent) {
        drop.classList.remove("active");
      }
    });

    parent.classList.toggle("active");
  });
});

// CLOSE DROPDOWN WHEN CLICKING OUTSIDE
document.addEventListener("click", function (event) {

  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach(function (dropdown) {

    // If the clicked area is NOT inside this dropdown
    if (!dropdown.contains(event.target)) {
      dropdown.classList.remove("active");
    }

  });

});

//FOR HAMBUGGER
const menuToggle = document.getElementById("menuToggle");
const menu = document.querySelector(".menu");

menuToggle.addEventListener("click", () => {
    menu.classList.toggle("show");
});

// BODY EVENT LISTENER

// CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
document.addEventListener("click", function (e) {

    if (
        menu.classList.contains("show") &&
        !e.target.closest(".navbar")
    ) {
        menu.classList.remove("show");
    }

});

// COLLAPSE NAVBAR

// CLOSE MENU AFTER CLICKING A NAV LINK
document.querySelectorAll(".menu a").forEach(link => {

    link.addEventListener("click", () => {
        menu.classList.remove("show");
    });

});