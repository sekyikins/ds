class BirthdayCard {
    constructor() {
        this.init();
        this.setupEventListeners();
        this.createParticles();
        this.startAnimations();
    }

    init() {
        this.card = document.querySelector('.card');
        this.button = document.querySelector('button');
        this.title = document.querySelector('.bounce');
        this.particleContainer = document.createElement('div');
        this.particleContainer.className = 'particle-container';
        document.body.appendChild(this.particleContainer);
        
        this.colors = ['#ff4b5c', '#6ba6ff', '#ffd93d', '#6bcf7f', '#e056fd', '#ff6b6b'];
        this.emojis = ['🎉', '🎂', '🎈', '🎁', '🥳', '✨', '🌟', '💫', '🎊'];
        this.isAnimating = false;
        this.clickCount = 0;
    }

    setupEventListeners() {
        this.button.addEventListener('click', (e) => this.handleButtonClick(e));
        this.card.addEventListener('mouseenter', () => this.handleCardHover());
        this.card.addEventListener('mouseleave', () => this.handleCardLeave());
        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        
        // Add keyboard interactions
        document.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                this.triggerCelebration();
            }
        });
    }

    handleButtonClick(e) {
        e.preventDefault();
        this.clickCount++;
        this.triggerCelebration();
        
        // Change button text based on clicks
        if (this.clickCount === 1) {
            this.button.textContent = 'Again! 🎊';
        } else if (this.clickCount === 2) {
            this.button.textContent = 'More Magic! ✨';
        } else if (this.clickCount === 3) {
            this.button.textContent = 'Keep Going! 🚀';
        } else {
            this.button.textContent = 'Endless Joy! 💝';
        }
    }

    triggerCelebration() {
        if (this.isAnimating) return;
        this.isAnimating = true;

        // Create confetti burst
        this.createConfettiBurst();
        
        // Card animation sequence
        this.card.style.animation = 'none';
        setTimeout(() => {
            this.card.style.animation = 'celebration 1s ease-in-out';
        }, 10);

        // Title effects
        this.title.style.animation = 'none';
        setTimeout(() => {
            this.title.style.animation = 'titleGlow 2s ease-in-out';
        }, 100);

        // Floating emojis
        this.createFloatingEmojis();

        setTimeout(() => {
            this.isAnimating = false;
        }, 2000);
    }

    createConfettiBurst() {
        const confettiCount = 50;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.style.left = centerX + 'px';
            confetti.style.top = centerY + 'px';
            confetti.style.backgroundColor = this.colors[Math.floor(Math.random() * this.colors.length)];
            
            const angle = (Math.PI * 2 * i) / confettiCount;
            const velocity = 5 + Math.random() * 10;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity - 5;
            
            this.particleContainer.appendChild(confetti);
            this.animateConfetti(confetti, vx, vy);
        }
    }

    animateConfetti(confetti, vx, vy) {
        let x = 0;
        let y = 0;
        let opacity = 1;
        let rotation = 0;
        const gravity = 0.3;
        const friction = 0.98;

        const animate = () => {
            x += vx;
            y += vy;
            vy += gravity;
            vx *= friction;
            rotation += 10;
            opacity -= 0.02;

            confetti.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
            confetti.style.opacity = opacity;

            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                confetti.remove();
            }
        };

        requestAnimationFrame(animate);
    }

    createFloatingEmojis() {
        const emojiCount = 15;
        
        for (let i = 0; i < emojiCount; i++) {
            setTimeout(() => {
                const emoji = document.createElement('div');
                emoji.className = 'floating-emoji';
                emoji.textContent = this.emojis[Math.floor(Math.random() * this.emojis.length)];
                emoji.style.left = Math.random() * window.innerWidth + 'px';
                emoji.style.animationDuration = (3 + Math.random() * 4) + 's';
                emoji.style.fontSize = (20 + Math.random() * 20) + 'px';
                
                this.particleContainer.appendChild(emoji);
                
                setTimeout(() => emoji.remove(), 7000);
            }, i * 100);
        }
    }

    createParticles() {
        // Create ambient particles
        setInterval(() => {
            if (Math.random() > 0.7) {
                const particle = document.createElement('div');
                particle.className = 'ambient-particle';
                particle.style.left = Math.random() * window.innerWidth + 'px';
                particle.style.animationDuration = (10 + Math.random() * 10) + 's';
                
                this.particleContainer.appendChild(particle);
                
                setTimeout(() => particle.remove(), 20000);
            }
        }, 2000);
    }

    handleCardHover() {
        this.card.style.transform = 'scale(1.05) rotateY(5deg)';
        this.card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
    }

    handleCardLeave() {
        this.card.style.transform = '';
        this.card.style.boxShadow = '';
    }

    handleMouseMove(e) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        // Subtle parallax effect
        this.card.style.transform = `perspective(1000px) rotateY(${(x - 0.5) * 10}deg) rotateX(${(y - 0.5) * -10}deg)`;
    }

    startAnimations() {
        // Add entrance animation
        setTimeout(() => {
            this.card.classList.add('fade-in');
        }, 100);

        // Pulsing glow effect
        setInterval(() => {
            this.title.style.textShadow = `0 0 20px ${this.colors[Math.floor(Math.random() * this.colors.length)]}`;
        }, 2000);
    }
}

// Initialize the birthday card when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BirthdayCard();
});

// Add some interactive easter eggs
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiPattern.join(',')) {
        document.body.style.animation = 'rainbow 2s linear infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});
