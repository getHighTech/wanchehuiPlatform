import { canBeAccessed } from './accesses';
function createSelfAdmin(){

}

export function createSelfShop(selfShopAdmin)
{

  if (!selfShopAdmin) {
    createSelfAdmin();
  }
  if (selfShopAdmin.roles === undefined ) {
    return "access deny";
  }
  if (!canBeAccessed(selfShopAdmin.roles)) {
    return "access deny";
  }


}
