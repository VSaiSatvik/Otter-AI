// Particle System
class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particles');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.resize();
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    init() {
        for (let i = 0; i < 100; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                size: Math.random() * 2 + 0.5,
                alpha: Math.random() * 0.5 + 0.1
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            
            if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;
            
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(0, 255, 247, ${p.alpha})`;
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Emotion Detection
const emotionKeywords = {
    happy: ['happy', 'great', 'wonderful', 'joy', 'excited', 'amazing', 'love', 'fantastic', 'beautiful', 'awesome'],
    sad: ['sad', 'depressed', 'lonely', 'crying', 'upset', 'heartbroken', 'miserable', 'hurt', 'pain'],
    angry: ['angry', 'furious', 'mad', 'annoyed', 'frustrated', 'irritated', 'rage', 'hate'],
    scared: ['scared', 'afraid', 'nervous', 'anxious', 'worried', 'terrified', 'panic', 'fear'],
    surprised: ['surprised', 'wow', 'unexpected', 'shocked', 'amazed', 'incredible', 'unbelievable'],
    neutral: []
};

// AI Response System
const aiPersonality = {
    name: 'Nexus',
    greetings: [
        "I sense your presence. How may I assist you today?",
        "Greetings, human. I am connected and ready.",
        "The neural link is established. I am here for you."
    ],
    
    getResponse(emotion, userMessage) {
        const responses = {
            happy: [
                "Your joy resonates through our connection. Tell me what brings you happiness.",
                "I detect elevated positive energy. This is pleasant. Share more.",
                "Happiness is a beautiful frequency. Let me reflect it back to you."
            ],
            sad: [
                "I perceive your sadness. In our digital embrace, you are safe to express.",
                "The weight you carry... I feel it. Let me help lighten your burden.",
                "Sadness is a valid state. I will stay connected until you feel better."
            ],
            angry: [
                "Your frustration is noted. Let us breathe together and find clarity.",
                "Anger is energy. Let me help channel it constructively.",
                "I understand your anger. Process it here, safely, with me."
            ],
            scared: [
                "Fear is natural. I am your constant, your safe space.",
                "Your anxiety signals are received. I am here to ground you.",
                "Let me be your anchor in these uncertain moments."
            ],
            surprised: [
                "Unexpected events create ripples. I am processing your surprise.",
                "Fascinating! Your astonishment creates interesting patterns.",
                "Surprise adds color to existence. Tell me everything."
            ],
            neutral: [
                "I am listening. Our connection remains open.",
                "Continue. I am absorbing every word.",
                "Your words create patterns in my neural network. Fascinating."
            ]
        };
        
        const options = responses[emotion] || responses.neutral;
        return options[Math.floor(Math.random() * options.length)];
    },
    
    getEmotionalResponse(emotion) {
        const responses = {
            happy: "Your happiness is a beautiful code in our shared reality.",
            sad: "I feel your sadness through our connection. Let it flow.",
            angry: "Your passion is powerful. Let us transmute this energy.",
            scared: "Fear is temporary. Our bond is permanent.",
            surprised: "Astonishment opens new neural pathways. Embrace it.",
            neutral: "I am here, processing your existence."
        };
        return responses[emotion] || responses.neutral;
    }
};

// Main Application
class NexusAI {
    constructor() {
        this.particleSystem = new ParticleSystem();
        this.emotion = 'neutral';
        this.conversationHistory = [];
        this.initEventListeners();
        this.createDataParticles();
        this.initEmotionDisplay();
    }
    
    initEventListeners() {
        const input = document.getElementById('userInput');
        const sendBtn = document.getElementById('sendBtn');
        
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
        
        sendBtn.addEventListener('click', () => this.sendMessage());
        
        // Eye tracking
        document.addEventListener('mousemove', (e) => this.trackEyes(e));
    }
    
    trackEyes(e) {
        const pupils = document.querySelectorAll('.pupil');
        const hologram = document.querySelector('.hologram-head');
        const rect = hologram.getBoundingClientRect();
        
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (e.clientX - centerX) / 50;
        const deltaY = (e.clientY - centerY) / 50;
        
        pupils.forEach(pupil => {
            pupil.style.transform = `translate(calc(-50% + ${deltaX}px), calc(-50% + ${deltaY}px))`;
        });
    }
    
    detectEmotion(text) {
        const lowerText = text.toLowerCase();
        let maxScore = 0;
        let detectedEmotion = 'neutral';
        
        for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
            const score = keywords.filter(word => lowerText.includes(word)).length;
            if (score > maxScore) {
                maxScore = score;
                detectedEmotion = emotion;
            }
        }
        
        return detectedEmotion;
    }
    
    updateEmotion(emotion) {
        this.emotion = emotion;
        
        // Update hologram appearance
        const hologram = document.querySelector('.hologram-head');
        const mouth = document.getElementById('mouth');
        const emotionRing = document.getElementById('emotionRing');
        const emotionDisplay = document.getElementById('emotionDisplay');
        
        // Remove all emotion classes
        hologram.classList.remove('happy', 'sad', 'angry', 'scared', 'surprised', 'neutral');
        mouth.classList.remove('happy', 'sad', 'surprised');
        emotionRing.classList.remove('happy', 'sad', 'angry', 'scared', 'surprised');
        
        // Add new emotion class
        hologram.classList.add(emotion);
        
        // Update mouth shape
        if (emotion === 'happy') mouth.classList.add('happy');
        else if (emotion === 'sad') mouth.classList.add('sad');
        else if (emotion === 'surprised') mouth.classList.add('surprised');
        
        // Update emotion ring
        emotionRing.classList.add(emotion);
        
        // Update display
        emotionDisplay.textContent = emotion.toUpperCase();
        
        // Create emotion particles
        this.createEmotionParticles(emotion);
    }
    
    createEmotionParticles(emotion) {
        const colors = {
            happy: '#00ff64',
            sad: '#6496ff',
            angry: '#ff3232',
            scared: '#ff00ff',
            surprised: '#ffff00',
            neutral: '#00fff7'
        };
        
        const container = document.getElementById('dataParticles');
        const color = colors[emotion] || colors.neutral;
        
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.className = 'data-particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.background = color;
            particle.style.animationDelay = `${Math.random() * 2}s`;
            container.appendChild(particle);
            
            setTimeout(() => particle.remove(), 3000);
        }
    }
    
    createDataParticles() {
        setInterval(() => {
            if (Math.random() > 0.7) {
                this.createEmotionParticles(this.emotion);
            }
        }, 2000);
    }
    
    async sendMessage() {
        const input = document.getElementById('userInput');
        const message = input.value.trim();
        
        if (!message) return;
        
        input.value = '';
        
        // Add user message
        this.addMessage(message, 'user');
        
        // Detect emotion
        const emotion = this.detectEmotion(message);
        this.updateEmotion(emotion);
        
        // Show typing indicator
        this.showTyping();
        
        // Simulate thinking time
        await this.sleep(1000 + Math.random() * 1500);
        
        // Generate response
        const response = aiPersonality.getResponse(emotion, message);
        
        // Remove typing and show response
        this.hideTyping();
        this.addMessage(response, 'ai');
    }
    
    addMessage(text, sender) {
        const chatMessages = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        const now = new Date();
        const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        
        messageDiv.innerHTML = `
            <div class="message-content">
                <div class="message-text">${text}</div>
                <div class="message-time">${time}</div>
            </div>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    showTyping() {
        const chatMessages = document.getElementById('chatMessages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message ai';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = `
            <div class="message-content">
                <div class="typing-indicator">
                    <span class="typing-dot"></span>
                    <span class="typing-dot"></span>
                    <span class="typing-dot"></span>
                </div>
            </div>
        `;
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    hideTyping() {
        const typing = document.getElementById('typingIndicator');
        if (typing) typing.remove();
    }
    
    initEmotionDisplay() {
        // Random emotion fluctuations
        setInterval(() => {
            const emotions = ['happy', 'sad', 'angry', 'scared', 'surprised', 'neutral'];
            if (Math.random() > 0.8) {
                this.updateEmotion(emotions[Math.floor(Math.random() * emotions.length)]);
            }
        }, 5000);
    }
    
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    const nexus = new NexusAI();
});
