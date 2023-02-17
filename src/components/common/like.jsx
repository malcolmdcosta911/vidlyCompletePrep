import React from 'react';
import PropTypes from 'prop-types'; 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solid } from '@fortawesome/fontawesome-free-solid';
import { faHeart as regular } from '@fortawesome/fontawesome-free-regular';

const Like = ({ data, onLike, }) => {
    //React.useEffect(() => { }, [props.liked]);
    return (<FontAwesomeIcon icon={data.liked ? solid : regular} onClick={() => onLike(data)} style={{cursor:'pointer'}} /> );
};


Like.propTypes = {
    data: PropTypes.object.isRequired,
    onLike: PropTypes.func.isRequired,
};

export default Like;

