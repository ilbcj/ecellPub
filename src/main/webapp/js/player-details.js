//选手库显示
$('.current-player').click(function () {
    $('.select-player-list').slideUp(200);
    $(this).siblings('.select-player-list').slideToggle(200);
});

document.body.onclick = function(e){
    e = window.event || e;
    var obj = $(e.srcElement || e.target);
    if (obj.attr('data-toggle')!='down') {
        $('.select-player-list').slideUp(200);
    }
};
