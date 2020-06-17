const TypeHangul = require('./type-hangul');

describe('isHangul', () => {

    describe('char가 한글인 경우', () => {
        test('true 반환', () => {
            let char = '한';
            expect(TypeHangul.isHangul(char)).toBe(true);
        });
    });

    describe('char가 자음인 경우', () => {
        test('false 반환', () => {
            let char = 'ㅋ';
            expect(TypeHangul.isHangul(char)).toBe(false);
        });
    });

    describe('char가 모음인 경우', () => {
        test('false 반환', () => {
            let char = 'ㅟ';
            expect(TypeHangul.isHangul(char)).toBe(false);
        });
    });

    describe('char가 영문인 경우', () => {
        test('false 반환', () => {
            let char = 'A';
            expect(TypeHangul.isHangul(char)).toBe(false);
        });
    });

});

describe('join', () => {

    describe('유효한 cho, jung, jong인 경우', () => {
        test('합친 한글 반환', () => {
            let cho = 0;    // ㄱ
            let jung = 18;  // ㅡ
            let jong = 8;   // ㄹ
            expect(TypeHangul.join(cho, jung, jong)).toBe('글');
        });
    });

    describe('유효하지 않은 cho, jung, jong인 경우', () => {
        test('빈 문자열 반환', () => {
            let cho = -1;
            let jung = 99;
            let jong = 300;
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
            let typeProcess = [['ㅎ', '하', '한'], ['ㄱ', '그', '글']];
            expect(TypeHangul.getTypeProcess(text)).toStrictEqual(typeProcess);
        });
    });

    describe('text의 중성에 이중모음이 있는 경우', () => {
        test('이중모음 입력 과정을 포함한 타이핑 과정이 담긴 배열 반환', () => {
            let text = '외';
            let typeProcess = [['ㅇ', '오', '외']];
            expect(TypeHangul.getTypeProcess(text)).toStrictEqual(typeProcess);
        });
    });

    describe('text의 종성에 이중자음이 있는 경우', () => {
        test('이중자음 입력 과정을 포함한 타이핑 과정이 담긴 배열 반환', () => {
            let text = '슭';
            let typeProcess = [['ㅅ', '스', '슬', '슭']];
            expect(TypeHangul.getTypeProcess(text)).toStrictEqual(typeProcess);
        });
    });

    describe('text이 한글이 아닌 경우', () => {
        test('타이핑 과정이 담긴 배열 반환', () => {
            let text = 'Hello!!';
            let typeProcess = [['H'], ['e'], ['l'], ['l'], ['o'], ['!'], ['!']];
            expect(TypeHangul.getTypeProcess(text)).toStrictEqual(typeProcess);
        });
    });

});
