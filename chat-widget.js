(function() {
    const conversationId = 10
    const userId = 10
    const customerId = 5
    
    let socket;
    const ChatWidget = {
        init: function() {
            const linkElement = document.createElement('link');
            linkElement.rel = 'stylesheet';
            // linkElement.href = 'style.css'; // Adjust the path if needed
            linkElement.href = 'https://beemhuse.github.io/widget-styles/style.css'; // Adjust the path if needed
        
            // Append the link element to the head of the document
            document.head.appendChild(linkElement);

            const socketUrl = `wss://api.andromedia.cc/ws/chat/${conversationId}/`;
            socket = new WebSocket(socketUrl)

            const chatWidgetContainer = document.createElement('div');
            chatWidgetContainer.id = 'chatWidgetContainer';
            chatWidgetContainer.classList.add('containerhidden');

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

            const closeButton = document.createElement('img');
            closeButton.classList.add('close_button');
            closeButton.src = 'https://res.cloudinary.com/dj3zrsni6/image/upload/v1698061111/chat/icons8-arrow-down-50_kcenej.png';
            closeButton.style.cursor = 'pointer';
            
            
            
            closeButton.addEventListener('click', toggleChatWidget);
            
            // Elements inside the topContainer
            const dummyImg = document.createElement('img');
            dummyImg.classList.add('avatar');
            dummyImg.src = 'https://res.cloudinary.com/dj3zrsni6/image/upload/v1697808425/chat/icons8-avatar-50_s7v65b.png';
            dummyImg.style.cursor = 'pointer';
            


            const call = document.createElement('img');
            call.classList.add('call');
            call.src = 'https://res.cloudinary.com/dj3zrsni6/image/upload/v1697808425/chat/icons8-call-48_sf2fl0.png';
            call.style.cursor = 'pointer';

            const menu = document.createElement('img');
            menu.classList.add('menu');
            menu.src = 'https://res.cloudinary.com/dj3zrsni6/image/upload/v1697742309/chat/menu_vsqkeb.png';
            menu.style.cursor = 'pointer';
            
            // Menu modal
            let modalOpened = false;

            // Event listener to show the modal when the menu is clicked
            menu.addEventListener('click', function() {
                if (!modalOpened) {
                    // Create a modal element
                    const modal = document.createElement('div');
                    modal.classList.add('modal');
            
                    // Content inside the modal
                    modal.innerHTML = `
                        <div class="modal-content">
                            <!-- modal content goes here -->
                            <p>Download transcript</p>
                            <p>Download transcript</p>
                            <p>Download transcript</p>
                            <img class="close-modal" src="https://res.cloudinary.com/dj3zrsni6/image/upload/v1697742309/chat/icons-close_kr11ry.png" />
                        </div>
                    `;
            
                    chatWidgetContainer.appendChild(modal);
            
                    modalOpened = true;
            
                    // Close the modal when the close button is clicked
                    const closeModalButton = modal.querySelector('.close-modal');
                    closeModalButton.addEventListener('click', function() {
                        chatWidgetContainer.removeChild(modal);
                        modalOpened = false; 

                    });
                }
            });


// Get IP address
// Function to get the user's IP address
            async function getUserIP() {
  try {
        const response = await fetch("http://ip-api.com/json");
        const data = await response.json();
        console.log({data})
        return data.query || 'N/A';
    } catch (error) {
        console.error('An error occurred while fetching the IP address:', error);
        return 'N/A';
    }
}

            async function getCountryFromIpinfo(ipAddress) {
  const url = `https://freeipapi.com/api/json/${ipAddress}`;
  
  try {
        const response = await fetch(url);
        console.log(response)
        const data = await response.json();
        const country = data.country || 'N/A';
        const countryName = data.countryName || 'N/A';
        const latitude = data.latitude || 'N/A';
        const longitude = data.longitude || 'N/A';
        const ip = data.ipAddress || 'N/A';
        console.log(data);

        console.log(`The country for the IPv6 address ${ipAddress} is ${countryName}`);
    } catch (error) {
        console.error('An error occurred while fetching country information:', error);
    }
}

// Usage
getUserIP()
  .then(ipAddress => {
    getCountryFromIpinfo(ipAddress);
  })
  .catch(error => {
    console.error('An error occurred:', error);
  });

            // Text
            const iconsFlex = document.createElement('div');
            iconsFlex.classList.add('iconsContainer');

            const nameContainer = document.createElement('div');
            nameContainer.classList.add('nameContainer');
            const p = document.createElement('p');
            p.innerText = 'You are chatting with';
            p.classList.add('title');
            const name = document.createElement('h2');
            name.innerText = 'Agent 1';
            name.classList.add('name');
           
        //    Online Status
        const online = document.createElement('p');
        online.innerText = 'We are online';
        online.classList.add('online');

        const onlineImg = document.createElement('img');
        onlineImg.classList.add('onlineImg');
        onlineImg.src = 'https://res.cloudinary.com/dj3zrsni6/image/upload/v1697869616/chat/icons8-dot-30_kasujc.png';
        onlineImg.style.cursor = 'pointer';

        const onlineStatus = document.createElement('div');
        onlineStatus.classList.add('onlineStatus');

        onlineStatus.appendChild(onlineImg)
        onlineStatus.appendChild(online)
        nameContainer.appendChild(p)
        nameContainer.appendChild(name)

            iconsFlex.appendChild(menu);
            iconsFlex.appendChild(call);
            iconsFlex.appendChild(closeButton);

            topContainer.appendChild(dummyImg);
            topContainer.appendChild(nameContainer);
            topContainer.appendChild(iconsFlex);
            
            chatWidgetContainer.appendChild(topContainer);
            chatWidgetContainer.appendChild(onlineStatus);
            chatWidgetContainer.appendChild(chatContainer);
            // this.socket = new WebSocket(socketUrl);


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
                    messageDiv.classList.add('user-message');
                    messageDiv.style.backgroundColor = '#DCF8C6'; // Example background color for user messages
                } else if (senderType === 'customer') {
                    messageDiv.classList.add('customer-message');
                    messageDiv.style.backgroundColor = '#FFDDC1'; // Example background color for customer messages
                }
                chatContainer.appendChild(messageDiv);
            }

            const sendMessage = () => {
                if (socket.readyState === WebSocket.OPEN) {
                    const messageInput = inputElement.value.trim();
                    if (messageInput) {
                        const message = {
                            message: messageInput,
                            conversation: conversationId,
                            sender_id: conversationId,
                            receiver_id: customerId,
                            sender_type: 'customer',
                            receiver_type: 'user',
                            created_at: new Date()
                        };
                        socket.send(JSON.stringify(message));
                        console.log('Socket state:', socket.readyState);
                        console.log('sending message to socket',message)
                        addChatMessage(messageInput);
                        inputElement.value = '';

console.log('Socket state:', socket.readyState);

                    }
                } else {
                    console.error('WebSocket connection is closed. Unable to send message.');
                
                }
            };
            
            console.log('Socket state:', socket.readyState);

            socket.addEventListener("open", (event) => {
  console.log('WebSocket connection opened:', event);
  // The WebSocket connection is now open (readyState 1)
});

console.log('Socket state:', socket.readyState);

socket.addEventListener("message", (event) => {
    console.log('Message from server:', event.data);
    try {
        const receivedMessage = JSON.parse(event.data);
        if (receivedMessage && receivedMessage.message) {
            const messageItem = JSON.parse(receivedMessage.message);
            const senderType = messageItem.sender_type;
            console.log('Sender Type:', senderType);
            addChatMessage(messageItem.message, senderType);
        } else {
            console.log('Received message with unknown format:', event.data);
        }
    } catch (error) {
        console.error('Error parsing message:', error);
    }
});



const sendButton = document.createElement('img');
            sendButton.src = 'https://res.cloudinary.com/dj3zrsni6/image/upload/v1697742309/chat/send-icon_moe1uo.png';
            sendButton.style.cursor = 'pointer';
            sendButton.addEventListener('click', sendMessage);

            messageContainer.appendChild(sendButton); 

        //     this.socket.addEventListener('message', (event) => {
        //         console.log("message", event)
        //         try {
        //             const message = JSON.parse(event.data);
        //             console.log(message)
        //             if (message) {
        //                 const messageItem = JSON.parse(message.message);
        //                 const senderType = messageItem.sender_type;
        //                 console.log('Sender Type:', senderType);
        //                 addChatMessage(messageItem.message, senderType); // Pass senderType here
        //             }
        //             else {
        //     console.log('Received message with unknown type:', message.type);
        // }
        //         } catch (error) {
        //             console.error('Error parsing message:', error);
        //         }
        //     })

            socket.addEventListener('close', (event) => {
                console.error('Socket closed:', event);
                // Attempt to reconnect here after a delay (for example, after 5 seconds)
                setTimeout(() => {
                    socket = new WebSocket(socketUrl);
                    this.init(); // Reinitialize the chat widget after reconnecting
                }, 5000);
            });    
            
          
            document.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    sendMessage();
                }
            });
        }
    };

    window.ChatWidget = ChatWidget;

    
    if (window.chatWidgetAsyncInit) {
        window.chatWidgetAsyncInit();
    } else {
        ChatWidget.init();
    }
    
})();
