function keyCodeListener(arrayElems = null, content = null) {
    const arr = Array.from(arrayElems);
    const one = 1;
    const localNames = ['figure', 'article', 'input', 'textarea'];
    const KEYCODE = {
        LEFT : 37,
        RIGHT: 39,
        ENTER: 13,
        //Lkey : 76,
        ESCAPE : 27
    }

    if (content.className === 'figure-container') {
        const previousElem = document.querySelector('div.previous')
            .addEventListener('click', previous);
        const nextElem = document.querySelector('div.next')
            .addEventListener('click', next);
    }

    if (content.className === 'modal') {
        focusElem(arrayElems[0]);  
    }

    content.addEventListener('keydown', keyPress);

    function removeListener(){
        console.log('removeListener');
        content.removeEventListener('keydown', keyPress);
    }

    function closeDialog () {
        const cross = document.querySelectorAll('.close_icon');
        
        if(content.className === 'modal' || content.className === 'figure-container') {
            cross.forEach(dialog => { dialog.click() }); 
        }
    }

    function getContentArray(){
        return [content, content.classList];
    }

    function initFigure () {
        arr.forEach(elem => {
            if (elem.classList.contains('active')) {
                elem.classList.remove('active');
            }
        })
    }

    function keyPress (event){
        event.preventDefault();
        switch (event.keyCode) {
            case KEYCODE.LEFT:
                previous();
                break;
            case KEYCODE.RIGHT:
                next();
                break;
            case KEYCODE.ENTER:
                enter();
                break;
            /*case KEYCODE.Lkey:
                likeActive();
                break;*/
            case KEYCODE.ESCAPE:
                closeDialog();
            }
        }
        
    /*function likeActive() {
        const activeElem = document.activeElement;
        
        if (activeElem && (activeElem.localName === 'figure')) {
            const like = activeElem.children[1].children[1];
            console.log(like.classList);
            like.click();
        }
    }*/

    function enter () {
        const activeElem = document.activeElement;
        let location = document.location;
        
        if (location.pathname === '/' || location.pathname === '/index.html') {
            location.href = 'photographer.html?id='+activeElem.id+'&name='+activeElem.childNodes[1].textContent;
        } else if(content.classList[0] === 'album' && location.pathname === '/photographer.html'){
            const lightBoxFigContainer = document.querySelectorAll('.figure-container figure');
            lightBoxFigContainer.forEach(figure => {
                console.log(activeElem.classList[1])
                if(figure.classList.contains(activeElem.classList[1])){
                    figure.classList.add('active');
                    focusElem(figure);
                    figure.click()
                }
            })
            closeupViewFactory();
        }
    }
    
    function focusElem(elemToFocus) {
        if (elemToFocus) {
            console.log('on focus');
            initFigure();
            elemToFocus.classList.add('active');
            elemToFocus.focus({preventScroll:false});
            /*if (elemToFocus.localName === 'input' || elemToFocus.localName === 'textarea') {
                enable();
            }*/
        }
    }
    
    function activeElement (){
        const dAE = document.activeElement;
        let artFig;
        let artFigAlternative;

        if (content.classList.contains('album')) {    
            artFig = 'figure';
        }else if(content.classList.contains('figure-container')) {    
            artFig = 'figure';
            arr.forEach(elem => {
                if (elem.classList.contains('active')) {
                    focusElem(elem);
                }
            })
        }else if(content.classList.contains('modal')){
            artFig = 'input';
            artFigAlternative = 'textarea';
        }else if(content.classList.contains('photographer_section')){
            artFig = 'article';
        }

        if (dAE.localName === artFig || artFigAlternative){
            dAE.classList.add('active'); 
            return (dAE);
        }
    }
    
    function undefinedActiveElement(setElem) {
        setElem = activeElement();
        return setElem;
    }

    function previous () {
        let activeElem = activeElement();
        
        if (!activeElem) {
            activeElem = undefinedActiveElement();
        }
        console.log(activeElem)
        
        if (activeElem && localNames.includes(activeElem.localName)) {
            let prevElm = arrayElems[arr.indexOf(activeElem) - one];
        
            if(arr.indexOf(activeElem) <= 0){
                prevElm = arrayElems[arrayElems.length - one];       
            }
            focusElem(prevElm);
        }
    }

    function next () {
        let activeElem = activeElement();
        
        if (!activeElem) {
            activeElem = undefinedActiveElement();
        }
        
        if (activeElem && localNames.includes(activeElem.localName)) {
            let nextElm = arrayElems[arr.indexOf(activeElem) + one];
        
            if(arr.indexOf(activeElem) >= arrayElems.length - one){
                nextElm = arrayElems[0];
            }
            focusElem(nextElm);
        }
    }

    return {removeListener, getContentArray};
}