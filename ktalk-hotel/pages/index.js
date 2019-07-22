import React, { Component } from 'react';
import Link from 'next/link'

class Login extends Component {

    state = {
            id: '',
            password: '',
            checked: '', 
            isLoggin : false
    }


    componentDidMount() {
        const checked = localStorage.getItem('checked') === 'true';
        const id = checked ? localStorage.getItem('saveId') : '';
        console.log('1', id)
        this.setState({ id , checked });

    }

    constructor(props) {
        super(props)
        this.handlerIDChange = this.handlerIDChange.bind(this);
        this.handlerPwChange = this.handlerPwChange.bind(this);


    }


    
    handleSubmit = (e) => {
        const { id , password}  =this.state ;

        const authId = document.getElementById('auth_id');
        const authPw = document.getElementById('auth_pw');

        if (authId & authPw) {
           //alert("a");
            this.setState({ 
                id: this.state.id,
                password: this.state.password,
                checked:  this.this.state.checked,
                isLoggin : true
            });

            console.log("checked Check" , this.state.checked);
        }
    }



    handleChange = (e) => {
        const { checked } = e.target;

        console.log("1", checked);

        if (checked) {
            this.setState({ checked: true });
            localStorage.setItem("checked", true);
        } else if (!checked) {
            console.log("13", checked);
            this.setState({ checked: false });
            localStorage.setItem("checked", false);
            localStorage.removeItem('saveId');
        }

    };

    handlerError = (e) => {
        
        console.log(" 빈칸 채워주세요");
        const authId = document.getElementById('authId').value;
        const authPw = document.getElementById('authPw').value;
        const textId = document.getElementById('textId')
        const defaults = document.getElementById('defaults')
        const textPw = document.getElementById('textPw')


        if (!authId) {
            textId.style.display = 'block';

            if (authId.value) {
                textId.style.display = 'none';
            }
        } 
        if (!authPw)  {
            console.log("authPW 빈칸이야." ,  this.state.password);
            textPw.style.display = 'block';

            if (authPw) {
                textPw.style.display = 'none';  
            }
        }

        if (!authId && !authPw ) {
            defaults.style.display = 'block';
            if (authId && authPw ) {
                defaults.style.display = 'none';
            }
        }

        this.setState({
            isLoggin : true
        })

    }

    handlerIDChange = e => {
        localStorage.setItem('saveId' , e.target.value )
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
        const  {isLoggin , checked , id }  = this.state;

        return (
            <form >
                <div> 로고 </div> <br></br><br></br>

                <label className="sr-only"> id   </label>
                <input type="text" 
                        onChange={this.handlerIDChange} 
                        id="authId"
                        className="form-control"
                        placeholder="id"
                        value ={this.state.id}
                        /><br></br>
                    <label id="textId" style={{display:'none'}} > 아이디를 입력해주세요. </label><br></br>

                <label className="sr-only">Password</label>
                <input type="password" onChange={this.handlerPwChange} id="authPw" className="form-control" placeholder="password" /><br></br>
                <label id="textPw" style={{display:'none'}}> 비밀번호를 입력해주세요. </label> <br></br>
                <label id="defaults" style={{display:'none'}}> 아이디 또는 비밀번호를 잘못 입력하셨습니다. 다시 확인해주세요. </label> <br></br>

                <input className="input"
                    id="checkId"
                    type="checkbox"
                    checked={checked}
                    onChange={this.handleChange}
                    
                />              
                <label className="sr-only" id="sr-only"> 아이디 저장 </label>
                <div > 
                    <Link href="/main">
                        <button className="button" onClick={this.handleSubmit} > 로그인 </button>
                    </Link>
                </div>
            </form>
        )
    }
}

export default Login