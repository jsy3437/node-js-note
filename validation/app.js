import express from 'express';
import { body, param, validationResult } from 'express-validator';

const app = express();
app.use(express.json());

// 유효성 검사 후 에러처리하는 함수, 검사요소 배열의 끝부분에 넣어준다
const validate = (req, res, next) => {
	const errors = validationResult(req);
	if (errors.isEmpty()) {
		return next();
	}
	// return res.status(400).json({ message: errors.array() }); -> error 배열의 전체 메세지 전부 보낸다
	return res.status(400).json({ message: errors.array()[0].msg }); // -> error 배열의 첫번째 메세지만 보낸다
};

// express-validation 라이브러리의 유효성검사 방법
// npm install을 한다
//  body,isLength등을 넣고 에러처리를 해준다
app.post(
	'/users',
	// req의 body를 검사, 체이닝 가능
	[
		body('name').isLength({ min: 2 }).withMessage('이름은 두글자 이상!'),
		body('age').isInt().withMessage('숫자를 입력해'),
		body('job.name').notEmpty(), // 객체 속을 검사할때는 .으로 구분
		validate,
	],
	(req, res, next) => {
		console.log(req.body);
		res.sendStatus(201);
	}
);

// email은 req의 param으로 들어와서 param으로 명시
// check를 쓰면 모든 요소들중에 해당하는 요소로 검사할 수 있지만 해당 요소를 찾는것도 비용이 들어갈 수 있으므로 정확하게 명시해 주는 것이 좋다.
app.get('/:email', param('email').isEmail().withMessage('이메일 입력해'), validate, (req, res, next) => {
	res.send('📧');
});

app.listen(8088);
