function customSelectBehavior(){
    console.log('Behavior custom Select');
    const customValue = document.querySelector('.select-options');
    const customOptions = document.querySelector('.select-items');
    const customOptionsItem = document.querySelectorAll('.list-item');
    const hide = 'select-items-hidden';
    const arrowUp = 'select-arrow-up';
    const bottomRadius = 'select-options-border-bottom';

    function resetFakeOpt(){
        customOptionsItem.forEach(fakeOpt => {
            if (fakeOpt.classList.contains(hide)) {
                fakeOpt.classList.remove(hide);
            }
        })        
    }

    function openCustomSelect() { 
        console.log('open custom');       
        customOptions.classList.remove(hide);
        customValue.classList.remove(arrowUp, bottomRadius);
    }
    
    function closeCustomSelect() {
        console.log('open custom');       
        customOptions.classList.add(hide);
        customValue.classList.add(arrowUp, bottomRadius);
    }

    //customValue.addEventListener('mouseout', closeCustomSelect());

    customValue.addEventListener('click', function() {
        customOptions.classList.contains(hide) ? openCustomSelect() : closeCustomSelect();
    })

    customOptionsItem.forEach(fakeOpt => {
        fakeOpt.addEventListener('click', function () {
            resetFakeOpt();
            customValue.textContent = firsLetterUpperCase(fakeOpt.textContent);
            fakeOpt.classList.add(hide);
        })
    })
}