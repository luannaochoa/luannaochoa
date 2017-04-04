// ----------------------------------
// Contents
//
//
//
//
// ----------------------------------


// ----------------------------------
// Apple Menu JS
// ----------------------------------

/*global define,jQuery,window */

(function (factory) {
    
    "use strict";
    
    if (typeof (define) === 'function' && define.amd) {
        define(['jquery'], factory);
    } else {
        factory(jQuery);
    }
}(function ($) {
    
    "use strict";
    
    $.fileMenu = function (el, options) {
        
        var base = this;
        
        base.$el = $(el);
        base.el = el;
        
        base.options = $.extend({}, $.fileMenu.defaultOptions, options);
        base.touch = false;
        
        base.$ = function (query) {
            return base.$el.find(query);
        };
        
        base.hideMenu = function () {
            base.$('.selected ul').slideUp(base.options.slideSpeed);
            base.$('.selected').removeClass('selected');
            base.$el.removeClass('active');
        };
        
        base.showMenu = function ($this) {
            var $parent = $this.parent(),
                $menu = $this.children('ul').first(),
                offsets = $this.offset();
            
            $parent.addClass('active');
            
            $this.addClass('selected');
            $menu.css({
                'left': offsets.left,
                'top': offsets.top + $parent.height()
            });
            $menu.slideDown(base.options.slideSpeed);
        };
        
        base.addListeners = function () {
            base.$el.children('li').on('click', function (e) {
                var $this = $(this);
                
                if ($this.hasClass('selected')) {
                    base.hideMenu();
                } else {
                    base.hideMenu();
                    base.showMenu($this);
                }
                e.stopPropagation();
            });
            
            base.$el.children('li').on('mouseenter', function () {
                var $this = $(this);
                if (!$this.parent().hasClass('active')) { return; }
                if ($this.hasClass('selected')) { return; }
                
                base.hideMenu();
                base.showMenu($this);
            });
            
            /* Don't slide up if submenu, divider or disabled item is clicked */
            base.$('ul').on('click', function (e) {
                var $this = $(e.target);
                if ($this.get(0).tagName === 'LI' && !$this.hasClass('sub')) { return; }
                e.stopPropagation();
            });
            
            /* Handle toggle elements */
            base.$('ul').on('click', '.toggle', function (e) {
                $(this).toggleClass('active');
                e.stopPropagation();
            });
            
            /* Position sub menus */
            base.$el.on('mouseenter', 'ul li', function () {
                var $this = $(this);
                
                $this.find('ul').first().css({
                    'left': $this.parent().width(),
                    'margin-top': -$this.height()
                });
            });
            
            /* Hide menu on click outside the menu */
            $('html').on('click', function () {
                base.hideMenu();
            });
        };
        
        base.init = function () {
            base.addListeners();
            base.$el.addClass('fileMenu');
            
            
        };
        
        base.init();
    };
    
    $.fileMenu.defaultOptions = {
        slideSpeed: 100
    };
    
    $.fn.fileMenu = function (options) {
        return this.each(function () {
            var fm = new $.fileMenu(this, options);
        });
    };
    
}));


// ----------------------------------
// Typewriter Effect
// ----------------------------------


    (function($, w, d, undefined) {

      function typewriter() {

        // Globals 
        var self = this, speed;

        function init(element, options) {
                // Set Globals
          var str;
          var indice = 0;

          self.options = $.extend( {}, $.fn.typewriter.options, options );
          $currentElement = $(element);
          elementStr = $currentElement.text().replace(/\s+/g, ' ');
          dataSpeed  = $currentElement.data("speed") || self.options.speed;
          console.log(dataSpeed)
          $currentElement.empty();
          var showText = setInterval(
                    function(){
                        if (indice++ < elementStr.length) {
                      $currentElement.append(elementStr[indice]);
                    }else{
                        clearInterval(showText);
                    }
                    }, dataSpeed);
          // self.animation = setInterval(function(){animate_calification()}, 20);
        }

        
        
        // Metodos publicos
        return {
          init: init
        }
      }

      // Plugin jQuery
      $.fn.typewriter = function(options) {
        return this.each(function () {
            var writer =  new typewriter();
          writer.init(this, options);
          $.data( this, 'typewriter', writer);
        });
      };

      $.fn.typewriter.options = {
        'speed' : 300
      };

    })(jQuery, window, document);


// ----------------------------------
// Skills Graph
// ----------------------------------
    

         /*!
         * https://github.com/umarwebdeveloper/jquery-css-skills-bar
         * Author: @umarwebdeveloper
         * Licensed under the MIT license
         */
 
        (function ( $ ) {
         
            $.fn.skillBars = function( options ) {
         
                var settings = $.extend({
                    from: 0,            // number start
                    to: false,          // number end
                    speed: 1000,        // how long it should take to count between the target numbers
                    interval: 100,    // how often the element should be updated
                    decimals: 0,          // the number of decimal places to show
                    onUpdate: null,   // callback method for every time the element is updated,
                    onComplete: null,     // callback method for when the element finishes updating
                    /*onComplete: function(from) {
                        console.debug(this);
                    }*/
                    classes:{
                        skillBarBar : '.skillbar-bar',
                        skillBarPercent : '.skill-bar-percent',
                    }
                }, options );
         
                return this.each(function(){
                    
                    var obj = $(this),
                        to = (settings.to != false) ? settings.to : parseInt(obj.attr('data-percent'));
                        if(to > 100){
                            to = 100;
                        };
                    var from = settings.from,
                        loops = Math.ceil(settings.speed / settings.interval),
                        increment = (to - from) / loops,
                        loopCount = 0,
                        interval = setInterval(updateValue, settings.interval);
                    
                    obj.find(settings.classes.skillBarBar).animate({
                        width: parseInt(obj.attr('data-percent'))+'%'
                    }, settings.speed);
                                
                    function updateValue(){
                        from += increment;
                        loopCount++;
                        $(obj).find(settings.classes.skillBarPercent).text(from.toFixed(settings.decimals)+'%');

                        if (typeof(settings.onUpdate) == 'function') {
                            settings.onUpdate.call(obj, from);
                        }

                        if (loopCount >= loops) {
                            clearInterval(interval);
                            from = to;

                            if (typeof(settings.onComplete) == 'function') {
                                settings.onComplete.call(obj, from);
                            }
                        }
                    }
                    
                });
         
            };
         
        }( jQuery ));




