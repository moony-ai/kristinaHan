import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      error: null,
    };
  }

  componentDidMount() {
    this.fetchOrders();
  }

  fetchOrders() {
    axios.get('https://server-6kol.onrender.com/api/v1/orders/')
      .then(response => {
        this.setState({ orders: response.data });
      })
      .catch(error => {
        this.setState({ error });
      });
  }

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

  render() {
    const { orders, error } = this.state;

    if (error) {
      return <div>오류가 발생했습니다: {error.message}</div>;
    }

    return (
        <div>
          <h2>
          <Link to={'/orders/new'}>새로운 주문 넣기</Link></h2>
          <h2>주문 목록</h2>
          <button onClick={this.handleDownloadExcel}>엑셀로 다운로드</button>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
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
              </li>
            ))}
          </ul>
        </div>
      );
      
      
  }
}

export default OrderList;
