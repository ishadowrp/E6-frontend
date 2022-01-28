const dtnCreateJoinChat = document.querySelector('.submit-new-privateChat');
const inputUserlist = document.getElementById('UserList');

document.addEventListener("DOMContentLoaded", async() => {
    let userlistOptions = document.getElementById('UserlistOptions');
    userList = await getUserList();
    innerHTML = "";
    userList.forEach((user) => {
        if (user.id !== Number(localStorage.getItem('ownerID'))) {
            innerHTML += "<option value=\""+user.username+"\">";
        }
    })
    userlistOptions.innerHTML = innerHTML;
    localStorage.setItem('users', JSON.stringify(userList));
})

inputUserlist.addEventListener('change', () => {
    let titleText = document.getElementById('titleInput');
    let users = JSON.parse(localStorage.getItem('users'));
    let userID = users.find(user => user.username === inputUserlist.value).id;
    titleText.value = localStorage.getItem('username')+'-'+inputUserlist.value;
    localStorage.setItem('userID', userID);
})

dtnCreateJoinChat.addEventListener('click', async() => {
    let chatID = await createPrivateChat();
    localStorage.removeItem('userID');
    localStorage.removeItem('users');
    window.location.href = "./chat.html?id="+chatID;
})

async function createPrivateChat() {
    let title = document.getElementById('titleInput').value;
    let description = document.getElementById('descriptionInput').value;
    let members = [localStorage.getItem('ownerID'), localStorage.getItem('userID')];
    let options = {
        // Будем использовать метод POST
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem('chatToken'),
        },
        body: JSON.stringify({'title': title, 'chat_users': members, 'description': description, 'private': true}),
    }
    // Делаем запрос за данными
    let chat = await fetch('http://127.0.0.1:8000/api/v1/chats/', options)
        .then(response => response.json())
        .then(json => {
            return json
        })
        .catch((error) => console.log(error));
    return chat.id;
}

async function getUserList() {
    let options = {
        // Будем использовать метод GET
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem('chatToken'),
        },
    }
    // Делаем запрос за данными
    return await fetch('http://127.0.0.1:8000/api/v1/users/', options)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                return undefined;
            }
        })
        .then(jsonPD => {
            return jsonPD;
        })
        .catch((error) => { console.log(error) });
}
