/*==================================================
  MARKETPLACE CATEGORY SYSTEM
==================================================*/

(function () {

    function initMarketplaceCategories() {

        const nav = document.querySelector(
            ".marketplace-category-nav"
        );

        if (!nav) {
            console.warn(
                "Marketplace category navigation not found."
            );
            return;
        }


        const buttons = nav.querySelectorAll(
            ".marketplace-category-btn"
        );

        const panels = document.querySelectorAll(
            ".marketplace-category-panel"
        );


        if (!buttons.length) {
            console.warn(
                "Marketplace category buttons not found."
            );
            return;
        }


        if (!panels.length) {
            console.warn(
                "Marketplace category panels not found."
            );
            return;
        }


        /*==================================================
          SHOW CATEGORY
        ==================================================*/

        function showCategory(category) {

            if (!category) return;


            /*----------------------------------------------
              BUTTONS
            ----------------------------------------------*/

            buttons.forEach(function (button) {

                const buttonCategory =
                    button.getAttribute(
                        "data-market-category"
                    );

                const active =
                    buttonCategory === category;


                button.classList.toggle(
                    "active",
                    active
                );


                button.setAttribute(
                    "aria-selected",
                    active ? "true" : "false"
                );

            });


            /*----------------------------------------------
              PANELS
            ----------------------------------------------*/

            panels.forEach(function (panel) {

                const panelCategory =
                    panel.getAttribute(
                        "data-market-panel"
                    );

                const active =
                    panelCategory === category;


                if (active) {

                    panel.hidden = false;

                    panel.classList.add("active");

                } else {

                    panel.hidden = true;

                    panel.classList.remove("active");

                }

            });

        }


        /*==================================================
          BUTTON CLICK
        ==================================================*/

        buttons.forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const category =
                        button.getAttribute(
                            "data-market-category"
                        );


                    showCategory(category);

                }
            );

        });


        /*==================================================
          INITIAL CATEGORY
        ==================================================*/

        let initialButton =
            nav.querySelector(
                ".marketplace-category-btn.active"
            );


        if (!initialButton) {

            initialButton = buttons[0];

        }


        const initialCategory =
            initialButton.getAttribute(
                "data-market-category"
            );


        showCategory(initialCategory);


        /*==================================================
          DEBUG
        ==================================================*/

        console.log(
            "Marketplace category system ready."
        );

        console.log(
            "Buttons:",
            buttons.length
        );

        console.log(
            "Panels:",
            panels.length
        );

    }


    /*==================================================
      DOM READY
    ==================================================*/

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initMarketplaceCategories
        );

    } else {

        initMarketplaceCategories();

    }

})();