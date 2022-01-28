const btnRegistration = document.querySelector('.submit-registration');

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

function regMeIn(json) {
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

