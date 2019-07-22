import React  from 'react';
import Link from 'next/link'

const TopBar = props => {
  
    const loggout = e => {
        const auth_id = document.getElementById('auth_id') 

        alert('loggout');
        if (localStorage.getItem('checked')) {

            localStorage.getItem('saveId')
            console.log( localStorage.getItem("saveId"));
            console.log(localStorage.getItem('checked'))
        } 
        
    }
    
    const memberStatus = e => {
        console.log(props)

    }

    return (
        <div>
        <Link href="/main">
            <a> 로고 이미지 </a>
        </Link>
        <div>
            <Link href="/absensce">
                <a > 부재중 아이콘 </a>
            </Link>
        </div>
        <div>
                <label> 내 아이디 명 </label>
                
        </div>
        <div>
            <Link href="/">
                    <button id ="dd" type="button" onClick={loggout}> 로그아웃 </button>
            </Link>
        </div>
        </div>
    )

}

const LoggedOutView = props => {
        return (
            <div className="nav-container">
                <div>
                    <Link href="/history">
                        <button> 통화 내역 </button>
                    </Link>
                </div>

                <div>
                    <Link href="/gusetRoom">
                        <button> 객실 </button>
                    </Link>
                </div>
            </div>
        )
}



class NaviBar extends React.Component {


    render() {
        return (
                <div> 
                    <TopBar /> 
                    
                    <LoggedOutView />
                
                </div>
        );
    }
}



export default NaviBar