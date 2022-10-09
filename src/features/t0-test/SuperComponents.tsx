import React from 'react';
import SuperInput from './common/c1-SuperInputText/SuperInput';
import SuperButton from './common/c2-SuperButton/SuperButton';
import SuperCheckbox from './common/c3-SuperCheckbox/SuperCheckbox';

const SuperComponents = () => {
    return (
        <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',alignItems:'center',height:'200px',paddingTop:'100px'}}>
            <SuperInput/>
            <SuperCheckbox/>
            <SuperButton/>
        </div>
    );
};

export default SuperComponents;