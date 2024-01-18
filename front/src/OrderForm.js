import React, { useState } from 'react';
import OrdererInformationForm from '../src/components/OrdererInformationForm';
import OrderInformationForm from '../src/components/OrderInformationForm';
import PaymentInformationForm from '../src/components/PaymentInformationForm';
import AlterationInformationForm from '../src/components/AlterationInformationForm';

function OrderForm() {
    const [orderData, setOrderData] = useState({
        ordererInfo: {},
        orderInfo: {},
        paymentInfo: {},
        alterationInfo: {}
    });

    const updateOrdererInfo = (info) => {
        setOrderData({ ...orderData, ordererInfo: info });
    };

    const updateOrderInfo = (info) => {
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
        <form onSubmit={handleSubmit}>
            <OrdererInformationForm updateOrdererInfo={updateOrdererInfo} />
            <OrderInformationForm updateOrderInfo={updateOrderInfo} />
            <PaymentInformationForm orderInfo={orderData.orderInfo} updatePaymentInfo={updatePaymentInfo} />
            <AlterationInformationForm updateAlterationInfo={updateAlterationInfo} />
            <button type="submit">주문 제출</button>
        </form>
    );
}

export default OrderForm;
