/**
 * type-hangul
 * https://github.com/SDuck4/type-hangul
 *
 * MIT License
 * Copyright (c) 2020 Chae SeungWoo
 */

import { d, a } from 'hangul-js';

// 기본 옵션
const DEFAULT_OPTIONS = {

    // 타이핑 사이 시간 간격, ms
    intervalType: 120,

    // 기존 텍스트 뒤에 이어서 출력할 지 여부
    append: false,

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
function _type(selector, text, options) {

    // 기본 옵션 적용
    options = _merge(DEFAULT_OPTIONS, options);

    // 출력 대상 DOM
    let target = document.querySelector(selector);

    // 타이핑 관련 변수들
    let textProcess = _process(text);
    let idxRun = 0;
    let idxType = 0;
    let interval = options.intervalType;
    let lastType;
    if (target.nodeName === 'INPUT') {
        lastType = options.append ? target.value : '';
    } else {
        lastType = options.append ? target.textContent : '';
    }

    // 타이핑 인터벌 함수
    function doType() {

        // run: 연속적으로 타이핑 되는 구간
        let run = textProcess[idxRun];

        // run 타이핑 완료
        if (idxType >= run.length) {
            idxRun = idxRun + 1;
            idxType = 0;
            lastType = target.textContent;
            if (target.nodeName === 'INPUT') {
                lastType = target.value;
            } else {
                lastType = target.textContent;
            }

            // text 타이핑 완료
            if (idxRun >= textProcess.length) {
                return;
            }

            setTimeout(doType, interval);
            return;
        }

        // 타이핑 과정 출력
        let typing = a(run.slice(0, idxType + 1));
        if (target.nodeName === 'INPUT') {
            target.value = lastType + typing;
        } else {
            target.textContent = lastType + typing;
        }
        idxType = idxType + 1;
        interval = options.intervalType;

        setTimeout(doType, interval);
    }

    // 타이핑 인터벌 시작
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

const TypeHangul = {
    type: function (selector, text, options) {

        // selector 필수 입력
        if (selector === undefined) {
            throw new Error("'selector' cannnot be undefined");
        }
        if (selector === null) {
            throw new Error("'selector' cannnot be null");
        }

        _type(selector, text, options);
    },
};

window.TypeHangul = TypeHangul;
export default TypeHangul;
