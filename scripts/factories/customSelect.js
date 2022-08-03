/**
 * @param {*} select
 * @return {*}
 */
function customSelectFactory(select) { // eslint-disable-line
    /**
     * @return {container}
     */
    function buildCustomSelect() {
        const customContainer = document.createElement("div");
        customContainer.classList.add("trie_fake");

        const customValue = document.createElement("div");
        customValue.classList.add(
            "select-options",
            "select-arrow-up",
            "select-options-border-bottom"
        );
        customValue.textContent = firsLetterUpperCase(select.value);

        const customOptions = document.createElement("div");
        customOptions.classList.add("select-items", "select-items-hidden");

        const selectArray = Array.from(select.children);
        selectArray.forEach((options) => {
            const customOpt = document.createElement("div");
            customOpt.classList.add("list-item");
            customOpt.textContent = options.value;
            if (options.value === select.value) {
                customOpt.classList.add("select-items-hidden");
            }
            customOptions.appendChild(customOpt);
        });

        customContainer.appendChild(customValue);
        customContainer.appendChild(customOptions);

        return customContainer;
    }

    return { buildCustomSelect };
}
