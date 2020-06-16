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
