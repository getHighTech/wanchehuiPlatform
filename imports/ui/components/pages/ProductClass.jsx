import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Modal, Button } from 'antd';
import { Select } from 'antd';
const Option = Select.Option;

// function handleChange(value) {
//   console.log(`selected ${value}`);
// }

class ProductClass extends Component {
    state = {
       visible: false,
       productClass:[],
     }
     showModal = () => {
       this.setState({
         visible: true,
         productClass:[]
       });
     }
     handleOk = (e) => {
       console.log(this.state.productClass);
       let aaa= this.state.productClass;
       console.log(aaa);
       for (var i = 0; i < aaa.length; i++) {
         let productclass =aaa[i]
         console.log(productclass);
         Meteor.call('productclass.insert',productclass,function(err,alt){
           if (!err) {
             console.log(alt);
           }
         })
       }

       this.setState({
         visible: false,
         productClass:[]
       });
     }
     handleCancel = (e) => {
       console.log(e);
       this.setState({
         visible: false,
         productClass:[]
       });
     }
     handleChange(value) {
       console.log(`selected ${value}`);
       console.log(value);
       this.setState({
         productClass:value
       })
     }
     componentDidMount(){
       Meteor.call('get.productclass',function(err,alt){
         if (!err) {
           console.log(alt);
         }
         else {
           console.log(err);
         }
       })
     }
  render() {
      console.log(this.state.productClass);
     return (
      <div>
      <span>11</span>
      <Button type="primary" onClick={this.showModal}>Open</Button>
      <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
        <Select
          mode="tags"
          style={{ width: '100%' }}
          dropdownStyle={{zIndex:'99999' }}
          placeholder="Please select"
          onChange={this.handleChange.bind(this)}
        >
        </Select>
        </Modal>
      </div>
     );
   }
 }
 function mapStateToProps(state) {return {};}
 export default connect(mapStateToProps)(ProductClass);
