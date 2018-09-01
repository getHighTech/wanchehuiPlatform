import React, { Component } from "react";

import './upload.css';

const cloudName = 'ddycd5xyn';
const unsignedUploadPreset = 'rq6jvg1m';


class UploadCoverToCloudinary extends Component {
    constructor(props){
      super(props);
      this.state = {
        cover:'',
        status:false
      }
    }
    handleClickCover=(e)=>{
        if(this.refs.fileElems){
            fileElems.click();
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
        console.log(file);
        var url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
        var xhr = new XMLHttpRequest();
        var fd = new FormData();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

        // Reset the upload progressCover bar
         document.getElementById('progressCover').style.width = 0;

        // Update progressCover (can be used to show progressCover indicator)
        xhr.upload.addEventListener("progressCover", function(e) {
          var progressCover = Math.round((e.loaded * 100.0) / e.total);
          document.getElementById('progressCover').style.width = progressCover + "%";

          console.log(`fileuploadprogressCover data.loaded: ${e.loaded},
        data.total: ${e.total}`);
        });

        xhr.onreadystatechange = (e) => {
          if (xhr.readyState == 4 && xhr.status == 200) {
            // File uploaded successfully
            var response = JSON.parse(xhr.responseText);
            // https://res.cloudinary.com/cloudName/image/upload/v1483481128/public_id.jpg
            var url = response.secure_url;
            // Create a thumbnail of the uploaded image, with 150px width
            // var tokens = url.split('/');
            // tokens.splice(-2, 0, 'w_150,c_scale');
            var img = new Image(); // HTML5 Constructor

            let remoteUrl = url;
            console.log(remoteUrl);

            img.src = url;
            this.setState({
              cover:img.src,
              status:true
            })
              this.props.getRemoteCover(this.state.cover);

            img.alt = response.public_id;
            console.log(img);
            // document.getElementById('gallery').appendChild(img);
          }
        };

        fd.append('upload_preset', unsignedUploadPreset);
        fd.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
        fd.append('file', file);
        xhr.send(fd);
    }

    handleFileChange=(e)=>{
        let files =  this.refs.fileElems.files;
        this.uploadFile(files[0]);
    }

    componentDidMount(){
        let fileElems = this.refs.fileElems;
    }
    componentWillReceiveProps(nextProps){
      console.log(nextProps);
      console.log(nextProps.images_state);
    //   if (!nextProps.images_state) {
    //     console.log('aaa');
    //   let cover = nextProps.cover;
    //   let self = this;
    //   self.setState({
    //     cover:cover
    //   })
    // }
    let self = this;
    let cover = nextProps.cover;
    if (nextProps.images_state) {
        self.setState({
          status:false
        })
    }
    if (!this.state.status) {
      self.setState({
          cover:cover
        })
    }

    }
    render() {
        return (
            <div id="dropbox"
            onDragEnter={(e)=>this.handleDrapenter(e)}
            onDragOver={(e)=>this.handleDrapover(e)}
            onDrop={(e)=>this.handleDrop(e)}
            >
              <div style={{width:'50%'}}>
                    <span style={{textAlign:"center"}}><a href="#" id="fileSelect" onClick={(e)=>this.handleClickCover(e)}>点击选择图片</a></span>
              </div>
                    <form className="my-form">
                        <div className="form_line">
                        <div className="form_controls">
                            <div className="upload_button_holder">
                            <input onChange={(e)=>this.handleFileChange(e)} ref="fileElems" type="file" id="fileElems" multiple accept="image/*" style={{display: "none"}} />

                            </div>
                        </div>
                        </div>
                    </form>
                    <div className="progressCover-bar" id="progressCover-bar">
                        <div className="progressCover" id="progressCover"></div>
                    </div>
                    <div id="gallerys" >
                    <img src={this.state.cover} />
                    </div>
            </div>
        );
    }
}


export default UploadCoverToCloudinary;
