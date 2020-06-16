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

    var typeHangul = {
        isHangul: function (char) {
            if (typeof char === 'string') {
                char = char.charCodeAt(0);
            }
            return _isHangul(char);
        }
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
