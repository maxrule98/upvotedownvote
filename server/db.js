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
    const response = await pool.query('SELECT NOW()');
    return response.rows[0];
}

const addPost = async () => {
    try {
        const response = await pool.query('INSERT INTO posts(id, date, title, content, upvotes, downvotes) VALUES ($1, NOW(), $2, $3, $4, $5)',[
            2,
            "Test post 2",
            "Testing testing testing testing",
            1069,
            69,
        ]);
        console.log("post added");
        // return response.rows[0];
        
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

// addPost()

const addUpvote = async (id, val) => {
    try {
        const data = await pool.query(
            `SELECT upvotes FROM posts WHERE id = $1`
            ,[
            id
        ]);

        const newVal = data.rows[0].upvotes + 1;

        const response = await pool.query(
            `UPDATE posts SET upvotes = $1 WHERE id = $2 RETURNING upvotes, downvotes`
            ,[
            newVal,
            id
        ]);
        return response.rows[0];
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

const addDownvote = async (id, val) => {
    try {
        const data = await pool.query(
            `SELECT downvotes FROM posts WHERE id = $1`
            ,[
            id
        ]);

        const newVal = data.rows[0].downvotes + 1;

        const response = await pool.query(
            `UPDATE posts SET downvotes = $1 WHERE id = $2 RETURNING upvotes, downvotes`
            ,[
            newVal,
            id
        ]);
        return response.rows[0];
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

const removeUpvote = async (id, val) => {
    try {
        const data = await pool.query(
            `SELECT upvotes FROM posts WHERE id = $1`
            ,[
            id
        ]);

        const newVal = data.rows[0].upvotes - 1;

        const response = await pool.query(
            `UPDATE posts SET upvotes = $1 WHERE id = $2 RETURNING upvotes, downvotes`
            ,[
            newVal,
            id
        ]);
        return response.rows[0];
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

const removeDownvote = async (id, val) => {
    try {
        const data = await pool.query(
            `SELECT downvotes FROM posts WHERE id = $1`
            ,[
            id
        ]);

        const newVal = data.rows[0].downvotes - 1;

        const response = await pool.query(
            `UPDATE posts SET downvotes = $1 WHERE id = $2 RETURNING upvotes, downvotes`
            ,[
            newVal,
            id
        ]);
        return response.rows[0];
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

// addUpvote();

const getPosts = async () => {
    try {
        const response = await pool.query('SELECT * FROM posts ORDER BY date DESC');
        // console.log(response.rows);
        return response.rows;
        
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

// getPosts()

const setup = async () => {
    console.log("Setting up DB");
    
    try {
        console.log(await pool.query('SELECT NOW()').then(row => { return row.rows[0].now }))

        // console.log("DROP TABLE posts");
        // await pool.query('DROP TABLE posts');
        console.log("Create table posts");
        await pool.query(`CREATE TABLE IF NOT EXISTS posts (
            id INT NOT NULL ,
            date timestamp ,
            title VARCHAR(255) NULL ,
            content TEXT NULL ,
            upvotes INT,
            downvotes INT ,
            PRIMARY KEY (id) )
        `);
        // await pool.query(`C`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
    
    
    console.log("Finished setting up DB");
}

module.exports = {
    getNow,
    getPosts,
    addUpvote,
    addDownvote,
    removeUpvote,
    removeDownvote,
    setup
}