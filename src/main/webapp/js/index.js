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

//升序动画
$('.icon-up').hover(function () {
    $(this).animate({
        'top':'-10px'
    },50,function () {
        $('.icon-up').animate({
            'top':'0'
        },50)
    });
});

//降序动画
$('.icon-down').hover(function () {
    $(this).animate({
        'top':'10px'
    },50,function () {
        $('.icon-down').animate({
            'top':'0'
        },50)
    })
});
