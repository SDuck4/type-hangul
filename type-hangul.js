/**
 * type-hangul
 * https://github.com/SDuck4/type-hangul
 *
 * MIT License
 * Copyright (c) 2020 Chae SeungWoo
 */

(function () {

        // 유니코드 한글 범위 시작, 가
    var HANGUL_RANGE_START = 0xAC00,

        // 유니코드 한글 범위 종료, 힣
        HANGUL_RANGE_END = 0xD7A3;

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
            if (typeof hangul === 'string') {
                hangul = hangul.charCodeAt(0);
            }
            if (_isHangul(hangul) === false) {
                return [];
            }
            return _split(hangul);
        },
        getTypeProcess: function (str) {
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
