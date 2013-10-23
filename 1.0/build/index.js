/*
combined files : 

gallery/inputFilter/1.0/index

*/
/**
 * @fileoverview 
 * @author 晨辰<cc.ccking@gmail.com>
 * @module inputFilter
 **/
KISSY.add('gallery/inputFilter/1.0/index',function(S){
    var $ = S.all,
        E = S.Event;

    var pluginName = 'keybordfilter',
        defaults = {
            keydown: false,
            keyup: false,
            keypress: false,
            checkfailed: function( e ) {
                e.preventDefault();
                return false;
            },
            enable: [],
            disable: [],
            strictModifiers: true,
            groups: {
                keyboardNumbers: [48,49,50,51,52,53,54,55,56,57],
                numpadNumbers: [96,97,98,99,100,101,102,103,104,105],
                lowerLetters: [65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90],
                upperLetters: ['+65','+66','+67','+68','+69','+70','+71','+72','+73','+74','+75','+76','+77','+78','+79','+80','+81','+82','+83','+84','+85','+86','+87','+88','+89','+90'],
                space: [32],
                backspace: [8],
                'delete': [46],
                enter: [13],
                ccp: ['^88', '^67', '^86'], // 剪切 复制 粘贴
                selectAll: ['^65'],
                arrows: [37,38,39,40],
                numpad: [
                    'numpadNumbers',
                    106,107,109,110,111,114,13
                ],
                numbers: [
                    'keyboardNumbers',
                    'numpadNumbers'
                ],
                keyboard: [
                    'letters', 'keyboardNumbers'
                ],
                letters: ['lowerLetters', 'upperLetters'],
                basicEdits: ['ccp', 'delete', 'backspace', 'selectAll', 'arrows'],
                numberLetters: ['numbers', 'letters']
            }
        };
            

    function inputFilter( id, options ) {
        this.element = id;
        this.options = S.merge(defaults, options) ;
        this.init();
    }

    inputFilter.prototype.init = function () { 
        var self = this,

        _checkInternal = function( e, tocheck ) {
            // console.log(tocheck);
            var check = false;

            S.each( tocheck, function(v,k) {
                if( v === 'all' ) {
                    // console.log('All');
                    check = true;
                    return false;
                } 
                else if(typeof v === 'number' && e.keyCode === v) {
                    // console.log('number');
                    if( self.options.strictModifiers && !e.ctrlKey && !e.shiftKey && !e.shiftKey
                    ) {
                        check = true;
                        return false;
                    } else if( !self.options.strictModifiers ) {
                        check = true;
                        return false;
                    }
                    
                } 
                else if( typeof v === 'string' && typeof self.options.groups[v] !== 'undefined' ) {
                    // console.log('group');
                    check = _checkInternal( e, self.options.groups[v] );
                    if( check === true ) {
                        return false;
                    }
                } else if( typeof v === 'string' ) { 
                    v = String(v);
                    var mod = v.replace(/[0-9]+/g,'');
                    v = Number(v.replace(/[^0-9]+/g,''));
                    if(( mod.indexOf('^') > -1 && e.ctrlKey && e.keyCode === v ) || ( mod.indexOf('+') > -1 && e.shiftKey && e.keyCode === v ) || ( mod.indexOf('!') > -1 && e.altKey && e.keyCode === v )) {
                        check = true;
                        return false;
                    }
                }
            });
            return check;
        },

        _check = function( e ) {
            // console.log(_checkInternal( e, self.options.disable ));
            // console.log(_checkInternal( e, self.options.enable ));
            if( ( _checkInternal( e, self.options.disable ) && !_checkInternal( e, self.options.enable ) ) ){
                return false;
            }
            return true;
        };

        E.on(self.element, 'keydown', function( e ) {
            debugger;
            if( self.options.keydown ) {
                if( _check( e ) ) {
                    if( typeof self.options.keydown === 'function' ) {
                        self.options.keydown.call(self.element, e);
                    }
                    return true;
                }
                return self.options.checkfailed(e);
            }
        });
        E.on(self.element, 'keyup', function( e ) {
            if( self.options.keyup ) {
                if( _check( e ) ) {
                    if( typeof self.options.keyup === 'function' ) {
                        self.options.keyup.call(self.element, e);
                    }
                    return true;
                }
                return self.options.checkfailed(e);
            }
        });
        E.on(self.element, 'keypress', function( e ) {
            if( self.options.keypress ) {
                if( _check( e ) ) {
                    if( typeof self.options.keypress === 'function' ) {
                        self.options.keypress.call(self.element, e);
                    }
                    return true;
                }
                return self.options.checkfailed(e);
            }
        });
    };

    return inputFilter;

});




