<<<<<<< HEAD
import {AGENCY_REFRESH, REFRESH_CLEAR} from '../actions/agency_change.js';
=======
funtion AgencyChange(state={
  loading: true,
  tips: "未启动",
  agencyId: '', superAgencyId: '',
  giveReason: {
    type: "agencyCard",
    agencyId: "",
>>>>>>> c6cfef7ba8864e3ba655fad19c28aa0596d30f89

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
