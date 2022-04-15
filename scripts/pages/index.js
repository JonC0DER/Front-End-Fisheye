async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    let index = 0;

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        userCardDOM.setAttribute('tabindex', index ++);
        photographersSection.appendChild(userCardDOM);
    });
    listenArticle();
};

function listenArticle() {
    const content = document.querySelector('.photographer_section');
    const articles = document.querySelectorAll('article');
     
    if(content){
        console.log('keyListen');
        keyCodeListener(articles, content);
    }

    articles.forEach(article => {
        article.addEventListener("click", function(){
            document.location.href = 'photographer.html?id='+article.id+'&name='+article.childNodes[1].textContent;
        })
    })
};

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
};

init();