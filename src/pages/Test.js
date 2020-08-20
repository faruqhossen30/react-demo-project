import React, {useEffect} from 'react';

const Test = ({keyword}) => {
    useEffect(()=>{
        console.log('Test Js useEffect', keyword)
    }, [keyword])
    console.log('Test Js', keyword)
    return (
        <div>
            <p>This is test</p>
        </div>
    );
};

export default Test;