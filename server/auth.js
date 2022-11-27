require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const db = require('./db')

const maxAge = 3 * 24 * 60 * 60
const createToken = async (id) => {
    return jwt.sign({ id }, process.env.TOKEN_KEY, {
        expiresIn: maxAge,
    })
}

// const isUserLoggedIn = async (req, res, next) => {
//     try {
//         // check if the token is in the cookies
//         const { token = false } = req.cookies
//         if (token) {
//             // verify token
//             const payload = await jwt.verify(token, process.env.TOKEN_KEY)
//             // add payload to request
//             req.payload = payload
//             // move on
//             next()
//         } else {
//             // throw "Not Logged In";
//             res.redirect('/login')
//         }
//     } catch (error) {
//         if (error.name === 'TokenExpiredError') {
//             res.redirect('/login')
//             return
//         }
//         res.status(400).json({ error })
//     }
// }

const requireAuth = async (req, res, next) => {
    const token = req.cookies.jwt

    if (token) {
        jwt.verify(token, process.env.TOKEN_KEY, (err, decodedToken) => {
            if (err) {
                console.log(err)
                res.redirect('/login')
            } else {
                console.log(decodedToken)
                next()
            }
        })
    } else {
        res.redirect('/login')
    }
}

const checkAuth = async (req, res, next) => {
    const token = req.cookies.jwt

    if (token) {
        jwt.verify(token, process.env.TOKEN_KEY, async (err, decodedToken) => {
            if (err) {
                console.log(err)
                res.locals.user = null
                next()
            } else {
                let user = await db.getUserById(decodedToken.id)
                res.locals.user = user
                next()
            }
        })
    } else {
        res.locals.user = null
        next()
    }
}

const login = async (req, res, next) => {
    try {
        const { loginEmail, loginPass } = req.body

        // if all fields aren't filled - DOES NOT WORK
        if (!(loginEmail, loginPass)) {
            console.log('All fields are required')
            // need to redirect to error page
            return res
                .status(403)
                .json({ error: 'All fields are required to be filled!' })
        }

        // If user does not exist
        const user = await db.getUser(loginEmail)
        if (!user) {
            console.log("User doesn't exist")
            // need to redirect to error page
            return res.status(403).json({ error: 'User does not exist!' })
        }

        // Comparing passwords
        const passwordIsValid = bcrypt.compareSync(loginPass, user.password)
        // If passwords don't match
        if (!passwordIsValid) {
            console.log('Incorrect password')
            // need to redirect to error page
            return res.status(401).json({ error: 'Incorrect password!' })
        }

        // Generate Token
        const token = await createToken(user.id)

        // Assign token to user
        // user.token = token;
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: true,
            maxAge: maxAge,
        })

        res.status(200).redirect('/')

        // req.session.regenerate(function (err) {
        //     if (err) next(err);

        //     // store user information in session, typically a user id
        //     req.session.user = loginEmail;

        //     // save the session before redirection to ensure page
        //     // load does not happen before session is saved
        //     req.session.save(function (err) {
        //         if (err) {
        //             res.sendStatus(403).json({
        //                 error: 'Failed to save session',
        //             });
        //         }
        //         res.redirect('/');
        //     });
        // });

        // Generate Token
        // const token = jwt.sign(
        //     { user_id: user.id, loginEmail },
        //     process.env.TOKEN_KEY,
        //     {
        //         expiresIn: '2h',
        //     }
        // )

        // Assign token to user
        // user.token = token;

        // res.status(200)
        // .cookie('user', JSON.stringify(user), {
        //     httpOnly: true,
        //     secure: true,
        // })
        // .cookie('token', token, { httpOnly: true, secure: true })
        // .redirect('/');

        // console.log(user);

        // // Return user
        // res.status(200).json(user);
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

const register = async (req, res, next) => {
    try {
        const {
            registerFirstName,
            registerLastName,
            registerEmail,
            registerPass1,
            registerPass2,
        } = req.body

        // If user does not exist
        const getUser = await db.getUser(registerEmail)
        if (getUser) {
            console.log('User already exists')
            // need to redirect to error page
            return res
                .status(403)
                .json({ error: 'Error: User already exists!' })
        }

        // if all fields aren't filled - DOES NOT WORK
        if (
            !(registerFirstName,
            registerLastName,
            registerEmail,
            registerPass1,
            registerPass2)
        ) {
            console.log('All fields are required')
            // need to redirect to error page
            return res.status(403).json({
                error: 'Error: All fields are required to be filled!',
            })
        }

        // if passwords don't match
        if (registerPass1 !== registerPass2) {
            console.log("Passwords don't match")
            // need to redirect to error page
            return res
                .status(403)
                .json({ error: "Error: Passwords don't match!" })
        }

        // encrypt password
        const encryptedPass = await bcrypt.hash(registerPass1, 10)

        // Create user
        const user = await db.createUser(
            registerFirstName,
            registerLastName,
            registerEmail,
            encryptedPass
        )

        // Generate Token
        const token = createToken(user.id)

        // Assign token to user
        // user.token = token;
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: true,
            maxAge: maxAge,
        })

        res.status(200).redirect('/')

        // console.log(user);

        // // Return user
        // res.status(200).json(user);
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

module.exports = {
    requireAuth,
    checkAuth,
    login,
    register,
}
