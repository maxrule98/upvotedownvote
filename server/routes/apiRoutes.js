const db = require('../db')
const { Router } = require('express')
const { formidable } = require('formidable')
const { login, register, requireAuth, checkAuth } = require('../auth')

const routes = (app) => {
    const api = Router()

    api.get('*', checkAuth)
    api.post('*', checkAuth)
    api.put('*', checkAuth)
    api.delete('*', checkAuth)

    // app.get('/set-cookies', (req, res) => {
    //     // res.setHeader('Set-Cookie', 'newuser: true;')
    //     res.cookie('newuser', false, {
    //         maxAge: 1000 * 60 * 60 * 24,
    //         httpOnly: true,
    //     })

    //     res.send('you got the cookies')
    // })

    // app.get('/read-cookies', (req, res) => {
    //     const cookies = req.cookies
    //     console.log(cookies)
    //     res.json(cookies)
    // })

    api.post('/login', login, async (req, res) => {
        console.log(req.body)
        console.log('Login')
    })

    api.post('/register', register, async (req, res) => {
        console.log(req.body)
        console.log('Register')
    })

    api.post('/logout', async (req, res) => {
        res.clearCookie('jwt').redirect('/login')
    })

    api.post('/post/add', async (req, res) => {
        const form = formidable({ multiples: true })
        const user = res.locals.user

        try {
            form.parse(req, async (err, fields, files) => {
                if (err) {
                    next(err)
                    return
                }
                console.log(
                    'Add Post: ' +
                        fields.title +
                        'for user: ' +
                        user.firstname +
                        ' ' +
                        user.lastname
                )
                let request = await db.createPost(user, fields)
                return res.status(200).redirect('/')
            })
        } catch (e) {
            console.error(e)
            process.exit(1)
        }
    })

    api.get('/:id/upvote/add', requireAuth, async (req, res) => {
        const { id } = req.params

        console.log('Add Upvote: ' + id)
        let request = await db.addUpvote(id)
        res.json(request)
    })

    api.get('/:id/downvote/add', requireAuth, async (req, res) => {
        const { id } = req.params

        console.log('Add Downvote: ' + id)
        let request = await db.addDownvote(id)
        res.json(request)
    })

    api.get('/:id/upvote/remove', requireAuth, async (req, res) => {
        const { id } = req.params

        console.log('Remove Upvote: ' + id)
        let request = await db.removeUpvote(id)
        res.json(request)
    })

    api.get('/:id/downvote/remove', requireAuth, async (req, res) => {
        const { id } = req.params

        console.log('Remove Downvote: ' + id)
        let request = await db.removeDownvote(id)
        res.json(request)
    })

    app.use('/api/v1', api)
}

module.exports = routes
