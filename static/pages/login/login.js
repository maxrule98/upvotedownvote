const form = document.querySelector('#loginForm')
const loginBtn = document.querySelector('#loginBtn')

const loginForm = {
    loginEmail: document.getElementById('loginEmail'),
    loginPass: document.getElementById('loginPass'),
    submit: document.getElementById('loginSubmit'),
    form: document.getElementById('loginForm'),
    errorMessage: document.getElementById('errorMessage'),
}

loginForm.submit.addEventListener('click', async (e) => {
    e.preventDefault()

    const url = '/api/v1/login'
    const data = await fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            loginEmail: loginForm.loginEmail.value,
            loginPass: loginForm.loginPass.value,
        }),
    }).then(async (response) => {
        if (response.status !== 200) {
            let msg = await response.json()
            loginForm.errorMessage.textContent =
                'Error: ' + Object.values(msg)[0] + ' Unable to login'
            return
        }
        window.location.pathname = '/'
    })
})
