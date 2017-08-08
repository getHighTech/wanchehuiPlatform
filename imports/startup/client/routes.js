// @author:SimonXu
// ＠email: xsqfeather@gmail.com
//　此文件详细写了布局和路由，是整个应用的页面映射

import React from 'react';
import {
  BrowserRouter as Router,
  Link,
} from 'react-router-dom'
import { Switch, Route } from 'react-router'

import Layout from 'antd/lib/layout';
const { Header, Content, Footer, Sider } = Layout;
import Menu from 'antd/lib/menu';
import MenuItem from 'antd/lib/menu/MenuItem';
import Icon from 'antd/lib/icon/';
import Spin from 'antd/lib/spin/';
import 'antd/lib/layout/style';
import 'antd/lib/menu/style';
import 'antd/lib/spin/style';
import 'antd/lib/icon/style';
import createBrowserHistory from 'history/createBrowserHistory';

import Home from '/imports/ui/pages/home/home.jsx';
import HomeHeader from '/imports/ui/pages/home/HomeHeader.js';

import Blockchain from '/imports/ui/pages/blockchain/Blockchain.jsx';
import BlockchainHeader from '/imports/ui/pages/blockchain/BlockchainHeader.jsx';

import Cars from '/imports/ui/pages/cars/Cars.jsx';
import CarsHeader from '/imports/ui/pages/cars/CarsHeader.js';

import {NoMatch, NoMatchHeader} from '/imports/ui/pages/not-found/not-found.jsx';

const customHistory = createBrowserHistory()



const AppRoutes = ({location}) => {
  // console.log(customHistory.location);
  return (
    <Router history={customHistory}>
      <Route path='/' children={({ match }) =>{
        return  (

            <Switch>

              <Route  path="/login" component={Login}/>
              <Route  path={`${match.url}`} component={AppLayout}/>
            </Switch>
          )
      }} />

    </Router>

  )
};


class AppLayout extends React.Component {

  constructor(props) {
    super(props);

    self.state = {
      hideCompleted: false,
      sideMenuActive: "/",
      contentLoaded: false,
    };
  }
  subscribeByPathname(pathname){
    //根据路由订阅每一页的数据
    let self = this;
    switch (pathname) {
      case '/about':
        Meteor.subscribe('links.all', {
          onReady: function(){
            self.setState({
              contentLoaded: true
            });
          }
        });
        break;
      case '/blockchian':
        self.setState({
          contentLoaded: false
        })
        break;
      case '/':
        self.setState({
          contentLoaded: true
        })
        break;
      default:
        self.setState({
          contentLoaded: true
        })
        break;

    }
  }
  componentWillMount(){
    this.setState({
      currentPathName: this.props.location.pathname,
      contentLoaded: false
    });
    this.subscribeByPathname(this.props.location.pathname);

  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      contentLoaded: false,
      currentPathName: nextProps.location.pathname
    });
    this.subscribeByPathname(nextProps.location.pathname);
   }
   componentWillUpdate(){
     console.log(this.props.location);

   }
   componentDidUpdate(){
    console.log(this.state);
   }

   changeLoad(){
     this.setState({
       contentLoaded: true,
     });
   }

  render() {
    //主要页面在此引入
    const content = (
      <div style={{ padding: 5, minHeight: 360 }}>
        <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/cars" component={Cars}/>
        <Route path="/blockchain" component={Blockchain}/>
        <Route  component={NoMatch}/>
        </Switch>
      </div>
    );
    let loadContent = (state) => {
      if (state) {
        return content;
      }else{
        return (
          <div style={{ padding: 5, background: '#fff', minHeight: 360, textAlign: "center" }}>

            <div>
              <Spin size="small" />
              <Spin />
              <Spin size="large" />
            </div>
            <h3>数据加载中，请稍后</h3>
          </div>

        );
      }
    }
    return (
      <Layout style={{height: '100%'}}>


        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onCollapse={(collapsed, type) => { console.log(collapsed, type); }}

        >
          <div className="logo" >
            <img src="/img/wcars.png" style={{width: "70%"}}/>
          </div>
          <br/><br/><br/>

          <Menu theme="dark" mode="inline" defaultSelectedKeys={[this.state.currentPathName]}>
            <Menu.Item key="/">
              <Link to="/">
                <Icon type="car" />
                <span className="nav-text">仪表盘</span>
              </Link>

            </Menu.Item>
            <Menu.Item key="1">
              <Link to="/cars">
                <Icon type="car" />
                <span className="nav-text">车辆管理</span>
              </Link>

            </Menu.Item>
            <Menu.Item key="/products">
              <Link to="/cars">
                <Icon type="car" />
                <span className="nav-text">商品管理</span>
              </Link>

            </Menu.Item>
            <Menu.Item key="/block">
              <Link to="/blockchain">
                <Icon type="block" />
                <span className="nav-text">区块链</span>
              </Link>

            </Menu.Item>

            <Menu.Item key="/paycodes">
              <Link to="/cars">
                <Icon type="car" />
                <span className="nav-text">支付🐎管理</span>
              </Link>

            </Menu.Item>
            <Menu.Item key="/withdraw">
              <Link to="/cars">
                <Icon type="car" />
                <span className="nav-text">提现管理</span>
              </Link>

            </Menu.Item>

            <Menu.Item key="/orders">
              <Link to="/cars">
                <Icon type="car" />
                <span className="nav-text">订单管理</span>
              </Link>

            </Menu.Item>
            <Menu.Item key="/owners">
              <Link to="/owners">
                <Icon type="car" />
                <span className="nav-text">店家管理</span>
              </Link>

            </Menu.Item>
            <Menu.Item key="/about">
              <Link to="/about">
                <Icon type="file-text" />
                <span className="nav-text">合同管理</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/pictures">
              <Link to="/pictures">
                <Icon type="file-text" />
                <span className="nav-text">图片管理</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="user" />
              <span className="nav-text">用户管理</span>
            </Menu.Item>
            <Menu.Item key="4">
              <Icon type="user" />
              <span className="nav-text">角色管理</span>
            </Menu.Item>
            <Menu.Item key="/rules">
              <Link to="/cars">
                <Icon type="car" />
                <span className="nav-text">规则管理</span>
              </Link>

            </Menu.Item>
            <Menu.Item key="5">
              <Icon type="tag" />
              <span className="nav-text">关于</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', position: 'fixed', width: '100%', zIndex: 100 }} >
            <Switch>
            <Route exact path="/" component={HomeHeader}/>
            <Route exact path="/cars" component={CarsHeader}/>
            <Route path="/about" component={About}/>
            <Route path="/blockchain" component={BlockchainHeader}/>
            <Route  component={NoMatchHeader}/>
            </Switch>
          </Header>
          <Content style={{ padding: '0 50px', marginTop: 80 }}>
            {loadContent(this.state.contentLoaded)}
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            SimonXu ©2017 Created For His Gal
          </Footer>
        </Layout>
    </Layout>
    );
  }
}






const Login = () => (
  <div>
    <h2>Login</h2>
  </div>
)




const About = () => (
  <div>
    <h2>About</h2>
  </div>
)



export default AppRoutes
