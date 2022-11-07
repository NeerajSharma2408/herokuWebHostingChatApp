// const { text } = require("express");

const socket = io()

let Username;
let textarea = document.querySelector("#textarea")
let messageArea = document.querySelector('.message__area')

do {
    Username = prompt('please enter your name')
} while (!Username)

textarea.addEventListener('keyup', (e)=>{
    if(e.key === "Enter"){
        sendMessage(e.target.value)
    }
})

function sendMessage(message){
    let msg = {
        user : Username,
        message : message.trim()
    }

    // append
    appendMessage(msg, 'outgoing')
    textarea.value = ""
    scrollToBottom()

    // send message to server
    socket.emit('message',msg)

}

function appendMessage(msg,type) {
    let mainDiv = document.createElement('div')
    let className = type

    mainDiv.classList.add(className,'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup

    messageArea.appendChild(mainDiv)
}

// receive messages

socket.on('message', (msg)=>{
    // console.log(msg)
    appendMessage(msg,'incoming')
    scrollToBottom()
})

function scrollToBottom(){ 
    messageArea.scrollTop = messageArea.scrollHeight
}