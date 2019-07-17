import React, { Component } from 'react';
import RoomList from '../../component/shared/GusetRoomList'
import { getGuestRoomList, getGuestRoomSearch }from '../../actions/gusetRoom'
class gusetRoom extends Component {


    static getInitialProps = async () => {
        try {

            const gusetRoomList = await getGuestRoomList();
            // 중복 처리 해줘야 함 

           // const guset = removeDuplicatesArray(gusetRoomList.result);


            console.log("1", gusetRoomList);
            return {
                gusetRoomList
            }
        } catch (error) {
            console.error(error)
        }
    }
    constructor(props) {
        super(props)

        this.state = {
            roomsNumber: '',
            status : '',
            Floor: '',
            keyword : '', 
            items : this.props.gusetRoomList.result
        }
    }
    
    getGuestRoomBySearch = e => {


        let _data =  {
            keyword: RoomSearch.value
        }
        try {
            const res = getGuestRoomSearch(_data)
            console.log(res)
        } catch (err) {
            console.log('getGuestRoomSearch  err', err)
        }
    }

    render() {
        const { Floor, keyword, items, status} = this.state;
        console.log('Floor', Floor);
        return (

            <div className="content-container">
                <div className="content-box">
                    <div className="title">
                        <h2> 객실 리스트 </h2>
                        <div className="title-line">
                            <button id="Refresh" onClick={this.Refresh} >  새로 고침 </button>
                        </div>
                    </div>
                    <div className="content">
                        <div className="sideBar">
                            <input type="search" id="RoomSearch" placeholder="객실번호"></input>
                            <button onClick={this.getGuestRoomBySearch}> 검색 </button>
                        </div>
                        <div>
                            <select
                                value={this.state.value}
                                onChange={this.getCurrencyBySort}
                                className="callType"
                                id="CalllType">
                                <option value="all" defaultValue> 층 전체</option>
                                <option value="2"> 2F </option>
                                <option value="3"> 3F </option>
                                <option value="4"> 4F </option>
                            </select>
                            <br></br>

                        </div>
                        <div className="gusetList">
                            <RoomList 
                                items={items} 
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default gusetRoom