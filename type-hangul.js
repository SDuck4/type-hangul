/**
 * type-hangul
 * https://github.com/SDuck4/type-hangul
 *
 * MIT License
 * Copyright (c) 2020 Chae SeungWoo
 */

(function () {

    // 기본 옵션
    var DEFAULT_OPTIONS = {

        // 타이핑 사이 시간 간격, ms
        intervalType: 150,

        // 글자 사이 시간 간격, ms
        intervalChar: 200,

        // 기존 텍스트 뒤에 이어서 출력할 지 여부
        append: false,

    };

    // 유니코드 한글 범위 시작, 가
    var HANGUL_RANGE_START = 0xAC00;

    // 유니코드 한글 범위 종료, 힣
    var HANGUL_RANGE_END = 0xD7A3;

    // 한글 초성
    var HANGUL_CHO = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

    // char가 한글인 경우 true 반환
    function _isHangul(char) {
        return HANGUL_RANGE_START <= char && char <= HANGUL_RANGE_END;
    }

    // cho, jung, jong을 합친 한글 반환
    function _join(cho, jung, jong) {
        return String.fromCharCode(((cho * 21) + jung) * 28 + jong + HANGUL_RANGE_START);
    }

    // hangul을 나눈 [cho, jung, jong] 반환
    function _split(hangul) {
        hangul = hangul - HANGUL_RANGE_START;
        var jong = hangul % 28;
        var jung = ((hangul - jong) / 28) % 21;
        var cho = (((hangul - jong) / 28) - jung) / 21;
        return [cho, jung, jong];
    }

    // text을 타이핑하는 과정을 담은 배열 반환
    function _getTypeProcess(text) {
        var textProcess = [];
        for (var i in text) {
            var char = text[i];
            var jamos = typeHangul.split(char);

            // char가 한글이 아닌 경우
            if (jamos.length === 1) {
                textProcess.push(jamos);
                continue;
            }

            // char가 한글인 경우
            var cho = jamos[0];
            var jung = jamos[1];
            var jong = jamos[2];
            var charProcess = [];

            // 초성 타이핑
            charProcess.push(HANGUL_CHO[cho]);

            // 중성 타이핑
            switch (jung) {
                case 9:     // ㅘ : ㅗ ㅘ
                case 10:    // ㅙ : ㅗ ㅙ
                case 11:    // ㅚ : ㅗ ㅚ
                    charProcess.push(typeHangul.join(cho, 8, 0));
                    break;
                case 14:    // ㅝ : ㅜ ㅝ
                case 15:    // ㅞ : ㅜ ㅞ
                case 16:    // ㅟ : ㅜ ㅟ
                charProcess.push(typeHangul.join(cho, 13, 0));
                    break;
                case 19:    // ㅢ : ㅡ ㅢ
                charProcess.push(typeHangul.join(cho, 18, 0));
                    break;
            }
            charProcess.push(typeHangul.join(cho, jung, 0));

            // 종성 타이핑
            if (jong === 0) {
                textProcess.push(charProcess);
                continue;
            }
            switch (jong) {
                case 3:     // ㄳ : ㄱ ㄳ
                    charProcess.push(typeHangul.join(cho, jung, 1));
                    break;
                case 5:     // ㄵ : ㄴ ㄵ
                case 6:     // ㄶ : ㄴ ㄶ
                    charProcess.push(typeHangul.join(cho, jung, 4));
                    break;
                case 9:     // ㄺ : ㄹ ㄺ
                case 10:    // ㄻ : ㄹ ㄻ
                case 11:    // ㄼ : ㄹ ㄼ
                case 12:    // ㄽ : ㄹ ㄽ
                case 13:    // ㄾ : ㄹ ㄾ
                case 14:    // ㄿ : ㄹ ㄿ
                case 15:    // ㅀ : ㄹ ㅀ
                    charProcess.push(typeHangul.join(cho, jung, 8));
                    break;
                case 18:    // ㅄ : ㅂ ㅄ
                    charProcess.push(typeHangul.join(cho, jung, 17));
                    break;
            }
            charProcess.push(typeHangul.join(cho, jung, jong));
            textProcess.push(charProcess);
        }
        return textProcess;
    }

    // text가 타이핑되는 과정을 selector로 선택한 DOM의 텍스트로 출력함
    function _type(selector, text, options) {

        // 기본 옵션 적용
        options = _merge(DEFAULT_OPTIONS, options);

        // 출력 대상 DOM
        var target = document.querySelector(selector);

        // 타이핑 관련 변수들
        var typeProcess = typeHangul.getTypeProcess(text);
        var idxChar = 0;
        var idxType = 0;
        var interval = 0;
        var lastType;
        if (target.nodeName === 'INPUT') {
            lastType = options.append ? target.value : '';
        } else {
            lastType = options.append ? target.textContent : '';
        }

        // 타이핑 인터벌 함수
        function doType() {

            // char 타이핑 완료
            if (idxType >= typeProcess[idxChar].length) {
                idxChar = idxChar + 1;
                idxType = 0;
                interval = options.intervalChar;
                lastType = target.textContent;
                if (target.nodeName === 'INPUT') {
                    lastType = target.value;
                } else {
                    lastType = target.textContent;
                }

                // text 타이핑 완료
                if (idxChar >= typeProcess.length) {
                    return;
                }

                setTimeout(doType, interval);
                return;
            }

            // 타이핑 과정 출력
            if (target.nodeName === 'INPUT') {
                target.value = lastType + typeProcess[idxChar][idxType];
            } else {
                target.textContent = lastType + typeProcess[idxChar][idxType];
            }
            idxType = idxType + 1;
            interval = options.intervalType;

            setTimeout(doType, interval);
        }

        // 타이핑 인터벌 시작
        doType();
    }

    // val가 min ~ max 범위 안에 포함되는 숫자면 true 반환
    function _validateNumber(val, min, max) {
        if (typeof val !== 'number') {
            return false;
        }
        if (isNaN(val)) {
            return false;
        }
        return min <= val && val <= max;
    }

    // obj1에 obj2를 합친 객체를 반환
    function _merge(obj1, obj2) {
        var merged = JSON.parse(JSON.stringify(obj1));
        for (var key in obj2) {
            merged[key] = obj2[key];
        }
        return merged;
    }

    var typeHangul = {
        isHangul: function (char) {
            if (typeof char === 'string') {
                char = char.charCodeAt(0);
            }
            return _isHangul(char);
        },
        join: function (cho, jung, jong) {
            if (_validateNumber(cho, 0, 18) &&
                _validateNumber(jung, 0, 20) &&
                _validateNumber(jong, 0, 27)) {
                return _join(cho, jung, jong);
            }
            return '';
        },
        split: function (hangul) {
            if (typeHangul.isHangul(hangul) === false) {
                return [hangul];
            }
            if (typeof hangul === 'string') {
                hangul = hangul.charCodeAt(0);
            }
            return _split(hangul);
        },
        getTypeProcess: function (text) {
            if (typeof text !== 'string') {
                return [];
            }
            return _getTypeProcess(text);
        },
        type: function (selector, text, options) {
            _type(selector, text, options);
        },
    };

    if (typeof define == 'function' && define.amd) {
        define(function () {
            return typeHangul;
        });
    } else if (typeof module !== 'undefined') {
        module.exports = typeHangul;
    } else {
        window.TypeHangul = typeHangul;
    }

})();
