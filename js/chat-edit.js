const btnChatEdit = document.querySelector('.btn-chat-edit');

document.addEventListener("DOMContentLoaded", () => {
    let params = (new URL(document.location)).searchParams;
    let options = {
        // Будем использовать метод GET
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem('chatToken'),
        },
    }
    // Делаем запрос за данными
    fetch('http://127.0.0.1:8000/api/v1/chats/'+params.get("id")+"/", options)
        .then(response => response.json())
        .then(json => {
            let title = document.getElementById('titleEditInput');
            let description = document.getElementById('descriptionEditInput');
            title.value = json.title;
            description.value = json.description;
        })
        .catch((error) => { console.log(error) });
})

btnChatEdit.addEventListener('click', () => {
    let title = document.getElementById('titleEditInput').value;
    let description = document.getElementById('descriptionEditInput').value;
    let params = (new URL(document.location)).searchParams;
    let options = {
        // Будем использовать метод PUT
        method: 'PUT',
        headers: {
            // Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem('chatToken'),
        },
        body: JSON.stringify({'title': title, 'description': description}),
    }
    // Делаем запрос за данными
    fetch('http://127.0.0.1:8000/api/v1/chats/'+params.get("id")+'/', options)
        .then(response => response.json())
        .then(json => updateChat(json))
        .catch((error) => console.log(error));

})

function updateChat(json) {
    if (json.detail !== undefined) {
        updError(json);
    } else {
        updComplete();
    }
}

function updComplete() {
    let textDone = document.querySelector('.update-done');
    let innerHTML = 'Data updated successfully!';
    textDone.innerHTML = innerHTML;
}

function updError(error) {
    let textErrors = document.querySelector('.update-errors');
    let innerHTML = 'Errors: '+"<br>"+"<ul>";
    for (key in error) {
        innerHTML += "<li>"+key+' - '+error[key]+"</li>";
    }
    innerHTML += "</ul>";
    textErrors.innerHTML = innerHTML;
}

