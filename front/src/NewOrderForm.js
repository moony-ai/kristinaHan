import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../src/styles/OrderFormNew.css';
// import '../src/styles/Print.css';

function NewOrderForm({ loggedInUserInfo }) {

    const navigate = useNavigate(); // 끝나고 목록으로 돌어가기 위해.

    // 주문 정보 상태
    const [orderInfo, SetOrderInfo] = useState({
        creator: '',            // 작성자
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

    const handleCreatorChange = (event) => {
        const newCreator = event.target.value; // 입력된 새로운 작성자 이름
        SetOrderInfo({
            ...orderInfo, // 기존 데이터를 복사
            creator: newCreator // 새로운 작성자 이름으로 업데이트
        });
    };

    // 주문자 정보 상태
    const [ordererInfo, setOrdererInfo] = useState({
        ordererName: null,
        contact: null,
        affiliation: null,
        address: null,
        spouseName: null,
        spouseContact: null,
        spouseAffiliation: null,
    });

    const ordererInfoHandleChange = (e) => {
        setOrdererInfo({ ...ordererInfo, [e.target.name]: e.target.value });
    }


    // 제품 정보 상태
    const [productInfo, setProductInfo] = useState({
        tuxedoType: "구매안함", // 턱시도 종류
        jacketSize: null,
        pantsSize: null,
        shirtSize: null,
        dressType: "구매안함", // 드레스 타입 
        dressSize: null, // 드레스 사이즈
        ringSizeMen: null,
        ringSizeWomen: null,
        necklaceSize: null, // 목걸이 사이즈
        earringType: null, // 귀걸이 종류
        bowtie: false // 보타이 유무
        // 추가적인 제품 정보 상태 초기화
    });

    const productInfoHandleChange = (event) => {
        const { name, value } = event.target;

        setProductInfo(prevState => {
            let newState = { ...prevState, [name]: value };

            if (name === "tuxedoType") {
                if (value === "구매안함") {
                    newState = { ...newState, jacketSize: "", pantsSize: "", shirtSize: "" };
                }
            } else if (name === "dressType") {
                newState = { ...newState, dressSize: value === "구매안함" ? "" : prevState.dressSize };
            }

            return newState;
        });

        // console.log( "턱시토 맞춤여부 :", productInfo.tuxedoType, getPantsShirtSizeOptions())
    };

    const getPantsShirtSizeOptions = () => {
        return productInfo.tuxedoType.includes("(맞춤)") ? " (맞춤)" : "";
    };

    // 결제 정보 상태
    const [paymentInfo, setPaymentInfo] = useState({
        payerName: null,            // 결제자 이름
        relationToOrderer: '본인', // 주문자와의 관계
        totalAmount: "0",           // 결제 총액

        depositKRW: "0",           // 선수금 (원화)
        depositJPY: "0",           // 선수금 (엔화)
        depositUSD: "0",           // 선수금 (달러)
        totalDeposit: "0",          // 선수금 총액 (환전된 원화)

        balanceKRW: "0",
        balanceJPY: "0",
        balanceUSD: "0",
        totalBalance: "0",
        balance: "0",         // 최종잔금

        depositDate: null, // 선수금 결제일
        balanceDate: null, // 잔금 결제일

        paymentMethodDepositKRW: "현금",
        paymentMethodDepositJPY: "현금",
        paymentMethodDepositUSD: "현금",

        paymentMethodBalanceKRW: "현금",
        paymentMethodBalanceJPY: "현금",
        paymentMethodBalanceUSD: "현금",
    });

    const paymentInfoHandleChange = (e) => {
        setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
    };

    // 수선 정보 상태
    const [alterationInfo, setAlterationInfo] = useState({
        alteration1: '', // 드레스 뒷품
        alteration2: '', // 드레스 기장
        alteration3: '', // 자켓 소매
        alteration4: '', // 자켓 기장
        alteration5: '', // 자켓 폼
        alteration6: '', // 셔츠 목
        alteration7: '', // 셔츠 소매 
        alterationMemo: '' // 기장 메모
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
        "자켓 Peaked": ["85", "90", "95", "100", "*105", "110", "*115", "*120"],
        "자켓 Shawl": ["*85", "90", "95", "100", "*105", "*110", "*115", "*120"],
        "자켓OG Peaked (맞춤)": ["44","45","46","47","48","49", "50", "51", "52", "53", "54", "55", "56", "57", "58"],
        "자켓OG Shawl (맞춤)": ["44","45","46","47","48","49", "50", "51", "52", "53", "54", "55", "56", "57", "58"],
        "자켓AB Peaked (맞춤)": ["44","45","46","47","48","49", "50", "51", "52", "53", "54", "55", "56", "57", "58"],
        "자켓AB Shawl (맞춤)": ["44","45","46","47","48","49", "50", "51", "52", "53", "54", "55", "56", "57", "58"],
        "자켓 Peaked (맞춤)": ["44","45","46","47","48","49", "50", "51", "52", "53", "54", "55", "56", "57", "58"],
        "자켓 Shawl (맞춤)": ["44","45","46","47","48","49", "50", "51", "52", "53", "54", "55", "56", "57", "58"],
        "팬츠": ["28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "*40"],
        "팬츠 (맞춤)": ["44","45","46","47","48","49", "50", "51", "52", "53", "54", "55", "56", "57", "58"],
        "셔츠": ["85", "90", "95", "100", "105", "110", "115"],
        "셔츠 (맞춤)": ["44","45","46","47","48","49", "50", "51", "52", "53", "54", "55", "56", "57", "58"],
        "드레스 (R)": ["*44", "55", "66", "77", "88"],
        "드레스 (S)": ["43", "44", "54", "55", "65", "76"],
        "드레스 (Rw)": ["*44", "*55", "*55반", "66", "77", "88", "99", "100", "105", "110"],
        "반지 (남)": ["*5", "*6", "*7", "*8", "*9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "*27", "*28", "*29", "*30"],
        "반지 (여)": ["*5", "*6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "*18", "*19", "*20", "*21", "*22", "*23", "*24", "*25", "26", "*27", "*28", "*29", "*30"],
        "구매안함": [""],
    };

    // 가격 정보
    const productPrices = {
        jacket: 480000,
        jacketOG: 570000,
        jacketAB: 670000,
        pants: 240000,
        pantsOG: 220000,
        pantsAB: 320000,
        shirt: 80000,
        shirtOG: 110000,
        shirtAB: 110000,
        dress: 700000,
        ringMen: 800000,
        ringWomen: 800000,
        necklace: 800000,
        earring: 500000,
    };

    //환율 정보
    const [exchangeRates, setExchangeRates] = useState({
        USD: 800000 / 620, // 원/달러 초기값
        JPY: 80 / 9,  // 원/엔 초기값
    });


    //천단위 
    const formatNumberWithComma = (num) => {
        if (num === null || num === undefined || isNaN(num)) {
            return "";
        }
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    //결제 총액 자동계
    useEffect(() => {
        let total = 0;
        if (productInfo.jacketSize) {
            if (productInfo.tuxedoType.includes("OG")) {
                total += productPrices.jacketOG
            } else if (productInfo.tuxedoType.includes("AB")) {
                total += productPrices.jacketAB
            } else {
                total += productPrices.jacket
            }
        }
        if (productInfo.pantsSize) {
            if (productInfo.tuxedoType.includes("OG")) {
                total += productPrices.pantsOG;
            } else if (productInfo.tuxedoType.includes("AB")) {
                total += productPrices.pantsAB
            } else {
                total += productPrices.pants
            }
        }
        if (productInfo.shirtSize) {
            {
                if (productInfo.tuxedoType.includes("OG")) {
                    total += productPrices.shirtOG;
                } else if (productInfo.tuxedoType.includes("AB")) {
                    total += productPrices.shirtAB
                } else {
                    total += productPrices.shirt
                }
            }
        }
        if (productInfo.dressSize) total += productPrices.dress;
        if (productInfo.ringSizeMen) total += productPrices.ringMen;
        if (productInfo.ringSizeWomen) total += productPrices.ringWomen;
        if (productInfo.necklaceSize) total += productPrices.necklace;
        if (productInfo.earringType) total += productPrices.earring;
        if (productInfo.bowtie) total += productPrices.bowtie;

        setPaymentInfo(prev => ({ ...prev, totalAmount: total, balance: total - (prev.totalDeposit || 0) - (prev.totalBalance) }));
    }, [productInfo]);

    // 선수금 계산
    const handleDepositChange = (e) => {
        const { name, value } = e.target;
        // 쉼표를 제거하고 숫자로 변환
        let numValue = value ? Math.round(Number(value.replace(/,/g, ''))) : 0;

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
            const excessAmount = totalDeposit - paymentInfo.totalAmount;
            const exchangeRate = name === 'depositKRW' ? 1 : (name === 'depositJPY' ? Number(exchangeRates.JPY) : Number(exchangeRates.USD));
            numValue = numValue - Math.round(excessAmount / exchangeRate);
            numValue = Math.max(0, numValue); // numValue가 0 이하가 되지 않도록 보장
        }

        // 상태 업데이트 (포맷팅된 값으로 저장)
        setPaymentInfo(prev => ({
            ...prev,
            [name]: formatNumberWithComma(numValue)
        }));
    };

    // 잔금 계산
    const handleBalanceChange = (e) => {
        const { name, value } = e.target;
        // 쉼표를 제거하고 숫자로 변환
        let numValue = value ? Math.round(Number(value.replace(/,/g, ''))) : 0;

        // 갱신된 잔금을 계산
        let updatedBalances = {
            ...paymentInfo,
            [name]: numValue
        };

        // 잔금 총액 계산
        const balanceKRW = Number(updatedBalances.balanceKRW) || 0;
        const balanceJPY = (Number(updatedBalances.balanceJPY) || 0) * Number(exchangeRates.JPY);
        const balanceUSD = (Number(updatedBalances.balanceUSD) || 0) * Number(exchangeRates.USD);
        const totalBalance = Math.round(balanceKRW + balanceJPY + balanceUSD);

        // 선수금 총액이 결제 총액을 초과하는 경우 조정
        if (totalBalance > (paymentInfo.totalAmount - paymentInfo.totalDeposit)) {
            const excessAmount = totalBalance - (paymentInfo.totalAmount - paymentInfo.totalDeposit);
            const exchangeRate = name === 'balanceKRW' ? 1 : (name === 'balanceJPY' ? Number(exchangeRates.JPY) : Number(exchangeRates.USD));
            numValue = numValue - Math.round(excessAmount / exchangeRate);
            numValue = Math.max(0, numValue); // numValue가 0 이하가 되지 않도록 보장
        }

        // 상태 업데이트 (포맷팅된 값으로 저장)
        setPaymentInfo(prev => ({
            ...prev,
            [name]: formatNumberWithComma(numValue)
        }));
    };

    // 전체 계산 반영
    useEffect(() => {
        // 선수금 총액 계산
        const depositKRW = Number((paymentInfo.depositKRW || '0').replace(/,/g, '')) || 0;
        const depositJPY = (Number((paymentInfo.depositJPY || '0').replace(/,/g, '')) || 0) * Number(exchangeRates.JPY);
        const depositUSD = (Number((paymentInfo.depositUSD || '0').replace(/,/g, '')) || 0) * Number(exchangeRates.USD);
        const totalDeposit = Math.round(depositKRW + depositJPY + depositUSD);

        // 잔금 총액 계산
        const balanceKRW = Number((paymentInfo.balanceKRW || '0').replace(/,/g, '')) || 0;
        const balanceJPY = (Number((paymentInfo.balanceJPY || '0').replace(/,/g, '')) || 0) * Number(exchangeRates.JPY);
        const balanceUSD = (Number((paymentInfo.balanceUSD || '0').replace(/,/g, '')) || 0) * Number(exchangeRates.USD);
        const totalBalance = Math.round(balanceKRW + balanceJPY + balanceUSD);

        setPaymentInfo(prev => ({
            ...prev,
            totalDeposit,
            balance: prev.totalAmount - totalDeposit - totalBalance
        }));
    }, [paymentInfo.depositKRW, paymentInfo.depositJPY, paymentInfo.depositUSD, paymentInfo.totalAmount,
    paymentInfo.balanceKRW, paymentInfo.balanceJPY, paymentInfo.balanceUSD, exchangeRates]);

    // 고유 ID생성을 위해 가장 최근 data불러오기
    const [lastOrderNumber, setLastOrderNumber] = useState(0);

    useEffect(() => {
        fetchLatestOrderData();
    }, []);

    const fetchLatestOrderData = async () => {
        try {
            const response = await axios.get('https://server-6kol.onrender.com/api/v1/orders/latest/');
            const latestOrder = response.data;
            const latestOrderDate = new Date(latestOrder.creationTime).toLocaleDateString();
            const currentDate = new Date().toLocaleDateString();

            if (latestOrderDate !== currentDate) {
                return 1;
            } else {
                const lastNumber = parseInt(latestOrder.orderNumber.split('-').pop(), 10);
                return lastNumber + 1;
            }
        } catch (error) {
            console.error('최근 주문 데이터 가져오기 실패:', error);
            return 1; // 오류 발생 시 0001로 시작
        }
    };

    // 저장요청 
    const handleSubmit = async (e) => {
        e.preventDefault();
        // 현재 시간을 ISO 형식으로 가져오기
        const currentTime = new Date().toISOString();
        orderInfo.creationTime = currentTime

        // fetchLatestOrderData 함수를 동기적으로 호출
        const lastOrderNumber = await fetchLatestOrderData();

        // 고유 ID 생성 함수
        const generateUniqueID = () => {
            const today = new Date().toISOString().slice(2, 10).replace(/-/g, '');
            const formattedNumber = lastOrderNumber.toString().padStart(4, '0');
            return `K${today}-${formattedNumber}`;
        };

        // 주문번호 생성
        if (!orderInfo.orderNumber) {
            orderInfo.orderNumber = generateUniqueID();
        }

        console.log(orderInfo.orderNumber)

        const depositKRW = parseInt(paymentInfo.depositKRW.replace(/,/g, '')) || 0; // 쉽표제거후 숫자로 변환
        const depositJPY = parseInt(paymentInfo.depositJPY.replace(/,/g, '')) || 0;
        const depositUSD = parseInt(paymentInfo.depositUSD.replace(/,/g, '')) || 0;
        const balanceKRW = parseInt(paymentInfo.balanceKRW.replace(/,/g, '')) || 0;
        const balanceJPY = parseInt(paymentInfo.balanceJPY.replace(/,/g, '')) || 0;
        const balanceUSD = parseInt(paymentInfo.balanceUSD.replace(/,/g, '')) || 0;

        // 필수 항목 목록
        const requiredFields = {
            'ordererInfo.ordererName': '주문자 이름',
            'ordererInfo.affiliation': '소속',
            'ordererInfo.contact': '연락처',
            'orderInfo.creator': '작성자',
            'paymentInfo.payerName': '결제자 이름',
        };

        // 필수 항목 검사
        const missingFieldNames = Object.keys(requiredFields).filter(fieldKey => {
            const keys = fieldKey.split('.');
            let value = eval(keys.shift());
            for (let key of keys) {
                value = value[key];
                if (value === undefined || value === '' || value === null) {
                    return true;
                }
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
            ordererName: ordererInfo.ordererName, // 필수 
            affiliation: ordererInfo.affiliation, // 필수
            contact: ordererInfo.contact, // 필수
            address: ordererInfo.address,
            spouseName: ordererInfo.spouseName,
            spouseContact: ordererInfo.spouseContact,
            spouseAffiliation: ordererInfo.spouseAffiliation,
            orderStatus: orderInfo.orderStatus,
            orderNumber: orderInfo.orderNumber,
            creator: orderInfo.creator, // 필수
            creationTime: orderInfo.creationTime,
            modifier: orderInfo.modifier,
            lastModifiedTime: orderInfo.lastModifiedTime,
            deliveryMethod: orderInfo.deliveryMethod,
            tuxedoType: productInfo.tuxedoType,
            jacketSize: productInfo.jacketSize,
            pantsSize: productInfo.pantsSize,
            shirtSize: productInfo.shirtSize,
            dressType: productInfo.dressType,
            dressSize: productInfo.dressSize,
            ringSizeMen: productInfo.ringSizeMen,
            ringSizeWomen: productInfo.ringSizeWomen,
            necklaceSize: productInfo.necklaceSize,
            earringType: productInfo.earringType,
            bowtie: productInfo.bowtie,
            payerName: paymentInfo.payerName, // 필수
            relationToOrderer: paymentInfo.relationToOrderer, // 필수
            totalAmount: paymentInfo.totalAmount, // 필수
            paymentMethodDepositKRW: paymentInfo.paymentMethodDepositKRW,
            paymentMethodDepositJPY: paymentInfo.paymentMethodDepositJPY,
            paymentMethodDepositUSD: paymentInfo.paymentMethodDepositUSD,
            paymentMethodBalanceKRW: paymentInfo.paymentMethodBalanceKRW,
            paymentMethodBalanceJPY: paymentInfo.paymentMethodBalanceJPY,
            paymentMethodBalanceUSD: paymentInfo.paymentMethodBalanceUSD,
            depositKRW: depositKRW,
            depositJPY: depositJPY,
            depositUSD: depositUSD,
            balanceKRW: balanceKRW,
            balanceJPY: balanceJPY,
            balanceUSD: balanceUSD,
            totalDeposit: paymentInfo.totalDeposit,
            balance: paymentInfo.balance, // 필수
            depositDate: paymentInfo.depositDate,
            balanceDate: paymentInfo.balanceDate,
            // 수선정보 alterationInfo 
            alteration1: alterationInfo.alteration1,
            alteration2: alterationInfo.alteration2,
            alteration3: alterationInfo.alteration3,
            alteration4: alterationInfo.alteration4,
            alteration5: alterationInfo.alteration5,
            alteration6: alterationInfo.alteration6,
            alteration7: alterationInfo.alteration7,
            alterationMemo: alterationInfo.alterationMemo,
        };

        console.log("제출된 데이터", mappedData)

        // 서버에 POST 요청 보내기
        axios.post('https://server-6kol.onrender.com/api/v1/orders/new/', mappedData)
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
            <div className="orderinfo"> 신규양식 미혼자용 </div>
            {/* 주문 정보 */}
            <fieldset className="orderinfo">
                <legend>주문 정보</legend>
                <div className="orderinfo_row orderinfo_row1">
                    <span>주문서 번호: </span>{orderInfo.orderNumber}
                </div>
                <div className="orderinfo_row orderinfo_row2">
                    <span>작성자 * :</span>
                    <input
                        type="text"
                        placeholder='작성자를 입력하세요.'
                        value={orderInfo.creator}
                        onChange={handleCreatorChange}
                    />
                </div>
                <div className="orderinfo_row orderinfo_row3">
                    <span>주문 상태:</span>
                    {orderStatusOptions.map((status, index) => (
                        <label key={index}>
                            <input
                                type="radio"
                                name="orderStatus"
                                value={status}
                                checked={orderInfo.orderStatus === status}
                                onChange={orderInfoHandleChange} />
                            {status}
                        </label>
                    ))}
                </div>
            </fieldset>
            {/* 고객 정보 */}
            <fieldset className="orderer-info">
                <legend>고객 정보</legend>
                <div className="orderer-info-table">
                    <table>
                        <tbody className="orderer-info-table-container">
                            {/* 주문자 이름 */}
                            <tr className="orderer-info-table-row orderer-info-table-row-half">
                                <td>주문자 이름:</td>
                                <td className="orderer-info-table-row-half-first">
                                    <input
                                        type="text"
                                        name="ordererName"
                                        value={ordererInfo.ordererName}
                                        onChange={ordererInfoHandleChange}
                                    />
                                </td>
                                <td>주문자 연락처:</td>
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
                            <tr className="orderer-info-table-row">
                                <td className="orderer-info-table-row-third">주문자 소속:</td>
                                <td>
                                    <input
                                        type="text"
                                        name="affiliation"
                                        value={ordererInfo.affiliation}
                                        onChange={ordererInfoHandleChange}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <table >
                        <tbody className="orderer-info-table-container">
                            <tr className="orderer-info-table-row orderer-info-table-row-half">
                                <td>배우자 이름:</td>
                                <td className="orderer-info-table-row-half-first">
                                    <input
                                        type="text"
                                        name="spouseName"
                                        value={ordererInfo.spouseName}
                                        onChange={ordererInfoHandleChange}
                                    />
                                </td>
                                <td>배우자 연락처:</td>
                                <td>
                                    <input
                                        type="text"
                                        name="spouseContact"
                                        value={ordererInfo.spouseContact}
                                        onChange={ordererInfoHandleChange}
                                    />
                                </td>
                            </tr>
                            <tr className="orderer-info-table-row">
                                <td className="orderer-info-table-row-third">배우자 소속:</td>
                                <td>
                                    <input
                                        type="text"
                                        name="spouseAffiliation"
                                        value={ordererInfo.spouseAffiliation}
                                        onChange={ordererInfoHandleChange}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </fieldset>
            {/* 제품정보 */}
            <fieldset className="clothesinfo">
                <legend className="clothes-info">제품 정보</legend>
                <div className="clothes-info-table">
                    <table>
                        <tbody className="clothes-info-table-container">
                            {/* 예물 섹션 */}
                            <tr className="clothes-info-table-row clothes-info-table-row1">
                                <td colSpan="4"><strong>예물</strong></td>
                                <td>반지 사이즈(남):</td>
                                <td>
                                    <select name="ringSizeMen" value={productInfo.ringSizeMen} onChange={productInfoHandleChange}>
                                        <option value="">구매안함</option>
                                        {sizeOptions["반지 (남)"].map(size => (
                                            <option key={size} value={size}>{size}</option>
                                        ))}
                                    </select>
                                </td>
                                <td>반지 사이즈(여):</td>
                                <td>
                                    <select name="ringSizeWomen" value={productInfo.ringSizeWomen} onChange={productInfoHandleChange}>
                                        <option value="">구매안함</option>
                                        {sizeOptions["반지 (여)"].map(size => (
                                            <option key={size} value={size}>{size}</option>
                                        ))}
                                    </select>
                                </td>
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
                            {/* 턱시도 섹션 */}
                            <tr className="clothes-info-table-row clothes-info-table-row2">
                                <td colSpan="4"><strong>턱시도</strong></td>
                                <td>턱시도 유형:</td>
                                <td>
                                    <select name="tuxedoType" value={productInfo.tuxedoType} onChange={productInfoHandleChange}>
                                        <option value="자켓 Peaked">자켓 Peaked</option>
                                        <option value="자켓 Shawl">자켓 Shawl</option>
                                        <option value="자켓OG Peaked (맞춤)">자켓OG Peaked (맞춤)</option>
                                        <option value="자켓OG Shawl (맞춤)">자켓OG Shawl (맞춤)</option>
                                        <option value="자켓AB Peaked (맞춤)">자켓AB Peaked (맞춤)</option>
                                        <option value="자켓AB Shawl (맞춤)"ㄹ>자켓AB Shawl (맞춤)</option>
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
                                <td>팬츠 사이즈:</td>
                                <td>
                                    <select name="pantsSize" value={productInfo.pantsSize} onChange={productInfoHandleChange}>
                                        {(productInfo.tuxedoType === "구매안함" ? "" : sizeOptions[`팬츠${getPantsShirtSizeOptions()}`].map(size => (
                                            <option key={size} value={size}>{size}</option>
                                        )))}
                                        <option value="">구매안함</option>
                                    </select>
                                </td>
                                <td>셔츠 사이즈:</td>
                                <td>
                                    <select name="shirtSize" value={productInfo.shirtSize} onChange={productInfoHandleChange}>
                                        {(productInfo.tuxedoType === "구매안함" ? "" : sizeOptions[`셔츠${getPantsShirtSizeOptions()}`].map(size => (
                                            <option key={size} value={size}>{size}</option>
                                        )))}
                                        <option value="">구매안함</option>
                                    </select>
                                </td>
                            </tr>

                            {/* 드레스 섹션 */}
                            <tr className="clothes-info-table-row clothes-info-table-row3">
                                <td colSpan="4"><strong>드레스 </strong></td>
                                <td> 드레스 타입:</td>
                                <td>
                                    <select name="dressType" value={productInfo.dressType} onChange={productInfoHandleChange}>
                                        <option value="드레스 (R)">드레스 (R)</option>
                                        <option value="드레스 (S)">드레스 (S)</option>
                                        <option value="드레스 (Rw)">드레스 (Rw)</option>
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
                        </tbody>
                    </table>
                </div>
            </fieldset>
            {/* 결제정보 */}
            <fieldset className="paymentinfo">
                <legend className="payment-info">결제 정보</legend>
                <div>
                    <table className="payment-info-table">
                        <tbody className="payment-info-table-container">
                            <div className="payment-info-table__row">
                                {/* 결제자 이름 */}
                                <tr className="payment-info-table__row1">
                                    <td className="pair1">결제자 이름:</td>
                                    <td className="pair2"><input
                                        type="text"
                                        name="payerName"
                                        value={paymentInfo.payerName}
                                        onChange={paymentInfoHandleChange}
                                        style={{ width: '100px' }}
                                    />
                                    </td>
                                    {/* 주문자와의 관계 */}
                                    <td className="pair3">주문자와의 관계:</td>
                                    <td className="pair4">
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
                                    {/* 결제 총액 */}
                                    <td className="pair5 bold">결제 총액:</td>
                                    <td className="pair6 bold">
                                        <input
                                            type="text"
                                            name="totalAmount"
                                            value={formatNumberWithComma(paymentInfo.totalAmount)}
                                            style={{ width: '100px' }}
                                            readOnly />

                                        원</td>
                                </tr>
                            </div>
                            <div className="payment-info-table__row">
                                {/* 선수금 입력 필드 */}
                                <tr className="payment-info-table__row2">
                                    <td>
                                        <span>선수금 결제일:</span>
                                        <input
                                            type="date"
                                            name="depositDate"
                                            value={paymentInfo.depositDate}
                                            onChange={paymentInfoHandleChange}
                                        />
                                    </td>
                                    {/* 선수금 (원화) */}
                                    <td>
                                        <span>선수금 (원화):</span>
                                        <input
                                            type="text"
                                            min="0"
                                            name="depositKRW"
                                            value={paymentInfo.depositKRW}
                                            onChange={handleDepositChange}
                                        />
                                        원
                                        <label>
                                            <input
                                                type="radio"
                                                name="paymentMethodDepositKRW"
                                                value="현금"
                                                checked={paymentInfo.paymentMethodDepositKRW === "현금"}
                                                onChange={paymentInfoHandleChange}
                                            />
                                            현금
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                name="paymentMethodDepositKRW"
                                                value="신용카드"
                                                checked={paymentInfo.paymentMethodDepositKRW === "신용카드"}
                                                onChange={paymentInfoHandleChange}
                                            />
                                            신용카드
                                        </label>
                                    </td>
                                    {/* 선수금 (엔화) */}
                                    <td>
                                        <span>선수금 (엔화):</span>
                                        <input
                                            type="text"
                                            min="0"
                                            name="depositJPY"
                                            value={paymentInfo.depositJPY}
                                            onChange={handleDepositChange}
                                        />
                                        엔
                                        <label>
                                            <input
                                                type="radio"
                                                name="paymentMethodDepositJPY"
                                                value="현금"
                                                checked={paymentInfo.paymentMethodDepositJPY === "현금"}
                                                onChange={paymentInfoHandleChange}
                                            />
                                            현금
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                name="paymentMethodDepositJPY"
                                                value="신용카드"
                                                checked={paymentInfo.paymentMethodDepositJPY === "신용카드"}
                                                onChange={paymentInfoHandleChange}
                                            />
                                            신용카드
                                        </label>
                                    </td>
                                    {/* 선수금 (달러) */}
                                    <td>
                                        <span>선수금 (달러):</span>
                                        <input
                                            type="text"
                                            min="0"
                                            name="depositUSD"
                                            value={paymentInfo.depositUSD}
                                            onChange={handleDepositChange}
                                        />
                                        달러
                                        <label>
                                            <input
                                                type="radio"
                                                name="paymentMethodDepositUSD"
                                                value="현금"
                                                checked={paymentInfo.paymentMethodDepositUSD === "현금"}
                                                onChange={paymentInfoHandleChange}
                                            />
                                            현금
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                name="paymentMethodDepositUSD"
                                                value="신용카드"
                                                checked={paymentInfo.paymentMethodDepositUSD === "신용카드"}
                                                onChange={paymentInfoHandleChange}
                                            />
                                            신용카드
                                        </label>
                                    </td>
                                    {/* 선수금 총액 */}
                                    <td className="bold">
                                        <span>선수금 총액:</span>
                                        <input
                                            type="text"
                                            name="totalDeposit"
                                            value={formatNumberWithComma(paymentInfo.totalDeposit)}
                                            readOnly
                                        />
                                        원</td>
                                </tr>
                                {/* 잔금 입력 필드 */}
                                <tr className="payment-info-table__row3">
                                    <td>
                                        <span>잔금 결제일:</span>
                                        <input
                                            type="date"
                                            name="balanceDate"
                                            value={paymentInfo.balanceDate}
                                            onChange={paymentInfoHandleChange}
                                        />
                                    </td>
                                    {/* 잔금 지급액 (원화) */}
                                    <td>
                                        <span>잔금 지급액 (원화):</span>
                                        <input
                                            type="text"
                                            min="0"
                                            name="balanceKRW"
                                            value={paymentInfo.balanceKRW}
                                            onChange={handleBalanceChange}
                                        />
                                        원
                                        <label>
                                            <input
                                                type="radio"
                                                name="paymentMethodBalanceKRW"
                                                value="현금"
                                                checked={paymentInfo.paymentMethodBalanceKRW === "현금"}
                                                onChange={paymentInfoHandleChange}
                                            />
                                            현금
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                name="paymentMethodBalanceKRW"
                                                value="신용카드"
                                                checked={paymentInfo.paymentMethodBalanceKRW === "신용카드"}
                                                onChange={paymentInfoHandleChange}
                                            />
                                            신용카드
                                        </label>
                                    </td>
                                    {/* 잔금 지급액 (엔화) */}
                                    <td>
                                        <span>잔금 지급액 (엔화):</span>
                                        <input
                                            type="text"
                                            min="0"
                                            name="balanceJPY"
                                            value={paymentInfo.balanceJPY}
                                            onChange={handleBalanceChange}
                                        />
                                        엔
                                        <label>
                                            <input
                                                type="radio"
                                                name="paymentMethodBalanceJPY"
                                                value="현금"
                                                checked={paymentInfo.paymentMethodBalanceJPY === "현금"}
                                                onChange={paymentInfoHandleChange}
                                            />
                                            현금
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                name="paymentMethodBalanceJPY"
                                                value="신용카드"
                                                checked={paymentInfo.paymentMethodBalanceJPY === "신용카드"}
                                                onChange={paymentInfoHandleChange}
                                            />
                                            신용카드
                                        </label>
                                    </td>
                                    {/* 잔금 지급액 (달러) */}
                                    <td>
                                        <span>잔금 지급액 (달러):</span>
                                        <input
                                            type="text"
                                            min="0"
                                            name="balanceUSD"
                                            value={paymentInfo.balanceUSD}
                                            onChange={handleBalanceChange}
                                        />
                                        달러
                                        <label>
                                            <input
                                                type="radio"
                                                name="paymentMethodBalanceUSD"
                                                value="현금"
                                                checked={paymentInfo.paymentMethodBalanceUSD === "현금"}
                                                onChange={paymentInfoHandleChange}
                                            />
                                            현금
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                name="paymentMethodBalanceUSD"
                                                value="신용카드"
                                                checked={paymentInfo.paymentMethodBalanceUSD === "신용카드"}
                                                onChange={paymentInfoHandleChange}
                                            />
                                            신용카드
                                        </label>
                                    </td>
                                    {/* 잔금 */}
                                    <td className="bold">
                                        <span>잔금 총액:</span>
                                        <input
                                            type="text"
                                            name="balance"
                                            value={formatNumberWithComma(paymentInfo.balance)}
                                            readOnly
                                        />
                                        원</td>
                                </tr>
                            </div>
                        </tbody>
                    </table>
                </div>
            </fieldset>
            {/* 수선정보 */}
            <fieldset className="alteration-info">
                <legend>수선 정보</legend>
                <div className="alteration-info-table">
                    <table>
                        <tbody className="alteration-info-table-container">
                            {/* 드레스 뒷품 */}
                            <tr className="alteration-info-table-row">
                                <td>드레스 뒷품:</td>
                                <td>
                                    <input
                                        type="text"
                                        name="alteration1"
                                        value={alterationInfo.alteration1}
                                        onChange={alterationInfoHandleChange}
                                    />
                                    inch</td>
                                <td>드레스 기장:</td>
                                <td>
                                    <input
                                        type="text"
                                        name="alteration2"
                                        value={alterationInfo.alteration2}
                                        onChange={alterationInfoHandleChange}
                                    />
                                    inch</td>
                            </tr>

                            {/* 자켓 소매 */}
                            <tr className="alteration-info-table-row">
                                <td>자켓 소매:</td>
                                <td>
                                    <input
                                        type="text"
                                        name="alteration3"
                                        value={alterationInfo.alteration3}
                                        onChange={alterationInfoHandleChange}
                                    />
                                    inch</td>
                                <td>자켓 기장:</td>
                                <td>
                                    <input
                                        type="text"
                                        name="alteration4"
                                        value={alterationInfo.alteration4}
                                        onChange={alterationInfoHandleChange}
                                    />
                                    inch</td>
                                <td>자켓 폼:</td>
                                <td>
                                    <input
                                        type="text"
                                        name="alteration5"
                                        value={alterationInfo.alteration5}
                                        onChange={alterationInfoHandleChange}
                                    />
                                    inch</td>
                            </tr>

                            {/* 바지 허리 */}
                            <tr className="alteration-info-table-row">
                                <td>셔츠 목:</td>
                                <td>
                                    <input
                                        type="text"
                                        name="alteration6"
                                        value={alterationInfo.alteration6}
                                        onChange={alterationInfoHandleChange}
                                    />
                                    inch</td>
                                <td>셔츠 소매:</td>
                                <td>
                                    <input
                                        type="text"
                                        name="alteration7"
                                        value={alterationInfo.alteration7}
                                        onChange={alterationInfoHandleChange}
                                    />
                                    inch</td>
                            </tr>
                            {/* 기장 메모 */}
                            <tr className="alteration-info-table-row">
                                <td>메모:</td>
                                <td colSpan="5">
                                    <textarea
                                        name="alterationMemo"
                                        value={alterationInfo.alterationMemo}
                                        onChange={alterationInfoHandleChange}
                                        rows="3"
                                        cols="65"
                                        style={{ width: '100%' }}
                                    />
                                </td>
                            </tr>
                            <tr className="alteration-info-table-row">
                                <td>수령 방법:</td>
                                <td>
                                    <select name="deliveryMethod" value={orderInfo.deliveryMethod} onChange={orderInfoHandleChange}>
                                        <option value="배송">배송</option>
                                        <option value="직접수령">현장 수령</option>
                                        <option value="방문수령">매장 수령</option>
                                    </select>
                                </td>
                                {orderInfo.deliveryMethod === "배송" && (
                                    <>
                                        <td>배송지 주소:</td>
                                        <td>
                                            <input
                                                type="text"
                                                name="address"
                                                value={ordererInfo.address}
                                                onChange={ordererInfoHandleChange}
                                                style={{ width: '400px' }}
                                            />
                                        </td>
                                    </>
                                )}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </fieldset>

            <button className="form-button" type="submit"> 주문 제출</button>
        </form>
    );

}

export default NewOrderForm;
