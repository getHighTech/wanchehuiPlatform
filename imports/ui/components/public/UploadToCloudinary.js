import React, { Component } from "react";

import './upload.css';

const cloudName = 'ddycd5xyn';
const unsignedUploadPreset = 'rq6jvg1m';


class UploadToCloudinary extends Component {
    constructor(props){
      super(props);
    //   this.state={
    //     urls:this.props.initUrl
    //   }

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
            let img = new Image(); // HTML5 Constructor
            img.src = url;
            img.width = 250
            console.log(url)
            self.props.setUrl(url)
            if (this.props.single) {
              this.refs.gallery.innerHTML = '';
              this.refs.gallery.appendChild(img)
            }else{
                this.refs.gallery.appendChild(img)
            }
           
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

    click(e){
        this.props.deteleImage(e.target.src)
    }

    // }
    render() {
        const {single,initUrl } = this.props
        let images=[]
        let self = this
        if (single) {
            images = <img src={initUrl} width={250}/>;
        } 
        else if (initUrl !== undefined && initUrl.length>0){
            for (let i = 0; i < initUrl.length; i++) {
                images.push(<img src={initUrl[i]}   onClick={(e)=> self.click(e)}  width={250} />)
            }
        }
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
                        {images}
                    </div>
            </div>
        );
    }
}

export default UploadToCloudinary;
