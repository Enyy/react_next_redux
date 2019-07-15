import React, { Component } from 'react';

class CallHistory extends Component {


    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div >
                <h3> 통화 이력 </h3>
            </div>
        )
    }
}

const mapStateToProps = status => {
    history : status.history
}

const mapDispatchToProps = dispatch => {
    loadHistories : () => dispatch(loadHistories())
}

export default CallHistory