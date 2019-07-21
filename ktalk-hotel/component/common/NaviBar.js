import React  from 'react';
import Link from 'next/link'

const TopBar = props => {
  
    const loggout = e => {
        const loggout = document.getElementById('dd');

        alert('loggout');
        if (window.localStorage.getItem('checked')) {
            console.log(window.localStorage.getItem('checked'))
        }
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
                <label > 내 아이디 명 </label>
                
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