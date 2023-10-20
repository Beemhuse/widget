(function() {
    const conversationId = 10
    const userId = 10
    const customerId = 5
    
    const ChatWidget = {
        socket: null,
        init: function() {
            const linkElement = document.createElement('link');
            linkElement.rel = 'stylesheet';
            // linkElement.href = 'style.css'; // Adjust the path if needed
            linkElement.href = 'https://beemhuse.github.io/widget-styles/style.css'; // Adjust the path if needed
        
            // Append the link element to the head of the document
            document.head.appendChild(linkElement);

            const socketUrl = `wss://api.andromedia.cc/ws/chat/${conversationId}/`;

            const chatWidgetContainer = document.createElement('div');
            chatWidgetContainer.id = 'chatWidgetContainer';
            chatWidgetContainer.classList.add('hidden');

            document.body.appendChild(chatWidgetContainer);
           
            const chatIcon = document.createElement('img');
            chatIcon.src = 'https://res.cloudinary.com/dj3zrsni6/image/upload/v1697742309/chat/chat-icon_lyz27d.png';
            chatIcon.style.cursor = 'pointer';
            chatIcon.classList.add('chat_open');

            document.body.appendChild(chatIcon);
            const chatContainer = document.createElement('div');
            chatContainer.style.overflow = 'auto';
            chatContainer.classList.add('chat-container');

            const messageContainer = document.createElement('div');
            messageContainer.classList.add('message-container');
            
            const topContainer = document.createElement('div');
            topContainer.classList.add('top_container');
            

            const inputElement = document.createElement('input');
            inputElement.setAttribute('type', 'text');
            inputElement.setAttribute('placeholder', 'Type your message...');
            inputElement.classList.add('message-input');

            messageContainer.appendChild(inputElement); 
            chatContainer.appendChild(messageContainer); 

            // Create the button element to close the chat
            const closeButton = document.createElement('img');
            closeButton.classList.add('close_button');
            closeButton.src = 'https://res.cloudinary.com/dj3zrsni6/image/upload/v1697742309/chat/icons-close_kr11ry.png';
            closeButton.style.cursor = 'pointer';
            
            
            
            closeButton.addEventListener('click', toggleChatWidget);
            topContainer.appendChild(closeButton);
            
            // Elements inside the topContainer
            const dummyImg = document.createElement('img');
            dummyImg.classList.add('avatar');
            dummyImg.src = 'https://res.cloudinary.com/dj3zrsni6/image/upload/v1697742308/chat/avatar_ye2c4g.png';
            dummyImg.style.cursor = 'pointer';
            
            const menu = document.createElement('img');
            // menu.classList.add('');
            menu.src = 'https://res.cloudinary.com/dj3zrsni6/image/upload/v1697742309/chat/menu_vsqkeb.png';
            menu.style.cursor = 'pointer';
            
            // Text
            const p = document.createElement('p');
            p.innerText = 'You are chatting with';
            p.classList.add('title');
            topContainer.appendChild(dummyImg);
            topContainer.appendChild(p);
            topContainer.appendChild(menu);

            chatWidgetContainer.appendChild(topContainer);
            chatWidgetContainer.appendChild(chatContainer);
            this.socket = new WebSocket(socketUrl);


            function toggleChatWidget() {
                console.log('click')
                chatWidgetContainer.style.display = (chatWidgetContainer.style.display === 'none' || chatWidgetContainer.style.display === '') ? 'block' : 'none';
                // chatIcon.style.display = (chatIcon.style.display === 'none' || chatIcon.style.display === '') ? 'none' : 'block';
                chatIcon.style.display = (chatWidgetContainer.style.display === 'none') ? 'block' : 'none';
                chatIcon.src = (chatWidgetContainer.style.display === 'none') ? 'https://res.cloudinary.com/dj3zrsni6/image/upload/v1697742309/chat/chat-icon_lyz27d.png' : null;


            }
        
            // Event listener for chat icon click
            chatIcon.addEventListener('click', toggleChatWidget);
            function addChatMessage(content,  senderType) {
                console.log(senderType)
                const messageDiv = document.createElement('div');
                messageDiv.innerText = `${content}`;
                messageDiv.classList.add('chat-message')
                 if (senderType === 'user') {
        messageDiv.classList.add('user');
    } else if (senderType === 'customer') {
        messageDiv.classList.add('server'); // Assuming 'server' class corresponds to customer messages
    }
                chatContainer.appendChild(messageDiv);
            }

            const sendMessage = () => {
                if (this.socket.readyState === WebSocket.OPEN) {
                    const messageInput = inputElement.value.trim();
                    if (messageInput) {
                        const message = {
                            message: messageInput,
                            conversation: conversationId,
                            sender_id: userId,
                            receiver_id: customerId,
                            sender_type: 'customer',
                            receiver_type: 'user',
                            created_at: new Date()
                        };
                        this.socket.send(JSON.stringify(message));
                        addChatMessage(messageInput);
                        inputElement.value = '';
                    }
                } else {
                    console.error('WebSocket connection is closed. Unable to send message.');
                
                }
            };
    
    const sendButton = document.createElement('img');
    sendButton.src = 'https://res.cloudinary.com/dj3zrsni6/image/upload/v1697742309/chat/send-icon_moe1uo.png';
    sendButton.style.cursor = 'pointer';
    sendButton.addEventListener('click', sendMessage);

    messageContainer.appendChild(sendButton); // Add send button to chat container

            this.socket.addEventListener('message', (event) => {
                const message = JSON.parse(event.data);
                console.log({message})
                if (message.type === 'message') {
                    const messageItem = JSON.parse(message.message);
                    const senderType = (messageItem.sender_type === 'customer') ? 'User' : 'Server';
                    addChatMessage(messageItem.message, senderType);
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
    } else {
        // If there is no initialization function, call the init method directly
        ChatWidget.init();
    }
    
})();
