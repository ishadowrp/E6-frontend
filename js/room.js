let params = (new URL(document.location)).searchParams;
const chatToken = localStorage.getItem('chatToken');
const endpoint = 'ws://'
    + window.location.hostname
    + ':8000/ws/chat/'
    + params.get("id")
    + '/'
    + "?token="
    + chatToken;

const chatSocket = new WebSocket(endpoint);

async function getUrlPhoto(id) {
    let options = {
        // Будем использовать метод GET
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem('chatToken'),
        },
    }
    // Делаем запрос за данными
    let urlPhoto = await fetch('http://127.0.0.1:8000/api/v1/profiles/'+id+'/', options)
        .then(response => response.json())
        .then(jsonPD => {
            if (jsonPD.avatar_photo !== undefined) {
                return jsonPD.avatar_photo;
            } else {
                return undefined;
            }
        })
        .catch((error) => { console.log(error) });

    return urlPhoto;
}

chatSocket.onmessage = async function(e) {
    const data = JSON.parse(e.data);
    let urlPhoto = await getUrlPhoto(data.userID);
    if (localStorage.getItem('username') !== data.username) {
        let innerHTML = "" +
            "<div class=\"direct-chat-msg\">\n" +
            "   <div class=\"direct-chat-info clearfix\">" +
            "       <span class=\"direct-chat-name pull-left\">"+data.username+"</span>" +
            "       <span class=\"direct-chat-timestamp pull-right\">"+data.created+"</span>" +
            "   </div>" +
            "   <img class=\"direct-chat-img\" src=\""+(urlPhoto !== undefined? urlPhoto : "../img/person.svg")+"\" alt=\"message user image\">\n" +
            "   <div class=\"direct-chat-text\">"+data.message+"</div>\n" +
            "</div>\n";
        document.querySelector('#chat-log').innerHTML += innerHTML;
    } else {
        let innerHTML = "" +
            "<div class=\"direct-chat-msg right\">\n" +
            "    <div class=\"direct-chat-info clearfix\"> " +
            "        <span class=\"direct-chat-name pull-right\">"+data.username+"</span> " +
            "        <span class=\"direct-chat-timestamp pull-left\">"+data.created+"</span> " +
            "    </div> " +
            "    <img class=\"direct-chat-img\" src=\""+(urlPhoto !== undefined? urlPhoto : "../img/person.svg")+"\" alt=\"message user image\">\n" +
            "    <div class=\"direct-chat-text\">"+data.message+"</div>\n" +
            "</div>\n";
        document.querySelector('#chat-log').innerHTML += innerHTML;
    }
};

chatSocket.onclose = function(e) {
    console.error('Chat socket closed unexpectedly');
};

document.querySelector('#chat-message-input').focus();
document.querySelector('#chat-message-input').onkeyup = function(e) {
    if (e.keyCode === 123) {  // enter, return
        const messageInputDom = document.querySelector('#chat-message-input');
        const message = messageInputDom.value;
        chatSocket.send(JSON.stringify({
            'message': message
        }));
        messageInputDom.value = '';
    }
};

document.querySelector('#chat-message-submit').onclick = function(e) {
    const messageInputDom = document.querySelector('#chat-message-input');
    const message = messageInputDom.value;
    chatSocket.send(JSON.stringify({
        'message': message
    }));
    messageInputDom.value = '';
};
