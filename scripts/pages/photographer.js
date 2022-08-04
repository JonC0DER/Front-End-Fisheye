// Mettre le code JavaScript lié à la page photographer.html
/**
 * sleep function
 * @param {*} ms milliseconde
 * @return {Promise}
 */
function sleep(ms) { // eslint-disable-line
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * @param {*} word
 * @return {word}
 */
function firsLetterUpperCase(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

/**
 * controle figure video state
 */
function initVideo() {
    const videos = document.querySelectorAll("video");
    videos.forEach((video) => {
        if (!video.getAttribute("controls")) {
            video.setAttribute("controls", "controls");
        } else {
            video.removeAttribute("controls");
        }
    });
}

/**
 * @param {*} identifiant
 * @param {*} name
 * @param {*} medias
 * @param {*} users
 */
async function photographerPage(identifiant, name, medias, users) {
    const albumDiv = document.querySelector(".album");
    const lightBoxDiv = document.querySelector(
        ".lightBox div.figure-container"
    );
    const infosPhotographer = document.querySelector(".infos");
    const avatar = document.querySelector(".photographer-avatar");
    const price = document.querySelector(".total_likes-price");
    let index = 5;
    medias.forEach((media) => {
        const mediaAlbums = albumFactory(media, name, identifiant);
        const userAlbum = mediaAlbums.getUserAlbumDOM();
        if (userAlbum != undefined) {
            userAlbum.setAttribute("tabindex", index++);
            albumDiv.appendChild(userAlbum);
        }
    });
    medias.forEach((media) => {
        const mediaAlbums = albumFactory(media, name, identifiant);
        const userAlbum = mediaAlbums.getUserAlbumDOM();
        if (userAlbum != undefined) {
            userAlbum.setAttribute("tabindex", index++);
            lightBoxDiv.appendChild(userAlbum);
        }
    });
    users.forEach((user) => {
        if (user.id == identifiant) {
            const photographer = photographerFactory(user, identifiant);
            const userCard = photographer.getUserCardDOM();
            if (userCard != undefined) {
                infosPhotographer.appendChild(userCard[0]);
                avatar.appendChild(userCard[1]);
                price.appendChild(userCard[2]);
            }
        }
    });
    listenFigure();
}

/** */
function listenFigure() {
    const content = document.querySelector(".album");
    const figures = document.querySelectorAll(".album .photo_video_album");
    const likes = document.querySelector(".total_likes").childNodes[0];
    const figContainer = document.querySelectorAll(".figure-container figure");
    let totalLikes = 0;
    // let albumListener;

    /* function getListener() {
        albumListener = keyCodeListener(figures, content);
        return albumListener;
    }*/
    // getListener();

    /**
     * @param {*} nbL
     */
    function totalLikesUpdate(nbL) {
        totalLikes += nbL;
        likes.textContent = totalLikes;
    }

    /**
     * @param {*} id
     */
    function addActiveClass(id) {
        figContainer.forEach((figure) => {
            if (figure.classList.contains(id)) {
                figure.classList.add("active");
            }
        });
    }

    /**
     * @param {*} event
     */
    function likePic(event) {
        const activeElem = document.activeElement;
        if (event.keyCode === 76) {
            console.log("likes this pic");
            activeElem.children[1].children[1].click();
        }
        if (event.keyCode === 13) {
            console.log("enter the ligthBox");
            addActiveClass(activeElem.classList[1]);
            // activeElem.click();
            closeupViewFactory();
        }
    }

    figures.forEach((mediaElem) => {
        const media = mediaElem.childNodes[0];
        // const likesContent = mediaElem.childNodes[1].childNodes[1];
        const contentLikes = mediaElem.childNodes[1].childNodes[1];
        let nbLikes = Number(contentLikes.childNodes[0].textContent);

        content.addEventListener("keydown", likePic);
        // content.removeEventListener('keydown', likePic);

        media.addEventListener("click", function () {
            if (mediaElem.classList.length === 2) {
                const id = mediaElem.classList[1];
                addActiveClass(id);
            }
            // albumListener.removeListener();
            closeupViewFactory();
        });

        contentLikes.addEventListener("click", function () {
            if (contentLikes.className === "likes-content") {
                nbLikes++;
                contentLikes.childNodes[0].textContent = nbLikes;
                totalLikesUpdate(1);
                contentLikes.classList.remove("likes-content");
            }
        });

        totalLikesUpdate(nbLikes);
    });

    // return {getListener}
}

// open listen & close lightBox
let lightBoxListener;

/**
 * écoute des évènements pour la lightbox
 */
function listenCloseupViewNavigation() { // eslint-disable-line
    // const lightBox = document.querySelector('.lightBox');
    const figureContainer = document.querySelector(".figure-container");
    const figures = document.querySelectorAll(".figure-container figure");

    if (figureContainer) {
        lightBoxListener = keyCodeListener(figures, figureContainer);
        figures.forEach((figure) => {
            if (figure.classList.contains("active")) {
                figure.focus();
            }
        });
    }
}

/** */
function closeLightBox() { // eslint-disable-line
    const lightBox = document.querySelector(".lightBox");
    const album = document.querySelector(".album");
    const figuresActive = document.querySelectorAll(".figure-container figure");
    figuresActive.forEach((figureActive) => {
        if (figureActive.classList.contains("active")) {
            figureActive.classList.remove("active");
        }
    });

    lightBox.classList.add("dsp-none");
    lightBox.classList.remove("dsp-flex");
    album.classList.remove("dsp-none");
    album.classList.add("dsp-flex");
    lightBoxListener.removeListener();
    initVideo();
    listenFigure(); // .getListener();
}

//* ************************* */ initialisation du select custom
/**
 * init custom select behavior
 * @return {csb}
 */
function initCSB() {
    const csb = customSelectBehavior();
    return csb;
}

/**
 * initialisation du btn custom <select>
 */
function initCustomSelect() {
    const select = document.querySelector("#trie");
    const trieAlbum = document.querySelector(".trie_album");
    const customBuild = customSelectFactory(select);
    const customSelect = customBuild.buildCustomSelect();

    if (customSelect) {
        trieAlbum.appendChild(customSelect);
    }

    trieAlbum.addEventListener("mouseover", function () {
        initCSB().launchCSB();
    });
}

/**
 * récupérer les valeurs du btn select
 * @return {funccion}
 */
function getSelectedValue() {
    const select = document.querySelector("#trie");
    const customSelectValue = document.querySelector(".select-options");
    const options = ["popularite", "date", "titre"];
    let theValue;

    select.addEventListener("change", function () {
        setValue(select.value.toLowerCase());
        reorganize();
    });

    /**
     * @param {*} customVal
     */
    function setValue(customVal = null) {
        if (customVal) {
            theValue = customVal;
        }
        select.value = theValue;
        customSelectValue.textContent = firsLetterUpperCase(theValue);
        initCSB().hideSelectedElem(customSelectValue);
    }

    /**
     * reorganiser la gallerie d'album
     */
    function reorganize() {
        const setEvent = sortAlbumFactory();
        if (theValue == options[0]) {
            setEvent.byPopularity();
        } else if (theValue == options[1]) {
            setEvent.byDate();
        } else if (theValue == options[2]) {
            setEvent.byAlphaOrder();
        }
        setEvent.reorganizeTabindex();
    }

    return { setValue, reorganize };
}
initCustomSelect();
getSelectedValue();

/**
 * initialisation de la gallerie en récupérant les données du lien http
 */
async function albumInit() {
    const get = location.search.split("=");
    const articleId = Number(get[1].split("&")[0]);
    const name = get[2].split("%")[0].split("-").join(" ");
    if (typeof articleId === "number" && isFinite(articleId)) {
        const { media, photographers } = await getPhotographers();
        photographerPage(articleId, name, media, photographers);
    }
}

albumInit();
