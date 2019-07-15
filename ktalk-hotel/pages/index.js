import React, { Component } from 'react';
import Link from 'next/link'

class Login extends Component {
    state = {
        id : '',
        password : '', 
        isLoginChek : false
    }

    
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <form>
                <div> 로고 </div>

                <input
                    name="id"
                    type="text"
                    placeholder="id" /> <br></br>
                <input
                    name="password"
                    type="password"
                    placeholder="password" />
                <br></br>
                <input className="input"
                    name="isLoginChek"
                    type="checkbox" /> 
                <label> 아이디 저장 </label>
                <br></br>
                <Link href="/main">
                    <button className="button"> 로그인 </button>
                </Link>
            </form>


        )
    }

}

export default Login