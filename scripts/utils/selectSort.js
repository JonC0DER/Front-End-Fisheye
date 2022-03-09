function selectElemBuilder(){
    // init select Element
    const hideItems = 'select-items-hidden';
    const arrowUp = 'select-arrow-up';
    const bottomRadius = 'select-options-border-bottom';

    let div = document.querySelector('div.trie_album');
    let divInsert = document.querySelector('div.trie_fake');
    let select = div.children[1];
    let Len = select.length;
    let options = Array.from(select.children);

    let selectLike = document.createElement('div');
    selectLike.textContent = options[0].textContent;
    selectLike.setAttribute('class', 'select-options');

    let items = document.createElement('div');
    items.setAttribute('class', `select-items ${hideItems}`);

    options.forEach(option => {
        const opt = document.createElement('div');
        opt.textContent = option.textContent;
        items.appendChild(opt);
    })

    divInsert.appendChild(selectLike);
    divInsert.appendChild(items);
    items.children[0].classList.add(hideItems);
    selectLike.classList.add(arrowUp, bottomRadius);

    // EventListener
    function selectLabel(){
        selectLike.addEventListener('click', () => {
            addHide();
        });

        function addHide(){
            if(items.classList.length === 1){
                items.classList.add(hideItems);
                selectLike.classList.add(arrowUp, bottomRadius);
            }else{
                items.classList.remove(hideItems);
                selectLike.classList.remove(arrowUp, bottomRadius);
            }
        }

        return {addHide}
    }

    let itemsFake = Array.from(items.children);
    function clickFakeOption(){
        const hide = selectLabel();
        function resetOpt(){
            itemsFake.forEach(item => {
                item.classList.remove(hideItems);
            });
        }

        itemsFake.forEach(item => {
            item.addEventListener('click', function(){
                resetOpt();
                item.classList.add(hideItems);
                selectLike.textContent = item.textContent;
                changeSelectOrigin(item.textContent);
                hide.addHide();
            })
        });
    }
    clickFakeOption();

    function changeSelectOrigin(inner){
        options.forEach(optOrigin => {
            if(optOrigin.textContent == inner){
                optOrigin.selected = true;
            }
        });
    }
}
selectElemBuilder();