/**
 * type-hangul
 * https://github.com/SDuck4/type-hangul
 *
 * MIT License
 * Copyright (c) 2020 Chae SeungWoo
 */

import { a, d } from "hangul-js";

export interface Options {
	text?: string | null;
	append?: boolean;
	intervalType?: number;
	humanize?: number | Function | null;
}

// 기본 옵션
const DEFAULT_OPTIONS: Options = {
	// 출력할 텍스트
	text: null,

	// 기존 텍스트 뒤에 이어서 출력할 지 여부
	append: false,

	// 타이핑 사이 시간 간격, ms
	intervalType: 120,

	// 사람이 타이핑하는 것처럼 intervalType를 랜덤화
	humanize: null
};

// text가 타이핑되는 과정을 반환함
function _process(text: string) {
	// Hangul로 text의 자모음 분리
	const disassembled = d(text, true);

	// 타이핑 run 합치기
	// run: 연속적으로 타이핑 되는 구간
	let textProcess: string[][] = [],
		run: string[] = [];
	for (let i in disassembled) {
		const charProcess = disassembled[i];
		if (charProcess.length > 1) run = run.concat(charProcess);
		else {
			if (run.length > 0) {
				textProcess.push(run);
				run = [];
			}
			textProcess.push(charProcess);
		}
	}
	if (run.length > 0) textProcess.push(run);

	return textProcess;
}

// text가 타이핑되는 과정을 selector로 선택한 DOM의 텍스트로 출력함
function _type(target: Element, options: Options) {
	// 기본 옵션 적용
	options = { ...DEFAULT_OPTIONS, ...options };

	// text가 정의되지 않은 경우, target의 내용을 text로 설정
	if (!options.text) options.text = _getText(target);

	let text = options.text,
		// 타이핑 관련 변수들
		textProcess = _process(text),
		idxRun = 0,
		idxType = 0,
		intervalType: number,
		lastType = options.append ? _getText(target) : "",
		progress = lastType;

	// intervalType 계산 함수
	function getIntervalType(): number {
		if (options.humanize === null) return options.intervalType!;

		if (typeof options.humanize === "number")
			return _humanize(options.intervalType!, options.humanize);

		if (typeof options.humanize === "function")
			return options.humanize(options.intervalType);

		throw new Error("'humanize' cannnot be " + typeof options.humanize);
	}

	// 타이핑 인터벌 함수
	function doType() {
		// run: 연속적으로 타이핑 되는 구간
		const run = textProcess[idxRun];

		// run 타이핑 완료
		if (idxType >= run.length) {
			idxRun = idxRun + 1;
			idxType = 0;
			lastType = _getText(target);

			// text 타이핑 완료
			if (idxRun >= textProcess.length) {
				const eventEndType = new CustomEvent("th.endType", {
					detail: {
						target,
						options
					}
				});
				target.dispatchEvent(eventEndType);
				return;
			}

			intervalType = getIntervalType();
			setTimeout(doType, intervalType);
			return;
		}

		// 타이핑 과정 출력
		const typing = a(run.slice(0, idxType + 1)),
			typeChar = run[idxType];

		const eventBeforeType = new CustomEvent("th.beforeType", {
			detail: {
				target,
				options,
				progress,
				typeChar
			}
		});
		target.dispatchEvent(eventBeforeType);

		progress = lastType + typing;
		_setText(target, progress);
		idxType = idxType + 1;

		const eventAfterType = new CustomEvent("th.afterType", {
			detail: {
				target,
				options,
				progress,
				typeChar
			}
		});
		target.dispatchEvent(eventAfterType);

		intervalType = getIntervalType();
		setTimeout(doType, intervalType);
	}

	// 타이핑 인터벌 시작
	const eventStartType = new CustomEvent("th.startType", {
		detail: {
			target,
			options
		}
	});
	target.dispatchEvent(eventStartType);
	doType();
}

// target DOM의 텍스트를 반환
function _getText(target: Element) {
	return target.nodeName === "INPUT"
		? (target as HTMLInputElement).value
		: target.textContent!;
}

// target DOM에 텍스트를 text로 설정
function _setText(target: Element, text: string) {
	if (target.nodeName === "INPUT") (target as HTMLInputElement).value = text;
	else target.textContent = text;
}

// 기본 humanize 함수, number를 ratio 비율로 랜덤화해서 반환
function _humanize(number: number, ratio: number) {
	const min = number - number * ratio,
		max = number + number * ratio;
	return Math.round(Math.random() * (max - min) + min);
}

const TypeHangul = {
	type: (selector: string, options: Options) => {
		// selector 필수 입력
		if (!selector) throw new Error("'selector' must be defined.");

		// 출력 대상 DOM
		const target = document.querySelectorAll(selector);
		for (let i = 0; i < target.length; i++) _type(target[i], options);
	}
};

(window as any).TypeHangul = TypeHangul;
export default TypeHangul;
