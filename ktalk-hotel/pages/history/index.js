import React, { Component } from 'react'
import HistoryList from '../../component/shared/HistoryList';
import Memo from '../../component/shared/Memo';
import PagingBox from '../../component/shared/PagingBox';
import { getCallHistory, getCurrencyBySort, getSearchResultList } from '../../actions/history'

class History extends Component {

    static getInitialProps = async e => {
        // const 
        try {
            
            const history = await getCallHistory();

            // 중복 되는 내용 처리 

            return {
                history
            }
        } catch (error) {
            console.log(`getCallHistory error `, error)
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            onMemo: false, // 메모창을 띄울지 bool
            active: 1, //선택 page
            items: this.props.history.result, //list item 의 arr
            total: this.props.history.total, //list item 총 수량
            dataPerPage: 10, // 페이지당 보여줄 수
            memo: '', // memo text 저장 state
            option: {
                startTime : '',
                endTime : ''
            },
            keyword: '',
            searchType : '',
            listType :'', // 통화 그룹 정렬
            groupName : '' // 부서 정렬 
        }    
    }

    hendlerClick = e => {
        const memo_title = '통화 메모 '
        this.modalWindow = window.open(' ', memo_title, 'width=420,height=250');
        this.setState({ onMemo: !this.state.onMemo, memo: memo })
    }

    displayMemo = memo => {
        console.log(memo);
        
    }


    Refresh = () => {
        alert(" 새로 고침 ");
        const CalllType = document.getElementById("CalllType");
        const DepartSort = document.getElementById("DepartSort");
        const searchInput = document.getElementById("searchInput");
        const searchType = document.getElementById("searchType");
        const list = getCallHistory();
        let index = 0;

        if (CalllType.options[CalllType.selectedIndex].value !== 'all') {

            CalllType.value = CalllType.options[index].value
        } 
    
        if (DepartSort.options[DepartSort.selectedIndex].value !== 'all') {
            DepartSort.value = DepartSort.options[index].value;
        }
        
        if (searchType.options[searchType.selectedIndex].value !== 'rooms') {

            searchType.value = searchType.options[index].value;
            searchInput.placeholder = '객실번호 ex.0201';
        }

        if (searchInput.value !== '') {
            searchInput.value = '';
        }
        
        list.then(res => {

            this.setState({
                total: res.total,
                items: res.result,
                listType : '',
                groupName : ''
            })
            
        })
        .catch(err => Promise.reject(err))

    }

    handleChangePage = async pageNo => {
        const { searchValue, option } = this.state
        let pageData = {
            searchValue: searchValue,
            option: option,
            active: pageNo
        }
        try {
            const res = await getCallHistory(pageData)
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

    historyByGroup = async e => {
        alert("historyByGroup", this.state);
        try {
            // const { active , groupName } = this.state
            // console.log(this.state);
            console.log(" groupName ##############", e.target.value);
            // let groupName = e.value.target


            // let groupData = {
            //     active: active,
            //     group: groupValue
            // }
            // console.log('groupData', groupData)
            // const res = await getManagementsByGroup()
            
            // console.log('res:::::', res)
        } catch (err) {
            // console.log("error", err);
        }
    }

    getCurrencyBySort = async e => {
        try {
            const { active, items} = this.state

            let listValue = e.target.value

            let ListData = {
                active: active,
                listType: listValue
            }

            const _list_sort = await getCurrencyBySort(ListData)
            console.log('res:::::', _list_sort)

            this.setState({
                total : _list_sort.total,
                items: _list_sort.result
            })
        } catch (err) {
            console.log("error", err);
        }
    }


    getSearchTypeByValue = async e => {
        try {
            const { active, searchType} = this.state

            let searchWord = searchInput.value
            console.log(" 검색 단어, " , searchWord)
            console.log("searchType   ", searchType);

            if (searchWord.length < 2) {
                alert(" 2자 이상 입력해주세요.");
            } 


            let searchData = {
                searchType: searchType,
                active: active, 
                keyword: searchWord
            }

            const _search = await getSearchResultList(searchData)
            console.log('res:::::', _search)

            // this.setState({
            //     total: _list_sort.total,
            //     items: _list_sort.result
            // })
        } catch (err) {
            console.log("error", err);
        }
    }

    inputsearchType = e => {

        searchType.addEventListener('click', () => {

            switch (searchType.options[searchType.selectedIndex].value) {
                case 'rooms':
                    searchInput.placeholder = '객실번호 ex.0201';
                    // 검색 
                    break;
                case 'users':
                    searchInput.placeholder = '상담자명 ex.marriot_fr1';
                    // 검색 
                    break;
                default:
                    break;
            }

            return this.setState({
                searchType : searchType.options[searchType.selectedIndex].value
            });
        });
    }

    Calendarcheck = e => {
        const { startTime } = this.state.option
        console.log(document.getElementById('today').value);
        document.getElementById('today').value = new Date().toISOString().slice(11, 16);
    }


    render() {
        const { onMemo, active, total, items, memo, error } = this.state
        const bool = true
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
                        <div className ="sideBar">
                            <label> 달력 </label>
                            <input type="date" />  ~ <input type="date" id="today" />
                            <button> 조회</button>

                            <select 
                                value={this.state.value}
                                onChange={this.inputsearchType}
                                name="searchType" id="searchType">
                                <option value="rooms"> 객실</option>
                                <option value="users"> 상담사</option>
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
                            </select>
                            <select
                                value={this.state.value}
                                onChange={this.getCurrencyBySort}
                                className="callType"
                                id="CalllType">
                                <option value="all" defaultValue> 전체</option>
                                <option value="out"> 발신 </option>
                                <option value="in"> 수신</option>
                                <option value="miss"> 부재중</option>
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
                                <HistoryList
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

export default History
