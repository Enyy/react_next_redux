import React, { Component } from 'react'
import NaivBar from '../../component/common/LaviBar';
import Meta from '../../component/common/Meta'

class App extends Component {
    render() {
        return (
            <div>
                <Meta />
                <NaivBar />
                {this.props.children}
            </div>
        );
    }
}

export default App;