//鼠标移动特效
/*
(function () {
    var colors = ["#D61C59", "#E7D84B", "#1B8798","#D6316A","#2393A1","#F0E04F"];
    characters = ["O", "o"];
    elementGroup = [];
    //定义元素类
    class Element {
        //构造函数
        constructor() {
            num = Math.floor(Math.random() * characters.length);
            this.character = characters[num];
            this.lifeSpan = 120;
            this.initialStyles = {
                position: "fixed",
                top: "0",
                display: "block",
                pointerEvents: "none",
                "z-index": "10000000",
                fontSize: "25px",
                "will-change": "transform",
                color: "#000000"
            };
            //初始化
            this.init = function (x, y, color) {
                this.velocity = { x: (Math.random() < .5 ? -1 : 1) * (Math.random() / 2), y: 1 };
                this.position = { x: x - 10, y: y - 20 };
                this.initialStyles.color = color;
                this.element = document.createElement("span");
                this.element.innerHTML = this.character;
                ApplyStyle(this.element, this.initialStyles);
                this.update();
                document.body.appendChild(this.element);
            };
            //更新
            this.update = function () {
                //移动，缩放
                this.position.x += this.velocity.x;
                this.position.y += this.velocity.y;
                this.lifeSpan--;
                this.element.style.transform = "translate3d(" + this.position.x + "px," + this.position.y + "px,0) scale(" + this.lifeSpan / 120 + ")";
            };
            //销毁
            this.die = function () {
                this.element.parentNode.removeChild(this.element);
            };
        }
    }

    AddListener();
    //循环
    setInterval(
        function () {
            Rander();
        },
        300 / 60);
    //添加事件监听器
    function AddListener() {
        //当前事件对象会作为第一个参数传入函数
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("touchmove", Touch);
        document.addEventListener("touchstart", Touch);
    }
    //逐个渲染
    function Rander() {
        for (var i = 0; i < elementGroup.length; i++) {
            elementGroup[i].update();
            if (elementGroup[i].lifeSpan < 0) {
                elementGroup[i].die();
                elementGroup.splice(i, 1);
            }
        }
    }
    //鼠标移动事件函数
    function onMouseMove(t) {
        num = Math.floor(Math.random() * colors.length);
        CreateElement(t.clientX, t.clientY, colors[num]);
    }
    //添加元素
    function CreateElement(x, y, color) {
        var e = new Element;
        e.init(x, y, color);
        elementGroup.push(e);
    }
    //调整元素属性
    function ApplyStyle(element, style) {
        for (var i in style) {
            element.style[i] = style[i];
        }
    }
    //触摸事件函数
    function Touch(t) {
        if (t.touches.length > 0) {
            for (var i = 0; i < t.touches.length; i++) {
                num = Math.floor(Math.random() * r.length);
                s(t.touches[i].clientX, t.touches[i].clientY, r[num]);
            }
        }
    }
})();
*/

(function () {
    var colors = ["#D61C59", "#E7D84B", "#1B8798","#D6316A","#2393A1","#F0E04F"];
    characters = ["O", "o"];
    elementGroup = [];
    var lastTime = 0;  // 用于节流控制的时间戳
    var throttleDelay = 30;  // 调整生成频率，单位毫秒

    //定义元素类
    class Element {
        constructor() {
            num = Math.floor(Math.random() * characters.length);
            this.character = characters[num];
            this.lifeSpan = 120;
            this.initialStyles = {
                position: "fixed",
                top: "0",
                display: "block",
                pointerEvents: "none",
                "z-index": "10000000",
                fontSize: "25px",
                "will-change": "transform",
                color: "#000000"
            };
            this.init = function (x, y, color) {
                this.velocity = { x: (Math.random() < .5 ? -1 : 1) * (Math.random() / 2), y: 1 };
                this.position = { x: x - 10, y: y - 20 };
                this.initialStyles.color = color;
                this.element = document.createElement("span");
                this.element.innerHTML = this.character;
                ApplyStyle(this.element, this.initialStyles);
                this.update();
                document.body.appendChild(this.element);
            };
            this.update = function () {
                this.position.x += this.velocity.x;
                this.position.y += this.velocity.y;
                this.lifeSpan--;
                this.element.style.transform = "translate3d(" + this.position.x + "px," + this.position.y + "px,0) scale(" + this.lifeSpan / 120 + ")";
            };
            this.die = function () {
                this.element.parentNode.removeChild(this.element);
            };
        }
    }

    AddListener();

    setInterval(function () {
        Rander();
    }, 300 / 60);

    function AddListener() {
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("touchmove", Touch);
        document.addEventListener("touchstart", Touch);
    }

    function Rander() {
        for (var i = 0; i < elementGroup.length; i++) {
            elementGroup[i].update();
            if (elementGroup[i].lifeSpan < 0) {
                elementGroup[i].die();
                elementGroup.splice(i, 1);
            }
        }
    }

    function onMouseMove(t) {
        var now = new Date().getTime();
        if (now - lastTime >= throttleDelay) {
            num = Math.floor(Math.random() * colors.length);
            CreateElement(t.clientX, t.clientY, colors[num]);
            lastTime = now;
        }
    }

    function CreateElement(x, y, color) {
        var e = new Element;
        e.init(x, y, color);
        elementGroup.push(e);
    }

    function ApplyStyle(element, style) {
        for (var i in style) {
            element.style[i] = style[i];
        }
    }

    function Touch(t) {
        if (t.touches.length > 0) {
            for (var i = 0; i < t.touches.length; i++) {
                num = Math.floor(Math.random() * r.length);
                s(t.touches[i].clientX, t.touches[i].clientY, r[num]);
            }
        }
    }
})();