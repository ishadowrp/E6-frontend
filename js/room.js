let params = (new URL(document.location)).searchParams;
const btnSubmitMessage = document.getElementById("chat-message-submit");

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
        "<li class=\"chat-left\">"+
        "    <div class=\"chat-avatar\">"+
        "       <img src=\""+(urlPhoto !== undefined? urlPhoto : "https://www.bootdey.com/img/Content/avatar/avatar3.png")+"\" alt=\"Left avatar\">"+
        "       <div class=\"chat-name\">"+data.username+"</div>"+
        "    </div>"+
        "    <div class=\"chat-text\">"+data.message+"</div>"+
        "<div class=\"chat-hour\">"+data.created+" <span class=\"fa fa-check-circle\"></span></div>"+
        "</li>";
        document.querySelector('#chat-log').innerHTML += innerHTML;
    } else {
        let innerHTML = "" +
        "<li class=\"chat-right\">\n" +
        "    <div class=\"chat-hour\">"+data.created+" <span class=\"fa fa-check-circle\"></span></div>\n" +
        "    <div class=\"chat-text\">"+data.message+"</div>\n" +
        "    <div class=\"chat-avatar\">\n" +
        "        <img src=\""+(urlPhoto !== undefined? urlPhoto : "https://www.bootdey.com/img/Content/avatar/avatar3.png")+"\" alt=\"Right avatar\">\n" +
        "        <div class=\"chat-name\">"+data.username+"</div>\n" +
        "    </div>\n" +
        "</li>\n";
        document.querySelector('#chat-log').innerHTML += innerHTML;
    }
    document.querySelector('#chat-log').scrollTo(0, document.querySelector('#chat-log').scrollHeight);
};

chatSocket.onclose = function() {
    console.error('Chat socket closed unexpectedly');
};

btnSubmitMessage.addEventListener('click', () => {
    const messageInputDom = document.querySelector('#chat-message-input');
    const message = messageInputDom.value;
    chatSocket.send(JSON.stringify({
        'message': message
    }));
    messageInputDom.value = '';
})
