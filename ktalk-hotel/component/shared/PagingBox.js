import React, { Component } from 'react'

//토탈 ㅇ
class PagingBox extends Component {
    constructor(props) {
        super(props)
        // props 로 받는 값은
        // 선택 페이지 , 토탈 페이지, 선택 페이지 변경을 위한 function

        this.state = {
            pageNo: []
        }

        this.totalPage = '' //총 페이지의 수
        this.s_page = '' //현재 블록의 시작 페이지
        this.e_page = '' // 현재 블록의 끝 페이지
        this.pageSize = 5 // 한 화면에 나타낼 페이지 num 의 수
    }

    componentDidMount() {
        this.paging()
    }

    componentWillReceiveProps(nextProps) {
        this.paging(nextProps)
    }

    // total : 총 수
    // active : 현재 페이지
    // pageSize : 한 화면에 나타낼 페이지 수
    // dataPerPage : 화 화면에 나타낼 아이템 수
    // this.totalPage = Math.ceil(total / dataPerPage)

    paging = nextProps => {
        const { dataPerPage, total, activeProps } = this.props
        let active = nextProps ? nextProps.activeProps : this.props.activeProps
        this.totalPage = Math.ceil(total / dataPerPage)

        let pageGroup = Math.ceil(this.totalPage / this.pageSize) // 총 4 블록
        let pageBlock = Math.ceil(active / this.pageSize) // 지금 현재 속한 블록

        this.s_page = (pageBlock - 1) * this.pageSize + 1 //현재 블록의 시작 페이지
        this.e_page = pageBlock * this.pageSize

        let itemArr = []
        if (this.totalPage <= 4) {
            for (let i = 1; i <= this.totalPage; i++) {
                itemArr.push(i)
            }
        } else if (
            active === 1 ||
            active === 2 ||
            active === 3 ||
            active === this.totalPage ||
            active === this.totalPage - 1 ||
            active === this.totalPage - 2
        ) {
            for (let i = this.s_page; i <= this.e_page; i++) {
                itemArr.push(i)
            }
        } else {
            for (let i = active - 2; i < active + 3; i++) {
                itemArr.push(i)
            }
        }
        this.setState({ pageNo: itemArr })
    }

    render() {
        const { pageNo } = this.state
        const { nextPage, prevPage, handlePage, activeProps } = this.props

        return (
            <div className="page">
                <ul className="pagination">
                    <li className={activeProps === 1 ? 'disabled' : ''}>
                        <a onClick={() => prevPage(5)}>
                            <i className="material-icons">chevron_left</i>
                        </a>
                    </li>
                    <li className={activeProps === 1 ? 'disabled' : ''}>
                        <a onClick={() => prevPage(1)}>
                            <i className="material-icons">chevron_left</i>
                        </a>
                    </li>

                    {pageNo.map(no => (
                        <li
                            key={no}
                            onClick={() => handlePage(no)}
                            className={activeProps === no ? 'active' : ''}
                        >
                            <a>{no}</a>
                        </li>
                    ))}

                    <li className={activeProps === this.totalPage ? 'disabled' : ''}>
                        <a onClick={() => nextPage(1)}>
                            <i className="material-icons">chevron_right</i>
                        </a>
                    </li>
                    <li className={activeProps === this.totalPage ? 'disabled' : ''}>
                        <a onClick={() => nextPage(5)}>
                            <i className="material-icons">chevron_right</i>
                        </a>
                    </li>
                </ul>
            </div>
        )
    }
}

export default PagingBox
