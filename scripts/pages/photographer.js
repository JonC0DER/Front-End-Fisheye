//Mettre le code JavaScript lié à la page photographer.html
function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

function initVideo() {
    const videos = document.querySelectorAll('video');
    videos.forEach(video =>{
        if (!video.getAttribute('controls')) {
            video.setAttribute('controls', 'controls');
        }else{
            video.removeAttribute('controls');
        }
    });
}

async function photographerPage(identifiant, name, medias, users){
    const albumDiv = document.querySelector(".album");
    const infosPhotographer = document.querySelector(".infos");
    const avatar = document.querySelector(".photographer-avatar");
    const price = document.querySelector('.total_likes-price');
    medias.forEach( media => {
        const mediaAlbums = albumFactory(media, name, identifiant);
        const userAlbum = mediaAlbums.getUserAlbumDOM();
        if (userAlbum != undefined) {
            albumDiv.appendChild(userAlbum);
        }
    });
    users.forEach( user => {
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

function listenFigure() {
    const figures = document.querySelectorAll('.photo_video_album');
    const likes = document.querySelector('.total_likes').childNodes[0];
    let totalLikes = 0; 

    function totalLikesUpdate(nbL) {
        totalLikes += nbL;
        likes.textContent = totalLikes;
    }

    figures.forEach(mediaElem => {
        const media = mediaElem.childNodes[0];
        const contentLikes = mediaElem.childNodes[1].childNodes[1];
        let nbLikes = Number(contentLikes.childNodes[0].textContent);

        media.addEventListener("click", function() {
            if (mediaElem.classList.length === 2) {
                mediaElem.className += " active";
            }
            closeupViewFactory();
        });
        contentLikes.addEventListener("click", function() {
            nbLikes ++;
            contentLikes.childNodes[0].textContent = nbLikes;
            totalLikesUpdate(1);
        });

        totalLikesUpdate(nbLikes);
    })
}

function listenCloseupViewNavigation() {
    const figures = document.querySelectorAll('.photo_video_album'); 
    const arrayFigures = Array.from(figures);
    const previous = document.querySelector('div.previous');
    const next = document.querySelector('div.next');

    const initFigure = () => {
        let figure = document.querySelector('.active');
        figure.classList.remove('active');
        return (figure);
    };

    const prevMedia = () => {
        let index = arrayFigures.indexOf(initFigure());
        if (!figures[index -1]){
            figures[figures.length -1].className += ' active';
        }else{
            figures[index -1].className += ' active';
        }
    };
    previous.addEventListener('click', prevMedia);
    
    const nextMedia = () => {
        let index = arrayFigures.indexOf(initFigure());
        if (!figures[index +1]){
            figures[0].className += ' active';
        }else{
            figures[index +1].className += ' active';
        }
    };
    next.addEventListener('click', nextMedia);

    const keyPress = (e) =>{
        if (e.keyCode === 37) {
            prevMedia();
        } else if (e.keyCode === 39) {
            nextMedia();
        }
    };
    document.addEventListener('keydown', keyPress);
}

function closeLightBox() {
    const lightBox = document.querySelector('.lightBox');
    const previous = document.querySelector('div.previous');
    const next = document.querySelector('div.next');
    const cross = document.querySelector('.fas.fa-times');
    const figuresActive = document.querySelectorAll('figure.photo_video_album');
    figuresActive.forEach(figureActive => {
        figureActive.className = [
            figureActive.classList[0], 
            figureActive.classList[1]
        ].join(' ');
    })
    previous.removeEventListener('click', listenCloseupViewNavigation.prevMedia);
    next.removeEventListener('click', listenCloseupViewNavigation.nextMedia);
    document.removeEventListener('keydown', listenCloseupViewNavigation.keyPress);
    lightBox.removeChild(cross);
    lightBox.removeChild(previous);
    lightBox.removeChild(next);
    lightBox.className = "album";
    initVideo();
}

async function albumInit(){
    const get = location.search.split('=');
    const articleId = Number(get[1].split('&')[0]);
    const name = get[2].split('%')[0].split('-').join(' ');
    if (typeof articleId === 'number' && isFinite(articleId)) {
        const { media, photographers } = await getPhotographers();
        photographerPage(articleId, name, media, photographers);
    }
}

albumInit();