import React, { useState, useEffect } from 'react';

function PaymentInformationForm({ productInfo, updatePaymentInfo }) {
    const [paymentInfo, setPaymentInfo] = useState({
        payerName: null,            // 결제자 이름
        relationToOrderer: '본인', // 주문자와의 관계
        totalAmount: 0,           // 결제 총액
        depositKRW: null,           // 선수금 (원화)
        depositJPY: null,           // 선수금 (엔화)
        depositUSD: null,           // 선수금 (달러)
        totalDeposit: 0,          // 선수금 총액 (환전된 원화)
        balance: null,               // 잔금
        depositDate: null, // 선수금 결제일
        balanceDate: null, // 잔금 결제일
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

    // 결제일
    const handleDateChange = (e) => {
        setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
    };

    //환율 관련 
    const [exchangeRates, setExchangeRates] = useState({
        USD: 1300, // 원/달러 초기값
        JPY: 900,  // 원/엔 초기값
    });

    const handleExchangeRateChange = (e) => {
        setExchangeRates({ ...exchangeRates, [e.target.name]: e.target.value });
    };

    const handleChange = (e) => {
        setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
    };

    const handleDepositChange = (e) => {
        const { name, value } = e.target;
        let numValue = Math.round(Number(value)) || 0; // 소수점 이하를 반올림
    
        // 갱신된 선수금을 계산
        let updatedDeposits = {
            ...paymentInfo,
            [name]: numValue
        };
    
        // 선수금 총액 계산
        const depositKRW = Number(updatedDeposits.depositKRW) || 0;
        const depositJPY = (Number(updatedDeposits.depositJPY) || 0) * Number(exchangeRates.JPY);
        const depositUSD = (Number(updatedDeposits.depositUSD) || 0) * Number(exchangeRates.USD);
        const totalDeposit = Math.round(depositKRW + depositJPY + depositUSD);
    
        // 선수금 총액이 결제 총액을 초과하는 경우 조정
        if (totalDeposit > paymentInfo.totalAmount) {
            numValue = numValue - (totalDeposit - paymentInfo.totalAmount) / (name === 'depositKRW' ? 1 : (name === 'depositJPY' ? Number(exchangeRates.JPY) : Number(exchangeRates.USD)));
            numValue = Math.round(numValue); // 반올림 처리
        }
    
        // 상태 업데이트
        setPaymentInfo(prev => ({
            ...prev,
            [name]: numValue.toString()
        }));
    };

    //결제 총액 자동계
    useEffect(() => {
        let total = 0;
        if (productInfo.jacketSize) total += productPrices.jacket;
        if (productInfo.pantsSize) total += productPrices.pants;
        if (productInfo.shirtSize) total += productPrices.shirt;
        if (productInfo.dressSize) total += productPrices.dress;
        if (productInfo.ringSizeMen) total += productPrices.ringMen;
        if (productInfo.ringSizeWomen) total += productPrices.ringWomen;
        if (productInfo.necklaceSize) total += productPrices.necklace;
        if (productInfo.earringType) total += productPrices.earring;
        if (productInfo.bowtie) total += productPrices.bowtie;

        setPaymentInfo(prev => ({ ...prev, totalAmount: total, balance: total - (prev.deposit || 0) }));
    }, [productInfo]);

    useEffect(() => {
        const depositKRW = Number(paymentInfo.depositKRW) || 0;
        const depositJPY = (Number(paymentInfo.depositJPY) || 0) * Number(exchangeRates.JPY);
        const depositUSD = (Number(paymentInfo.depositUSD) || 0) * Number(exchangeRates.USD);
        const totalDeposit = Math.min(depositKRW + depositJPY + depositUSD, paymentInfo.totalAmount);

        setPaymentInfo(prev => ({
            ...prev,
            totalDeposit,
            balance: prev.totalAmount - totalDeposit
        }));
    }, [paymentInfo.depositKRW, paymentInfo.depositJPY, paymentInfo.depositUSD, paymentInfo.totalAmount, exchangeRates]);

    useEffect(() => {
        updatePaymentInfo(paymentInfo);
    }, [paymentInfo, updatePaymentInfo]);

    return (
        <table className="payment-info-table">
            <tbody>
                {/* 결제자 이름 */}
                <tr>
                    <td>결제자 이름:</td>
                    <td>
                        <input
                            type="text"
                            name="payerName"
                            value={paymentInfo.payerName}
                            onChange={handleChange}
                        />
                    </td>
                </tr>

                {/* 주문자와의 관계 */}
                <tr>
                    <td>주문자와의 관계:</td>
                    <td>
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
                    </td>
                </tr>
                <tr>
                    <td colSpan="3"><hr /></td>
                </tr>
                {/* 결제 총액 */}
                <tr>
                    <td>결제 총액:</td>
                    <td>
                        <input
                            type="text"
                            name="totalAmount"
                            value={paymentInfo.totalAmount}
                            readOnly
                        />
                    </td>
                    <td>원</td>
                </tr>
                <tr>
                    <td colSpan="3"><hr /></td>
                </tr>
                {/* 선수금 결제일 입력 필드 */}
                <tr>
                    <td>선수금 결제일:</td>
                    <td>
                        <input
                            type="date"
                            name="depositDate"
                            value={paymentInfo.depositDate}
                            onChange={handleDateChange}
                        />
                    </td>
                </tr>
                {/* 선수금 (원화) */}
                <tr>
                    <td>선수금 (원화):</td>
                    <td>
                        <input
                            type="number"
                            min="0"
                            name="depositKRW"
                            value={paymentInfo.depositKRW}
                            onChange={handleDepositChange}
                        />
                    </td>
                    <td>원</td>
                </tr>

                {/* 선수금 (엔화) */}
                <tr>
                    <td>선수금 (엔화):</td>
                    <td>
                        <input
                            type="number"
                            min="0"
                            name="depositJPY"
                            value={paymentInfo.depositJPY}
                            onChange={handleDepositChange}
                        />
                    </td>
                    <td>엔</td>
                    <td>엔화 환율:</td>
                    <td>
                        <input
                            type="number"
                            min="0"
                            name="JPY"
                            value={exchangeRates.JPY}
                            onChange={handleExchangeRateChange}
                        />
                    </td>
                    <td>원</td>
                </tr>

                {/* 선수금 (달러) */}
                <tr>
                    <td>선수금 (달러):</td>
                    <td>
                        <input
                            type="number"
                            min="0"
                            name="depositUSD"
                            value={paymentInfo.depositUSD}
                            onChange={handleDepositChange}
                        />
                    </td>
                    <td>달러</td>
                    <td>달러 환율:</td>
                    <td>
                        <input
                            type="number"
                            min="0"
                            name="USD"
                            value={exchangeRates.USD}
                            onChange={handleExchangeRateChange}
                        />
                    </td>
                    <td>원</td>
                </tr>
                <tr>
                    <td colspan="3"><hr /></td>
                </tr>
                {/* 선수금 총액 */}
                <tr>
                    <td>선수금 총액:</td>
                    <td>
                        <input
                            type="text"
                            name="totalDeposit"
                            value={paymentInfo.totalDeposit}
                            readOnly
                        />
                    </td>
                    <td>원</td>
                </tr>
                <tr>
                    <td colSpan="3"><hr /></td>
                </tr>
                {/* 잔금 결제일 입력 필드 */}
                <tr>
                    <td>잔금 결제일:</td>
                    <td>
                        <input
                            type="date"
                            name="balanceDate"
                            value={paymentInfo.balanceDate}
                            onChange={handleDateChange}
                        />
                    </td>
                </tr>
                {/* 잔금 */}
                <tr>
                    <td>잔금:</td>
                    <td>
                        <input
                            type="text"
                            name="balance"
                            value={paymentInfo.balance}
                            readOnly
                        />
                    </td>
                    <td>원</td>
                </tr>
                <tr>
                    <td colspan="3"><hr /></td>
                </tr>
            </tbody>
        </table>
    );

}

export default PaymentInformationForm;
