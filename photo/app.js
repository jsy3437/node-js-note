// const fs = require('fs').promises;
// const path = require('path');
// const EventEmitter = require('events');
// const emitter = new EventEmitter();

// const piping =
// 	// fs.mkdir('captured').catch(console.error);
// 	// fs.mkdir('duplicated').catch(console.error);
// 	// fs.mkdir('video').catch(console.error);

// 	emitter.on('nodeInfo', (args) => {
// 		console.log(args);
// 	});

// emitter.emit('nodeInfo', '----- start -----');

// fs.readdir('./test')
// 	.then((file) => {
// 		console.log(file);
// 		for (let i = 0; i < file.length; i++) {
// 			const fileExtname = path.extname(file[i]);
// 			const fileBasename = path.basename(file[i]);
// 			console.log(path.extname(file[i]));
// 			if (fileExtname === '.mp4' || fileExtname === '.mov') {
// 				console.log('aa');
// 			} else if (fileExtname === '.png' || fileExtname === '.aae') {
// 				console.log('bb');
// 			} else if (fileBasename.includes('_E')) {
// 				console.log('cc');
// 				const fileSplit = file[i].split('E', 2);
// 				file.map((el, idx) => {
// 					console.log('zz', fileSplit[1]);
// 					if (el.includes(fileSplit[1])) {
// 						//  el을 폴더로 보낸다
// 						console.log('!!!', idx);
// 					}
// 				});
// 			}
// 			// console.log(fileBasename.includes('_E'));
// 		}
// 	})
// 	.catch(console.error);

// emitter.emit('nodeInfo', '----- end -----');

//
//
// ellie의 풀이
// 계획

// 1. 사용자가 원하는 폴더의 이름을 받아온다
const path = require('path');
// 입력한 폴더이름 반영
const workingDir = path.join(os.homedir(), 'pictures', folder);
// console.log(process.argv);
// 사진을 정리할 폴더의 이름을 받아서 변수에 넣어준다
const folder = process.argv[2];

// 만약 폴더의 이름을 입력하지 않았다면 에러메세지를 띄워준다
if (!folder || !fs.existsSync(workingDir)) {
	console.error('please enter folder name in pictures');
	return;
}
// console.log(os.homedir);

//
// 2. 그 폴더안에 넣을 폴더를 만든다
// 변수에 폴더를 만드는 위치와 이름을 정의한다
const videoDir = path.join(workingDir, 'video');
const capturedDir = path.join(workingDir, 'captured');
const duplicateDir = path.join(workingDir, 'duplicate');
// 폴더가 존재하지 않으면 폴더를 만들어 준다
!fs.existsSync(videoDir) && fs.mkdirSync(videoDir);
!fs.existsSync(capturedDir) && fs.mkdirSync(capturedDir);
!fs.existsSync(duplicateDir) && fs.mkdirSync(duplicateDir);

//
// 3. 폴더안에 있는 파일들을 다 돌면서 해당하는 mp4|mov, png|aae, IMG_1234 (IMG_E1234)
fs.promises.readdir(workingDir).then(processFiles).catch(console.log);

function processFiles(files) {
	files.forEach((file) => {
		if (isVideoFile(file)) {
			move(file, videoDir);
		} else if (isCapturedFile(file)) {
			move(file, capturedDir);
		} else if (isDuplicatedFile) {
			move(file, duplicatedDir);
		}
	});
}
// 정규식을 사용해 파일 확장명과 동일하면 match에 넣어준다
function isVideoFile(file) {
	const regExp = /(mp4|mov)$/gm;
	const match = file.match(regExp);
	// match가 존재한다면 true 존재하지 않으면 false
	return !!match;
}
// 정규식을 사용해 파일 확장명과 동일하면 match에 넣어준다
function isCapturedFile(file) {
	const regExp = /(png|aae)$/gm;
	const match = file.match(regExp);
	// match가 존재한다면 true 존재하지 않으면 false
	return !!match;
}
//
function isDuplicatedFile(files, file) {
	// 만약 IMG_로 시작하지 않거나 IMG_E로 시작하지 않는 파일이면 내버려둔다
	if (!file.startsWith('IMG_') || file.startsWith('IMG_E')) {
		return false;
	}
	// IMG_로 시작하는 파일들 중에 E가 추가된 파일이 있는지 검사
	const edited = `IMG_E${file.split('_')[1]}`; // 구분자 '_' 기준으로 뒷쪽에 있는 이름을 합쳐서 													  	예측되는 파일이름을 변수에 담아놓는다
	const found = files.find((f) => f.includes(edited)); // 예측한 파일이름이 존재하는지 검사후 있다면 															true를 반환한다
	return !!found;
}

// 파일을 옮겨주는 함수
function move(file, targetDir) {
	// 어떤 실행이 됬는지 알 수 없으니 옮겨간 것들을 info해준다
	console.info(`move ${file} to ${path.basename(targetDir)}`); // path.basename()은 경로의 마지막만 																출력할 수 있게 해준다
	const oldPath = path.join(workingDir, file);
	const newPath = path.join(targetDir, file);
	// 파일을 옮길때는 fs.promises.rename을 사용하면 된다
	fs.promises
		.rename(oldPath, newPath) //
		.catch(console.error);
}

// 강의 노트

// - 유저나 사용자(개발자)를 믿지 않는다.

// - 사용자로부터 입력받는 데이터에 대해 모두 검증을 한다.

// - 폴더 만들기는 경로를 만들고 실제 폴더와 시스템을 연결하기 위해 mkdirsync를 사용하여 만든다. 폴더가 이미 존재하면 실행하지 않음으로  명제1(존재하지않으면) && 명제2(만든다)

// - readdir로 읽어온 후 if else if 문으로 전체적인 구조를 잡는다.

// - 확장자는 정규표현식으로

// - !!값= true, !!null=false 문법을 통해, 값에 의존적인 불리언 값을 편하게 만들어 리턴한다.

// -  duplicated할 때, 시간을 줄이기 위해 복잡한 계산전에 한번 필터로 거른다.

// - 파일 옮기는 것은 fs.promises.rename을 사용한다.

// 동작 하나하나 계획을 세워서 따로 함수로 작성하거나 분리해준다
