/**
 * création des cartes photographe
 * un seul parametre
 * @param {Object} photographers
 * @return {card}
 * */
async function displayData(photographers) {
    const photographersSection = document.querySelector(
        ".photographer_section"
    );
    let index = 1;

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        userCardDOM.setAttribute("tabindex", index++);
        photographersSection.appendChild(userCardDOM);
    });
    listenArticle();
}

/** initialisation des events */
function listenArticle() {
    const content = document.querySelector(".photographer_section");
    const articles = document.querySelectorAll("article");

    if (content) {
        console.log("keyListen");
        // keyCodeListener(articles, content);
    }

    /** press enter event
     * @param {*} event
     */
    function gotoGallery(event) {
        console.log(`press enter keycode = ${event.keyCode}`);
        const activeElem = document.activeElement;
        if (event.keyCode === 13) {
            location.href =
                "photographer.html?id=" +
                activeElem.id +
                "&name=" +
                activeElem.childNodes[1].textContent;
        }
    }

    /** event keydown article */
    content.addEventListener("keydown", gotoGallery);

    /** pour chaque article on initialise un event click */
    articles.forEach((article) => {
        article.addEventListener("click", function () {
            document.location.href =
                "photographer.html?id=" +
                article.id +
                "&name=" +
                article.childNodes[1].textContent;
        });
    });
}

/** initialisation de la page des photographe*/
async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();
