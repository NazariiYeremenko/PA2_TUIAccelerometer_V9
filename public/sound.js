// Declare the audio context variable
let audioContext;

// Create the audio context based on browser support
if (typeof AudioContext !== 'undefined') {
    audioContext = new AudioContext();
} else if (typeof webkitAudioContext !== 'undefined') {
    audioContext = new webkitAudioContext();
}

// Check if the audio context is available
if (audioContext) {
    // Create a new Audio element
    const audioElement = new Audio();

    // Set the audio file source
    audioElement.src = '03. Planet Caravan.mp3'; // Favourite audio

    // Create a source object for spatial audio
    const audioSource = audioContext.createMediaElementSource(audioElement);

    // Create a high-pass filter node
    const highPassFilter = audioContext.createBiquadFilter();
    highPassFilter.type = 'highpass';
    highPassFilter.frequency.value = 1500; // Set the initial cutoff frequency

    audioSource.connect(highPassFilter);
    highPassFilter.connect(audioContext.destination);

    // Function to handle audio playback
    function playAudio() {
        audioElement.play().catch(error => {
            console.error('Error playing audio:', error);
        });
    }

    // Button for audio playback
    const playButton = document.createElement('button');
    playButton.textContent = 'Play Audio';
    playButton.addEventListener('click', playAudio);
    document.body.appendChild(playButton);

    // Position the play button in the scene
    playButton.style.position = 'absolute';
    playButton.style.top = '10px';
    playButton.style.left = '10px';
    playButton.style.zIndex = '1';

    // Create a checkbox for the sound filter
    const filterCheckbox = document.createElement('input');
    filterCheckbox.type = 'checkbox';
    filterCheckbox.id = 'filterCheckbox';
    document.body.appendChild(filterCheckbox);

    // Label for the checkbox
    const filterLabel = document.createElement('label');
    filterLabel.textContent = 'High-pass filter';
    filterLabel.htmlFor = 'filterCheckbox';
    filterLabel.style.color = 'white';
    document.body.appendChild(filterLabel);

    // Event listener for the filter checkbox
    filterCheckbox.addEventListener('change', () => {
        if (filterCheckbox.checked) {
            // Enable the high-pass filter
            highPassFilter.frequency.value = 1500; //1500 hz level, so filter cuts off lower frequency
        } else {
            // Disable the high-pass filter
            highPassFilter.frequency.value = 0;
        }
    });

    // Position the filter checkbox in the scene
    filterCheckbox.style.position = 'absolute';
    filterCheckbox.style.top = '50px'; // Adjust the top position as needed
    filterCheckbox.style.left = '10px';
    filterCheckbox.style.zIndex = '1';

    filterLabel.style.position = 'absolute';
    filterLabel.style.top = '50px'; // Adjust the top position as needed
    filterLabel.style.left = '30px';
    filterLabel.style.zIndex = '1';
} else {
    console.error('Web Audio API is not supported in this browser.');
}
