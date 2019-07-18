import React, { Fragment } from 'react'
const AbsensceList = ({ items, displayMemo }) => {
    return (

        <Fragment>
            <tbody>
                {
                    items.map(item => (
                        <tr key={item.idx}>
                            <td>{item.idx}</td>
                            <td>{item.reception_time}</td>
                            <td>{item.room_number}</td>
                            <td>{item.process_group}</td>
                            <td>{item.request_group}</td>
                            <td>{item.receiver}</td>
                            <td>{item.call_time}</td>
                            <td>
                                <button
                                    onClick={() => displayMemo(item.memo)}
                                >
                                    메모장
                            </button>
                            </td>
                            <td>
                                <button className="button call"> 통화 </button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </Fragment>
    )
}

export default AbsensceList

