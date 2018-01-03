function createTag
(
  name,
  createdByUserId,
)
{

}

function createProductTag
(

)
{

}
function newProductRole(
  pruductId,
  roleName,
)
{

}
function generateNewToolRole(product){
  if (!product.isTool) {
    return "IT IS NOT TOOL";
  }
  return Roles.insert({
    name: product.roleName+"_holder",
  })
}

export function newProuct
(
  acl, //eg: {roles: [loginUser,cardHolder,wineHolder], users: []}
  isSale,
  name,
  isTool,//是否是工具类商品
  roleName,//当且仅仅当isTool为true的时候设置,会生成roleName+Holder的角色, roleName需要判重, //"shopName.owner""shopName.custService"
  price,
  description,
  brief,
  images,
  cover,
  shopId,
  createdByUserId,
  properties,
  specifications,//eg:[{"red": 100000, "red & heavy": 1500000}]
  categoryId,
  endPrice, //最终价格
  curency, //cny
  tagIds, //[]
  agencyLevelCount,//eg: 2
  agencyLevelPrices,//eg: [38.8, 12.8]
)
{

}
