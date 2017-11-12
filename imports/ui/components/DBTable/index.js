import React from 'react';
import {message, notification, Spin} from 'antd';
import globalConfig from '../../config.js';
import InnerPagination from './InnerPagination.js';
import InnerTable from './InnerTable.js';


class DBTable extends React.PureComponent {
    state = {
    // 本身的状态
    loadingSchema: false,  // 是否正在从远程加载schema

    // 表单组件的状态
    queryObj: {},  // 表单中的查询条件

    // 表格组件的状态
    data: [],  // 表格中显示的数据
    tableLoading: false,  // 表格是否是loading状态

    // 分页器的状态
    currentPage: 1,  // 当前第几页, 注意页码是从1开始的, 以前总是纠结页码从0还是1开始, 这里统一下, 跟显示给用户的一致
    pageSize: globalConfig.DBTable.pageSize || 50,  // pageSize默认值50, 这个值一旦初始化就是不可变的
    showSizeChanger: globalConfig.DBTable.showSizeChanger, // 是否显示修改每页显示数量的选项
    pageSizeOptions: globalConfig.DBTable.pageSizeOptions, // 每页面显示数量选项
    total: 0,  // 总共有多少条数据
  };

  componentWillMount() {
    // 处理url参数
    this.processQueryParams();
    // 组件初始化时尝试获取schema
    this.tryFetchSchema(this.props, (res) => {
      this.updateTableState(res);
      // 这个参数用于判断获取schema是同步还是异步
      if (this.state.loadingSchema) {
        this.setState({loadingSchema: false}, this.refresh);
      }
    });
  }

  componentDidMount() {
    // 如果是异步获取schema的话, 后面有callback会调用refresh的, 这里就不用调了
    if (!this.state.loadingSchema) {
      this.refresh();
    }
  }
  componentWillReceiveProps(nextProps) {
    // 普通模式下, 所有的CRUD操作都是通过同一个DBTable组件进行的, 只是传入的tableName不同而已
    // 但是在tab模式下, 为了防止不同tab之间的干扰, 每个tab下都必须是一个"独立"的组件, 换句话说有很多不同DBTable组件的实例
    // 类似单例和多实例的区别
    if (globalConfig.tabMode.enable === true) {
      logger.debug('ignore props update under tabMode');
      return;
    }

    // FIXME: hack, 和App组件中componentWillReceiveProps方法类似
    const action = this.props.location.action;
    if (action === 'PUSH') {
      return;
    }

    logger.debug('receive new props and try to render, nextProps = %o', nextProps);
    // 应该只有react router会触发这个方法
    if (nextProps.routes) {
      // 如果表名不变的话, 没必要重新加载schema/refresh, 直接return
      const routes = nextProps.routes;
      const nextTableName = routes[routes.length - 1].tableName;
      if (nextTableName === this.tableName) {
        return;
      }
    }

    // 在表名切换后要做什么?
    // 1. 根据新的表名重新获取schema
    // 2. 还原初始状态
    // 3. 调用一次refresh(), 重新查询数据

    // 和组件挂载时类似, 同样注意区分同步/异步
    this.tryFetchSchema(nextProps, (res) => {
      this.updateTableState(res);
      // 处理url参数
      this.state.queryObj = {};
      this.processQueryParams();
      this.setState({
        data: [],
        tableLoading: false,
        currentPage: 1,
        total: 0,
        loadingSchema: false,
      }, this.refresh);
    });
  }

  render (){
    return (
      <Spin spinning={this.state.loadingSchema} delay={500}>
        <InnerPagination currentPage={this.state.currentPage} total={this.state.total} pageSize={this.state.pageSize}
                         parentHandlePageChange={this.handlePageChange} tableConfig={this.tableConfig}
                         showSizeChanger={this.state.showSizeChanger} pageSizeOptions={this.state.pageSizeOptions}
                         parentHandleShowPageChange={this.handleShowPageChange}
                         tableName={this.tableName}/>
      </Spin>
    );
  }

}

export default DBTable;