import React, { useState, useEffect } from 'react';

function OrdererInformationForm({ updateOrdererInfo }) {
    const [ordererInfo, setOrdererInfo] = useState({
        name: '',
        contact: '',
        affiliation: '',
        deliveryMethod: '배송',
        address: ''
    });

    const handleChange = (e) => {
        setOrdererInfo({ ...ordererInfo, [e.target.name]: e.target.value });
    }

    // 상위 컴포넌트에 상태 변경 사항을 즉시 알림
    useEffect(() => {
        updateOrdererInfo(ordererInfo);
    }, [ordererInfo, updateOrdererInfo]);

    return (
        <div>
            <label>
                이름:
                <input type="text" name="name" value={ordererInfo.name} onChange={handleChange} />
            </label>
            <label>
                연락처:
                <input type="text" name="contact" value={ordererInfo.contact} onChange={handleChange} />
            </label>
            <label>
                소속:
                <input type="text" name="affiliation" value={ordererInfo.affiliation} onChange={handleChange} />
            </label>
            <label>
                수령 방법:
                <select name="deliveryMethod" value={ordererInfo.deliveryMethod} onChange={handleChange}>
                    <option value="배
송">배송</option>
                    <option value="직접수령">직접 수령</option>
                    <option value="방문수령">방문 수령</option>
                </select>
            </label>
            {ordererInfo.deliveryMethod === '배송' && (
                <label>
                    배송지 주소:
                    <input type="text" name="address" value={ordererInfo.address} onChange={handleChange} />
                </label>
            )}
        </div>
    );
}

export default OrdererInformationForm;