function albumFactory(data, name, identifiant) {
    const {id, photographerId, title, image, video, likes, date, price} = data;
    const path = `assets/albums/${name}`;

    function getUserAlbumDOM(){
        if (photographerId == identifiant) {
            const figure = document.createElement('figure');
            figure.className = `photo_video_album ${id}`;
            figure.setAttribute('data-date', date)
            if (video == undefined) {
                const img = document.createElement('img');
                img.setAttribute('src', `${path}/${image}`);
                img.setAttribute('alt', `${name}`);
                img.setAttribute('aria-label', `closeup view`);
                figure.appendChild(img);
            }else{
                const videoTag = document.createElement('video');
                videoTag.setAttribute('src', `${path}/${video}`);
                videoTag.setAttribute('title', `${name}`);
                videoTag.setAttribute('aria-label', `closeup view`);
                figure.appendChild(videoTag);
            }
            const figcaption = document.createElement('figcaption');
            const h3 = document.createElement('h3');
            h3.className = 'title';
            h3.textContent = title;
            const p = document.createElement('p');
            p.className = 'likes-content';
            const span = document.createElement('span');
            span.className = 'likes';
            span.textContent = likes;
            const i = document.createElement('i');
            i.className = 'fas fa-heart';
            i.setAttribute('aria-label', 'likes');
            p.appendChild(span);
            p.appendChild(i);
            figcaption.appendChild(h3);
            figcaption.appendChild(p);
            figure.appendChild(figcaption);
            return (figure);           
        }
    }
    return {getUserAlbumDOM}
}
