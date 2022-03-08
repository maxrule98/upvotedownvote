const express = require('express');
es6Renderer = require('express-es6-template-engine');
const app = express();
const PORT = process.env.PORT || 3000;

const uiRoutes = require('./server/routes/uiRoutes');

(async () => {
    app.engine('html', es6Renderer);
    app.set('views', './');
    app.set('view engine', 'html');

    app.use('/static', express.static('static')); //Main Dir, where all the CSS JS files etc live
    app.use('/node_modules', express.static('node_modules')); //node_modules

    uiRoutes(app);

    app.locals.PORT = PORT;
    console.log(`App is running at http://localhost:${PORT}`);
    app.listen(PORT)
})();