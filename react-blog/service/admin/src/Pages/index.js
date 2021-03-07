
import React, { useState, useEffect } from 'react';
import Login from './Login'
import Register from './Register'
import './style.css'
import imgURL from '../static/images/sunset.jpg';
function Index(props) {

    const [isLogin, SetIsLogin] = useState('login')

    useEffect(() => {


    }, [])

    const toggleShow = () => {
        SetIsLogin(isLogin === 'login' ? 'register' : 'login')

    }

    return (
        <div style={{ ...styles.backgroundBox, backgroundImage: `url(${imgURL})` }}>
            <div className="login-container">
                <div className={`box ${isLogin === 'login' ? 'active' : ''}`}>
                    <Login toggleShow={toggleShow} history={props.history} />
                </div>
                <div className={`box ${isLogin === 'register' ? 'active' : ''}`}>
                    <Register toggleShow={toggleShow} history={props.history} />
                </div>
            </div>
        </div>
    )
}
const styles = {
    backgroundBox: {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        backgroundSize: '100% 100%',
    },
}

export default Index