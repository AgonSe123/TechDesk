document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.querySelector('.chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const newChatBtn = document.getElementById('new-chat-btn');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const chatSidebar = document.querySelector('.chat-sidebar');
    const historyItems = document.querySelectorAll('.history-item');
    
    const sampleResponses = [
        "I'd be happy to help with that. Can you provide more details about your issue?",
        "That's a great question! Our system can handle that automatically for you.",
        "I understand your concern. Let me check our knowledge base for the best solution.",
        "For that issue, I recommend checking our FAQ section or contacting our support team.",
        "Thanks for reaching out! I'm looking into this for you now.",
        "I've documented your request and our team will follow up if needed."
    ];

    function init() {
        loadChatHistory();
        setupEventListeners();
        
        // Close sidebar by default on mobile
        if (window.innerWidth <= 992) {
            chatSidebar.classList.remove('visible');
        }
    }
    
    function setupEventListeners() {
        sendButton.addEventListener('click', handleUserMessage);
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleUserMessage();
            }
        });
        
        newChatBtn.addEventListener('click', startNewChat);
        sidebarToggle.addEventListener('click', toggleSidebar);
        
        historyItems.forEach(item => {
            item.addEventListener('click', () => {
                historyItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                simulateChatLoad(item.querySelector('span').textContent);
            });
        });
    }
    
    function toggleSidebar() {
        chatSidebar.classList.toggle('visible');
        
        if (chatSidebar.classList.contains('visible')) {
            document.addEventListener('click', handleOutsideClick, true);
        } else {
            document.removeEventListener('click', handleOutsideClick, true);
        }
    }
    
    function handleOutsideClick(event) {
        if (!chatSidebar.contains(event.target) && 
            event.target !== sidebarToggle && 
            !sidebarToggle.contains(event.target)) {
            toggleSidebar();
        }
    }
    
    function handleUserMessage() {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, true);
            userInput.value = '';
            showTypingIndicator();
            
            setTimeout(() => {
                hideTypingIndicator();
                const randomResponse = sampleResponses[
                    Math.floor(Math.random() * sampleResponses.length)
                ];
                addMessage(randomResponse);
                updateCurrentChatTitle(message);
                saveCurrentChat();
            }, 1500 + Math.random() * 2000);
        }
    }
    
    function addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', isUser ? 'user-message' : 'ai-message');
        
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas ${isUser ? 'fa-user' : 'fa-robot'}"></i>
            </div>
            <div class="message-content">
                <p>${content}</p>
                <div class="message-time">${timeString}</div>
            </div>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.classList.add('typing-indicator');
        typingDiv.id = 'typing-indicator';
        
        typingDiv.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    function startNewChat() {
        chatMessages.innerHTML = '';
        addMessage("Hello! I'm your AI support assistant. What would you like to talk about today?", false);
        updateActiveChatInHistory("New Conversation");
        userInput.focus();
    }
    
    function updateCurrentChatTitle(firstMessage) {
        const activeChat = document.querySelector('.history-item.active');
        if (activeChat) {
            const title = firstMessage.length > 20 
                ? firstMessage.substring(0, 20) + '...' 
                : firstMessage;
            activeChat.querySelector('span').textContent = title;
            
            const now = new Date();
            const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            activeChat.querySelector('small').textContent = timeString;
        }
    }
    
    function updateActiveChatInHistory(title) {
        historyItems.forEach(item => item.classList.remove('active'));
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        const firstItem = document.querySelector('.history-item');
        if (firstItem) {
            firstItem.querySelector('span').textContent = title;
            firstItem.querySelector('small').textContent = 'Just now';
            firstItem.classList.add('active');
        }
    }
    
    function simulateChatLoad(title) {
        chatMessages.innerHTML = '';
        addMessage(`You opened the chat about: ${title}`, false);
        addMessage("How can I continue helping you with this?", false);
    }
    
    function loadChatHistory() {
        console.log("Loading chat history...");
    }
    
    function saveCurrentChat() {
        console.log("Saving current chat...");
    }
    
    init();
});