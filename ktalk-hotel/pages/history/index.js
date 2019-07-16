import React, { Component } from 'react'
import ReactDom from 'react-dom'
import HistoryList from '../../component/shared/HistoryList';
import Memo from '../../component/shared/Memo';
import { getCallHistory, getCurrencyBySort, historyByGroup } from '../../actions/history'

class History extends Component {

    static async getInitialProps() {
        try {
            const history = await getCallHistory();
            return {
                history
            }
        } catch (error) {
            console.log(`getCallHistory error `, error)
        }
    }

    constructor(props) {
        super(props);
        this.modalWindow;

        this.state = {
            onMemo: false, // 메모창을 띄울지 bool
            active: 1, //선택 page
            items: this.props.history.result, //list item 의 arr
            total: this.props.history.total, //list item 총 수량
            dataPerPage: 10, // 페이지당 보여줄 수
            memo: '', // memo text 저장 state
            option: '',
            searchValue: '',
            searchType : '',
            listType :'', // 통화 그룹 정렬
            groupName : '' // 부서 정렬 
        }    
    }

    hendlerClick = e => {
        const memo_title = '통화 메모 '
        this.modalWindow = window.open(' ', memo_title, 'width=420,height=250')
    }

    displayMemo = memo => {
        this.setState({ onMemo: !this.state.onMemo, memo: memo })
    }
    componentDidMount() {
        
    
    }


    // 새로운 팝업 창 생성

    // nextPage = pageNo => {
    //     const { active, total, dataPerPage } = this.state
    //     if (active + pageNo > total / dataPerPage) return this.setState({ active: total / dataPerPage })
    //     this.setState({
    //         active: active + pageNo
    //     })
    // }

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
            const { active, items } = this.state

            let searchType = searchInput.value
            console.log("searchType   ", searchType);

            if (searchType.length < 2) {
                alert(" 2자 이상 입력해주세요.");
            } 


            // let searchType = {
            //     searchType: searchType,
            //     active: active,
            //     listType: listValue
            // }

            // const _search = await getSearchTypeList(searchType)
            // console.log('res:::::', _search)

            // this.setState({
            //     total: _list_sort.total,
            //     items: _list_sort.result
            // })
        } catch (err) {
            console.log("error", err);
        }
    }

    inputsearchType = e => {

        const { searchType } = this.state

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

            return searchType.options[searchType.selectedIndex].value
        });
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
                            <button>  새로 고침 </button>
                        </div> 
                    </div>
                    <div className="content">
                        <div clssName ="sideBar">
                            <label> 달력 </label>
                            <input type="date" /> ~ <input type="date" />
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
                                className="sort" >
                                <option value="all"> 부서 그룹 </option>
                                <option value="FR"> 프론트(FR)</option>
                                <option value="RV"> 예약문의(RV)</option>
                                <option value="RS"> 룸서비스(RS)</option>
                                <option value="HK"> 하우스키퍼(HK)</option>
                            </select>


                            <select
                                value={this.state.value}
                                onChange={this.getCurrencyBySort}
                                className="callType">
                                <option value="all"> 전체</option>
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
                                    displayMemo={this.displayMemo}
                                />
                            </table>
                        </div>
                    </div>
                </div>
                {onMemo ? <Memo displayMemo={this.displayMemo} memo={memo} /> : ''}
            </div>
        )
    }
}

export default History
