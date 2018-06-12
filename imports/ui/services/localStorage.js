/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
    if (!name) return;
    console.log(name);
    console.log(content);
    if (typeof content !== 'string') {
      content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
  }

  /**
   * 获取localStorage
   */
  export const getStore = name => {
    if (!name) return;
    return window.localStorage.getItem(name);
  }

  /**
   * 删除localStorage
   */
  export const removeStore = name => {
    if (!name) return;
    window.localStorage.removeItem(name);
  }
