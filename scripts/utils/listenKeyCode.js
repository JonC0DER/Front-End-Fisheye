function keyCodeListener(arrayElems, content) {
    const KEYCODE = {
        LEFT : 37,
        RIGHT: 39,
        ENTER: 13,
        TAB: 9,
        X : 88
    }
    const removeListener = () =>{
        console.log('removeListener');
        content.removeListener('keydown', keyPress);
    }

    const closeDialog = () => {
        const cross = document.querySelector('.close_icon');
        if (cross) {
            cross.click();
            removeListener();
        }
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

    const keyPress = (event) =>{
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
            case KEYCODE.X:
                closeDialog();
        }
    }

    const enter = () => {
        const activeElem = document.activeElement;
        const closeDialog = activeElem.getAttribute('aria-label');
        let location = document.location;
        if (location.pathname == '/index.html') {
            location.href = 'photographer.html?id='+activeElem.id+'&name='+activeElem.childNodes[1].textContent;
        } else if(content.className == 'album' && location.pathname == '/photographer.html'){
            if (activeElem.classList[activeElem.classList.length -1] != 'active') {
                activeElem.className += ' active';
            }
            closeupViewFactory();
        }else if (content.className == 'lightBox' && closeDialog == 'Close dialog'){
            activeElem.click(); 
        }
        
    }
    
    const previous = () => {
        let activeElem = document.activeElement;
        let prevElm = activeElem.previousElementSibling;
        if (content.className === 'lightBox') {
            activeElem = document.querySelector('figure.active');
            if (activeElem === arrayElems[0]) {
                prevElm = arrayElems[arrayElems.length -1];       
            }
        }
        focusElem(prevElm);
    }

    const next = () => {
        let activeElem = document.activeElement;
        let nextElm = activeElem.nextElementSibling;
        if (content.className === 'lightBox') {
            activeElem = document.querySelector('figure.active');
            if(activeElem === arrayElems[arrayElems.length -1]){
                nextElm = arrayElems[0];
            }
        }
        focusElem(nextElm);
    }

    if (content.className === 'lightBox') {
        const previousElem = document.querySelector('div.previous')
            .addEventListener('click', previous);
        const nextElem = document.querySelector('div.next')
            .addEventListener('click', next);
        console.log('listen prev/next');
    }

    content.addEventListener('keydown', keyPress);

    return (removeListener);
}