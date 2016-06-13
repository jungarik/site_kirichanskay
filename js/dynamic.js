prevScroll = 0;
currentScroll = 0;
var x = 0;
var forward = 0;
var back = 0;
var summUpScroll;
var summDownScroll;
var currentPos;
var firstTime = false;
var heightOfWindow;
var widthOfWindow;
var timeOutMenu;

$(document).ready(function () {
    

    /*===========================================================
                            Запуск странички
     ===========================================================*/
    /* Движение лого вперед на кулисах */
    $('#main-img').animate({ scale: '1.2' }, 12000);

    /* Установка рандомного интервала для каждой карусели */
    $('.carousel').each(function () {
        $(this).carousel({
            interval: Math.random() * (15000 - 2000) + 2000
        });
    });
    windowHeight = $(window).height();
    blockSize = ((windowHeight - 94) / 2);
    windowHeight = ((blockSize + 20) * 3);

    //alert(parseInt($("#block-menu").css("width")));
    //blockSize =( parseInt($("#block-menu").css("width")) / 3) - 15;
    $("#block-menu").css("width", windowHeight);
    $(".text-block").css("width", blockSize);
    $(".text-block").css("height", blockSize);
    //$(".inside-block").css("height", blockSize - 30);
    
    $("#fuck"). bind("load",(function () {
        //alert('fuck');
        $('.main-div').css({
            background: 'rgba(0, 0, 0, 0.5)',
            //transition: '0.5'
        });
    }));
    //"mousewheel DOMMouseScroll MozMousePixelScroll",
    $(window).scroll( function (e) {
        /*===========================================================
                        При первом скролле, запуск странички
        ===========================================================*/
        if ((firstTime == false)) {
            firstTime = true;

            /* Убрать кулису вызвать колбэк функц для запуска первичной анимации*/
            $("#coulisse").animate({ top: '-100%' }, 500, function () {

                $("#block-menu").css({
                    transform: 'translateY(94px)'
                });

                /* Спрятать/опустить заставку с фотками после кулисы*/
                $("#carousel-block").css({
                    //position: 'relative',
                    transform: 'translateY(100%)',
                    //transition: 'transform 1.5s'

                });
                $("#navbar-menu").css({
                    transition: '0.5s',
                    position: 'fixed',
                    top: '0px',
                });

                $('.text-block').each(function () {
                    x = x + 300;
                    $(this).delay(x);
                    $(this).animate({ borderSpacing: 360 }, {
                        step: function (now, fx) {
                            $(this).css('-webkit-transform', 'rotateY(' + now + 'deg)');
                            $(this).css('-moz-transform', 'rotateY(' + now + 'deg)');
                            $(this).css('transform', 'rotateY(' + now + 'deg)');
                        },
                        duration: 1000
                    }, 'linear');
                });
            });
        }
            /*===================================================================
                    Обработка прокрутки странички
            ====================================================================*/
        else {

            //heightOfWindow = $(window).height();

            ///* Чтобы не дергалось попробовать запретить прерывания*/
            ///* Документ опускается вниз, меню плавно появляется*/
            //if (e.originalEvent.wheelDelta / 100 > 0) {
            //    $("#navbar-menu").css({
            //        transition: '0.3s',
            //        position: 'fixed',
            //        top: '0px',
            //    });
            //    currentPos1 = $("#block-menu").position().top + 100;
            //    if ((currentPos1 - 94) < 20)
            //    {
            //    clearTimeout(timeOutMenu);
            //    timeOutMenu = setTimeout(function () {
            //        $("#navbar-menu").css({
            //            transition: '0.5s',
            //            top: '-94px',
            //        })},3000);
            //    }
            //    if (currentPos1 > 94) {
            //        currentPos1 = 94;
            //    }
            //    //$("#block-menu").css({
            //    //    transform: 'translateY(' + currentPos1 + 'px)',
            //    //    transition: 'transform 1s'
            //    //});
            //    currentPos = $("#carousel-block").position().top + 200;
            //    if (currentPos > heightOfWindow) {
            //        currentPos = heightOfWindow;
            //    }
            //    //$("#carousel-block").css({
            //    //    transform: 'translateY(' + currentPos + 'px)',
            //    //    transition: 'transform 1s'
            //    //});
            //}

            // /* Все подымается вверх, меню прячется */
            ////if($("#myFixed").position().top >= heightOfWindow )
            //else {
               
            //    /* Спрятать меню */
            //    $("#navbar-menu").css({
            //        transition: '0.5s',
            //        top: '-94px',
            //    });

            //    /* Прокрутить блочное меню */
            //    currentPos1 = $("#block-menu").position().top - 100;
            //    //if (currentPos1 > 94) {
            //    //    currentPos1 = 94;
            //    //}
            //    //$("#block-menu").css({
            //    //    transform: 'translateY(' + currentPos1 + 'px)',
            //    //    transition: 'transform 1s'
            //    //});
            //    currentPos = $("#carousel-block").position().top - 200;
            //    //if (currentPos > heightOfWindow) {
            //    //    currentPos = heightOfWindow;
            //    //}
            //    //$("#carousel-block").css({
            //    //    transform: 'translateY(' + currentPos + 'px)',
            //    //    transition: 'transform 1s'
            //    //});
            //}
        }
    });
    //$('#first-block').mouseenter(function () {
    //    //$(this).animate({ borderSpacing: 360 }, {
    //    //    step: function (now, fx) {
    //    //        $(this).css('-webkit-transform', 'rotateY(' + now + 'deg)');
    //    //        $(this).css('-moz-transform', 'rotateY(' + now + 'deg)');
    //    //        $(this).css('transform', 'rotateY(' + now + 'deg)');
    //    //    },
    //    //    duration: 1000
    //    //}, 'linear');
    //    $(this).replaceWith("<div><p>Свадебная фототсессия одно из отвтетсвенных работ фотографа</p></div>");
    //});
    $.fn.moveIt = function () {
        var $window = $(window);
        var instances = [];

        $(this).each(function () {
            instances.push(new moveItItem($(this)));
        });
        window.onscroll = function () {
            var scrollTop = $window.scrollTop();
            instances.forEach(function (inst) {
                inst.update(scrollTop, currentPos);
            });
        }
    }
    //var currentPos = $("#carousel-block").position().top;
    var moveItItem = function (el) {
        this.el = $(el);
        this.currentPos = 900;
            //this.el.position().top;
        alert(this.currentPos);
        this.speed = parseInt(this.el.attr('data-scroll-speed'));
    };

    moveItItem.prototype.update = function (scrollTop) {
        
        var pos = this.currentPos - (scrollTop / this.speed) ;
        this.el.css('transform', 'translateY(' + pos + 'px)');
        this.el.css('transition', 'transform 0.2s');
    };

    $(function () {
        $('[data-scroll-speed]').moveIt();
    });
});