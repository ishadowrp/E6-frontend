const btnNewChat = document.querySelector('.submit-newChat');

btnNewChat.addEventListener('click', () => {
    let title = document.getElementById('titleInput').value;
    let description = document.getElementById('descriptionInput').value;
    let options = {
        // Будем использовать метод POST
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem('chatToken'),
        },
        body: JSON.stringify({'title': title, 'description': description, 'private': false}),
    }
    // Делаем запрос за данными
    fetch('http://127.0.0.1:8000/api/v1/chats/', options)
        .then(response => {
            if (response.status === 201) {
                window.location.href = "./chats.html";
            } else {
                return response.json();
            }
        })
        .then(json => {
            updError(json);
        })
        .catch((error) => console.log(error));
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
