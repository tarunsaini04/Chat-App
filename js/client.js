const socket=io('https://chat-app-backend-ec8y.onrender.com');

const form=document.getElementById('sendContainer');
const massageInput=document.getElementById('messageInp');
const massageContainer=document.querySelector(".container");
const container = document.getElementById('scrollContainer');
    
var audio=new Audio('ping.mp3');

const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    massageContainer.append(messageElement);
    container.scrollTop = container.scrollHeight;
    if(position=='left')
        audio.play();
}

const name=prompt("Enter your name");
socket.emit('new-user-joined',name);

socket.on('user-joined',name=>{
    append(`${name} joined the chat`,'left');
})

socket.on('receive',data=>{
    append(`${data.name}: ${data.message}`,'left');
})

socket.on('left',name=>{
    append(`${name} left the chat`,'left');
})

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = massageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    massageInput.value = ''
})
