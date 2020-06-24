/**
 * type-hangul
 * https://github.com/SDuck4/type-hangul
 *
 * MIT License
 * Copyright (c) 2020 Chae SeungWoo
 */
'use strict';

import { d, a } from 'hangul-js';

// 기본 옵션
const DEFAULT_OPTIONS = {

    // 출력할 텍스트
    text: null,

    // 기존 텍스트 뒤에 이어서 출력할 지 여부
    append: false,

    // 타이핑 사이 시간 간격, ms
    intervalType: 120,

};

// text가 타이핑되는 과정을 반환함
function _process(text) {

    // Hangul로 text의 자모음 분리
    let disassembled = d(text, true);

    // 타이핑 run 합치기
    // run: 연속적으로 타이핑 되는 구간
    let textProcess = [];
    let run = [];
    for (let i in disassembled) {
        let charProcess = disassembled[i];
        if (charProcess.length > 1) {
            run = run.concat(charProcess);
        } else {
            if (run.length > 0) {
                textProcess.push(run);
                run = [];
            }
            textProcess.push(charProcess);
        }
    }
    if (run.length > 0) {
        textProcess.push(run);
    }

    return textProcess;

}

// text가 타이핑되는 과정을 selector로 선택한 DOM의 텍스트로 출력함
function _type(target, options) {

    // 기본 옵션 적용
    options = _merge(DEFAULT_OPTIONS, options);

    // text가 정의되지 않은 경우, target의 내용을 text로 설정
    if (options.text === null) {
        options.text = _getText(target);
    }
    let text = options.text;

    // 타이핑 관련 변수들
    let textProcess = _process(text);
    let idxRun = 0;
    let idxType = 0;
    let interval = options.intervalType;
    let lastType;
    lastType = options.append ? _getText(target) : '';

    // 타이핑 인터벌 함수
    function doType() {

        // run: 연속적으로 타이핑 되는 구간
        let run = textProcess[idxRun];

        // run 타이핑 완료
        if (idxType >= run.length) {
            idxRun = idxRun + 1;
            idxType = 0;
            lastType = target.textContent;
            lastType = _getText(target);

            // text 타이핑 완료
            if (idxRun >= textProcess.length) {
                const eventEndType = new CustomEvent('th.endType', {
                    detail: {
                        target,
                        options,
                    },
                });
                target.dispatchEvent(eventEndType);
                return;
            }

            setTimeout(doType, interval);
            return;
        }

        // 타이핑 과정 출력
        let typing = a(run.slice(0, idxType + 1));

        const eventBeforeType = new CustomEvent('th.beforeType', {
            detail: {
                target,
                options,
                typing,
            },
        });
        target.dispatchEvent(eventBeforeType);

        _setText(target, lastType + typing);
        idxType = idxType + 1;
        interval = options.intervalType;

        const eventAfterType = new CustomEvent('th.afterType', {
            detail: {
                target,
                options,
                typing,
            },
        });
        target.dispatchEvent(eventAfterType);

        setTimeout(doType, interval);
    }

    // 타이핑 인터벌 시작
    const eventStartType = new CustomEvent('th.startType', {
        detail: {
            target,
            options,
        },
    });
    target.dispatchEvent(eventStartType);
    doType();

}

// obj1에 obj2를 합친 객체를 반환
function _merge(obj1, obj2) {
    let merged = JSON.parse(JSON.stringify(obj1));
    for (let key in obj2) {
        merged[key] = obj2[key];
    }
    return merged;
}

// target DOM의 텍스트를 반환
function _getText(target) {
    if (target.nodeName === 'INPUT') {
        return target.value;
    } else {
        return target.textContent;
    }
}

// target DOM에 텍스트를 text로 설정
function _setText(target, text) {
    if (target.nodeName === 'INPUT') {
        target.value = text;
    } else {
        target.textContent = text;
    }
}

const TypeHangul = {
    type: function (selector, options) {

        // selector 필수 입력
        if (selector === undefined) {
            throw new Error("'selector' cannnot be undefined");
        }
        if (selector === null) {
            throw new Error("'selector' cannnot be null");
        }

        // 출력 대상 DOM
        let target = document.querySelectorAll(selector);
        for (let i = 0; i < target.length; i++) {
            _type(target[i], options);
        }

    },
};

window.TypeHangul = TypeHangul;
export default TypeHangul;
