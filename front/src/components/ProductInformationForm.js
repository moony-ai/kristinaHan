import React, { useState, useEffect } from 'react';
import '../styles/OrderInformationForm.css'

function ProductInformationForm({ updateOrderInfo }) {
    const [orderInfo, setOrderInfo] = useState({
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

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        const updatedOrderInfo = { ...orderInfo, [e.target.name]: value };
        setOrderInfo(updatedOrderInfo);
        updateOrderInfo(updatedOrderInfo); // 상태 업데이트 후 상위 컴포넌트에 전달
    };

    const getPantsShirtSizeOptions = () => {
        return orderInfo.tuxedoType.includes("S-Peaked") ? "S" : "R";
    };

    return (
        <table>
            <tbody>
                {/* 턱시도 섹션 */}
                <tr>
                    <td colSpan="4"><strong>턱시도</strong></td>
                </tr>
                <tr>
                    <td>턱시도 유형:</td>
                    <td>
                        <select name="tuxedoType" value={orderInfo.tuxedoType} onChange={handleChange}>
                            <option value="자켓 (R-Peaked)">자켓 (R-Peaked)</option>
                            <option value="자켓 (R-Shawl)">자켓 (R-Shawl)</option>
                            <option value="자켓 (S-Peaked)">자켓 (S-Peaked)</option>
                            <option value="구매안함">구매안함</option>
                        </select>
                    </td>
                    <td>자켓 사이즈:</td>
                    <td>
                        <select name="jacketSize" value={orderInfo.jacketSize} onChange={handleChange}>
                            {(orderInfo.tuxedoType === "구매안함" ? "" : sizeOptions[orderInfo.tuxedoType].map(size => (
                                <option key={size} value={size}>{size}</option>
                            )))}
                            <option value="">구매안함</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>팬츠 사이즈:</td>
                    <td>
                        <select name="pantsSize" value={orderInfo.pantsSize} onChange={handleChange}>
                            {(orderInfo.tuxedoType === "구매안함" ? "" : sizeOptions[`팬츠 (${getPantsShirtSizeOptions()})`].map(size => (
                                <option key={size} value={size}>{size}</option>
                            )))}
                            <option value="">구매안함</option>
                        </select>
                    </td>
                    <td>셔츠 사이즈:</td>
                    <td>
                        <select name="shirtSize" value={orderInfo.shirtSize} onChange={handleChange}>
                            {(orderInfo.tuxedoType === "구매안함" ? "" : sizeOptions[`셔츠 (${getPantsShirtSizeOptions()})`].map(size => (
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
                        <select name="dressType" value={orderInfo.dressType} onChange={handleChange}>
                            <option value="드레스 (R)">드레스 (R)</option>
                            <option value="드레스 (S)">드레스 (S)</option>
                            <option value="드레스 (RM)">드레스 (RM)</option>
                            <option value="구매안함">구매안함</option>
                        </select>
                    </td>
                    <td>드레스 사이즈:</td>
                    <td>
                        <select name="dressSize" value={orderInfo.dressSize} onChange={handleChange}>
                            {(orderInfo.dressType === "구매안함" ? "" : sizeOptions[orderInfo.dressType].map(size => (
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
                        <select name="ringSizeMen" value={orderInfo.ringSizeMen} onChange={handleChange}>
                            <option value="">구매안함</option>
                            {sizeOptions["반지 (남)"].map(size => (
                                <option key={size} value={size}>{size}</option>
                            ))}
                        </select>
                    </td>
                    <td>여성 반지 사이즈:</td>
                    <td>
                        <select name="ringSizeWomen" value={orderInfo.ringSizeWomen} onChange={handleChange}>
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
                        <select name="necklaceSize" value={orderInfo.necklaceSize} onChange={handleChange}>
                            <option value="">구매안함</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                        </select>
                    </td>
                    <td>귀걸이 종류:</td>
                    <td>
                        <select name="earringType" value={orderInfo.earringType} onChange={handleChange}>
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
                            checked={orderInfo.bowtie || false}
                            onChange={handleChange}
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    );    
}

export default ProductInformationForm;