function loginFormHandler() {
    event.preventDefault();
    console.log('button works')
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);