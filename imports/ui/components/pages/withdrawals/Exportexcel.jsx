
//此组件用于测试
import React from 'react';
import XLSX from 'xlsx';
import Button from 'antd/lib/button/';
import 'antd/lib/button/style';
import Icon from 'antd/lib/icon/';
import 'antd/lib/icon/style';
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';


class Exportexcel extends React.Component {
  constructor(props) {
    super(props);
  }
  onExport(){
    let self =this;
    let head=[ "提现记录id","用户","银行卡号","开户行","金额","姓名","时间","状态" ];
    var newData=[];
    newData.push(head);
    var OneData=[];
    let dataSource = self.props.getData;
    for(let i= 0;i<dataSource.length;i++){
      OneData.push(dataSource[i]._id);
      OneData.push(dataSource[i].name);
      OneData.push(dataSource[i].bankId);
      OneData.push(dataSource[i].address);
      OneData.push(dataSource[i].money);
      OneData.push(dataSource[i].userId);
      OneData.push(dataSource[i].createdAt);
      OneData.push(dataSource[i].status);
      newData.push(OneData);
      OneData=[];
    }

    const title={
      cols: [{ name: "A", key: 0 }, { name: "B", key: 1 }, { name: "C", key: 2 },{name:"D",key:3}],
      data: newData
    }
    const ws = XLSX.utils.aoa_to_sheet(title.data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    const wbout = XLSX.write(wb, {type:"array", bookType:"xlsx"});
    saveAs(new Blob([wbout],{type:"application/octet-stream"}), "当页数据.xlsx");

  }




  render(){
    return (
        <div>
              <Button type="primary" icon="download" onClick={ () => this.onExport()}>导出本页数据</Button>
        </div>
    )
  }
}




function mapStateToProps(state) {
  return {
   };
}
export default connect(mapStateToProps)(Exportexcel);
