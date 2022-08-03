/**
 * @return {function}
 */
function sortAlbumFactory() { // eslint-disable-line
    const album = document.querySelector(".album");
    const figures = document.querySelectorAll(".album .photo_video_album");

    /** */
    function reorganizeTabindex() {
        let index = 5;
        figures.forEach((figure) => {
            figure.tabIndex = index;
            index++;
        });
    }

    /**
     *
     * @param {*} elem
     * @param {*} typeInit
     * @return {*}
     */
    function arrayBuilder(elem = null, typeInit = null) {
        let totest;
        if (elem != null) {
            totest = elem;
        } else if (typeInit != null) {
            totest = typeInit;
        }

        const numberElem = typeof totest === "number" && isFinite(totest);
        const dateElem = totest instanceof Date && !isNaN(totest);
        const regex = /^[A-Za-z]+$/;
        const strElem = regex.test(totest);
        const arrayType = [numberElem, dateElem, strElem];

        const arrayToReturn = [];
        for (let i = 0; i < arrayType.length; i++) {
            if (arrayType[i] == true) {
                figures.forEach((figure) => {
                    if (i === 0) {
                        arrayToReturn.push(
                            Number(figure.children[1].children[1].textContent)
                        );
                    } else if (i === 1) {
                        arrayToReturn.push(new Date(figure.dataset["date"]));
                    } else if (i === 2) {
                        arrayToReturn.push(
                            figure.children[1].children[0].textContent.split(
                                " "
                            )[0]
                        );
                    }
                });
            }
        }
        return arrayToReturn;
    }

    /**
     * @param {Array} inputArray
     * @return {Array}
     */
    function figuresArrayBuilder(inputArray) {
        const figuresArray = [];
        for (let i = 0; i < inputArray.length; i++) {
            const elemType = arrayBuilder(null, inputArray[i]);
            figures.forEach((figure, index) => {
                if (elemType[index] === inputArray[i]) {
                    // figure.setAttribute('tabindex', i);
                    figuresArray.push(figure);
                }
            });
        }
        return figuresArray;
    }

    /** */
    function removeAlbumChildren() {
        while (album.hasChildNodes()) {
            album.removeChild(album.firstChild);
        }
    }

    /**
     * @param {arrayType} newArray
     */
    function rebuildAlbum(newArray) {
        newArray.forEach((newFigure) => {
            album.appendChild(newFigure);
        });
    }

    /** */
    function byPopularity() {
        /**
         *
         * @param {*} x
         * @param {*} y
         * @return {*}
         */
        function compare(x, y) {
            return y - x;
        }

        const likesOrder = arrayBuilder(10);
        const figuresArray = figuresArrayBuilder(likesOrder.sort(compare));

        removeAlbumChildren();
        rebuildAlbum(figuresArray);
    }

    /** */
    function byDate() {
        /**
         * @param {date} date1
         * @param {date} date2
         * @return {number}
         */
        function sortDates(date1, date2) {
            if (date1 > date2) return 1;
            if (date1 < date2) return -1;
            return 0;
        }

        const datesOrder = arrayBuilder(new Date());
        const sortDatesOrder = datesOrder.sort(sortDates);
        const figuresArray = [];
        for (let i = 0; i < sortDatesOrder.length; i++) {
            figures.forEach((figure) => {
                const compareDate = new Date(figure.dataset["date"]);
                const validate1 =
                    sortDatesOrder[i] instanceof Date &&
                    !isNaN(sortDatesOrder[i]);
                const validate2 =
                    compareDate instanceof Date && !isNaN(compareDate);
                if (validate1 && validate2) {
                    const day =
                        sortDatesOrder[i].getDate() === compareDate.getDate();
                    const month =
                        sortDatesOrder[i].getMonth() === compareDate.getMonth();
                    const year =
                        sortDatesOrder[i].getYear() === compareDate.getYear();
                    if (day && month && year) {
                        // figure.setAttribute('tabindex', i);
                        figuresArray.push(figure);
                    }
                }
            });
        }

        removeAlbumChildren();
        rebuildAlbum(figuresArray);
    }

    /** */
    function byAlphaOrder() {
        const alphaOrder = arrayBuilder("str");
        const figuresArray = figuresArrayBuilder(alphaOrder.sort());

        removeAlbumChildren();
        rebuildAlbum(figuresArray);
    }
    return { byPopularity, byDate, byAlphaOrder, reorganizeTabindex };
}
