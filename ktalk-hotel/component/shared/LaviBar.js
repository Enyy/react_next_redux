import React  from 'react';
import Link from 'next/link'

const LoggedOutView = props => {
    if (!props.currentUser) {
        return (
            <div className="nav-container">
                <div>
                    <Link href="/main">
                        <a> 로고 이미지 </a>
                    </Link>
                    <div>
                        <Link href="/guestRoomList">
                            <a > 부재중 아이콘 </a>
                        </Link>
                    </div>
                    <div>
                        <labla > 내 아이디 명 </labla>
                    </div>
                    <div>
                        <Link href="/">
                            <button type="button"> 로그아웃 </button>
                        </Link>
                    </div>


                </div>


                <div>
                    <Link href="/CallHistory">
                        <button> 통화 내역 </button>
                    </Link>
                </div>

                <div>
                    <Link href="/guestRoomList">
                        <button> 객실 </button>
                    </Link>
                </div>
            </div>
        )
    }
    return null;
}



class NaivBar extends React.Component {
    render() {
        return (
            <nav >
                <div> 

                    <LoggedOutView currentUser={this.props.currentUser} />
                </div>
            </nav>
        );
    }
}



export default NaivBar