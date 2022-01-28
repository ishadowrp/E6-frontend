const menuLoginSB = document.querySelector('.btn-login');
const btnProfileSB = document.querySelector('.btn-profile');
const btnRoomsSB = document.querySelector('.btn-rooms');
const btnUsersSB = document.querySelector('.btn-users');
const btnLogoutSB = document.querySelector('.btn-logout');

reloadSideBar();

function reloadSideBar() {
  if (localStorage.getItem('chatToken')) {
    menuLoginSB.style.display = 'none';
    if (btnProfileSB.style.getPropertyValue('display')){
      btnProfileSB.style.removeProperty('display');
    }
    if (btnRoomsSB.style.getPropertyValue('display')){
      btnRoomsSB.style.removeProperty('display');
    }
    if (btnUsersSB.style.getPropertyValue('display')){
      btnUsersSB.style.removeProperty('display');
    }
    if (btnLogoutSB.style.getPropertyValue('display')){
      btnLogoutSB.style.removeProperty('display');
    }
    let username = localStorage.getItem('username');
    if (username) {
      if (btnProfileSB.innerHTML.indexOf(username) == -1) {
        btnProfileSB.innerHTML += username;
      }
    }
  } else {
    btnProfileSB.style.display = 'none';
    btnRoomsSB.style.display = 'none';
    btnUsersSB.style.display = 'none';
    btnLogoutSB.style.display = 'none';
    if (menuLoginSB.style.getPropertyValue('display')){
      menuLoginSB.style.removeProperty('display');
    }
  }
  let sidebar = document.getElementById('sidebar');
  sidebar.style.height = "100vh";
}

btnLogoutSB.addEventListener('click', () => {

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
      .then(json => logOutMe(json))
      .catch((error) => console.log(error));
});

function logOutMe(json) {
  localStorage.removeItem('chatToken');
  localStorage.removeItem('ownerID');
  localStorage.removeItem('username');
  window.location.reload();
  if (window.location.indexOf('index.html') == -1) {
    window.location.href = "../index.html";
  }
  let bodyForText = document.getElementById('body-chats');
  bodyForText.innerHTML = "<span class=\"fs-4 align-items-center link-dark text-decoration-none\">Good bye!</span><hr>";
}