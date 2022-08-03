/**
 * construction de la lightBox
 */
function closeupViewFactory() { // eslint-disable-line
    const album = document.querySelector(".album");
    album.classList.add("dsp-none");
    album.classList.remove("dsp-flex");

    const lightBox = document.querySelector(".lightBox");
    lightBox.classList.add("dsp-flex");
    lightBox.classList.remove("dsp-none");

    initVideo();
    listenCloseupViewNavigation();
}
