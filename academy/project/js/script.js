/* =========================================================================
   MegaTech Technologies Academy
   Main JavaScript - js/script.js
   ========================================================================= */

(function () {
    "use strict";

    /* -----------------------------------------------------------------------
       COURSE DOWNLOAD LINKS CONFIGURATION
       -----------------------------------------------------------------------
       Replace the empty string values below with the actual download URLs
       for each course. When a value is empty, the download button shows a
       "link coming soon" placeholder state instead of a broken link.
       ----------------------------------------------------------------------- */
    const COURSE_DOWNLOAD_LINKS = {
        1: "https://tinyurl.com/ujz9wenx",  // [INSERT COURSE 1 DOWNLOAD LINK HERE]
        2: "https://tinyurl.com/y3m9ckd8",  // [INSERT COURSE 2 DOWNLOAD LINK HERE]
        3: "https://tinyurl.com/2fes2c9b",  // [INSERT COURSE 3 DOWNLOAD LINK HERE]
        4: "https://tinyurl.com/bddwkawn"   // [INSERT COURSE 4 DOWNLOAD LINK HERE]
    };

    const WHATSAPP_NUMBER = "2348134319544";

    /* =======================================================================
       1. MOBILE NAVIGATION
       ======================================================================= */
    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    function toggleMenu() {
        const isOpen = navMenu.classList.toggle("open");
        menuBtn.classList.toggle("open", isOpen);
        menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
        menuBtn.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    }

    function closeMenu() {
        navMenu.classList.remove("open");
        menuBtn.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "Open menu");
    }

    if (menuBtn) {
        menuBtn.addEventListener("click", toggleMenu);
    }

    // Close the mobile menu after a navigation link is clicked
    navLinks.forEach(function (link) {
        link.addEventListener("click", closeMenu);
    });

    // Close menu when clicking outside of it
    document.addEventListener("click", function (e) {
        if (
            navMenu.classList.contains("open") &&
            !navMenu.contains(e.target) &&
            !menuBtn.contains(e.target)
        ) {
            closeMenu();
        }
    });

    /* =======================================================================
       2. STICKY HEADER SHADOW ON SCROLL
       ======================================================================= */
    const header = document.getElementById("header");

    function handleHeaderScroll() {
        if (window.scrollY > 10) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", handleHeaderScroll, { passive: true });

    /* =======================================================================
       3. SMOOTH SCROLL FOR ANCHOR LINKS
       ======================================================================= */
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(function (link) {
        link.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            if (!targetId || targetId === "#") return;

            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });

    /* =======================================================================
       4. FAQ ACCORDION
       ======================================================================= */
    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach(function (question) {
        question.addEventListener("click", function () {
            const faqItem = this.parentElement;
            const isOpen = faqItem.classList.contains("open");

            // Close all other items
            document.querySelectorAll(".faq-item").forEach(function (item) {
                item.classList.remove("open");
                item.querySelector(".faq-question").setAttribute("aria-expanded", "false");
            });

            // Toggle the clicked item
            if (!isOpen) {
                faqItem.classList.add("open");
                this.setAttribute("aria-expanded", "true");
            }
        });
    });

    /* =======================================================================
       5. COURSE DETAILS EXPAND / COLLAPSE
       ======================================================================= */
    const courseToggles = document.querySelectorAll(".course-toggle");

    courseToggles.forEach(function (toggle) {
        toggle.addEventListener("click", function () {
            const card = this.closest(".course-card");
            const details = card.querySelector(".course-details");
            const isOpen = details.classList.toggle("open");

            this.setAttribute("aria-expanded", isOpen ? "true" : "false");
            this.textContent = isOpen ? "Hide Details" : "View Full Details";
        });
    });

    /* =======================================================================
       6. COURSE DOWNLOAD BUTTONS
       ======================================================================= */
    const downloadButtons = document.querySelectorAll(".course-download");

    downloadButtons.forEach(function (btn) {
        const courseId = btn.getAttribute("data-course");
        const link = COURSE_DOWNLOAD_LINKS[courseId];

        if (link && link.trim() !== "") {
            // Set the actual download URL
            btn.setAttribute("href", link);
            btn.setAttribute("target", "_blank");
            btn.setAttribute("rel", "noopener noreferrer");
        } else {
            // Placeholder state - no broken link
            btn.classList.add("placeholder");
            btn.setAttribute("href", "javascript:void(0)");
            btn.addEventListener("click", function (e) {
                e.preventDefault();
            });
        }
    });

    /* =======================================================================
       7. WHATSAPP REGISTRATION FORM
       ======================================================================= */
    const registerForm = document.getElementById("registerForm");

    if (registerForm) {
        const fullNameInput = document.getElementById("fullName");
        const phoneInput = document.getElementById("phone");
        const nameError = document.getElementById("nameError");
        const phoneError = document.getElementById("phoneError");

        function showError(input, errorEl, message) {
            input.classList.add("invalid");
            errorEl.textContent = message;
        }

        function clearError(input, errorEl) {
            input.classList.remove("invalid");
            errorEl.textContent = "";
        }

        fullNameInput.addEventListener("input", function () {
            clearError(fullNameInput, nameError);
        });

        phoneInput.addEventListener("input", function () {
            clearError(phoneInput, phoneError);
        });

        registerForm.addEventListener("submit", function (e) {
            e.preventDefault();

            let valid = true;
            const fullName = fullNameInput.value.trim();
            const phone = phoneInput.value.trim();

            // Validate full name
            if (fullName === "") {
                showError(fullNameInput, nameError, "Please enter your full name.");
                valid = false;
            } else if (fullName.length < 3) {
                showError(fullNameInput, nameError, "Please enter a valid full name.");
                valid = false;
            } else {
                clearError(fullNameInput, nameError);
            }

            // Validate phone number
            if (phone === "") {
                showError(phoneInput, phoneError, "Please enter your phone number.");
                valid = false;
            } else if (phone.length < 7) {
                showError(phoneInput, phoneError, "Please enter a valid phone number.");
                valid = false;
            } else {
                clearError(phoneInput, phoneError);
            }

            if (!valid) return;

            // Build the WhatsApp message
            const message =
                "Hello MegaTech Technologies Academy,\n\n" +
                "I am interested in registering for the Digital Resource Acquisition and Monetization Academy Owerri.\n\n" +
                "My Name: " + fullName + "\n" +
                "My Phone Number: " + phone + "\n\n" +
                "Please provide me with registration and payment information.\n\n" +
                "Thank you.";

            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodedMessage;

            // Open WhatsApp in a new tab
            window.open(whatsappUrl, "_blank", "noopener,noreferrer");
        });
    }

    /* =======================================================================
       8. SCROLL REVEAL ANIMATIONS
       ======================================================================= */
    const revealTargets = document.querySelectorAll(
        ".day-card, .gain-card, .course-card, .req-card, .faq-item, .download-notice, .support-visual, .fee-panel"
    );

    revealTargets.forEach(function (el) {
        el.classList.add("reveal");
    });

    // Use IntersectionObserver if available, otherwise make everything visible
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
        );

        revealTargets.forEach(function (el) {
            observer.observe(el);
        });
    } else {
        revealTargets.forEach(function (el) {
            el.classList.add("visible");
        });
    }

    /* =======================================================================
       9. ACTIVE NAV LINK HIGHLIGHT ON SCROLL
       ======================================================================= */
    const sections = document.querySelectorAll("section[id]");
    const navLinkMap = {};

    navLinks.forEach(function (link) {
        const href = link.getAttribute("href");
        if (href && href.startsWith("#")) {
            navLinkMap[href.substring(1)] = link;
        }
    });

    function highlightActiveNav() {
        let currentId = "";
        const scrollPos = window.scrollY + 120;

        sections.forEach(function (section) {
            if (scrollPos >= section.offsetTop) {
                currentId = section.getAttribute("id");
            }
        });

        navLinks.forEach(function (link) {
            link.classList.remove("active");
        });

        if (currentId && navLinkMap[currentId]) {
            navLinkMap[currentId].classList.add("active");
        }
    }

    window.addEventListener("scroll", highlightActiveNav, { passive: true });

    /* =======================================================================
       10. INITIAL STATE
       ======================================================================= */
    handleHeaderScroll();
    highlightActiveNav();
})();
