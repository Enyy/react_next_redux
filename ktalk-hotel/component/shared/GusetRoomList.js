import React, { Fragment } from 'react'
const RoomList = ({ items }) => {
    return (
        <Fragment>
            <div>
                {
                    items.map(item => (
                    
                        <div key={item.roomNumber}> {item.floor}
                        <div> {item.roomNumber}</div>
                        <div> <button> 통화 </button> </div>
                    </div>
                    
                ))}
            </div>
        </Fragment>
    )
}

export default RoomList

