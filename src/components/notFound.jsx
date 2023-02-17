import React, { useEffect } from 'react';
import {useNavigate}  from 'react-router-dom';


const NotFound = () => {
    const navigate = useNavigate();

useEffect(()=>{
    // setTimeout(() => { navigate('/')}, 1000);
    navigate('/');
});


    return ( <h3>Page Not Found</h3> );
}
 
export default NotFound;