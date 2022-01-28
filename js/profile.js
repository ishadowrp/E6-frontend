const btnUploadPhoto = document.getElementById('upload-photo');
const btnDeletePhoto = document.getElementById('delete-photo');
const btnUpload = document.getElementById('submitFileUpload');
const nodeUploadFile = document.getElementById('group-upload');
const btnUpdateUser = document.querySelector('.submit-update-user');

document.addEventListener("DOMContentLoaded", () => {
    let nodeUploadFile = document.getElementById('group-upload');
    nodeUploadFile.style.display = 'none';
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

btnUploadPhoto.addEventListener('click', () => {
    if (nodeUploadFile.style.getPropertyValue('display')){
        nodeUploadFile.style.removeProperty('display');
    }
})

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
            if (jsonPD.avatar_photo !== undefined) {
                let avatar = document.getElementById('avatar-image');
                avatar.src = jsonPD.avatar_photo;
            }
        })
        .catch((error) => { console.log(error) });
}

btnDeletePhoto.addEventListener('click', () => {
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
    fetch('http://127.0.0.1:8000/api/v1/profiles/'+localStorage.getItem("ownerID")+'/', options)
        .then(response => {
            console.log(response);
            if (response.status===204) {
                window.location.reload();
                nodeUploadFile.style.display = 'none';
            }
        })
        .catch((error) => console.log(error));
})

btnUpload.addEventListener('click', () => {
    const formfiledata = document.getElementById('inputUploadFile');
    const file = formfiledata.files[0];
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Token "+localStorage.getItem('chatToken'));

    const formdata = new FormData();
    formdata.append("owner", localStorage.getItem('ownerID'));
    formdata.append("avatar_photo", file);

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    fetch("http://127.0.0.1:8000/api/v1/profile/upload/", requestOptions)
        .then(response => response.json())
        .then(result => {
            window.location.reload();
            nodeUploadFile.style.display = 'none';
        })
        .catch(error => console.log('error', error));
})

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

function updateMe(json) {
    if (json.detail !== undefined) {
        updError(json);
    } else {
        updComplete();
    }
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

function updComplete() {
    let textDone = document.querySelector('.update-done');
    let innerHTML = 'Data updated successfully!';
    textDone.innerHTML = innerHTML;
}
