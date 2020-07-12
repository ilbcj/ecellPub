$(function () {
    //初始化轮播图
    var swiper = new Swiper('.swiper-container', {
        autoplay: {
            delay:3000,
            disableOnInteraction : false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable :true,
        },
        loop:true,
        // effect: 'fade',
    });

//渲染日历
    $('#ca').calendar({
        width: 940,
        height: 400,
        //日历上面的数据
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
            pageJump('views/season/index.html');
            console.log(date)
        }
    });

    $('#dd').calendar({
        trigger: '#dt',
        zIndex: 999,
        format: 'yyyy-mm-dd',
        onSelected: function (view, date, data) {
            console.log('event: onSelected')
        },
        onClose: function (view, date, data) {
            console.log('event: onClose')
            console.log('view:' + view)
            console.log('date:' + date)
            console.log('data:' + (data || 'None'));
        }
    });

	//绑定跳转选手详情页面
	$('.sort-form tbody').delegate('tr','click',function () {
	    var id = $(this).data('id'); //选手ID
	    pageJump('./views/player-details/index.html?id='+id);
	});

	//赛季显示
    $('.current-season').click(function (e) {
        e.stopPropagation();
        $(this).siblings('.season-list').slideToggle(200);
    });

    $('.select-season').click(function (e) {
        e.stopPropagation();
    });
    
    $('.search_list li').click(function () {
        $('.season-list').slideUp(200);
    });
    
    $('body').click(function () {
        $('.season-list').slideUp(200);
    });

	//搜索赛季过滤
    $('.search_input').fastLiveFilter('.search_list');
    
    //查询赛季列表信息
    var urlTarget = basePath + '/public/season/list';
    $.postjson(urlTarget + '?rand=' + Math.random(), JSON.stringify({}), function(data,textStatus, jqXHR) {
		if( data.code == 0 ) {
			var seasonBasic = data.list;
			
			/*$('#profile_select_player1, #profile_select_player2').html('<li class="profileSelectPlayerItem" data-id="0"></li>');
			
			var player = null;
			for( var index = 0; index < playersBasic.length; index++)
			{
				player = playersBasic[index];
				$('#profile_select_player1, #profile_select_player2').append('<li class="profileSelectPlayerItem" data-id="' + player.nick + '">' + player.nick + '</li>');
			}
			
			$('.profileSelectPlayerItem').on('click.ECELL.admin.detail', updatePlayerProfile);
			
			    //选手库显示
		    $('.current-player').click(function () {
		        $(this).siblings('.select-player-list').slideToggle(200);
		        $(this).parentsUntil('.player-content').eq(1).siblings('.pull-left').find('.select-player-list').slideUp(200);
		    });
		
		    $('.select-player').click(function (e) {
		        e.stopPropagation();
		    });
		    
		    $('.select-player-list ul li').click(function () {
		    	$('#search_input1, #search_input2').text('');
		    	$('.search_input1, .search_input2').val('');
		    	$('.search_input1, .search_input2').change();
		        $(this).parentsUntil('.select-player').eq(1).slideUp(200);
		    });
		    
		    $('body').click(function () {
		        $('.select-player-list').slideUp(200);
		    });
		    //搜索选手过滤
		    $('.search_input1').fastLiveFilter('#profile_select_player1');
		    $('.search_input2').fastLiveFilter('#profile_select_player2');*/
			
		} else {
			var message = '获取选手列表信息失败![' + data.msg + ', ' + data.code + ']，请联系管理员！';
			tipMessage(message, false);
		}
	}, 'json');
});

//升序
function ascendingOrder(dom){
    var arr = $('.top-10 tbody tr');
    arr.sort(function(a,b){
        return $(a).find(dom).html()>$(b).find(dom).html()?1:-1;
    });
    $('.top-10 tbody').empty().append(arr);
    sort();
}

//降序
function descendingOrder(dom) {
    var arr = $('.top-10 tbody tr');
    arr.sort(function(a,b){
        return $(a).find(dom).html()<$(b).find(dom).html()?1:-1;
    });
    $('.top-10 tbody').empty().append(arr);
    sort();
}

//纠正排名
function sort() {
    for (var i = 0; i < $('.top-10 tbody tr').length; i++) {
        var current_dom = $('.top-10 tbody tr').eq(i);
        current_dom.find('span').html(i+1);
        if (i == 0) {
            current_dom.find('span').removeClass('second-sort third-sort').addClass('first-sort');
        }else if (i == 1) {
            current_dom.find('span').removeClass('first-sort third-sort').addClass('second-sort');
        }else if (i == 2) {
           current_dom.find('span').removeClass('first-sort second-sort').addClass('third-sort');
        } else {
            current_dom.find('span').removeClass('first-sort second-sort third-sort');
        }
    }
}

//过滤输入
jQuery.fn.fastLiveFilter = function(list, options) {
    options = options || {};
    list = jQuery(list);
    var input = this;
    var lastFilter = '';
    var timeout = options.timeout || 0;
    var callback = options.callback || function() {};
    var keyTimeout;
    var lis = list.children();
    var len = lis.length;
    var oldDisplay = len > 0 ? lis[0].style.display : "block";
    callback(len);
    input.change(function() {
        var filter = input.val().toLowerCase();
        var li, innerText;
        var numShown = 0;
        for (var i = 0; i < len; i++) {
            li = lis[i];
            innerText = !options.selector ?
                (li.textContent || li.innerText || "") :
                $(li).find(options.selector).text();
            if (innerText.toLowerCase().indexOf(filter) >= 0) {
                if (li.style.display == "none") {
                    li.style.display = oldDisplay;
                }
                numShown++;
            } else {
                if (li.style.display != "none") {
                    li.style.display = "none";
                }

            }
        }
        callback(numShown);
        return false;
    }).keydown(function() {
        clearTimeout(keyTimeout);
        keyTimeout = setTimeout(function() {
            if( input.val() === lastFilter ) return;
            lastFilter = input.val();
            input.change();
        }, timeout);
    });
    return this;
};