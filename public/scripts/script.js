const socket = io();
const form = document.getElementById("comment-form");
const pageId = document.getElementById('pageId').value;
const chatInput = document.getElementById("comment-input");
const messagesDiv = document.getElementById("messages");
const chatContainer = document.getElementById("comment-section");
let usuario = document.getElementById("user");
const imagen_perfil = document.getElementById("imagen_perfil").src;

socket.emit('joinPage', pageId);

socket.on('chat', (msg) => {
    const messageElement = createMessageElement(msg);
    messagesDiv.appendChild(messageElement);
});

function createMessageElement(msg) {    
    const messageclasi = document.createElement('li');
    messageclasi.classList.add('comment-content');
    
    // Imagen de perfil por defecto
    const img = document.createElement('img');
    const image = msg.imagen_perfil;
    img.src = image;
    img.classList.add('avatar');
    messageclasi.appendChild(img);
    
    // Nombre del usuario y el mensaje
    const userText = document.createElement('strong');
    userText.textContent = `${msg.username}:`;
    messageclasi.appendChild(userText);
    
    const messageText = document.createElement('span');
    messageText.textContent = msg.message;
    messageclasi.appendChild(messageText);
    
    return messageclasi;

}

// Escuchar el historial de mensajes cuando el cliente se conecta
socket.on('loadMessages', (messages) => {
    messages.forEach(msg => {
        const messageElement = createMessageElement(msg);
        messagesDiv.appendChild(messageElement);
    });
});
// Enviar un mensaje al servidor
form.addEventListener('submit', function(e){
    e.preventDefault();
    if(!usuario){
        usuario = "Invitado";
    }
    const message = chatInput.value.trim();
    if (message) {
        socket.emit('chat', {
            pageId: pageId,   
            username: usuario.value || "Invitado", 
            message: message,
            imagen_perfil: imagen_perfil
        });

        chatInput.value = '';  
    }
});
