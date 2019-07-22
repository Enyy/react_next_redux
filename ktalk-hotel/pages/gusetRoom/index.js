import React, { Component , Fragment } from 'react';
import RoomList from '../../component/shared/GusetRoomList'
import { getGuestRoomList, getGuestRoomSearch, getGuestRoomFloorSort }from '../../actions/gusetRoom'
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
            floor: '',
            keyword : '', 
            items : this.props.gusetRoomList.result
        }



    }
    
    getGuestRoomBySearch = async () => {

        let _data =  {
            keyword: RoomSearch.value
        }
        try {
            const res = await getGuestRoomSearch(_data)
            console.log(res)
        } catch (err) {
            console.log('getGuestRoomSearch  err', err)
        }
    }

    RefreshGusetRoom = async e => {
        alert(
            "새로고침"
        )
        let index = 0;
        
        const gusetRoomList = await getGuestRoomList();

        const RoomSearch = document.getElementById('RoomSearch');
        const FloorType = document.getElementById('FloorType');

        if (RoomSearch.value != "") {
            RoomSearch.value = '';
        }

        if (FloorType.options[FloorType.selectedIndex].value !== 'all') {
            FloorType.value = FloorType.options[index].value;
        }

        console.log("1" , gusetRoomList)
        this.setState({
            items: gusetRoomList.result
        })
    }

    getCurrencyByRoomSort = async (floor) => {
   
        let FloorData = {
            listType : floor
        }

        try {
            console.log(" ######### FloorData " , FloorData);
            const _FloorSort = await getGuestRoomFloorSort(FloorData);


            this.setState({
                items : _FloorSort.result
            })
        } catch (error) {
            console.log(" getCurrencyByRoomSort error " , error);
        }
    }

    SelectFloorType = e => {
        const { items } = this.state;
        let roomInfo = {};
        items.map(item => {
            roomInfo[item.floor] ? "" : roomInfo[item.floor] = [];
            roomInfo[item.floor].push(item);
        })
        const roomInfoKeys = Object.keys(roomInfo);
        console.log(roomInfoKeys);
        this.setState({
                floor: roomInfoKeys
        });

        FloorType.addEventListener('click', () => {
            console.log("roomInfokeys" , FloorType.options[0].value);
            if (FloorType.options[0].value ==='all') {
                this.getCurrencyByRoomSort(FloorType.options[FloorType.selectedIndex].value)
            } else {
                this.getCurrencyByRoomSort(roomInfoKeys[FloorType.selectedIndex])
            }
 
            
        });
    }


    render() {
        const { items , Floor } = this.state;
        let roomInfo = {};
        items.map(item => {
            roomInfo[item.floor] ? "" : roomInfo[item.floor] = [];
            roomInfo[item.floor].push(item);
        })
        const roomInfoKeys = Object.keys(roomInfo);

        return (
            <div className="content-container">

                <div className="content-box">
                    <div className="title">
                        <h2> 객실 리스트 </h2>
                        <div className="title-line">
                            <button id="Refresh" onClick={this.RefreshGusetRoom} >  새로 고침 </button>
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
                                onChange={this.SelectFloorType}
                                className="FloorType"
                                id="FloorType"
                                >
                                 <option key={0} value='all'> 층 전체</option>
                                {
                                    roomInfoKeys.map(FloorItem=> {
                                        return (
                                            <option key={FloorItem} value={FloorItem}> {FloorItem}</option>
                                        )
                                    })
                                }
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


//                                 


export default gusetRoom