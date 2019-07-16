import React from 'react'

const Memo = ({ memo, displayMemo }) => {
    return (
        <div className="popupBox">
            <div className="popupBoxInner">
                <h1 className="popupTitle">{memo}</h1>
                <button onClick={displayMemo}> 저장</button>
                <button onClick={displayMemo}> 닫기</button>
            </div>
        </div>
    )
}

export default Memo
