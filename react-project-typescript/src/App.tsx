import React, { FC } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/login/index';
import Home from './pages/home/index';

/**
 * 定义一个函数组件
 * React.FC表示App的类型是函数组件
 * @constructor
 */
const App: FC = () => {
    return (
        <div className="main">
            <HashRouter>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/" component={Home} />
                </Switch>
            </HashRouter>
        </div>
    );
};

export default App;
