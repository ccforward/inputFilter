## 综述

inputFilter是一个过滤输入的组件，不需要的字符不能输入。

* 版本：1.0
* 作者：晨辰
* 标签：input
* demo：[http://gallery.kissyui.com/inputFilter/1.0/demo/index.html](http://gallery.kissyui.com/inputFilter/1.0/demo/index.html)

## 初始化组件

    S.use('gallery/inputFilter/1.0/index', function (S, InputFilter) {
    	new inputFilter('#input1', {
            keydown: true, 
            disable: ['all'],
            enable: ['numbers']
    	});
    })

## enable和disable可用参数
* 特殊按键：Shift(+), CTRL(^) & Alt(!)
* keyboardNumbers: 数字键 不算小键盘上的
* numpadNumbers: 小键盘数字
* numbers: 所有数字
* lowerLetters: 所有小些字母
* upperLetters: 所有大写字母
* letters: 所有大写字母
* space: 空格
* backspace:  backspace 
* delete:  delete 
* enter:  enter 
* ccp: Cut, Copy  Paste
* selectAll: Ctrl + A
* arrows: 箭头
* numpad: komplete numpad + enter key
* keyboard: keyboardNumbers + letters
* basicEdits: ccp, delete, backspace, selectAll & arrows
* numberLetters: numbers + letters
