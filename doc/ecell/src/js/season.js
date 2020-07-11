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