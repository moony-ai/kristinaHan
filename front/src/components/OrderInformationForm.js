import React, { useState, useEffect } from 'react';

function OrderInformationForm({ updateOrderInfo }) {
    const [orderInfo, setOrderInfo] = useState({
        status: '상담', // 진행 상황
        orderNumber: '',
        orderCreationTime: '',
        creator: '',
        lastModificationTime: '',
        modifier: '',
        tuxedoType: '자켓 (R-Peaked)', // 턱시도 종류
        jacketSize: '',
        pantsSize: '',
        shirtSize: '',
        dressType: '드레스 (R)', // 드레스 타입 
        dressSize: '', // 드레스 사이즈
        ringSizeMen: '',
        ringSizeWomen: '',
        necklaceSize: '', // 목걸이 사이즈
        earringType: '', // 귀걸이 종류
        bowtie: false // 보타이 유무
    });

    const sizeOptions = {
        "자켓 (R-Peaked)": ["100", "105", "110", "*115", "*120"],
        "자켓 (R-Shaw)": ["85", "90", "95", "100", "*105", "*110", "*115", "*120"],
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

    const handleChange = (e) => {
        setOrderInfo({ ...orderInfo, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        updateOrderInfo(orderInfo);
    }, [orderInfo, updateOrderInfo]);

    const getPantsShirtSizeOptions = () => {
        return orderInfo.tuxedoType.includes("S-Peaked") ? "S" : "R";
    };

    return (
        <div>
            <label>
                진행 상황:
                <select name="status" value={orderInfo.status} onChange={handleChange}>
                    <option value="상담">상담</option>
                    <option value="주문">주문</option>
                    <option value="수선">수선</option>
                    <option value="수선입고">수선 입고</option>
                    <option value="배송중">배송 중</option>
                    <option value="배송완료">배송 완료</option>
                    <option value="수령완료">수령 완료</option>
                </select>
            </label>
            <label>
                주문 번호:
                <input type="text" name="orderNumber" value={orderInfo.orderNumber} onChange={handleChange} />
            </label>
            <label>
                주문 생성 시간:
                <input type="text" name="orderCreationTime" value={orderInfo.orderCreationTime} onChange={handleChange} />
            </label>
            <label>
                생성자:
                <input type="text" name="creator" value={orderInfo.creator} onChange={handleChange} />
            </label>
            <label>
                최근 수정 시간:
                <input type="text" name="lastModificationTime" value={orderInfo.lastModificationTime} onChange={handleChange} />
            </label>
            <label>
                수정자:
                <input type="text" name="modifier" value={orderInfo.modifier} onChange={handleChange} />
            </label>
            {/* 턱시도 유형 선택 */}
            <label>
                턱시도 유형:
                <select name="tuxedoType" value={orderInfo.tuxedoType} onChange={handleChange}>
                    <option value="자켓 (R-Peaked)">자켓 (R-Peaked)</option>
                    <option value="자켓 (R-Shaw)">자켓 (R-Shaw)</option>
                    <option value="자켓 (S-Peaked)">자켓 (S-Peaked)</option>
                    <option value="구매안함">구매안함</option>
                </select>
            </label>

            {/* 선택된 턱시도 유형에 따른 자켓 사이즈 선택 */}
            <label>
                자켓 사이즈:
                <select name="jacketSize" value={orderInfo.jacketSize} onChange={handleChange}>
                    {sizeOptions[orderInfo.tuxedoType].map(size => (
                        <option key={size} value={size}>{size}</option>
                    ))}
                </select>
            </label>

            <label>
                팬츠 사이즈:
                <select name="pantsSize" value={orderInfo.pantsSize} onChange={handleChange}>
                    {sizeOptions[`팬츠 (${getPantsShirtSizeOptions()})`].map(size => (
                        <option key={size} value={size}>{size}</option>
                    ))}
                </select>
            </label>
            
            <label>
                셔츠 사이즈:
                <select name="shirtSize" value={orderInfo.shirtSize} onChange={handleChange}>
                    {sizeOptions[`셔츠 (${getPantsShirtSizeOptions()})`].map(size => (
                        <option key={size} value={size}>{size}</option>
                    ))}
                </select>
            </label>

            {/* 드레스 타입 선택 */}
            <label>
                드레스 타입:
                <select name="dressType" value={orderInfo.dressType} onChange={handleChange}>
                    <option value="드레스 (R)">드레스 (R)</option>
                    <option value="드레스 (S)">드레스 (S)</option>
                    <option value="드레스 (RM)">드레스 (RM)</option>
                    <option value="구매안함">구매안함</option>
                </select>
            </label>

            {/* 선택된 드레스 타입에 따른 드레스 사이즈 선택 */}
            <label>
                드레스 사이즈:
                <select name="dressSize" value={orderInfo.dressSize} onChange={handleChange}>
                    {sizeOptions[orderInfo.dressType].map(size => (
                        <option key={size} value={size}>{size}</option>
                    ))}
                </select>
            </label>
            
            {/* 남성 반지 사이즈 선택 */}
            <label>
                남성 반지 사이즈:
                <select name="ringSizeMen" value={orderInfo.ringSizeMen} onChange={handleChange}>
                    {sizeOptions["반지 (남)"].map(size => (
                        <option key={size} value={size}>{size}</option>
                    ))}
                </select>
            </label>

            {/* 여성 반지 사이즈 선택 */}
            <label>
                여성 반지 사이즈:
                <select name="ringSizeWomen" value={orderInfo.ringSizeWomen} onChange={handleChange}>
                    {sizeOptions["반지 (여)"].map(size => (
                        <option key={size} value={size}>{size}</option>
                    ))}
                </select>
            </label>

            <label>
                목걸이 사이즈:
                <select name="necklaceSize" value={orderInfo.necklaceSize} onChange={handleChange}>
                    <option value="">구매안함</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                </select>
            </label>
            <label>
                귀걸이 종류:
                <select name="earringType" value={orderInfo.earringType} onChange={handleChange}>
                    <option value="">구매안함</option>
                    <option value="귀찌">귀찌</option>
                    <option value="귀걸이">귀걸이</option>
                </select>
            </label>
            <label>
                보타이 여부:
                <input type="checkbox" name="bowtie" checked={orderInfo.bowtie} onChange={handleChange} />
            </label>
        </div>
    );
}

export default OrderInformationForm;