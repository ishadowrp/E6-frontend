const btnRooms = document.querySelector('.btn-rooms');
const btnUsers = document.querySelector('.btn-users');
const btnProfile = document.querySelector('.btn-profile');
const btnLogin = document.querySelector('.submit-login');
const btnRegistration = document.querySelector('.submit-registration');
const btnLogout = document.querySelector('.btn-logout');
const menuLogin = document.querySelector('.btn-login');

reloadSideBar();

if (btnRegistration) {
    btnRegistration.addEventListener('click', () => {
        let login = document.getElementById('regLoginInput').value;
        let email = document.getElementById('regEmailInput').value;
        let password1 = document.getElementById('regPassword1Input').value;
        let password2 = document.getElementById('regPassword2Input').value;
        let options = {
            // Будем использовать метод POST
            method: 'POST',
            headers: {
                // Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'username': login, 'email': email, 'password1': password1, 'password2': password2}),
        }
        // Делаем запрос за данными
        fetch('http://127.0.0.1:8000/api/v1/dj-rest-auth/registration/', options)
            .then(response => response.json())
            .then(json => regMeIn(json))
            .catch((error) => console.log(error));
    });
}

if (btnProfile) {
    btnProfile.addEventListener('click', () => {

    })
}

btnRooms.addEventListener('click', () => {
    let options = {
        // Будем использовать метод POST
        method: 'GET',
        // mode: 'no-cors',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem('chatToken'),
            },
        }
    // Делаем запрос за данными
    fetch('http://127.0.0.1:8000/api/v1/chats/', options)
        .then(response => response.json())
        .then(json => putViewChatCards(json))
        .catch((error) => { console.log(error) });
});

if (btnLogin) {
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
            .then(json => getLogMeIn(json))
            .catch((error) => console.log(error));
    });
}

btnLogout.addEventListener('click', () => {

    // Делаем запрос за данными
    let options = {
        // Будем использовать метод POST
        method: 'POST',
        headers: {
            // Accept: 'application/json',
            // 'Authorization': 'Token ' + localStorage.getItem('ChatToken'),
            'Content-Type': 'application/json'
        },
    }
    // Делаем запрос за данными
    fetch('http://127.0.0.1:8000/api/v1/dj-rest-auth/logout/', options)
        .then(response => response.json())
        .then(json => logOutMe())
        .catch((error) => console.log(error));
});

function getLogMeIn(json) {
    console.log(json);
    if (json.key !== undefined) {
        logMeIn(json);
    } else {
        logError(json);
    }
}

function regMeIn(json) {
    console.log(json);
    if (json.key !== undefined) {
        logMeIn(json);
    } else {
        regError(json);
    }
}

function regError(error) {
    let textErrors = document.querySelector('.registration-errors');
    let innerHTML = 'Errors: '+"<br>"+"<ul>";
    for (key in error) {
        innerHTML += "<li>"+key+' - '+error[key]+"</li>";
    }
    innerHTML += "</ul>";
    textErrors.innerHTML = innerHTML;
}

function logError(error) {
    let textErrors = document.querySelector('.login-errors');
    let innerHTML = 'Errors: '+"<br>"+"<ul>";
    for (key in error) {
        innerHTML += "<li>"+error[key]+"</li>";
    }
    innerHTML += "</ul>";
    textErrors.innerHTML = innerHTML;
}

function logOutMe() {
    localStorage.removeItem('chatToken');
    let bodyForText = document.getElementById('body-chats');
    bodyForText.innerHTML = "<span class=\"fs-4 align-items-center link-dark text-decoration-none\">Good bye!</span><hr>";
    reloadSideBar();
}

function getUsername(user_id) {
    let options = {
        // Будем использовать метод GET
        method: 'GET',
        // mode: 'no-cors',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem('chatToken'),
        },
    }
    // Делаем запрос за данными
    return fetch('http://127.0.0.1:8000/api/v1/users/'+user_id+"/", options)
        .then(response => response.json())
        .then(json => {
            return json.username;
        })
        .catch((error) => { console.log(error) });
}

function putViewChatCards(json) {
    let bodyForText = document.getElementById('body-chats');
    let innerHTML = "<span class=\"fs-4 align-items-center link-dark text-decoration-none\">Chats to connect:</span><hr>" +
        "<div class=\"row row-cols-1 row-cols-md-3 g-4\">";
    json.forEach(function(element, i, arr) {
        // let createDate = new Date(element.date_created);
        innerHTML += "<div class=\"col\">" +
            "<div class=\"card\">" +
            "<div class=\"card-body\">" +
            "<h5 class=\"card-title\">"+element.title+"</h5>" +
            "<h6 class=\"card-subtitle text-muted\">users: "+element.chat_users.length+"</h6>" +
            "<p class=\"card-text\">"+element.description+"</p>" +
            "<a href=\"./html/chat.html?"+element.id+"\" class=\"btn btn-primary chat-join\">Join</a>" +
            "</div>" +
            "</div>" +
            "</div>";
    })
    innerHTML += "</div>";
    bodyForText.innerHTML = innerHTML;
    reloadSideBar();
}

function reloadSideBar() {
    if (localStorage.getItem('chatToken')) {
        menuLogin.style.display = 'none';
        if (btnProfile.style.getPropertyValue('display')){
            btnProfile.style.removeProperty('display');
        }
        let options = {
            // Будем использовать метод GET
            method: 'GET',
            // mode: 'no-cors',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Token ' + localStorage.getItem('chatToken'),
            },
        }
        // Делаем запрос за данными
        return fetch('http://127.0.0.1:8000/api/v1/dj-rest-auth/user/', options)
            .then(response => response.json())
            .then(json => showProfileName(json))
            .catch((error) => { console.log(error) });
    } else {
        btnProfile.style.display = 'none';
        if (menuLogin.style.getPropertyValue('display')){
            menuLogin.style.removeProperty('display');
        }
    }
    let sidebar = document.getElementById('sidebar');
    sidebar.style.height = "100vh";
}

function showProfileName(json) {
    if (json.username !== undefined) {
        if (btnProfile.innerHTML.indexOf(json.username) == -1) {
            btnProfile.innerHTML += json.username;
        }
    }
}

function logMeIn(json) {
    localStorage.setItem('chatToken', json.key);
    location.href = "../index.html";
}
