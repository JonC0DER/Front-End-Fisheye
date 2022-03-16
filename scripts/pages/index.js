async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    let index = 0;

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        if (index == 0) {
            userCardDOM.setAttribute('tabindex', index);
        } else {    
            userCardDOM.setAttribute('tabindex', -1);
        }
        photographersSection.appendChild(userCardDOM);
    });
    listenArticle();
};

function listenArticle() {
    const content = document.querySelector('.photographer_section');
    const articles = document.querySelectorAll('article');
     
    keyCodeListener(articles, content);

    articles.forEach(article => {
        article.addEventListener("click", function(){
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