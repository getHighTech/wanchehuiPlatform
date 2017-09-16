import {NEW_MEMBER_APPLY} from "../actions/new_member_apply.js";

function NewMemberApply(state={applyName: "", applyEmail: "", applyMobile: "", applyIntro:""}, action){
  switch (action.type) {
    case NEW_MEMBER_APPLY:
      // 覆盖申请状态
      return Object.assign({}, state, {
        applyName: action.applyName,
        applyEmail: action.applyEmail,
        applyMobile: action.applyMobile,
        applyIntro: action.applyIntro
      });
    break;

    default:
      return state;
  }
}
export default NewMemberApply;
