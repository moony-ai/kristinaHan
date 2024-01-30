import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../src/styles/OrderForm.css';

import OrdererInformationForm from '../components/OrdererInformationForm';
import ProductInformationForm from '../components/ProductInformationForm';
import PaymentInformationForm from '../components/PaymentInformationForm';
import AlterationInformationForm from '../components/AlterationInformationForm';

function OrderForm({ loggedInUserInfo }) {

    const { orderNumber } = useParams(); // URL에서 주문 번호 추출
    const navigate = useNavigate(); // 끝나고 목록으로 돌어가기 위해.

    const [orderData, setOrderData] = useState({
        // 주문상세 정보 
        ordererInfo: {},
        productInfo: {},
        paymentInfo: {},
        alterationInfo: {},

        // 주문 정보
        creator: null,            // 작성자
        creationTime: null,       // 최초 작성 시간
        lastModifiedTime: null,   // 최근 수정 시간
        modifier: null,           // 수정자
        orderNumber: null,        // 주문서 번호
        orderStatus: '상담',    // 주문 상태
        deliveryMethod: '배송', // 배송 방법
    });

    const handleCreatorChange = (event) => {
        const newCreator = event.target.value; // 입력된 새로운 작성자 이름
        setOrderData({
            ...orderData, // 기존 데이터를 복사
            creator: newCreator // 새로운 작성자 이름으로 업데이트
        });
    };

    // 주문 상태 옵션
    const orderStatusOptions = [
        '상담', '주문', '수선', '수선입고', '배송중', '배송완료', '수령완료'
    ];

    useEffect(() => {
        // 주문 번호가 존재하면 서버에서 주문 데이터 불러오기
        if (orderNumber) {
            axios.get(`https://supreme-space-fiesta-657q57pxqxg3r6px-8000.app.github.dev/api/v1/orders/${orderNumber}/`)
                .then(response => {
                    const data = response.data;
                    console.log(data)
                })
                .catch(error => {
                    console.error('주문 데이터 불러오기 실패:', error);
                });
        } else if (loggedInUserInfo) {
            // 주문 번호가 없고 로그인 사용자 정보가 있는 경우, 새 주문서 작성 로직
            setOrderData(prev => ({
                ...prev,
                creator: loggedInUserInfo.name,
                creationTime: new Date().toLocaleString(),
                lastModifiedTime: new Date().toLocaleString(),
                modifier: loggedInUserInfo.name,
                orderNumber: '주문번호 생성 로직'
            }));
        }
    }, [orderNumber, loggedInUserInfo]);

    const handleStatusChange = (status) => {
        setOrderData({ ...orderData, orderStatus: status });
    };

    const handleChange = (e) => {
        setOrderData({ ...orderData, [e.target.name]: e.target.value });
    };

    const updateOrdererInfo = (info) => {
        setOrderData(prevData => ({ ...prevData, ordererInfo: info }));
    };

    const updateProductInfo = (info) => {
        setOrderData(prevData => ({ ...prevData, productInfo: info }));
    };

    const updatePaymentInfo = (info) => {
        setOrderData(prevData => ({ ...prevData, paymentInfo: info }));
    };

    const updateAlterationInfo = (info) => {
        setOrderData(prevData => ({ ...prevData, alterationInfo: info }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // 현재 시간을 ISO 형식으로 가져오기
        const currentTime = new Date().toISOString();
        // 12자리 무작위 문자열 생성
        const randomString = Math.random().toString(36).substring(2, 14);

        orderData.creationTime = currentTime
        orderData.orderNumber = randomString

        const depositKRW = parseFloat(orderData.paymentInfo.depositKRW) || 0;
        const depositJPY = parseFloat(orderData.paymentInfo.depositJPY) || 0;
        const depositUSD = parseFloat(orderData.paymentInfo.depositUSD) || 0;

        // 필수 항목 목록
        const requiredFields = {
            'ordererInfo.ordererName': '주문자 이름',
            'ordererInfo.affiliation': '소속',
            'ordererInfo.contact': '연락처',
            'creator': '작성자',
            'paymentInfo.payerName': '결제자 이름',
        };

        // 필수 항목 검사
        const missingFieldNames = Object.keys(requiredFields).filter(fieldKey => {
            const keys = fieldKey.split('.');
            let value = orderData;
            for (let key of keys) {
                if (value[key] === undefined || value[key] === '' || value[key] === null) {
                    return true;
                }
                value = value[key];
            }
            return false;
        });

        // 누락된 필수 항목의 설명들을 배열로 추출
        const missingFieldDescriptions = missingFieldNames.map(fieldName => requiredFields[fieldName]);

        // 필수 항목 누락 시 경고 메시지
        if (missingFieldDescriptions.length > 0) {
            alert('다음 필수 항목이 누락되었습니다: ' + missingFieldDescriptions.join(', '));
            return; // 폼 제출 중단
        }

        // 클라이언트 상태를 서버 모델에 맞게 매핑
        const mappedData = {
            ordererName: orderData.ordererInfo.ordererName, // 필수
            affiliation: orderData.ordererInfo.affiliation, // 필수
            contact: orderData.ordererInfo.contact, // 필수
            address: orderData.ordererInfo.address,
            orderStatus: orderData.orderStatus, // 필수
            orderNumber: orderData.orderNumber, // 필수
            creator: orderData.creator, // 필수
            creationTime: orderData.creationTime, // 필수
            modifier: orderData.modifier,
            lastModifiedTime: orderData.lastModifiedTime,
            deliveryMethod: orderData.deliveryMethod, // 필수
            tuxedoType: orderData.productInfo.tuxedoType,
            jacketSize: orderData.productInfo.jacketSize,
            pantsSize: orderData.productInfo.pantsSize,
            shirtSize: orderData.productInfo.shirtSize,
            dressType: orderData.productInfo.dressType,
            dressSize: orderData.productInfo.dressSize,
            ringSizeMen: orderData.productInfo.ringSizeMen,
            ringSizeWomen: orderData.productInfo.ringSizeWomen,
            necklaceSize: orderData.productInfo.necklaceSize,
            earringType: orderData.productInfo.earringType,
            bowtie: orderData.productInfo.bowtie,
            payerName: orderData.paymentInfo.payerName, // 필수
            relationToOrderer: orderData.paymentInfo.relationToOrderer, // 필수
            totalAmount: orderData.paymentInfo.totalAmount, // 필수
            depositKRW: depositKRW,
            depositJPY: depositJPY,
            depositUSD: depositUSD,
            totalDeposit: orderData.paymentInfo.totalDeposit,
            balance: orderData.paymentInfo.balance,
            depositDate: orderData.paymentInfo.depositDate,
            balanceDate: orderData.paymentInfo.balanceDate,
            dressBackWidth: orderData.alterationInfo.dressBackWidth,
            dressLength: orderData.alterationInfo.dressLength,
            jacketSleeveLength: orderData.alterationInfo.jacketSleeveLength,
            jacketLength: orderData.alterationInfo.jacketLength,
            pantsWaistLength: orderData.alterationInfo.pantsWaistLength,
            pantsLength: orderData.alterationInfo.pantsLength,
            alterationMemo: orderData.alterationInfo.alterationMemo,
        };

        console.log(mappedData)

        // 서버에 POST 요청 보내기
        axios.post('https://server-6kol.onrender.com/api/v1/orders/', mappedData)
            .then(response => {
                alert('주문이 성공적으로 제출되었습니다:', response.data);
                // 성공적인 제출 후 처리 로직
                navigate('/');
            })
            .catch(error => {
                alert('주문 제출 중 오류 발생:', error);
                // 오류 처리 로직
            });
    };


    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <fieldset>
                <legend>주문 정보</legend>
                <div>작성자*: <input
                    type="text"
                    placeholder='작성자를 입력하세요.'
                    value={orderData.creator}
                    onChange={handleCreatorChange}
                /></div>

                <div>
                    주문 상태*:
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
                    수령 방법*:
                    <select className="form-select" name="deliveryMethod" value={orderData.deliveryMethod} onChange={handleChange}>
                        <option value="배송">배송</option>
                        <option value="직접수령">현장 수령</option>
                        <option value="방문수령">매장 수령</option>
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
                    <ProductInformationForm updateOrderInfo={updateProductInfo} />
                </div>
            </fieldset>

            <fieldset>
                <legend>결제 정보</legend>
                <div>
                    <PaymentInformationForm productInfo={orderData.productInfo} updatePaymentInfo={updatePaymentInfo} />
                </div>
            </fieldset>

            <fieldset>
                <legend>수선 정보</legend>
                <div>
                    <AlterationInformationForm updateAlterationInfo={updateAlterationInfo} />
                </div>
            </fieldset>
            <button className="form-button" type="submit"> 주문 제출</button>
        </form>
    );

}

export default OrderForm;
