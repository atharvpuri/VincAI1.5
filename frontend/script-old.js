// VincAI - Clean Working Version
let app;

document.addEventListener('DOMContentLoaded', function() {
    app = new VincAI();
    console.log('VincAI initialized');
});

class VincAI {
    constructor() {
        this.chatHistory = [];
        this.currentChatId = null;
        this.isTyping = false;
        this.thinkingEngine = new ThinkingEngine();
        
        this.setupEventListeners();
        this.loadTheme();
    }

    setupEventListeners() {
        // Theme toggle
        const themeBtn = document.getElementById('themeBtn');
        if (themeBtn) {
            themeBtn.addEventListener('click', () => {
                this.toggleTheme();
            });
        }

        // Sidebar toggle
        const sidebarToggle = document.getElementById('sidebarToggle');
        const sidebar = document.getElementById('sidebar');
        if (sidebarToggle && sidebar) {
            sidebarToggle.addEventListener('click', () => {
                sidebar.classList.toggle('show');
            });
        }

        // New chat button
        const newChatBtn = document.getElementById('newChatBtn');
        if (newChatBtn) {
            newChatBtn.addEventListener('click', () => {
                this.startNewChat();
            });
        }

        // Send button
        const sendBtn = document.getElementById('sendBtn');
        if (sendBtn) {
            sendBtn.addEventListener('click', () => {
                this.sendMessage();
            });
        }

        // Message input
        const messageInput = document.getElementById('messageInput');
        if (messageInput) {
            messageInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });

            messageInput.addEventListener('input', () => {
                const sendBtn = document.getElementById('sendBtn');
                if (sendBtn) {
                    sendBtn.disabled = !messageInput.value.trim() || this.isTyping;
                }
            });
        }

        // Example cards
        const exampleCards = document.querySelectorAll('.example-card');
        exampleCards.forEach(card => {
            card.addEventListener('click', () => {
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
            });
        });
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
    }

    startNewChat() {
        this.currentChatId = null;
        
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
        
        console.log('Started new chat');
    }

    async sendMessage() {
        const messageInput = document.getElementById('messageInput');
        const text = messageInput ? messageInput.value.trim() : '';
        
        if (!text || this.isTyping) return;

        console.log('Sending message:', text);
        
        // Show chat container
        this.showChatContainer();
        
        // Add user message
        this.addMessage(text, 'user');
        
        // Clear input
        if (messageInput) {
            messageInput.value = '';
        }
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Generate AI response
        await this.generateAIResponse(text);
    }

    showChatContainer() {
        const welcomeScreen = document.getElementById('welcomeScreen');
        const chatContainer = document.getElementById('chatContainer');
        
        if (welcomeScreen) welcomeScreen.style.display = 'none';
        if (chatContainer) chatContainer.style.display = 'flex';
    }

    addMessage(text, sender) {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        const avatar = sender === 'user' ? 
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>' :
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.078 6.078 0 0 0 6.527 2.9 5.991 5.991 0 0 0 4.306 1.011 6.078 6.078 0 0 0 4.323-1.011 5.991 5.991 0 0 0 6.51-2.9 6.046 6.046 0 0 0-.743-7.098 5.985 5.985 0 0 0 .516-4.91z"/></svg>';

        messageDiv.innerHTML = `
            <div class="message-content">
                <div class="message-avatar">${avatar}</div>
                <div class="message-text">${this.formatMessage(text)}</div>
            </div>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        console.log('Added message:', sender, text);
    }

    showTypingIndicator() {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;

        // Remove existing typing indicator
        const existing = document.getElementById('typingIndicator');
        if (existing) existing.remove();

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
        if (sendBtn) sendBtn.disabled = true;
        
        console.log('Showing typing indicator');
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
        
        console.log('Hiding typing indicator');
    }

    async generateAIResponse(userMessage) {
        console.log('Generating AI response for:', userMessage);
        
        // Simulate thinking time
        await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 2000));
        
        this.hideTypingIndicator();
        
        // Use thinking engine
        try {
            const response = this.thinkingEngine.think(userMessage);
            this.addMessage(response, 'assistant');
            console.log('AI response generated successfully');
        } catch (error) {
            console.error('Error generating AI response:', error);
            this.addMessage('I apologize, but I encountered an error processing your request. Please try again.', 'assistant');
        }
    }

    formatMessage(text) {
        return text
            .replace(/\n/g, '<br>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code>$1</code>');
    }
}
