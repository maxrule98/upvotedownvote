const db = require('../db');

const globalLocals = {

}

const globalPartials = {
    head: 'static/partials/head.html',
    header: 'static/partials/header.html'
}

const routes = (app) => {

    app.get('/', async (req, res) => {
        const data = await db.getNow()
        console.log(data);

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

    app.get('/about', async (req, res) => {
        res.render('static/about.html', {
            locals: {
                ...globalLocals,
                title: 'About'
            },
            partials: {
                ...globalPartials
            }
        })
    })

    app.get('/projects', async (req, res) => {
        res.render('static/projects.html', {
            locals: {
                ...globalLocals,
                title: 'Projects'
            },
            partials: {
                ...globalPartials
            }
        })
    })

    app.get('/project/:id', async (req, res) => {
        const id = req.params.id;


        res.render('static/project.html', {
            locals: {
                ...globalLocals,
                title: `Project ${id}`,
                id: id
            },
            partials: {
                ...globalPartials
            }
        })
    })

}

module.exports = routes;