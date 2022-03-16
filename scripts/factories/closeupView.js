function closeupViewFactory() {
    const album = document.querySelector('.album');
    if (album !== null) {
        const cross = document.createElement('span');
        //cross.className = 'fas fa-times';
        cross.className = 'close_icon';
        cross.setAttribute('onclick', 'closeLightBox()');
        cross.setAttribute('role', 'button');
        cross.setAttribute('tabindex', 0);
        cross.setAttribute('aria-label', 'Close dialog');
        const previous = document.createElement('div');
        previous.setAttribute('aria-label', 'previous image');
        previous.setAttribute('role', 'link');
        previous.className = "previous";
        const next = document.createElement('div');
        next.setAttribute('aria-label', 'next image');
        next.setAttribute('role', 'link');
        next.className = "next";
        album.appendChild(cross);
        album.insertBefore(previous, album.childNodes[0]);
        album.appendChild(next);
        album.className = "lightBox";
        album.setAttribute('aria-label', 'image closeup view');
        album.setAttribute('role', 'dialog');

        initVideo();
        listenCloseupViewNavigation();
    }
}