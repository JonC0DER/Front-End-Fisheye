function sortAlbumFactory(){
    const album = document.querySelector('.album');
    const figures = document.querySelectorAll('.photo_video_album');

    function arrayBuilder(elem = null, typeInit = null) {
        let totest;
        if (elem != null) { totest = elem; }
        else if (typeInit != null) { totest = typeInit; }

        const numberElem = (typeof totest === 'number' && isFinite(totest)) ;
        const dateElem = (totest instanceof Date && !isNaN(totest));
        const regex = /^[A-Za-z]+$/;
        const strElem = regex.test(totest);
        const arrayType = [numberElem, dateElem, strElem];

        const arrayToReturn = new Array();
        for(let i = 0; i < arrayType.length; i++){
            if (arrayType[i] == true) {
                figures.forEach(figure =>{
                    if(i === 0){
                        arrayToReturn.push(Number(figure.children[1].children[1].textContent));
                    } else if(i === 1){
                        arrayToReturn.push(new Date(figure.dataset['date']));
                    } else if(i === 2){
                        arrayToReturn.push(figure.children[1].children[0].textContent.split(' ')[0]);
                    }
                })   
            }
        }
        return (arrayToReturn);
    }
   
    function figuresArrayBuilder(inputArray){
        let figuresArray = [];
        for(let i =0; i < inputArray.length; i++){
            const elemType = arrayBuilder(null, inputArray[i]);
            figures.forEach((figure, index) => {
                //console.log(`elemType : ${elemType[index]} inpurArray : ${inputArray[i]}`);
                if (elemType[index] === inputArray[i]) {
                    figure.setAttribute('tabindex', i);
                    figuresArray.push(figure);
                }
            })
        }
        return (figuresArray);
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

    function byPopularity() {
        function compare(x, y) {
            return y - x;
        }

        let likesOrder = arrayBuilder(10);
        let figuresArray = figuresArrayBuilder(likesOrder.sort(compare));

        removeAlbumChildren();
        rebuildAlbum(figuresArray);
    }

    function byDate() {
        function sortDates(date1, date2) {
          if (date1 > date2) return 1;
          if (date1 < date2) return -1;
          return 0;
        }

        let datesOrder = arrayBuilder(new Date());
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
        const alphaOrder = arrayBuilder('str');
        const figuresArray = figuresArrayBuilder(alphaOrder.sort());
        
        removeAlbumChildren();
        rebuildAlbum(figuresArray);
    }
    return {byPopularity, byDate, byAlphaOrder}
}