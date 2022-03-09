async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
    listenArticle(photographers);
};

async function listenArticle(data) {
    const articles = document.querySelectorAll('article');
    //console.log("data :: " + data);
    articles.forEach(article => {
        article.addEventListener("click", async function(){
            document.location.href = 'photographer.html?id='+article.id+'&name='+article.childNodes[1].textContent;
            //console.log("photographer id :: " + article.id);
        })
    })
};

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
};

init();