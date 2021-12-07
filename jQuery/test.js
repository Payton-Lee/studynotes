var num = parseInt(prompt('请输入数据'));
var index = 1;
while (i < num) {
    var num1 = parseInt(prompt('请输入新的数据'));
    if (num1 <= 1e9) {
        i++;
        if (i === num) {
            console.log(yes);
            break;
        }
    }
}