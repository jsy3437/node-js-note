import express from 'express'; // v4
const app = express();

app.get('/', (req, res, next) => {
	console.log('get');
    res.send('Hi!')
});

app.listen(8686);
