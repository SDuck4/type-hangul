const TypeHangul = require('./type-hangul');

describe('isHangul', () => {

    describe('char가 한글인 경우', () => {
        let char = '한';
        test('true 반환', () => {
            expect(TypeHangul.isHangul(char)).toBe(true);
        });
    });

    describe('char가 자음인 경우', () => {
        let char = 'ㅋ';
        test('false 반환', () => {
            expect(TypeHangul.isHangul(char)).toBe(false);
        });
    });

    describe('char가 모음인 경우', () => {
        let char = 'ㅟ';
        test('false 반환', () => {
            expect(TypeHangul.isHangul(char)).toBe(false);
        });
    });

    describe('char가 영문인 경우', () => {
        let char = 'A';
        test('false 반환', () => {
            expect(TypeHangul.isHangul(char)).toBe(false);
        });
    });

});

describe('join', () => {

    describe('유효한 cho, jung, jong인 경우', () => {
        let cho = 0,
            jung = 18,
            jong = 8;
        test('합친 한글 반환', () => {
            expect(TypeHangul.join(cho, jung, jong)).toBe('글');
        });
    });

    describe('유효하지 않은 cho, jung, jong인 경우', () => {
        let cho = -1,
            jung = 99,
            jong = 300;
        test('빈 문자열 반환', () => {
            expect(TypeHangul.join(cho, jung, jong)).toBe('');
        });
    });

});

describe('split', () => {

    describe('hangul이 한글인 경우', () => {
        test('분해한 초중종성 배열 반환', () => {
            let hangul = '글';
            expect(TypeHangul.split(hangul)).toStrictEqual([0, 18, 8]);
        });
    });

    describe('hangul이 한글이 아닌 경우', () => {
        test('hangul이 담긴 배열 반환', () => {
            let hangul = '1';
            expect(TypeHangul.split(hangul)).toStrictEqual(['1']);
        });
    });

});

describe('getTypeProcess', () => {

    describe('text가 문자열이 아닌 경우', () => {
        test('빈 배열 반환', () => {
            let text = 1234;
            let typeProcess = [];
            expect(TypeHangul.getTypeProcess(text)).toStrictEqual(typeProcess);
        });
    });

    describe('text가 한글인 경우', () => {
        test('한글 두벌식 타이핑 과정이 담긴 배열 반환', () => {
            let text = '한글';
            let typeProcess = ['ㅎ', '하', '한', '한ㄱ', '한그', '한글'];
            expect(TypeHangul.getTypeProcess(text)).toStrictEqual(typeProcess);
        });
    });

    describe('text의 중성에 이중모음이 있는 경우', () => {
        test('이중모음 입력 과정을 포함한 타이핑 과정이 담긴 배열 반환', () => {
            let text = '외';
            let typeProcess = ['ㅇ', '오', '외'];
            expect(TypeHangul.getTypeProcess(text)).toStrictEqual(typeProcess);
        });
    });

    describe('text의 종성에 이중자음이 있는 경우', () => {
        test('이중자음 입력 과정을 포함한 타이핑 과정이 담긴 배열 반환', () => {
            let text = '슭';
            let typeProcess = ['ㅅ', '스', '슬', '슭'];
            expect(TypeHangul.getTypeProcess(text)).toStrictEqual(typeProcess);
        });
    });

    describe('text이 한글이 아닌 경우', () => {
        test('타이핑 과정이 담긴 배열 반환', () => {
            let text = 'Hello!!';
            let typeProcess = ['H', 'He', 'Hel', 'Hell', 'Hello', 'Hello!', 'Hello!!'];
            expect(TypeHangul.getTypeProcess(text)).toStrictEqual(typeProcess);
        });
    });

});
