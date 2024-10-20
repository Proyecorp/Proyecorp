// Seleccionar todas las imágenes con la clase 'lightbox'
const lightboxLinks = document.querySelectorAll('.lightbox');
const lightboxOverlay = document.createElement('div');
lightboxOverlay.classList.add('lightbox-overlay');
document.body.appendChild(lightboxOverlay);

// Crear un elemento de imagen para la lightbox
const lightboxImage = document.createElement('img');
lightboxOverlay.appendChild(lightboxImage);

// Crear botones para desplazarse entre imágenes
const prevButton = document.createElement('button');
prevButton.classList.add('lightbox-prev');
prevButton.innerText = '⬅';
const nextButton = document.createElement('button');
nextButton.classList.add('lightbox-next');
nextButton.innerText = '➡';

lightboxOverlay.appendChild(prevButton);
lightboxOverlay.appendChild(nextButton);

let currentIndex = 0;
let imagesArray = [];

// Función para mostrar la imagen actual en la lightbox
function showLightboxImage(index) {
    const imgSrc = imagesArray[index].getAttribute('href');
    lightboxImage.src = imgSrc;
    lightboxOverlay.classList.add('show-lightbox');
}

// Añadir event listeners a las imágenes
lightboxLinks.forEach((link, index) => {
    link.addEventListener('click', function (event) {
        event.preventDefault();
        imagesArray = Array.from(lightboxLinks);
        currentIndex = index;
        showLightboxImage(currentIndex);
    });
});

// Función para navegar a la siguiente imagen
nextButton.addEventListener('click', function () {
    currentIndex = (currentIndex + 1) % imagesArray.length;
    showLightboxImage(currentIndex);
});

// Función para navegar a la imagen anterior
prevButton.addEventListener('click', function () {
    currentIndex = (currentIndex - 1 + imagesArray.length) % imagesArray.length;
    showLightboxImage(currentIndex);
});

// Cerrar la lightbox al hacer clic fuera de la imagen
lightboxOverlay.addEventListener('click', function (e) {
    if (e.target !== prevButton && e.target !== nextButton) {
        lightboxOverlay.classList.remove('show-lightbox');
    }
});

// --- Manejo de navegación por teclado ---
document.addEventListener('keydown', function (event) {
    if (lightboxOverlay.classList.contains('show-lightbox')) {
        if (event.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % imagesArray.length;
            showLightboxImage(currentIndex);
        } else if (event.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + imagesArray.length) % imagesArray.length;
            showLightboxImage(currentIndex);
        } else if (event.key === 'Escape') {
            lightboxOverlay.classList.remove('show-lightbox');
        }
    }
});
