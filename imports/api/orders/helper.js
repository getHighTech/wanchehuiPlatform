export  function generateRondom(n) {
     let str = "";
     let num ;
     for(var i = 0; i < n ; i ++) {
         num  = Math.ceil(Math.random()*10);
         str += num ;
     }
    return str;
}