/**
 * type-hangul
 * https://github.com/SDuck4/type-hangul
 *
 * MIT License
 * Copyright (c) 2020 Chae SeungWoo
 */

(function () {

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

    // str을 타이핑하는 과정을 담은 배열 반환
    function _getTypeProcess(str) {
        var typeProcess = [];
        var lastType = '';
        for (var i in str) {
            var char = str[i];
            var jamos = typeHangul.split(char);

            // char가 한글이 아닌 경우
            if (jamos.length === 1) {
                lastType = lastType + jamos[0];
                typeProcess.push(lastType);
                continue;
            }

            // char가 한글인 경우
            var cho = jamos[0];
            var jung = jamos[1];
            var jong = jamos[2];

            // 초성 타이핑
            typeProcess.push(lastType + HANGUL_CHO[cho]);

            // 중성 타이핑
            switch (jung) {
                case 9:     // ㅘ : ㅗ ㅘ
                case 10:    // ㅙ : ㅗ ㅙ
                case 11:    // ㅚ : ㅗ ㅚ
                    typeProcess.push(lastType + typeHangul.join(cho, 8, 0));
                    break;
                case 14:    // ㅝ : ㅜ ㅝ
                case 15:    // ㅞ : ㅜ ㅞ
                case 16:    // ㅟ : ㅜ ㅟ
                typeProcess.push(lastType + typeHangul.join(cho, 13, 0));
                    break;
                case 19:    // ㅢ : ㅡ ㅢ
                typeProcess.push(lastType + typeHangul.join(cho, 18, 0));
                    break;
            }
            typeProcess.push(lastType + typeHangul.join(cho, jung, 0));

            // 종성 타이핑
            if (jong === 0) {
                lastType = lastType + char;
                continue;
            }
            switch (jong) {
                case 3:     // ㄳ : ㄱ ㄳ
                    typeProcess.push(lastType + typeHangul.join(cho, jung, 1));
                    break;
                case 5:     // ㄵ : ㄴ ㄵ
                case 6:     // ㄶ : ㄴ ㄶ
                    typeProcess.push(lastType + typeHangul.join(cho, jung, 4));
                    break;
                case 9:     // ㄺ : ㄹ ㄺ
                case 10:    // ㄻ : ㄹ ㄻ
                case 11:    // ㄼ : ㄹ ㄼ
                case 12:    // ㄽ : ㄹ ㄽ
                case 13:    // ㄾ : ㄹ ㄾ
                case 14:    // ㄿ : ㄹ ㄿ
                case 15:    // ㅀ : ㄹ ㅀ
                    typeProcess.push(lastType + typeHangul.join(cho, jung, 8));
                    break;
                case 18:    // ㅄ : ㅂ ㅄ
                    typeProcess.push(lastType + typeHangul.join(cho, jung, 17));
                    break;
            }
            typeProcess.push(lastType + typeHangul.join(cho, jung, jong));
            lastType = lastType + char;
        }
        return typeProcess;
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
        getTypeProcess: function (str) {
            if (typeof str !== 'string') {
                return [];
            }
            return _getTypeProcess(str);
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
