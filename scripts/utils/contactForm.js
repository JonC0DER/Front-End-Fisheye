const modal = document.getElementById("contact_modal");
const form = document.forms[0];
let contactListener = null;

function displayModal() {
    const formContainer = modal.children[0];
    modal.firstElementChild.setAttribute('aria-labelledby', 'contact_photographer');
	modal.style.display = "flex";
    //contactListener = keyCodeListener(form['elements'], formContainer);

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
