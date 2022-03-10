function sortAlbumFactory(){
    const album = document.querySelector('.album');
    const figures = document.querySelectorAll('.photo_video_album');

    function arrayBuilder(type){
        const numberType = (typeof type === 'number' && isFinite(type)) ;
        const dateType = (type instanceof Date && !isNaN(type));
        const regex = /^[A-Za-z]+$/;
        const strType = regex.test(type);

        const initArray = new Array();
        figures.forEach(figure => {
            let elemType;
            if (numberType) {    
                elemType = Number(figure.children[1].children[1].textContent);
            } else if (dateType) {
                elemType = new Date(figure.dataset['date']);
            } else if(strType){
                elemType = figure.children[1].children[0].textContent.split(' ')[0];
            }
            
            initArray.push(elemType);
        })

        return (initArray);
    }

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
        let likesOrder = arrayBuilder(10);

        let sortLikes = likesOrder.sort(compare);
        let figuresArray = [];
        for(let i =0; i < sortLikes.length; i++){
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
        let datesOrder = arrayBuilder(new Date());

        function sortDates(date1, date2) {
          if (date1 > date2) return 1;
          if (date1 < date2) return -1;
          return 0;
        }

        let sortDatesOrder = datesOrder.sort(sortDates);
        let figuresArray = [];
        for(let i =0; i < sortDatesOrder.length; i++){
            figures.forEach(figure => {
                const compareDate = new Date(figure.dataset['date']);
                const validate1 = sortDatesOrder[i] instanceof Date && !isNaN(sortDatesOrder[i]);
                const validate2 = compareDate instanceof Date && !isNaN(compareDate);
                if (validate1 && validate2){
                    let day = (sortDatesOrder[i].getDate() === compareDate.getDate());
                    let month = (sortDatesOrder[i].getMonth() === compareDate.getMonth());
                    let year = (sortDatesOrder[i].getYear() === compareDate.getYear());
                    if(day && month && year) {
                        figure.setAttribute('tabindex', i);
                        figuresArray.push(figure);
                    }
                }
            })
        }
        
        removeAlbumChildren();
        rebuildAlbum(figuresArray);
    }

    function byAlphaOrder() {
        let alphaOrder = arrayBuilder('str');

        let sortAlphaOrder = alphaOrder.sort();
        let figuresArray = [];
        for (let i = 0; i < sortAlphaOrder.length; i++) {
            figures.forEach(figure => {
                const firstWord = figure.children[1].children[0].textContent.split(' ')[0];
                if (firstWord === sortAlphaOrder[i]) {
                    figure.setAttribute('tabindex', i);
                    figuresArray.push(figure);
                }
            });
        }
        
        removeAlbumChildren();
        rebuildAlbum(figuresArray);
    }
    return {byPopularity, byDate, byAlphaOrder}
}