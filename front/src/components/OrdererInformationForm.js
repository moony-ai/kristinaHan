import React, { useState } from 'react';
import '../styles/OrdererInformationForm.css'

function OrdererInformationForm({ updateOrdererInfo, deliveryMethod }) {
    const [ordererInfo, setOrdererInfo] = useState({
        name: '',
        contact: '',
        affiliation: '',
        address: ''
    });

    const handleChange = (e) => {
        setOrdererInfo({ ...ordererInfo, [e.target.name]: e.target.value });
    }

    const handleBlur = () => {
        updateOrdererInfo(ordererInfo);
    }

    return (
        <div className="orderer-info-table">
            <table>
                <tbody>
                    {/* 주문자 이름 */}
                    <tr>
                        <td>주문자 이름:</td>
                        <td>
                            <input
                                type="text"
                                name="name"
                                value={ordererInfo.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </td>
                        <td>연락처:</td>
                        <td>
                            <input
                                type="text"
                                name="contact"
                                value={ordererInfo.contact}
                                onChange={handleChange}
                                onBlur={handleBlur}
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
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </td>
                    </tr>

                    {/* 배송지 주소 - 수령 방법이 '배송'인 경우에만 표시 */}
                    {deliveryMethod === "배송" && (
                        <tr>
                            <td>배송지 주소:</td>
                            <td>
                                <input
                                    type="text"
                                    name="address"
                                    value={ordererInfo.address}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default OrdererInformationForm;
