document.addEventListener('DOMContentLoaded', () => {
    const galleryImages = document.querySelectorAll('#gallery a'); // Target gallery images using the section ID
    let currentIndex = 0;

    function openLightbox(imageUrl, imageTitle) {
        let lightboxOverlay = document.querySelector('.lightbox-overlay');
        if (!lightboxOverlay) {
            lightboxOverlay = document.createElement('div');
            lightboxOverlay.classList.add('lightbox-overlay');
            document.body.appendChild(lightboxOverlay);

            const lightboxImage = document.createElement('img');
            lightboxImage.classList.add('lightbox-image');
            lightboxOverlay.appendChild(lightboxImage);

            const caption = document.createElement('p');
            caption.classList.add('lightbox-caption');
            lightboxOverlay.appendChild(caption);

            const nextButton = document.createElement('button');
            nextButton.classList.add('lightbox-next');
            nextButton.textContent = '›';
            nextButton.addEventListener('click', showNextImage);
            lightboxOverlay.appendChild(nextButton);

            const backButton = document.createElement('button');
            backButton.classList.add('lightbox-back');
            backButton.textContent = '‹';
            backButton.addEventListener('click', showPreviousImage);
            lightboxOverlay.appendChild(backButton);

            const closeButton = document.createElement('span');
            closeButton.classList.add('lightbox-close');
            closeButton.innerHTML = '&times;';
            closeButton.addEventListener('click', closeLightbox);
            lightboxOverlay.appendChild(closeButton);

            lightboxOverlay.addEventListener('click', (event) => {
                if (event.target === lightboxOverlay) {
                    closeLightbox();
                }
            });
        }
        updateLightbox(imageUrl, imageTitle);
    }

    function updateLightbox(imageUrl, imageTitle) {
        const lightboxImage = document.querySelector('.lightbox-image');
        const caption = document.querySelector('.lightbox-caption');
        lightboxImage.src = imageUrl;
        lightboxImage.alt = imageTitle;
        caption.textContent = imageTitle;
    }

    function closeLightbox() {
        const lightboxOverlay = document.querySelector('.lightbox-overlay');
        if (lightboxOverlay) {
            lightboxOverlay.remove();
        }
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % galleryImages.length;
        const nextImage = galleryImages[currentIndex];
        updateLightbox(nextImage.getAttribute('href'), nextImage.getAttribute('data-title'));
    }

    function showPreviousImage() {
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        const prevImage = galleryImages[currentIndex];
        updateLightbox(prevImage.getAttribute('href'), prevImage.getAttribute('data-title'));
    }

    galleryImages.forEach((imageLink, index) => {
        imageLink.addEventListener('click', (event) => {
            event.preventDefault();
            currentIndex = index;
            const imageUrl = imageLink.getAttribute('href');
            const imageTitle = imageLink.getAttribute('data-title');
            openLightbox(imageUrl, imageTitle);
        });
    });
});
