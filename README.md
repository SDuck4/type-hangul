# type-hangul

⌨️ 한글 타이핑 효과 라이브러리

## 개요

한글 두벌식 자판에서 한 글자씩 타이핑되는 과정을 보여줄 수 있는 라이브러리입니다.

## 설치

### CDN

```html
<!-- 의존 라이브러리와 별개로 로드 -->
<script src="https://unpkg.com/hangul-js"></script>
<script src="https://unpkg.com/type-hangul@latest/dist/type-hangul.min.js"></script>

<!-- 의존 라이브러리 번들한 파일 로드 -->
<script src="https://unpkg.com/type-hangul"></script>
```

### 직접 다운로드

[GitHub Releases](https://github.com/SDuck4/type-hangul/releases)에서 최신 릴리즈를 직접 다운로드 받아 사용하실 수 있습니다.

## 사용법

```html
<div id="target">안녕하세요.</div>
<script>
    TypeHangul.type('#target');
</script>
```

### `TypeHangul.type(selector [, options])`

- `selector`: 타이핑 효과를 출력할 DOM의 CSS Selector, 필수
- `options`: 효과 옵션, 생략 가능

## 옵션

### `text`

- 타입: `string`
- 기본값: `null`

출력할 텍스트를 설정합니다. 설정하지 않을 경우, `selector`로 선택한 DOM의 텍스트를 출력합니다.

### `append`

- 타입: `boolean`
- 기본값: `false`

기존 텍스트 뒤에 이어서 출력할 지 여부를 설정합니다. `true`로 설정할 경우, `selector`로 선택한 DOM의 텍스트 뒤에 이어서 출력합니다.

### `intervalType`

- 타입: `number`
- 기본값: `120`

타이핑 사이 시간 간격을 설정합니다.

## 이벤트

타이핑 진행 과정에 따라 `selector`로 선택된 DOM에 이벤트([CustomEvent](https://developer.mozilla.org/ko/docs/Web/API/CustomEvent))를 발생시킵니다. 이벤트 리스너의 첫 번째 매개변수 `e`의 `detail`로 이벤트 데이터를 전달합니다.

```html
<div id="target">타이핑</div>
<script>
    var $target = document.querySelector('#target');
    $target.addEventListener('th.afterType', function (e) {
        console.log(e.detail.progress);
    });
    TypeHangul.type('#target');
</script>
```
```
ㅌ
타
탕
타이
타잎
타이피
타이핑
```

### `th.startType`

- `target`: 타이핑 효과 대상 DOM
- `options`: `type()` 호출 시 옵션과 기본 옵션을 합친 객체

타이핑을 시작할 때 발생합니다.

> `th.startType` 이벤트는 `type()` 호출 직후에 이벤트가 발생합니다. 이벤트 리스너가 정상적으로 동작하기 위해서는 `type()` 호출 이전에 리스너를 추가하세요.

### `th.endType`

- `target`: 타이핑 효과 대상 DOM
- `options`: `type()` 호출 시 옵션과 기본 옵션을 합친 객체

타이핑을 종료할 때 발생합니다.

### `th.beforeType`

- `target`: 타이핑 효과 대상 DOM
- `options`: `type()` 호출 시 옵션과 기본 옵션을 합친 객체
- `progress`: 현재까지 출력한 타이핑 텍스트
- `typeChar`: 이번에 타이핑할 문자

매번 타이핑 이전에 발생합니다.

### `th.afterType`

- `target`: 타이핑 효과 대상 DOM
- `options`: `type()` 호출 시 옵션과 기본 옵션을 합친 객체
- `progress`: 현재까지 출력한 타이핑 텍스트
- `typeChar`: 이번에 타이핑한 문자

매번 타이핑 이후에 발생합니다.

## License

[MIT](https://github.com/SDuck4/type-hangul/blob/master/LICENSE)
