import React, { Component } from 'react';
import Link from 'next/link'

class Login extends Component {

    
    state = {
        id: '',
        password: '',
        checked: ''
    }


    handleSubmit = (e) => {

        const authId = document.getElementById('auth_id');
        const authPw = document.getElementById('auth_pw');

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
        if(window.localStorage.getItem("checked")) {
            authId.defaultValue = window.localStorage.getItem("saveId")
            console.log("authId.defaultValue " , authId.value);
        }

        if (!authId.value) {
            textId.style.display = 'block';

            if (authId.defaultValue) {
                textId.style.display = 'none';
            }
        } 
        if (!authPw.value) {
            console.log("authPW 빈칸이야." ,  authPw);
            textPw.style.display = 'block';

            if (authPw.value) {
                textPw.style.display = 'none';
            }
        }

        if (!authId.value && !authPw.value) {
            defaults.style.display = 'block';
            if (authId.value && authPw.value) {
                defaults.style.display = 'none';
            }
        }

        if (authId.value && authPw.value) {
           //alert("a");
            console.log(this.state.isLoggin);

            setState({ 
                id: this.state.id,
                password: authPw,
                checked:  window.localStorage.getItem("checked")
            });

            console.log("checked Check" , this.state.checked);
        
        }
        
    }

    handleChange = (e) => {
        const { checked } = e.target;

        console.log("1", checked);

        this.setState({ checked: true });

        if (checked) {
            window.localStorage.setItem("checked", true);
            console.log("12", checked);
        } else if (!checked) {
            console.log("13", checked);
            this.setState({ checked: false });
            window.localStorage.setItem("checked", false)
        }

    };

    handlerIDChange = e => {
        this.setState({
            id: e.target.value
        });
    }

    handlerPwChange = e => {
        this.setState({
            password: e.target.value
        });
    }

    render() {

        const  {isLoggin , checked }  = this.state
        console.log("checked ::: " , checked)

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
                <label id="textPw" style={{display:'none'}}> 비밀번호를 입력해주세요. </label> <br></br>
                <label id="defaults" style={{display:'none'}}> 아이디 또는 비밀번호를 잘못 입력하셨습니다. 다시 확인해주세요. </label> <br></br>

                <input className="input"
                    id="checkId"
                    type="checkbox"
                    checked={this.state.checked}
                    onChange={this.handleChange}
                    
                />                 <label className="sr-only" id="sr-only"> 아이디 저장 </label>
                <div> 
                    {
                        isLoggin === true ? (
                                <Link href="/">
                                    <button className="button" onClick={this.handleSubmit}> sss로그인 </button>
                            </Link>
                        ) : (
                            <Link href="/main">
                                    <button className="button"> 로그인 </button>
                            </Link>

                        )
                    }
                
                </div>
            </form>
        )
    }

}

export default Login