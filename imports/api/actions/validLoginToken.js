export function validLoginToken(stampedToken){
    let hashStampedToken = Accounts._hashStampedToken(stampedToken);
    let hashedToken = hashStampedToken.hashedToken;
    let validToken = Accounts._hashLoginToken(stampedToken.token);
    if(hashedToken===validToken){
      return true;
    }else{
      return false;
    }
}