import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../src/styles/OrderForm.css';

function OrderForm({ loggedInUserInfo }) {

    const { orderNumber } = useParams(); // URL에서 주문 번호 추출

    const [orderData, setOrderData] = useState({
        buyerInfo: {},
        productInfo: {},
        paymentInfo: {},
        alterationInfo: {},
        orderInfo: {},
    });

    
    // 주문 정보 상태
    const [orderInfo, SetOrderInfo] = useState({
        creator: '작성자',            // 작성자
        creationTime: null,       // 최초 작성 시간
        lastModifiedTime: null,   // 최근 수정 시간
        modifier: null,           // 수정자
        orderNumber: null,        // 주문서 번호
        orderStatus: '상담',    // 주문 상태
        deliveryMethod: '배송', // 배송 방법
    })

    const orderInfoHandleChange = (e) => {
        SetOrderInfo({ ...orderInfo, [e.target.name]: e.target.value });
    };

    // 주문자 정보 상태
    const [ordererInfo, setOrdererInfo] = useState({
        ordererName: null,
        contact: null,
        affiliation: null,
        address: null
    });

    const ordererInfoHandleChange = (e) => {
        setOrdererInfo({ ...ordererInfo, [e.target.name]: e.target.value });
    }

    // 제품 정보 상태
    const [productInfo, setProductInfo] = useState({
        tuxedoType: '자켓 (R-Peaked)', // 턱시도 종류
        jacketSize: null,
        pantsSize: null,
        shirtSize: null,
        dressType: '드레스 (R)', // 드레스 타입 
        dressSize: null, // 드레스 사이즈
        ringSizeMen: null,
        ringSizeWomen: null,
        necklaceSize: null, // 목걸이 사이즈
        earringType: null, // 귀걸이 종류
        bowtie: false // 보타이 유무
        // 추가적인 제품 정보 상태 초기화
    });

    const productInfoHandleChange = (e) => {
        setProductInfo({ ...productInfo, [e.target.name]: e.target.value });
    }

    const getPantsShirtSizeOptions = () => {
        return productInfo.tuxedoType.includes("S-Peaked") ? "S" : "R";
    };

    // 결제 정보 상태
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
        // 추가적인 결제 정보 상태 초기화
    });

    const paymentInfoHandleChange = (e) => {
        setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
    };

    // 수선 정보 상태
    const [alterationInfo, setAlterationInfo] = useState({
        dressBackWidth: '', // 드레스 뒷품
        dressLength: '',    // 드레스 기장
        jacketSleeveLength: '',   // 자켓 소매
        jacketLength: '',   // 자켓 기장
        pantsWaistLength: '',     // 바지 허리
        pantsLength: ''     // 바지 기장
        // 추가적인 수선 정보 상태 초기화
    });

    const alterationInfoHandleChange = (e) => {
        setAlterationInfo({ ...alterationInfo, [e.target.name]: e.target.value });
    };

    // 주문 상태 옵션
    const orderStatusOptions = [
        '상담', '주문', '수선', '수선입고', '배송중', '배송완료', '수령완료'
    ];

    // 사이즈 정보
    const sizeOptions = {
        "자켓 (R-Peaked)": ["100", "105", "110", "*115", "*120"],
        "자켓 (R-Shawl)": ["85", "90", "95", "100", "*105", "*110", "*115", "*120"],
        "자켓 (S-Peaked)": ["85", "90", "95", "100", "105", "*115", "*120"],
        "팬츠 (R)": ["*28", "30", "32", "34", "36", "38", "*40"],
        "셔츠 (R)": ["*85", "*90", "95", "100", "105", "110", "*115"],
        "팬츠 (S)": ["28", "29", "30", "31", "33", "35", "37", "39"],
        "셔츠 (S)": ["85", "90", "95", "100", "105", "110", "115"],
        "드레스 (R)": ["*44", "55", "66", "77", "88"],
        "드레스 (S)": ["43", "44", "54", "55", "65", "76"],
        "드레스 (RM)": ["*44", "*55", "*55반", "66", "77", "88", "99", "100", "105", "110"],
        "반지 (남)": ["*5", "*6", "*7", "*8", "*9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "*27", "*28", "*29", "*30"],
        "반지 (여)": ["*5", "*6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "*18", "*19", "*20", "*21", "*22", "*23", "*24", "*25", "26", "*27", "*28", "*29", "*30"],
        "구매안함": [""],
    };

    // 가격 정보
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

    //환율 정보
    const [exchangeRates, setExchangeRates] = useState({
        USD: 1300, // 원/달러 초기값
        JPY: 900,  // 원/엔 초기값
    });

    const handleExchangeRateChange = (e) => {
        setExchangeRates({ ...exchangeRates, [e.target.name]: e.target.value });
    };

    // 선수금 계산
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

    // 선수금 계산 반영
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

    //결제 총액 자동계산
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

    function setInfo(data) {
        // 각 상태 변수에 해당하는 데이터를 직접 대입합니다.
        SetOrderInfo({
          creator: data.creator,
          creationTime: data.creationTime,
          lastModifiedTime: data.lastModifiedTime,
          modifier: data.modifier,
          orderNumber: data.orderNumber,
          orderStatus: data.orderStatus,
          deliveryMethod: data.deliveryMethod,
        });
      
        setOrdererInfo({
          ordererName: data.ordererName,
          contact: data.contact,
          affiliation: data.affiliation,
          address: data.address,
        });
      
        setProductInfo({
          tuxedoType: data.tuxedoType,
          jacketSize: data.jacketSize,
          pantsSize: data.pantsSize,
          shirtSize: data.shirtSize,
          dressType: data.dressType,
          dressSize: data.dressSize,
          ringSizeMen: data.ringSizeMen,
          ringSizeWomen: data.ringSizeWomen,
          necklaceSize: data.necklaceSize,
          earringType: data.earringType,
          bowtie: data.bowtie,
        });
      
        setPaymentInfo({
          payerName: data.payerName,
          relationToOrderer: data.relationToOrderer,
          totalAmount: data.totalAmount,
          depositKRW: data.depositKRW,
          depositJPY: data.depositJPY,
          depositUSD: data.depositUSD,
          totalDeposit: data.totalDeposit,
          balance: data.balance,
          depositDate: data.depositDate,
          balanceDate: data.balanceDate,
        });
      
        setAlterationInfo({
          dressBackWidth: data.dressBackWidth,
          dressLength: data.dressLength,
          jacketSleeveLength: data.jacketSleeveLength,
          jacketLength: data.jacketLength,
          pantsWaistLength: data.pantsWaistLength,
          pantsLength: data.pantsLength,
        });
    }

    // DB 불러오기
    useEffect(() => {
        // 주문 번호가 존재하면 서버에서 주문 데이터 불러오기
        if (orderNumber) {
            axios.get(`https://supreme-space-fiesta-657q57pxqxg3r6px-8000.app.github.dev/api/v1/orders/${orderNumber}/`)
                .then(response => {
                    const data = response.data;
                    console.log(data)
                    // 데이터 넣기
                    setInfo(data)
                })
                .catch(error => {
                    console.error('주문 데이터 불러오기 실패:', error);
                });
        } 
    }, [orderNumber]);

    // 수정요청 
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

        // 클라이언트 상태를 서버 모델에 맞게 매핑
        const mappedData = {
            ordererName: orderData.ordererInfo.ordererName,
            affiliation: orderData.ordererInfo.affiliation,
            contact: orderData.ordererInfo.contact,
            address: orderData.ordererInfo.address,
            orderStatus: orderData.orderStatus,
            orderNumber: orderData.orderNumber,
            creator: orderData.creator,
            creationTime: orderData.creationTime,
            modifier: orderData.modifier,
            lastModifiedTime: orderData.lastModifiedTime,
            deliveryMethod: orderData.deliveryMethod,
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
            payerName: orderData.paymentInfo.payerName,
            relationToOrderer: orderData.paymentInfo.relationToOrderer,
            totalAmount: orderData.paymentInfo.totalAmount,
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
        };

        console.log(mappedData)

        // 서버에 POST 요청 보내기
        axios.post('https://supreme-space-fiesta-657q57pxqxg3r6px-8000.app.github.dev/api/v1/orders/', mappedData)
            .then(response => {
                console.log('주문이 성공적으로 제출되었습니다:', response.data);
                // 성공적인 제출 후 처리 로직
            })
            .catch(error => {
                console.error('주문 제출 중 오류 발생:', error);
                // 오류 처리 로직
            });
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            {/* 주문 정보 */}
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
                                checked={orderInfo.orderStatus === status}
                                onChange={orderInfoHandleChange}
                            />
                            {status}
                        </label>
                    ))}
                </div>
                <label className="form-label">
                    수령 방법:
                    <select className="form-select" name="deliveryMethod" value={orderInfo.deliveryMethod} onChange={orderInfoHandleChange}>
                        <option value="배송">배송</option>
                        <option value="직접수령">직접 수령</option>
                        <option value="방문수령">방문 수령</option>
                    </select>
                </label>
            </fieldset>
            {/* 고객 정보 */}
            <fieldset>
                <legend>고객 정보</legend>
                <div className="orderer-info-table">
                    <table >
                        <tbody>
                            {/* 주문자 이름 */}
                            <tr>
                                <td>주문자 이름:</td>
                                <td>
                                    <input
                                        type="text"
                                        name="ordererName"
                                        value={ordererInfo.ordererName}
                                        onChange={ordererInfoHandleChange}
                                    />
                                </td>
                                <td>연락처:</td>
                                <td>
                                    <input
                                        type="text"
                                        name="contact"
                                        value={ordererInfo.contact}
                                        onChange={ordererInfoHandleChange}
                                    />
                                </td>
                            </tr>

                            {/* 소속 */}
                            <tr>
                                <td>소속:</td>
                                <td>
                                    <input
                                        type="text"
                                        name="affiliation"
                                        value={ordererInfo.affiliation}
                                        onChange={ordererInfoHandleChange}
                                    />
                                </td>
                            </tr>

                            {/* 배송지 주소 - 수령 방법이 '배송'인 경우에만 표시 */}
                            {orderInfo.deliveryMethod === "배송" && (
                                <tr>
                                    <td>배송지 주소:</td>
                                    <td>
                                        <input
                                            type="text"
                                            name="address"
                                            value={ordererInfo.address}
                                            onChange={ordererInfoHandleChange}
                                        />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </fieldset>
            {/* 제품정보 */}
            <fieldset>
                <legend>제품 정보</legend>
                <div>
                    <table>
                        <tbody>
                            {/* 턱시도 섹션 */}
                            <tr>
                                <td colSpan="4"><strong>턱시도</strong></td>
                            </tr>
                            <tr>
                                <td>턱시도 유형:</td>
                                <td>
                                    <select name="tuxedoType" value={productInfo.tuxedoType} onChange={productInfoHandleChange}>
                                        <option value="자켓 (R-Peaked)">자켓 (R-Peaked)</option>
                                        <option value="자켓 (R-Shawl)">자켓 (R-Shawl)</option>
                                        <option value="자켓 (S-Peaked)">자켓 (S-Peaked)</option>
                                        <option value="구매안함">구매안함</option>
                                    </select>
                                </td>
                                <td>자켓 사이즈:</td>
                                <td>
                                    <select name="jacketSize" value={productInfo.jacketSize} onChange={productInfoHandleChange}>
                                        {(productInfo.tuxedoType === "구매안함" ? "" : sizeOptions[productInfo.tuxedoType].map(size => (
                                            <option key={size} value={size}>{size}</option>
                                        )))}
                                        <option value="">구매안함</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>팬츠 사이즈:</td>
                                <td>
                                    <select name="pantsSize" value={productInfo.pantsSize} onChange={productInfoHandleChange}>
                                        {(productInfo.tuxedoType === "구매안함" ? "" : sizeOptions[`팬츠 (${getPantsShirtSizeOptions()})`].map(size => (
                                            <option key={size} value={size}>{size}</option>
                                        )))}
                                        <option value="">구매안함</option>
                                    </select>
                                </td>
                                <td>셔츠 사이즈:</td>
                                <td>
                                    <select name="shirtSize" value={productInfo.shirtSize} onChange={productInfoHandleChange}>
                                        {(productInfo.tuxedoType === "구매안함" ? "" : sizeOptions[`셔츠 (${getPantsShirtSizeOptions()})`].map(size => (
                                            <option key={size} value={size}>{size}</option>
                                        )))}
                                        <option value="">구매안함</option>
                                    </select>
                                </td>
                            </tr>

                            {/* 드레스 섹션 */}
                            <tr>
                                <td colSpan="4"><strong>드레스</strong></td>
                            </tr>
                            <tr>
                                <td>드레스 타입:</td>
                                <td>
                                    <select name="dressType" value={productInfo.dressType} onChange={productInfoHandleChange}>
                                        <option value="드레스 (R)">드레스 (R)</option>
                                        <option value="드레스 (S)">드레스 (S)</option>
                                        <option value="드레스 (RM)">드레스 (RM)</option>
                                        <option value="구매안함">구매안함</option>
                                    </select>
                                </td>
                                <td>드레스 사이즈:</td>
                                <td>
                                    <select name="dressSize" value={productInfo.dressSize} onChange={productInfoHandleChange}>
                                        {(productInfo.dressType === "구매안함" ? "" : sizeOptions[productInfo.dressType].map(size => (
                                            <option key={size} value={size}>{size}</option>
                                        )))}
                                        <option value="">구매안함</option>
                                    </select>
                                </td>
                            </tr>

                            {/* 기타 섹션 */}
                            <tr>
                                <td colSpan="4"><strong>기타</strong></td>
                            </tr>
                            <tr>
                                <td>남성 반지 사이즈:</td>
                                <td>
                                    <select name="ringSizeMen" value={productInfo.ringSizeMen} onChange={productInfoHandleChange}>
                                        <option value="">구매안함</option>
                                        {sizeOptions["반지 (남)"].map(size => (
                                            <option key={size} value={size}>{size}</option>
                                        ))}
                                    </select>
                                </td>
                                <td>여성 반지 사이즈:</td>
                                <td>
                                    <select name="ringSizeWomen" value={productInfo.ringSizeWomen} onChange={productInfoHandleChange}>
                                        <option value="">구매안함</option>
                                        {sizeOptions["반지 (여)"].map(size => (
                                            <option key={size} value={size}>{size}</option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>목걸이 사이즈:</td>
                                <td>
                                    <select name="necklaceSize" value={productInfo.necklaceSize} onChange={productInfoHandleChange}>
                                        <option value="">구매안함</option>
                                        <option value="S">S</option>
                                        <option value="M">M</option>
                                    </select>
                                </td>
                                <td>귀걸이 종류:</td>
                                <td>
                                    <select name="earringType" value={productInfo.earringType} onChange={productInfoHandleChange}>
                                        <option value="">구매안함</option>
                                        <option value="귀찌">귀찌</option>
                                        <option value="귀걸이">귀걸이</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>보타이 여부:</td>
                                <td colSpan="3">
                                    <input
                                        type="checkbox"
                                        name="bowtie"
                                        checked={productInfo.bowtie || false}
                                        onChange={productInfoHandleChange}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </fieldset>
            {/* 결제정보 */}
            <fieldset>
                <legend>결제 정보</legend>
                <div>
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
                                        onChange={paymentInfoHandleChange}
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
                                        onChange={paymentInfoHandleChange}
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
                                        onChange={paymentInfoHandleChange}
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
                                        onChange={paymentInfoHandleChange}
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
                </div>
            </fieldset>
            {/* 수선정보 */}
            <fieldset>
                <legend>수선 정보</legend>
                <div>
                    <table>
                        <tbody>
                            {/* 드레스 뒷품 */}
                            <tr>
                                <td>드레스 뒷품:</td>
                                <td>
                                    <input
                                        type="text"
                                        name="dressBackWidth"
                                        value={alterationInfo.dressBackWidth}
                                        onChange={alterationInfoHandleChange}
                                    />
                                </td>
                                <td>드레스 기장:</td>
                                <td>
                                    <input
                                        type="text"
                                        name="dressLength"
                                        value={alterationInfo.dressLength}
                                        onChange={alterationInfoHandleChange}
                                    />
                                </td>
                            </tr>

                            {/* 자켓 소매 */}
                            <tr>
                                <td>자켓 소매:</td>
                                <td>
                                    <input
                                        type="text"
                                        name="jacketSleeveLength"
                                        value={alterationInfo.jacketSleeveLength}
                                        onChange={alterationInfoHandleChange}
                                    />
                                </td>
                                <td>자켓 기장:</td>
                                <td>
                                    <input
                                        type="text"
                                        name="jacketLength"
                                        value={alterationInfo.jacketLength}
                                        onChange={alterationInfoHandleChange}
                                    />
                                </td>
                            </tr>

                            {/* 바지 허리 */}
                            <tr>
                                <td>바지 허리:</td>
                                <td>
                                    <input
                                        type="text"
                                        name="pantsWaistLength"
                                        value={alterationInfo.pantsWaistLength}
                                        onChange={alterationInfoHandleChange}
                                    />
                                </td>
                                <td>바지 기장:</td>
                                <td>
                                    <input
                                        type="text"
                                        name="pantsLength"
                                        value={alterationInfo.pantsLength}
                                        onChange={alterationInfoHandleChange}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </fieldset>

            <button className="form-button" type="submit"> 주문 제출</button>
        </form>
    );

}

export default OrderForm;
