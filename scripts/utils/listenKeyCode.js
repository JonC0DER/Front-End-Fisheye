function keyCodeListener(arrayElems, content) {
    const arr = Array.from(arrayElems);
    const one = 1;
    const KEYCODE = {
        LEFT : 37,
        RIGHT: 39,
        ENTER: 13,
        TAB: 9,
        ESCAPE : 27
    }

    if (content.className === 'lightBox') {
        const previousElem = document.querySelector('div.previous')
            .addEventListener('click', previous);
        const nextElem = document.querySelector('div.next')
            .addEventListener('click', next);
    }

    content.addEventListener('keydown', keyPress);

    function removeListener(){
        console.log('removeListener');
        content.removeListener('keydown', keyPress);
    }

    function closeDialog () {
        console.log('close dialog');
        const cross = document.querySelectorAll('.close_icon');
        cross.forEach(dialog => {
            //if (dialog) {
                dialog.click()
            //}
        }); 
    }

    function initFigure () {
        arrayElems.forEach(elem => {
            if (elem.classList.contains('active')) {
                elem.classList.remove('active');
            }
        })
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
            case KEYCODE.RIGHT:
                next();
                break;
            case KEYCODE.TAB:
                focusElem(document.activeElement);
                break;
            case KEYCODE.ESCAPE:
                closeDialog();
        }
    }

    function enter () {
        const activeElem = document.activeElement;
        let location = document.location;
        if (location.pathname === '/' || location.pathname === '/index.html') {
            location.href = 'photographer.html?id='+activeElem.id+'&name='+activeElem.childNodes[1].textContent;
        } else if(content.className === 'album' && location.pathname === '/photographer.html'){
            if (activeElem.classList[activeElem.classList.length -1] !== 'active') {
                activeElem.className += ' active';
            }
            closeupViewFactory();
        }
    }

    function focusElem(elemToFocus) {
        if (elemToFocus) {
            console.log('on focus');
            initFigure();
            elemToFocus.classList.add('active');
            //if (content.className !== 'lightBox') {
                elemToFocus.focus();
            //}
        }
    }
    
    function activeElement (){
        const dAE = document.activeElement;
        let artFig;
        if (content.classList.contains('album') || content.classList.contains('lightBox')) {    
            artFig = 'figure';
        }else if(content.classList.contains('photographer_section')){
            artFig = 'article';
        }

        console.log('contient des ' + artFig);
        if (dAE.localName === artFig){
            console.log(`activeElement ok`)
            const activeElem = dAE;
            activeElem.classList.add('active'); 
            return (activeElem);
        }
    }

    function previous () {
        const activeElem = activeElement();
        // console.log(`element id => ${activeElem.id}`);
        if (activeElem && (activeElem.localName === 'figure' || activeElem.localName === 'article')) {
            let prevElm = arrayElems[arr.indexOf(activeElem) - one];
            console.log(`activeElem => ${arr.indexOf(activeElem)} prev => ${arr.indexOf(activeElem) - one}`);
            //if (activeElem === arrayElems[0]) {
            if(arr.indexOf(activeElem) <= 0){
                prevElm = arrayElems[arrayElems.length - one];       
            }
            focusElem(prevElm);
        }
    }

    function next () {
        const activeElem = activeElement();
        // console.log(`element id => ${activeElem.id}`);
        if (activeElem && (activeElem.localName === 'figure' || activeElem.localName === 'article')) {
            let nextElm = arrayElems[arr.indexOf(activeElem) + one];
            console.log(`activeElem => ${arr.indexOf(activeElem)} next => ${arr.indexOf(activeElem) + one}`);
            //if(activeElem === arrayElems[arrayElems.length - one]){
            if(arr.indexOf(activeElem) >= arrayElems.length - one){
                nextElm = arrayElems[0];
            }
            focusElem(nextElm);
        }
    }

    return (removeListener);
}