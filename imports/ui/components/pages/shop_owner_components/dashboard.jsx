'use strict';

import React from "react";
import { Card } from 'antd';
import { Row, Col } from 'antd';

import { connect } from 'react-redux';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';

class ShopDashBoard extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
        }
    }

    componentDidMount() {
        console.log(Meteor.userId());
    }





    render() {
        // 数据源
        const data = [
        { genre: 'Sports', sold: 275, income: 2300 },
        { genre: 'Strategy', sold: 115, income: 667 },
        { genre: 'Action', sold: 120, income: 982 },
        { genre: 'Shooter', sold: 350, income: 5271 },
        { genre: 'Other', sold: 150, income: 3710 }
        ];

        // 定义度量
        const cols = {
        sold: { alias: '销售量' },
        genre: { alias: '游戏种类' }
        };
    return (
        <div>
            {/* <Chart width={600} height={600} data={data} scale={cols}>
                <Axis name="genre" />
                <Axis name="sold" />
                <Legend position="top" dy={-20} />
                <Tooltip />
                <Geom type="interval" position="genre*sold" color="genre" />
            </Chart> */}
            <Row>
                <Col span={8}>
                    <Card title="总销售" >
                        <p>截止到当前时间：2018-8-28</p>
                        <p>总金额：5851138元</p>  
                        <p>总订单量：78192</p>   
                    </Card>
                </Col>
                <Col span={8}>
                <Card  title="近三个月">
                        <p>截止到当前时间：2018-8-28</p>
                        <p>总金额：4871154元</p>  
                        <p>订单量：57814</p>    
                </Card>
                </Col>
                <Col span={8}>
                <Card  title="近一个月">
                        <p>截止到当前时间：2018-8-28</p>
                        <p>总金额：1221354元</p>  
                        <p>订单量：17329</p>    
                </Card>
                </Col>
            </Row>
            <Row>
            <Col span={8}>
                <Card  title="近一星期">
                        <p>截止到当前时间：2018-8-28</p>
                        <p>总金额：301008元</p>  
                        <p>订单量：5786</p>    
                </Card>
                </Col>
            </Row>
        </div>
        )
    }
}
function mapStateToProps(state) {
    return {

    };
}

export default connect(mapStateToProps)(ShopDashBoard);
