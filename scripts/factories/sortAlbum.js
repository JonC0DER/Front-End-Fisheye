function sortAlbumFactory(){
    const album = document.querySelector('.album');
    const figures = document.querySelectorAll('.photo_video_album');

    function removeAlbumChildren(){
        while (album.hasChildNodes()) {
            album.removeChild(album.firstChild);
        }
    }

    function rebuildAlbum(newArray) {
        newArray.forEach(newFigure => {
            album.appendChild(newFigure);
        })
    }

    function compare(x, y) {
        return y - x;
    }

    function byPopularity() {
        let likesOrder = [];
        figures.forEach(figure => {
            const likes = Number(figure.children[1].children[1].textContent);
            likesOrder.push(likes);
        });

        let sortLikes = likesOrder.sort(compare);
        let figuresArray = [];
        for(let i =0; i < sortLikes.length; i++){
            console.log(`likesOrder array :: ${sortLikes[i]}`);
            figures.forEach(figure => {
                const likesV2 = Number(figure.children[1].children[1].textContent);
                if (likesV2 === sortLikes[i]) {
                    figure.setAttribute('tabindex', i);
                    figuresArray.push(figure);
                }
            })
        }

        removeAlbumChildren();
        rebuildAlbum(figuresArray);
    }

    function byDate() {
        let datesOrder = [];

        figures.forEach(figure => {
            const dates = new Date(figure.dataset['date']);
            datesOrder.push(dates);
        });
        
        function sortDates(date1, date2) {
          if (date1 > date2) return 1;
          if (date1 < date2) return -1;
          return 0;
        }

        console.log(`normale : ${datesOrder}`);
        console.log(`sorted : ${datesOrder.sort(sortDates)}`);
    }

    function byAplhaOrder() {
        name
    }
    return {byPopularity, byDate}
}