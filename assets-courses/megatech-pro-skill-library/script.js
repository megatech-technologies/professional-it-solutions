(() => {
    "use strict";

    const state = {
        q: "",
        free: false,
        paid: false,
        levels: [],
        durations: [],
        subjects: [],
        languages: [],
        sort: "relevance"
    };


    /* =========================================================
       BASIC SELECTORS
       ========================================================= */

    const $ = (selector) => document.querySelector(selector);

    const $$ = (selector) => {
        return Array.from(document.querySelectorAll(selector));
    };


    /* =========================================================
       GET ALL COURSE CARDS
       Courses remain inside the HTML.
       ========================================================= */

    function getCourseCards() {
        return $$(".course-card");
    }


    /* =========================================================
       READ COURSE DURATION
       ========================================================= */

    function getMinutes(card) {
        const text = card.dataset.minutes || "";

        const hourMatch = text.match(/(\d+)\s*hour/i);
        const minuteMatch = text.match(/(\d+)\s*minute/i);

        const hours = hourMatch
            ? Number(hourMatch[1]) * 60
            : 0;

        const minutes = minuteMatch
            ? Number(minuteMatch[1])
            : 0;

        return hours + minutes;
    }


    /* =========================================================
       DURATION FILTER CATEGORY
       ========================================================= */

    function getDurationBucket(minutes) {

        if (minutes < 30) {
            return "under30";
        }

        if (minutes <= 60) {
            return "30to60";
        }

        if (minutes <= 120) {
            return "1to2";
        }

        return "2to5";
    }


    /* =========================================================
       LOCAL STORAGE
       Add to List uses localStorage.
       ========================================================= */

    function getSavedCourses() {

        try {

            const saved = localStorage.getItem(
                "megatechSaved"
            );

            const parsed = saved
                ? JSON.parse(saved)
                : [];

            return Array.isArray(parsed)
                ? parsed
                : [];

        } catch (error) {

            console.warn(
                "Could not read saved courses:",
                error
            );

            return [];
        }
    }


    function setSavedCourses(ids) {

        try {

            localStorage.setItem(
                "megatechSaved",
                JSON.stringify(ids)
            );

            return true;

        } catch (error) {

            console.error(
                "Could not save courses:",
                error
            );

            showToast(
                "Your browser blocked local storage."
            );

            return false;
        }
    }


    /* =========================================================
       UPDATE ADD TO LIST BUTTONS
       ========================================================= */

    function updateSavedButtons() {

        const saved = getSavedCourses();

        $$("[data-save]").forEach((button) => {

            const courseId = button.dataset.save;

            const isSaved = saved.includes(courseId);

            button.classList.toggle(
                "saved",
                isSaved
            );

            button.textContent = isSaved
                ? "✓ Saved"
                : "+ Add to list";

            button.setAttribute(
                "aria-pressed",
                String(isSaved)
            );
        });


        /* Update saved course counters */

        $$(".saved-count").forEach((counter) => {

            counter.textContent = saved.length;

        });
    }


    /* =========================================================
       DYNAMIC FILTER GENERATION
       
       These filters are created from the values found in:
       
       data-level
       data-subject
       data-language
       
       inside the HTML course articles.
       ========================================================= */

    function buildDynamicFilters() {

        const cards = getCourseCards();


        /* -----------------------------------------------------
           LEVELS
           ----------------------------------------------------- */

        const levels = {};

        cards.forEach((card) => {

            const level = (
                card.dataset.level || ""
            ).trim();

            if (!level) {
                return;
            }

            if (!levels[level]) {
                levels[level] = 0;
            }

            levels[level]++;
        });


        /* -----------------------------------------------------
           SUBJECTS
           ----------------------------------------------------- */

        const subjects = {};

        cards.forEach((card) => {

            const subjectText = (
                card.dataset.subject || ""
            ).trim();

            if (!subjectText) {
                return;
            }


            /*
             * A course can contain multiple subjects
             * separated by commas.
             *
             * Example:
             *
             * data-subject="STEM, Technology"
             */

            const subjectList = subjectText
                .split(",")
                .map((subject) => subject.trim())
                .filter(Boolean);


            subjectList.forEach((subject) => {

                if (!subjects[subject]) {
                    subjects[subject] = 0;
                }

                subjects[subject]++;
            });
        });


        /* -----------------------------------------------------
           LANGUAGES
           ----------------------------------------------------- */

        const languages = {};

        cards.forEach((card) => {

            const language = (
                card.dataset.language || ""
            ).trim();

            if (!language) {
                return;
            }

            if (!languages[language]) {
                languages[language] = 0;
            }

            languages[language]++;
        });


        /* -----------------------------------------------------
           CREATE LEVEL FILTERS
           ----------------------------------------------------- */

        createDynamicFilterGroup(
            "levelFilters",
            "level",
            levels
        );


        /* -----------------------------------------------------
           CREATE SUBJECT FILTERS
           ----------------------------------------------------- */

        createDynamicFilterGroup(
            "subjectFilters",
            "subject",
            subjects
        );


        /* -----------------------------------------------------
           CREATE LANGUAGE FILTERS
           ----------------------------------------------------- */

        createDynamicFilterGroup(
            "languageFilters",
            "language",
            languages
        );
    }


    /* =========================================================
       CREATE A FILTER GROUP
       ========================================================= */

    function createDynamicFilterGroup(
        containerId,
        inputName,
        values
    ) {

        const container = document.getElementById(
            containerId
        );

        if (!container) {
            return;
        }


        /*
         * Remove the existing dynamically generated
         * options before rebuilding them.
         */

        container.innerHTML = "";


        /*
         * Sort alphabetically.
         */

        const sortedValues = Object.keys(values)
            .sort((a, b) =>
                a.localeCompare(b)
            );


        sortedValues.forEach((value) => {

            const label = document.createElement(
                "label"
            );

            const input = document.createElement(
                "input"
            );

            input.type = "checkbox";
            input.name = inputName;
            input.value = value;


            const text = document.createElement(
                "span"
            );

            text.textContent = value;


            const count = document.createElement(
                "em"
            );

            count.textContent = values[value];


            label.appendChild(input);
            label.appendChild(text);
            label.appendChild(count);

            container.appendChild(label);
        });
    }


    /* =========================================================
       COURSE FILTER MATCHING
       ========================================================= */

    function courseMatches(card) {

        const query = state.q
            .trim()
            .toLowerCase();


        /* -----------------------------------------------------
           SEARCH
           ----------------------------------------------------- */

        if (query) {

            const searchableText = `
                ${card.dataset.title || ""}
                ${card.dataset.description || ""}
            `.toLowerCase();

            if (!searchableText.includes(query)) {
                return false;
            }
        }


        /* -----------------------------------------------------
           FREE / PAID
           ----------------------------------------------------- */

        if (
            state.free &&
            !state.paid &&
            card.dataset.free !== "true"
        ) {

            return false;
        }


        if (
            state.paid &&
            !state.free &&
            card.dataset.free === "true"
        ) {

            return false;
        }


        /* -----------------------------------------------------
           LEVEL
           ----------------------------------------------------- */

        if (state.levels.length) {

            const courseLevel = (
                card.dataset.level || ""
            ).trim();

            if (
                !state.levels.includes(
                    courseLevel
                )
            ) {

                return false;
            }
        }


        /* -----------------------------------------------------
           DURATION
           ----------------------------------------------------- */

        if (state.durations.length) {

            const bucket = getDurationBucket(
                getMinutes(card)
            );

            if (
                !state.durations.includes(
                    bucket
                )
            ) {

                return false;
            }
        }


        /* -----------------------------------------------------
           SUBJECT
           ----------------------------------------------------- */

        if (state.subjects.length) {

            const subjectText = (
                card.dataset.subject || ""
            ).trim();


            const courseSubjects = subjectText
                .split(",")
                .map((subject) =>
                    subject.trim()
                )
                .filter(Boolean);


            const hasMatchingSubject =
                state.subjects.some(
                    (subject) =>
                        courseSubjects.includes(
                            subject
                        )
                );


            if (!hasMatchingSubject) {
                return false;
            }
        }


        /* -----------------------------------------------------
           LANGUAGE
           ----------------------------------------------------- */

        if (state.languages.length) {

            const courseLanguage = (
                card.dataset.language || ""
            ).trim();

            if (
                !state.languages.includes(
                    courseLanguage
                )
            ) {

                return false;
            }
        }


        return true;
    }


    /* =========================================================
       RENDER / FILTER COURSES
       ========================================================= */

    function renderCourses() {

        const cards = getCourseCards();


        /*
         * Find courses that match the current filters.
         */

        const visible = cards.filter(
            courseMatches
        );


        /* -----------------------------------------------------
           SORTING
           ----------------------------------------------------- */

        if (state.sort === "short") {

            visible.sort(
                (a, b) =>
                    getMinutes(a) -
                    getMinutes(b)
            );
        }


        else if (state.sort === "long") {

            visible.sort(
                (a, b) =>
                    getMinutes(b) -
                    getMinutes(a)
            );
        }


        else if (state.sort === "az") {

            visible.sort(
                (a, b) =>
                    (
                        a.dataset.title || ""
                    ).localeCompare(
                        b.dataset.title || ""
                    )
            );
        }


        /* -----------------------------------------------------
           REINSERT SORTED COURSES
           ----------------------------------------------------- */

        const courseList = $(
            "#courseList"
        );

        if (courseList) {

            visible.forEach((card) => {

                courseList.appendChild(card);

            });
        }


        /* -----------------------------------------------------
           SHOW / HIDE COURSES
           ----------------------------------------------------- */

        cards.forEach((card) => {

            card.style.display =
                visible.includes(card)
                    ? ""
                    : "none";
        });


        /* -----------------------------------------------------
           RESULTS COUNT
           ----------------------------------------------------- */

        const results = $(
            "#resultsCount"
        );

        if (results) {

            results.textContent =
                `${visible.length} courses`;
        }


        const showing = $(
            "#showing"
        );

        if (showing) {

            showing.textContent =
                `Showing ${visible.length} of ${cards.length} courses`;
        }


        /* -----------------------------------------------------
           EMPTY STATE
           ----------------------------------------------------- */

        const empty = $(
            "#empty"
        );

        if (empty) {

            empty.hidden =
                visible.length !== 0;
        }


        /* -----------------------------------------------------
           UPDATE ADD TO LIST
           ----------------------------------------------------- */

        updateSavedButtons();
    }


    /* =========================================================
       UPDATE FREE / PAID / DURATION COUNTS
       ========================================================= */

    function updateBasicFilterCounts() {

        const cards = getCourseCards();


        const counts = {

            free: 0,
            paid: 0,

            under30: 0,
            "30to60": 0,
            "1to2": 0,
            "2to5": 0
        };


        cards.forEach((card) => {

            /* Free / Paid */

            if (
                card.dataset.free === "true"
            ) {

                counts.free++;

            } else {

                counts.paid++;
            }


            /* Duration */

            const bucket =
                getDurationBucket(
                    getMinutes(card)
                );


            if (
                counts[bucket] !== undefined
            ) {

                counts[bucket]++;
            }
        });


        /* -----------------------------------------------------
           Update elements with data-count
           ----------------------------------------------------- */

        $$("[data-count]").forEach(
            (element) => {

                const key =
                    element.dataset.count;

                if (
                    counts[key] !== undefined
                ) {

                    element.textContent =
                        counts[key];
                }
            }
        );
    }


    /* =========================================================
       CLEAR ALL FILTERS
       ========================================================= */

    function clearFilters() {

        state.q = "";

        state.free = false;

        state.paid = false;

        state.levels = [];

        state.durations = [];

        state.subjects = [];

        state.languages = [];

        state.sort = "relevance";


        /* Search */

        const search = $(
            "#search"
        );

        if (search) {
            search.value = "";
        }


        /* Sort */

        const sort = $(
            "#sort"
        );

        if (sort) {

            sort.value =
                "relevance";
        }


        /* Uncheck filters */

        $$(
            'input[type="checkbox"]'
        ).forEach((input) => {

            input.checked = false;

        });


        renderCourses();
    }


    /* =========================================================
       TOAST MESSAGE
       ========================================================= */

    function showToast(message) {

        const toast = $(
            "#toast"
        );

        if (!toast) {
            return;
        }


        toast.textContent =
            message;


        toast.classList.add(
            "show"
        );


        clearTimeout(
            window.__megaTechToastTimer
        );


        window.__megaTechToastTimer =
            setTimeout(() => {

                toast.classList.remove(
                    "show"
                );

            }, 1600);
    }


    /* =========================================================
       ADD / REMOVE COURSE FROM LIST
       ========================================================= */

    function toggleSavedCourse(
        courseId
    ) {

        const saved =
            getSavedCourses();


        const index =
            saved.indexOf(courseId);


        if (index >= 0) {

            saved.splice(
                index,
                1
            );

            showToast(
                "Removed from your list"
            );

        } else {

            saved.push(
                courseId
            );

            showToast(
                "Course added to your list"
            );
        }


        if (
            setSavedCourses(saved)
        ) {

            updateSavedButtons();
        }
    }


    /* =========================================================
       INITIALIZE WEBSITE
       ========================================================= */

    function init() {


        /* -----------------------------------------------------
           Build dynamic filters from HTML courses
           ----------------------------------------------------- */

        buildDynamicFilters();


        /* -----------------------------------------------------
           Update basic filter counts
           ----------------------------------------------------- */

        updateBasicFilterCounts();


        /* -----------------------------------------------------
           Render courses
           ----------------------------------------------------- */

        renderCourses();


        /* =====================================================
           FREE FILTER
           ===================================================== */

        const freeOnly = $(
            "#freeOnly"
        );

        if (freeOnly) {

            freeOnly.addEventListener(
                "change",
                (event) => {

                    state.free =
                        event.target.checked;

                    renderCourses();
                }
            );
        }


        /* =====================================================
           PAID FILTER
           ===================================================== */

        const paidOnly = $(
            "#paidOnly"
        );

        if (paidOnly) {

            paidOnly.addEventListener(
                "change",
                (event) => {

                    state.paid =
                        event.target.checked;

                    renderCourses();
                }
            );
        }


        /* =====================================================
           LEVEL FILTERS
           ===================================================== */

        $$(
            'input[name="level"]'
        ).forEach((input) => {

            input.addEventListener(
                "change",
                () => {

                    state.levels =
                        $$(
                            'input[name="level"]:checked'
                        ).map(
                            (item) =>
                                item.value
                        );

                    renderCourses();
                }
            );
        });


        /* =====================================================
           DURATION FILTERS
           ===================================================== */

        $$(
            'input[name="duration"]'
        ).forEach((input) => {

            input.addEventListener(
                "change",
                () => {

                    state.durations =
                        $$(
                            'input[name="duration"]:checked'
                        ).map(
                            (item) =>
                                item.value
                        );

                    renderCourses();
                }
            );
        });


        /* =====================================================
           SUBJECT FILTERS
           ===================================================== */

        $$(
            'input[name="subject"]'
        ).forEach((input) => {

            input.addEventListener(
                "change",
                () => {

                    state.subjects =
                        $$(
                            'input[name="subject"]:checked'
                        ).map(
                            (item) =>
                                item.value
                        );

                    renderCourses();
                }
            );
        });


        /* =====================================================
           LANGUAGE FILTERS
           ===================================================== */

        $$(
            'input[name="language"]'
        ).forEach((input) => {

            input.addEventListener(
                "change",
                () => {

                    state.languages =
                        $$(
                            'input[name="language"]:checked'
                        ).map(
                            (item) =>
                                item.value
                        );

                    renderCourses();
                }
            );
        });


        /* =====================================================
           SEARCH
           ===================================================== */

        const search = $(
            "#search"
        );

        if (search) {

            search.addEventListener(
                "input",
                (event) => {

                    state.q =
                        event.target.value;

                    renderCourses();
                }
            );
        }


        /* =====================================================
           CLEAR SEARCH
           ===================================================== */

        const searchClear = $(
            "#searchClear"
        );

        if (searchClear) {

            searchClear.addEventListener(
                "click",
                () => {

                    if (search) {
                        search.value = "";
                    }

                    state.q = "";

                    renderCourses();
                }
            );
        }


        /* =====================================================
           SORTING
           ===================================================== */

        const sort = $(
            "#sort"
        );

        if (sort) {

            sort.addEventListener(
                "change",
                (event) => {

                    state.sort =
                        event.target.value;

                    renderCourses();
                }
            );
        }


        /* =====================================================
           CLEAR FILTER BUTTON
           ===================================================== */

        const clearButton = $(
            "#clear"
        );

        if (clearButton) {

            clearButton.addEventListener(
                "click",
                clearFilters
            );
        }


        /* =====================================================
           MOBILE CLEAR BUTTON
           ===================================================== */

        const mobileClear = $(
            "#mobileClear"
        );

        if (mobileClear) {

            mobileClear.addEventListener(
                "click",
                () => {

                    clearFilters();


                    const filters = $(
                        "#filters"
                    );

                    const overlay = $(
                        "#overlay"
                    );


                    if (filters) {
                        filters.classList.remove(
                            "open"
                        );
                    }


                    if (overlay) {
                        overlay.classList.remove(
                            "open"
                        );
                    }
                }
            );
        }


        /* =====================================================
           EMPTY STATE CLEAR
           ===================================================== */

        const emptyClear = $(
            "#emptyClear"
        );

        if (emptyClear) {

            emptyClear.addEventListener(
                "click",
                clearFilters
            );
        }


        /* =====================================================
           ADD TO LIST BUTTONS
           ===================================================== */

        $$(
            "[data-save]"
        ).forEach((button) => {

            button.addEventListener(
                "click",
                () => {

                    const courseId =
                        button.dataset.save;

                    toggleSavedCourse(
                        courseId
                    );
                }
            );
        });


        /* =====================================================
           MOBILE FILTER OPEN
           ===================================================== */

        const filterOpen = $(
            "#filterOpen"
        );

        if (filterOpen) {

            filterOpen.addEventListener(
                "click",
                () => {

                    const filters = $(
                        "#filters"
                    );

                    const overlay = $(
                        "#overlay"
                    );


                    if (filters) {

                        filters.classList.add(
                            "open"
                        );
                    }


                    if (overlay) {

                        overlay.classList.add(
                            "open"
                        );
                    }
                }
            );
        }


        /* =====================================================
           MOBILE FILTER OVERLAY
           ===================================================== */

        const overlay = $(
            "#overlay"
        );

        if (overlay) {

            overlay.addEventListener(
                "click",
                () => {

                    const filters = $(
                        "#filters"
                    );


                    if (filters) {

                        filters.classList.remove(
                            "open"
                        );
                    }


                    overlay.classList.remove(
                        "open"
                    );
                }
            );
        }


        /* =====================================================
           MOBILE MENU
           ===================================================== */

const mobileMenu = $("#mobileMenu");
const mobileNav = $("#mobileNav");

if (mobileMenu && mobileNav) {

    mobileMenu.setAttribute(
        "aria-expanded",
        "false"
    );

    mobileMenu.addEventListener(
        "click",
        () => {

            const isOpen =
                mobileNav.classList.toggle("open");

            mobileMenu.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            document.body.classList.toggle(
                "menu-open",
                isOpen
            );
        }
    );


    /* Close menu when a navigation link is clicked */

    mobileNav
        .querySelectorAll("a")
        .forEach((link) => {

            link.addEventListener(
                "click",
                () => {

                    mobileNav.classList.remove(
                        "open"
                    );

                    mobileMenu.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    document.body.classList.remove(
                        "menu-open"
                    );
                }
            );
        });


    /* Close menu with Escape */

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {

                mobileNav.classList.remove(
                    "open"
                );

                mobileMenu.setAttribute(
                    "aria-expanded",
                    "false"
                );

                document.body.classList.remove(
                    "menu-open"
                );
            }
        }
    );
}


        /* =====================================================
           SEARCH OPEN BUTTON
           ===================================================== */

        const searchOpen = $(
            "#searchOpen"
        );

        if (searchOpen) {

            searchOpen.addEventListener(
                "click",
                () => {

                    const panel = $(
                        "#searchPanel"
                    );


                    if (!panel) {
                        return;
                    }


                    const isOpening =
                        panel.style.display !==
                        "block";


                    panel.style.display =
                        isOpening
                            ? "block"
                            : "none";


                    if (isOpening) {

                        const searchInput = $(
                            "#search"
                        );


                        if (searchInput) {

                            searchInput.focus();
                        }
                    }
                }
            );
        }


        /* =====================================================
           VIEW SAVED COURSES
           ===================================================== */

        const viewSaved = $(
            "#viewSaved"
        );

        if (viewSaved) {

            viewSaved.addEventListener(
                "click",
                () => {

                    const saved =
                        getSavedCourses();


                    const cards =
                        getCourseCards();


                    cards.forEach(
                        (card) => {

                            card.style.display =
                                saved.includes(
                                    card.dataset.id
                                )
                                    ? ""
                                    : "none";
                        }
                    );


                    const results = $(
                        "#resultsCount"
                    );


                    const showing = $(
                        "#showing"
                    );


                    if (results) {

                        results.textContent =
                            `${saved.length} saved courses`;
                    }


                    if (showing) {

                        showing.textContent =
                            `Showing ${saved.length} saved courses`;
                    }


                    const courses = $(
                        "#courses"
                    );


                    if (courses) {

                        courses.scrollIntoView({
                            behavior: "smooth"
                        });
                    }
                }
            );
        }
    }


    /* =========================================================
       START SCRIPT
       ========================================================= */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            init,
            {
                once: true
            }
        );

    } else {

        init();
    }

})();