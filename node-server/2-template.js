const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
// console.log(fs.createReadStream('./html/index.html'));
// console.log(fs);
console.log('aa');

const name = 'uni';
const courses = [{ name: 'HTML' }, { name: 'CSS' }, { name: 'JS' }, { name: 'NODE' }];
const server = http.createServer((req, res) => {
	const url = req.url;
	res.setHeader('Content-Type', 'text/html');

	if (url === '/') {
		ejs.renderFile('./template/index.ejs', { name }).then((data) => res.end(data));
	} else if (url === '/courses') {
		ejs.renderFile('./template/courses.ejs', { courses }).then((data) => res.end(data));
	} else {
		ejs.renderFile('./template/not-found.ejs', { name }).then((data) => res.end(data));
	}

	res.end();
});

server.listen(8899);
