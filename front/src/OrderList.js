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
    const { orders, newOrders, marriedOrders, deletedOrders, error, activeTab } = this.state;

    if (error) {
      return <div>오류가 발생했습니다: {error.message}</div>;
    }

    return (
      <div>
        <section style={{ display: "flex", justifyContent: "space-around" }}>
          <h2><Link to={'/orders/new'}>미혼자용 주문작성 (신규)</Link></h2>
          <h2><Link to={'/orders/married'}>기혼자용 주문작성 (2025입궁식)</Link></h2>
        </section>
        <h2>주문 목록</h2>
        <button style={{ marginLeft:'20px'}} onClick={this.handleDownloadExcel}>엑셀로 다운로드</button>
        <button style={{ marginLeft:'20px'}} onClick={this.handleUpdateSpreadsheet}>스프레드시트 업데이트</button>
        <section style={{ padding:'20px'}}>
          <button style={{ marginLeft:'20px'}} onClick={() => this.setState({ activeTab: 'orders' })}>기존 주문서</button>
          <button style={{ marginLeft:'20px'}} onClick={() => this.setState({ activeTab: 'newOrders' })}>신규 주문서(2024 3월 이후)</button>
          {/* <button style={{ marginLeft:'20px'}} onClick={() => this.setState({ activeTab: 'marriedOrders' })}>기혼자용 주문서</button> */}
          <button style={{ marginLeft:'20px'}} onClick={() => this.setState({ activeTab: 'deletedOrders' })}>휴지통</button>
        </section>
        {activeTab === 'orders' && (
          // 기존 주문서 리스트 렌더링
          <ul>
            {orders.map(order => (
              <li key={order.orderNumber} style={{ display: 'flex', marginBottom: '10px' }}>
                <div style={{ marginRight: '20px' }}>
                  <Link to={`/orders/${order.id}`}>주문 번호: {order.orderNumber}</Link>
                </div>
                <div style={{ marginRight: '20px' }}>주문자 이름: {order.ordererName}</div>
                <div style={{ marginRight: '20px' }}>소속: {order.affiliation}</div>
                <div style={{ marginRight: '20px' }}>연락처: {order.contact}</div>
                <div style={{ marginRight: '20px' }}>주문 상태: {order.orderStatus}</div>
                <div style={{ marginRight: '20px' }}>생성자: {order.creator}</div>
                <div style={{ marginRight: '20px' }}>생성 시간: {order.creationTime}</div>
                <div style={{ marginRight: '20px' }}>총액: {order.totalAmount}</div>
                <div>잔액: {order.balance}</div>
                <button onClick={() => this.deleteOrder(order.id)} style={{ marginLeft: '20px' }}>
                  삭제
                </button>
              </li>
            ))}
          </ul>
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
                <button onClick={() => this.deleteOrder(order.id)} style={{ marginLeft: '20px' }}>
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
                <button onClick={() => this.deleteOrder(order.id)} style={{ marginLeft: '20px' }}>
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
