
function loadPlayerProfile( basePath, nick, playId ) {
	$('#profile_player' + playId + '_nick').html('--');
	$('#profile_player' + playId + '_avatar').attr('src', basePath + '/img/public/who.jpg');
	$('#profile_player' + playId + ' .one-title').html('');
	$('#profile_player' + playId + '_race').attr('src', basePath + '/img/public/player_race_empty.png');
	$('#profile_player' + playId + '_country').attr('src', basePath + '/img/public/player_country_empty.png');
	$('#profile_player' + playId + '_name').html('--');
	$('#profile_player' + playId + '_race_text').html('--');
	$('#profile_player' + playId + '_age').html('--');
	$('#profile_player' + playId + '_team').html('--');
	$('#profile_player' + playId + '_winning').html('胜率 --');
	$('#profile_player' + playId + '_winning_vt').html('VT --');
	$('#profile_player' + playId + '_winning_vp').html('VP --');
	$('#profile_player' + playId + '_winning_vz').html('VZ --');
	$('#profile_player' + playId + '_apm').html('--');
	$('#profile_player' + playId + '_duration').html('--');
	$('#profile_player' + playId + '_resource').html('--');
	$('#profile_player' + playId + '_difference').html('--');
			
	var postData = {};
	postData.players = [];
	postData.players.push(nick);
	var urlTarget = basePath + '/public/profile';
	$.postjson(urlTarget + '?rand=' + Math.random(), JSON.stringify(postData), function(data,textStatus, jqXHR) {
		if( data.code == 0 ) {
			console.log(data.players);
			var player = data.players[0];
			if(player ==undefined) {
				tipMessage('没有找到选手[' + nick + ']的比赛数据.');
				return;
			}
			$('#profile_player' + playId + '_nick').html(nick);
			if( player.avatar != null && player.avatar.length > 0) {
				$('#profile_player' + playId + '_avatar').attr('src', basePath + '/' + player.avatar);	
			}
			$('#profile_player' + playId + '_race').attr('src', basePath + '/img/public/player_race_' + player.race.toLowerCase() + '.png');
			$('#profile_player' + playId + '_country').attr('src', basePath + '/img/public/player_country_' + player.country.toLowerCase() + '.png');
			$('#profile_player' + playId + '_name').html(player.name);
			var raceText = '';
			if( player.race.toLowerCase() === 't' ) {
				raceText = 'TERREN';
			}
			else if( player.race.toLowerCase() === 'p' ) {
				raceText = 'PROTOSS';
			}
			else if( player.race.toLowerCase() === 'z' ) {
				raceText = 'ZERG';
			}
			$('#profile_player' + playId + '_race_text').html(raceText);
			$('#profile_player' + playId + '_age').html(player.age);
			$('#profile_player' + playId + '_team').html(player.team);
			var winningText = '胜率 ' + player.winningVA + ' ' + player.vacount;// '10-20'
			$('#profile_player' + playId + '_winning').html(winningText);
			winningText = 'VT ' + player.winningVT + ' ' + player.vtcount;//'28% 6-9';
			$('#profile_player' + playId + '_winning_vt').html(winningText);
			winningText = 'VP ' + player.winningVP + ' ' + player.vpcount;//'28% 6-9';
			$('#profile_player' + playId + '_winning_vp').html(winningText);
			winningText = 'VZ ' + player.winningVZ + ' ' + player.vzcount;//'28% 6-9';
			$('#profile_player' + playId + '_winning_vz').html(winningText);
			$('#profile_player' + playId + '_apm').html(player.apm);
			$('#profile_player' + playId + '_duration').html(player.duration);
			$('#profile_player' + playId + '_resource').html(player.resource);
			$('#profile_player' + playId + '_difference').html(player.difference);
			
			//[常规赛] 2020-6-1 <span style="color:red">WIN</span> Kukuboy on 断路器
			player.last10.forEach(function(game, index, arr){
				var color = game.result === 'WIN' ? 'red' : 'grey';
				var htmlText = '[' + game.type + '] ' + game.date + ' <span style="color:' + color + '">' + game.result + '</span> ' + game.adversary + ' ON ' + game.map;
				$('#profile_player' + playId + '_last_' + (index+1)).html(htmlText);
				//$('#profile_player' + playId + '_last_' + (index+1)).removeClass('hide');
			});
			
		} else {
			var message = '获取选手战绩信息失败![' + data.msg + ', ' + data.code + ']';
			tipMessage(message, false);
		}
	}, 'json');
}

function updatePlayerProfile() {
	var playerNick = $(this).data("id");
	var playerId = $(this).parent().data("id");
	//console.log(playerId);
	var basePath = $('body').data('basePath');
	loadPlayerProfile(basePath, playerNick, playerId);
};

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
	
	var nick = getQueryVariable("id");
	if(nick) {
		loadPlayerProfile(basePath, nick, 1);	
	}
	
	var urlTarget = basePath + '/public/player/list';
    $.postjson(urlTarget + '?rand=' + Math.random(), JSON.stringify({}), function(data,textStatus, jqXHR) {
		if( data.code == 0 ) {
			var playersBasic = data.list;
			
			$('#profile_select_player1, #profile_select_player2').html('<li class="profileSelectPlayerItem" data-id="0"></li>');
			/*playersBasic.forEach(function(player){
				$('#profile_select_player1, #profile_select_player2').append('<li class="profileSelectPlayerItem" data-id="' + player.nick + '">' + player.nick + '</li>');
			});*/
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
		    $('.search_input2').fastLiveFilter('#profile_select_player2');
			
		} else {
			var message = '获取选手列表信息失败![' + data.msg + ', ' + data.code + ']，请联系管理员！';
			tipMessage(message, false);
		}
	}, 'json');
});