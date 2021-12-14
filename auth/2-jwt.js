const jwt = require('jsonwebtoken');

const secret = '5e9cT<{;uvS"426=j$_$(XThdv25*qd-';

const token = jwt.sign(
	{
		// 계속 주고 받을 내용이기 때문에 데이터를 낭비하지 않기위해 필수데이터만 넣어 준다
		id: 'userId',
		isAdmin: true,
	},
	// 시크릿 키는 임의적인 문자열도 상관은 없지만 비밀번호를 만들어주는 사이트에서 만드는게 낫다
	secret,
	// 만료시킬 시간 (2초)
	{ expiresIn: 2 }
);

// 임의의 토큰
const edited =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXJJZCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2MzkxMzE0MzZ9.etQs2R_a0jWanLfVwxEnbw2UlW1XzADjQs3Li5h98DI';

// verify => 클라이언트에게 전달받은 토큰과 가지고 있는 토큰을 비교
// (클라이언트토큰, 시크릿키, (error,decoded)=>{작업})
jwt.verify(token, secret, (error, decoded) => {
	console.log(error, decoded);
});

console.log(token);
