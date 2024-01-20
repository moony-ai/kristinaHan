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
        buyerName: null,
        contact: null,
        affiliation: null,
        address: null
    });

    // 주문자 정보 업데이트 핸들러
    const handleBuyerInfoChange = (e) => {
        setBuyerInfo({ ...buyerInfo, [e.target.name]: e.target.value });
    };

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
    });

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

    // 제품 정보 업데이트 핸들러
    const handleProductInfoChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProductInfo({
            ...productInfo,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    // 결제 정보 상태
    const [paymentInfo, setPaymentInfo] = useState({
        payerName: null,
        relationToOrderer: '본인',
        totalAmount: 0,
        depositKRW: null,
        depositJPY: null,
        depositUSD: null,
        totalDeposit: 0,
        balance: null,
        depositDate: null,
        balanceDate: null,
    });

    // 환율 정보 상태
    const [exchangeRates, setExchangeRates] = useState({
        USD: 1300, // 원/달러 초기값
        JPY: 900,  // 원/엔 초기값
    });

    // 기타 필요한 상태 (예: 제품 정보)
    // const [productInfo, setProductInfo] = useState({ /* ... */ });

    // 결제 정보 업데이트 핸들러
    const handlePaymentInfoChange = (e) => {
        setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
    };

    // 환율 정보 업데이트 핸들러
    const handleExchangeRateChange = (e) => {
        setExchangeRates({ ...exchangeRates, [e.target.name]: e.target.value });
    };

    // 선수금 계산 및 업데이트 핸들러
    const handleDepositChange = (e) => {
        const { name, value } = e.target;
        const numValue = parseFloat(value) || 0;

        // 환율을 이용한 선수금 계산
        const depositKRW = name === 'depositKRW' ? numValue : parseFloat(paymentInfo.depositKRW) || 0;
        const depositJPY = name === 'depositJPY' ? numValue * exchangeRates.JPY : (parseFloat(paymentInfo.depositJPY) || 0) * exchangeRates.JPY;
        const depositUSD = name === 'depositUSD' ? numValue * exchangeRates.USD : (parseFloat(paymentInfo.depositUSD) || 0) * exchangeRates.USD;

        const totalDeposit = depositKRW + depositJPY + depositUSD;

        // 상태 업데이트
        setPaymentInfo({
            ...paymentInfo,
            [name]: numValue.toString(),
            totalDeposit: totalDeposit,
            balance: paymentInfo.totalAmount - totalDeposit
        });
    };

    // 결제 총액 자동 계산
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

        setPaymentInfo(prev => ({
            ...prev,
            totalAmount: total,
            balance: total - prev.totalDeposit
        }));
    }, [productInfo]);


    // 결제 정보 상태와 환율 정보를 이용한 계산 로직
    useEffect(() => {
        const depositKRW = parseFloat(paymentInfo.depositKRW) || 0;
        const depositJPY = (parseFloat(paymentInfo.depositJPY) || 0) * exchangeRates.JPY;
        const depositUSD = (parseFloat(paymentInfo.depositUSD) || 0) * exchangeRates.USD;

        const totalDeposit = depositKRW + depositJPY + depositUSD;

        setPaymentInfo(prev => ({
            ...prev,
            totalDeposit: totalDeposit,
            balance: prev.totalAmount - totalDeposit
        }));
    }, [paymentInfo.depositKRW, paymentInfo.depositJPY, paymentInfo.depositUSD, exchangeRates]);

    const getPantsShirtSizeOptions = () => {
        return orderInfo.tuxedoType.includes("S-Peaked") ? "S" : "R";
    };

    // 수선 정보 상태
    const [alterationInfo, setAlterationInfo] = useState({
        dressBackWidth: null,
        dressLength: null,
        jacketSleeveLength: null,
        jacketLength: null,
        pantsWaistLength: null,
        pantsLength: null
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
            {/* 결제자 정보 */}
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
            {/* 제품정보 */}
            <fieldset>
                <table>
                    <tbody>
                        {/* 턱시도 섹션 */}
                        <tr>
                            <td colSpan="4"><strong>턱시도</strong></td>
                        </tr>
                        <tr>
                            <td>턱시도 유형:</td>
                            <td>
                                <select name="tuxedoType" value={productInfo.tuxedoType} onChange={handleProductInfoChange}>
                                    <option value="자켓 (R-Peaked)">자켓 (R-Peaked)</option>
                                    <option value="자켓 (R-Shawl)">자켓 (R-Shawl)</option>
                                    <option value="자켓 (S-Peaked)">자켓 (S-Peaked)</option>
                                    <option value="구매안함">구매안함</option>
                                </select>
                            </td>
                            <td>자켓 사이즈:</td>
                            <td>
                                <select name="jacketSize" value={productInfo.jacketSize} onChange={handleProductInfoChange}>
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
                                <select name="pantsSize" value={productInfo.pantsSize} onChange={handleProductInfoChange}>
                                    {(productInfo.tuxedoType === "구매안함" ? "" : sizeOptions[`팬츠 (${getPantsShirtSizeOptions()})`].map(size => (
                                        <option key={size} value={size}>{size}</option>
                                    )))}
                                    <option value="">구매안함</option>
                                </select>
                            </td>
                            <td>셔츠 사이즈:</td>
                            <td>
                                <select name="shirtSize" value={productInfo.shirtSize} onChange={handleProductInfoChange}>
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
                                <select name="dressType" value={productInfo.dressType} onChange={handleProductInfoChange}>
                                    <option value="드레스 (R)">드레스 (R)</option>
                                    <option value="드레스 (S)">드레스 (S)</option>
                                    <option value="드레스 (RM)">드레스 (RM)</option>
                                    <option value="구매안함">구매안함</option>
                                </select>
                            </td>
                            <td>드레스 사이즈:</td>
                            <td>
                                <select name="dressSize" value={productInfo.dressSize} onChange={handleProductInfoChange}>
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
                                <select name="ringSizeMen" value={productInfo.ringSizeMen} onChange={handleProductInfoChange}>
                                    <option value="">구매안함</option>
                                    {sizeOptions["반지 (남)"].map(size => (
                                        <option key={size} value={size}>{size}</option>
                                    ))}
                                </select>
                            </td>
                            <td>여성 반지 사이즈:</td>
                            <td>
                                <select name="ringSizeWomen" value={productInfo.ringSizeWomen} onChange={handleProductInfoChange}>
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
                                <select name="necklaceSize" value={productInfo.necklaceSize} onChange={handleProductInfoChange}>
                                    <option value="">구매안함</option>
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                </select>
                            </td>
                            <td>귀걸이 종류:</td>
                            <td>
                                <select name="earringType" value={productInfo.earringType} onChange={handleProductInfoChange}>
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
                                    onChange={handleProductInfoChange}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </fieldset>
            {/* 결제정보 */}
            <fieldset>
                <legend>결제 정보</legend>
                <div>
                    <label htmlFor="payerName">결제자 이름:</label>
                    <input
                        type="text"
                        id="payerName"
                        name="payerName"
                        value={paymentInfo.payerName || ''}
                        onChange={handlePaymentInfoChange}
                    />
                </div>

                {/* 주문자와의 관계 선택 필드 */}
                <div>
                    <label htmlFor="relationToOrderer">주문자와의 관계:</label>
                    <select
                        id="relationToOrderer"
                        name="relationToOrderer"
                        value={paymentInfo.relationToOrderer || '본인'}
                        onChange={handlePaymentInfoChange}
                    >
                        <option value="본인">본인</option>
                        <option value="부">부</option>
                        <option value="모">모</option>
                        <option value="형제">형제</option>
                        <option value="배우자">배우자</option>
                        <option value="기타">기타</option>
                    </select>
                </div>

                {/* 선수금 (원화) 입력 필드 */}
                <div>
                    <label htmlFor="depositKRW">선수금 (원화):</label>
                    <input
                        type="number"
                        id="depositKRW"
                        name="depositKRW"
                        value={paymentInfo.depositKRW || ''}
                        onChange={handleDepositChange}
                    />
                </div>

                {/* 선수금 (엔화) 및 엔화 환율 입력 필드 */}
                <div>
                    <label htmlFor="depositJPY">선수금 (엔화):</label>
                    <input
                        type="number"
                        id="depositJPY"
                        name="depositJPY"
                        value={paymentInfo.depositJPY || ''}
                        onChange={handleDepositChange}
                    />
                    <label htmlFor="JPY">엔화 환율:</label>
                    <input
                        type="number"
                        id="JPY"
                        name="JPY"
                        value={exchangeRates.JPY || ''}
                        onChange={handleExchangeRateChange}
                    />
                </div>

                {/* 선수금 (달러) 및 달러 환율 입력 필드 */}
                <div>
                    <label htmlFor="depositUSD">선수금 (달러):</label>
                    <input
                        type="number"
                        id="depositUSD"
                        name="depositUSD"
                        value={paymentInfo.depositUSD || ''}
                        onChange={handleDepositChange}
                    />
                    <label htmlFor="USD">달러 환율:</label>
                    <input
                        type="number"
                        id="USD"
                        name="USD"
                        value={exchangeRates.USD || ''}
                        onChange={handleExchangeRateChange}
                    />
                </div>

                {/* 선수금 결제일 입력 필드 */}
                <div>
                    <label htmlFor="depositDate">선수금 결제일:</label>
                    <input
                        type="date"
                        id="depositDate"
                        name="depositDate"
                        value={paymentInfo.depositDate || ''}
                        onChange={handlePaymentInfoChange}
                    />
                </div>

                {/* 잔금 결제일 입력 필드 */}
                <div>
                    <label htmlFor="balanceDate">잔금 결제일:</label>
                    <input
                        type="date"
                        id="balanceDate"
                        name="balanceDate"
                        value={paymentInfo.balanceDate || ''}
                        onChange={handlePaymentInfoChange}
                    />
                </div>
            </fieldset>
        </form>
    );
}

export default OrderForm;