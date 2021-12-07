/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 *
 * 得到最接近的真分数
 * @param a float浮点型 (0.01,0.99)区间内的一个小数
 * @return int整型一维数组
 */
function getFraction(a) {
    // write code here
    var obj = {};
    var sum = 0;
    var arr1 = [];
    var arr2 = [];
    for (var i = 2; i <= 200; i++) {
        for (var j = 1; j < i; j++) {
            arr1.push(i);
            arr2.push(j);
        }
    }
    for (var i = 0; i < arr1.length; i++) {
        sum = Math.abs(a - arr2[i] / arr1[i]);
        obj[[arr2[i], arr1[i]]] = sum;
    }
    var min = 1;
    var ch = '';
    for (var k in obj) {
        if (min > obj[k]) {
            min = obj[k];
            ch = k;
        }
    }
    ch = ch.split(',');
    return ch;
}
module.exports = {
    getFraction: getFraction
};