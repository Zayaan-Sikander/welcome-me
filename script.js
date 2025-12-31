// Balloon colors - soft pastel palette
const balloonColors = [
    '#FFB5BA', // soft pink
    '#B5D8FF', // soft blue
    '#D4B5FF', // soft purple
    '#FFE5B5', // soft peach
    '#B5FFD9', // soft mint
    '#FFB5E8', // soft magenta
    '#B5F0FF', // soft cyan
    '#E8D5B5', // soft gold
];

// Create balloons continuously
function createBalloon() {
    const container = document.getElementById('balloons-container');
    const balloon = document.createElement('div');
    balloon.className = 'balloon';

    // Random properties
    const color = balloonColors[Math.floor(Math.random() * balloonColors.length)];
    const left = Math.random() * 100;
    const size = 0.6 + Math.random() * 0.6;
    const duration = 8 + Math.random() * 6;
    const delay = Math.random() * 2;
    const swayAmount = 20 + Math.random() * 30;

    balloon.style.cssText = `
        left: ${left}%;
        background: radial-gradient(circle at 30% 30%, ${lightenColor(color, 30)}, ${color});
        transform: scale(${size});
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
    `;

    // Add sway animation
    balloon.style.setProperty('--sway', `${swayAmount}px`);

    container.appendChild(balloon);

    // Remove balloon after animation
    setTimeout(() => {
        balloon.remove();
    }, (duration + delay) * 1000);
}

// Lighten color helper
function lightenColor(color, percent) {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, (num >> 16) + amt);
    const G = Math.min(255, ((num >> 8) & 0x00FF) + amt);
    const B = Math.min(255, (num & 0x0000FF) + amt);
    return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
}

// Start balloon generation
function startBalloons() {
    // Initial burst of balloons
    for (let i = 0; i < 8; i++) {
        setTimeout(createBalloon, i * 300);
    }

    // Continuous balloon generation
    setInterval(createBalloon, 1500);
}

// Create sparkles
function createSparkle() {
    const container = document.getElementById('sparkles-container');
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';

    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const size = 4 + Math.random() * 8;
    const duration = 1.5 + Math.random() * 1.5;
    const delay = Math.random() * 2;

    sparkle.style.cssText = `
        left: ${left}%;
        top: ${top}%;
        width: ${size}px;
        height: ${size}px;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
    `;

    container.appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
    }, (duration + delay) * 1000 + 100);
}

// Start sparkle generation
function startSparkles() {
    for (let i = 0; i < 15; i++) {
        setTimeout(createSparkle, i * 200);
    }
    setInterval(createSparkle, 400);
}

// Balloon shower on click
function createBalloonShower(x, y) {
    const container = document.getElementById('confetti-container');

    for (let i = 0; i < 15; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'click-balloon';

        const color = balloonColors[Math.floor(Math.random() * balloonColors.length)];
        const size = 30 + Math.random() * 25;
        const spreadX = (Math.random() - 0.5) * 300;
        const delay = Math.random() * 0.3;
        const duration = 1.5 + Math.random() * 1;
        const wobble = (Math.random() - 0.5) * 30;

        balloon.style.cssText = `
            left: ${x}px;
            top: ${y}px;
            width: ${size * 0.75}px;
            height: ${size}px;
            background: radial-gradient(circle at 30% 30%, ${lightenColor(color, 40)}, ${color});
            border-radius: 50% 50% 50% 50%;
            --spread-x: ${spreadX}px;
            --wobble: ${wobble}deg;
            animation: balloonBurst ${duration}s ease-out ${delay}s forwards;
            opacity: 0;
        `;

        // Add balloon string
        const string = document.createElement('div');
        string.style.cssText = `
            position: absolute;
            bottom: -20px;
            left: 50%;
            width: 1px;
            height: 20px;
            background: rgba(150, 150, 150, 0.5);
            transform: translateX(-50%);
        `;
        balloon.appendChild(string);

        container.appendChild(balloon);

        setTimeout(() => {
            balloon.remove();
        }, (duration + delay) * 1000 + 100);
    }
}

// Click/touch event for balloon shower
function handleInteraction(e) {
    let x, y;

    if (e.type === 'touchstart') {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
    } else {
        x = e.clientX;
        y = e.clientY;
    }

    createBalloonShower(x, y);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    startBalloons();
    startSparkles();

    // Add click/touch listeners
    document.addEventListener('click', handleInteraction);
    document.addEventListener('touchstart', handleInteraction, { passive: true });
});

// Prevent double-tap zoom on mobile while allowing confetti
document.addEventListener('touchend', (e) => {
    e.preventDefault();
}, { passive: false });
