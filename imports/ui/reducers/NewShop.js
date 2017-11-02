//新店铺并没有所有的属性，但是此处初始状态要写明其完整数据结构
function NewShop(
  state={
    name: "",
    cover: "",
    address: {
      text: "",
      lng: 0,
      lat: 0,
    },
    mobile: "",
    description:"",
    comments: [],
    accessesNumber: 0,
    collectionsNumber: 0,
    blogs: [],
    openTimeFrom: "",
    openTimeTo: "",
    tags: [],
    coupons: [],
    products: [],
    applyStatus: "applied"

  },
  action
){
  switch (action.type) {
    case NEW_SHOP_APPLY:
      // 覆盖申请状态
      return Object.assign({}, state, {
        name: action.name,
        address: action.address,
        mobile: action.mobile,
        description: action.description,
        cover: action.cover,
        tags: action.tags,
      });
    case CREATE_MEMBER_APPLY:
      // 覆盖申请状态
      return Object.assign({}, state, {
        applyName: '',
        applyEmail: '',
        applyMobile: '',
        applyIntro: ''
      });

    default:
      return state;
  }
}
export default NewShop;
