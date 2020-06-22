const TypeHangul = require('./type-hangul');

describe('type', () => {

    describe('intervalType 옵션 테스트', () => {
        test('타이핑 사이 시간 간격 1초', () => {
            jest.useFakeTimers();
            document.body.innerHTML = '<div id="target"></div>';
            let selector = '#target';
            let text = '안녕';
            let options = {
                intervalType: 1000,
                intervalChar: 0,
            };
            let target = document.querySelector('#target');
            let typeProcess = ['ㅇ', '아', '안', '안ㄴ', '안녀', '안녕'];
            TypeHangul.type(selector, text, options);
            for (let i = 0; i < typeProcess.length; i++) {
                expect(target.textContent).toBe(typeProcess[i]);
                jest.advanceTimersByTime(1000);
            }
        });
    });

    describe('intervalChar 옵션 테스트', () => {
        test('글자 사이 시간 간격 2초', () => {
            jest.useFakeTimers();
            document.body.innerHTML = '<div id="target"></div>';
            let selector = '#target';
            let text = '안녕';
            let options = {
                intervalType: 1000,
                intervalChar: 2000,
            };
            let target = document.querySelector('#target');
            let typeProcess = ['ㅇ', '아', '안', '안', '안', '안ㄴ', '안녀', '안녕'];
            TypeHangul.type(selector, text, options);
            for (let i = 0; i < typeProcess.length; i++) {
                expect(target.textContent).toBe(typeProcess[i]);
                jest.advanceTimersByTime(1000);
            }
        });
    });

    describe('append 옵션 테스트', () => {
        test('append가 true일 때 기존 텍스트 뒤에 출력', () => {
            jest.useFakeTimers();
            document.body.innerHTML = '<div id="target">이젠</div>';
            let selector = '#target';
            let text = '안녕';
            let options = {
                intervalType: 1000,
                intervalChar: 0,
                append: true,
            };
            let target = document.querySelector('#target');
            let typeProcess = ['이젠ㅇ', '이젠아', '이젠안', '이젠안ㄴ', '이젠안녀', '이젠안녕'];
            TypeHangul.type(selector, text, options);
            for (let i = 0; i < typeProcess.length; i++) {
                expect(target.textContent).toBe(typeProcess[i]);
                jest.advanceTimersByTime(1000);
            }
        });
    });

    describe('target이 <input> 태그일 때', () => {
        test('타이핑 과정이 value로 출력', () => {
            jest.useFakeTimers();
            document.body.innerHTML = '<input id="target">';
            let selector = '#target';
            let text = '안녕';
            let options = {
                intervalType: 1000,
                intervalChar: 0,
            };
            let target = document.querySelector('#target');
            let typeProcess = ['ㅇ', '아', '안', '안ㄴ', '안녀', '안녕'];
            TypeHangul.type(selector, text, options);
            for (let i = 0; i < typeProcess.length; i++) {
                expect(target.value).toBe(typeProcess[i]);
                jest.advanceTimersByTime(1000);
            }
        });
    });

    describe('target이 <textarea> 태그일 때', () => {
        test('타이핑 과정이 value로 출력', () => {
            jest.useFakeTimers();
            document.body.innerHTML = '<textarea id="target"></textarea>';
            let selector = '#target';
            let text = '안녕';
            let options = {
                intervalType: 1000,
                intervalChar: 0,
            };
            let target = document.querySelector('#target');
            let typeProcess = ['ㅇ', '아', '안', '안ㄴ', '안녀', '안녕'];
            TypeHangul.type(selector, text, options);
            for (let i = 0; i < typeProcess.length; i++) {
                expect(target.value).toBe(typeProcess[i]);
                jest.advanceTimersByTime(1000);
            }
        });
    });

});
