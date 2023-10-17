// chat-widget.js
function initChatWidget() {
    // Dummy data for testing
    const conversationId = 10;
    const userId = 5;
    const customerId = 3;

    const socketUrl = `wss://api.andromedia.cc/ws/chat/${conversationId}/`;

    const chatWidgetContainer = document.getElementById('chatWidgetContainer');
    const chatContainer = document.createElement('div');
    chatContainer.classList.add('chat-container');

    const inputElement = document.createElement('input');
    inputElement.setAttribute('type', 'text');
    inputElement.setAttribute('placeholder', 'Type your message...');
    inputElement.classList.add('message-input');

    const sendButton = document.createElement('button');
    sendButton.innerText = 'Send';
    sendButton.addEventListener('click', sendMessage);

    chatWidgetContainer.appendChild(chatContainer);
    chatWidgetContainer.appendChild(inputElement);
    chatWidgetContainer.appendChild(sendButton);

    const socket = new WebSocket(socketUrl);

    function addChatMessage(content, user) {
        const messageDiv = document.createElement('div');
        messageDiv.innerText = `${user}: ${content}`;
        messageDiv.classList.add('chat-message');
        chatContainer.appendChild(messageDiv);
    }

    function sendMessage() {
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
            socket.send(JSON.stringify(message));
            addChatMessage(messageInput, 'User');
            inputElement.value = '';
        }
    }

    socket.addEventListener('message', (event) => {
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

// Call the initialization function
initChatWidget();
