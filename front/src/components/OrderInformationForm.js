import React, { useState, useEffect } from 'react';

function OrderInformationForm({ updateOrderInfo }) {
    const [orderInfo, setOrderInfo] = useState({
        status: '상담', // 진행 상황
        orderNumber: '',
        orderCreationTime: '',
        creator: '',
        lastModificationTime: '',
        modifier: '',
        tuxedoType: 'R-peaked', // 턱시도 종류
        jacketSize: '',
        pantsSize: '',
        shirtSize: '',
        dressSize: 'S', // 드레스 사이즈
        ringSizeMen: '',
        ringSizeWomen: '',
        necklaceSize: 'S', // 목걸이 사이즈
        earringType: '귀찌', // 귀걸이 종류
        bowtie: false // 보타이 유무
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setOrderInfo({
            ...orderInfo,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    useEffect(() => {
        updateOrderInfo(orderInfo);
    }, [orderInfo, updateOrderInfo]);

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
            <label>
                턱시도 종류:
                <select name="tuxedoType" value={orderInfo.tuxedoType} onChange={handleChange}>
                    <option value="R-peaked">R-peaked</option>
                    <option value="S-shawl">S-shawl</option>
                    <option value="S-peaked">S-peaked</option>
                </select>
            </label>
            <label>
                자켓 사이즈:
                <input type="text" name="jacketSize" value={orderInfo.jacketSize} onChange={handleChange} />
            </label>
            <label>
                바지 사이즈:
                <input type="text" name="pantsSize" value={orderInfo.pantsSize} onChange={handleChange} />
            </label>
            <label>
                셔츠 사이즈:
                <input type="text" name="shirtSize" value={orderInfo.shirtSize} onChange={handleChange} />
            </label>
            <label>
                드레스 사이즈:
                <select name="dressSize" value={orderInfo.dressSize} onChange={handleChange}>
                    <option value="S">S</option>
                    <option value="R">R</option>
                    <option value="RM">RM</option>
                </select>
            </label>
            <label>
                반지(남) 사이즈:
                <input type="text" name="ringSizeMen" value={orderInfo.ringSizeMen} onChange={handleChange} />
            </label>
            <label>
                반지(여) 사이즈:
                <input type="text" name="ringSizeWomen" value={orderInfo.ringSizeWomen} onChange={handleChange} />
            </label>
            <label>
                목걸이 사이즈:
                <select name="necklaceSize" value={orderInfo.necklaceSize} onChange={handleChange}>
                    <option value="S">S</option>
                    <option value="M">M</option>
                </select>
            </label>
            <label>
                귀걸이 종류:
                <select name="earringType" value={orderInfo.earringType} onChange={handleChange}>
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