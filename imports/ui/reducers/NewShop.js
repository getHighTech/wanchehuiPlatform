//新店铺并没有所有的属性，但是此处初始状态要写明其完整数据结构
function NewShop(
  state={
    name: "",
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

  },
  action
){
  switch (action.type) {
    case NEW_SHOP_APPLY:
      // 覆盖申请状态
      return Object.assign({}, state, {
        applyName: action.applyName,
        applyEmail: action.applyEmail,
        applyMobile: action.applyMobile,
        applyIntro: action.applyIntro
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
