// VincAI - Enhanced Main Application 
class VincAI {
    constructor() {
        this.isTyping = false;
        this.chatHistory = this.loadChatHistory();
        this.currentChatId = null;
        this.setupEventListeners();
        this.loadTheme();
        this.initializeResponsiveFeatures();
        console.log('🚀 VincAI Enhanced Active!');
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
        }

        // Send button
        const sendBtn = document.getElementById('sendBtn');
        if (sendBtn) {
            sendBtn.onclick = () => this.sendMessage();
            console.log('Send button connected');
        }

        // Message input
        const messageInput = document.getElementById('messageInput');
        if (messageInput) {
            messageInput.onkeydown = (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                } else if (e.key === 'ArrowUp' && messageInput.value === '') {
                    // Edit last message feature
                    this.editLastMessage();
                }
            };
            
            messageInput.oninput = (e) => {
                const sendBtn = document.getElementById('sendBtn');
                if (sendBtn) {
                    sendBtn.disabled = !messageInput.value.trim() || this.isTyping;
                }
                this.autoResizeTextarea(messageInput);
            };
            console.log('Message input connected');
        }

        // New chat button
        const newChatBtn = document.getElementById('newChatBtn');
        if (newChatBtn) {
            newChatBtn.onclick = () => this.startNewChat();
            console.log('New chat button connected');
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
                        this.autoResizeTextarea(messageInput);
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
                this.handleSidebarToggle();
            };
            console.log('Sidebar toggle connected');
        }

        // User menu dropdown
        const userBtn = document.getElementById('userBtn');
        const userDropdown = document.getElementById('userDropdown');
        if (userBtn && userDropdown) {
            userBtn.onclick = (e) => {
                e.stopPropagation();
                userDropdown.classList.toggle('show');
            };
            
            document.addEventListener('click', () => {
                userDropdown.classList.remove('show');
            });
        }

        // Initialize chat history
        this.renderChatHistory();

        // Add swipe gestures for mobile
        this.initializeSwipeGestures();
    }

    initializeResponsiveFeatures() {
        // Handle viewport height changes (mobile browsers)
        this.handleViewportHeight();
        
        // Initialize touch interactions
        this.initializeTouchInteractions();
        
        // Setup responsive breakpoint handling
        this.handleResponsiveBreakpoints();
        
        // Initialize keyboard shortcuts
        this.initializeKeyboardShortcuts();
    }

    handleViewportHeight() {
        const setVH = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };

        setVH();
        window.addEventListener('resize', setVH);
        window.addEventListener('orientationchange', () => {
            setTimeout(setVH, 100);
        });
    }

    initializeTouchInteractions() {
        // Add touch-friendly interactions
        const interactiveElements = document.querySelectorAll('button, .example-card, .message');
        interactiveElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            });
            
            element.addEventListener('touchend', function() {
                this.classList.remove('touch-active');
            });
        });
    }

    handleResponsiveBreakpoints() {
        const checkBreakpoint = () => {
            const width = window.innerWidth;
            document.documentElement.classList.remove('mobile', 'tablet', 'desktop');
            
            if (width <= 768) {
                document.documentElement.classList.add('mobile');
            } else if (width <= 1024) {
                document.documentElement.classList.add('tablet');
            } else {
                document.documentElement.classList.add('desktop');
            }
        };

        checkBreakpoint();
        window.addEventListener('resize', checkBreakpoint);
    }

    initializeKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + N for new chat
            if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
                e.preventDefault();
                this.startNewChat();
            }
            
            // Ctrl/Cmd + / for focus input
            if ((e.ctrlKey || e.metaKey) && e.key === '/') {
                e.preventDefault();
                const messageInput = document.getElementById('messageInput');
                if (messageInput) messageInput.focus();
            }
            
            // Escape to close sidebar/dropdowns
            if (e.key === 'Escape') {
                document.getElementById('sidebar')?.classList.remove('show');
                document.getElementById('userDropdown')?.classList.remove('show');
            }
        });
    }

    initializeSwipeGestures() {
        let startX = 0;
        let startY = 0;
        
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        document.addEventListener('touchmove', (e) => {
            if (!startX || !startY) return;
            
            const diffX = startX - e.touches[0].clientX;
            const diffY = startY - e.touches[0].clientY;
            
            // Horizontal swipe
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                const sidebar = document.getElementById('sidebar');
                if (diffX > 0) {
                    // Swipe left - close sidebar
                    sidebar?.classList.remove('show');
                } else {
                    // Swipe right - open sidebar
                    sidebar?.classList.add('show');
                }
            }
        });
        
        document.addEventListener('touchend', () => {
            startX = 0;
            startY = 0;
        });
    }

    autoResizeTextarea(textarea) {
        textarea.style.height = 'auto';
        const maxHeight = window.innerWidth <= 768 ? 120 : 160;
        textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + 'px';
    }

    handleSidebarToggle() {
        const sidebar = document.getElementById('sidebar');
        if (window.innerWidth <= 1024 && sidebar?.classList.contains('show')) {
            // Add backdrop for mobile
            this.addBackdrop();
        } else {
            this.removeBackdrop();
        }
    }

    addBackdrop() {
        if (document.querySelector('.sidebar-backdrop')) return;
        
        const backdrop = document.createElement('div');
        backdrop.className = 'sidebar-backdrop';
        backdrop.onclick = () => {
            document.getElementById('sidebar')?.classList.remove('show');
            this.removeBackdrop();
        };
        document.body.appendChild(backdrop);
    }

    removeBackdrop() {
        const backdrop = document.querySelector('.sidebar-backdrop');
        if (backdrop) backdrop.remove();
    }

    toggleTheme() {
        const body = document.body;
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Add smooth transition effect
        body.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        setTimeout(() => body.style.transition = '', 400);
        
        console.log('Theme switched to:', newTheme);
        
        // Animate theme icon
        const themeBtn = document.getElementById('themeBtn');
        if (themeBtn) {
            themeBtn.style.transform = 'rotate(360deg)';
            setTimeout(() => themeBtn.style.transform = '', 400);
        }
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.body.setAttribute('data-theme', savedTheme);
        console.log('Theme loaded:', savedTheme);
    }

    loadChatHistory() {
        const saved = localStorage.getItem('vincai-chat-history');
        return saved ? JSON.parse(saved) : [];
    }

    saveChatHistory() {
        localStorage.setItem('vincai-chat-history', JSON.stringify(this.chatHistory));
    }

    generateChatId() {
        return 'chat-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    }

    startNewChat() {
        console.log('Starting new chat');
        
        // Save current chat if it has messages
        this.saveCurrentChat();
        
        // Create new chat
        this.currentChatId = this.generateChatId();
        
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
        
        // Close sidebar on mobile
        if (window.innerWidth <= 1024) {
            document.getElementById('sidebar')?.classList.remove('show');
            this.removeBackdrop();
        }
        
        // Update chat history display
        this.renderChatHistory();
    }

    saveCurrentChat() {
        if (!this.currentChatId) return;
        
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages || chatMessages.children.length === 0) return;
        
        const messages = Array.from(chatMessages.querySelectorAll('.message:not(.typing)')).map(msg => {
            const isUser = msg.classList.contains('user');
            const text = msg.querySelector('.message-text').textContent;
            return { text, sender: isUser ? 'user' : 'assistant' };
        });
        
        if (messages.length === 0) return;
        
        const existingIndex = this.chatHistory.findIndex(chat => chat.id === this.currentChatId);
        const chatData = {
            id: this.currentChatId,
            title: this.generateChatTitle(messages[0].text),
            messages: messages,
            timestamp: Date.now()
        };
        
        if (existingIndex >= 0) {
            this.chatHistory[existingIndex] = chatData;
        } else {
            this.chatHistory.unshift(chatData);
        }
        
        // Keep only last 50 chats
        this.chatHistory = this.chatHistory.slice(0, 50);
        this.saveChatHistory();
    }

    generateChatTitle(firstMessage) {
        const words = firstMessage.split(' ').slice(0, 6).join(' ');
        return words.length > 40 ? words.substring(0, 40) + '...' : words;
    }

    loadChat(chatId) {
        const chat = this.chatHistory.find(c => c.id === chatId);
        if (!chat) return;
        
        this.saveCurrentChat(); // Save current before switching
        this.currentChatId = chatId;
        
        // Show chat container
        this.showChatContainer();
        
        // Clear and load messages
        const chatMessages = document.getElementById('chatMessages');
        if (chatMessages) {
            chatMessages.innerHTML = '';
            chat.messages.forEach(msg => {
                this.addMessage(msg.text, msg.sender, false);
            });
        }
        
        // Close sidebar on mobile
        if (window.innerWidth <= 1024) {
            document.getElementById('sidebar')?.classList.remove('show');
            this.removeBackdrop();
        }
    }

    renderChatHistory() {
        const chatHistoryEl = document.getElementById('chatHistory');
        if (!chatHistoryEl) return;
        
        chatHistoryEl.innerHTML = '';
        
        this.chatHistory.forEach(chat => {
            const chatEl = document.createElement('div');
            chatEl.className = 'chat-item';
            if (chat.id === this.currentChatId) {
                chatEl.classList.add('active');
            }
            
            chatEl.innerHTML = `
                <div class="chat-item-content">
                    <div class="chat-title">${chat.title}</div>
                    <div class="chat-preview">${this.formatTimestamp(chat.timestamp)}</div>
                </div>
                <button class="chat-delete-btn" onclick="app.deleteChat('${chat.id}', event)">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        <line x1="10" y1="11" x2="10" y2="17"/>
                        <line x1="14" y1="11" x2="14" y2="17"/>
                    </svg>
                </button>
            `;
            
            chatEl.onclick = (e) => {
                if (!e.target.closest('.chat-delete-btn')) {
                    this.loadChat(chat.id);
                }
            };
            
            chatHistoryEl.appendChild(chatEl);
        });
    }

    deleteChat(chatId, event) {
        event.stopPropagation();
        
        if (confirm('Delete this chat?')) {
            this.chatHistory = this.chatHistory.filter(c => c.id !== chatId);
            this.saveChatHistory();
            
            if (this.currentChatId === chatId) {
                this.startNewChat();
            } else {
                this.renderChatHistory();
            }
        }
    }

    formatTimestamp(timestamp) {
        const now = Date.now();
        const diff = now - timestamp;
        const minutes = Math.floor(diff / (1000 * 60));
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        
        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        if (days < 7) return `${days}d ago`;
        
        return new Date(timestamp).toLocaleDateString();
    }

    editLastMessage() {
        const messages = document.querySelectorAll('.message.user');
        if (messages.length === 0) return;
        
        const lastUserMessage = messages[messages.length - 1];
        const messageText = lastUserMessage.querySelector('.message-text').textContent;
        
        const messageInput = document.getElementById('messageInput');
        if (messageInput) {
            messageInput.value = messageText;
            this.autoResizeTextarea(messageInput);
            messageInput.focus();
            messageInput.setSelectionRange(messageText.length, messageText.length);
        }
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
        
        // Create new chat if needed
        if (!this.currentChatId) {
            this.currentChatId = this.generateChatId();
        }
        
        // Show chat container
        this.showChatContainer();
        
        // Add user message with animation
        this.addMessage(text, 'user');
        
        // Clear input and reset height
        messageInput.value = '';
        messageInput.style.height = 'auto';
        
        // Disable send button
        const sendBtn = document.getElementById('sendBtn');
        if (sendBtn) sendBtn.disabled = true;
        
        // Generate AI response (with improved placeholder logic)
        this.generateEnhancedResponse(text);
    }

    showChatContainer() {
        const welcomeScreen = document.getElementById('welcomeScreen');
        const chatContainer = document.getElementById('chatContainer');
        
        if (welcomeScreen) {
            welcomeScreen.style.display = 'none';
        }
        if (chatContainer) {
            chatContainer.style.display = 'flex';
        }
    }

    addMessage(text, sender, animate = true) {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) {
            console.log('Chat messages container not found');
            return;
        }

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        if (animate) {
            messageDiv.style.opacity = '0';
            messageDiv.style.transform = 'translateY(20px)';
        }
        
        const avatar = sender === 'user' ? 
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>' :
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.078 6.078 0 0 0 6.527 2.9 5.991 5.991 0 0 0 4.306 1.011 6.078 6.078 0 0 0 4.323-1.011 5.991 5.991 0 0 0 6.51-2.9 6.046 6.046 0 0 0-.743-7.098 5.985 5.985 0 0 0 .516-4.91z"/></svg>';

        const formattedText = this.formatMessageText(text);
        
        messageDiv.innerHTML = `
            <div class="message-content">
                <div class="message-avatar">${avatar}</div>
                <div class="message-text">${formattedText}</div>
                <div class="message-actions">
                    <button class="message-action-btn copy-btn" onclick="app.copyMessage(this)" title="Copy">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                    </button>
                    ${sender === 'assistant' ? `
                        <button class="message-action-btn regenerate-btn" onclick="app.regenerateResponse(this)" title="Regenerate">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M1 4v6h6"></path>
                                <path d="M23 20v-6h-6"></path>
                                <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
                            </svg>
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
        
        chatMessages.appendChild(messageDiv);
        
        // Animate message appearance
        if (animate) {
            requestAnimationFrame(() => {
                messageDiv.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                messageDiv.style.opacity = '1';
                messageDiv.style.transform = 'translateY(0)';
            });
        }
        
        chatMessages.scrollTop = chatMessages.scrollHeight;
        console.log('Message added:', sender, text);
    }

    formatMessageText(text) {
        // Basic markdown formatting
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code>$1</code>')
            .replace(/\n/g, '<br>')
            .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
    }

    copyMessage(button) {
        const messageText = button.closest('.message').querySelector('.message-text').textContent;
        navigator.clipboard.writeText(messageText).then(() => {
            this.showToast('Message copied to clipboard!');
            
            // Visual feedback
            const icon = button.querySelector('svg');
            const originalIcon = icon.innerHTML;
            icon.innerHTML = '<path d="M20 6L9 17l-5-5"></path>';
            setTimeout(() => icon.innerHTML = originalIcon, 1000);
        });
    }

    regenerateResponse(button) {
        const messageEl = button.closest('.message');
        const previousMessage = messageEl.previousElementSibling;
        
        if (previousMessage && previousMessage.classList.contains('user')) {
            const userText = previousMessage.querySelector('.message-text').textContent;
            messageEl.remove();
            this.generateEnhancedResponse(userText);
        }
    }

    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => toast.classList.add('show'), 100);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    generateEnhancedResponse(userMessage) {
        this.isTyping = true;
        const sendBtn = document.getElementById('sendBtn');
        if (sendBtn) sendBtn.disabled = true;

        console.log('🤖 Generating enhanced response for:', userMessage);
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Simulate realistic response time
        const responseTime = Math.random() * 2000 + 1500; // 1.5-3.5 seconds
        
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.getSmartPlaceholderResponse(userMessage);
            this.addMessage(response, 'assistant');
            this.isTyping = false;
            if (sendBtn) sendBtn.disabled = false;
            
            // Save chat after response
            this.saveCurrentChat();
        }, responseTime);
    }

    getSmartPlaceholderResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        
        // Greeting responses
        if (lowerMessage.match(/^(hello|hi|hey|greetings|good morning|good afternoon|good evening)/)) {
            const greetings = [
                "Hello! I'm VincAI, your advanced AI assistant. I'm here to help you with any questions or tasks you have. What can I assist you with today?",
                "Hi there! Welcome to VincAI. I'm equipped with extensive knowledge and ready to help you explore any topic or solve any problem. How can I help?",
                "Greetings! I'm VincAI, powered by cutting-edge AI technology. I'm here to provide intelligent assistance and engaging conversations. What would you like to discuss?"
            ];
            return greetings[Math.floor(Math.random() * greetings.length)];
        }
        
        // Question responses
        if (lowerMessage.startsWith('what is') || lowerMessage.startsWith('what are')) {
            return `That's a great question about ${userMessage.substring(7)}! I'd be happy to provide a comprehensive explanation with current information, examples, and detailed insights. In the full version, I would search through the latest sources to give you the most accurate and up-to-date information available.
            
**Key aspects I would cover:**
• Definition and core concepts
• Real-world applications and examples  
• Current trends and developments
• Expert insights and analysis
• Related topics you might find interesting

*Note: This is a demo response. The full version would provide detailed, researched information.*`;
        }
        
        // How-to questions
        if (lowerMessage.startsWith('how to') || lowerMessage.startsWith('how do i') || lowerMessage.startsWith('how can i')) {
            return `I'd be delighted to help you with ${userMessage}! Here's what I would provide in the full version:

**📋 Step-by-step guide:**
1. Comprehensive preparation steps
2. Detailed implementation process
3. Best practices and pro tips
4. Common pitfalls to avoid
5. Advanced techniques for optimization

**🛠️ Additional resources:**
• Recommended tools and software
• Expert tutorials and guides
• Community forums and support
• Success metrics and evaluation

*This demo shows the structure I would use. The full version would include specific, actionable instructions tailored to your exact needs.*`;
        }
        
        // Coding/Technical questions
        if (lowerMessage.match(/(code|programming|javascript|python|react|css|html|api|database|algorithm)/)) {
            return `Excellent technical question! For ${userMessage}, I would provide:

**💻 Code Examples:**
\`\`\`
// Well-commented, production-ready code examples
// Best practices and modern approaches
// Multiple implementation strategies
\`\`\`

**🔧 Technical Details:**
• Architecture considerations
• Performance optimization tips
• Security best practices
• Testing strategies
• Documentation standards

**📚 Learning Resources:**
• Official documentation links
• Community tutorials
• GitHub repositories
• Stack Overflow discussions

*In the full version, I would analyze your specific requirements and provide working code with detailed explanations.*`;
        }
        
        // Creative/Writing requests
        if (lowerMessage.match(/(write|create|generate|compose|draft)/)) {
            return `I'd love to help you create ${userMessage.substring(userMessage.indexOf(' '))}! Here's my approach:

**✍️ Content Structure:**
• Engaging introduction that hooks the reader
• Well-organized main content with clear flow
• Strong conclusion that reinforces key points
• Appropriate tone for your target audience

**🎨 Creative Elements:**
• Compelling headlines and subheadings
• Vivid descriptions and engaging language
• Relevant examples and analogies
• Proper formatting for readability

**📊 Quality Assurance:**
• Grammar and style optimization
• Factual accuracy verification
• SEO considerations (if applicable)
• Multiple revision options

*This demo shows my writing process. The full version would deliver polished, original content tailored to your specific needs.*`;
        }
        
        // Analysis/Research questions
        if (lowerMessage.match(/(analyze|compare|research|study|investigate)/)) {
            return `Fascinating topic for analysis! For ${userMessage}, I would conduct:

**🔍 Comprehensive Research:**
• Multiple authoritative sources
• Current data and statistics  
• Expert opinions and analysis
• Historical context and trends

**📊 Detailed Analysis:**
• Strengths and weaknesses comparison
• Pros and cons evaluation
• Risk assessment and opportunities
• Evidence-based conclusions

**📈 Data Visualization:**
• Charts and graphs (where applicable)
• Comparison tables
• Timeline of developments
• Key metric summaries

*This is a preview of my analytical approach. The full version would provide in-depth research with cited sources and actionable insights.*`;
        }
        
        // Business/Strategy questions
        if (lowerMessage.match(/(business|strategy|marketing|startup|investment|finance|revenue)/)) {
            return `Great business question! I'd provide strategic insights for ${userMessage}:

**💼 Business Analysis:**
• Market opportunity assessment
• Competitive landscape overview
• Target audience identification
• Revenue model optimization

**🎯 Strategic Recommendations:**
• Short-term tactical actions
• Long-term strategic planning
• Risk mitigation strategies
• Performance metrics and KPIs

**📈 Growth Opportunities:**
• Scaling strategies
• Partnership possibilities
• Innovation areas
• Market expansion options

*This demonstrates my business acumen. The full version would include detailed market research, financial projections, and actionable business plans.*`;
        }
        
        // General knowledge
        if (lowerMessage.match(/(explain|describe|tell me about)/)) {
            const topic = userMessage.replace(/(explain|describe|tell me about)/i, '').trim();
            return `I'd be happy to explain ${topic} in detail! My comprehensive response would include:

**🧠 Core Concepts:**
• Fundamental principles and definitions
• Historical background and development
• Key components and mechanisms
• Current understanding and theories

**🌍 Real-World Context:**
• Practical applications and examples
• Impact on society and individuals
• Current trends and future outlook
• Related fields and connections

**📖 Educational Value:**
• Different levels of complexity explained
• Visual aids and analogies
• Common misconceptions clarified
• Further learning resources

*This is a structured preview. The full version would provide expertly researched, detailed explanations tailored to your level of interest.*`;
        }
        
        // Default response for any other input
        const defaultResponses = [
            `Thank you for your question: "${userMessage}"

I'm VincAI, and I would typically provide a comprehensive, well-researched response by:

**🔍 Information Gathering:**
• Searching current databases and sources
• Cross-referencing multiple authoritative references
• Analyzing recent developments and trends
• Verifying facts and accuracy

**🧠 Intelligent Analysis:**
• Processing complex information patterns
• Generating insights and connections
• Providing multiple perspectives
• Offering practical applications

**📝 Structured Response:**
• Clear, organized presentation
• Examples and case studies
• Step-by-step guidance when applicable
• Additional resources for deeper learning

*This is a demo response showing my capabilities. The full version would provide specific, detailed answers tailored to your exact question.*`,

            `Interesting question about "${userMessage}"! Here's how I would approach this:

**🎯 Targeted Response Strategy:**
• Understanding the specific context and nuance
• Identifying the most relevant information
• Structuring the response for maximum clarity
• Including practical, actionable insights

**💡 Value-Added Elements:**
• Current trends and developments
• Expert perspectives and opinions  
• Real-world examples and case studies
• Potential challenges and solutions

**🔄 Interactive Follow-up:**
• Anticipating related questions
• Suggesting next steps or actions
• Providing additional resources
• Encouraging deeper exploration

*This demonstrates my analytical approach. The full version would deliver precise, comprehensive answers with thorough research and expert-level insights.*`
        ];
        
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
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
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
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

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    window.app = new VincAI();
});

// Fallback initialization
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        if (!window.app) {
            window.app = new VincAI();
        }
    });
} else {
    if (!window.app) {
        window.app = new VincAI();
    }
}
