$(function() {
    // 1. 全选，全不选案例
    // 就是把全选按钮的状态赋值给其他小按钮
    // 事件使用change
    $(".checkall").change(function() {
        $(".j-checkbox, .checkall").prop("checked", $(this).prop("checked"));
        if ($(this).prop("checked")) {
            // 让所有商品添加 check-cart-item 类名
            $(".cart-item").addClass("check-cart-item");
        } else {
            // 移除check-cart-item类名
            $(".cart-item").removeClass("check-cart-item");
        }
    });
    // 2. 如果小复选框被选中的个数小于等于3 就应该吧全选按钮选上 否则全选按钮不选
    $(".j-checkbox").change(function() {
        // if (被选中的小复选框的个数 === 3) {
        //     就要选中全选按钮
        // } else {
        //     不要选中全选按钮
        // }
        // $(".j-checkbox").length 所有的复选框的个数
        if ($(".j-checkbox:checked").length === $(".j-checkbox").length) {
            $(".checkall").prop("checked", true);
        } else {
            $(".checkall").prop("checked", false);
        }
        if ($(this).prop("checked")) {
            // 让当前商品添加 check-cart-item 类名
            $(this).parents(".cart-item").addClass("check-cart-item");
        } else {
            // 移除当前商品的check-cart-item类名
            $(this).parents(".cart-item").removeClass("check-cart-item");
        }
    });
    // 3. 增减商品数量模块，首先先声明一个变量，当我们点击+号(increment), 就让这个值++ 然后赋值给文本框
    $(".increment").click(function() {
        // 得到当前兄弟文本框的值
        var n = $(this).siblings(".itxt").val();
        n++;
        $(this).siblings(".itxt").val(n);
        // 3. 计算小计模块，根据文本框的值 乘以当前商品的价格 就是商品的小计
        // 当前商品的价格 price
        var price = $(this).parents(".p-num").siblings(".p-price").html();
        // console.log(price);
        price = price.substr(1);
        // toFixed(2) 保留两位小数
        // 小计模块
        $(this).parents(".p-num").siblings(".p-sum").html('￥' + (price * n).toFixed(2));
        getSum();

    });
    $(".decrement").click(function() {
        // 得到当前兄弟文本框的值
        var n = $(this).siblings(".itxt").val();
        if (n == 1) {
            return false;
        }
        n--;
        $(this).siblings(".itxt").val(n);
        // 3. 计算小计模块，根据文本框的值 乘以当前商品的价格 就是商品的小计
        // 当前商品的价格 price
        // var price = $(this).parent().parent().siblings(".p-price").html();
        var price = $(this).parents(".p-num").siblings(".p-price").html();
        // console.log(price);
        price = price.substr(1);
        // 小计模块
        $(this).parents(".p-num").siblings(".p-sum").html('￥' + (price * n).toFixed(2));
        getSum();
    });
    // 4. 用户修改文本框的值 计算小计 小计模块
    $(".itxt").change(function() {
        // 先得到当前文本框里面的值 乘以 当前商品的价格
        var n = $(this).val();
        // 当前商品的单价
        var price = $(this).parents(".p-num").siblings(".p-price").html();
        // 从第一个字符开始截取字符串，去掉价格前面的￥
        price = price.substr(1);
        // 将总的价格赋值给后面的小计
        $(this).parents(".p-num").siblings(".p-sum").html('￥' + (price * n).toFixed(2));
        getSum();
    });
    getSum();
    // 5. 计算总结和总额模块
    function getSum() {
        var count = 0; // 计算总件数
        var money = 0; // 计算总价钱
        $(".itxt").each(function(i, ele) {
            count += parseInt($(ele).val());
        });
        $('.amount-sum em').text(count);
        $(".p-sum").each(function(i, ele) {
            money += parseFloat($(ele).text().substr(1));
        });
        $(".price-sum em").text('￥' + money.toFixed(2));
    }
    // 6. 删除商品模块
    // (1)商品后面的删除按钮
    $(".p-action a").click(function() {
        // 删除的是当前商品
        $(this).parents(".cart-item").remove();
        getSum();
    });
    // (2) 删除选中的商品
    $(".remove-batch").click(function() {
        // 删除的小的复选框选中的商品
        $(".j-checkbox:checked").parents(".cart-item").remove();
        getSum();
    });
    // (3) 清空购物车，删除全部商品
    $(".clear-all").click(function() {
        $(".cart-item").remove();
        getSum();
    });
})