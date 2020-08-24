const socket = io('http://localhost:8080')

const output = document.querySelector('#output');
const name = document.querySelector('#name');
const message = document.querySelector('#message');
const button = document.querySelector('#button');
const buttonChat = document.querySelector('#btn-chat');
const usersConnected = document.querySelector('#users-connected')

button.addEventListener('click', e => {
   e.preventDefault();
   socket.emit('chat', {
      id: socket.id,
      name: name.value,
      message: message.value
   });
   message.value = '';
})

socket.on('chat', message => {
   output.innerHTML += `<p class='message'><strong>${message.name}</strong> ${message.message}</p>`
})

socket.on('users', users => {
   users.forEach(user => {
      usersConnected += `
         <li>${user.name}</li>
      `
   });
})