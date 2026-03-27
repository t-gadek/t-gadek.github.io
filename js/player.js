(function () {
    'use strict';

    const params = new URLSearchParams(window.location.search);
    const videoFile = params.get('v');
    const audioFile = params.get('a');
    const imageFile = params.get('i');

    const container = document.getElementById('media-content');
    const title = document.getElementById('player-title');

    // Determine which media type was requested
    let mediaType = null;
    let fileName = null;

    if (videoFile) {
        mediaType = 'video';
        fileName = videoFile;
    } else if (audioFile) {
        mediaType = 'audio';
        fileName = audioFile;
    } else if (imageFile) {
        mediaType = 'image';
        fileName = imageFile;
    }

    // --- No parameter provided ---
    if (!mediaType) {
        title.textContent = 'Media Player';
        document.title = 'Media Player | Tomasz Gądek';
        container.innerHTML = `
            <div class="state-message">
                <div class="state-icon empty">🚫</div>
                <h2>Brak medium do wyświetlenia</h2>
                <p>Nie podano żadnego medium w adresie URL.</p>
            </div>
        `;
        return;
    }

    // --- Build file path ---
    const filePath = 'public/' + fileName;

    // --- Render based on media type ---
    if (mediaType === 'video') {
        renderVideo(filePath, fileName);
    } else if (mediaType === 'audio') {
        renderAudio(filePath, fileName);
    } else if (mediaType === 'image') {
        renderImage(filePath, fileName);
    }

    // =============================================
    // RENDER FUNCTIONS
    // =============================================

    function renderVideo(src, name) {
        title.textContent = '▶ Wideo';
        document.title = name + ' — Wideo | Tomasz Gądek';

        container.innerHTML = `
            <div class="media-frame" id="video-frame">
                <video id="media-video" controls preload="metadata" poster="img/poster/poster.svg">
                    <source src="${escapeHtml(src)}">
                    Twoja przeglądarka nie obsługuje odtwarzania wideo.
                </video>
            </div>
        `;

        const video = document.getElementById('media-video');
        video.addEventListener('error', function () {
            showError(name, 'wideo');
        });
    }

    function renderAudio(src, name) {
        title.textContent = '🎵 Audio';
        document.title = name + ' — Audio | Tomasz Gądek';

        container.innerHTML = `
            <div class="audio-visualizer">
                <div class="audio-icon" id="audio-icon-pulse">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" stroke="none">
                        <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z"/>
                    </svg>
                </div>
                <div class="audio-bars" id="audio-bars">
                    <div class="bar"></div>
                    <div class="bar"></div>
                    <div class="bar"></div>
                    <div class="bar"></div>
                    <div class="bar"></div>
                    <div class="bar"></div>
                    <div class="bar"></div>
                    <div class="bar"></div>
                </div>
            </div>
            <div class="audio-player-controls">
                <audio id="media-audio" controls preload="metadata">
                    <source src="${escapeHtml(src)}">
                    Twoja przeglądarka nie obsługuje odtwarzania audio.
                </audio>
            </div>
        `;

        const audio = document.getElementById('media-audio');
        const bars = document.getElementById('audio-bars');
        const iconPulse = document.getElementById('audio-icon-pulse');

        audio.addEventListener('play', function () {
            bars.classList.add('active');
            iconPulse.classList.add('playing');
        });
        audio.addEventListener('pause', function () {
            bars.classList.remove('active');
            iconPulse.classList.remove('playing');
        });
        audio.addEventListener('ended', function () {
            bars.classList.remove('active');
            iconPulse.classList.remove('playing');
        });
        audio.addEventListener('error', function () {
            showError(name, 'audio');
        });
    }

    function renderImage(src, name) {
        title.textContent = '🖼 Obraz';
        document.title = name + ' — Obraz | Tomasz Gądek';

        container.innerHTML = `
            <div class="media-frame" id="image-frame">
                <img id="media-image" src="${escapeHtml(src)}" alt="${escapeHtml(name)}" />
            </div>
        `;

        const img = document.getElementById('media-image');

        // Click to zoom (fullscreen overlay)
        img.addEventListener('click', function () {
            const overlay = document.createElement('div');
            overlay.className = 'image-overlay';
            overlay.innerHTML = `<img src="${escapeHtml(src)}" alt="${escapeHtml(name)}" />`;
            overlay.addEventListener('click', function () {
                overlay.style.animation = 'overlayIn 0.2s ease reverse forwards';
                setTimeout(function () { overlay.remove(); }, 200);
            });
            document.body.appendChild(overlay);
        });

        img.addEventListener('error', function () {
            showError(name, 'obraz');
        });
    }

    // =============================================
    // ERROR HANDLER
    // =============================================
    function showError(name, type) {
        container.innerHTML = `
            <div class="state-message">
                <div class="state-icon error">⚠️</div>
                <h2>Nie znaleziono pliku</h2>
                <p>Plik <strong>${escapeHtml(name)}</strong> (${escapeHtml(type)}) nie został odnaleziony.</p>
            </div>
        `;
    }

    // =============================================
    // UTILITY
    // =============================================
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.appendChild(document.createTextNode(text));
        return div.innerHTML;
    }

})();
