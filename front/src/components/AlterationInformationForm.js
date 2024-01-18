import React, { useState, useEffect } from 'react';

function AlterationInformationForm({ updateAlterationInfo }) {
    const [alterationInfo, setAlterationInfo] = useState({
        dressBackWidth: '', // 드레스 뒷품
        dressLength: '',    // 드레스 기장
        jacketSleeve: '',   // 자켓 소매
        jacketLength: '',   // 자켓 기장
        pantsWaist: '',     // 바지 허리
        pantsLength: ''     // 바지 기장
    });

    const handleChange = (e) => {
        setAlterationInfo({ ...alterationInfo, [e.target.name]: e.target.value });
    };

    const handleBlur = () => {
        updateAlterationInfo(alterationInfo);
    };

    return (
        <div>
            <table onBlur={handleBlur}>
                <tbody>
                    {/* 드레스 뒷품 */}
                    <tr>
                        <td>드레스 뒷품:</td>
                        <td>
                            <input 
                                type="text" 
                                name="dressBackWidth" 
                                value={alterationInfo.dressBackWidth} 
                                onChange={handleChange} 
                            />
                        </td>
                        <td>드레스 기장:</td>
                        <td>
                            <input 
                                type="text" 
                                name="dressLength" 
                                value={alterationInfo.dressLength} 
                                onChange={handleChange} 
                            />
                        </td>
                    </tr>
    
                    {/* 자켓 소매 */}
                    <tr>
                        <td>자켓 소매:</td>
                        <td>
                            <input 
                                type="text" 
                                name="jacketSleeve" 
                                value={alterationInfo.jacketSleeve} 
                                onChange={handleChange} 
                            />
                        </td>
                        <td>자켓 기장:</td>
                        <td>
                            <input 
                                type="text" 
                                name="jacketLength" 
                                value={alterationInfo.jacketLength} 
                                onChange={handleChange} 
                            />
                        </td>
                    </tr>
    
                    {/* 바지 허리 */}
                    <tr>
                        <td>바지 허리:</td>
                        <td>
                            <input 
                                type="text" 
                                name="pantsWaist" 
                                value={alterationInfo.pantsWaist} 
                                onChange={handleChange} 
                            />
                        </td>
                        <td>바지 기장:</td>
                        <td>
                            <input 
                                type="text" 
                                name="pantsLength" 
                                value={alterationInfo.pantsLength} 
                                onChange={handleChange} 
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );    
}

export default AlterationInformationForm;
