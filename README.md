[![version-info](https://img.shields.io/badge/release-v0.0.1-blue)](https://github.com/hiphop5782/password-checker/releases/latest)

# password checker (jquery plugin)

비밀번호 단계별 검사 jquery 플러그인입니다.

## 설치

### CDN 적용

아래 둘 중 하나를 작성

#### beautify

```html
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/hiphop5782/password-checker@0.0.1/dist/password-checker.css">
<script src="https://cdn.jsdelivr.net/gh/hiphop5782/password-checker@0.0.1/dist/password-checker.js"></script>
```

#### minify

```html
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/hiphop5782/password-checker@0.0.1/dist/password-checker.min.css">
<script src="https://cdn.jsdelivr.net/gh/hiphop5782/password-checker@0.0.1/dist/password-checker.min.js"></script>
```

### 사용법

```javascript
$(selector).passwordChecker({options});
```

### sample code

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>password pattern checker</title>
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/hiphop5782/password-checker@0.0.1/dist/password-checker.min.css">
    <style>
        *{
            box-sizing: border-box;
        }
        .container {
            width:400px;
            margin:auto;
        }
        .container > input[name=password],
        .container > .next-btn  {
            width:100%;
            display: block;
            font-size: 20px;
            padding: 0.5em;
            margin:0.5em 0;
        }
    </style>
    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/hiphop5782/password-checker@0.0.1/dist/password-checker.min.js"></script>
    <script>
        $(function(){
            $("input[name=password]").passwordChecker({
                display:{
                    target:"input[name=password] + .result",
                    showLevel:true,
                }
            });

            $("input[name=password").on("input", function(){
                const result = $(this).passwordChecker("judge");
                $(".next-btn").prop("disabled", !result);
            });
            
        });
    </script>
</head>
<body>
    <div class="container">
        <h1>Password checker demo</h1>
        <input type="password" name="password">
        <div class="result"></div>
        <button class="next-btn" disabled>다음</button>
    </div>
</body>
</html>
```

## options

생성 시 옵션을 설정하여 기본 옵션을 덮어쓰기 할 수 있습니다.

기본 옵션은 다음과 같습니다.

```javascript
{
    //검사 패턴 및 표시할 메세지
    patterns:[
        {regex:/[a-z]+/, text:"알파벳 소문자를 1개 이상 포함해야합니다"},
        {regex:/[A-Z]+/, text:"알파벳 대문자를 1개 이상 포함해야합니다"},
        {regex:/[0-9]+/, text:"숫자를 1개 이상 포함해야합니다"},
        {regex:/[!@#$]+/, text:"특수문자(!, @, #, $)를 1개 이상 포함해야합니다"},
    ],
    //표시 정보
    display:{
        target:null,//표시 대상 영역 선택자
        showLevel:false,//수준 표시(낮음/보통/높음/매우높음)

        //구분할 수준(수준 표시가 true일 경우) - 낮은 것부터 작성
        level:[
            {text:"낮음", color:"#ff7675", percent:33.3333},
            {text:"보통", color:"#fdcb6e", percent:66.6666},
            {text:"높음", color:"#00b894", percent:85},
            {text:"매우 높음", color:"#0984e3", percent:100}
        ],
    },
}
```

## 적용

다음과 같이 입력창을 생성합니다.
```html
<input type="password" name="password">
```

결과를 표시하고 싶다면 다음과 같이 결과 영역을 생성해야 합니다.
```html
<div class="result"></div>
```

jQuery를 이용하여 비밀번호 검사 도구를 생성합니다.
```javascript
$("input[type=password]").passwordChecker();
```

결과를 표시하고 싶은 영역을 지정하며 생성할 수 있습니다.
```javascript
$("input[name=password]").passwordChecker({
    display:{
        target:".result"
    }
});
```

모든 검사 조건을 만족하는지 확인하기 위해서는 다음과 같은 코드를 사용합니다.

```javascript
$("input[name=password]").passwordChecker("judge");
```

판정 결과가 `boolean` 형태로 반환되며, 만약 여러 개를 선택한 경우 모든 입력창의 검사 통과 여부가 반환다.
