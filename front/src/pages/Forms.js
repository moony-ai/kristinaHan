import React, { useState, useEffect } from 'react';
import '../styles/OrderForm.css';

import OrdererInformationForm from '../../src/components/OrdererInformationForm';
import ProdectInformationForm from '../../src/components/ProdectInformationForm';
import PaymentInformationForm from '../../src/components/PaymentInformationForm';
import AlterationInformationForm from '../../src/components/AlterationInformationForm';

function Forms({ loggedInUserInfo }) {
    const [orderData, setOrderData] = useState({
        // 주문상세 정보 
        ordererInfo: {},
        orderInfo: {},
        paymentInfo: {},
        alterationInfo: {},

        // 주문 정보
        creator: '',            // 작성자
        creationTime: '',       // 최초 작성 시간
        lastModifiedTime: '',   // 최근 수정 시간
        modifier: '',           // 수정자
        orderNumber: '',        // 주문서 번호
        orderStatus: '상담',    // 주문 상태
        deliveryMethod: '배송', // 배송 방법
    });

    // 주문 상태 옵션
    const orderStatusOptions = [
        '상담', '주문', '수선', '수선입고', '배송중', '배송완료', '수령완료'
    ];

    useEffect(() => {
        if (loggedInUserInfo) {
            setOrderData(prev => ({
                ...prev,
                creator: loggedInUserInfo.name,
                creationTime: new Date().toLocaleString(),
                lastModifiedTime: new Date().toLocaleString(),
                modifier: loggedInUserInfo.name,
                orderNumber: '주문번호 생성 로직'
            }));
        }
        // DB에서 주문 데이터 불러오기
        // 예: axios.get('/api/order/{id}').then(response => setOrderData(response.data));
    }, [loggedInUserInfo]);

    const handleStatusChange = (status) => {
        setOrderData({ ...orderData, orderStatus: status });
    };

    const handleChange = (e) => {
        setOrderData({ ...orderData, [e.target.name]: e.target.value });
    };

    const updateOrdererInfo = (info) => {
        setOrderData({ ...orderData, ordererInfo: info });
    };

    const updateProductInfo = (info) => {
        setOrderData({ ...orderData, orderInfo: info });
    };

    const updatePaymentInfo = (info) => {
        setOrderData({ ...orderData, paymentInfo: info });
    };

    const updateAlterationInfo = (info) => {
        setOrderData({ ...orderData, alterationInfo: info });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // 서버로 orderData 전송 로직
        console.log('Order Data:', orderData);
        // 예: axios.post('/api/orders', orderData);
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <fieldset>
                <legend>주문 정보</legend>
                <div>작성자: {orderData.creator}</div>
                <div>최초 작성 시간: {orderData.creationTime}</div>
                <div>최근 수정 시간: {orderData.lastModifiedTime}</div>
                <div>수정자: {orderData.modifier}</div>
                <div>주문서 번호: {orderData.orderNumber}</div>

                <div>
                    주문 상태:
                    {orderStatusOptions.map((status, index) => (
                        <label key={index}>
                            <input
                                type="radio"
                                name="orderStatus"
                                value={status}
                                checked={orderData.orderStatus === status}
                                onChange={() => handleStatusChange(status)}
                            />
                            {status}
                        </label>
                    ))}
                </div>
                <label className="form-label">
                    수령 방법:
                    <select className="form-select" name="deliveryMethod" value={orderData.deliveryMethod} onChange={handleChange}>
                        <option value="배송">배송</option>
                        <option value="직접수령">직접 수령</option>
                        <option value="방문수령">방문 수령</option>
                    </select>
                </label>
            </fieldset>

            <fieldset>
                <legend>고객 정보</legend>
                <div>
                    <OrdererInformationForm updateOrdererInfo={updateOrdererInfo} deliveryMethod={orderData.deliveryMethod} />
                </div>
            </fieldset>

            <fieldset>
                <legend>제품 정보</legend>
                <div>
                    <ProdectInformationForm updateOrderInfo={updateProductInfo} />
                </div>
            </fieldset>

            <fieldset>
                <legend>결제 정보</legend>
                <div>
                    <PaymentInformationForm orderInfo={orderData.orderInfo} updatePaymentInfo={updatePaymentInfo} />
                </div>
            </fieldset>

            <fieldset>
                <legend>수선 정보</legend>
                <div>
                    <AlterationInformationForm updateAlterationInfo={updateAlterationInfo} />
                </div>
            </fieldset>
            <button className="form-button" type="submit">주문 제출</button>
        </form>
    );

}

export default Forms;
