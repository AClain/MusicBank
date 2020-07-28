import React from 'react';

import CancelIcon from '@material-ui/icons/Cancel';

import './css/alert.css';

export default function Alert(props) {

    return (
        <div className='alert-container fadeInTop'>
            <div className={`alert alert-` + props.type}>
                <p className='alert-txt'>
                    {props.children}
                </p>
                <div className='alert-close'>
                    <CancelIcon
                        className='alert-close-icon'
                        onClick={e => props.clickAction('')}
                        fontSize='large'
                        htmlColor='#222831' />
                </div>
            </div>
        </div>
    )
}