// Global variables
var signupName = document.getElementById('signupName');
var signupEmail = document.getElementById('signupEmail');
var signupPassword = document.getElementById('signupPassword');
var signupBtn = document.getElementById('signupBtn');
var signinEmail = document.getElementById('signinEmail');
var signinPassword = document.getElementById('signinPassword');
var loginBtn = document.getElementById('loginBtn');
var logoutBtn = document.getElementById('logoutBtn');
var incorrect = document.getElementById('incorrect');
var signupError = document.getElementById('signupError');
var signupSuccess = document.getElementById('signupSuccess');
var usernameDisplay = document.getElementById('usernameDisplay');

var toSignup = document.getElementById('toSignup');
var toSignin = document.getElementById('toSignin');

var loginPage = document.getElementById('loginPage');
var signupPage = document.getElementById('signupPage');
var homePage = document.getElementById('homePage');

var users = [];

if (localStorage.getItem('users') != null) {
  users = JSON.parse(localStorage.getItem('users'));
}

// Navigation Functions
function showLogin() {
    loginPage.classList.remove('d-none');
    signupPage.classList.add('d-none');
    homePage.classList.add('d-none');
    clearInputs();
}

function showSignup() {
    loginPage.classList.add('d-none');
    signupPage.classList.remove('d-none');
    homePage.classList.add('d-none');
    clearInputs();
}

function showHome() {
    loginPage.classList.add('d-none');
    signupPage.classList.add('d-none');
    homePage.classList.remove('d-none');
    var sessionUser = localStorage.getItem('sessionUser');
    if (sessionUser) {
        usernameDisplay.innerHTML = 'Welcome ' + sessionUser;
    }
}

function clearInputs() {
    if(signupName) signupName.value = '';
    if(signupEmail) signupEmail.value = '';
    if(signupPassword) signupPassword.value = '';
    if(signinEmail) signinEmail.value = '';
    if(signinPassword) signinPassword.value = '';
    if(incorrect) incorrect.classList.add('d-none');
    if(signupError) signupError.classList.add('d-none');
    if(signupSuccess) signupSuccess.classList.add('d-none');
}

// Navigation Event Listeners
if (toSignup) {
    toSignup.addEventListener('click', function(e) {
        e.preventDefault();
        showSignup();
    });
}

if (toSignin) {
    toSignin.addEventListener('click', function(e) {
        e.preventDefault();
        showLogin();
    });
}

// Signup Logic
if (signupBtn) {
  signupBtn.addEventListener('click', function () {
    signUp();
  });
}

function signUp() {
  if (isEmptyInput(signupName) || isEmptyInput(signupEmail) || isEmptyInput(signupPassword)) {
    signupError.classList.remove('d-none');
    signupError.innerHTML = '<span class="text-danger">All inputs is required</span>';
    return false;
  }
  
  var user = {
    name: signupName.value,
    email: signupEmail.value,
    password: signupPassword.value,
  };

  if (isEmailExist(user.email)) {
    signupError.classList.remove('d-none');
    signupError.innerHTML = '<span class="text-danger">Email already exists</span>';
  } else {
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    signupError.classList.add('d-none');
    signupSuccess.classList.remove('d-none');
    setTimeout(() => {
        showLogin();
    }, 1000);
  }
}

function isEmailExist(email) {
  for (var i = 0; i < users.length; i++) {
    if (users[i].email.toLowerCase() == email.toLowerCase()) {
      return true;
    }
  }
  return false;
}

// Login Logic
if (loginBtn) {
  loginBtn.addEventListener('click', function () {
    login();
  });
}

function login() {
    if (isEmptyInput(signinEmail) || isEmptyInput(signinPassword)) {
        incorrect.classList.remove('d-none');
        return false;
    }
    
    var email = signinEmail.value;
    var password = signinPassword.value;
    
    var found = false;
    for (var i = 0; i < users.length; i++) {
        if (users[i].email.toLowerCase() == email.toLowerCase() && users[i].password == password) {
            localStorage.setItem('sessionUser', users[i].name);
            found = true;
            showHome();
            break;
        }
    }
    
    if (!found) {
        incorrect.classList.remove('d-none');
        incorrect.innerHTML = '<span class="text-danger">Incorrect email or password</span>';
    }
}

// Logout Logic
if (logoutBtn) {
    logoutBtn.addEventListener('click', function () {
        localStorage.removeItem('sessionUser');
        showLogin();
    });
}

function isEmptyInput(input) {
    return input.value.trim() == "";
}

// Initial Check
var sessionUser = localStorage.getItem('sessionUser');
if (sessionUser) {
    showHome();
} else {
    showLogin();
}
