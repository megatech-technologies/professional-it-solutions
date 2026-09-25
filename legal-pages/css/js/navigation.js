/*==================================================
MEGATECH TECHNOLOGIES
STANDALONE LEGAL PAGE JAVASCRIPT
==================================================*/

document.addEventListener("DOMContentLoaded", function () {

    /*==================================================
    MOBILE NAVIGATION
    ==================================================*/

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", function () {

            const isOpen =
                navLinks.classList.toggle("mobile-open");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            const icon =
                menuToggle.querySelector("i");

            if (icon) {

                icon.classList.toggle(
                    "fa-bars",
                    !isOpen
                );

                icon.classList.toggle(
                    "fa-xmark",
                    isOpen
                );

            }

        });

    }

        /*==================================================
    CLOSE MOBILE NAV WHEN BODY IS CLICKED
    ==================================================*/

    document.body.addEventListener("click", function (event) {

        if (
            navLinks &&
            !navLinks.contains(event.target) &&
            menuToggle &&
            !menuToggle.contains(event.target)
        ) {

            navLinks.classList.remove(
                "mobile-open"
            );


            if (menuToggle) {

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );


                const icon =
                    menuToggle.querySelector("i");


                if (icon) {

                    icon.classList.remove(
                        "fa-xmark"
                    );

                    icon.classList.add(
                        "fa-bars"
                    );

                }

            }

        }

    });


    /*==================================================
    NAVIGATION DROPDOWN
    ==================================================*/

    const dropdowns =
        document.querySelectorAll(".nav-dropdown");


    dropdowns.forEach(function (dropdown) {

        const toggle =
            dropdown.querySelector(
                ".nav-dropdown-toggle"
            );


        if (!toggle) return;


        toggle.addEventListener("click", function (event) {

            event.stopPropagation();


            const isOpen =
                dropdown.classList.contains("open");


            /* Close other dropdowns */

            dropdowns.forEach(function (other) {

                if (other !== dropdown) {

                    other.classList.remove("open");

                    const otherToggle =
                        other.querySelector(
                            ".nav-dropdown-toggle"
                        );

                    if (otherToggle) {

                        otherToggle.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }

                }

            });


            /* Toggle current dropdown */

            dropdown.classList.toggle(
                "open",
                !isOpen
            );


            toggle.setAttribute(
                "aria-expanded",
                !isOpen ? "true" : "false"
            );

        });

    });


    /*==================================================
    CLOSE DROPDOWN WHEN CLICKING OUTSIDE
    ==================================================*/

    document.addEventListener("click", function () {

        dropdowns.forEach(function (dropdown) {

            dropdown.classList.remove("open");


            const toggle =
                dropdown.querySelector(
                    ".nav-dropdown-toggle"
                );


            if (toggle) {

                toggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

    });


    /*==================================================
    PREVENT DROPDOWN FROM CLOSING WHEN CLICKING INSIDE
    ==================================================*/

    dropdowns.forEach(function (dropdown) {

        const menu =
            dropdown.querySelector(
                ".nav-dropdown-menu"
            );


        if (menu) {

            menu.addEventListener(
                "click",
                function (event) {

                    event.stopPropagation();

                }
            );

        }

    });


    /*==================================================
    CLOSE MOBILE NAV WHEN A LINK IS CLICKED
    ==================================================*/

    const navigationLinks =
        document.querySelectorAll(
            ".nav-links > a, .nav-dropdown-menu a"
        );


    navigationLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            if (navLinks) {

                navLinks.classList.remove(
                    "mobile-open"
                );

            }


            if (menuToggle) {

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );


                const icon =
                    menuToggle.querySelector("i");


                if (icon) {

                    icon.classList.remove(
                        "fa-xmark"
                    );

                    icon.classList.add(
                        "fa-bars"
                    );

                }

            }


            dropdowns.forEach(function (dropdown) {

                dropdown.classList.remove("open");

            });

        });

    });


    /*==================================================
    CLOSE MOBILE NAV WHEN SCREEN BECOMES DESKTOP
    ==================================================*/

    window.addEventListener("resize", function () {

        if (window.innerWidth > 992) {

            if (navLinks) {

                navLinks.classList.remove(
                    "mobile-open"
                );

            }


            if (menuToggle) {

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );


                const icon =
                    menuToggle.querySelector("i");


                if (icon) {

                    icon.classList.remove(
                        "fa-xmark"
                    );

                    icon.classList.add(
                        "fa-bars"
                    );

                }

            }


            dropdowns.forEach(function (dropdown) {

                dropdown.classList.remove("open");

            });

        }

    });


    /*==================================================
    IMAGE MODAL
    ==================================================*/

    const imageModal =
        document.querySelector("#imageModal");

    const modalImage =
        document.querySelector("#modalImg");

    const closeButton =
        document.querySelector(".close-btn");


    if (imageModal && closeButton) {

        closeButton.addEventListener(
            "click",
            function () {

                imageModal.classList.remove("show");

            }
        );

    }


    /*==================================================
    CLOSE MODAL WHEN CLICKING BACKDROP
    ==================================================*/

    if (imageModal) {

        imageModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === imageModal ||
                    event.target === closeButton
                ) {

                    imageModal.classList.remove(
                        "show"
                    );

                }

            }
        );

    }


    /*==================================================
    ESCAPE KEY
    ==================================================*/

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                if (imageModal) {

                    imageModal.classList.remove(
                        "show"
                    );

                }


                dropdowns.forEach(
                    function (dropdown) {

                        dropdown.classList.remove(
                            "open"
                        );

                    }
                );


                if (navLinks) {

                    navLinks.classList.remove(
                        "mobile-open"
                    );

                }

            }

        }
    );


});