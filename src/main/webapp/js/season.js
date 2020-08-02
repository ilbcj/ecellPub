$('#dd').calendar({
    trigger: '#dt',
    zIndex: 999,
    format: 'yyyy-mm-dd',
    //日历上面需要显示的比赛数据
    data: [
        {
            date: '2020/6/1',
            value: '预选赛'
        },
        {
            date: '2020/6/2',
            value: '预选赛'
        },
        {
            date: '2020/6/3',
            value: 'KCM血战到底'
        },
        {
            date: '2020/6/4',
            value: '常规赛16进8 A组BO3双败'
        },
        {
            date: '2020/6/5',
            value: '休息'
        },
        {
            date: '2020/5/5',
            value: '休息'
        }
    ],
    onSelected: function (view, date, data) {
        $('#cover-mask').addClass('hide');
    },
    onClose: function (view, date, data) {
    }
});

$('#dd').css({
    'left':'77px'
});

//蒙版显示隐藏
$('#cover-mask').click(function () {
    $(this).addClass('hide')
});

$('#dt').click(function () {
    $('#cover-mask').removeClass('hide');
});


var total_height  = $('.details .left').outerHeight(true);
$('.details .right').css({
    'height':total_height,
    'background': 'white'
});

$('.view-detail').click(function () {
    var height = $(this).parentsUntil('.items').eq(1).outerHeight(true);
    var index = $(this).parentsUntil('.items').eq(1).index();
    var top = index * height + 6 +'px';
    $('.right .triangle').animate({
        'top':top
    })
});


$(function () {
	'use strict';
	
	// , headers: { 'x-requested-with': 'XMLHttpRequest' }
    $.ajaxSetup({crossDomain: true, xhrFields: {withCredentials: true}});
    
	// update $.post, contentType --> application/json
	$.extend({
		'postjson': function( url, data, success, dataType ) {
			$.ajax({
				type: 'POST',
				contentType: 'application/json;charset=UTF-8',
				url: url,
				data: data,
				crossDomain: true, 
				xhrFields: {withCredentials: true},
				success: success,
				dataType: dataType
			});
		}
	});
	
	// Update table style
	
	// pace optinos
	Pace.options.ajax.trackMethods.push("POST");
	
	// update date.toLocaleString
	Date.prototype.toLocaleString = function() {
        return this.getFullYear() + "年" + (this.getMonth() + 1) + "月" + this.getDate() + "日 " + this.getHours() + "点" + this.getMinutes() + "分" + this.getSeconds() + "秒";
	};
	Date.prototype.toLocaleString = function() {
        return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate() + " " + this.getHours() + ":" + this.getMinutes() + ":" + this.getSeconds();
	};
	
	var basePath = '';
	$('body').data('basePath', basePath);
	
	var date = getQueryVariable("d");
	if(date) {
		console.log(date);	
	}
	
});


