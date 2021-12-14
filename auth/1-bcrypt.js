const bcrypt = require('bcrypt');

const password = 'abcd1234';

// hashSync => 암호화 (password,길이) / 길이는 10~12가 적당
const hashed = bcrypt.hashSync(password, 10);
console.log(`password: ${password}, hashed${hashed}`);

// compareSync => hash된 암호와 사용자가 보낸 암호 비교후 불리언형태로 반환 (사용자암호,가지고있는hash)
const result = bcrypt.compareSync('abcd1234', hashed);
console.log(result);
