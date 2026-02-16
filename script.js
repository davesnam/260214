// Photo data - all photos from the photos folder
const photos = [
    '334473EF-E7A8-4EA1-948D-07260F11B413.jpeg',
    '6D09617E-EAE6-451D-AE1B-54B7A4E99033_1_105_c.jpeg',
    '889464B0-2AEC-449E-8293-2AF4E5EC5F53_1_105_c.jpeg',
    '8C125125-CCC9-479C-ADF2-3C033F55022A.jpeg',
    '9C56973F-3656-4435-926F-1F902379A92C_1_105_c.jpeg',
    'E0853AD1-E5F6-4749-B48C-0C35C7C22B24_1_105_c.jpeg',
    'FB8F8FF6-E307-4D86-A167-1743DF8F0E9C_1_201_a.jpeg',
    'FCAAC382-8934-4238-B778-D5A0D3EA81C2_1_201_a.jpeg'
];

// Load photos into gallery
function loadGallery() {
    const galleryGrid = document.getElementById('galleryGrid');

    photos.forEach((photo, index) => {
        const photoItem = document.createElement('div');
        photoItem.className = 'gallery-item';
        photoItem.innerHTML = `<img src="photos/${photo}" alt="Wedding Photo ${index + 1}">`;
        photoItem.onclick = () => openLightbox(`photos/${photo}`);
        galleryGrid.appendChild(photoItem);
    });
}

// Lightbox functionality
function openLightbox(imageSrc) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox active';
    lightbox.innerHTML = `
        <button class="lightbox-close" onclick="closeLightbox(this)">&times;</button>
        <img src="${imageSrc}" alt="Wedding Photo">
    `;
    lightbox.onclick = (e) => {
        if (e.target === lightbox) {
            closeLightbox(lightbox);
        }
    };
    document.body.appendChild(lightbox);
}

function closeLightbox(element) {
    const lightbox = element.classList ? element.parentElement : element;
    lightbox.remove();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadGallery();
});
