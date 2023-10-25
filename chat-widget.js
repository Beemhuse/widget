(function() {
    const conversationId = 10
    const userId = 10
    const customerId = 5
    // const BASE_URL = 'https://api.andromedia.cc/api/v1'
    const BASE_URL = 'https://django-andromedia-api-a0c055964407.herokuapp.com/api/v1'
    let socket;
    const ChatWidget = {
        init: function() {
            async function loadAxios() {
                const script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js';
                script.type = 'text/javascript';
                script.async = true;
                document.head.appendChild(script);
            
                return new Promise((resolve) => {
                    script.onload = resolve;
                });
            }

            const linkElement = document.createElement('link');
            linkElement.rel = 'stylesheet';
            // linkElement.href = 'style.css'; // Adjust the path if needed
            linkElement.href = 'https://beemhuse.github.io/widget-styles/style.css'; // Adjust the path if needed
        
            document.head.appendChild(linkElement);

            // const socketUrl = `wss://api.andromedia.cc/ws/chat/${conversationId}/`;
            const socketUrl = `wss://django-andromedia-api-a0c055964407.herokuapp.com/ws/chat/${conversationId}/`;
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
            
            
            
            closeButton.removeEventListener('click', toggleChatWidget);
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
            // getUserIP()
            // .then(ipAddress => {
            //     getCountryFromIpinfo(ipAddress);
            // })
            // .catch(error => {
            //     console.error('An error occurred:', error);
            // });

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

            function addChatMessage(messages, senderType) {
                console.log({messages})
           {  messages &&  messages.map(messageObj => {
                    const { message, sender_type  } = messageObj;
                    const messageDiv = document.createElement('div');
                    messageDiv.classList.add('chat-message');
                    // console.log({messageObj})
                    // messageDiv.innerText = `${message}`;
                    messageDiv.key = `${message}`;
            
                    if (sender_type  === 'user') {
                        messageDiv.classList.add('user');
                        messageDiv.innerText = `${message}`;

                        messageDiv.style.backgroundColor = '#DCF8C6'; // Example background color for user messages
                    } else if (sender_type  === 'customer') {
                        messageDiv.classList.add('customer');
                        messageDiv.innerText = `${message}`;

                        messageDiv.style.backgroundColor = '#FFDDC1'; // Example background color for customer messages
                    } else if (read === 'true') {
                        messageDiv.classList.add('sent-message');
                        messageDiv.style.backgroundColor = '#BEEFFF'; // Example background color for sent messages
                    }
            
                    chatContainer.appendChild(messageDiv);
                });
            }
            }
            
            // addChatMessage()

            function messageExists() {
                // Check if messages already exist in the chat container
                return chatContainer.querySelector('.chat-message') !== null;
            }

        //  Form for the email and username
        const userInfoForm = document.createElement('form');
        userInfoForm.id = 'userInfoForm';
        userInfoForm.style.display = 'none';

        const nameLabel = document.createElement('label');
        nameLabel.setAttribute('for', 'name');
        nameLabel.textContent = 'Name: ';

        const nameInput = document.createElement('input');
        nameInput.setAttribute('type', 'text');
        nameInput.setAttribute('id', 'name');
        nameInput.setAttribute('required', 'true');

        const emailLabel = document.createElement('label');
        emailLabel.setAttribute('for', 'email');
        emailLabel.textContent = 'Email: ';

        const emailInput = document.createElement('input');
        emailInput.setAttribute('type', 'email');
        emailInput.setAttribute('id', 'email');
        emailInput.setAttribute('required', 'true');

        const submitButton = document.createElement('input');
        submitButton.setAttribute('type', 'submit');
        submitButton.setAttribute('value', 'Submit');
        submitButton.classList.add('formSubmit');
        const namediv = document.createElement('div');
        namediv.classList.add('nameDiv')
        namediv.appendChild(nameLabel)
        namediv.appendChild(nameInput)

        const emailDiv = document.createElement('div');
        emailDiv.classList.add('emailDiv')
        emailDiv.appendChild(emailLabel)
        emailDiv.appendChild(emailInput)
        userInfoForm.appendChild(namediv);
        userInfoForm.appendChild(emailDiv);
            userInfoForm.appendChild(submitButton);

        chatContainer.appendChild(userInfoForm);
        let userInfo = {
            name: null,
            email: null
        };

// Create conversation Endpoint
async function createConversationAPI(conversationData) {
    await loadAxios();

    try {
        const response = await axios.post(`${BASE_URL}/conversations/create/`, conversationData);
        console.log('create conversation', response);
        if (response.status === 200) {
            return response.data;
        }
        return parseError(response);
    } catch (error) {
        return parseError(error);
    }
}
async function getConversationsMessages(conversationId) {
    await loadAxios();

    try {
        const response = await axios.get(`${BASE_URL}/conversations/${conversationId}/messages/`);
        console.log('get conversation', response);
        if (response.status === 200) {
            return response.data;
        }
        return parseError(response);
    } catch (error) {
        return parseError(error);
    }
}
// To create conversations messages
async function createConversationMessages(conversationId, conversationData) {
    await loadAxios();

    try {
        const response = await axios.post(`${BASE_URL}/conversations/${conversationId}/messages/create/`, conversationData);
        console.log('create messages', response);
        if (response.status === 200) {
            return response.data;
        }
        return parseError(response);
    } catch (error) {
        return parseError(error);
    }
}


function parseError(error) {
    const data = { error: '' }
    if (error?.response?.data) {
      data.error = error.response.data
    } else if (error?.response?.status) {
      data.error = error.response.statusText
    } else {
      data.error = error.message
    }
  
    return data
}

// call the getConversationsMessage api
function getAllConversations(){

    getConversationsMessages(10)
        .then(conversationData => {
            console.log('Conversation data:', conversationData);
            addChatMessage(conversationData);
        })
        .catch(error => {
            console.error('Error:', error);
        });

}    
getAllConversations()

            const sendMessage = () => {
                if (socket.readyState === WebSocket.OPEN) {
                    const messageInput = inputElement.value.trim();
                    if(messageExists()){
                        if (messageInput) {
                           
                            // createConversationMessagesAPI(conversationId, message)
                            const messageData = {
                                message: messageInput,
                                read: true,
                                conversation: conversationId,
                                sender_id: conversationId,
                                receiver_id: customerId,
                                sender_type: "customer",
                                receiver_type: 'user',
            
                            }
                            createConversationMessages(conversationId, messageData)
                                .then(response => {
                                    console.log('Message sent successfully:', response);

                                })
                                .catch(error => {
                                    console.error('Error sending message:', error);
                                })
                                .finally(() => {
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
                                    addChatMessage(messageInput, 'sent');
                                    inputElement.value = '';
            
                                    console.log('Socket state:', socket.readyState);
                                })
            
                          
    
                        }
                    }
                   
                    else{
                        if (!userInfo.name || !userInfo.email) {
                            userInfoForm.style.display = 'block';
                            userInfoForm.addEventListener('submit', function(event) {
                                event.preventDefault();
                                userInfo = {
                                    name: nameInput.value,
                                    email: emailInput.value
                                };
    
                                 const data = {
                                            chat_status: 'active',
                                            session_key: "200",
                                            customer_location: 'home',
                                            company: 2,
                                            agent: 1,
                                            customer: 2
                                        }
                                createConversationAPI(data)
                                .then(response => {
                                    // Handle the successful response here
                                    console.log('Conversation created successfully:', response);
                                })
                                .catch(error => {
                                    // Handle the error response here
                                    console.error('Error creating conversation:', error);
                                })
                                .finally(()=>{
                                userInfoForm.style.display = 'none';
                                sendMessage(); // Send the message after user provides name and email
                                })
    
                            });
                        } 
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

socket.addEventListener("message", async (event) => {
    console.log('Message from server:', event.data);
    try {
        const receivedMessage = JSON.parse(event.data);
        if (receivedMessage && receivedMessage.message) {
            const messageItem = JSON.parse(receivedMessage.message);
            const senderType = messageItem.sender_type;
            console.log('Sender Type:', senderType);
            if (senderType === 'system') {
                addChatMessage('', senderType, receivedMessage.conversation_data);
            } else {
                addChatMessage(messageItem.message, senderType);
            }
            
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
