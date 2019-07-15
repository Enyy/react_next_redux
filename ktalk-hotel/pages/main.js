import React, { Component } from 'react'
import NaivBar from '../component/common/LaviBar';
import CallHistory from '../component/callHistory';

class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        // const { } 로그인중인지 아닌지 체크 
        return (
            <header> 
                <NaivBar>
                </NaivBar>
                <CallHistory>
                    

                </CallHistory>
            </header>

        )
    }
}

export default App
