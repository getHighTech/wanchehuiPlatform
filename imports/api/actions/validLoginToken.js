export function validLoginToken(stampedToken){
    let token = JSON.parse(stampedToken);
    let hashStampedToken = Accounts._hashStampedToken(token);
    let hashedToken = hashStampedToken.hashedToken;
    let validToken = Accounts._hashLoginToken(token.token);
    if(hashedToken===validToken){
      return true;
    }else{
      return false;
    }
}