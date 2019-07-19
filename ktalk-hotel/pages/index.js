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
            checked: false, 
            isLoggin : false
        }
    }

    
    styleChange = (e) => {
        display : 'block'
    }

    handleSubmit = (e) => {

        const authId = document.getElementById('auth_id').value;
        const authPw = document.getElementById('auth_pw').value;

        const textId = document.getElementById('textId')
        const defaults = document.getElementById('defaults')
        const textPw = document.getElementById('textPw')

        console.log("a", authId);
        checkId ? window.localStorage.setItem("saveId", authId) : window.localStorage.removeItem("saveId");


        console.log(checkId);
        console.log("b", window.localStorage.getItem("saveId"));
        // 아이디는 있는데, 비밀번호는 없는 경우, 비밀번호 채워줘 
        // 아이디는 없고, 비밀번호가 있는 경우, 아이디를 채워줘 
        // 두개의 값이 모두 비워져있으면, 아이디 또는 비밀번호를 잘못 입력하셨습니다. 다시 확인해주세요. 알림창 뜸. 
        // 내용이 채워
        if (!checkId) {
            authId = window.localStorage.getItem("saveId")
            
        } 
        if (!authId) {
            // textId.style.display = 'block';
            // textId.innerText = '아이디 값 채워주세요.';
            // styleChange()
            // 유효성 체크 
        } 
        if (!authPw) {
            // textPw.style.display = 'block';
            // textPw.innerText = '비밀번호 값 채워주세요.';
        }
        if (!authId && !authPw) {
            defaults.style.display = 'block';
            // 스타일 css 적용되나?
            // defaults.innerText 
        }

        if (authId && authPw) {
            alert("a");
            console.log(this.state.isLoggin);
            this.setState({
                id:window.localStorage.getItem("saveId"),
                password: authPw,
                checked: this.state.checked, 
                isLoggin : true
            })
            console.log(this)
        }

        console.log("isLoggin Checkt" , this.state.isLoggin);


        
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
        console.log("isLogin ::: " , this.state.isLoggin)
        return (
            <form >
                <div> 로고 </div> <br></br><br></br>

                <label className="sr-only"> id   </label>
                <input type="text" 
                        onChange={this.handlerIDChange} 
                        id="auth_id"
                        className="form-control"
                        placeholder="id"
                        required /><br></br>
                    <label id="textId" style={{display:'none'}} > 아이디를 입력해주세요. </label><br></br>

                <label className="sr-only">Password      </label>
                <input type="password" onChange={this.handlerPwChange} id="auth_pw" className="form-control" placeholder="password" /><br></br>
                <label id="textId" style={{display:'none'}}> 비밀번호를 입력해주세요. </label> <br></br>
                <label id="defaults" style={{display:'none'}}> 아이디 또는 비밀번호를 잘못 입력하셨습니다. 다시 확인해주세요. </label> <br></br>

                <input className="input"
                    id="checkId"
                    type="checkbox"
                    onChange={this.handleChange}
                    
                />                 <label className="sr-only" id="sr-only"> 아이디 저장 </label>
                <div> 
                    {
                        this.state.isLoggin ? (
                                <Link href="/main">
                                    <button className="button" onClick={this.handleSubmit}> 로그인 </button>
                            </Link>
                        ) : (
                            <Link href="/">
                                    <button className="button" onClick={this.handleSubmit}> 로그인 </button>
                            </Link>

                        )
                    }
                
                </div>
            </form>
        )
    }

}

export default Login