document.addEventListener("DOMContentLoaded", async() => {
    let params = (new URL(document.location)).searchParams;
    let chatInfo = await getChatInfo(params.get("id"));
    let titleChat = document.getElementById('titleChatRoom');
    titleChat.innerHTML = "Room: "+chatInfo.title;

    for (const element of chatInfo.messages) {

        let urlPhoto = await getUrlPhoto(element.author_id);

        if (localStorage.getItem('username') !== element.author) {
            let innerHTML = "" +
                "<li class=\"chat-left\">"+
                "    <div class=\"chat-avatar\">"+
                "       <img src=\""+(urlPhoto !== undefined? urlPhoto : "https://www.bootdey.com/img/Content/avatar/avatar3.png")+"\" alt=\"Left avatar\">"+
                "       <div class=\"chat-name\">"+element.author+"</div>"+
                "    </div>"+
                "    <div class=\"chat-text\">"+element.content+"</div>"+
                "<div class=\"chat-hour\">"+element.date_posted+" <span class=\"fa fa-check-circle\"></span></div>"+
                "</li>";
            document.querySelector('#chat-log').innerHTML += innerHTML;
        } else {
            let innerHTML = "" +
                "<li class=\"chat-right\">\n" +
                "    <div class=\"chat-hour\">"+element.date_posted+" <span class=\"fa fa-check-circle\"></span></div>\n" +
                "    <div class=\"chat-text\">"+element.content+"</div>\n" +
                "    <div class=\"chat-avatar\">\n" +
                "        <img src=\""+(urlPhoto !== undefined? urlPhoto : "https://www.bootdey.com/img/Content/avatar/avatar3.png")+"\" alt=\"Right avatar\">\n" +
                "        <div class=\"chat-name\">"+element.author+"</div>\n" +
                "    </div>\n" +
                "</li>\n";
            document.querySelector('#chat-log').innerHTML += innerHTML;
        }
    }
    document.querySelector('#chat-log').scrollTo(0, document.querySelector('#chat-log').scrollHeight);
    if (!chatInfo.private && chatInfo.chat_users.find(user => user.id == (localStorage.getItem('ownerID'))) == undefined) {
        chatInfo.chat_users.push(localStorage.getItem('ownerID'));

        let options = {
            // Будем использовать метод PATCH
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + localStorage.getItem('chatToken'),
                'body': JSON.stringify({
                    "chat_users": chatInfo.chat_users
                })
            },
        }
        // Делаем запрос за данными
        fetch('http://127.0.0.1:8000/api/v1/chats/'+params.get("id")+'/', options)
            .then(response => {
                console.log(response);
                if (response.status!==200) {
                    console.log(response.json());
                }
            })
            .catch((error) => console.log(error));

    }
})

async function getChatInfo(id) {
    let options = {
        // Будем использовать метод GET
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem('chatToken'),
        },
    }
    // Делаем запрос за данными
    let chatInfo = await fetch('http://127.0.0.1:8000/api/v1/chat/join/'+id+'/', options)
        .then(response => response.json())
        .then(jsonPD => {
            if (jsonPD.detail == undefined) {
                return jsonPD;
            } else {
                return undefined;
            }
        })
        .catch((error) => { console.log(error) });

    return chatInfo;
}

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
