const { Router } = require('express')
const db = require('../db')
const { login, register, requireAuth, checkAuth } = require('../auth')

const globalLocals = {}

const globalPartials = {
    head: 'static/partials/head.html',
    header: 'static/partials/header.html',
    logout: 'static/partials/logout.html',
}

const routes = (app) => {
    const ui = Router()

    ui.get('*', checkAuth)

    ui.get('/', async (req, res) => {
        res.render('static/index.html', {
            locals: {
                ...globalLocals,
                title: 'Home',
                data: await db.getPosts(),
                user: res.locals.user,
            },
            partials: {
                ...globalPartials,
            },
        })
    })

    ui.get('/protected', requireAuth, async (req, res) => {
        res.render('static/index.html', {
            locals: {
                ...globalLocals,
                title: 'Protected',
                data: await db.getPosts(),
                user: res.locals.user,
            },
            partials: {
                ...globalPartials,
            },
        })
    })

    ui.get('/login', async (req, res) => {
        res.render('static/pages/login/login.html', {
            locals: {
                ...globalLocals,
                title: 'Login',
                user: res.locals.user,
            },
            partials: {
                ...globalPartials,
            },
        })
    })

    ui.get('/register', async (req, res) => {
        res.render('static/pages/login/register.html', {
            locals: {
                ...globalLocals,
                title: 'Register',
                user: res.locals.user,
            },
            partials: {
                ...globalPartials,
            },
        })
    })

    ui.get('/logout', async (req, res) => {
        res.render('static/pages/login/logout.html', {
            locals: {
                ...globalLocals,
                title: 'Logout',
                user: res.locals.user,
            },
            partials: {
                ...globalPartials,
            },
        })
    })

    app.use('/', ui)
}

module.exports = routes
