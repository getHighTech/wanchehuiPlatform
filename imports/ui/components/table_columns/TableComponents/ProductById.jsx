import React from "react";

import {getProductById} from '/imports/ui/services/products.js'

class ProductById extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      type: '',
      product: {

      },
      loaded: true,
    }
  }

  componentDidMount(){
    let self  = this;
    if (this.props.productId) {
      return getProductById(this.props.productId, (err,rlt)=>{
        if (!err) {
          if (rlt === undefined) {
            self.setState({
              type: "card",
              product: "error",
              loaded: true,
            });
            return 1;
          }
          if (rlt != "NOT FOUND") {
            if (rlt.type === 'card') {
              self.setState({
                type: "card",
                product: rlt.card,
                loaded: false,
              });
            }else{
              self.setState({
                type: "normal",
                product: rlt,
                loaded: false,
              });
            }
          }else{
            self.setState({
              type: "normal",
              product: "NOT FOUND",
              loaded: true,
            });
          }
          }else{
            self.setState({
              type: "normal",
              product: "网络错误",
              loaded: false,
            });
            console.error(err);
          }

      });
    }else{
      console.log("shall be await")
    }
  }

  componentWillUnmount(){
    this.setState({
      loaded: true,
    });
  }
  render(){
    if (this.state.loaded && !this.state.product.name) {
      return (<div>商品信息加载中</div>);
    }else{
      return (
        <div>{this.state.product.name}<br/>&nbsp; </div>
      )
    }

  }
}

export default ProductById;
