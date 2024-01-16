import React, { useState } from 'react';
import OrdererInformationForm from '../src/components/OrdererInformationForm';
import OrderInformationForm from '../src/components/OrderInformationForm';

function OrderForm() {
    const [orderData, setOrderData] = useState({
        ordererInfo: {}, // 주문자 정보
        orderInfo: {},   // 주문 정보
        // paymentInfo: {}, // 결제 정보
        // alterationInfo: {} // 수선 정보
    });

    const updateOrdererInfo = (info) => {
        setOrderData({ ...orderData, ordererInfo: info });
    };

    const updateOrderInfo = (info) => {
        setOrderData({ ...orderData, orderInfo: info });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // 서버로 orderData 전송 로직
        console.log('Order Data:', orderData);
        // 예: axios.post('/api/orders', orderData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <OrdererInformationForm updateOrdererInfo={updateOrdererInfo} />
            <OrderInformationForm updateOrderInfo={updateOrderInfo} />
            {/* 다른 폼 컴포넌트들 추가 예정 */}
            {/* <PaymentInformationForm ... />
               <AlterationInformationForm ... /> */}

            <button type="submit">주문 제출</button>
        </form>
    );
}

export default OrderForm;
