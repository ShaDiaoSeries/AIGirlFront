// utils.js

/**
 * 向聊天框中添加消息
 * @param {string} msg - 消息文本
 * @param {number} position - 消息位置：0-左侧（对方消息），1-中间（系统消息），2-右侧（用户消息）
 * @param {string} fontColor - 字体颜色
 * @param {string} refMsg - 参考消息（添加对方消息时使用，将用户消息提交过来）
 */
function addMsg(msg, position, fontColor, refMsg) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.textContent = msg;
    messageElement.style.color = fontColor;
    
    // 根据位置设置样式
    switch (position) {
      case 0: // 对方消息
        messageElement.classList.add('partner-message');
        messageElement.dataset.myMsg = refMsg;
        messageElement.dataset.partnerMsg = msg;
        break;
      case 1: // 系统消息
        messageElement.classList.add('system-message');
        messageElement.style.textAlign = 'center';
        break;
      case 2: // 用户消息
        messageElement.classList.add('user-message');
        break;
      default:
        console.error('Invalid position value');
        return;
    }
    
    chatBox.appendChild(messageElement);
    // 自动滚动到底部
    chatBox.scrollTop = chatBox.scrollHeight;
  }
  
  /**
   * 替换文本中的表情包描述符为对应的图片元素
   * @param {string} text - 包含表情包描述符的文本
   * @param {Object} emotions - 表情包对象，包含描述符和路径
   * @returns {string} - 替换后的HTML字符串
   */
  function replaceEmojis(text, emotions) {
    return text.replace(/(\(\#.+?\))/g, (match) => {
      if (emotions[match]) {
        return `<img src="${emotions[match]}" alt="${match}" class="emoji">`;
      }
      return match;
    });
  }
  
  // 导出函数以便在其他文件中使用
  export { addMsg, replaceEmojis };
  