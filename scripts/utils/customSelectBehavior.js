function customSelectBehavior(){
    //console.log('Behavior custom Select');
    const customValue = document.querySelector('.select-options');
    const customOptions = document.querySelector('.select-items');
    const customOptionsItem = document.querySelectorAll('.list-item');
    const hide = 'select-items-hidden';
    const arrowUp = 'select-arrow-up';
    const bottomRadius = 'select-options-border-bottom';
    const setValueToAll = getSelectedValue();
    let open = false;

    function resetFakeOpt(){
        customOptionsItem.forEach(fakeOpt => {
            if (fakeOpt.classList.contains(hide)) {
                fakeOpt.classList.remove(hide);
            }
        })        
    }

    function openCustomSelect() { 
        //console.log('open custom');       
        customOptions.classList.remove(hide);
        customValue.classList.remove(arrowUp, bottomRadius);
    }
    
    function closeCustomSelect() {
        //console.log('close custom');       
        customOptions.classList.add(hide);
        customValue.classList.add(arrowUp, bottomRadius);
    }

    //customValue.addEventListener('mouseout', closeCustomSelect());

    customValue.addEventListener('click', function() {
        if(open === false){ 
            openCustomSelect();
            open = true;
        } else{
            closeCustomSelect();
            open = false;
        }
        //customOptions.classList.contains(hide) ? openCustomSelect() : closeCustomSelect();
    })

    customOptionsItem.forEach(fakeOpt => {
        fakeOpt.addEventListener('click', function () {
            resetFakeOpt();
            customValue.textContent = firsLetterUpperCase(fakeOpt.textContent);
            fakeOpt.classList.add(hide);
            console.log(`fakeopt.txt : ${fakeOpt.textContent.toLocaleLowerCase()}`)
            setValueToAll.setValue(fakeOpt.textContent);
            setValueToAll.reorganize();
        })
    })
}