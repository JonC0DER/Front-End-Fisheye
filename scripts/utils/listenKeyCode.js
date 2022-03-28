function keyCodeListener(arrayElems, content) {
    const arr = Array.from(arrayElems);
    const one = 1;
    const KEYCODE = {
        LEFT : 37,
        RIGHT: 39,
        ENTER: 13,
        TAB: 9,
        X : 88
    }

    if (content.className === 'lightBox') {
        const previousElem = document.querySelector('div.previous')
            .addEventListener('click', previous);
        const nextElem = document.querySelector('div.next')
            .addEventListener('click', next);
        console.log('listen prev/next');
    }

    content.addEventListener('keydown', keyPress);

    const removeListener = () =>{
        console.log('removeListener');
        content.removeListener('keydown', keyPress);
    }

    const closeDialog = () => {
        const cross = document.querySelectorAll('.close_icon');
        cross.forEach(dialog => {
            if (dialog) {
                dialog.click()
                removeListener();
            }
        }); 
    }

    const initFigure = () => {
        let figure = document.querySelector('.active');
        if (figure) {
            figure.classList.remove('active');
            return (figure);
        }
    }

    const focusElem = (elemToFocus) => {
        if (elemToFocus) {
            initFigure();
            elemToFocus.classList.add('active');
            //if (content.className !== 'lightBox') {
                elemToFocus.focus();
            //}
        }
    }

    function keyPress (event){
        event.preventDefault();
        switch (event.keyCode) {
            case KEYCODE.ENTER:
                enter();
                break;
            case KEYCODE.LEFT:
                previous();
                break;
            case KEYCODE.RIGHT || KEYCODE.TAB:
                next();
                break;
            case KEYCODE.TAB:
                focusElem(document.activeElement);
                break;
            case KEYCODE.X:
                closeDialog();
        }
    }

    function enter () {
        const activeElem = document.activeElement;
        //const closeDial = document.querySelector('.close_icon');
        let location = document.location;
        if (location.pathname === '/' || location.pathname === '/index.html') {
            location.href = 'photographer.html?id='+activeElem.id+'&name='+activeElem.childNodes[1].textContent;
        } else if(content.className === 'album' && location.pathname === '/photographer.html'){
            if (activeElem.classList[activeElem.classList.length -1] !== 'active') {
                activeElem.className += ' active';
            }
            closeupViewFactory();
        }/*else if (closeDial){
            closeDialog(); 
        }*/
        
    }

    function activeElement (){
        let activeElem;
        content.childNodes.forEach(elem => {
            if (elem === document.activeElement) {
                activeElem = elem;
            }else{
                activeElem = document.querySelector('figure.active');
            }
        })
        return (activeElem);
    }

    function previous () {
        const activeElem = activeElement();
        if (activeElem && (activeElem.localName === 'figure' || activeElem.localName === 'article')) {
            let prevElm = arrayElems[arr.indexOf(activeElem) - one];
            console.log(`one = ${one}`);
            console.log(arr.indexOf(activeElem));
            if (activeElem === arrayElems[0]) {
                prevElm = arrayElems[arrayElems.length - one];       
            }
            focusElem(prevElm);
        }
    }

    function next () {
        const activeElem = activeElement();
        if (activeElem && (activeElem.localName === 'figure' || activeElem.localName === 'article')) {
            let nextElm = arrayElems[arr.indexOf(activeElem) + one];
            console.log(`one = ${one}`);
            console.log(arr.indexOf(activeElem));
            if(activeElem === arrayElems[arrayElems.length - one]){
                nextElm = arrayElems[0];
            }
            focusElem(nextElm);
        }
    }

    return (removeListener);
}