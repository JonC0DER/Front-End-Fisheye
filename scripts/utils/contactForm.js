function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "flex";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

function submitForm() {
    const form = document.forms[0];
    const sendBtn = form["elements"][4];
    const formArray = Array.from(form['elements']);

    sendBtn.addEventListener('click', (event)=>{
        event.preventDefault();
        formArray.forEach(input => {
            if (input.tagName == 'INPUT' || input.tagName == 'TEXTAREA') {
                console.log(`${input.previousElementSibling.textContent} : ${input.value}`);
            }
        });
    })
}