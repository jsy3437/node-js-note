import express from 'express'; // v4
const app = express();

// app.get('/sky/:id', (req, res, next) => {
// 	// localhost:8686/sky/uni/?keyword=bts 일때
// 	// console.log('get');
// 	// // req에 대한 내용
// 	// console.log(req.params); // { id : uni }
// 	// console.log(req.params.id); // uni
// 	// console.log(req.query); // { keyword : bts }
// 	// console.log(req.query.keyword); // bts
// 	// // res에 대한 내용
// 	// // res.send('Hi!');
// 	// res.setHeader('key', 'value'); // header 에 들어감
// 	// // res.status(201).send('create'); // status와 메세지를 보낼 수 있다
// 	// res.sendStatus(200); // status를 설정함과 동시에 메세지를 자동으로 보낸다
// });

// // use와 all의 차이 //
// // all은 일치하는 경로에서만 처리가 됨
// app.all('/api/*', (req, res, next) => {
// 	console.log('all');
// 	next();
// });

// // use는 포함된 경로에서 전부 처리 됨
// app.use('/sky', (req, res, next) => {
// 	console.log('use');
// 	next();
// });

// // get 처리 //
// app.get(
// 	'/',
// 	(req, res, next) => {
// 		console.log('first1');
// 		next('route'); // 다음 app.메소드 로 넘어간다
// 	},
// 	(req, res, next) => {
// 		console.log('first2'); // res나 next를 하지 않으면 멈춰있는 서버가 되버림
// 	}
// );
// app.get('/', (req, res, next) => {
// 	console.log('second');
// 	next(new Error('error')); // 마지막 error처리하는 곳으로 감
// });

// // 요청이 어느 것도 처리되지 않으면 마지막에 404를 보내주는 코드를 적는다
// app.use((req, res, next) => {
// 	res.status(404).send('Not available! @_@');
// });

// // 중간에 에러가 발생하면 제일 마지막에 있는 error 처리 함수로 간다
// app.use((error, req, res, next) => {
// 	console.error;
// 	res.status(500).send('sorry~');
// 	next();
// });

// post 처리 //
app.use(express.json());
app.post('/', (req, res, next) => {
	console.log(req.body);
	res.send(req.body);
});

app.listen(8686);
