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

// Guest notes functionality using localStorage
function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('weddingNotes') || '[]');
    displayNotes(notes);
}

function displayNotes(notes) {
    const notesList = document.getElementById('notesList');

    if (notes.length === 0) {
        notesList.innerHTML = '<p style="text-align: center; color: #999; padding: 40px;">No messages yet. Be the first to leave a note!</p>';
        return;
    }

    // Sort by date, newest first
    notes.sort((a, b) => new Date(b.date) - new Date(a.date));

    notesList.innerHTML = notes.map(note => `
        <div class="note-item">
            <div class="note-header">
                <span class="note-name">${escapeHtml(note.name)}</span>
                <span class="note-date">${formatDate(note.date)}</span>
            </div>
            <div class="note-message">${escapeHtml(note.message)}</div>
        </div>
    `).join('');
}

function submitNote() {
    const nameInput = document.getElementById('guestName');
    const messageInput = document.getElementById('guestMessage');

    const name = nameInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !message) {
        alert('Please fill in both your name and message!');
        return;
    }

    // Get existing notes
    const notes = JSON.parse(localStorage.getItem('weddingNotes') || '[]');

    // Add new note
    notes.push({
        name: name,
        message: message,
        date: new Date().toISOString()
    });

    // Save to localStorage
    localStorage.setItem('weddingNotes', JSON.stringify(notes));

    // Clear form
    nameInput.value = '';
    messageInput.value = '';

    // Reload notes display
    displayNotes(notes);

    // Show success message
    alert('Thank you for your lovely message! ❤️');
}

// Utility functions
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadGallery();
    loadNotes();
});

// Allow Enter key to submit in name field
document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('guestName');
    nameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            document.getElementById('guestMessage').focus();
        }
    });
});
