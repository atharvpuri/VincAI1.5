// Simple VincAI - Basic Working Version
class VincAI {
    constructor() {
        this.isTyping = false;
        this.setupEventListeners();
        this.loadTheme();
        console.log('VincAI Ready!');
    }

    setupEventListeners() {
        // Wait for DOM to be fully loaded
        setTimeout(() => {
            this.initializeElements();
        }, 100);
    }

    initializeElements() {
        // Theme toggle
        const themeBtn = document.getElementById('themeBtn');
        if (themeBtn) {
            themeBtn.onclick = () => this.toggleTheme();
            console.log('Theme button connected');
        } else {
            console.log('Theme button not found');
        }

        // Send button
        const sendBtn = document.getElementById('sendBtn');
        if (sendBtn) {
            sendBtn.onclick = () => this.sendMessage();
            console.log('Send button connected');
        } else {
            console.log('Send button not found');
        }

        // Message input
        const messageInput = document.getElementById('messageInput');
        if (messageInput) {
            messageInput.onkeydown = (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            };
            
            messageInput.oninput = () => {
                const sendBtn = document.getElementById('sendBtn');
                if (sendBtn) {
                    sendBtn.disabled = !messageInput.value.trim() || this.isTyping;
                }
            };
            console.log('Message input connected');
        } else {
            console.log('Message input not found');
        }

        // New chat button
        const newChatBtn = document.getElementById('newChatBtn');
        if (newChatBtn) {
            newChatBtn.onclick = () => this.startNewChat();
            console.log('New chat button connected');
        } else {
            console.log('New chat button not found');
        }

        // Example cards
        const exampleCards = document.querySelectorAll('.example-card');
        if (exampleCards.length > 0) {
            exampleCards.forEach(card => {
                card.onclick = () => {
                    const prompt = card.getAttribute('data-prompt');
                    const messageInput = document.getElementById('messageInput');
                    const sendBtn = document.getElementById('sendBtn');
                    
                    if (messageInput && prompt) {
                        messageInput.value = prompt;
                        messageInput.focus();
                    }
                    if (sendBtn) {
                        sendBtn.disabled = false;
                    }
                };
            });
            console.log('Example cards connected:', exampleCards.length);
        }

        // Sidebar toggle
        const sidebarToggle = document.getElementById('sidebarToggle');
        const sidebar = document.getElementById('sidebar');
        if (sidebarToggle && sidebar) {
            sidebarToggle.onclick = () => {
                sidebar.classList.toggle('show');
            };
            console.log('Sidebar toggle connected');
        }
    }

    toggleTheme() {
        const body = document.body;
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        console.log('Theme switched to:', newTheme);
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.body.setAttribute('data-theme', savedTheme);
        console.log('Theme loaded:', savedTheme);
    }

    startNewChat() {
        console.log('Starting new chat');
        
        // Clear chat messages
        const chatMessages = document.getElementById('chatMessages');
        if (chatMessages) {
            chatMessages.innerHTML = '';
        }
        
        // Show welcome screen
        const welcomeScreen = document.getElementById('welcomeScreen');
        const chatContainer = document.getElementById('chatContainer');
        
        if (welcomeScreen) welcomeScreen.style.display = 'flex';
        if (chatContainer) chatContainer.style.display = 'none';
    }

    sendMessage() {
        const messageInput = document.getElementById('messageInput');
        if (!messageInput) {
            console.log('Message input not found');
            return;
        }

        const text = messageInput.value.trim();
        if (!text || this.isTyping) {
            console.log('No text or already typing');
            return;
        }

        console.log('Sending message:', text);
        
        // Show chat container
        this.showChatContainer();
        
        // Add user message
        this.addMessage(text, 'user');
        
        // Clear input
        messageInput.value = '';
        
        // Generate simple AI response
        this.generateSimpleResponse(text);
    }

    showChatContainer() {
        const welcomeScreen = document.getElementById('welcomeScreen');
        const chatContainer = document.getElementById('chatContainer');
        
        if (welcomeScreen) welcomeScreen.style.display = 'none';
        if (chatContainer) chatContainer.style.display = 'flex';
    }

    addMessage(text, sender) {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) {
            console.log('Chat messages container not found');
            return;
        }

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        const avatar = sender === 'user' ? 
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>' :
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.078 6.078 0 0 0 6.527 2.9 5.991 5.991 0 0 0 4.306 1.011 6.078 6.078 0 0 0 4.323-1.011 5.991 5.991 0 0 0 6.51-2.9 6.046 6.046 0 0 0-.743-7.098 5.985 5.985 0 0 0 .516-4.91z"/></svg>';

        messageDiv.innerHTML = `
            <div class="message-content">
                <div class="message-avatar">${avatar}</div>
                <div class="message-text">${text}</div>
            </div>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        console.log('Message added:', sender, text);
    }

    generateSimpleResponse(userMessage) {
        this.isTyping = true;
        const sendBtn = document.getElementById('sendBtn');
        if (sendBtn) sendBtn.disabled = true;

        console.log('Generating response for:', userMessage);
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Simple response generation
        setTimeout(() => {
            this.hideTypingIndicator();
            
            let response = "I understand you're asking about: " + userMessage + ". ";
            
            // Add some basic responses based on keywords
            const lower = userMessage.toLowerCase();
            if (lower.includes('hello') || lower.includes('hi')) {
                response = "Hello! I'm VincAI, your AI assistant. How can I help you today?";
            } else if (lower.includes('how are you')) {
                response = "I'm functioning well and ready to assist you with any questions or tasks you have.";
            } else if (lower.includes('what') || lower.includes('explain')) {
                response = "That's an interesting question. Let me provide you with a comprehensive answer about " + userMessage.substring(0, 50) + "...";
            } else {
                response = "Thank you for your message. I'm here to help with information, analysis, writing, problem-solving, and general assistance. How would you like me to help with: " + userMessage + "?";
            }
            
            this.addMessage(response, 'assistant');
            this.isTyping = false;
            
            if (sendBtn) sendBtn.disabled = false;
            console.log('Response generated');
        }, 2000);
    }

    showTypingIndicator() {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;

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
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    window.app = new VincAI();
});

// Also try immediate initialization
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        window.app = new VincAI();
    });
} else {
    window.app = new VincAI();
}
