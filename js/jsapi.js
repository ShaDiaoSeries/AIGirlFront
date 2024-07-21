// jsapi.js

import axios from 'axios';

/**
 * 发送HTTP请求到后端API
 * @param {string} url - API的URL
 * @param {string} method - 请求方法，'GET' 或 'POST'
 * @param {Object} postBody - POST请求时的body数据
 * @returns {Promise} - 返回一个Promise对象，解析为API的响应数据
 */
function callApi(url, method, postBody = null) {
  const config = {
    method: method,
    url: url,
    headers: {}
  };

  if (method === 'POST') {
    const formData = new FormData();
    for (const key in postBody) {
      formData.append(key, postBody[key]);
    }
    config.data = formData;
  }

  return axios(config)
    .then(response => response.data.data)
    .catch(error => {
      if (error.response.status == 400 || error.response.status == 401) {
        window.location.href = "./login.html";
      } else {
        console.error('API call failed:', error);
        throw error;
      }
    });
}

var host = "";

// API接口方法
export const apiClient = {
  getLocationData: function(msg) {
    var url = host + "/jsapi/client/kb_retrieve";
    var kbid = "1802681182299852800"; 
    return callApi(url, "POST", { msg: msg, kbid: kbid });
  },

  getSubCharacterData: function(msg) {
    var url = host + "/jsapi/client/kb_retrieve";
    var kbid = "1802681182299852800";
    return callApi(url, "POST", { msg: msg, kbid: kbid });
  },

  getCharacterPrompt: function(characterName) {
    var url = host + "/jsapi/client/get_character_system_prompt?characterName=" + characterName;
    return callApi(url, 'GET');
  },

  getHistoryChatData: function(characterName) {
    var url = host + "/api/client/get_chatlog?characterName=" + characterName;
    return callApi(url, 'GET');
  },


//   async function chat(msg, msgList) {
//     var url = host + "/api/client/chat";
//     var formData = new FormData();
//     formData.append('msg', msg);
//     formData.append('chatHistory', JSON.stringify(msgList));
//     return sendMessageCore(url, "POST", formData);
// }

  /**
   * 发送聊天消息
   * @param {string} msg - 用户发送的消息
   * @returns {Promise} - 返回一个Promise对象，解析为后端的响应数据
   */
  sendChatMessage: function(msg, msgList) {
    var url = host + "/jsapi/client/chat";
    var formData = new FormData();
    formData.append('msg', msg);
    formData.append('chatHistory', JSON.stringify(msgList));
    return callApi(url, 'POST', { msg: msg, chatHistory: JSON.stringify(msgList) });
  },

  /**
   * 获取表情列表
   * @returns {Promise} - 返回一个Promise对象，解析为表情列表
   */
  getEmotionList: function() {
    return callApi(host + '/jsapi/client/emotion_list', 'GET');
  },

  /**
   * 生成语音消息
   * @param {string} mymsg - 用户的消息
   * @param {string} partnermsg - 对方的消息
   * @returns {Promise} - 返回一个Promise对象，解析为语音文件的URL
   */
  generateVoice: function(mymsg, partnermsg) {
    return callApi(host + '/jsapi/client/voice_generate', 'POST', { characterId: '4a6edab8-5f67-4df9-bc29-c19870cdaf0c', askText: mymsg, answerText: partnermsg });
  }
};
