import express from 'express';
import cors from 'cors';
const app = express();

// 기본 방법
// app.use((req, res, next) => {
// 	res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
// 	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
// 	next();
// });

// cors 라이브러리 사용 방법
app.use(
	cors({
		// 옵션
		origin: ['http://127.0.0.1:5500'], // 특정 주소에서만 요청허용을 할 수 있게 설정
		optionsSuccessStatus: 200, // status설정
		credentials: true, // Access-Control-Allow-Credentials : true 설정
	})
);

app.get('/', (req, res) => {
	res.send('Welcome!');
});

app.listen(8080);

// npm i cors를 설치하면 header에 들어가는 내용을 외우지 않아도 접근허용을 할 수 있다
