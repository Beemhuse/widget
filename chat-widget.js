(function() {
    const conversationId = 10
    const userId = 10
    const customerId = 5
    
    const ChatWidget = {
        socket: null,
        init: function() {
            const socketUrl = `wss://api.andromedia.cc/ws/chat/${conversationId}/`;
            let isSending = false; // Flag to prevent multiple message sends

            const chatWidgetContainer = document.createElement('div');
            chatWidgetContainer.id = 'chatWidgetContainer';
           
            document.body.appendChild(chatWidgetContainer);

            const chatContainer = document.createElement('div');
            chatContainer.style.position = 'fixed';
            chatContainer.style.display = 'flex';
            chatContainer.style.flexDirection = 'column';
            chatContainer.style.justifyContent = 'end';
            chatContainer.style.bottom = '20px';
            chatContainer.style.right = '20px';
            chatContainer.style.width = '300px'; // Set your desired width
            chatContainer.style.height = '400px'; // Set your desired height
            chatContainer.style.border = '1px solid #ccc';
            chatContainer.style.background = '#ff0000';
            chatContainer.style.borderTopRightRadius = '20px';
            chatContainer.style.borderTopLeftRadius = '20px';

            chatContainer.style.overflow = 'auto';
            chatContainer.classList.add('chat-container');

            const inputElement = document.createElement('input');
            inputElement.setAttribute('type', 'text');
            inputElement.setAttribute('placeholder', 'Type your message...');
            inputElement.classList.add('message-input');
            chatContainer.appendChild(inputElement); // Add input element to chat container

           
            chatWidgetContainer.appendChild(chatContainer);
            this.socket = new WebSocket(socketUrl);

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
