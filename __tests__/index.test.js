const TypeHangul = require('../src/index');

describe('type()', () => {

    describe('intervalType 옵션으로 타이핑 사이 시간 간격을 조절할 수 있다.', () => {
        it('intervalType이 1000 일 때, 1초 간격으로 타이핑된다.', () => {
            jest.useFakeTimers();
            document.body.innerHTML = '<div id="target"></div>';
            let selector = '#target';
            let text = '타이핑';
            let options = {
                intervalType: 1000,
                intervalChar: 0,
            };
            let target = document.querySelector('#target');
            let textProcess = ['ㅌ', '타', '탕', '타이', '타잎', '타이피', '타이핑'];
            TypeHangul.type(selector, text, options);
            for (let i = 0; i < textProcess.length; i++) {
                expect(target.textContent).toBe(textProcess[i]);
                jest.advanceTimersByTime(1000);
            }
        });
    });

    describe('append 옵션으로 기존 텍스트 뒤에 출력할 수 있다.', () => {
        it('append가 true일 때 기존 텍스트 뒤에 출력된다.', () => {
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
            let textProcess = ['이젠ㅇ', '이젠아', '이젠안', '이젠안ㄴ', '이젠안녀', '이젠안녕'];
            TypeHangul.type(selector, text, options);
            for (let i = 0; i < textProcess.length; i++) {
                expect(target.textContent).toBe(textProcess[i]);
                jest.advanceTimersByTime(1000);
            }
        });
    });

    describe('target이 <input> 태그일 때 value에 출력된다.', () => {
        it('타이핑 과정이 value로 출력된다.', () => {
            jest.useFakeTimers();
            document.body.innerHTML = '<input id="target">';
            let selector = '#target';
            let text = '타이핑';
            let options = {
                intervalType: 1000,
                intervalChar: 0,
            };
            let target = document.querySelector('#target');
            let textProcess = ['ㅌ', '타', '탕', '타이', '타잎', '타이피', '타이핑'];
            TypeHangul.type(selector, text, options);
            for (let i = 0; i < textProcess.length; i++) {
                expect(target.value).toBe(textProcess[i]);
                jest.advanceTimersByTime(1000);
            }
        });
    });

});
