// VincAI Application JavaScript - Ultra Futuristic Edition with Thinking Engine
class VincAI {
    constructor() {
        this.chatHistory = [];
        this.currentChatId = null;
        this.isTyping = false;
        this.particles = [];
        this.thinkingEngine = new ThinkingEngine(); // Initialize the thinking engine
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadTheme();
        this.loadChatHistory();
        this.autoResizeTextarea();
        this.initializeParticles();
        this.setupAdvancedAnimations();
    }

    setupEventListeners() {
        // Theme toggle with advanced animation
        const themeBtn = document.getElementById('themeBtn');
        if (themeBtn) {
            themeBtn.addEventListener('click', () => this.toggleTheme());
        }

        // Enhanced sidebar toggle
        const sidebarToggle = document.getElementById('sidebarToggle');
        const sidebar = document.getElementById('sidebar');
        if (sidebarToggle && sidebar) {
            sidebarToggle.addEventListener('click', () => {
                sidebar.classList.toggle('show');
                this.animateToggle();
            });
        }

        // Enhanced new chat button
        const newChatBtn = document.getElementById('newChatBtn');
        if (newChatBtn) {
            newChatBtn.addEventListener('click', () => {
                this.addRippleEffect(newChatBtn);
                setTimeout(() => this.startNewChat(), 200);
            });
        }

        // Enhanced send message
        const sendBtn = document.getElementById('sendBtn');
        const messageInput = document.getElementById('messageInput');
        
        if (sendBtn) {
            sendBtn.addEventListener('click', () => {
                this.addRippleEffect(sendBtn);
                setTimeout(() => this.sendMessage(), 100);
            });
        }
        
        if (messageInput) {
            messageInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.addInputGlow();
                    this.sendMessage();
                }
            });

            // Enhanced input validation with glow effects
            messageInput.addEventListener('input', () => {
                const text = messageInput.value.trim();
                if (sendBtn) {
                    sendBtn.disabled = !text || this.isTyping;
                }
                
                if (text.length > 0) {
                    this.addInputGlow();
                } else {
                    this.removeInputGlow();
                }
            });
        }

        // Enhanced example prompts with particle effects
        const exampleCards = document.querySelectorAll('.example-card');
        exampleCards.forEach(card => {
            card.addEventListener('click', () => {
                this.addCardEffect(card);
                const prompt = card.getAttribute('data-prompt');
                if (messageInput) {
                    messageInput.value = prompt;
                    messageInput.focus();
                }
                if (sendBtn) {
                    sendBtn.disabled = false;
                }
                this.addInputGlow();
            });
        });

        // Enhanced user menu
        const userBtn = document.getElementById('userBtn');
        const userDropdown = document.getElementById('userDropdown');
        if (userBtn && userDropdown) {
            userBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                userDropdown.classList.toggle('show');
                this.addRippleEffect(userBtn);
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', () => {
                userDropdown.classList.remove('show');
            });
        }

        // Responsive sidebar handling
        this.handleResponsive();
        window.addEventListener('resize', () => this.handleResponsive());

        // Advanced keyboard shortcuts
        this.setupKeyboardShortcuts();
    }

    setupAdvancedAnimations() {
        // Initialize quantum effects
        this.initQuantumEffects();
        
        // Setup scroll animations
        this.setupScrollAnimations();
        
        // Initialize holographic text effects
        this.initHolographicEffects();
    }

    initializeParticles() {
        // Create floating particles in the background
        const createParticle = () => {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: var(--accent-primary);
                border-radius: 50%;
                pointer-events: none;
                z-index: -5;
                opacity: 0.3;
                left: ${Math.random() * 100}vw;
                top: 100vh;
                animation: floatUp ${10 + Math.random() * 20}s linear infinite;
                box-shadow: 0 0 6px var(--accent-primary);
            `;
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 30000);
        };
        
        // Create particles periodically
        setInterval(createParticle, 3000);
        
        // Add CSS for floating animation
        if (!document.getElementById('particle-styles')) {
            const style = document.createElement('style');
            style.id = 'particle-styles';
            style.textContent = `
                @keyframes floatUp {
                    0% { 
                        transform: translateY(0) translateX(0) rotate(0deg); 
                        opacity: 0; 
                    }
                    10% { 
                        opacity: 0.3; 
                    }
                    90% { 
                        opacity: 0.3; 
                    }
                    100% { 
                        transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px) rotate(360deg); 
                        opacity: 0; 
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    addRippleEffect(element) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            z-index: 1000;
        `;
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (rect.width / 2 - size / 2) + 'px';
        ripple.style.top = (rect.height / 2 - size / 2) + 'px';
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
        
        // Add ripple animation CSS if not exists
        if (!document.getElementById('ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    addInputGlow() {
        const inputBox = document.querySelector('.input-box');
        inputBox.style.boxShadow = 'var(--glow-primary), var(--shadow-heavy)';
        inputBox.style.transform = 'translateY(-2px) scale(1.01)';
    }

    removeInputGlow() {
        const inputBox = document.querySelector('.input-box');
        inputBox.style.boxShadow = 'var(--shadow-medium)';
        inputBox.style.transform = 'translateY(0) scale(1)';
    }

    addCardEffect(card) {
        // Add quantum ripple effect
        card.style.transform = 'translateY(-12px) scale(1.05)';
        card.style.boxShadow = 'var(--glow-secondary), var(--shadow-heavy)';
        
        // Create sparkle effect
        const sparkles = [];
        for (let i = 0; i < 5; i++) {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = '✦';
            sparkle.style.cssText = `
                position: absolute;
                color: var(--accent-primary);
                font-size: 12px;
                pointer-events: none;
                z-index: 1000;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: sparkleFloat 1s ease-out forwards;
            `;
            card.appendChild(sparkle);
            sparkles.push(sparkle);
        }
        
        // Reset after animation
        setTimeout(() => {
            card.style.transform = '';
            card.style.boxShadow = '';
            sparkles.forEach(sparkle => sparkle.remove());
        }, 800);
        
        // Add sparkle animation CSS if not exists
        if (!document.getElementById('sparkle-styles')) {
            const style = document.createElement('style');
            style.id = 'sparkle-styles';
            style.textContent = `
                @keyframes sparkleFloat {
                    0% {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                    100% {
                        opacity: 0;
                        transform: translateY(-30px) scale(1.5);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + N for new chat with effect
            if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
                e.preventDefault();
                this.addGlobalEffect();
                setTimeout(() => this.startNewChat(), 300);
            }
            
            // Ctrl/Cmd + K for focus input with glow
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                const input = document.getElementById('messageInput');
                input.focus();
                this.addInputGlow();
                this.addPulseEffect(input.closest('.input-box'));
            }
            
            // Ctrl/Cmd + / for theme toggle
            if ((e.ctrlKey || e.metaKey) && e.key === '/') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
    }

    initQuantumEffects() {
        // Add quantum field effects to interactive elements
        const quantumElements = document.querySelectorAll('.quantum-ripple');
        quantumElements.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                this.createQuantumField(e.target);
            });
        });
    }

    createQuantumField(element) {
        const field = document.createElement('div');
        field.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            background: conic-gradient(from 0deg, transparent, rgba(99, 102, 241, 0.2), transparent);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: quantumExpand 2s ease-out forwards;
            pointer-events: none;
            z-index: -1;
        `;
        
        element.style.position = 'relative';
        element.appendChild(field);
        
        setTimeout(() => field.remove(), 2000);
        
        // Add quantum animation CSS if not exists
        if (!document.getElementById('quantum-styles')) {
            const style = document.createElement('style');
            style.id = 'quantum-styles';
            style.textContent = `
                @keyframes quantumExpand {
                    0% {
                        width: 0;
                        height: 0;
                        opacity: 1;
                    }
                    100% {
                        width: 200%;
                        height: 200%;
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    addGlobalEffect() {
        // Create a screen-wide pulse effect
        const pulse = document.createElement('div');
        pulse.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%);
            pointer-events: none;
            z-index: 9999;
            animation: globalPulse 0.6s ease-out forwards;
        `;
        
        document.body.appendChild(pulse);
        setTimeout(() => pulse.remove(), 600);
        
        // Add global pulse animation CSS if not exists
        if (!document.getElementById('global-pulse-styles')) {
            const style = document.createElement('style');
            style.id = 'global-pulse-styles';
            style.textContent = `
                @keyframes globalPulse {
                    0% {
                        opacity: 0;
                        transform: scale(0.8);
                    }
                    50% {
                        opacity: 1;
                        transform: scale(1);
                    }
                    100% {
                        opacity: 0;
                        transform: scale(1.2);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    addPulseEffect(element) {
        element.style.animation = 'elementPulse 0.5s ease-out';
        setTimeout(() => {
            element.style.animation = '';
        }, 500);
        
        // Add element pulse animation CSS if not exists
        if (!document.getElementById('element-pulse-styles')) {
            const style = document.createElement('style');
            style.id = 'element-pulse-styles';
            style.textContent = `
                @keyframes elementPulse {
                    0% {
                        transform: scale(1);
                        box-shadow: var(--shadow-medium);
                    }
                    50% {
                        transform: scale(1.05);
                        box-shadow: var(--glow-primary), var(--shadow-heavy);
                    }
                    100% {
                        transform: scale(1);
                        box-shadow: var(--shadow-medium);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    animateToggle() {
        // Create a ripple effect from the toggle button
        const toggle = document.getElementById('sidebarToggle');
        this.addRippleEffect(toggle);
        
        // Add screen transition effect
        const transition = document.createElement('div');
        transition.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: linear-gradient(45deg, rgba(99, 102, 241, 0.05), rgba(139, 92, 246, 0.05));
            pointer-events: none;
            z-index: 9998;
            animation: screenTransition 0.8s ease-out forwards;
        `;
        
        document.body.appendChild(transition);
        setTimeout(() => transition.remove(), 800);
        
        // Add screen transition animation CSS if not exists
        if (!document.getElementById('screen-transition-styles')) {
            const style = document.createElement('style');
            style.id = 'screen-transition-styles';
            style.textContent = `
                @keyframes screenTransition {
                    0% {
                        opacity: 0;
                        transform: translateX(-100%);
                    }
                    50% {
                        opacity: 1;
                        transform: translateX(0);
                    }
                    100% {
                        opacity: 0;
                        transform: translateX(100%);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    autoResizeTextarea() {
        const textarea = document.getElementById('messageInput');
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = Math.min(this.scrollHeight, 120) + 'px';
        });
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Create spectacular theme transition effect
        this.createThemeTransition(newTheme);
        
        // Apply theme after animation starts
        setTimeout(() => {
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        }, 200);
    }

    createThemeTransition(newTheme) {
        // Create multiple layers for smooth transition
        const layers = [];
        const colors = newTheme === 'dark' 
            ? ['rgba(10, 10, 15, 0)', 'rgba(17, 24, 39, 0)', 'rgba(31, 41, 55, 0)']
            : ['rgba(250, 251, 255, 0)', 'rgba(240, 242, 255, 0)', 'rgba(232, 236, 255, 0)'];
        
        colors.forEach((color, index) => {
            const layer = document.createElement('div');
            layer.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: ${color.replace('0)', '1)')}; 
                opacity: 0;
                pointer-events: none;
                z-index: ${9990 + index};
                animation: themeWave ${0.8 + index * 0.2}s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                animation-delay: ${index * 0.1}s;
            `;
            document.body.appendChild(layer);
            layers.push(layer);
        });
        
        // Cleanup layers
        setTimeout(() => {
            layers.forEach(layer => layer.remove());
        }, 1500);
        
        // Add theme wave animation CSS if not exists
        if (!document.getElementById('theme-wave-styles')) {
            const style = document.createElement('style');
            style.id = 'theme-wave-styles';
            style.textContent = `
                @keyframes themeWave {
                    0% {
                        opacity: 0;
                        transform: scale(0) rotate(0deg);
                    }
                    50% {
                        opacity: 1;
                        transform: scale(1.5) rotate(180deg);
                    }
                    100% {
                        opacity: 0;
                        transform: scale(2) rotate(360deg);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    handleResponsive() {
        const sidebar = document.getElementById('sidebar');
        if (window.innerWidth <= 768) {
            sidebar.classList.add('collapsed');
        } else {
            sidebar.classList.remove('collapsed', 'show');
        }
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
    }

    startNewChat() {
        this.currentChatId = this.generateId();
        this.showWelcomeScreen();
        this.clearInput();
        this.updateChatHistory();
        
        // Close sidebar on mobile
        if (window.innerWidth <= 768) {
            document.getElementById('sidebar').classList.remove('show');
        }
    }

    showWelcomeScreen() {
        document.getElementById('welcomeScreen').style.display = 'flex';
        document.getElementById('chatContainer').style.display = 'none';
        document.getElementById('chatMessages').innerHTML = '';
    }

    showChatContainer() {
        document.getElementById('welcomeScreen').style.display = 'none';
        document.getElementById('chatContainer').style.display = 'flex';
    }

    async sendMessage() {
        const messageInput = document.getElementById('messageInput');
        const text = messageInput.value.trim();
        
        if (!text || this.isTyping) return;

        // Create spectacular send effect
        this.createSendEffect();
        
        // Show chat container if not visible
        this.showChatContainer();

        // Add user message with enhanced animation
        this.addMessage(text, 'user');
        this.clearInput();
        
        // Show enhanced typing indicator
        this.showEnhancedTypingIndicator();
        
        // Simulate AI response with realistic delay
        await this.simulateAIResponse(text);
        
        // Update chat history
        this.updateChatHistory();
    }

    createSendEffect() {
        // Create energy burst effect
        const sendBtn = document.getElementById('sendBtn');
        const burst = document.createElement('div');
        burst.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, transparent 70%);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: energyBurst 0.6s ease-out forwards;
            pointer-events: none;
            z-index: 1001;
        `;
        
        sendBtn.style.position = 'relative';
        sendBtn.appendChild(burst);
        
        // Create light trail effect
        const trail = document.createElement('div');
        trail.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, transparent, rgba(99, 102, 241, 0.5), transparent);
            border-radius: 16px;
            animation: lightTrail 1s ease-out forwards;
            pointer-events: none;
            z-index: 1000;
        `;
        
        sendBtn.appendChild(trail);
        
        setTimeout(() => {
            burst.remove();
            trail.remove();
        }, 1000);
        
        // Add send effect animation CSS if not exists
        if (!document.getElementById('send-effect-styles')) {
            const style = document.createElement('style');
            style.id = 'send-effect-styles';
            style.textContent = `
                @keyframes energyBurst {
                    0% {
                        width: 0;
                        height: 0;
                        opacity: 1;
                    }
                    100% {
                        width: 200px;
                        height: 200px;
                        opacity: 0;
                    }
                }
                @keyframes lightTrail {
                    0% {
                        opacity: 1;
                        transform: scale(1);
                    }
                    100% {
                        opacity: 0;
                        transform: scale(1.2);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    showEnhancedTypingIndicator() {
        const chatMessages = document.getElementById('chatMessages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message assistant typing';
        typingDiv.id = 'typingIndicator';
        
        typingDiv.innerHTML = `
            <div class="message-content">
                <div class="message-avatar">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.078 6.078 0 0 0 6.527 2.9 5.991 5.991 0 0 0 4.306 1.011 6.078 6.078 0 0 0 4.323-1.011 5.991 5.991 0 0 0 6.51-2.9 6.046 6.046 0 0 0-.743-7.098 5.985 5.985 0 0 0 .516-4.91z"/>
                    </svg>
                </div>
                <div class="message-text">
                    <span style="margin-right: 12px; opacity: 0.7; font-style: italic;">VincAI is thinking...</span>
                    <div class="typing-indicator">
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                    </div>
                </div>
            </div>
        `;
        
        chatMessages.appendChild(typingDiv);
        
        // Add scroll with smooth animation
        setTimeout(() => {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 100);
        
        this.isTyping = true;
        const sendBtn = document.getElementById('sendBtn');
        if (sendBtn) {
            sendBtn.disabled = true;
        }
        
        // Add neural activity effect to avatar
        const avatar = typingDiv.querySelector('.message-avatar');
        avatar.style.animation = 'neuralPulse 2s ease-in-out infinite';
    }

    addMessage(text, sender) {
        const chatMessages = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        const avatar = sender === 'user' ? 
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>' :
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.078 6.078 0 0 0 6.527 2.9 5.991 5.991 0 0 0 4.306 1.011 6.078 6.078 0 0 0 4.323-1.011 5.991 5.991 0 0 0 6.51-2.9 6.046 6.046 0 0 0-.743-7.098 5.985 5.985 0 0 0 .516-4.91z"/></svg>';

        messageDiv.innerHTML = `
            <div class="message-content">
                <div class="message-avatar">
                    ${avatar}
                </div>
                <div class="message-text">${this.formatMessage(text)}</div>
            </div>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Store in current chat
        if (!this.currentChatId) {
            this.currentChatId = this.generateId();
        }
        
        const currentChat = this.chatHistory.find(chat => chat.id === this.currentChatId) || 
            { id: this.currentChatId, title: this.generateChatTitle(text), messages: [] };
        
        if (!this.chatHistory.find(chat => chat.id === this.currentChatId)) {
            this.chatHistory.unshift(currentChat);
        }
        
        currentChat.messages.push({ text, sender, timestamp: Date.now() });
    }

    showTypingIndicator() {
        const chatMessages = document.getElementById('chatMessages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message assistant typing';
        typingDiv.id = 'typingIndicator';
        
        typingDiv.innerHTML = `
            <div class="message-content">
                <div class="message-avatar">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.078 6.078 0 0 0 6.527 2.9 5.991 5.991 0 0 0 4.306 1.011 6.078 6.078 0 0 0 4.323-1.011 5.991 5.991 0 0 0 6.51-2.9 6.046 6.046 0 0 0-.743-7.098 5.985 5.985 0 0 0 .516-4.91z"/>
                    </svg>
                </div>
                <div class="message-text">
                    <div class="typing-indicator">
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                    </div>
                </div>
            </div>
        `;
        
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        this.isTyping = true;
        const sendBtn = document.getElementById('sendBtn');
        if (sendBtn) {
            sendBtn.disabled = true;
        }
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
        this.isTyping = false;
        const messageInput = document.getElementById('messageInput');
        const sendBtn = document.getElementById('sendBtn');
        if (sendBtn && messageInput) {
            sendBtn.disabled = !messageInput.value.trim();
        }
    }

    async simulateAIResponse(userMessage) {
        // Show thinking process with realistic delay
        await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 2000));
        
        this.hideTypingIndicator();
        
        // Use the thinking engine to generate response
        const response = this.thinkingEngine.think(userMessage);
        this.addMessage(response, 'assistant');
    }

    formatMessage(text) {
        // Basic text formatting (you can expand this)
        return text
            .replace(/\n/g, '<br>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code>$1</code>');
    }

    clearInput() {
        const messageInput = document.getElementById('messageInput');
        const sendBtn = document.getElementById('sendBtn');
        if (messageInput) {
            messageInput.value = '';
            messageInput.style.height = 'auto';
        }
        if (sendBtn) {
            sendBtn.disabled = true;
        }
    }

    generateId() {
        return 'chat_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    generateChatTitle(text) {
        // Generate a title from the first message
        const words = text.split(' ').slice(0, 6).join(' ');
        return words.length > 30 ? words.substr(0, 27) + '...' : words;
    }

    updateChatHistory() {
        const chatHistoryContainer = document.getElementById('chatHistory');
        chatHistoryContainer.innerHTML = '';
        
        this.chatHistory.forEach(chat => {
            const chatItem = document.createElement('div');
            chatItem.className = `chat-item ${chat.id === this.currentChatId ? 'active' : ''}`;
            chatItem.innerHTML = `
                <div class="chat-item-text">${chat.title}</div>
                <div class="chat-item-actions">
                    <button class="chat-action-btn" onclick="app.editChatTitle('${chat.id}')">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                    </button>
                    <button class="chat-action-btn" onclick="app.deleteChat('${chat.id}')">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                    </button>
                </div>
            `;
            
            chatItem.addEventListener('click', (e) => {
                if (!e.target.closest('.chat-action-btn')) {
                    this.loadChat(chat.id);
                }
            });
            
            chatHistoryContainer.appendChild(chatItem);
        });
        
        this.saveChatHistory();
    }

    loadChat(chatId) {
        const chat = this.chatHistory.find(c => c.id === chatId);
        if (!chat) return;
        
        this.currentChatId = chatId;
        this.showChatContainer();
        
        const chatMessages = document.getElementById('chatMessages');
        chatMessages.innerHTML = '';
        
        chat.messages.forEach(message => {
            this.addMessageToDOM(message.text, message.sender, false);
        });
        
        this.updateChatHistory();
        
        // Close sidebar on mobile
        if (window.innerWidth <= 768) {
            document.getElementById('sidebar').classList.remove('show');
        }
    }

    addMessageToDOM(text, sender, animate = true) {
        const chatMessages = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        if (!animate) {
            messageDiv.style.animation = 'none';
        }
        
        const avatar = sender === 'user' ? 
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>' :
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.078 6.078 0 0 0 6.527 2.9 5.991 5.991 0 0 0 4.306 1.011 6.078 6.078 0 0 0 4.323-1.011 5.991 5.991 0 0 0 6.51-2.9 6.046 6.046 0 0 0-.743-7.098 5.985 5.985 0 0 0 .516-4.91z"/></svg>';

        messageDiv.innerHTML = `
            <div class="message-content">
                <div class="message-avatar">
                    ${avatar}
                </div>
                <div class="message-text">${this.formatMessage(text)}</div>
            </div>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    deleteChat(chatId) {
        if (confirm('Are you sure you want to delete this chat?')) {
            this.chatHistory = this.chatHistory.filter(chat => chat.id !== chatId);
            
            if (this.currentChatId === chatId) {
                this.startNewChat();
            } else {
                this.updateChatHistory();
            }
        }
    }

    editChatTitle(chatId) {
        const chat = this.chatHistory.find(c => c.id === chatId);
        if (!chat) return;
        
        const newTitle = prompt('Enter new chat title:', chat.title);
        if (newTitle && newTitle.trim()) {
            chat.title = newTitle.trim();
            this.updateChatHistory();
        }
    }

    saveChatHistory() {
        localStorage.setItem('vincai_chats', JSON.stringify(this.chatHistory));
    }

    loadChatHistory() {
        const saved = localStorage.getItem('vincai_chats');
        if (saved) {
            try {
                this.chatHistory = JSON.parse(saved);
                this.updateChatHistory();
            } catch (e) {
                console.error('Failed to load chat history:', e);
            }
        }
    }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new VincAI();
    window.app = app; // Make app globally accessible for debugging
    
    // Add some sample chats for demonstration
    if (app.chatHistory.length === 0) {
        const sampleChats = [
        {
            id: 'sample_1',
            title: 'Getting started with VincAI',
            messages: [
                { text: 'Hello! How does VincAI work?', sender: 'user', timestamp: Date.now() - 86400000 },
                { text: 'Hello! VincAI is an AI assistant that can help you with various tasks like answering questions, writing content, solving problems, and having conversations. Simply type your message and I\'ll respond!', sender: 'assistant', timestamp: Date.now() - 86400000 + 1000 }
            ]
        },
        {
            id: 'sample_2', 
            title: 'Creative writing tips',
            messages: [
                { text: 'Can you give me some creative writing tips?', sender: 'user', timestamp: Date.now() - 43200000 },
                { text: 'Absolutely! Here are some key creative writing tips:\n\n1. **Read widely** - Exposure to different styles helps develop your voice\n2. **Write regularly** - Daily practice builds skill and confidence\n3. **Show, don\'t tell** - Use vivid descriptions and actions\n4. **Create compelling characters** - Give them distinct voices and motivations\n5. **Start with conflict** - Tension drives story forward\n\nWould you like me to elaborate on any of these points?', sender: 'assistant', timestamp: Date.now() - 43200000 + 1000 }
            ]
        }
    ];
    
    app.chatHistory = sampleChats;
    app.updateChatHistory();
}
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + N for new chat
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        app.startNewChat();
    }
    
    // Ctrl/Cmd + K for focus input
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('messageInput').focus();
    }
});

// Add smooth scrolling for chat messages
const chatMessages = document.getElementById('chatMessages');
chatMessages.addEventListener('scroll', () => {
    // Add scroll shadows or other effects if needed
});

// Prevent form submission on Enter
document.getElementById('messageInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
    }
});

// Add loading states and better error handling
window.addEventListener('error', (e) => {
    console.error('Application error:', e);
});

// Handle online/offline status
window.addEventListener('online', () => {
    console.log('Connection restored');
});

window.addEventListener('offline', () => {
    console.log('Connection lost');
});

console.log('VincAI loaded successfully! 🚀');
