const btnChatDelete = document.querySelector('.btn-chat-delete');

btnChatDelete.addEventListener('click', () => {
    let params = (new URL(document.location)).searchParams;
    let options = {
        // Будем использовать метод DELETE
        method: 'DELETE',
        headers: {
            // Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem('chatToken'),
        },
    }
    // Делаем запрос за данными
    fetch('http://127.0.0.1:8000/api/v1/chats/'+params.get("id")+'/', options)
        .then(response => response.json())
        .then(json => {
            if (json.detail !== undefined) {
                updError(json);
            }
        })
        .catch((error) => console.log(error));
    window.location.href = "./chats.html";
})

function updError(error) {
    let textErrors = document.querySelector('.update-errors');
    let innerHTML = 'Errors: '+"<br>"+"<ul>";
    for (key in error) {
        innerHTML += "<li>"+key+' - '+error[key]+"</li>";
    }
    innerHTML += "</ul>";
    textErrors.innerHTML = innerHTML;
}
