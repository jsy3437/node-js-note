import express from 'express';

const app = express();

// express.json -> REST API, body parse
// express.urlencoded -> HTML form
// express.static

app.use(express.json());
app.post('/posts', (req, res) => {
	console.log(req.body);
	res.status(201).send('Thanks, Created');
});

const options = {
	dotfiles: 'ignore',
	etag: false,
	index: false,
	maxAge: '1d',
	redirect: false,
	setHeaders: function (res, path, stat) {
		res.set('x-timestamp', Date.now());
	},
};

// 모든 사용자들이 퍼블릭 폴더에 있는 문서에 접근가능하게 만드는 것
app.use(express.static('public', options));
app.listen(8080);
