(function() {
    const conversationId = 10
    const userId = 10
    const customerId = 5
    
    const ChatWidget = {
        socket: null,
        init: function() {
            const linkElement = document.createElement('link');
            linkElement.rel = 'stylesheet';
            linkElement.href = 'style.css'; // Adjust the path if needed
        
            // Append the link element to the head of the document
            document.head.appendChild(linkElement);

            const socketUrl = `wss://api.andromedia.cc/ws/chat/${conversationId}/`;

            const chatWidgetContainer = document.createElement('div');
            chatWidgetContainer.id = 'chatWidgetContainer';
            chatWidgetContainer.classList.add('hidden');

            document.body.appendChild(chatWidgetContainer);
            // const chatIcon = document.createElement('button');
            // chatIcon.innerText = 'Chat';
            // chatIcon.classList.add('chat_open');
            const chatIcon = document.createElement('img');
            chatIcon.src = 'chat-icon.png';
            chatIcon.style.cursor = 'pointer';
            chatIcon.classList.add('chat_open');

            document.body.appendChild(chatIcon);
            const chatContainer = document.createElement('div');

            chatContainer.style.overflow = 'auto';
            chatContainer.classList.add('chat-container');

            const inputElement = document.createElement('input');
            inputElement.setAttribute('type', 'text');
            inputElement.setAttribute('placeholder', 'Type your message...');
            inputElement.classList.add('message-input');
            chatContainer.appendChild(inputElement); // Add input element to chat container

            // Create the button element to close the chat
            const closeButton = document.createElement('button');
            closeButton.classList.add('close_button');
            closeButton.innerText = 'Close';
            closeButton.addEventListener('click', toggleChatWidget);
            chatWidgetContainer.appendChild(closeButton);
           


            chatWidgetContainer.appendChild(chatContainer);
            this.socket = new WebSocket(socketUrl);


            function toggleChatWidget() {
                console.log('click')
                chatWidgetContainer.style.display = (chatWidgetContainer.style.display === 'none' || chatWidgetContainer.style.display === '') ? 'block' : 'none';
                // chatIcon.style.display = (chatIcon.style.display === 'none' || chatIcon.style.display === '') ? 'none' : 'block';
                chatIcon.style.display = (chatWidgetContainer.style.display === 'none') ? 'block' : 'none';
                chatIcon.src = (chatWidgetContainer.style.display === 'none') ? 'chat-icon.png' : 'path-to-chat-icon-closed.png';


            }
        
            // Event listener for chat icon click
            chatIcon.addEventListener('click', toggleChatWidget);
            function addChatMessage(content, user) {
                const messageDiv = document.createElement('div');
                messageDiv.innerText = `${user}: ${content}`;
                messageDiv.classList.add('chat-message');
                chatContainer.appendChild(messageDiv);
            }

            const sendMessage = () => {
                if (this.socket.readyState === WebSocket.OPEN) {
                    const messageInput = inputElement.value.trim();
                    if (messageInput) {
                        const message = {
                            type: 'message',
                            message: messageInput,
                            conversation: conversationId,
                            sender_id: userId,
                            receiver_id: customerId,
                            sender_type: 'customer',
                            receiver_type: 'user',
                        };
                        this.socket.send(JSON.stringify(message));
                        addChatMessage(messageInput, 'User');
                        inputElement.value = '';
                    }
                } else {
                    console.error('WebSocket connection is closed. Unable to send message.');
                
                }
            };
    
    const sendButton = document.createElement('button');
    sendButton.innerText = 'Send';
    sendButton.addEventListener('click', sendMessage);
    chatContainer.appendChild(sendButton); // Add send button to chat container

            this.socket.addEventListener('message', (event) => {
                const message = JSON.parse(event.data);
                if (message.type === 'message') {
                    const messageItem = JSON.parse(message.message);
                    addChatMessage(messageItem.message, 'Server');
                }
            });

            document.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    sendMessage();
                }
            });
        }
    };

    // Expose the ChatWidget object globally for users to access
    window.ChatWidget = ChatWidget;

    // Check if there is an initialization function called when script is loaded
    if (window.chatWidgetAsyncInit) {
        window.chatWidgetAsyncInit();
    }
})();
