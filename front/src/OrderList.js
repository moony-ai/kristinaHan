import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [], // 기존 주문 목록 2024 3월 이전
      newOrders: [], // 신규 주문 목록 2024 3월 이후
      // marriedOrders: [], // 2024 기혼자용 주문 목록 
      deletedOrders: [],  // 삭제된 주문 목록을 저장할 상태 추가
      error: null,
      activeTab: 'orders', // 현재 활성화된 탭을 추적 ('orders', 'newOrders', 'deletedOrders')
      selectedYear: new Date().getFullYear(), // 현재 연도를 기본값으로 설정
      selectedMonth: new Date().getMonth() + 1, // 현재 월을 기본값으로 설정
    };
  }

  componentDidMount() {
    this.fetchOrders();
    this.fetchNewOrders();
    // this.fetchMarriedOrders();
    this.fetchDeletedOrders();
  }

  // 기존목록
  fetchOrders() {
    axios.get('https://server-6kol.onrender.com/api/v1/orders/')
      .then(response => {
        this.setState({ orders: response.data });
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  // 월별 주문 목록
  fetchMonthlyOrders = (year, month) => {
    axios.get(`https://server-6kol.onrender.com/api/v1/orders/${year}/${month}/`)
      .then(response => {
        this.setState({ orders: response.data });
      })
      .catch(error => {
        this.setState({ error });
      });
  }  

  handleYearChange = (event) => {
    this.setState({ selectedYear: event.target.value });
  }

  handleMonthChange = (event) => {
    this.setState({ selectedMonth: event.target.value });
  }

  // 신규목록
  fetchNewOrders() {
    axios.get('https://server-6kol.onrender.com/api/v1/orders/new/')
      .then(response => {
        this.setState({ newOrders: response.data });
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  // 기혼자목록
  fetchMarriedOrders() {
    axios.get('https://server-6kol.onrender.com/api/v1/orders/new/')
      .then(response => {
        this.setState({ marriedOrders: response.data });
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  // 삭제목록
  fetchDeletedOrders = () => {
    axios.get('https://server-6kol.onrender.com/api/v1/orders/deleted/')
      .then(response => {
        this.setState({ deletedOrders: response.data });
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  // // 일반목록으로 돌아가기
  // switchToNormalView = () => {
  //   this.setState({ viewingDeleted: false });
  // }

  handleDownloadExcel = () => {
    axios({
      url: 'https://server-6kol.onrender.com/api/v1/orders/downloads/',
      method: 'GET',
      responseType: 'blob', // 중요: 서버에서 blob 형태로 응답을 받음
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', '주문data.xlsx'); // 파일 다운로드 이름 설정
      document.body.appendChild(link);
      link.click();
    }).catch(error => {
      console.error('다운로드 중 오류 발생:', error);
    });
  }

  deleteOrder = (orderId) => {
    axios.delete(`https://server-6kol.onrender.com/api/v1/orders/${orderId}/`)
      .then(response => {
        // 삭제 후 주문 목록 업데이트
        this.fetchOrders();
      })
      .catch(error => {
        console.error('주문 삭제 중 오류 발생:', error);
      });
  }

  deleteNewOrder = (orderId) => {
    axios.delete(`https://server-6kol.onrender.com/api/v1/orders/new/${orderId}/`)
      .then(response => {
        // 삭제 후 주문 목록 업데이트
        this.fetchOrders();
      })
      .catch(error => {
        console.error('주문 삭제 중 오류 발생:', error);
      });
  }

  // sheet 업데이트
  handleUpdateSpreadsheet = () => {
    axios.get('https://server-6kol.onrender.com/api/v1/orders/updategs/')
      .then(response => {
        console.log('스프레드시트 업데이트 완료:', response);
        alert('스프레드시트가 성공적으로 업데이트되었습니다.');
      })
      .catch(error => {
        console.error('스프레드시트 업데이트 중 오류 발생:', error);
        alert('스프레드시트 업데이트 중 오류가 발생했습니다.');
      });
  }


  render() {
    const { orders, newOrders, marriedOrders, deletedOrders, error, activeTab, selectedYear, selectedMonth} = this.state;

    if (error) {
      return <div>오류가 발생했습니다: {error.message}</div>;
    }

    return  (
      <div className="container-fluid mt-5 px-0">
      <section className="d-flex justify-content-around mb-4 custom-header">
          <h2 style={{ fontWeight: 'bold' }}><Link to={'/orders/new'}>미혼자용 주문작성 (신규)</Link></h2>
          <h2 style={{ fontWeight: 'bold' }}><Link to={'/orders/married'}>기혼자용 주문작성 (2025입궁식)</Link></h2>
        </section>


        <div className="text-left mb-4">
        <button className="custom-button" style={{ marginLeft:'20px'}} onClick={this.handleDownloadExcel}>엑셀로 다운로드</button>
        <button className="custom-button" style={{ marginLeft:'20px'}} onClick={this.handleUpdateSpreadsheet}>스프레드시트 업데이트</button>
        </div>
      <section className="text-left mb-4">
          <button className="custom-button" style={{ marginLeft:'20px',  marginBottom: '20px'}} onClick={() => this.setState({ activeTab: 'orders' })}>기존 주문서</button>
          <button className="custom-button" style={{ marginLeft:'20px',  marginBottom: '20px'}} onClick={() => this.setState({ activeTab: 'newOrders' })}>신규 주문서(2024 3월 이후)</button>
          {/* <button style={{ marginLeft:'20px'}} onClick={() => this.setState({ activeTab: 'marriedOrders' })}>기혼자용 주문서</button> */}
          <button className="custom-button" style={{ marginLeft:'20px',  marginBottom: '20px'}} onClick={() => this.setState({ activeTab: 'deletedOrders' })}>휴지통</button>
        </section>


        <div className="row mb-1">
          <div className="col d-flex align-items-center">
            <h2 className="mb-4" style={{  marginLeft:'20px', fontWeight: 'bold' }}>주문 목록</h2>
          </div>
          <div className="col-auto d-flex justify-content-center" style={{ marginRight: '-10px' }}>
            <select className="form-control" value={selectedYear} onChange={this.handleYearChange}>
              {[...Array(5).keys()].map(offset => {
                const year = new Date().getFullYear() - 2 + offset; // 현재 연도 기준으로 -2년부터 +2년까지 선택 가능
                return <option key={year} value={year}>{year}</option>;
              })}
            </select>
          </div>
          <div className="col-auto d-flex justify-content-center" style={{ marginRight: '-10px' }}>
            <select className="form-control" value={selectedMonth} onChange={this.handleMonthChange}>
              {[...Array(12).keys()].map(month => (
                <option key={month + 1} value={month + 1}>{month + 1}월</option>
              ))}
            </select>
          </div>
          <div className="col-auto justify-content-center">
            <button className="custom-button" style={{ marginRight:'20px' }} onClick={() => this.fetchMonthlyOrders(this.state.selectedYear, this.state.selectedMonth)}>월별 주문 조회</button>
          </div>
        </div>


        {activeTab === 'orders' && (
          // 기존 주문서 리스트 렌더링
          <table className="table table-hover">
          <thead>
            <tr>
              <th>주문 번호</th>
              <th>주문자 이름</th>
              <th>소속</th>
              <th>연락처</th>
              <th>주문 상태</th>
              <th>생성자</th>
              <th>생성 시간</th>
              <th>총액</th>
              <th>잔액</th>
              <th>조치</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.orderNumber}>
                <td><Link to={`/orders/${order.id}`}>{order.orderNumber}</Link></td>
                <td>{order.ordererName}</td>
                <td>{order.affiliation}</td>
                <td>{order.contact}</td>
                <td>{order.orderStatus}</td>
                <td>{order.creator}</td>
                <td>{new Date(order.creationTime).toLocaleString()}</td>
                <td>{order.totalAmount.toLocaleString()}</td>
                <td>{order.balance.toLocaleString()}</td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => this.deleteOrder(order.id)}>
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        )}
        {activeTab === 'newOrders' && (
          // 신규 주문서 리스트 렌더링
          <ul>
            {newOrders.map(order => (
              <li key={order.orderNumber} style={{ display: 'flex', marginBottom: '10px' }}>
                <div style={{ marginRight: '20px' }}>
                  <Link to={`/orders/newform/${order.id}`}>주문 번호: {order.orderNumber}</Link>
                </div>
                <div style={{ marginRight: '20px' }}>주문자 이름: {order.ordererName}</div>
                <div style={{ marginRight: '20px' }}>소속: {order.affiliation}</div>
                <div style={{ marginRight: '20px' }}>연락처: {order.contact}</div>
                <div style={{ marginRight: '20px' }}>주문 상태: {order.orderStatus}</div>
                <div style={{ marginRight: '20px' }}>생성자: {order.creator}</div>
                <div style={{ marginRight: '20px' }}>생성 시간: {order.creationTime}</div>
                <div style={{ marginRight: '20px' }}>총액: {order.totalAmount}</div>
                <div>잔액: {order.balance}</div>
                <button className="btn btn-danger btn-sm" onClick={() => this.deleteNewOrder(order.id)} style={{ marginLeft: '20px' }}>
                  삭제
                </button>
              </li>
            ))}
          </ul>
        )}
        {activeTab === 'marriedOrders' && (
          // 신규 주문서 리스트 렌더링
          <ul>
            {newOrders.map(order => (
              <li key={order.orderNumber} style={{ display: 'flex', marginBottom: '10px' }}>
                <div style={{ marginRight: '20px' }}>
                  <Link to={`/orders/newform/${order.id}`}>주문 번호: {order.orderNumber}</Link>
                </div>
                <div style={{ marginRight: '20px' }}>주문자 이름: {order.ordererName}</div>
                <div style={{ marginRight: '20px' }}>소속: {order.affiliation}</div>
                <div style={{ marginRight: '20px' }}>연락처: {order.contact}</div>
                <div style={{ marginRight: '20px' }}>주문 상태: {order.orderStatus}</div>
                <div style={{ marginRight: '20px' }}>생성자: {order.creator}</div>
                <div style={{ marginRight: '20px' }}>생성 시간: {order.creationTime}</div>
                <div style={{ marginRight: '20px' }}>총액: {order.totalAmount}</div>
                <div>잔액: {order.balance}</div>
                <button className="btn btn-danger btn-sm" onClick={() => this.deleteNewOrder(order.id)} style={{ marginLeft: '20px' }}>
                  삭제
                </button>
              </li>
            ))}
          </ul>
        )}
        {activeTab === 'deletedOrders' && (
          // 삭제된 주문서 리스트 렌더링
          <ul>
            {deletedOrders.map(order => (
              <li key={order.orderNumber} style={{ display: 'flex', marginBottom: '10px' }}>
                <div style={{ marginRight: '20px' }}>
                  주문 번호: {order.orderNumber}
                </div>
                <div style={{ marginRight: '20px' }}>주문자 이름: {order.ordererName}</div>
                <div style={{ marginRight: '20px' }}>소속: {order.affiliation}</div>
                <div style={{ marginRight: '20px' }}>연락처: {order.contact}</div>
                <div style={{ marginRight: '20px' }}>주문 상태: {order.orderStatus}</div>
                <div style={{ marginRight: '20px' }}>생성자: {order.creator}</div>
                <div style={{ marginRight: '20px' }}>생성 시간: {order.creationTime}</div>
                <div style={{ marginRight: '20px' }}>총액: {order.totalAmount}</div>
                <div>잔액: {order.balance}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    );


  }
}

export default OrderList;
