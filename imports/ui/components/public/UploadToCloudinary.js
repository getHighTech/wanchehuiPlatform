import React, { Component } from "react";

import './upload.css';

const cloudName = 'ddycd5xyn';
const unsignedUploadPreset = 'rq6jvg1m';


class UploadToCloudinary extends Component {
    handleClick=(e)=>{
        if(this.refs.fileElem){
            fileElem.click();
        }
        e.preventDefault();
        return false;
    }
// ************************ Drag and drop拖拽 ***************** //

    handleDrapenter=(e)=>{
        e.stopPropagation();
        e.preventDefault();
    }

    handleDrapover=(e)=>{
        e.stopPropagation();
        e.preventDefault();
    }
    handleDrop=(e)=>{
        e.stopPropagation();
        e.preventDefault();
        let dt = e.dataTransfer;
        let files = dt.files;
        this.handleFiles(files);
    }

    handleFiles = (files) => {
        for (var i = 0; i < files.length; i++) {
            this.uploadFile(files[i]); // call the function to upload the file
          }
    }

    uploadFile = (file) => {
        var url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
        var xhr = new XMLHttpRequest();
        var fd = new FormData();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      
        // Reset the upload progress bar
         document.getElementById('progress').style.width = 0;
        
        // Update progress (can be used to show progress indicator)
        xhr.upload.addEventListener("progress", function(e) {
          var progress = Math.round((e.loaded * 100.0) / e.total);
          document.getElementById('progress').style.width = progress + "%";
      
          console.log(`fileuploadprogress data.loaded: ${e.loaded},
        data.total: ${e.total}`);
        });
      
        xhr.onreadystatechange = function(e) {
          if (xhr.readyState == 4 && xhr.status == 200) {
            // File uploaded successfully
            var response = JSON.parse(xhr.responseText);
            // https://res.cloudinary.com/cloudName/image/upload/v1483481128/public_id.jpg
            var url = response.secure_url;
            // Create a thumbnail of the uploaded image, with 150px width
            var tokens = url.split('/');
            tokens.splice(-2, 0, 'w_150,c_scale');
            var img = new Image(); // HTML5 Constructor
            img.src = tokens.join('/');
            img.alt = response.public_id;
            document.getElementById('gallery').appendChild(img);
          }
        };
      
        fd.append('upload_preset', unsignedUploadPreset);
        fd.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
        fd.append('file', file);
        xhr.send(fd);
    }

    handleFileChange=(e)=>{
        let files =  this.refs.fileElem.files;
        this.uploadFile(files[0]);
    }

    componentDidMount(){
        let fileElem = this.refs.fileElem;
    }
    render() {
        return (
            <div id="dropbox" 
            onDragEnter={(e)=>this.handleDrapenter(e)}
            onDragOver={(e)=>this.handleDrapover(e)}
            onDrop={(e)=>this.handleDrop(e)}
            >
                    <h1>上传图片</h1> 

                    <form className="my-form">
                        <div className="form_line">
                        <div className="form_controls">
                            <div className="upload_button_holder">
                            <input onChange={(e)=>this.handleFileChange(e)} ref="fileElem" type="file" id="fileElem" multiple accept="image/*" style={{display: "none"}} />
                            <a href="#" id="fileSelect" onClick={(e)=>this.handleClick(e)}>点击选择图片</a>
                            </div>
                        </div>
                        </div>
                    </form>
                    <div className="progress-bar" id="progress-bar">
                        <div className="progress" id="progress"></div>
                    </div>
                    <div id="gallery" />
            </div>
        );
    }
}


export default UploadToCloudinary;