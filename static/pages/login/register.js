// const registerForm = document.querySelector('#registerForm');
const registerBtn = document.querySelector('#registerBtn')

const registerForm = {
    registerFirstName: document.getElementById('registerFirstName'),
    registerLastName: document.getElementById('registerLastName'),
    registerEmail: document.getElementById('registerEmail'),
    registerPass1: document.getElementById('registerPass1'),
    registerPass2: document.getElementById('registerPass2'),
    submit: document.getElementById('registerSubmit'),
    form: document.getElementById('registerForm'),
    errorMessage: document.getElementById('errorMessage'),
}

registerForm.submit.addEventListener('click', async (e) => {
    e.preventDefault()

    const url = '/api/v1/register'
    const data = await fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            registerFirstName: registerForm.registerFirstName.value,
            registerLastName: registerForm.registerLastName.value,
            registerEmail: registerForm.registerEmail.value,
            registerPass1: registerForm.registerPass1.value,
            registerPass2: registerForm.registerPass2.value,
        }),
    }).then(async (response) => {
        if (response.status !== 200) {
            let msg = await response.json()
            registerForm.errorMessage.textContent =
                'Error: ' + Object.values(msg)[0] + ' Unable to login'
            return
        }
        window.location.pathname = '/'
    })
})
