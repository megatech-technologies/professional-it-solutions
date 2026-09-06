
/* =========================================================
   MEGATECH COURSE PLAYER
   Class Central-style YouTube Classroom Player
   REUSABLE MULTI-COURSE VERSION
========================================================= */


/* =========================================================
   PLAYER STATE
========================================================= */

let player = null;

let progressTimer = null;

let playAll = true;

let currentLessonIndex = 0;

let currentLesson = null;

let playerReady = false;


/* =========================================================
   COURSE DATA
   =========================================================
   
   FOR A NEW COURSE PAGE:
   
   1. Change courseVideoId
   2. Replace the lessons array
   
   Everything else can remain unchanged.
========================================================= */


/* =========================================================
   YOUTUBE VIDEO ID
========================================================= */

const courseVideoId = "NFqZhGmkEMg";


/* =========================================================
   LESSON / CHAPTER DATA
========================================================= */

const lessons = [

   {
        id: "67db8342b160e",
        title: "Lenovo IdeaPad 5 Pro 16IHU6 dead, not charging, no power, motherboard repair, my way to fix this",
        start: 0,
        end: null
    }

];


/* =========================================================
   ELEMENTS
========================================================= */

const coursePlayer =
    document.getElementById("coursePlayer");


const centerPlayBtn =
    document.getElementById("centerPlayBtn");


const controlPlayBtn =
    document.getElementById("controlPlayBtn");


const videoProgress =
    document.getElementById("videoProgress");


const videoTime =
    document.getElementById("videoTime");


const muteBtn =
    document.getElementById("muteBtn");


const volumeRange =
    document.getElementById("volumeRange");


const fullscreenBtn =
    document.getElementById("fullscreenBtn");


const settingsBtn =
    document.getElementById("settingsBtn");


const settingsMenu =
    document.getElementById("settingsMenu");


const speedMenuBtn =
    document.getElementById("speedMenuBtn");


const speedMenu =
    document.getElementById("speedMenu");


const speedBackBtn =
    document.getElementById("speedBackBtn");


const currentSpeed =
    document.getElementById("currentSpeed");


const playAllToggle =
    document.getElementById("playAllToggle");


const lessonButtons =
    document.querySelectorAll(".lesson-item");


const videoVolume =
    document.querySelector(".video-volume");


/* =========================================================
   INITIAL LESSON
========================================================= */

currentLesson =
    lessons[0];


/* =========================================================
   YOUTUBE IFRAME API
========================================================= */

function onYouTubeIframeAPIReady() {

    /*
       Prevent duplicate player creation.
    */

    if (player) {
        return;
    }


    player =
        new YT.Player(
            "youtube-player",
            {

                width: "100%",

                height: "100%",

                videoId:
                    courseVideoId,

                playerVars: {

                    autoplay: 0,

                    controls: 0,

                    disablekb: 1,

                    playsinline: 1,

                    rel: 0,

                    modestbranding: 1,

                    fs: 0,

                    iv_load_policy: 3,

                    enablejsapi: 1

                },

                events: {

                    onReady:
                        onPlayerReady,

                    onStateChange:
                        onPlayerStateChange,

                    onError:
                        onPlayerError

                }

            }
        );

}


/* =========================================================
   YOUTUBE API LOADER
========================================================= */

function loadYouTubeAPI() {

    /*
       If YouTube API is already available,
       initialize immediately.
    */

    if (
        window.YT &&
        window.YT.Player
    ) {

        onYouTubeIframeAPIReady();

        return;

    }


    /*
       If the API script is already being loaded,
       don't add another copy.
    */

    const existingScript =
        document.querySelector(
            'script[src="https://www.youtube.com/iframe_api"]'
        );


    if (existingScript) {
        return;
    }


    /*
       Load YouTube IFrame API.
    */

    const script =
        document.createElement("script");


    script.src =
        "https://www.youtube.com/iframe_api";


    script.async = true;


    document.head.appendChild(script);

}


/* =========================================================
   START YOUTUBE API
========================================================= */

loadYouTubeAPI();


/* =========================================================
   PLAYER READY
========================================================= */

function onPlayerReady() {

    playerReady = true;


    currentLesson =
        lessons[currentLessonIndex] ||
        lessons[0];


    updateLessonHighlight(
        currentLessonIndex
    );


    updateVideoTime();

    updateProgress();


    /*
       Prevent duplicate progress timers.
    */

    if (progressTimer) {

        clearInterval(
            progressTimer
        );

    }


    /*
       ORIGINAL WORKING TIMING:
       250ms interval.
       
       This is intentionally kept from
       the original working version.
    */

    progressTimer =
        setInterval(
            updateProgress,
            250
        );

}


/* =========================================================
   PLAYER STATE
========================================================= */

function onPlayerStateChange(event) {

    if (!playerReady) {
        return;
    }


    /* =====================================================
       PLAYING
    ================================================== */

    if (
        event.data ===
        YT.PlayerState.PLAYING
    ) {

        coursePlayer.classList.add(
            "is-playing"
        );

        controlPlayBtn.setAttribute(
            "aria-label",
            "Pause"
        );

        controlPlayBtn.setAttribute(
            "aria-pressed",
            "true"
        );

        centerPlayBtn.setAttribute(
            "aria-pressed",
            "true"
        );

        return;
    }


    /* =====================================================
       PAUSED
    ================================================== */

    if (
        event.data ===
        YT.PlayerState.PAUSED
    ) {

        coursePlayer.classList.remove(
            "is-playing"
        );

        controlPlayBtn.setAttribute(
            "aria-label",
            "Play"
        );

        controlPlayBtn.setAttribute(
            "aria-pressed",
            "false"
        );

        centerPlayBtn.setAttribute(
            "aria-pressed",
            "false"
        );

        return;
    }


    /* =====================================================
       ENDED
    ================================================== */

    if (
        event.data ===
        YT.PlayerState.ENDED
    ) {

        handleLessonEnd();

    }

}


/* =========================================================
   PLAYER ERROR
========================================================= */

function onPlayerError(event) {

    console.error(
        "YouTube Player Error:",
        event.data
    );

}


/* =========================================================
   CENTER PLAY BUTTON
========================================================= */

centerPlayBtn.addEventListener(
    "click",
    function () {

        if (!playerReady) {
            return;
        }

        playCurrentLesson();

    }
);


/* =========================================================
   CONTROL PLAY / PAUSE
========================================================= */

controlPlayBtn.addEventListener(
    "click",
    function () {

        if (!playerReady) {
            return;
        }


        const state =
            player.getPlayerState();


        if (
            state ===
            YT.PlayerState.PLAYING
        ) {

            player.pauseVideo();

        } else {

            playCurrentLesson();

        }

    }
);


/* =========================================================
   PLAY CURRENT LESSON
========================================================= */

function playCurrentLesson() {

    if (!playerReady) {
        return;
    }


    if (!currentLesson) {

        currentLesson =
            lessons[0];

    }


    const currentTime =
        player.getCurrentTime();


    /*
       If the player is already inside
       this chapter, continue from there.
    */

    if (
        currentTime >= currentLesson.start &&
        (
            currentLesson.end === null ||
            currentTime < currentLesson.end
        )
    ) {

        player.playVideo();

        return;

    }


    /*
       Otherwise start the lesson
       from its chapter start.
    */

    player.seekTo(
        currentLesson.start,
        true
    );

    player.playVideo();

}


/* =========================================================
   UPDATE PROGRESS
========================================================= */

function updateProgress() {

    if (
        !playerReady ||
        !player
    ) {
        return;
    }


    const current =
        player.getCurrentTime();


    const duration =
        player.getDuration();


    if (!duration) {
        return;
    }


    /*
       Overall video progress.
    */

    videoProgress.value =
        (
            current /
            duration
        ) * 100;


    updateVideoTime();


    /*
       Check whether current chapter
       has reached its ending timestamp.
    */

    if (
        currentLesson &&
        currentLesson.end !== null &&
        current >= currentLesson.end
    ) {

        handleLessonEnd();

    }

}


/* =========================================================
   VIDEO TIME
========================================================= */

function updateVideoTime() {

    if (
        !playerReady ||
        !player
    ) {
        return;
    }


    const current =
        player.getCurrentTime();


    const duration =
        player.getDuration();


    if (!duration) {
        return;
    }


    /*
       Class Central uses countdown
       style for the current display.
    */

    const remaining =
        Math.max(
            0,
            duration - current
        );


    videoTime.textContent =
        "-" +
        formatTime(
            remaining
        );

}


/* =========================================================
   FORMAT TIME
========================================================= */

function formatTime(seconds) {

    seconds =
        Math.floor(
            Math.max(
                0,
                seconds
            )
        );


    const hours =
        Math.floor(
            seconds / 3600
        );


    const minutes =
        Math.floor(
            (seconds % 3600) / 60
        );


    const remaining =
        seconds % 60;


    if (hours > 0) {

        return (
            String(hours).padStart(2, "0") +
            ":" +
            String(minutes).padStart(2, "0") +
            ":" +
            String(remaining).padStart(2, "0")
        );

    }


    return (
        String(minutes).padStart(2, "0") +
        ":" +
        String(remaining).padStart(2, "0")
    );

}


/* =========================================================
   SEEK BAR
========================================================= */

videoProgress.addEventListener(
    "input",
    function () {

        if (
            !playerReady ||
            !player
        ) {
            return;
        }


        const duration =
            player.getDuration();


        if (!duration) {
            return;
        }


        const newTime =
            (
                Number(
                    this.value
                ) / 100
            ) * duration;


        player.seekTo(
            newTime,
            true
        );


        updateCurrentLesson(
            newTime
        );

    }
);


/* =========================================================
   FIND LESSON FROM TIME
========================================================= */

function findLessonFromTime(time) {

    for (
        let i = 0;
        i < lessons.length;
        i++
    ) {

        const lesson =
            lessons[i];


        if (
            time >= lesson.start &&
            (
                lesson.end === null ||
                time < lesson.end
            )
        ) {

            return i;

        }

    }


    return -1;

}


/* =========================================================
   UPDATE CURRENT LESSON
========================================================= */

function updateCurrentLesson(time) {

    const index =
        findLessonFromTime(
            time
        );


    if (index === -1) {
        return;
    }


    currentLessonIndex =
        index;


    currentLesson =
        lessons[index];


    updateLessonHighlight(
        index
    );

}


/* =========================================================
   UPDATE LESSON HIGHLIGHT
========================================================= */

function updateLessonHighlight(index) {

    lessonButtons.forEach(
        function (button, buttonIndex) {

            button.classList.toggle(
                "active",
                buttonIndex === index
            );

        }
    );

}


/* =========================================================
   LESSON CLICK
========================================================= */

lessonButtons.forEach(
    function (lessonButton, index) {

        lessonButton.addEventListener(
            "click",
            function () {

                if (!playerReady) {
                    return;
                }


                const lesson =
                    lessons[index];


                currentLessonIndex =
                    index;


                currentLesson =
                    lesson;


                updateLessonHighlight(
                    index
                );


                player.seekTo(
                    lesson.start,
                    true
                );


                player.playVideo();

            }
        );

    }
);


/* =========================================================
   HANDLE LESSON END
========================================================= */

function handleLessonEnd() {

    if (!currentLesson) {
        return;
    }


    /*
       Stop exactly at chapter boundary
       instead of allowing the previous
       chapter to continue into the next.
    */

    if (
        currentLesson.end !== null
    ) {

        player.seekTo(
            currentLesson.end,
            true
        );

    }


    /*
       Play All enabled:
       move to next chapter.
    */

    if (
        playAll &&
        currentLessonIndex <
        lessons.length - 1
    ) {

        const nextIndex =
            currentLessonIndex + 1;


        const nextLesson =
            lessons[nextIndex];


        currentLessonIndex =
            nextIndex;


        currentLesson =
            nextLesson;


        updateLessonHighlight(
            nextIndex
        );


        player.seekTo(
            nextLesson.start,
            true
        );


        player.playVideo();

        return;

    }


    /*
       Last lesson or Play All disabled.
    */

    player.pauseVideo();

}


/* =========================================================
   PLAY ALL TOGGLE
========================================================= */

playAllToggle.addEventListener(
    "click",
    function () {

        playAll =
            !playAll;


        this.setAttribute(
            "aria-checked",
            String(playAll)
        );

    }
);


/* =========================================================
   MUTE / UNMUTE
========================================================= */

muteBtn.addEventListener(
    "click",
    function () {

        if (!playerReady) {
            return;
        }


        if (
            player.isMuted()
        ) {

            player.unMute();

            videoVolume.classList.remove(
                "is-muted"
            );

            muteBtn.setAttribute(
                "aria-label",
                "Mute"
            );

            muteBtn.setAttribute(
                "aria-pressed",
                "false"
            );

        } else {

            player.mute();

            videoVolume.classList.add(
                "is-muted"
            );

            muteBtn.setAttribute(
                "aria-label",
                "Unmute"
            );

            muteBtn.setAttribute(
                "aria-pressed",
                "true"
            );

        }

    }
);


/* =========================================================
   VOLUME
========================================================= */

volumeRange.addEventListener(
    "input",
    function () {

        if (!playerReady) {
            return;
        }


        const volume =
            Number(
                this.value
            );


        player.setVolume(
            volume * 100
        );


        if (volume === 0) {

            player.mute();

            videoVolume.classList.add(
                "is-muted"
            );

        } else {

            player.unMute();

            videoVolume.classList.remove(
                "is-muted"
            );

        }

    }
);


/* =========================================================
   SETTINGS MENU
========================================================= */

settingsBtn.addEventListener(
    "click",
    function (event) {

        event.stopPropagation();

        const isHidden =
            settingsMenu.hasAttribute(
                "hidden"
            );


        if (isHidden) {

            settingsMenu.removeAttribute(
                "hidden"
            );

            settingsBtn.setAttribute(
                "aria-expanded",
                "true"
            );

        } else {

            closeSettings();

        }

    }
);


/* =========================================================
   SPEED MENU
========================================================= */

speedMenuBtn.addEventListener(
    "click",
    function () {

        document
            .querySelector(
                ".settings-home"
            )
            .hidden = true;


        speedMenu.hidden = false;

    }
);


/* =========================================================
   SPEED BACK
========================================================= */

speedBackBtn.addEventListener(
    "click",
    function () {

        speedMenu.hidden = true;


        document
            .querySelector(
                ".settings-home"
            )
            .hidden = false;

    }
);


/* =========================================================
   SPEED OPTIONS
========================================================= */

document
    .querySelectorAll(
        ".speed-option"
    )
    .forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    if (!playerReady) {
                        return;
                    }


                    const speed =
                        Number(
                            this.dataset.speed
                        );


                    player.setPlaybackRate(
                        speed
                    );


                    document
                        .querySelectorAll(
                            ".speed-option"
                        )
                        .forEach(
                            function (item) {

                                item.classList.remove(
                                    "active"
                                );

                            }
                        );


                    this.classList.add(
                        "active"
                    );


                    currentSpeed.textContent =
                        speed === 1
                            ? "Normal"
                            : speed + "x";


                    speedMenu.hidden =
                        true;


                    document
                        .querySelector(
                            ".settings-home"
                        )
                        .hidden = false;

                }
            );

        }
    );


/* =========================================================
   CLOSE SETTINGS
========================================================= */

function closeSettings() {

    settingsMenu.hidden =
        true;


    speedMenu.hidden =
        true;


    document
        .querySelector(
            ".settings-home"
        )
        .hidden = false;


    settingsBtn.setAttribute(
        "aria-expanded",
        "false"
    );

}


/* =========================================================
   OUTSIDE SETTINGS CLICK
========================================================= */

document.addEventListener(
    "click",
    function (event) {

        if (
            !event.target.closest(
                ".video-settings"
            )
        ) {

            closeSettings();

        }

    }
);


/* =========================================================
   FULLSCREEN
========================================================= */

fullscreenBtn.addEventListener(
    "click",
    function () {

        if (!document.fullscreenElement) {

            if (
                coursePlayer.requestFullscreen
            ) {

                coursePlayer.requestFullscreen();

            }

        } else {

            document.exitFullscreen();

        }

    }
);


/* =========================================================
   FULLSCREEN STATE
========================================================= */

document.addEventListener(
    "fullscreenchange",
    function () {

        const fullscreen =
            document.fullscreenElement ===
            coursePlayer;


        coursePlayer.classList.toggle(
            "is-fullscreen",
            fullscreen
        );


        fullscreenBtn.setAttribute(
            "aria-pressed",
            String(fullscreen)
        );


        fullscreenBtn.setAttribute(
            "aria-label",
            fullscreen
                ? "Exit fullscreen"
                : "Enter fullscreen"
        );

    }
);

