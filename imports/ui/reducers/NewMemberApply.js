import {NEW_MEMBER_APPLY} from "../actions/new_member_apply.js";

function NewMemberApply(state={applyName: "", applyEmail: "", applyMobile: "", applyIntro:""}, action){
  switch (action.type) {
    case NEW_MEMBER_APPLY:
      console.log("begin change");
      return state;
    break;

    default:
      return state;
  }
}
export default NewMemberApply;
