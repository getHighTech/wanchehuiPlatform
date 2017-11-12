funtion AgencyChange(state={
  loading: true,
  tips: "未启动",
  agencyId: '', superAgencyId: '',
  giveReason: {
    type: "agencyCard",
    agencyId: "",

  },
  loseReason: {
    type: "refund",
    userId: '',
    recyclerId: '',
  }
}, action){
  switch (action.type) {
  case USERFINDER_SELECT_USER:
    return Object.assign({},state, {
      loading: false,
      tips: "准备更新分销链",
      agencyId: action.extraData._id,
      superAgencyId: action.extraData.superAgencyId,
      giveReason: {
        type: "agencyCard",
        agencyId: action.extraData._id,
      },
      loseReason: {
        type: 'refund',
        userId: action.userId,
        recyclerId: action.extraData.userId,
      }
    });
  case CHECK_USER_HAS_AGENCY:
    return Object.assign({}, state, {
      loading: true,
      tips: "检查用户代理权"
    })
  case UPDATE_USER_AGENCY_NEEDED:
    //若是用户没有代理权则要给他新建代理权，并给他建立钱包
    return Object.assign({}, state, {
      loading: false,
      tips: "用户没有代理权，正在给予用户代理权限，并给他新建钱包"
    });
  case UPDATE_USER_AGENCY_NOT_NEEDED:
    return Object.assign({}, state, {
      loading: false,
      tips: "用户已有代理"
    });
  case GET_NEW_SUPERAGENCY:
    return Object.assign({}, state, {
      loading: false,
      tips: "用户已有代理",
      superAgencyId: action.superAgencyId,
    });
  default:
    return state;

  }
}
