// main.js

import { addMsg, replaceEmojis } from './utils.js';
import { apiClient } from './jsapi.js';

var msgList = [];

function init(chatName) {
	if (!chatName) {
		alert("请填写扮演者名称");
	}
	apiClient.getCharacterPrompt("firefly").then(result => {
		var replacedResult = result.replace(/{开拓者姓名}/g, chatName);
		msgList = [];
		msgList.push({"role": "system", "content": replacedResult});
		alert('扮演者设定成功！');
	}).catch(error => {
		alert('在init过程中发生了错误：', error);
	});
}

document.addEventListener('DOMContentLoaded', () => {
    const emojiBtn = document.getElementById('emoji-btn');
    const sendBtn = document.getElementById('send-btn');
    const messageInput = document.getElementById('message-input');
    const chatBox = document.getElementById('chat-box');
    const emojiPanel = document.getElementById('emoji-panel');
    const confirmBtn = document.getElementById('confirm-btn');
    const externalMessageInput = document.getElementById('external-message-input');
    const actorInput = document.getElementById('actor-name');
    const actorSubmitBtn = document.getElementById('actor-submit-btn');

    let emojis = {};

    // 初始化表情列表
    apiClient.getEmotionList().then(data => {
        data.forEach(item => {
            emojis[item.emotion_token] = item.emotion_path;
        });
    });

    // 点击表情按钮显示或隐藏表情面板
    emojiBtn.addEventListener('click', () => {
        emojiPanel.classList.toggle('hidden');
    });

    // 点击发送按钮发送消息
    sendBtn.addEventListener('click', () => {
        const msg = messageInput.value.trim();
        if (msg) {
            addMsg(msg, 2, '#000000'); // 用户消息
            messageInput.value = ''; // 清空输入框
            chatBox.scrollTop = chatBox.scrollHeight; // 滚动到底部

            // 发送消息到后端，并接收返回的消息
            apiClient.sendChatMessage(msg, msgList).then(response => {
                msgList.push({"role": "user", "content": msg});
    	        msgList.push({"role": "assistant", "content": response});
                addMsg(response, 0, '#000000', msg); // 对方消息
                chatBox.scrollTop = chatBox.scrollHeight; // 滚动到底部
            });
        }
    });

    // 点击确认按钮插入系统消息
    confirmBtn.addEventListener('click', () => {
        const msg = externalMessageInput.value.trim();
        if (msg) {
            addMsg(msg, 1, '#a9a9a9'); // 系统消息
            externalMessageInput.value = ''; // 清空输入框
            chatBox.scrollTop = chatBox.scrollHeight; // 滚动到底部
        }
    });

    // 选择表情插入到输入框
    emojiPanel.addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG') {
            const emojiToken = `(${e.target.alt})`;
            messageInput.value += emojiToken;
            emojiPanel.classList.add('hidden');
        }
    });

    // 将聊天框中的表情描述符替换为图片
    chatBox.addEventListener('DOMNodeInserted', (e) => {
        const target = e.target;
        if (target.classList.contains('message')) {
            target.innerHTML = replaceEmojis(target.innerHTML, emojis);
        }
    });

    // 对方消息旁的圆形按钮点击事件（示例，需要具体实现）
    chatBox.addEventListener('click', (e) => {
        if (e.target.classList.contains('partner-message')) {
            // 获取对应的对方消息和用户消息
            const partnerMsg = e.target.dataset.partnerMsg;
            const myMsg = e.target.dataset.myMsg;
            // 生成语音
            apiClient.generateVoice(myMsg, partnerMsg).then(voiceUrl => {
                // 播放语音（具体实现方式取决于浏览器支持）
                const audio = new Audio(voiceUrl);
                audio.play();
            });
        }
    });

    actorSubmitBtn.addEventListener('click', (e) => {
        const actorName = actorInput.value.trim();
        init(actorName);
    });
});
