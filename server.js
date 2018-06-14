const join = require('path').join,
    express = require('express'),
    app = express();

    app.use(express.static(join(__dirname, 'src/www')));
    app.listen(3000, () => {
        console.log('app listening on port 3000!');
    })