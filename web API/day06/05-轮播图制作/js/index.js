function animate(obj, target, callback) {
    // console.log(callback);   callback = function(){}   调用的时候 callback()

    // 先清除以前的定时器，只保留当前的一个定时器执行
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        // 步长值写到定时器的里面
        // 把步长值改为整数 不要出现小数的问题
        // var step = Math.ceil((target - obj.offsetLeft) / 10);
        var step = ((target - obj.offsetLeft) / 10);
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            // 停止动画 本质是停止定时器
            clearInterval(obj.timer);
            //回调函数写到定时器结束里面
            // if (callback) {
            //     callback();
            // }
            callback && callback(); // 短路与，前面一个是true，后面的才执行，与if语句大同小异
        }
        // 把每次加1 这个步长值改为一个慢慢变小的值  步长公式：(目标值 - 现在的位置) / 10
        obj.style.left = obj.offsetLeft + step + 'px';

    }, 20);
}
window.addEventListener('load', function() {
    // 1.获取元素
    var arrow_l = this.document.querySelector('.arrow-l');
    var arrow_r = this.document.querySelector('.arrow-r');
    var focus = this.document.querySelector('.focus');
    // 2.鼠标经过 focus就显示隐藏左右按钮
    focus.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null;
    })
    focus.addEventListener('mouseleave', function() {
            arrow_l.style.display = 'none';
            arrow_r.style.display = 'none';
            timer = setInterval(function() {
                // 手动调用事件
                arrow_r.click();
            }, 2000);
        })
        // 3.动态生成小圈圈 有几张图片就生成几个小圈圈
    var focusWidth = focus.offsetWidth;
    var ul = focus.querySelector('ul');
    var circle = this.document.querySelector('.circle');
    // console.log(ul.children.length);
    for (var i = 0; i < ul.children.length; i++) {
        // 创建小li
        var li = this.document.createElement('li');
        // 记录当前小圆圈的索引号 通过自定义属性来实现
        li.setAttribute('index', i);
        // 把小li插入到ol里面去
        circle.appendChild(li);
        // 4.小圈圈的排他思想 我们可以直接在生成小圈圈的同时绑定点击事件
        li.addEventListener('click', function() {
            //干掉所有人 把所有的li都清除current 类名
            for (var i = 0; i < circle.children.length; i++) {
                circle.children[i].className = '';
            }
            //留下我自己 当前li 设置current 类名
            this.className = 'current';
            // 5.点击小圈圈 移动图片 移动的是ul
            // ul的移动距离就是 小圈圈的宽度才 乘以 图片的宽度 注意是负值
            // 当前我们点击了某个小li 就拿当前 li 的索引号
            var index = this.getAttribute('index');
            // 当我们点击了某个li 就要把这个 li 的索引号给num
            num = index;
            circleNum = index;
            // console.log(index);
            // console.log(focusWidth);
            // animate(obj, target, callback);
            animate(ul, -index * focusWidth);
        })

    }
    // 把ol里面的第一个小li设置类名为 current
    circle.children[0].className = 'current';
    // 6.克隆最后一张图片(li) 放到ul最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    // 7.点击右侧按钮 图片滚动一张
    var num = 0;
    // 控制小圆点与箭头点击一样
    var circleNum = 0;
    var flag = true; //定义节流阀变量
    arrow_r.addEventListener('click', function() {
        if (flag) {
            flag = false; // 开启节流阀，没有执行完当前动画不会继续执行下一个动画
            // 如果走到最后 一张赋值的图片上去 此时 ul要快速复原 left 改为0
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function() {
                // 执行动画再执行回调函数 然后回调函数关闭节流阀
                flag = true; // 关闭节流阀
            });
            // 8. 点击右侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
            circleNum++;
            // 如果circle == 4 说明走到最后我们克隆的这张图片了 我们就复原
            if (circleNum == circle.children.length) {
                circleNum = 0;
            }
            circleCheange();
        }
    });
    // 9.左侧按钮 做法
    arrow_l.addEventListener('click', function() {
        if (flag) {
            flag = false;
            // 如果走到最后 一张赋值的图片上去 此时 ul要快速复原 left 改为0
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';

            }
            num--;
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });
            // 8. 点击右侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
            circleNum--;
            // 如果circle < 4  说明第一张图片 则小圆圈要改为第四个小圆圈
            // if (circleNum < 0) {
            //     circleNum = circle.children.length - 1;
            // }
            circleNum = circleNum < 0 ? circle.children.length - 1 : circleNum;
            circleCheange();
        }
    });

    function circleCheange() {
        for (var i = 0; i < circle.children.length; i++) {
            circle.children[i].className = '';
        }
        circle.children[circleNum].className = 'current';
    }
    // 10. 自动播放轮播图
    var timer = setInterval(function() {
        // 手动调用事件
        arrow_r.click();
    }, 2000);
})