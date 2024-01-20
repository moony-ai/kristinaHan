import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '/workspaces/cristinaHan/front/src/styles/OrderForm.css';

function OrderForm({ loggedInUserInfo }) {
    const { orderNumber } = useParams(); // URL에서 주문 번호 추출

    const [data, setData] = useState({
        orderInfo: {},
        buyerInfo: {},
        productInfo: {},
        paymentInfo: {},
        alterationInfo: {},
        // 추가적인 주문 데이터 상태 초기화
    });

    // 주문자 정보 상태
    const [buyerInfo, setBuyerInfo] = useState({
        buyerName: '',
        contact: '',
        affiliation: '',
        address: ''
    });

    // 주문자 정보 업데이트 핸들러
    const handleBuyerInfoChange = (e) => {
        setBuyerInfo({ ...buyerInfo, [e.target.name]: e.target.value });
    };


    // 결제 정보 상태
    const [paymentInfo, setPaymentInfo] = useState({
        payerName: '',
        relationToOrderer: '본인',
        totalAmount: 0,
        depositKRW: '',
        depositJPY: '',
        depositUSD: '',
        totalDeposit: 0,
        balance: '',
        depositDate: '',
        balanceDate: '',
        // 추가적인 결제 정보 상태 초기화
    });

    // 제품 정보 상태
    const [productInfo, setProductInfo] = useState({
        tuxedoType: '자켓 (R-Peaked)',
        jacketSize: '',
        pantsSize: '',
        shirtSize: '',
        dressType: '드레스 (R)',
        dressSize: '',
        ringSizeMen: '',
        ringSizeWomen: '',
        necklaceSize: '',
        earringType: '',
        bowtie: false
        // 추가적인 제품 정보 상태 초기화
    });

    // 수선 정보 상태
    const [alterationInfo, setAlterationInfo] = useState({
        dressBackWidth: '',
        dressLength: '',
        jacketSleeveLength: '',
        jacketLength: '',
        pantsWaistLength: '',
        pantsLength: ''
        // 추가적인 수선 정보 상태 초기화
    });

    // 주문 데이터 상태
    const [orderInfo, SetOrderInfo] = useState({
        creator: '주문자',            // 작성자
        creationTime: null,       // 최초 작성 시간
        lastModifiedTime: null,   // 최근 수정 시간
        modifier: null,           // 수정자
        orderNumber: null,        // 주문서 번호
        orderStatus: '상담',    // 주문 상태
        deliveryMethod: '배송', // 배송 방법
    })

    // 상태 업데이트 및 기타 로직들
    return (
        <form>
            <fieldset>
                <legend>주문자 정보</legend>
                <div>
                    <label htmlFor="buyerName">주문자 이름:</label>
                    <input 
                        type="text" 
                        id="buyerName"
                        name="buyerName" 
                        value={buyerInfo.buyerName} 
                        onChange={handleBuyerInfoChange} 
                    />
                </div>
                <div>
                    <label htmlFor="contact">연락처:</label>
                    <input 
                        type="text" 
                        id="contact"
                        name="contact" 
                        value={buyerInfo.contact} 
                        onChange={handleBuyerInfoChange} 
                    />
                </div>
                <div>
                    <label htmlFor="affiliation">소속:</label>
                    <input 
                        type="text" 
                        id="affiliation"
                        name="affiliation" 
                        value={buyerInfo.affiliation} 
                        onChange={handleBuyerInfoChange} 
                    />
                </div>
                <div>
                    <label htmlFor="address">주소:</label>
                    <input 
                        type="text" 
                        id="address"
                        name="address" 
                        value={buyerInfo.address} 
                        onChange={handleBuyerInfoChange} 
                    />
                </div>
            </fieldset>
            {/* 추가적인 폼 요소와 버튼 */}
        </form>
    );
}

export default OrderForm;