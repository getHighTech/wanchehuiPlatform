import { takeEvery } from 'redux-saga'
import { put, call } from 'redux-saga/effects'
import {GET_ONE_PAGE_INCOMES, GET_ONE_USER} from '../actions/current_deal_user.js';
// 一个工具函数：返回一个 Promise，这个 Promise 将在 1 秒后 resolve
export const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
export function demo(goods){
  console.log(goods);
  return goods
}
export function* getOnePageIncomes(action){
  try {
    console.log("test saga");
   } catch (e) {
      yield put({type: GET_ONE_USER, userId: e.message});
   }
}

function* mySaga() {
  yield takeEvery(GET_ONE_PAGE_INCOMES, getOnePageIncomes);
}

export default mySaga;
