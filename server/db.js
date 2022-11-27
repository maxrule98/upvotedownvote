const { Pool } = require('pg')
const pool = new Pool({
    host: 'localhost',
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
})

const getNow = async () => {
    const response = await pool.query('SELECT NOW()')
    return response.rows[0]
}

const getUser = async (email) => {
    const response = await pool.query(`SELECT * FROM users WHERE email = $1`, [
        email,
    ])
    return response.rows[0]
}

const getUserById = async (id) => {
    const response = await pool.query(`SELECT * FROM users WHERE id = $1`, [id])
    return response.rows[0]
}

const createUser = async (firstName, lastName, email, password) => {
    const response = await pool.query(
        `INSERT INTO users (firstName, lastName, email, password) VALUES ($1, $2, $3, $4) RETURNING *`,
        [firstName, lastName, email, password]
    )
    return response.rows[0]
}

const createPost = async (user, fields) => {
    console.log(user)
    console.log(fields)

    try {
        const response = await pool.query(
            'INSERT INTO posts(date, title, author, content, upvotes, downvotes) VALUES (NOW(), $1, $2, $3, $4, $5)',
            [fields.title, user.id, fields.content, 0, 0]
        )
        console.log('post added')
        return response.rows[0]
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

const getPosts = async () => {
    try {
        const response = await pool.query(
            'SELECT * FROM posts ORDER BY date DESC'
        )
        // console.log(response.rows);
        return response.rows
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

// const hasUserVoted = async (postId) => {
//     try {
//         const response = await pool.query('SELECT upvotes, downvotes FROM user')
//         console.log(response.rows)
//         // return response.rows
//     } catch (error) {
//         console.error(error)
//         process.exit(1)
//     }
// }

const addUpvote = async (id, val) => {
    try {
        // console.log(hasUserVoted())
        const data = await pool.query(
            `SELECT upvotes FROM posts WHERE id = $1`,
            [id]
        )

        const newVal = data.rows[0].upvotes + 1

        const response = await pool.query(
            `UPDATE posts SET upvotes = $1 WHERE id = $2 RETURNING upvotes, downvotes`,
            [newVal, id]
        )
        return response.rows[0]
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

const addDownvote = async (id, val) => {
    try {
        const data = await pool.query(
            `SELECT downvotes FROM posts WHERE id = $1`,
            [id]
        )

        const newVal = data.rows[0].downvotes + 1

        const response = await pool.query(
            `UPDATE posts SET downvotes = $1 WHERE id = $2 RETURNING upvotes, downvotes`,
            [newVal, id]
        )
        return response.rows[0]
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

const removeUpvote = async (id, val) => {
    try {
        const data = await pool.query(
            `SELECT upvotes FROM posts WHERE id = $1`,
            [id]
        )

        const newVal = data.rows[0].upvotes - 1

        const response = await pool.query(
            `UPDATE posts SET upvotes = $1 WHERE id = $2 RETURNING upvotes, downvotes`,
            [newVal, id]
        )
        return response.rows[0]
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

const removeDownvote = async (id, val) => {
    try {
        const data = await pool.query(
            `SELECT downvotes FROM posts WHERE id = $1`,
            [id]
        )

        const newVal = data.rows[0].downvotes - 1

        const response = await pool.query(
            `UPDATE posts SET downvotes = $1 WHERE id = $2 RETURNING upvotes, downvotes`,
            [newVal, id]
        )
        return response.rows[0]
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

const setup = async () => {
    console.log('Setting up DB')

    try {
        console.log(
            await pool.query('SELECT NOW()').then((row) => {
                return row.rows[0].now
            })
        )

        // console.log('DROP TABLE users')
        // await pool.query('DROP TABLE users')
        console.log('Create table users')
        await pool.query(`CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            firstName VARCHAR(255) NULL ,
            lastName VARCHAR(255) NULL ,
            email VARCHAR(255) NULL ,
            password VARCHAR(255) NULL )
        `)

        // console.log('DROP TABLE posts')
        // await pool.query('DROP TABLE posts')
        console.log('Create table posts')
        await pool.query(`CREATE TABLE IF NOT EXISTS posts (
            id SERIAL PRIMARY KEY,
            date timestamp,
            title VARCHAR(255) NULL,
            author VARCHAR(255) NULL,
            content TEXT NULL,
            upvotes INT,
            downvotes INT )
        `)
    } catch (error) {
        console.error(error)
        process.exit(1)
    }

    console.log('Finished setting up DB')
}

module.exports = {
    getUser,
    getUserById,
    createUser,
    getNow,
    createPost,
    getPosts,
    addUpvote,
    addDownvote,
    removeUpvote,
    removeDownvote,
    setup,
}
