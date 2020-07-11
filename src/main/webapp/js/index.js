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
    $('body').click(function () {
        $('.season-list').slideUp(200);
    });


//搜索赛季过滤
    $('.search_input').fastLiveFilter('.search_list');
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