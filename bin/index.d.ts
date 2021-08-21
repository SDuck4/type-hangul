/**
 * type-hangul
 * https://github.com/SDuck4/type-hangul
 *
 * MIT License
 * Copyright (c) 2020 Chae SeungWoo
 */
export interface Options {
    text?: string | null;
    append?: boolean;
    intervalType?: number;
    humanize?: number | Function | null;
}
declare const TypeHangul: {
    type: (selector: string, options?: Options | undefined) => void;
};
export default TypeHangul;
