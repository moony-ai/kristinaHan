import React, { useState, useEffect } from 'react';

function PaymentInformationForm({ orderInfo, updatePaymentInfo }) {
    const [paymentInfo, setPaymentInfo] = useState({
        payerName: '',            // 결제자 이름
        relationToOrderer: '본인', // 주문자와의 관계
        paymentMethod: '현금',     // 결제 방법
        currency: '원화',          // 결제 화폐
        selectedProducts: {},       // 결제할 상품 리스트
        totalAmount: 0,          // 결제 총액
        deposit: '',              // 선수금
        balance: ''               // 잔금
    });

    const productPrices = {
        jacket: 1500000, // 예시 가격
        pants: 1000000,
        shirt: 100000,
        dress: 2000000,
        ringMen: 150000,
        ringWomen: 150000,
        necklace: 200000,
        earring: 200000,
        bowtie: 300000,
    };

    const handleChange = (e) => {
        setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        let total = 0;
        if (orderInfo.jacketSize) total += productPrices.jacket;
        if (orderInfo.pantsSize) total += productPrices.pants;
        if (orderInfo.shirtSize) total += productPrices.shirt;
        if (orderInfo.dressSize) total += productPrices.dress;
        if (orderInfo.ringSizeMen) total += productPrices.ringMen;
        if (orderInfo.ringSizeWomen) total += productPrices.ringWomen;
        if (orderInfo.necklaceSize) total += productPrices.necklace;
        if (orderInfo.earringType) total += productPrices.earring;
        if (orderInfo.bowtie) total += productPrices.bowtie;

        setPaymentInfo(prev => ({ ...prev, totalAmount: total, balance: total - (prev.deposit || 0) }));
    }, [orderInfo, paymentInfo.deposit]);

    const handleDepositChange = (e) => {
        const depositValue = e.target.value;
        setPaymentInfo(prev => ({ ...prev, deposit: depositValue, balance: prev.totalAmount - depositValue }));
    };
    useEffect(() => {
        updatePaymentInfo(paymentInfo);
    }, [paymentInfo, updatePaymentInfo]);

    return (
        <div>
            <label>
                결제자 이름:
                <input 
                    type="text" 
                    name="payerName" 
                    value={paymentInfo.payerName} 
                    onChange={handleChange} 
                />
            </label>
            <label>
                주문자와의 관계:
                <select 
                    name="relationToOrderer" 
                    value={paymentInfo.relationToOrderer} 
                    onChange={handleChange}
                >
                    <option value="본인">본인</option>
                    <option value="부">부</option>
                    <option value="모">모</option>
                    <option value="형제">형제</option>
                    <option value="배우자">배우자</option>
                    <option value="기타">기타</option>
                </select>
            </label>
            <label>
                결제 방법:
                <select 
                    name="paymentMethod" 
                    value={paymentInfo.paymentMethod} 
                    onChange={handleChange}
                >
                    <option value="현금">현금</option>
                    <option value="카드">카드</option>
                    <option value="기타">기타</option>
                </select>
            </label>
            <label>
                결제 화폐:
                <select 
                    name="currency" 
                    value={paymentInfo.currency} 
                    onChange={handleChange}
                >
                    <option value="원화">원화</option>
                    <option value="엔화">엔화</option>
                    <option value="달러">달러</option>
                    <option value="기타">기타</option>
                </select>
            </label>
            <label>
                결제 총액:
                <input 
                    type="text" 
                    name="totalAmount" 
                    value={paymentInfo.totalAmount} 
                    readOnly 
                />
            </label>
            <label>
                선수금:
                <input 
                    type="text" 
                    name="deposit" 
                    value={paymentInfo.deposit} 
                    onChange={handleDepositChange} 
                />
            </label>
            <label>
                잔금:
                <input 
                    type="text" 
                    name="balance" 
                    value={paymentInfo.balance} 
                    readOnly 
                />
            </label>
        </div>
    );
}

export default PaymentInformationForm;
