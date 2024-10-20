// Seleccionar todas las imágenes con la clase 'lightbox'
const lightboxLinks = document.querySelectorAll('.lightbox');
const lightboxOverlay = document.createElement('div');
lightboxOverlay.classList.add('lightbox-overlay');
document.body.appendChild(lightboxOverlay);

// Crear botones para desplazarse entre imágenes
const prevButton = document.createElement('button');
prevButton.classList.add('lightbox-prev');
prevButton.innerText = '⬅';
const nextButton = document.createElement('button');
nextButton.classList.add('lightbox-next');
nextButton.innerText = '➡';

let currentIndex = 0;
let imagesArray = [];

// Función para mostrar la imagen actual en la lightbox
function showLightboxImage(index) {
    // Obtener la imagen actual
    const imgSrc = imagesArray[index].getAttribute('href');
    const lightboxImage = document.createElement('img');
    lightboxImage.src = imgSrc;

    // Limpiar el overlay antes de mostrar la nueva imagen
    lightboxOverlay.innerHTML = ''; 
    lightboxOverlay.appendChild(lightboxImage);
    lightboxOverlay.appendChild(prevButton);
    lightboxOverlay.appendChild(nextButton);
    lightboxOverlay.classList.add('show-lightbox');
}

// Añadir event listeners a las imágenes
lightboxLinks.forEach((link, index) => {
    link.addEventListener('click', function (event) {
        event.preventDefault();
        imagesArray = Array.from(lightboxLinks); // Crear una lista con todas las imágenes de la galería
        currentIndex = index; // Actualizar el índice actual
        showLightboxImage(currentIndex); // Mostrar la imagen seleccionada
    });
});

// Función para navegar a la siguiente imagen
nextButton.addEventListener('click', function () {
    currentIndex = (currentIndex + 1) % imagesArray.length; // Mover al siguiente, volver al inicio si es el final
    showLightboxImage(currentIndex);
});

// Función para navegar a la imagen anterior
prevButton.addEventListener('click', function () {
    currentIndex = (currentIndex - 1 + imagesArray.length) % imagesArray.length; // Mover al anterior, ir al último si es el principio
    showLightboxImage(currentIndex);
});

// Cerrar la lightbox al hacer clic fuera de la imagen
lightboxOverlay.addEventListener('click', function (e) {
    if (e.target !== prevButton && e.target !== nextButton && e.target.tagName !== 'IMG') {
        lightboxOverlay.classList.remove('show-lightbox');
    }
});

// --- Manejo de navegación por teclado ---
document.addEventListener('keydown', function (event) {
    if (lightboxOverlay.classList.contains('show-lightbox')) {
        if (event.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % imagesArray.length; // Avanza a la siguiente imagen
            showLightboxImage(currentIndex);
        } else if (event.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + imagesArray.length) % imagesArray.length; // Retrocede a la imagen anterior
            showLightboxImage(currentIndex);
        } else if (event.key === 'Escape') {
            lightboxOverlay.classList.remove('show-lightbox'); // Cierra la lightbox con la tecla Escape
        }
    }
});


document.querySelectorAll('.project').forEach((project) => {
    const carouselImages = project.querySelector('.carousel-images');
    const nextButton = project.querySelector('.next');
    const prevButton = project.querySelector('.prev');

    let currentIndex = 0; // Índice de la imagen actual
    const images = carouselImages.children;
    const totalImages = images.length;

    // Clonar la primera imagen y agregarla al final
    const firstImageClone = images[0].cloneNode(true);
    carouselImages.appendChild(firstImageClone);
    
    // Actualizar el total de imágenes
    const newTotalImages = images.length + 1; // +1 por la imagen clonada

    // Función para actualizar el desplazamiento
    function updateCarousel() {
        const offset = -currentIndex * (100 / newTotalImages); // Desplazamiento en porcentaje
        carouselImages.style.transform = `translateX(${offset}%)`; // Aplicar la transformación
    }

    // Manejar el clic del botón siguiente
    nextButton.addEventListener('click', () => {
        currentIndex++;
        if (currentIndex > totalImages) {
            currentIndex = 1; // Cambia a la segunda imagen (la original)
            setTimeout(() => {
                // Resetea la posición después de un pequeño retraso
                carouselImages.style.transition = 'none'; // Desactiva la transición
                carouselImages.style.transform = 'translateX(-25%)'; // Regresa a la segunda imagen
            }, 500); // Mismo tiempo que la transición
        } else {
            carouselImages.style.transition = 'transform 0.5s ease'; // Activa la transición
        }
        updateCarousel();
    });

    // Manejar el clic del botón anterior
    prevButton.addEventListener('click', () => {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = totalImages - 1; // Va a la última imagen original
            carouselImages.style.transition = 'none'; // Desactiva la transición
            carouselImages.style.transform = `translateX(-${(totalImages - 1) * (100 / newTotalImages)}%)`; // Regresa a la última imagen
        } else {
            carouselImages.style.transition = 'transform 0.5s ease'; // Activa la transición
        }
        updateCarousel();
    });
});
