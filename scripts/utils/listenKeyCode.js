function keyCodeListener(arrayElems, content) {
    const KEYCODE = {
        LEFT : 37,
        RIGHT: 39,
        ENTER: 13,
        TAB: 9
    }

    function focusElem(elemToFocus) {
        arrayElems.forEach(elem =>{
            elem.tabIndex = -1;
        })
        elemToFocus.tabIndex = 0;
        elemToFocus.focus();
    }

    function enter() {
        const activeElem = document.activeElement;
        const closeDialog = activeElem.getAttribute('aria-label');
        let location = document.location;
        console.log('content : '+ content.className);
        console.log('activeElem : '+ activeElem);
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
    function previous() {
        const activeElem = document.activeElement;
        if (activeElem.previousElementSibling) {
            focusElem(activeElem.previousElementSibling);
        }
    }

    function next() {
        const activeElem = document.activeElement;
        if (activeElem.nextElementSibling) {
            focusElem(activeElem.nextElementSibling);
        }
    }
    //console.log("data :: " + data);
    content.addEventListener('keydown',(event)=>{
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
        }
    })   
}