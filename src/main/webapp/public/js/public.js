function pageJump(href) {
    location.href = href;
};

function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
           var pair = vars[i].split("=");
           if(pair[0] == variable){return pair[1];}
       }
       return(false);
};

function tipMessage(message, isAutoClose) {
	// isAutoClose = arguments[1]===undefined ? true : arguments[1];
	var autoClose = arguments[1];
	var type = 'error';
	if( autoClose === undefined ) {
		type = 'info';
	}
	Lobibox.notify(type, {
        size: 'normal',
        rounded: false,
        delayIndicator: true,
        msg: message,
        icon: 'warning icon',
        title: '提示信息',
        showClass: undefined,
        hideClass: undefined,
        sound: undefined,
        img: undefined,
        delay: autoClose
	});
};