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


$('.view-detail').click(function () {
    changeDetailHeight();
    var height = $(this).parentsUntil('.items').eq(1).outerHeight(true);
    var index = $(this).parentsUntil('.items').eq(1).index();
    var top = index * height + 6 +'px';
    $('.right .triangle').animate({
        'top':top
    })
});

function changeDetailHeight() {
    var game_height  = $('.details .left').outerHeight(true); //左边栏高度
    var detail_height = $('.details .right').outerHeight(true); //详情高度
    if (detail_height < game_height ) {
        $('.details .right').css({
            'height':game_height,
            'background': 'white'
        });
    }
}


function resetSetsInfo() {
	$('#seasonSet1,#seasonSet2,#seasonSet3,#seasonSet4,' 
	+ '#seasonSet5,#seasonSet6,#seasonSet7,#seasonSet8,'
	+ '#seasonSet9,#seasonSet10').addClass('hide');
	
	$('#seasonSet1_p1_race,#seasonSet1_p2_race'
	+ ',#seasonSet2_p1_race,#seasonSet2_p2_race'
	+ ',#seasonSet3_p1_race,#seasonSet3_p2_race'
	+ ',#seasonSet4_p1_race,#seasonSet4_p2_race'
	+ ',#seasonSet5_p1_race,#seasonSet5_p2_race'
	+ ',#seasonSet6_p1_race,#seasonSet6_p2_race'
	+ ',#seasonSet7_p1_race,#seasonSet7_p2_race'
	+ ',#seasonSet8_p1_race,#seasonSet8_p2_race'
	+ ',#seasonSet9_p1_race,#seasonSet9_p2_race'
	+ ',#seasonSet10_p1_race,#seasonSet10_p2_race')
	.removeClass('win lose').attr('src','');
	
	$('#seasonSet1_p1_race_bg,#seasonSet1_p2_race_bg'
	+ ',#seasonSet2_p1_race_bg,#seasonSet2_p2_race_bg'
	+ ',#seasonSet3_p1_race_bg,#seasonSet3_p2_race_bg'
	+ ',#seasonSet4_p1_race_bg,#seasonSet4_p2_race_bg'
	+ ',#seasonSet5_p1_race_bg,#seasonSet5_p2_race_bg'
	+ ',#seasonSet6_p1_race_bg,#seasonSet6_p2_race_bg'
	+ ',#seasonSet7_p1_race_bg,#seasonSet7_p2_race_bg'
	+ ',#seasonSet8_p1_race_bg,#seasonSet8_p2_race_bg'
	+ ',#seasonSet9_p1_race_bg,#seasonSet9_p2_race_bg'
	+ ',#seasonSet10_p1_race_bg,#seasonSet10_p2_race_bg')
	.removeClass('win-bg lose-bg').attr('src','');
	
	$('#seasonSet1_p1_nick,#seasonSet1_p2_nick'
	+ ',#seasonSet2_p1_nick,#seasonSet2_p2_nick'
	+ ',#seasonSet3_p1_nick,#seasonSet3_p2_nick'
	+ ',#seasonSet4_p1_nick,#seasonSet4_p2_nick'
	+ ',#seasonSet5_p1_nick,#seasonSet5_p2_nick'
	+ ',#seasonSet6_p1_nick,#seasonSet6_p2_nick'
	+ ',#seasonSet7_p1_nick,#seasonSet7_p2_nick'
	+ ',#seasonSet8_p1_nick,#seasonSet8_p2_nick'
	+ ',#seasonSet9_p1_nick,#seasonSet9_p2_nick'
	+ ',#seasonSet10_p1_nick,#seasonSet10_p2_nick').html('');
	
	$('#seasonSet1_p1_country,#seasonSet1_p2_country'
	+ ',#seasonSet2_p1_country,#seasonSet2_p2_country'
	+ ',#seasonSet3_p1_country,#seasonSet3_p2_country'
	+ ',#seasonSet4_p1_country,#seasonSet4_p2_country'
	+ ',#seasonSet5_p1_country,#seasonSet5_p2_country'
	+ ',#seasonSet6_p1_country,#seasonSet6_p2_country'
	+ ',#seasonSet7_p1_country,#seasonSet7_p2_country'
	+ ',#seasonSet8_p1_country,#seasonSet8_p2_country'
	+ ',#seasonSet9_p1_country,#seasonSet9_p2_country'
	+ ',#seasonSet10_p1_country,#seasonSet10_p2_country')
	.attr('src','');
	
	$('#seasonSet1_detail,#seasonSet2_detail,#seasonSet3_detail'
	+ ',#seasonSet4_detail,#seasonSet5_detail').data('scheduleId','').data('setId','').data('pa','').data('pb','');
	return;
}

function resetGamesInfo() {
	$('#seasonSetGame0_1,#seasonSetGame0_2' 
	+ ',#seasonSetGame1_1,#seasonSetGame1_2'
	+ ',#seasonSetGame2_1,#seasonSetGame2_2'
	+ ',#seasonSetGame3_1,#seasonSetGame3_2'
	+ ',#seasonSetGame4_1,#seasonSetGame4_2'
	+ ',#seasonSetGame5_1,#seasonSetGame5_2'
	+ ',#seasonSetGame6_1,#seasonSetGame6_2'
	+ ',#seasonSetGame7_1,#seasonSetGame7_2'
	+ ',#seasonSetGame8_1,#seasonSetGame8_2').addClass('hide');
	
	$('#seasonSetGame0_name,#seasonSetGame0_map,#seasonSetGame0_p1_crystle,#seasonSetGame0_p1_oil,#seasonSetGame0_p1_apm,#seasonSetGame0_duration,#seasonSetGame0_p1_name,#seasonSetGame0_p2_crystle,#seasonSetGame0_p2_oil,#seasonSetGame0_p2_apm,#seasonSetGame0_p2_name'
	+ ',#seasonSetGame1_name,#seasonSetGame1_map,#seasonSetGame1_p1_crystle,#seasonSetGame1_p1_oil,#seasonSetGame1_p1_apm,#seasonSetGame1_duration,#seasonSetGame1_p1_name,#seasonSetGame1_p2_crystle,#seasonSetGame1_p2_oil,#seasonSetGame1_p2_apm,#seasonSetGame1_p2_name'
	+ ',#seasonSetGame2_name,#seasonSetGame2_map,#seasonSetGame2_p1_crystle,#seasonSetGame2_p1_oil,#seasonSetGame2_p1_apm,#seasonSetGame2_duration,#seasonSetGame2_p1_name,#seasonSetGame2_p2_crystle,#seasonSetGame2_p2_oil,#seasonSetGame2_p2_apm,#seasonSetGame2_p2_name'
	+ ',#seasonSetGame3_name,#seasonSetGame3_map,#seasonSetGame3_p1_crystle,#seasonSetGame3_p1_oil,#seasonSetGame3_p1_apm,#seasonSetGame3_duration,#seasonSetGame3_p1_name,#seasonSetGame3_p2_crystle,#seasonSetGame3_p2_oil,#seasonSetGame3_p2_apm,#seasonSetGame3_p2_name'
	+ ',#seasonSetGame4_name,#seasonSetGame4_map,#seasonSetGame4_p1_crystle,#seasonSetGame4_p1_oil,#seasonSetGame4_p1_apm,#seasonSetGame4_duration,#seasonSetGame4_p1_name,#seasonSetGame4_p2_crystle,#seasonSetGame4_p2_oil,#seasonSetGame4_p2_apm,#seasonSetGame4_p2_name'
	+ ',#seasonSetGame5_name,#seasonSetGame5_map,#seasonSetGame5_p1_crystle,#seasonSetGame5_p1_oil,#seasonSetGame5_p1_apm,#seasonSetGame5_duration,#seasonSetGame5_p1_name,#seasonSetGame5_p2_crystle,#seasonSetGame5_p2_oil,#seasonSetGame5_p2_apm,#seasonSetGame5_p2_name'
	+ ',#seasonSetGame6_name,#seasonSetGame6_map,#seasonSetGame6_p1_crystle,#seasonSetGame6_p1_oil,#seasonSetGame6_p1_apm,#seasonSetGame6_duration,#seasonSetGame6_p1_name,#seasonSetGame6_p2_crystle,#seasonSetGame6_p2_oil,#seasonSetGame6_p2_apm,#seasonSetGame6_p2_name'
	+ ',#seasonSetGame7_name,#seasonSetGame7_map,#seasonSetGame7_p1_crystle,#seasonSetGame7_p1_oil,#seasonSetGame7_p1_apm,#seasonSetGame7_duration,#seasonSetGame7_p1_name,#seasonSetGame7_p2_crystle,#seasonSetGame7_p2_oil,#seasonSetGame7_p2_apm,#seasonSetGame7_p2_name'
	+ ',#seasonSetGame8_name,#seasonSetGame8_map,#seasonSetGame8_p1_crystle,#seasonSetGame8_p1_oil,#seasonSetGame8_p1_apm,#seasonSetGame8_duration,#seasonSetGame8_p1_name,#seasonSetGame8_p2_crystle,#seasonSetGame8_p2_oil,#seasonSetGame8_p2_apm,#seasonSetGame8_p2_name'
	+ ',#seasonSetGame9_name,#seasonSetGame9_map,#seasonSetGame9_p1_crystle,#seasonSetGame9_p1_oil,#seasonSetGame9_p1_apm,#seasonSetGame9_duration,#seasonSetGame9_p1_name,#seasonSetGame9_p2_crystle,#seasonSetGame9_p2_oil,#seasonSetGame9_p2_apm,#seasonSetGame9_p2_name').html('');
}

function loadGameInfo(basePath, scheduleId, setId, pa, pb) {
	var postData = {};
	postData.scheduleId = scheduleId;
	postData.setId = setId;
	var urlTarget = basePath + '/public/schedule/match/set';
	$.postjson(urlTarget + '?rand=' + Math.random(), JSON.stringify(postData), function(data,textStatus, jqXHR) {
		if( data.code == 0 ) {
			resetGamesInfo();
			var games = data.scheduleMatchSet;
			for(var index = 0; index < games.length; index++) {
				var gameInfo = games[index];
				var p1Name = pa;
				var p2Name = pb;
				if( gameInfo.winner == 1) {
					p1Name = '<span class="tag win-tag">胜利</span>' + p1Name;
					p2Name = '<span class="tag defeat-tag">失败</span>' + p2Name;
				}
				else if( gameInfo.winner == 2) {
					p1Name = '<span class="tag defeat-tag">失败</span>' + p1Name;
					p2Name = '<span class="tag win-tag">胜利</span>' + p2Name;
				}
				$('#seasonSetGame' + index + '_1,#seasonSetGame' + index + '_2').removeClass('hide');
				$('#seasonSetGame' + index + '_name').html('第 ' + gameInfo.gameid + ' 局');
				$('#seasonSetGame' + index + '_map').html(gameInfo.mapName);
				$('#seasonSetGame' + index + '_p1_crystle').html(gameInfo.paCastyle);
				$('#seasonSetGame' + index + '_p1_oil').html(gameInfo.paOil);
				$('#seasonSetGame' + index + '_p1_apm').html(gameInfo.paApm);
				$('#seasonSetGame' + index + '_duration').html(gameInfo.duration);
				$('#seasonSetGame' + index + '_p1_name').html(p1Name);
				$('#seasonSetGame' + index + '_p2_crystle').html(gameInfo.pbCastyle);
				$('#seasonSetGame' + index + '_p2_oil').html(gameInfo.pbOil);
				$('#seasonSetGame' + index + '_p2_apm').html(gameInfo.pbApm);
				$('#seasonSetGame' + index + '_p2_name').html(p2Name);
			}
			
		} else {
			var message = '获取比赛对战信息失败![' + data.msg + ', ' + data.code + ']，请稍后再试！';
			tipMessage(message, false);
		}
	}, 'json');
}


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
	
	$('#seasonSet1_detail,#seasonSet2_detail,#seasonSet3_detail,#seasonSet4_detail,#seasonSet5_detail').click(function(){
    	var scheduleId = $(this).data('scheduleId');
    	var setId = $(this).data('setId');
    	var pa = $(this).data('pa');
    	var pb = $(this).data('pb');
    	loadGameInfo(basePath, scheduleId, setId, pa, pb);
    });
	
	var date = getQueryVariable("d");
	if(date) {
		//查询比赛日列表信息
		var postData = {};
		postData.date = date;
		var urlTarget = basePath + '/public/schedule/matches';
	    $.postjson(urlTarget + '?rand=' + Math.random(), JSON.stringify(postData), function(data,textStatus, jqXHR) {
			if( data.code == 0 ) {
				resetSetsInfo();
				var scheduleMatches = data.scheduleMatches;
				var title = '';
				var players = '';
				var setCount = 1;
				for(var index=0; index<scheduleMatches.length; index++) {
					$('#seasonMatchDay').html(scheduleMatches[index].day);
					title += scheduleMatches[index].title + '\\';
					players += scheduleMatches[index].players.toString() + '\\';
					
					for(var setIndex = 0; setIndex < scheduleMatches[index].sets.length; setIndex++) {
						var setInfo = scheduleMatches[index].sets[setIndex];
						$('#seasonSet' + setCount).removeClass('hide');
						$('#seasonSet' + setCount + ' .title').html(setInfo.title);
						
						var p1RaceClass = 'lose';
						var p1RaceBgClass = 'lose-bg';
						var p1RaceBgImg = '../../img/defeat.png';
						var p2RaceClass = 'lose';
						var p2RaceBgClass = 'lose-bg';
						var p2RaceBgImg = '../../img/defeat.png';
						if( setInfo.winner == 1) {
							p1RaceClass = 'win';
							p1RaceBgClass = 'win-bg';
							p1RaceBgImg = '../../img/win.png';
						}
						else if( setInfo.winner == 2) {
							p2RaceClass = 'win';
							p2RaceBgClass = 'win-bg';
							p2RaceBgImg = '../../img/win.png';
						}
						else if( setInfo.winner == 0 ) {
							$('#seasonSet' + setCount).addClass('hide');
							continue;
						}
						$('#seasonSet' + setCount + '_p1_race').addClass(p1RaceClass).attr('src','../../img/public/player_race_' + setInfo.p1Race.toLowerCase() + '.png');
						$('#seasonSet' + setCount + '_p1_race_bg').addClass(p1RaceBgClass).attr('src',p1RaceBgImg);
						$('#seasonSet' + setCount + '_p1_nick').html(setInfo.p1Nick);
						$('#seasonSet' + setCount + '_p1_country').attr('src','../../img/public/player_country_' + setInfo.p1Country.toLowerCase() + '.png');
						$('#seasonSet' + setCount + '_p2_race').addClass(p2RaceClass).attr('src','../../img/public/player_race_' + setInfo.p2Race.toLowerCase() + '.png');
						$('#seasonSet' + setCount + '_p2_race_bg').addClass(p2RaceBgClass).attr('src',p2RaceBgImg);
						$('#seasonSet' + setCount + '_p2_nick').html(setInfo.p2Nick);
						$('#seasonSet' + setCount + '_p2_country').attr('src','../../img/public/player_country_' + setInfo.p2Country.toLowerCase() + '.png');
						
						$('#seasonSet' + setCount + '_detail').data('scheduleId', scheduleMatches[index].scheduleId);
						$('#seasonSet' + setCount + '_detail').data('setId', setInfo.setId);
						$('#seasonSet' + setCount + '_detail').data('pa', setInfo.p1Nick);
						$('#seasonSet' + setCount + '_detail').data('pb', setInfo.p2Nick);
						setCount++;
					}
				}
				title = title.substring(0,title.length-1);
				$('#seasonMatchTitle').html(title);
				players = players.substring(0,players.length-1);
				$('#seasonMatchPlayers').html(players);
				
				//获取初始化之后的左边栏高度然后改变详情高度
				changeDetailHeight(); 
				
				$('#seasonSet1_detail').click();
				
			} else {
				var message = '获取赛季列表信息失败![' + data.msg + ', ' + data.code + ']，请稍后再试！';
				tipMessage(message, false);
			}
		}, 'json');
	}
	
});


