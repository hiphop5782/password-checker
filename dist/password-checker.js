(function($){
    //External source - https://gist.github.com/ahtcx/0cd94e62691f539160b32ecda18af3d6
    const merge = (target, source) => {
        // Iterate through `source` properties and if an `Object` set property to merge of `target` and `source` properties
        for (let key of Object.keys(source)) {
            if (source[key] instanceof Object) {
                Object.assign(source[key], merge(target[key], source[key]));
            }
        }

        // Join `target` and modified `source`
        Object.assign(target || {}, source);
        return target;
    }

    let components;

    $.fn.passwordChecker = function(options){
        if(typeof options === undefined || typeof options === "object"){
            const settings = merge({
                //기본 옵션
                patterns:[
                    {regex:/[a-z]+/, text:"알파벳 소문자를 1개 이상 포함해야합니다"},
                    {regex:/[A-Z]+/, text:"알파벳 대문자를 1개 이상 포함해야합니다"},
                    {regex:/[0-9]+/, text:"숫자를 1개 이상 포함해야합니다"},
                    {regex:/[!@#$]+/, text:"특수문자(!, @, #, $)를 1개 이상 포함해야합니다"},
                ],
                display:{
                    target:null,
                    showLevel:false,
                    level:[
                        {text:"낮음", color:"#ff7675", percent:33.3333},
                        {text:"보통", color:"#fdcb6e", percent:66.6666},
                        {text:"높음", color:"#00b894", percent:85},
                        {text:"매우 높음", color:"#0984e3", percent:100}
                    ],
                },
            }, options || {});

            components = this.each(function(){
                $(this).addClass("password-checker");

                this.data = settings.patterns.map(pattern=>{
                    return {regex:pattern.regex, text:pattern.text, result:false}
                });
                this.getResult = function(){
                    return this.data.map(d=>d.result).reduce((p,n)=>p&&n);
                };
                this.judge = function(value){
                    for(let i=0; i < this.data.length; i++){
                        this.data[i].result = this.data[i].regex.test(value);
                    }
                };
                this.clear = function(){
                    for(let i=0; i < this.data.length; i++){
                        this.data[i].result = false;
                    }
                };
                this.display = function(){
                    if(!settings.display.target) return;
                    const target = $(settings.display.target);
                    if(target.length == 0) return;

                    target.empty();
                    
                    if(settings.display.showLevel){
                        const levelDiv = $("<div>").addClass("level-viewer").css({
                            margin:"0.2em 0",
                            width:"100%",
                            display:"flex",
                            "align-items":"center",
                        });
                        const percentDiv = $("<div>").addClass("percent").css({
                            "flex-grow":1,
                            "height":"1em"
                        });
                        percentDiv.appendTo(levelDiv);

                        const styleObject = this.getPercentByLevel();
                        const progressDiv = $("<div>").addClass("progress").css({
                            "width": styleObject.percent+"%",
                            "height":"100%",
                            "background-color": styleObject.color,
                            "transition":"all ease-in-out 0.5s"
                        });
                        progressDiv.appendTo(percentDiv);
                        const textDiv = $("<div>").addClass("text").css({
                            "margin-left":"1em",
                            color: styleObject.color
                        }).text(styleObject.text);
                        textDiv.appendTo(levelDiv);
                        target.append(levelDiv);
                    }

                    for(let i=0; i < this.data.length; i++){
                        $("<div>").addClass("password-checker-output")
                                        .addClass(this.data[i].result ? "pass" : "fail")
                                        .text(this.data[i].text)
                                        .appendTo(target);
                    }
                };

                this.getPercentByLevel = function(){
                    //percent 계산
                    let correct = 0, incorrect = 0;
                    for(let i=0; i < this.data.length; i++){
                        this.data[i].result ? correct++ : incorrect++;
                    }
                    let percent = correct / this.data.length * 100;

                    //해당 스타일 반환
                    for(let i=0; i < settings.display.level.length; i++){
                        if(percent <= settings.display.level[i].percent){
                            return settings.display.level[i];
                        }
                    }
                },

                $(this).on("input", function(){
                    const value = $(this).val();
                    this.judge(value);
                    this.display();
                });
                
                this.display();
            });
            return components;
        }
        
        else if(typeof options === "string"){
            if(options === "judge"){
                return $.map(components, (c)=>c.getResult()).reduce((p,n)=>p && n);
            }
        }
    };
})(jQuery);