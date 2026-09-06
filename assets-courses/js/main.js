/* =========================================================
   MEGATECH COURSE LIBRARY
   MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   COURSE SEARCH & FILTER
========================================================= */

const courseSearch = document.getElementById("course-search");

const courseCategory = document.getElementById("course-category");

const courseGrid = document.getElementById("course-grid");


/* =========================================================
   FILTER COURSES
========================================================= */

function filterCourses() {

    if (!courseGrid) {
        return;
    }


    const searchTerm = courseSearch
        ? courseSearch.value.trim().toLowerCase()
        : "";


    const selectedCategory = courseCategory
        ? courseCategory.value.toLowerCase()
        : "all";


    const courseCards =
        courseGrid.querySelectorAll(".course-card");


    let visibleCourses = 0;


    courseCards.forEach(card => {

        const cardText =
            card.textContent.toLowerCase();


        const badge =
            card.querySelector(".course-badge");


        const category =
            badge
                ? badge.textContent.trim().toLowerCase()
                : "";


        /* ---------------------------------------------
           SEARCH MATCH
        --------------------------------------------- */

        const matchesSearch =
            cardText.includes(searchTerm);


        /* ---------------------------------------------
           CATEGORY MATCH
        --------------------------------------------- */

        let matchesCategory = true;


        if (selectedCategory !== "all") {

            matchesCategory =
                category === selectedCategory;

        }


        /* ---------------------------------------------
           SHOW / HIDE CARD
        --------------------------------------------- */

        if (
            matchesSearch &&
            matchesCategory
        ) {

            card.style.display = "";

            visibleCourses++;

        } else {

            card.style.display = "none";

        }

    });


    updateEmptyState(visibleCourses);

}


/* =========================================================
   EMPTY SEARCH RESULT
========================================================= */

function updateEmptyState(visibleCourses) {

    let emptyState =
        courseGrid.querySelector(".course-search-empty");


    if (visibleCourses === 0) {

        if (!emptyState) {

            emptyState =
                document.createElement("div");

            emptyState.className =
                "empty-state course-search-empty";

            emptyState.innerHTML = `
                <h3>
                    No courses found
                </h3>

                <p>
                    Try another search term or select
                    a different category.
                </p>
            `;

            courseGrid.appendChild(emptyState);

        }

    } else {

        if (emptyState) {
            emptyState.remove();
        }

    }

}


/* =========================================================
   SEARCH EVENT
========================================================= */

if (courseSearch) {

    courseSearch.addEventListener(
        "input",
        filterCourses
    );

}


/* =========================================================
   CATEGORY EVENT
========================================================= */

if (courseCategory) {

    courseCategory.addEventListener(
        "change",
        filterCourses
    );

}


/* =========================================================
   INITIALIZE
========================================================= */

filterCourses();