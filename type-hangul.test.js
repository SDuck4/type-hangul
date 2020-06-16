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
