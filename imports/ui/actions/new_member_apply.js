export const NEW_MEMBER_APPLY = "NEW_MEMBER_APPLY";

export function newMemberApply(applyName, applyEmail, applyMobile, applyIntro){
  return {
    type: NEW_MEMBER_APPLY,
    applyName, applyEmail, applyMobile, applyIntro
  }
}
