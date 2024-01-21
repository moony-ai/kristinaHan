import React, { useState, useEffect } from 'react';

function AlterationInformationForm({ updateAlterationInfo }) {
    const [alterationInfo, setAlterationInfo] = useState({
        dressBackWidth: '', // 드레스 뒷품
        dressLength: '',    // 드레스 기장
        jacketSleeveLength: '',   // 자켓 소매
        jacketLength: '',   // 자켓 기장
        pantsWaistLength: '',     // 바지 허리
        pantsLength: ''     // 바지 기장
    });

    const handleChange = (e) => {
        setAlterationInfo({ ...alterationInfo, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        updateAlterationInfo(alterationInfo);
    }, [alterationInfo, updateAlterationInfo]);

    return (
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
                                onChange={handleChange} 
                            />
                        </td>
                        <td>CM</td>
                        <td>드레스 기장:</td>
                        <td>
                            <input 
                                type="text" 
                                name="dressLength" 
                                value={alterationInfo.dressLength} 
                                onChange={handleChange} 
                            />
                        </td>
                        <td>CM</td>
                    </tr>
    
                    {/* 자켓 소매 */}
                    <tr>
                        <td>자켓 소매:</td>
                        <td>
                            <input 
                                type="text" 
                                name="jacketSleeveLength" 
                                value={alterationInfo.jacketSleeveLength} 
                                onChange={handleChange} 
                            />
                        </td>
                        <td>CM</td>
                        <td>자켓 기장:</td>
                        <td>
                            <input 
                                type="text" 
                                name="jacketLength" 
                                value={alterationInfo.jacketLength} 
                                onChange={handleChange} 
                            />
                        </td>
                        <td>CM</td>
                    </tr>
    
                    {/* 바지 허리 */}
                    <tr>
                        <td>바지 허리:</td>
                        <td>
                            <input 
                                type="text" 
                                name="pantsWaistLength" 
                                value={alterationInfo.pantsWaistLength} 
                                onChange={handleChange} 
                            />
                        </td>
                        <td>CM</td>
                        <td>바지 기장:</td>
                        <td>
                            <input 
                                type="text" 
                                name="pantsLength" 
                                value={alterationInfo.pantsLength} 
                                onChange={handleChange} 
                            />
                        </td>
                        <td>CM</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );    
}

export default AlterationInformationForm;
