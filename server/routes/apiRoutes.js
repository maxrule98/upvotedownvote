const db = require('../db');
const { Router } = require('express');

const routes = (app) => {
    const api = Router();

    api.get('/:id/upvote/add', async (req, res) => {
        const { id } = req.params;

        console.log("Add Upvote: " + id);
        let request = await db.addUpvote(id);
        res.json(request);
    });

    api.get('/:id/downvote/add', async (req, res) => {
        const { id } = req.params;

        console.log("Add Downvote: " + id);
        let request = await db.addDownvote(id);
        res.json(request);
    });

    api.get('/:id/upvote/remove', async (req, res) => {
        const { id } = req.params;

        console.log("Remove Upvote: " + id);
        let request = await db.removeUpvote(id);
        res.json(request);
    });

    api.get('/:id/downvote/remove', async (req, res) => {
        const { id } = req.params;

        console.log("Remove Downvote: " + id);
        let request = await db.removeDownvote(id);
        res.json(request);
    });

    app.use('/api/v1', api)

}

module.exports = routes;