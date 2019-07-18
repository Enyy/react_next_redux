import React, { Component } from 'react'
import AbsensceList from '../../component/shared/AbsensceList';
import Memo from '../../component/shared/Memo';
import PagingBox from '../../component/shared/PagingBox';
import { getMissedList  } from '../../actions/absensce';
import { getCurrencyBySort, getSearchResultList, getCalendarBySearch, getTableHeaderBySort} from '../../actions/history'

class Absensce extends Component {

    static getInitialProps = async e => {
        try {

            const missList = await getMissedList();
        
            return {
                missList
            }
        } catch (error) {
            console.log(`getMissedList error `, error)
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            onMemo: false, // 메모창을 띄울지 bool
            active: 1, //선택 page
            items: this.props.missList.result, //list item 의 arr
            total: this.props.missList.total, //list item 총 수량
            dataPerPage: 10, // 페이지당 보여줄 수
            memo: '', // memo text 저장 state
            option: {
                startTime: '',
                endTime: ''
            },
            keyword: '',
            searchType: '',
            listType: '', // 통화 그룹 정렬
            groupName: '' // 부서 정렬 
        }
    }

    Refresh = async () => {
        alert(" 새로 고침 ");
        const CallType = document.getElementById("CallType");
        const DepartSort = document.getElementById("DepartSort");
        const searchInput = document.getElementById("searchInput");
        const searchType = document.getElementById("searchType");
        const list = await getMissedList();
        let index = 0;

        if (CallType.options[CallType.selectedIndex].value !== 'miss') {
            index= 3
            CallType.value = CallType.options[index].value
        }

        if (DepartSort.options[DepartSort.selectedIndex].value !== 'all') {
            DepartSort.value = DepartSort.options[index].value;
        }

        if (searchType.options[searchType.selectedIndex].value !== 'room') {

            searchType.value = searchType.options[index].value;
            searchInput.placeholder = '객실번호 ex.0201';
        }

        if (searchInput.value !== '') {
            searchInput.value = '';
        }

        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        let monthc, days
        if (month < 10) {
            monthc = "0" + month;
        }
        if (day < 10) {
            days = "0" + day
        } else {
            days = day
        }

        const Today = year + "-" + monthc + "-" + days;
        const prevDates = year + "-" + monthc + "-" + (days - 7);

        document.getElementById('today').value = Today;
        document.getElementById('prevDate').value = prevDates;

        this.setState({
            total: list.total,
            items: list.result,
            listType: '',
            groupName: ''
        })


    }

    hendlerClick = e => {
        const memo_title = '통화 메모 '
        const popup = window.open('/popup', memo_title, 'width=420,height=250');

    }

    closeMemo = () => {
        this.setState({ onMemo: !this.state.onMemo })
    }

    // 여기서 api 호출 후 메모에 데이터 넣으면 됨
    displayMemo = async idx => {
        try {
            let res = await getMemoInfo(idx)
            console.log('res', res)
            this.setState({ onMemo: !this.state.onMemo, memo: res.data.memo })


        } catch (err) {
            console.log('err', err)
        }
    }



    handleChangePage = async pageNo => {
        const { searchValue, option } = this.state
        let pageData = {
            searchValue: searchValue,
            option: option,
            active: pageNo
        }
        try {
            const res = await getMissedList(pageData)
            this.setState({
                items: res.result,
                total: res.result.length,
                activePage: pageNo
            })
        } catch (err) {
            console.log('handleChangePage err', err)
        }
    }

    handlePage = pageNo => {
        this.setState(
            {
                active: pageNo
            }
        )
    }

    prevPage = pageNo => {
        const { active } = this.state
        if (active - pageNo < 1) return this.setState({ active: 1 })
        this.setState({
            active: active - pageNo
        })
    }

    nextPage = pageNo => {
        const { active, total, dataPerPage } = this.state
        if (active + pageNo > total / dataPerPage) return this.setState({ active: total / dataPerPage })
        this.setState({
            active: active + pageNo
        })
    }

    getCurrencyBySort = async e => {
        try {
            const { active, option } = this.state

            let listValue = e.target.value
            const prevDate = document.getElementById('prevDate').value.split('-');
            const prevDates = prevDate[0] + prevDate[1] + prevDate[2];

            const today = document.getElementById('today').value.split('-');
            const todays = today[0] + today[1] + today[2];

            console.log("3. getCurrencyBySort --> ", option);
            let ListData = {
                active: active,
                listType: listValue,
                option: {
                    startTime: prevDates,
                    endTime: todays
                }

            }

            const _list_sort = await getCurrencyBySort(ListData)
            console.log('res:::::', _list_sort)

            this.setState({
                option: {
                    startTime: prevDates,
                    endTime: todays
                },
                total: _list_sort.total,
                items: _list_sort.result
            })
        } catch (err) {
            console.log("error", err);
        }
    }


    getSearchTypeByValue = async e => {
        try {
            const { active, searchType, option } = this.state

            let searchWord = searchInput.value.trim()
            console.log("option", option);
            console.log(" 검색 단어, ", searchWord)
            console.log("searchType   ", searchType);

            const prevDate = document.getElementById('prevDate').value.split('-');
            const prevDates = prevDate[0] + prevDate[1] + prevDate[2];

            const today = document.getElementById('today').value.split('-');
            const todays = today[0] + today[1] + today[2];


            if (searchWord.length < 2) {
                alert(" 2자 이상 입력해주세요.");
            }

            let searchData = {
                searchType: searchType,
                active: active,
                keyword: searchWord,
                option: {
                    startTime: prevDates,
                    endTime: todays
                }
            }

            const _search = await getSearchResultList(searchData)
            console.log('res:::::', _search)

            this.setState({
                total: _search.total,
                items: _search.result
            })
        } catch (err) {
            console.log("error", err);
        }
    }

    inputsearchType = e => {

        searchType.addEventListener('click', () => {

            switch (searchType.options[searchType.selectedIndex].value) {
                case 'room':
                    // searchInput.value ='';
                    searchInput.placeholder = '객실번호 ex.0201';
                    // 검색 
                    break;
                case 'user':
                    // searchInput.value = '';
                    searchInput.placeholder = '상담자명 ex.marriot_fr1';
                    // 검색 
                    break;
                default:

                    break;
            }

            return this.setState({
                searchType: searchType.options[searchType.selectedIndex].value
            });
        });
    }

    Calendarcheck = async e => {
        try {
            const { active } = this.state

            const today = document.getElementById('today').value.split('-');
            const todays = today[0] + today[1] + today[2];

            const prevDate = document.getElementById('prevDate').value.split('-');
            const prevDates = prevDate[0] + prevDate[1] + prevDate[2];

            let CalendarData = {
                option: {
                    startTime: prevDates,
                    endTime: todays
                },
                active: active
            }

            const _dateSearch = await getCalendarBySearch(CalendarData)

            this.setState({
                option: {
                    startTime: prevDates,
                    endTime: todays
                },
                total: _dateSearch.total,
                items: _dateSearch.result
            })
        } catch (err) {

            console.log("error", err);
        }
    }

    ForwardingTime = async  e => {
        // 착신 시간 오름차순 내림차순 
    }

    // 객실 정렬 
    guestRoomSort = async e => {
        alert("정렬")
        let sortdata;
        try {


            const { active } = this.state;

            // if (sortflag) {
            sortdata = {
                active: active,
                option: {
                    sortType: 'roomNumber',
                    sort: 'desc'
                }
            }
            //sortflag =false;
            // } 

            // if (!sortflag)  {
            //     sortdata = {
            //         active: active,
            //         option: {
            //             sortType: 'room',
            //             sort: 'desc'
            //         }
            //     }
            //     //sortflag = true;
            // }

            const _dateSort = await getTableHeaderBySort(sortdata)

            console.log(_dateSort);

        } catch (error) {
            console.log(`guestRoomSort ${error}`);
        }
    }

    render() {
        const { onMemo, active, total, items, memo, error } = this.state
        const bool = true

        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        let monthc, days
        if (month < 10) {
            monthc = "0" + month;
        }
        if (day < 10) {
            days = "0" + day
        } else {
            days = day
        }

        const today = year + "-" + monthc + "-" + days;
        const prevDate = year + "-" + monthc + "-" + (days - 7);


        return (

            <div className="content-container">
                <div className="content-box">
                    <div className="title">
                        <h2> 통화 내역 </h2>
                        <div className="title-line">
                            <button id="Refresh" onClick={this.Refresh} >  새로 고침 </button>
                        </div>
                    </div>
                    <div className="content">
                        <div className="sideBar">
                            <label> 달력 </label>
                            <input type="date" id="prevDate" onChange={this.state.value} defaultValue={prevDate} />  ~ <input type="date" id="today" onChange={this.state.value} defaultValue={today} />
                            <button onClick={this.Calendarcheck}> 조회</button>

                            <select
                                defaultValue="room"
                                value={this.state.value}
                                onChange={this.inputsearchType}
                                name="searchType" id="searchType">
                                <option value="room"> 객실</option>
                                <option value="user"> 상담사</option>
                            </select>

                            <input type="search" id="searchInput" placeholder="객실번호 ex.0201"></input>
                            <button onClick={this.getSearchTypeByValue}> 검색 </button>

                        </div>
                        <div className="search input">
                            <select
                                value={this.state.value}
                                onChange={this.historyByGroup}
                                className="sort"
                                id="DepartSort">
                                <option value="all" defaultValue> 부서 그룹 </option>
                                <option value="FR"> 프론트(FR)</option>
                                <option value="RV"> 예약문의(RV)</option>
                                <option value="RS"> 룸서비스(RS)</option>
                                <option value="HK"> 하우스키퍼(HK)</option>
                                <option > 부재중 그룹 </option>
                            </select>
                            <select
                                defaultValue="miss"
                                value = {this.state.value}
                                onChange={this.getCurrencyBySort}
                                className="callType"
                                id="CallType">
                                <option value="all" > 전체</option>
                                <option value="out"> 발신 </option>
                                <option value="in"> 수신</option>
                                <option value="miss" > 부재중</option>
                            </select>
                            <br></br>

                        </div>
                        <div className="table list">
                            <table>
                                <colgroup>
                                    <col width="5%" />
                                    <col width="10%" />
                                    <col width="10%" />
                                    <col width="10%" />
                                    <col width="20%" />
                                    <col width="10%" />
                                    <col width="15%" />
                                    <col width="10%" />
                                    <col width="15%" />
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th>NO .</th>
                                        <th>착/발신 시간</th>
                                        <th>객실</th>
                                        <th>요청부서</th>
                                        <th>처리부서</th>
                                        <th>상담사ID</th>
                                        <th>총 통화 시간</th>
                                        <th>메모</th>
                                        <th>통화</th>
                                    </tr>
                                </thead>
                                <AbsensceList
                                    onHistroy={bool}
                                    items={items}
                                    active={active}
                                    displayMemo={this.hendlerClick}
                                />
                            </table>
                        </div>
                        <PagingBox
                            total={total}
                            dataPerPage={10}
                            activeProps={active}
                            nextPage={this.nextPage}
                            prevPage={this.prevPage}
                            hanldePage={this.handlePage}
                        />
                    </div>
                </div>
                {onMemo ? <Memo displayMemo={this.displayMemo} memo={memo} /> : ''}
            </div>
        )
    }
}

export default Absensce
