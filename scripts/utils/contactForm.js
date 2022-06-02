const contactBtn = document.querySelector('button.contact_button');
const modal = document.getElementById("contact_modal");
const form = document.forms[0];
const formContainer = modal.children[0];
let contactListener = null;
let exitContactForm = null;

function exitFrom(event) {
    const exit = formContainer.children[0].children[1];
    console.log(event.keyCode)
    if (event.keyCode === 27) {   
        exit.click();
    }
}

function displayModal() {
    const formContainer = modal.children[0];
    modal.firstElementChild.setAttribute('aria-labelledby', 'contact_photographer');
	modal.style.display = "flex";
    //contactListener = keyCodeListener(form['elements'], formContainer);
    exitContactForm = formContainer.addEventListener('keydown', exitFrom);
    tabindexDisable();
}

function closeModal() {
    modal.style.display = "none";
    if (contactListener !== null) {
        const contactArray = contactListener.getContentArray();
        console.log(contactArray[0]);
        console.log(contactArray[1]);
        contactListener.removeListener();
        contactListener = null;   
    }
    tabindexEnable();
    contactBtn.focus();
}

form['elements'][4].addEventListener('click', function (event) {
    const formArray = Array.from(form['elements']);
    formArray.forEach(input => {
        if ((input.tagName == 'INPUT' || input.tagName == 'TEXTAREA') && input.value !== '') {
            if (input.type !== 'submit') {   
                console.log(`${input.previousElementSibling.textContent} : ${input.value}`);
            }
        }
    });
    event.preventDefault();
}, false);

const logoTabindex = document.querySelector('header a');
const contactTabindex = document.querySelector('.contact_btn_photographer button.contact_button');
const selectTabindex = document.querySelector('select#trie');
const albumTabindex = document.querySelector('div.album');
const tabindexArray = [logoTabindex, contactTabindex, selectTabindex];

function tabindexDisable() {
    tabindexArray.forEach(index => {
        index.attributes.tabindex.value = "-1";
    })
    albumTabindex.style.display = "none";
}

function tabindexEnable() {
    let tab = 2;
    tabindexArray.forEach(index => {
        index.attributes.tabindex.value = tab;
        tab ++;
    })
    albumTabindex.style.display = "flex";
}