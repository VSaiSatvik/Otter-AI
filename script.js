// Background bubbles
function createBubbles() {
    const container = document.getElementById('bubbleContainer');
    
    setInterval(() => {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        
        const size = Math.random() * 20 + 10;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.animationDuration = `${Math.random() * 8 + 5}s`;
        bubble.style.animationDelay = `${Math.random() * 2}s`;
        
        container.appendChild(bubble);
        
        // Remove after animation
        setTimeout(() => bubble.remove(), 15000);
    }, 500);
}

// Background fish
function createFish() {
    const container = document.getElementById('fishContainer');
    const fishColors = ['#ff6b6b', '#ffa07a', '#98d8c8', '#ffd700', '#ff69b4'];
    
    setInterval(() => {
        const fish = document.createElement('div');
        fish.className = 'fish';
        
        const color = fishColors[Math.floor(Math.random() * fishColors.length)];
        const topPosition = Math.random() * 60 + 20;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 15;
        
        fish.style.top = `${topPosition}%`;
        fish.style.animationDuration = `${duration}s`;
        fish.style.animationDelay = `${delay}s`;
        
        fish.innerHTML = `
            <div class="fish-body" style="background: linear-gradient(90deg, ${color}, ${color}dd);">
                <div class="fish-tail" style="border-left-color: ${color};"></div>
                <div class="fish-eye"></div>
            </div>
        `;
        
        container.appendChild(fish);
        
        setTimeout(() => fish.remove(), (duration + delay) * 1000);
    }, 3000);
}

// Otter bubbles
function createOtterBubbles() {
    const container = document.getElementById('otterBubbles');
    
    setInterval(() => {
        const bubble = document.createElement('div');
        bubble.className = 'otter-bubble';
        bubble.style.left = `${Math.random() * 20}px`;
        bubble.style.animationDuration = `${Math.random() * 1 + 1.5}s`;
        
        container.appendChild(bubble);
        setTimeout(() => bubble.remove(), 3000);
    }, 1000);
}

// Emotion detection
const emotionKeywords = {
    happy: ['happy', 'great', 'wonderful', 'joy', 'excited', 'amazing', 'love', 'fantastic', 'beautiful', 'awesome', 'fun', 'laugh', 'smile'],
    sad: ['sad', 'depressed', 'lonely', 'crying', 'upset', 'heartbroken', 'miserable', 'hurt', 'pain', 'gloomy', 'tears'],
    angry: ['angry', 'furious', 'mad', 'annoyed', 'frustrated', 'irritated', 'rage', 'hate', 'upset'],
    scared: ['scared', 'afraid', 'nervous', 'anxious', 'worried', 'terrified', 'panic', 'fear', 'spooky'],
    surprised: ['surprised', 'wow', 'unexpected', 'shocked', 'amazed', 'incredible', 'unbelievable', 'whoa'],
    neutral: []
};

// Otter responses
const otterResponses = {
    happy: [
        "Yay! You're happy! Let's swim together! 🦦💫",
        "Squeak squeak! I love your happy vibes! 🎉",
        "You're smiling underwater! That makes me so happy too! 😊",
        "Wheee! Let's do a happy dance in the water! 💃",
        "Your happiness is like sunshine in the ocean! 🌊✨"
    ],
    sad: [
        "Oh no, don't be sad! I'll swim close to you 🦦💙",
        "Come here, let me give you an otter hug 🤗",
        "The water feels a bit heavy today. I'm here with you 🌧️",
        "Want to float together until you feel better? 🦦",
        "I'll bring you some pretty seashells to cheer you up 🐚"
    ],
    angry: [
        "Whoa! Take a deep breath underwater with me 🌊",
        "Let's swim out that frustration! Race you! 🏊",
        "Angry otter! Let's flip and splash it out! 💦",
        "Calm waters ahead. I'll swim beside you 🦦",
        "Squeak! Let me tell you a joke to lighten the mood!"
    ],
    scared: [
        "Don't worry, I'll protect you! 🦦💪",
        "It's okay to be scared. I'm right here 🌟",
        "Let's hide behind this coral together 🪸",
        "The ocean can be scary sometimes. I'll stay close 🤗",
        "Want me to check if everything's safe? I'm brave! 🦦"
    ],
    surprised: [
        "WOW! Tell me everything! 🎉",
        "Squeak! That IS surprising! 😮",
        "My whiskers are tingling with excitement! ✨",
        "No way! Really?! That's amazing! 🌟",
        "I almost dropped my favorite shell! Tell me more! 🐚"
    ],
    neutral: [
        "Hey there! Want to explore the reef together? 🦦",
        "I found a cool rock today! Want to see? 🪨",
        "The water feels nice today. Let's float 🌊",
        "Squeak squeak! What's on your mind? 💭",
        "I saw a pretty jellyfish earlier! So graceful 🎐"
    ]
};

// Main app
class OtterAI {
    constructor() {
        this.emotion = 'neutral';
        this.initEventListeners();
        createBubbles();
        createFish();
        createOtterBubbles();
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
        const pupils = document.querySelectorAll('.otter-pupil');
        const otter = document.getElementById('otterContainer');
        const rect = otter.getBoundingClientRect();
        
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (e.clientX - centerX) / 30;
        const deltaY = (e.clientY - centerY) / 30;
        
        const moveX = Math.min(Math.max(deltaX, -3), 3);
        const moveY = Math.min(Math.max(deltaY, -2), 2);
        
        pupils.forEach(pupil => {
            pupil.style.transform = `translate(${4 + moveX}px, ${5 + moveY}px)`;
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
        
        // Update mouth
        const mouth = document.getElementById('otterMouth');
        mouth.className = 'otter-mouth';
        
        if (emotion === 'happy') mouth.classList.add('happy');
        else if (emotion === 'sad') mouth.classList.add('sad');
        else if (emotion === 'surprised') mouth.classList.add('surprised');
        
        // Update emoji
        const emojis = {
            happy: '😊',
            sad: '😢',
            angry: '😤',
            scared: '😰',
            surprised: '😮',
            neutral: '😐'
        };
        
        document.getElementById('otterEmotion').textContent = emojis[emotion] || '😐';
        
        // Animate otter based on emotion
        const otter = document.getElementById('otter');
        otter.style.animation = 'none';
        otter.offsetHeight; // Trigger reflow
        
        if (emotion === 'happy') {
            otter.style.animation = 'otterHappy 1s ease-in-out 3';
        } else if (emotion === 'sad') {
            otter.style.animation = 'otterSad 2s ease-in-out';
        } else {
            otter.style.animation = 'otterSwim 6s ease-in-out infinite';
        }
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
        
        // Show thinking
        await this.sleep(1500 + Math.random() * 1000);
        
        // Generate response
        const responses = otterResponses[emotion] || otterResponses.neutral;
        const response = responses[Math.floor(Math.random() * responses.length)];
        
        // Show speech bubble
        this.showSpeechBubble(response);
        
        // Add chat message
        this.addMessage(response, 'otter');
    }
    
    addMessage(text, sender) {
        const chatMessages = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        messageDiv.innerHTML = `
            <div class="message-content">
                <span class="message-text">${text}</span>
            </div>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    showSpeechBubble(text) {
        const bubble = document.getElementById('speechBubble');
        const content = document.getElementById('speechContent');
        
        content.textContent = text;
        bubble.classList.add('visible');
        
        setTimeout(() => {
            bubble.classList.remove('visible');
        }, 3000);
    }
    
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    const otter = new OtterAI();
});
