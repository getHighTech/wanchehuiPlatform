const RECEIVED_LIMIT_WITHDRAWS = "RECEIVED_LIMIT_WITHDRAWS"
const ADD_ONE_WITHDRAW = "ADD_ONE_WITHDRAWS";
const REQUEST_WITHDRAWS = "REQUEST_WITHDRAWS";
const FETCH_LIMIT_WITHDRAW = "FETCH_LIMIT_WITHDRAWS";

export function receivedLimitWithdraws(type, withDraws){
  return {
    type: RECEIVED_LIMIT_WITHDRAWS,
    withDraws,
  }
}

export function requestPosts(type, withdraws){
  return {
    type: REQUEST_WITHDRAWS,
    withdraws,
  }
}

export function fetchLimitWithdraws(type, condition, page, pageSize){
    return dispatch => {
      dispatch(requestPosts(subreddit))
      return fetch(`https://www.reddit.com/r/${subreddit}.json`)
        .then(response => response.json())
        .then(json => dispatch(receivePosts(subreddit, json)))
    }
    return {
      type: FETCH_LIMIT_WITHDRAWS,
      condition,
      page,
      pageSize,
    }
}

export function addOneWithDraw(type, withDraw){
  return {
    type: ADD_ONE_WITHDRAW,
    withDraw,
  }
}
