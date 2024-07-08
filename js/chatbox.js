let msgList = [];

//给聊天窗口绑定回车发送消息事件
document.getElementById("ui_inp_msg").onkeydown = function(e) {
	if(e.key === 'Enter'){
		sendmsgOnChatbox();//发送消息
	}
};

function init() {
	var chatname = document.getElementById('chatname').value;
	if (!chatname) {
		alert("请填写扮演者名称");
	}
	getCharacterPrompt("firefly").then(result => {
		var replacedResult = result.replace(/{开拓者姓名}/g, chatname);
		msgList = [];
		msgList.push({"role": "system", "content": replacedResult});
		alert('扮演者设定成功！');
	}).catch(error => {
		alert('在init过程中发生了错误：', error);
	});
}

function sendmsgOnChatbox() {
	var msg = document.getElementById("ui_inp_msg").value;
	if(!msg){
		alert("输入内容不能为空");
		return;
	}
	if (msgList.length === 0) {
		alert("尚未设定扮演者，请设定后重试");
		return;
	}
	document.getElementById("ui_inp_msg").value = "";
	addMsgToChatbox(msg, true, false);
	chat(msg, msgList).then(result => {
		msgList.push({"role": "user", "content": msg});
    	msgList.push({"role": "assistant", "content": result});
		addMsgToChatbox(result, false, true);
	}).catch(error => {
		console.error('在调用过程中发生了错误：', error);
	});
}

// 在聊天窗口上增加一条消息（raw）
function addMsgToChatbox(msg, isClient, needDelay, color) {
	return new Promise(function(resolve, reject) {
		setTimeout(() => {
			var appendHtml = isClient
			? `<li class="t2"><img src="img/soul.webp"><div class="txt" style="color:${color ? color : 'black'}">` + msg + '</div></li>'
			: `<li class="t1"><img src="img/acao.jpg"><div class="txt" style="color:${color ? color : 'black'}">` + msg + '</div></li>';
			$("#ui_msg_box").append(appendHtml);
			scrollMsgBottom();
			resolve();
		}, needDelay ? 1000 : 0);
	});
}

// 将聊天消息的滚动条滑到底部
function scrollMsgBottom() {
	var topH = -$("#ui_msg_box").height();
	$("#ui_msg_box>li").each(function() {
		topH += $(this).outerHeight(true);
	});
	$("#ui_msg_box").animate({scrollTop: topH}, 200);
}