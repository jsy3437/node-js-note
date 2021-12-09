import express from 'express';

// app1.js 생략본

const app = express();

app.use(express.json());

app.route('/posts')
	.get((req, res) => {
		res.status(201).send('GET: /posts');
	})
	.post((req, res) => {
		res.status(201).send('POST: /posts');
	});

app.route('/posts/:id')
	.put((req, res) => {
		res.status(201).send('PUT: /posts/:id');
	})
	.delete((req, res) => {
		res.status(201).send('DELETE: /posts/:id');
	});

app.listen(8080);
