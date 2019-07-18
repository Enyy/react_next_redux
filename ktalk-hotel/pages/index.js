import React, { Component } from 'react';
import Link from 'next/link'

class Login extends Component {

    constructor(props) {
        super(props)
        this.handlerIDChange = this.handlerIDChange.bind(this);
        this.handlerPwChange = this.handlerPwChange.bind(this);
        
        this.state = {
            id: '',
            password: '',
            checked: false
        }
    }

    onSubmit = (e) => {
        // const {id , password , checked} = this.state;
        // const authId = document.getElementById('auth_id').value;
        // const authPw = document.getElementById('auth_pw').value;

        // console.log("a", authId);
        // checked ? window.localStorage.setItem("saveId", authId) : window.localStorage.removeItem("saveId");

        // console.log("b", window.localStorage.getItem("saveId"));
        
        // if (checked) {
        //     authId = window.localStorage.getItem("saveId")
        // } else {
        //     authId = '';
        // }
        
        // console.log(authId);
        // if (authId) {
        //     auth_id.placeholder = '아이디 값 채워주세요.';
        //     // 유효성 체크 
        // } 
        // if (!authPw) {
        //     alert("비밀번호를 입력 해주세요.");
        // }
        // if (!authId && !authPw) {
        //     alert("아이디 또는 비밀번호를 잘못 입력하셨습니다. 다시 확인해주세요.")
        // }

        // 로그인 정보 전
        alert('Email address is ' + this.state.id + ' checked  is ' + this.state.checked);
    }

    handleChange = (e) => {
        const { checked } = e.target;

        console.log("1", checked);

        if (checked) {
            const checked = this.setState({ checked: true });
            window.localStorage.setItem("checked", checked)
        } else {
            const checked = this.setState({ checked: false });
            window.localStorage.removeItem("saveId");
            window.localStorage.setItem("checked", checked)
        }
    };

    handlerIDChange = e => {
        this.setState({
            id: e.target.value
        })
    }

    handlerPwChange = e => {
        this.setState({
            password: e.target.value
        })
    }

    render() {


        return (

            <form>
                <div> 로고 </div>

                <label className="sr-only"> id </label>
                <input type="text" onChange={this.handlerIDChange} id="auth_id" className="form-control" placeholder="id" />
                <label className="sr-only">Password</label>
                <input type="password" onChange={this.handlerPwChange} id="auth_pw" className="form-control" placeholder="password" />
                <label className="sr-only"> 아이디 저장 </label>
                <input className="input"
                    id="checkId"
                    type="checkbox"
                    onChange={this.handleChange}
                />
                <Link href="/main">
                    <button className="button" onClick={this.onSubmit}> 로그인 </button>
                </Link>

            </form>
        )
    }

}

export default Login