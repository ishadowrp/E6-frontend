const btnNewChat = document.querySelector('.submit-newChat');
const btnProfile = document.querySelector('.btn-profile');
const btnRooms = document.querySelector('.btn-rooms');
const btnUsers = document.querySelector('.btn-users');
const btnLogin = document.getElementById('submit-login');
const btnRegistration = document.querySelector('.submit-registration');
const btnLogout = document.querySelector('.btn-logout');
const menuLogin = document.querySelector('.btn-login');
const btnUpdateUser = document.querySelector('.submit-update-user');
const btnChatJoin = document.querySelector('.btn-chat-join');
const btnChatEdit = document.querySelector('.btn-chat-edit');
const btnChatDelete = document.querySelector('.btn-chat-delete');
const btnChangePass = document.getElementById('btn-change-pass');

reloadSideBar();

// window.onload = () => {
//     localStorage.removeItem('chatToken');
//     localStorage.removeItem('ownerID');
//     localStorage.removeItem('username');
// }

if (btnChangePass) {
    btnChangePass.addEventListener('click', () => {
        let pass1 = document.getElementById('changePassword1Input');
        let pass2 = document.getElementById('changePassword2Input');
        let options = {
            // Будем использовать метод POST
            method: 'POST',
            headers: {
                // Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + localStorage.getItem('chatToken'),
            body: JSON.stringify({'new_password1': pass1, 'new_password2': pass2}),
            },
        }
        // Делаем запрос за данными
        fetch('http://127.0.0.1:8000/api/v1/dj-rest-auth/password/change/', options)
            .then(response => response.json())
            .then(json => {
                if (json.detail !== undefined) {
                    window.location.href = "./profile.html";
                } else {
                    regError(json);
                }
            })
            .catch((error) => console.log(error));

    })
}

if (btnChatDelete) {
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
                } else {
                    window.location.href = "./chats.html";
                }
            })
            .catch((error) => console.log(error));
    })
}

if (btnChatEdit) {
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
}

if (window.location.pathname.indexOf('chat-edit.html') !== -1) {
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
            .then(json => fillChatParams(json))
            .catch((error) => { console.log(error) });
    })
}

if (window.location.pathname.indexOf('users.html') !== -1) {
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
}


if (btnNewChat) {
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
            body: JSON.stringify({'title': title, 'description': description}),
        }
        // Делаем запрос за данными
        fetch('http://127.0.0.1:8000/api/v1/chats/', options)
            .then(response => response.json())
            .then(json => {
                if (json.detail !== undefined) {
                    updError(json);
                } else {
                    window.location.href = "./chats.html";
                }})
            .catch((error) => console.log(error));

    })
}

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

if (btnUpdateUser) {
    btnUpdateUser.addEventListener('click', () =>{
        let login = document.getElementById('updLoginInput').value;
        let email = document.getElementById('updEmailInput').value;
        let fN = document.getElementById('updFNInput').value;
        let lN = document.getElementById('updLNInput').value;
        let options = {
            // Будем использовать метод PUT
            method: 'PUT',
            headers: {
                // Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + localStorage.getItem('chatToken'),
            },
            body: JSON.stringify({'username': login, 'email': email, 'first_name': fN, 'last_name': lN}),
        }
        // Делаем запрос за данными
        fetch('http://127.0.0.1:8000/api/v1/dj-rest-auth/user/', options)
            .then(response => response.json())
            .then(json => updateMe(json))
            .catch((error) => console.log(error));
    })
}

if (window.location.pathname.indexOf('profile.html') !== -1) {
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
        fetch('http://127.0.0.1:8000/api/v1/dj-rest-auth/user/', options)
            .then(response => response.json())
            .then(json => fillUserProfile(json))
            .catch((error) => { console.log(error) });
    })
}

if (window.location.pathname.indexOf('chats.html') !== -1) {
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
}

if (btnLogin) {
    btnLogin.addEventListener('click', () => {

        // Делаем запрос за данными
        let login = document.getElementById('loginLoginInput').value;
        let password = document.getElementById('loginPasswordInput').value;
        let options = {
            // Будем использовать метод POST
            method: 'POST',
            headers: {
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
    if (json.key !== undefined) {
        logMeIn(json);
    } else {
        logError(json);
    }
}

function logMeIn(json) {
    localStorage.setItem('chatToken', json.key);
    let options = {
        // Будем использовать метод GET
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + json.key,
        },
    }
    // Делаем запрос за данными
    return fetch('http://127.0.0.1:8000/api/v1/dj-rest-auth/user/', options)
        .then(response => response.json())
        .then(jsonPD => {
            if (jsonPD.username !== undefined) {
                localStorage.setItem('username', jsonPD.username);
                localStorage.setItem('ownerID', jsonPD.pk);
                window.location.href = "../index.html";
            }
        })
        .catch((error) => { console.log(error) });
}

function regMeIn(json) {
    if (json.key !== undefined) {
        logMeIn(json);
    } else {
        regError(json);
    }
}

function updateMe(json) {
    if (json.detail !== undefined) {
        updError(json);
    } else {
        updComplete();
    }
}

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
    localStorage.removeItem('ownerID');
    localStorage.removeItem('username');
    reloadSideBar();
    if (window.location.indexOf('index.html') == -1) {
        window.location.href = "../index.html";
    }
    let bodyForText = document.getElementById('body-chats');
    bodyForText.innerHTML = "<span class=\"fs-4 align-items-center link-dark text-decoration-none\">Good bye!</span><hr>";
    // reloadSideBar();
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
    let innerHTML = "<div class=\"row\">" +
            "<div class=\"col-md-8 fs-4 align-items-center link-dark text-decoration-none\">Chats to connect:</div>" +
            "<div class=\"col-md-4\">" +
                "<a href=\"./new-chat.html\" class=\"btn btn-success\">+ New chat</a>"+
            "</div>" +
        "</div>" +
        "<hr>" +
        "<div class=\"row row-cols-1 row-cols-md-3 g-4\">";
    json.forEach(function(element, i, arr) {
        // let createDate = new Date(element.date_created);
        let extBtn = "";
        if (element.owner == localStorage.getItem("ownerID")) {
            extBtn = "<div class=\"btn-group btn-group-sm\" role=\"group\" aria-label=\"...\">" +
                "<a href=\"./chat.html?id="+element.id+"\" class=\"btn btn-outline-primary\">Join</a>"+
                "<a href=\"./chat-edit.html?id="+element.id+"\" class=\"btn btn-outline-primary\">Edit</a>" +
                "<a href=\"./chat-delete.html?id="+element.id+"\" class=\"btn btn-outline-danger\">Delete</a></div>";
        } else {
            extBtn = "<a href=\"./html/chat.html?"+element.id+"\" class=\"btn btn-outline-primary btn-sm\">Join</a>";
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
    })
    innerHTML += "</div>";
    bodyForText.innerHTML = innerHTML;
    reloadSideBar();
}

async function putViewUsersCards(json) {
    let bodyForText = document.getElementById('body-chats');
    let innerHTML = "" +
        "<div class=\"row\">" +
            "<div class=\"col-md-8 fs-4 align-items-center link-dark text-decoration-none\">Users of chat:</div>" +
        "</div>" +
        "<hr>" +
        "<div class=\"row row-cols-1 row-cols-md-3 g-4\">";

    for (const element of json) {
    // json.forEach(function(element, i, arr) {

        let urlPhoto = await getUrlPhoto(element.id);
        // let createDate = new Date(element.date_created);
        let extBtn = "<a href=\"./html/send-privat-message.html?id="+element.id+"\" class=\"btn btn-outline-secondary btn-sm\">Send message</a>";
        console.log(urlPhoto);
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
    innerHTML += "</div>";
    bodyForText.innerHTML = innerHTML;
    reloadSideBar();
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

function reloadSideBar() {
    if (localStorage.getItem('chatToken')) {
        menuLogin.style.display = 'none';
        if (btnProfile.style.getPropertyValue('display')){
            btnProfile.style.removeProperty('display');
        }
        if (btnRooms.style.getPropertyValue('display')){
            btnRooms.style.removeProperty('display');
        }
        if (btnUsers.style.getPropertyValue('display')){
            btnUsers.style.removeProperty('display');
        }
        if (btnLogout.style.getPropertyValue('display')){
            btnLogout.style.removeProperty('display');
        }
       let username = localStorage.getItem('username');
        if (username) {
            if (btnProfile.innerHTML.indexOf(username) == -1) {
                btnProfile.innerHTML += username;
            }
        }
    } else {
        btnProfile.style.display = 'none';
        btnRooms.style.display = 'none';
        btnUsers.style.display = 'none';
        btnLogout.style.display = 'none';
        if (menuLogin.style.getPropertyValue('display')){
            menuLogin.style.removeProperty('display');
        }
    }
    let sidebar = document.getElementById('sidebar');
    sidebar.style.height = "100vh";
}

function fillUserProfile(json) {
    let login = document.getElementById('updLoginInput');
    let email = document.getElementById('updEmailInput');
    let fN = document.getElementById('updFNInput');
    let lN = document.getElementById('updLNInput');
    login.value = json.username;
    email.value = json.email;
    fN.value = json.first_name;
    lN.value = json.last_name;
    let options = {
        // Будем использовать метод GET
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem('chatToken'),
        },
    }
    // Делаем запрос за данными
    return fetch('http://127.0.0.1:8000/api/v1/profiles/'+localStorage.getItem('ownerID')+'/', options)
        .then(response => response.json())
        .then(jsonPD => {
            console.log(jsonPD);
            if (jsonPD.avatar_photo !== undefined) {
                console.log(jsonPD.avatar_photo);
                let avatar = document.getElementById('avatar-image');
                avatar.src = jsonPD.avatar_photo;
            }
        })
        .catch((error) => { console.log(error) });
}

function fillChatParams(json) {
    let title = document.getElementById('titleEditInput');
    let description = document.getElementById('descriptionEditInput');
    title.value = json.title;
    description.value = json.description;
}
