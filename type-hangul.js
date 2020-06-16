/**
 * type-hangul
 * https://github.com/SDuck4/type-hangul
 *
 * MIT License
 * Copyright (c) 2020 Chae SeungWoo
 */

(function () {

    var typeHangul = {};

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
