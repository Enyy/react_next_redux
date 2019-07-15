import React, { Component } from 'react';
import CallHistory  from '../component/callHistory'

class CallingHistory extends Component {
    

    render() {
        return <CallHistory> </CallHistory>

    }
}

const mapStateToProps = status => {
    history : status.history
}

const mapDispatchToProps = dispatch => {
    loadHistories : () => dispatch(loadHistories())
}

export default CallingHistory