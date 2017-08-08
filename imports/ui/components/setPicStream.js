export function setPicStream(docObj){

    var fileName = docObj.value;
    if (!fileName.match(/.jpg|.gif|.png|.bmp/i)) {
    alert('您上传的图片格式不正确，请重新选择！');
    return false;
    }
    if (docObj.files && docObj.files[0]) {
    //imgObjPreview.src = docObj.files[0].getAsDataURL();
      if (window.navigator.userAgent.indexOf("Chrome") >= 1 || window.navigator.userAgent.indexOf("Safari") >= 1) {
        return  window.webkitURL.createObjectURL(docObj.files[0]);
      }
      else {
        return window.URL.createObjectURL(docObj.files[0]);
      }
    } else{
      return false;
    }
}
