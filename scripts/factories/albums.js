/**
 * construction de la galerie de média
 * @param {*} data
 * @param {*} name
 * @param {*} identifiant
 * @return {*} method getUserAlbumDOM
 */
function albumFactory(data, name, identifiant) { // eslint-disable-line
    // { id, photographerId, title, image, video, likes, date, price }
    const { id, photographerId, title, image, video, likes, date } = data;
    const path = `assets/albums/${name}`;

    /**
     *
     * @return {figure}
     */
    function getUserAlbumDOM() {
        if (photographerId == identifiant) {
            const figure = document.createElement("figure");
            figure.className = `photo_video_album ${id}`;
            figure.setAttribute("data-date", date);
            if (video == undefined) {
                const altText = `${image.split(".")[0].split("_").join(" ")}`;
                const img = document.createElement("img");
                img.setAttribute("src", `${path}/${image}`);
                img.setAttribute("alt", `${altText}`);
                img.setAttribute("aria-label", `closeup view`);
                figure.appendChild(img);
            } else {
                const videoTag = document.createElement("video");
                const titleText = `${video.split(".")[0].split("_").join(" ")}`;
                videoTag.setAttribute("src", `${path}/${video}`);
                videoTag.setAttribute("title", titleText);
                videoTag.setAttribute("aria-label", `closeup view`);
                figure.appendChild(videoTag);
            }
            const figcaption = document.createElement("figcaption");
            const h3 = document.createElement("h3");
            h3.className = "title";
            h3.textContent = title;
            const p = document.createElement("p");
            p.className = "likes-content";
            p.setAttribute("accesskey", "l");
            const span = document.createElement("span");
            span.className = "likes";
            span.textContent = likes;
            const i = document.createElement("span");
            i.className = "fas fa-heart";
            i.setAttribute("aria-label", "likes");
            p.appendChild(span);
            p.appendChild(i);
            figcaption.appendChild(h3);
            figcaption.appendChild(p);
            figure.appendChild(figcaption);
            return figure;
        }
    }
    return { getUserAlbumDOM };
}
