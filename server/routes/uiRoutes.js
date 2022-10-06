const db = require('../db');

const globalLocals = {

}

const globalPartials = {
    head: 'static/partials/head.html',
    header: 'static/partials/header.html'
}

const routes = (app) => {

    app.get('/', async (req, res) => {
        res.render('static/index.html', {
            locals: {
                ...globalLocals,
                title: 'Home',
                data: await db.getPosts()
            },
            partials: {
                ...globalPartials
            }
        })
    })

}

module.exports = routes;