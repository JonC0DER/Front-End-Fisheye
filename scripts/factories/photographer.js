/**
 * @param {*} data
 * @param {*} [identifiant=null]
 * @return {*}
 */
function photographerFactory(data, identifiant = null) { // eslint-disable-line
    const { name, id, city, country, tagline, price, portrait } = data;
    let picture = `assets/photographers/${portrait}`;
    if (portrait != "account.png") {
        picture = `assets/photographers/Photographers_ID_Photos/${portrait}`;
    }

    /**
     * création de carte photographe
     * @return {article}
     **/
    function getUserCardDOM() {
        const article = document.createElement("article");
        article.id = id;
        article.name = name;
        const img = document.createElement("img");
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);
        img.className = "photographer_avatar";
        const h2 = document.createElement("h2");
        h2.className = "photographer_name";
        h2.textContent = name;
        const h4 = document.createElement("h4");
        h4.className = "location";
        h4.textContent = city + ", " + country;
        const p = document.createElement("p");
        p.className = "tagline";
        p.textContent = tagline;
        const h5 = document.createElement("h5");
        h5.className = "price";
        h5.textContent = price + "€/jour";
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(h4);
        article.appendChild(p);
        article.appendChild(h5);
        if (identifiant != null && identifiant == id) {
            const infos = document.createElement("div");
            infos.className = "photographer-infos";
            const h3 = document.createElement("h3");
            h3.className = "price";
            h3.textContent = price + "€/jour";
            infos.appendChild(h2);
            infos.appendChild(h4);
            infos.appendChild(p);
            return [infos, img, h3];
        } else {
            return article;
        }
    }
    return { getUserCardDOM };
}
