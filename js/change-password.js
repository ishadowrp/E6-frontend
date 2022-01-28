const btnChangePass = document.getElementById('btn-change-pass');

btnChangePass.addEventListener('click', () => {
    let pass1 = document.getElementById('changePassword1Input').value;
    let pass2 = document.getElementById('changePassword2Input').value;
    let options = {
        // Будем использовать метод POST
        method: 'POST',
        headers: {
            // Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem('chatToken'),
        },
        body: JSON.stringify({'new_password1': pass1, 'new_password2': pass2}),
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

function regError(error) {
    let textErrors = document.querySelector('.registration-errors');
    let innerHTML = 'Errors: '+"<br>"+"<ul>";
    for (key in error) {
        innerHTML += "<li>"+key+' - '+error[key]+"</li>";
    }
    innerHTML += "</ul>";
    textErrors.innerHTML = innerHTML;
}

