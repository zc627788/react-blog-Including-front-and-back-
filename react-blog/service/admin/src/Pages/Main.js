import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Index from './index'
import AdminIndex from './AdminIndex'

function Main() {
    return (
        <Router>
            <Route path="/" exact component={Index} />
            <Route path="/Article" component={AdminIndex} />
        </Router>
    )
}
export default Main
