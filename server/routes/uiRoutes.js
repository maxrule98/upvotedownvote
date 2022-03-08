const globalLocals = {

}

const globalPartials = {
    head: 'static/partials/head.html',
    header: 'static/partials/header.html'
}

const routes = (app) => {

    app.get('/', (req, res) => {
        res.render('static/index.html', {
            locals: {
                ...globalLocals,
                title: 'Home'
            },
            partials: {
                ...globalPartials
            }
        })
    })

    app.get('/about', (req, res) => {
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

    app.get('/projects', (req, res) => {
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

    app.get('/project/:id', (req, res) => {
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