import React, { Fragment } from 'react'



const RoomList = ({ items }) => {
    let roomInfo = {};
    items.map(item => {
        roomInfo[item.floor] ? "" : roomInfo[item.floor] = [];
        roomInfo[item.floor].push(item);
    })
    const roomInfoKeys = Object.keys(roomInfo);
    console.log(roomInfo);
    return (
        <Fragment>
            <div>
                {
                    roomInfoKeys.map((roomInfoKey, key) => {
                        return (<div key={key}><h4>{roomInfoKey}</h4>
                            {
                                roomInfo[roomInfoKey].map((item, key) => {
                                    return <div key={key}>
                                        <p>{item.roomNumber}</p>
                                        { 
                                            item.status == true ? ( 
                                            <button target={item.roomNumber}> 통화 </button>
                                            ) : (
                                                <p > '통화중' </p>
                                            ) 
                                        }
                                        </div>
                                })
                            }
                        </div>)
                    })
                }
            </div>
        </Fragment>
    )
}

export default RoomList

