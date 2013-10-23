## inputFilter
* inputFilter是一个过滤输入的组件，不需要的字符不能输入。


* 版本：1.0
* 教程：[http://gallery.kissyui.com/inputFilter/1.0/guide/index.html](http://gallery.kissyui.com/inputFilter/1.0/guide/index.html)
* demo：[http://gallery.kissyui.com/inputFilter/1.0/demo/index.html](http://gallery.kissyui.com/inputFilter/1.0/demo/index.html)

## 初始化组件

    S.use('gallery/inputFilter/1.0/index', function (S, InputFilter) {
    	new inputFilter('#input1', {
            keydown: true, 
            disable: ['all'],
            enable: ['numbers']
    	});
    })


