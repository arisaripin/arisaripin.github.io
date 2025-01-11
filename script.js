document.addEventListener('DOMContentLoaded', () => {
    console.log('Website is loaded and ready.');

    const starCount = 100;
    const body = document.body;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.top = `${Math.random() * window.innerHeight}px`;
        star.style.left = `${Math.random() * window.innerWidth}px`;
        star.style.animationDuration = `${2 + Math.random()}s`;
        body.appendChild(star);
    }

    body.addEventListener('click', (event) => {
        createBurst(event.clientX, event.clientY);
    });

    body.addEventListener('mousemove', (event) => {
        createTrail(event.clientX, event.clientY);
    });

    function createBurst(x, y) {
        const burstCount = 20;
        for (let i = 0; i < burstCount; i++) {
            const burst = document.createElement('div');
            burst.classList.add('burst');
            burst.style.top = `${y}px`;
            burst.style.left = `${x}px`;
            burst.style.transform = `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px)`;
            body.appendChild(burst);
            setTimeout(() => burst.remove(), 1000);
        }
    }

    function createTrail(x, y) {
        const trail = document.createElement('div');
        trail.classList.add('burst');
        trail.style.top = `${y}px`;
        trail.style.left = `${x}px`;
        body.appendChild(trail);
        setTimeout(() => trail.remove(), 500);
    }

    const canvas = document.getElementById('starfield');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = [];
    const cursorStars = [];

    function createStar(x, y, twinkling = false) {
        return {
            x: x || Math.random() * canvas.width,
            y: y || Math.random() * canvas.height,
            size: 2, // Fixed size for all stars
            twinkling: twinkling,
            opacity: Math.random()
        };
    }

    for (let i = 0; i < 100; i++) {
        stars.push(createStar(false, false, true)); // Create twinkling stars
    }

    function drawStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
            ctx.fill();
            if (star.twinkling) {
                star.opacity += (Math.random() - 0.5) * 0.02; // Slower twinkling speed
                if (star.opacity < 0) star.opacity = 0;
                if (star.opacity > 1) star.opacity = 1;
            }
            if (Math.random() < 0.01) { // Randomly disappear and reappear
                star.x = Math.random() * canvas.width;
                star.y = Math.random() * canvas.height;
                star.opacity = Math.random();
            }
        });

        cursorStars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
            ctx.fill();
            star.x += star.vx;
            star.y += star.vy;
            star.opacity -= 0.02;
            if (star.opacity <= 0) {
                cursorStars.splice(cursorStars.indexOf(star), 1);
            }
        });
    }

    function animate() {
        drawStars();
        requestAnimationFrame(animate);
    }

    canvas.addEventListener('mousemove', (e) => {
        for (let i = 0; i < 5; i++) {
            cursorStars.push({
                x: e.clientX,
                y: e.clientY,
                size: Math.random() * 2,
                opacity: 1,
                vx: (Math.random() - 0.5) * 5,
                vy: (Math.random() - 0.5) * 5
            });
        }
    });

    canvas.addEventListener('click', (e) => {
        for (let i = 0; i < 20; i++) {
            cursorStars.push({
                x: e.clientX,
                y: e.clientY,
                size: Math.random() * 2,
                opacity: 1,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10
            });
        }
    });

    // Add touch event listeners
    canvas.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        for (let i = 0; i < 5; i++) {
            cursorStars.push({
                x: touch.clientX,
                y: touch.clientY,
                size: Math.random() * 2,
                opacity: 1,
                vx: (Math.random() - 0.5) * 5,
                vy: (Math.random() - 0.5) * 5
            });
        }
    });

    canvas.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        for (let i = 0; i < 20; i++) {
            cursorStars.push({
                x: touch.clientX,
                y: touch.clientY,
                size: Math.random() * 2,
                opacity: 1,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10
            });
        }
    });

    animate();
});
