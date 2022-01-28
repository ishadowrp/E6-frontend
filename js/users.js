
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
    fetch('http://127.0.0.1:8000/api/v1/users/', options)
        .then(response => response.json())
        .then(json => putViewUsersCards(json))
        .catch((error) => { console.log(error) });
})

async function putViewUsersCards(json) {
    let bodyForText = document.getElementById('body-chats');
    let innerHTML = "" +
        "<div class=\"row\">" +
        "<div class=\"col-md-8 fs-4 align-items-center link-dark text-decoration-none\">Users of chat:</div>" +
        "</div>" +
        "<hr>" +
        "<div style=\"height:87%\">"+
        "<div class=\"row row-cols-1 row-cols-md-3 g-4\" style=\"overflow:auto\">";

    for (const element of json) {
        let urlPhoto = await getUrlPhoto(element.id);
        let extBtn = "<a href=\"./private-messages.html\" class=\"btn btn-outline-secondary btn-sm\">Send message</a>";
        innerHTML += "<div class=\"col\">" +
            "<div class=\"card mb-3\" style=\"max-width: 540px;\">" +
            "<div class=\"row g-0\">"+
            "<div class=\"col-md-4\">"+
            "<img src=\""+(urlPhoto !== undefined? urlPhoto : "../img/person.svg")+"\" class=\"img-fluid rounded-start\" alt=\"avatar\">"+
            "</div>"+
            "<div class=\"col-md-8\">"+
            "<div class=\"card-body\">" +
            "<div class=\"card-title\">"+element.username+"</div>"+
            extBtn+
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>";
    }
    innerHTML += "</div></div><hr>";
    bodyForText.innerHTML = innerHTML;
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
