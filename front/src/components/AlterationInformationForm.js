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

    useEffect(() => {
        updateAlterationInfo(alterationInfo);
    }, [alterationInfo, updateAlterationInfo]);

    return (
        <div>
            <label>
                드레스 뒷품:
                <input 
                    type="text" 
                    name="dressBackWidth" 
                    value={alterationInfo.dressBackWidth} 
                    onChange={handleChange} 
                />
            </label>
            <label>
                드레스 기장:
                <input 
                    type="text" 
                    name="dressLength" 
                    value={alterationInfo.dressLength} 
                    onChange={handleChange} 
                />
            </label>
            <label>
                자켓 소매:
                <input 
                    type="text" 
                    name="jacketSleeve" 
                    value={alterationInfo.jacketSleeve} 
                    onChange={handleChange} 
                />
            </label>
            <label>
                자켓 기장:
                <input 
                    type="text" 
                    name="jacketLength" 
                    value={alterationInfo.jacketLength} 
                    onChange={handleChange} 
                />
            </label>
            <label>
                바지 허리:
                <input 
                    type="text" 
                    name="pantsWaist" 
                    value={alterationInfo.pantsWaist} 
                    onChange={handleChange} 
                />
            </label>
            <label>
                바지 기장:
                <input 
                    type="text" 
                    name="pantsLength" 
                    value={alterationInfo.pantsLength} 
                    onChange={handleChange} 
                />
            </label>
        </div>
    );
}

export default AlterationInformationForm;
