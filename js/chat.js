const btnRooms = document.querySelector('.btn-rooms');
const btnUsers = document.querySelector('.btn-users');
const btnProfile = document.querySelector('.btn-profile');
const btnLogin = document.querySelector('.submit-login');
const btnLogout = document.querySelector('.submit-logout');
const menuLogin = document.getElementById('li-login');
const menuProfile = document.getElementById('li-profile');

if (localStorage.getItem('chatToken')) {
    btnLogin.setAttribute('display', 'none');
    btnProfile.removeAttribute('display');
} else {
    btnLogin.removeAttribute('display');
    btnProfile.setAttribute('display', 'none');
}

btnRooms.addEventListener('click', () => {
    let options = {
        // Будем использовать метод POST
        method: 'GET',
        // mode: 'no-cors',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem('Token'),
            },
        }
    // Делаем запрос за данными
    fetch('http://127.0.0.1:8000/api/v1/chats/', options)
        .then(response => response.json())
        .then(json => console.log(json))
        .catch((error) => { console.log(error) });
});

btnLogin.addEventListener('click', () => {

    // Делаем запрос за данными
    let login = document.getElementById('loginLoginInput').value;
    let password = document.getElementById('loginPasswordInput').value;
    let options = {
        // Будем использовать метод POST
        method: 'POST',
        headers: {
            // Accept: 'application/json',
            'Content-Type': 'application/json'
            },
        body: JSON.stringify({'username': login, 'password': password}),
        }
    // Делаем запрос за данными
    fetch('http://127.0.0.1:8000/api/v1/dj-rest-auth/login/', options)
        .then(response => response.json())
        .then(json => localStorage.setItem('chatToken', json.key))
        .catch((error) => console.log(error));
});

btnLogout.addEventListener('click', () => {

    // Делаем запрос за данными
    let login = document.getElementById('loginLoginInput').value;
    let password = document.getElementById('loginPasswordInput').value;
    let options = {
        // Будем использовать метод POST
        method: 'POST',
        headers: {
            // Accept: 'application/json',
            'Content-Type': 'application/json'
        },
    }
    // Делаем запрос за данными
    fetch('http://127.0.0.1:8000/api/v1/dj-rest-auth/logout/', options)
        .then(response => response.json())
        .then(json => localStorage.removeItem('chatToken'))
        .catch((error) => console.log(error));
});