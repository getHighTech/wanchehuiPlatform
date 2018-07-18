import React, { Component } from "react";

import './upload.css';

const cloudName = 'ddycd5xyn';
const unsignedUploadPreset = 'rq6jvg1m';


class UploadToCloudinary extends Component {
    constructor(props){
      super(props);

    }
    handleClick=(e)=>{
        if(this.refs.fileElem){
          this.refs.fileElem.click();
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
      if (this.props.single) {
        this.uploadFile(files[0]);
        return false;
      }
      for (var i = 0; i < files.length; i++) {
        this.uploadFile(files[i]); // call the function to upload the file
      }
    }

    uploadFile = (file) => {
      let self = this
      // document.getElementById('gallery').innerHTML='';
      //   console.log(file);
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

        xhr.onreadystatechange = (e) => {
          if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            let url = response.secure_url;
            var img = new Image(); // HTML5 Constructor
            img.src = url;
            img.width = 250
            console.log(url)
            self.props.setUrl(url)
            if (this.props.single) {
              this.refs.gallery.innerHTML = '';
            }
            this.refs.gallery.appendChild(img);
          }
        };
        fd.append('upload_preset', unsignedUploadPreset);
        fd.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
        fd.append('file', file);
        xhr.send(fd);

    }

    handleFileChange=(e)=>{
        let files =  this.refs.fileElem.files;
        console.log('确定上传图片')
        console.log(files);
        for (var i = 0; i < files.length; i++) {
            this.uploadFile(files[i]); // call the function to upload the file
          }

    }

    componentDidMount(){
      console.log("走了这DID");
        let fileElem = this.refs.fileElem;
        // console.log(this.props.images);
        // let images = this.props.images;
        // if (typeof(images)!='undefined') {
        //   for (var i = 0; i < images.length; i++) {
        //     var img =new Image();
        //     img.src  = images[i];
        //     console.log(img);
        //     document.getElementById('gallery').appendChild(img);
        //   }
        // }
    }
    childMethod = () => alert('xiaohesong')

    // componentWillReceiveProps(nextProps){
    //   // console.log("走了WILL");
    //   // this.setState({
    //   //   remoteUrls:[]
    //   // })
    //   // console.log(nextProps.images_state);
    //   let images_state=nextProps.images_state
    //   if (nextProps.images_state) {
    //     this.setState({
    //       remoteUrls:[]
    //     })
    //   }
    //   // console.log(this.state.remoteUrls);
    //   // console.log(nextProps.images);
    //   let images = nextProps.images;
    //   if (this.state.remoteUrls.length==0) {
    //     if (typeof(images)!='undefined') {
    //       document.getElementById('gallery').innerHTML='';
    //       for (var i = 0; i < images.length; i++) {
    //         var img =new Image();
    //         img.src  = images[i];
    //         img.alt="old"
    //         // console.log(img);
    //         document.getElementById('gallery').appendChild(img);
    //       }
    //     }
    //     else {
    //       document.getElementById('gallery').innerHTML='';
    //     }
    //   }


    // }
    render() {
        return (
            <div id="dropbox"
            onDragEnter={(e)=>this.handleDrapenter(e)}
            onDragOver={(e)=>this.handleDrapover(e)}
            onDrop={(e)=>this.handleDrop(e)}
            >
              <div style={{width:'100%',textAlign:'center'}}>
                    <span style={{textAlign:"center"}}><a href="#"  onClick={(e)=>this.handleClick(e)}>点击选择图片</a>或者拖拽</span>
              </div>
                    <form className="my-form">
                        <div className="form_line">
                        <div className="form_controls">
                            <div className="upload_button_holder">
                            <input onChange={(e)=>this.handleFileChange(e)} ref="fileElem" type="file" id="fileElem" multiple accept="image/*" style={{display: "none"}} />

                            </div>
                        </div>
                        </div>
                    </form>
                    <div className="progress-bar" id="progress-bar">
                        <div className="progress" id="progress"></div>
                    </div>
                    <div ref="gallery" >
                    </div>
            </div>
        );
    }
}


export default UploadToCloudinary;
