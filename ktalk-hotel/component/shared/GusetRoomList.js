import React, { Fragment } from 'react'
const RoomList = ({ items }) => {

    // arr: arr.filter((item, i) => i !== index)

    return (
        <Fragment>
            <div>
                {
                    items.map(item => (
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
                        <div key={item.roomNumber}> {item.floor}
                        <div> {item.roomNumber}</div>
                            <div> <button target={item.roomNumber}> 통화 </button> </div>
                    </div>
                    
                ))}
            </div>
        </Fragment>
    )
}

export default RoomList

