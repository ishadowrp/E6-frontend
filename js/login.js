const btnLogin = document.getElementById('submit-login');

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
})

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

function logError(error) {
    let textErrors = document.querySelector('.login-errors');
    let innerHTML = 'Errors: '+"<br>"+"<ul>";
    for (key in error) {
        innerHTML += "<li>"+error[key]+"</li>";
    }
    innerHTML += "</ul>";
    textErrors.innerHTML = innerHTML;
}

