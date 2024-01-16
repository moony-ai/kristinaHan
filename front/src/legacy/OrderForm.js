import React, { useState, useEffect } from 'react';

const OrderForm = () => {
    const [orderInfo, setOrderInfo] = useState({
        name: '',
        church: '',
        contact: '',
        address: ''
    });
    const [spouseInfo, setSpouseInfo] = useState({
        name: '',
        church: '',
        contact: '',
        address: ''
    });
    const initialStatus = {
        consultation: { name: "상담", active: false },
        order: { name: "주문", active: false },
        repair: { name: "수선", active: false },
        repairReceived: { name: "수선입고", active: false },
        shipped: { name: "발송완료", active: false },
        received: { name: "수령완료", active: false }
    };
    const [status, setStatus] = useState(initialStatus);

    const handleInputChange = (e, type) => {
        const { name, value } = e.target;
        if (type === 'order') {
            setOrderInfo({ ...orderInfo, [name]: value });
        } else {
            setSpouseInfo({ ...spouseInfo, [name]: value });
        }
    };

    const handleToggleChange = (key) => {
        setStatus({
            ...initialStatus, // 모든 상태를 초기 상태(비활성화)로 설정
            [key]: { ...status[key], active: true } // 클릭한 버튼만 활성화
        });
    };

    const [weddingSuit, setWeddingSuit] = useState({
        type: '',
        size: ''
    });
    const [weddingJewelry, setWeddingJewelry] = useState({
        ringMale: '',
        ringFemale: '',
        necklace: '',
        earrings: ''
    });
    const [accessories, setAccessories] = useState({
        socks: false,
        stockings: false,
        underwear: false,
        shawl: false
    });

    const handleWeddingSuitChange = (e) => {
        setWeddingSuit({
            ...weddingSuit,
            [e.target.name]: e.target.value
        });
    };

    const handleWeddingJewelryChange = (e) => {
        setWeddingJewelry({
            ...weddingJewelry,
            [e.target.name]: e.target.value
        });
    };

    const handleAccessoriesChange = (e) => {
        setAccessories({
            ...accessories,
            [e.target.name]: !accessories[e.target.name]
        });
    };

    const priceData = {
        tuxedoSet: 1500000,
        dress: 1500000,
        ringMale: 500000,
        ringFemale: 500000,
        necklaceEarrings: 1000000,
        socks: 10000,
        stockings: 10000,
        underwear: 20000,
        shawl: 15000
    };

    const itemNames = {
        tuxedoSet: "턱시도 세트",
        dress: "드레스",
        ringMale: "반지(남)",
        ringFemale: "반지(여)",
        necklaceEarrings: "목걸이 + 귀걸이",
        socks: "양말",
        stockings: "스타킹",
        underwear: "속옷",
        shawl: "숄"
    };

    const [paymentInfo, setPaymentInfo] = useState({
        payerName: '',
        relationship: '',
        paymentItems: {
            tuxedoSet: false,
            dress: false,
            ringMale: false,
            ringFemale: false,
            necklaceEarrings: false,
            socks: false,
            stockings: false,
            underwear: false,
            shawl: false
        },
        totalAmount: 0,
        contractAmount: 0, // 추가: 계약금
        depositMethod: '', // 추가: 계약금 결제 방법
        balanceAmount: 0, // 추가: 잔금
        balanceMethod: '', // 추가: 잔금 결제 방법
    });

    const handlePaymentChange = (e) => {
        if (e.target.name in paymentInfo.paymentItems) {
            setPaymentInfo({
                ...paymentInfo,
                paymentItems: {
                    ...paymentInfo.paymentItems,
                    [e.target.name]: !paymentInfo.paymentItems[e.target.name]
                }
            });
        } else if (e.target.name === 'contractAmount') {
            const contractAmount = parseFloat(e.target.value);
            const totalAmount = paymentInfo.totalAmount;
            
            if (!isNaN(contractAmount)) { // 계약금액이 유효한 숫자인지 확인
                const maxContractAmount = totalAmount;
                if (contractAmount <= maxContractAmount) {
                    const balanceAmount = totalAmount - contractAmount;
                    setPaymentInfo({
                        ...paymentInfo,
                        [e.target.name]: contractAmount,
                        balanceAmount,
                        depositMethod: '',
                    });
                } else {
                    alert('계약금액은 결제총액을 초과할 수 없습니다.');
                }
            } else {
                // 계약금액이 유효한 숫자가 아닌 경우, 즉 빈 문자열 또는 NaN일 경우에는 경고를 표시하지 않습니다.
                setPaymentInfo({
                    ...paymentInfo,
                    [e.target.name]: '',
                });
            }
        } else {
            setPaymentInfo({
                ...paymentInfo,
                [e.target.name]: e.target.value
            });
        }
    };

    useEffect(() => {
        let total = 0;
        for (const item in paymentInfo.paymentItems) {
            if (paymentInfo.paymentItems[item]) {
                total += priceData[item];
            }
        }
        setPaymentInfo({ ...paymentInfo, totalAmount: total });
    }, [paymentInfo.paymentItems]);

    return (
        <div>
            <h1>예복예물 주문서</h1>
            <div>
                {/* 토글 버튼들 */}
                <div>
                    {Object.keys(status).map((key) => (
                        <label key={key}>
                            {status[key].name}
                            <input
                                type="checkbox"
                                name={key}
                                checked={status[key].active}
                                onChange={() => handleToggleChange(key)}
                            />
                        </label>
                    ))}
                </div>
                {/* 나머지 폼 요소들 */}
            </div>
            <div>
                <h2>주문인 정보</h2>
                {/* 주문인 정보 입력 필드들 */}
                <input
                    name="name"
                    placeholder="성명"
                    value={orderInfo.name}
                    onChange={(e) => handleInputChange(e, 'order')}
                />
                <input
                    name="church"
                    placeholder="소속교회"
                    value={orderInfo.church}
                    onChange={(e) => handleInputChange(e, 'order')}
                />
                <input
                    name="contact"
                    placeholder="연락처"
                    value={orderInfo.contact}
                    onChange={(e) => handleInputChange(e, 'order')}
                />
                <input
                    name="address"
                    placeholder="배송지"
                    value={orderInfo.address}
                    onChange={(e) => handleInputChange(e, 'order')}
                />
            </div>
            <div>
                <h2>주문인 배우자 정보</h2>
                {/* 주문인 배우자 정보 입력 필드들 */}
                <input
                    name="name"
                    placeholder="성명"
                    value={spouseInfo.name}
                    onChange={(e) => handleInputChange(e, 'spouse')}
                />
                <input
                    name="church"
                    placeholder="소속교회"
                    value={spouseInfo.church}
                    onChange={(e) => handleInputChange(e, 'spouse')}
                />
                <input
                    name="contact"
                    placeholder="연락처"
                    value={spouseInfo.contact}
                    onChange={(e) => handleInputChange(e, 'spouse')}
                />
                <input
                    name="address"
                    placeholder="배송지"
                    value={spouseInfo.address}
                    onChange={(e) => handleInputChange(e, 'spouse')}
                />
            </div>
            <div>
                <h2>2.주문 내용</h2>
                <div>
                    <h3>예복</h3>
                    <table>
                        <tbody>
                            <tr>
                                <td>턱시도</td>
                                <td>
                                    <select name="type" value={weddingSuit.type} onChange={handleWeddingSuitChange}>
                                        <option value="">턱시도 종류 선택</option>
                                        <option value="tuxedo_rPeaked">R-peaked</option>
                                        <option value="tuxedo_sShawl">S-shawl</option>
                                        <option value="tuxedo_sPeaked">S-peaked</option>
                                    </select>
                                </td>
                                <td>
                                    {weddingSuit.type.startsWith('tuxedo') && (
                                        <input
                                            name="size"
                                            placeholder="사이즈"
                                            value={weddingSuit.size}
                                            onChange={handleWeddingSuitChange}
                                        />
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td>드레스</td>
                                <td>
                                    <select name="type" value={weddingSuit.type} onChange={handleWeddingSuitChange}>
                                        <option value="">드레스 종류 선택</option>
                                        <option value="dress_s">S</option>
                                        <option value="dress_r">R</option>
                                        <option value="dress_rm">RM</option>
                                    </select>
                                </td>
                                <td>
                                    {weddingSuit.type.startsWith('dress') && (
                                        <input
                                            name="size"
                                            placeholder="사이즈"
                                            value={weddingSuit.size}
                                            onChange={handleWeddingSuitChange}
                                        />
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div>
                    <h3>예물</h3>
                    <input
                        name="ringMale"
                        placeholder="반지(남) 사이즈"
                        value={weddingJewelry.ringMale}
                        onChange={handleWeddingJewelryChange}
                    />
                    <input
                        name="ringFemale"
                        placeholder="반지(여) 사이즈"
                        value={weddingJewelry.ringFemale}
                        onChange={handleWeddingJewelryChange}
                    />
                    <input
                        name="necklace"
                        placeholder="목걸이 사이즈"
                        value={weddingJewelry.necklace}
                        onChange={handleWeddingJewelryChange}
                    />
                    <select name="earrings" value={weddingJewelry.earrings} onChange={handleWeddingJewelryChange}>
                        <option value="">귀걸이 종류 선택</option>
                        <option value="type1">귀걸이 종류 1</option>
                        <option value="type2">귀걸이 종류 2</option>
                        <option value="type3">귀걸이 종류 3</option>
                    </select>
                </div>

                <div>
                    <h3>기타</h3>
                    {Object.keys(accessories).map((key) => (
                        <label key={key}>
                            {itemNames[key]}
                            <input
                                type="checkbox"
                                name={key}
                                checked={accessories[key]}
                                onChange={handleAccessoriesChange}
                            />
                        </label>
                    ))}
                </div>
                <div>
                    <h2>3. 결제 내용</h2>
                    <table>
                        <tbody>
                            <tr>
                                <td>결제자 이름:</td>
                                <td>
                                    <input
                                        name="payerName"
                                        value={paymentInfo.payerName}
                                        onChange={handlePaymentChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>주문자와의 관계:</td>
                                <td>
                                    <select name="relationship" value={paymentInfo.relationship} onChange={handlePaymentChange}>
                                        <option value="">관계 선택</option>
                                        <option value="father">부</option>
                                        <option value="mother">모</option>
                                        <option value="sibling">형제</option>
                                        <option value="self">본인</option>
                                        <option value="other">기타</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>결제품목:</td>
                                <td>
                                    {Object.keys(paymentInfo.paymentItems).map((itemKey) => (
                                        <label key={itemKey}>
                                            {itemNames[itemKey]}
                                            <input
                                                type="checkbox"
                                                name={itemKey}
                                                checked={paymentInfo.paymentItems[itemKey]}
                                                onChange={handlePaymentChange}
                                            />
                                        </label>
                                    ))}
                                </td>
                            </tr>
                            <tr>
                                <td>결제총액:</td>
                                <td>₩{paymentInfo.totalAmount.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td>계약금액:</td>
                                <td>
                                    <input
                                        name="contractAmount"
                                        placeholder="₩"
                                        value={paymentInfo.contractAmount}
                                        onChange={handlePaymentChange}
                                        max={paymentInfo.totalAmount}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>잔금액:</td>
                                <td>₩{(paymentInfo.totalAmount - paymentInfo.contractAmount).toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td>계약금 결제 방법:</td>
                                <td>
                                    {['현금/이체', '카드', '기타'].map((method) => (
                                        <label key={method}>
                                            {method}
                                            <input
                                                type="radio"
                                                name="depositMethod"
                                                value={method}
                                                checked={paymentInfo.depositMethod === method}
                                                onChange={handlePaymentChange}
                                                disabled={paymentInfo.contractAmount <= 0} // 계약금이 입력되지 않은 경우 비활성화
                                            />
                                        </label>
                                    ))}
                                </td>
                            </tr>
                            <tr>
                                <td>잔금 결제 방법:</td>
                                <td>
                                    {['현금/이체', '카드', '기타'].map((method) => (
                                        <label key={method}>
                                            {method}
                                            <input
                                                type="radio"
                                                name="balanceMethod"
                                                value={method}
                                                checked={paymentInfo.balanceMethod === method}
                                                onChange={handlePaymentChange}
                                                disabled={(paymentInfo.totalAmount - paymentInfo.contractAmount) <= 0} // 잔금이 0인 경우 비활성화
                                            />
                                        </label>
                                    ))}
                                </td>
                            </tr>
                            <tr>
                                <td>크리스티나한 입금계좌:</td>
                                <td>
                                    <p>원화계좌: 우리은행 1005-004-40463</p>
                                    <p>외화계좌: WOORI BANK A/C No. 1081-400-980267</p>
                                </td>
                            </tr>
                            <tr>
                                <td>Memo:</td>
                                <td>
                                    <label>
                                        드레스 기장 토글
                                        <input
                                            type="checkbox"
                                            name="dressLengthToggle"
                                            checked={weddingSuit.dressLengthToggle}
                                            onChange={handleWeddingSuitChange}
                                        />
                                    </label>
                                    {weddingSuit.dressLengthToggle && (
                                        <input
                                            name="dressLength"
                                            placeholder="cm"
                                            value={weddingSuit.dressLength}
                                            onChange={handleWeddingSuitChange}
                                        />
                                    )}
                                    <label>
                                        턱시도 소매 토글
                                        <input
                                            type="checkbox"
                                            name="sleeveLengthToggle"
                                            checked={weddingSuit.sleeveLengthToggle}
                                            onChange={handleWeddingSuitChange}
                                        />
                                    </label>
                                    {weddingSuit.sleeveLengthToggle && (
                                        <input
                                            name="sleeveLength"
                                            placeholder="cm"
                                            value={weddingSuit.sleeveLength}
                                            onChange={handleWeddingSuitChange}
                                        />
                                    )}
                                    <label>
                                        턱시도 기장 토글
                                        <input
                                            type="checkbox"
                                            name="suitLengthToggle"
                                            checked={weddingSuit.suitLengthToggle}
                                            onChange={handleWeddingSuitChange}
                                        />
                                    </label>
                                    {weddingSuit.suitLengthToggle && (
                                        <input
                                            name="suitLength"
                                            placeholder="cm"
                                            value={weddingSuit.suitLength}
                                            onChange={handleWeddingSuitChange}
                                        />
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default OrderForm;