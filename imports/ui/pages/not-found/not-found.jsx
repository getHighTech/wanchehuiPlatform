import React from 'react';
import {Link} from 'react-router-dom'
const NoMatch = () => (
  <div id="not-found">
    <div className="not-found-image">
      <img src="/img/404.svg" alt="" />
    </div>
    <div className="not-found-title">
      <h1>不好意思，您请求的页面地址不存在</h1>
      <Link to="/" className="gotohomepage">Go to home</Link>
    </div>
  </div>
);

const NoMatchHeader = () => (
  <div id="not-found-heaader">
    <h3>页面被外星人带走啦</h3>
  </div>
);

export  {NoMatch, NoMatchHeader}
