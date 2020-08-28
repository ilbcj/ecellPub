$(function () {
    //初始化轮播图
    var swiper = new Swiper('.swiper-container', {
        autoplay: {
            delay:6000,
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
                date: '2020/7/27',
                value: '预选赛'
            },
            {
                date: '2020/7/28',
                value: 'ASTL半决赛'
            },
            {
                date: '2020/7/29',
                value: 'KCM血战到底'
            },
            {
                date: '2020/7/30',
                value: '常规赛16进8 A组BO3双败'
            },
            {
                date: '2020/7/31',
                value: '常规赛16进8 B组BO3双败'
            },
            {
                date: '2020/8/1',
                value: '休息'
            },
            {
                date: '2020/8/2',
                value: 'ASTL决赛'
            },
            {
                date: '2020/8/3',
                value: '常规赛16进8 C组BO3双败'
            },
            {
                date: '2020/8/4',
                value: '常规赛16进8 D组BO3双败'
            },
            {
                date: '2020/8/5',
                value: 'KCM血战到底'
            },
            {
                date: '2020/8/6',
                value: '常规赛8进4 AB组BO7单败'
            },
            {
                date: '2020/8/7',
                value: '常规赛8进4 CD组BO7单败'
            },
            {
                date: '2020/8/8',
                value: '休息'
            },
            {
                date: '2020/8/9',
                value: '常规赛4进2 AB组BO7单败'
            },
            {
                date: '2020/8/10',
                value: '常规赛 三四名BO9'
            },
            {
                date: '2020/8/11',
                value: '常规赛冠亚军BO9'
            },
            {
                date: '2020/8/12',
                value: 'KCM血战到底'
            },
            {
                date: '2020/8/13',
                value: '季后赛16进8 A组BO3双败'
            },
            {
                date: '2020/8/14',
                value: '季后赛16进8 B组BO3双败'
            },
            {
                date: '2020/8/15',
                value: '休息'
            },
            {
                date: '2020/8/16',
                value: '季后赛16进8 C组BO3双败'
            },
            {
                date: '2020/8/17',
                value: '季后赛16进8 D组BO3双败'
            },
            {
                date: '2020/8/18',
                value: '季后赛8进4 AB组BO7单败'
            },
            {
                date: '2020/8/19',
                value: 'KCM血战到底'
            },
            {
                date: '2020/8/20',
                value: '季后赛8进4 CD组BO7单败'
            },
            {
                date: '2020/8/24',
                value: '季后赛4进2 AB组BO7单败'
            },
            {
                date: '2020/8/25',
                value: '季后赛 三四名BO9'
            },
            {
                date: '2020/8/26',
                value: 'KCM血战到底 / 季后赛 冠亚军BO9'
            }
        ],
        onSelected: function (view, date, data) {
        	if(data == undefined) {
        		return false;
        	}
        	else if(date >= new Date()) {
        		var message = '比赛还未进行，请稍后再试！';
				tipMessage(message);
        		return false;
        	}
        	
        	var yearNum = new Date(date).getYear()+1900;
        	var monthNum = new Date(date).getMonth()+1;
        	if( new String(monthNum).length == 1 ) {
        		monthNum = '0'+ monthNum;
        	}
        	var dateNum = new Date(date).getDate();
        	if( new String(dateNum).length == 1 ) {
        		dateNum = '0'+ dateNum;
        	}
        	
        	var dateStr = yearNum + '-' + monthNum + '-' + dateNum;
        	
        	var postData = {};
			postData.date = dateStr;
			var urlTarget = basePath + '/public/schedule/matches';
		    $.postjson(urlTarget + '?rand=' + Math.random(), JSON.stringify(postData), function(data,textStatus, jqXHR) {
				if( data.code == 0 ) {
					if( data.scheduleMatches.length == 0 ) {
						/*var message = '非Ecell比赛日';
						tipMessage(message);*/
					}
					else {
						pageJump('views/season/index.html?d='+dateStr);
					}
					
				} else {
					var message = '获取赛季列表信息失败![' + data.msg + ', ' + data.code + ']，请稍后再试！';
					tipMessage(message, false);
				}
			}, 'json');
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
	    if(id != "") {
	    	pageJump('./views/player-details/index.html?id='+id);	
	    }
	});

	//赛季显示
    $('.current-season').click(function (e) {
        e.stopPropagation();
        $(this).siblings('.season-list').slideToggle(200);
    });

    $('.select-season').click(function (e) {
        e.stopPropagation();
    });
    
    $('.search_list li').click(function (e) {
        $('.season-list').slideUp(200);
        var seasonTitle = $(e.currentTarget).html();
        $('.current-season-title').html(seasonTitle);
        var seasonId = $(e.currentTarget).data('seasonid');
        updateTop16(seasonId);
    });
    
    $('body').click(function () {
        $('.season-list').slideUp(200);
    });
    
    //搜索赛季过滤
    $('.search_input').fastLiveFilter('.search_list');
   
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
    
    //加载top10
    loadTop10(basePath, 1, 'desc');
    
    $('#top10_win_desc').click(function(){
    	loadTop10(basePath, 1, 'desc');
    });
    $('#top10_win_asc').click(function(){
    	loadTop10(basePath, 1, 'asc');
    });
    $('#top10_apm_desc').click(function(){
    	loadTop10(basePath, 2, 'desc');
    });
    $('#top10_apm_asc').click(function(){
    	loadTop10(basePath, 2, 'asc');
    });
    $('#top10_resource_desc').click(function(){
    	loadTop10(basePath, 3, 'desc');
    });
    $('#top10_resource_asc').click(function(){
    	loadTop10(basePath, 3, 'asc');
    });
    
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
			var message = '获取赛季列表信息失败![' + data.msg + ', ' + data.code + ']，请稍后再试！';
			tipMessage(message, false);
		}
	}, 'json');
	
	updateSeason(2);
});


function updateTop16(seasonId) {
	;
	for(var index = 1; index<17; index++) {
		$('#regular_' + index).data('id', top16Data[seasonId].regularTop16[index]);
		$('#regular_' + index + '_name').html(top16Data[seasonId].regularTop16[index]);
		$('#playoff_' + index).data('id', top16Data[seasonId].playoffTop16[index]);
		$('#playoff_' + index + '_name').html(top16Data[seasonId].playoffTop16[index]);
	}
}

function loadTop10(basePath, type, sort) {
	//type:1 - winning, 2 - apm, 3 - resource
	//sort: desc(default), asc
	var postData = {};
	postData.type = type;
	postData.sort = sort;
	var urlTarget = basePath + '/public/player/top10';
	$.postjson(urlTarget + '?rand=' + Math.random(), JSON.stringify(postData), function(data,textStatus, jqXHR) {
		if( data.code == 0 ) {
			var top10 = data.top10Players;
			for(var index = 0; index < top10.length; index++) {
				var rId = 0+index+1;
				$('#top10row' + rId).data('id', top10[index].nick);
				$('#top10n' + rId).html(top10[index].nick);
				var country = '';
				if( top10[index].country == 'CN') {
					country = '中国';
				}
				else if( top10[index].country == 'KR') {
					country = '韩国';
				}
				$('#top10c' + rId).html(country);
				$('#top10w' + rId).html(top10[index].winning);
				$('#top10a' + rId).html(top10[index].apm);
				$('#top10r' + rId).html(top10[index].resource);
			}
		} else {
			var message = '获取Top10选手列表信息失败![' + data.msg + ', ' + data.code + ']，请稍后再试！';
			tipMessage(message, false);
		}
	}, 'json');
}

//升序
function ascendingOrder(dom){
    /*var arr = $('.top-10 tbody tr');
    arr.sort(function(a,b){
        return $(a).find(dom).html()>$(b).find(dom).html()?1:-1;
    });
    $('.top-10 tbody').empty().append(arr);
    sort();*/
}

//降序
function descendingOrder(dom) {
    /*var arr = $('.top-10 tbody tr');
    arr.sort(function(a,b){
        return $(a).find(dom).html()<$(b).find(dom).html()?1:-1;
    });
    $('.top-10 tbody').empty().append(arr);
    sort();*/
}

//纠正排名
function sort() {
    /*for (var i = 0; i < $('.top-10 tbody tr').length; i++) {
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
    }*/
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

function updateSeason(seasonId){
	var seasonTitle = $('.search_list li[data-seasonid=' + seasonId + ']').children().html();
	$('.current-season-title').html(seasonTitle);
	updateTop16(seasonId);
};

top16Data = {
	"1": {
		"regularTop16":{
			"1":"Zhanhun",
			"2":"Jedi",
			"3":"Mihu",
			"4":"AP",
			"5":"Jaystar",
			"6":"Fengzi",
			"7":"Qiaogege",
			"8":"Loup",
			"9":"DuGuQiuBai",
			"10":"PPPPPP",
			"11":"Free",
			"12":"Kukuboy",
			"13":"小帅",
			"14":"Caicai",
			"15":"FJ",
			"16":"guoqian"
		},
		"playoffTop16":{
			"1":"Mighty",
			"2":"Midas",
			"3":"Mihu",
			"4":"Fengzi",
			"5":"RainBOw",
			"6":"Motive",
			"7":"soO",
			"8":"KOP",
			"9":"Jaystar",
			"10":"Jedi",
			"11":"Qiaogege",
			"12":"Zhanhun",
			"13":"AP",
			"14":"Loup",
			"15":"Tossgirl",
			"16":"ruin"
		}
	},
	"2": {
		"regularTop16":{
			"1":"Mihu",
			"2":"Fengzi",
			"3":"DuGuQiuBai",
			"4":"AP",
			"5":"guoqian",
			"6":"KID",
			"7":"Jaystar",
			"8":"Zhanhun",
			"9":"小帅",
			"10":"影子渔",
			"11":"Qiujie",
			"12":"Jujishou",
			"13":"Kukuboy",
			"14":"xiaoyushen",
			"15":"Qiaogege",
			"16":"xiaoxiaoma"
		},
		"playoffTop16":{
			"1":"SCAN",
			"2":"Ridesky",
			"3":"unyeong",
			"4":"Motive",
			"5":"Cadenzie",
			"6":"HyuN",
			"7":"Mihu",
			"8":"OZ",
			"9":"guoqian",
			"10":"Jaystar",
			"11":"KID",
			"12":"AP",
			"13":"Fengzi",
			"14":"Zhanhun",
			"15":"RainBOw",
			"16":"DuGuQiuBai"
		}
	}
}
