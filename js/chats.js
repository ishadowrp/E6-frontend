
document.addEventListener("DOMContentLoaded", () => {
    let options = {
        // Будем использовать метод GET
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem('chatToken'),
        },
    }
    // Делаем запрос за данными
    fetch('http://127.0.0.1:8000/api/v1/chats/', options)
        .then(response => response.json())
        .then(json => putViewChatCards(json))
        .catch((error) => {
            console.log(error)
        });
});

function putViewChatCards(json) {
    let bodyForText = document.getElementById('body-chats');
    let innerHTML = "<div class=\"row\">" +
        "<div class=\"col-md-8 fs-4 align-items-center link-dark text-decoration-none\">Chats to connect:</div>" +
        "<div class=\"col-md-4\">" +
        "<a href=\"./new-chat.html\" class=\"btn btn-success\">+ New chat</a>"+
        "</div>" +
        "</div>" +
        "<hr>" +
        "<div style=\"height: 87%\">"+
        "<div class=\"row row-cols-1 row-cols-md-3 g-4 chat-list\" style=\"overflow: auto;\">";
    json.forEach(function(element, i, arr) {
        // let createDate = new Date(element.date_created);
        if (element.private === false) {
            let extBtn = "";
            if (element.owner == localStorage.getItem("ownerID")) {
                extBtn = "<div class=\"btn-group btn-group-sm\" role=\"group\" aria-label=\"...\">" +
                    "<a href=\"./chat.html?id="+element.id+"\" class=\"btn btn-outline-primary\">Join</a>"+
                    "<a href=\"./chat-edit.html?id="+element.id+"\" class=\"btn btn-outline-primary\">Edit</a>" +
                    "<a href=\"./chat-delete.html?id="+element.id+"\" class=\"btn btn-outline-danger\">Delete</a></div>";
            } else {
                extBtn = "<a href=\"./chat.html?id="+element.id+"\" class=\"btn btn-outline-primary btn-sm\">Join</a>";
            }

            innerHTML += "<div class=\"col\">" +
                "<div class=\"card\">" +
                "<div class=\"card-body\">" +
                "<h5 class=\"card-title\">"+element.title+"</h5>" +
                "<h6 class=\"card-subtitle text-muted\">users: "+element.chat_users.length+"</h6>" +
                "<p class=\"card-text\">"+element.description+"</p>" +
                extBtn +
                "</div>" +
                "</div>" +
                "</div>";
        }
    })
    innerHTML += "</div></div><hr>";
    bodyForText.innerHTML = innerHTML;
}
