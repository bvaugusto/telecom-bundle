import React from 'react'
import {Router, Route, Redirect, hashHistory} from 'react-router'

import Todo from '../package/package'

export default props => (
    <Router history={hashHistory}>
        <Route path="/list-all-broadband" component={Todo}/>
        <Redirect from="*" to="/list-all-broadband" />
    </Router>
)