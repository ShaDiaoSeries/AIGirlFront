// 通用request方法
function request(url, type, formdata) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: url,
            type: type,
            data: formdata,
            contentType : false,
            processData : false,
            success: function(response) {
                var respJson = JSON.parse(response);
                if (respJson.code == 0) {
                    resolve(respJson.data);
                } else {
                    reject(respJson);
                }
            },
            error: function(xhr, status, error) {
                if (xhr.status == 401) {
                    window.location.href = "./login.html";
                } else {
                    reject(error);
                }
            }
        });
    });
}

async function sendMessageCore(url, reqMethod, formData) {
    return await request(url, reqMethod, formData);
}

let host = "";
// let host = "http://43.136.95.117:38496";

async function getLocationData(msg) {
    var url = host + "/api/client/kb_retrieve";
    var kbid = "1802681182299852800";
    var formData = new FormData();
    formData.append('msg', msg);
    formData.append('kbid', kbid);
    return sendMessageCore(url, "POST", formData);
}

async function getSubCharacterData(msg) {
    var url = host + "/api/client/kb_retrieve";
    var kbid = "1802681182299852800";
    var formData = new FormData();
    formData.append('msg', msg);
    formData.append('kbid', kbid);
    return sendMessageCore(url, "POST", formData);
}

async function getCharacterPrompt(characterName) {
    var url = host + "/api/client/get_character_system_prompt?characterName=" + characterName;
    return sendMessageCore(url, "GET", null);
}

async function getHistoryChatData(characterName) {
    var url = host + "/api/client/get_chatlog?characterName=" + characterName;
    return sendMessageCore(url, "GET", null);
}

async function chat(msg, msgList) {
    var url = host + "/api/client/chat";
    var formData = new FormData();
    formData.append('msg', msg);
    formData.append('chatHistory', JSON.stringify(msgList));
    return sendMessageCore(url, "POST", formData);
}

document.addEventListener('DOMContentLoaded', function() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'js/chatbox.js';
    document.body.appendChild(script);
});