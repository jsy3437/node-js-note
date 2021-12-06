const http = require('http');
const fs = require('fs');
// console.log(fs.createReadStream('./html/index.html'));
// console.log(fs);
const server = http.createServer((req, res) => {
	console.log('incoming...');
	// console.log(req.headers);
	// console.log(req.httpVersion);
	// console.log(req.method);
	// console.log(req.url);
	const url = req.url;

	// data의 타입을 정의 header에 들어감
	res.setHeader('Content-Type', 'text/html');
	if (url === '/') {
		fs.createReadStream('./html/index.html').pipe(res);
	} else if (url === '/courses') {
		fs.createReadStream('./html/courses.html').pipe(res);
	} else {
		fs.createReadStream('./html/not-found.html').pipe(res);
	}

	// res.end();
});

server.listen(8899);
