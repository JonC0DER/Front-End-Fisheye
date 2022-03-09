function closeupViewFactory() {
    const album = document.querySelector('.album');
    if (album !== null) {
        const cross = document.createElement('i');
        cross.className = 'fas fa-times';
        cross.setAttribute('onclick', 'closeLightBox()');
        const previous = document.createElement('div');
        previous.className = "previous";
        const next = document.createElement('div');
        next.className = "next";
        album.appendChild(cross);
        album.insertBefore(previous, album.childNodes[0]);
        album.appendChild(next);
        album.className = "lightBox";

        initVideo();
        listenCloseupViewNavigation();
    }
}