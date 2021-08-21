import TypeHangul from ".";

describe("type()", () => {
	describe("text 옵션으로 출력할 텍스트를 설정할 수 있다.", () => {
		it("text가 설정되어 있으면 기존 텍스트는 무시하고 타이핑된다.", () => {
			jest.useFakeTimers();
			document.body.innerHTML = '<div id="target">안녕</div>';
			const selector = "#target",
				options = {
					text: "타이핑",
					intervalType: 1000
				},
				target = document.querySelector("#target")!,
				textProcess = ["ㅌ", "타", "탕", "타이", "타잎", "타이피", "타이핑"];
			TypeHangul.type(selector, options);
			for (let i = 0; i < textProcess.length; i++) {
				expect(target.textContent).toBe(textProcess[i]);
				jest.advanceTimersByTime(1000);
			}
		});
	});

	describe("append 옵션으로 기존 텍스트 뒤에 출력할 수 있다.", () => {
		it("append가 true일 때 기존 텍스트 뒤에 출력된다.", () => {
			jest.useFakeTimers();
			document.body.innerHTML = '<div id="target">이젠</div>';
			const selector = "#target",
				options = {
					text: "안녕",
					append: true,
					intervalType: 1000
				},
				target = document.querySelector("#target")!,
				textProcess = [
					"이젠ㅇ",
					"이젠아",
					"이젠안",
					"이젠안ㄴ",
					"이젠안녀",
					"이젠안녕"
				];
			TypeHangul.type(selector, options);
			for (let i = 0; i < textProcess.length; i++) {
				expect(target.textContent).toBe(textProcess[i]);
				jest.advanceTimersByTime(1000);
			}
		});
	});

	describe("intervalType 옵션으로 타이핑 사이 시간 간격을 조절할 수 있다.", () => {
		it("intervalType이 1000 일 때, 1초 간격으로 타이핑된다.", () => {
			jest.useFakeTimers();
			document.body.innerHTML = '<div id="target">타이핑</div>';
			const selector = "#target",
				options = {
					intervalType: 1000
				},
				target = document.querySelector("#target")!,
				textProcess = ["ㅌ", "타", "탕", "타이", "타잎", "타이피", "타이핑"];
			TypeHangul.type(selector, options);
			for (let i = 0; i < textProcess.length; i++) {
				expect(target.textContent).toBe(textProcess[i]);
				jest.advanceTimersByTime(1000);
			}
		});
	});

	describe("target이 <input> 태그일 때 value에 출력된다.", () => {
		it("타이핑 과정이 value로 출력된다.", () => {
			jest.useFakeTimers();
			document.body.innerHTML = '<input id="target">';
			const selector = "#target",
				options = {
					text: "타이핑",
					intervalType: 1000
				},
				target = document.querySelector("#target") as HTMLInputElement,
				textProcess = ["ㅌ", "타", "탕", "타이", "타잎", "타이피", "타이핑"];
			TypeHangul.type(selector, options);
			for (let i = 0; i < textProcess.length; i++) {
				expect(target.value).toBe(textProcess[i]);
				jest.advanceTimersByTime(1000);
			}
		});
	});

	describe("selector로 여러 DOM을 선택해 적용할 수 있다.", () => {
		it("여러 DOM이 선택될 때, 선택된 모든 DOM에 타이핑 효과가 적용된다.", () => {
			jest.useFakeTimers();

			document.body.innerHTML =
				'<div id="t1" class="target">한글</div>' +
				'<div id="t2" class="target">타이핑</div>' +
				'<div id="t3" class="target">효과</div>';
			const selector = ".target",
				options = {
					intervalType: 1000
				},
				t1 = document.querySelector("#t1")!,
				t1Process = ["ㅎ", "하", "한", "한ㄱ", "한그", "한글"],
				t2 = document.querySelector("#t2")!,
				t2Process = ["ㅌ", "타", "탕", "타이", "타잎", "타이피", "타이핑"],
				t3 = document.querySelector("#t3")!,
				t3Process = ["ㅎ", "효", "횩", "효고", "효과"];

			TypeHangul.type(selector, options);
			for (let i = 0; i < t2Process.length; i++) {
				if (i < t1Process.length) expect(t1.textContent).toBe(t1Process[i]);
				if (i < t2Process.length) expect(t2.textContent).toBe(t2Process[i]);
				if (i < t3Process.length) expect(t3.textContent).toBe(t3Process[i]);
				jest.advanceTimersByTime(1000);
			}
		});
	});
});
