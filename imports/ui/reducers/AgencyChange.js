import {AGENCY_REFRESH, REFRESH_CLEAR} from '../actions/agency_change.js';

function AgencyChange(state={
  loading: false,
  tips: "未启动",
  agencyId: ""
}, action){
  switch (action.type) {
  case AGENCY_REFRESH:
    return Object.assign({}, state, {
      loading: true,
      tips: "正在更改代理链",
      agencyId: action.agencyId,
    });
  case REFRESH_CLEAR:
    return Object.assign({}, state, {
      loading: false,
      tips: "更改成功",
      agencyId: "",
    })
  default:
    return state;

  }
}

export default AgencyChange;
