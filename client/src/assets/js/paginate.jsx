import React from 'react';

export const paginate = (url, page, max) => {
    page = parseInt(page);

    return (
        <nav className='paginate'>
            {page > 2 ? (
                <a className='paginate-link' href={url + "?page=1"}>&lt;&lt;</a>
            ) : null}
            {page > 1 ? (
                <a className='paginate-link' href={url + "?page=" + (page - 1)}>&lt;</a>
            ) : null}
            <span className='paginate-link active'>{page}</span>
            {page < max ? (
                <a className='paginate-link' href={url + "?page=" + (page + 1)}>&gt;</a>
            ) : null}
            {page < (max - 1) ? (
                <a className='paginate-link' href={url + "?page=" + max}>&gt;&gt;</a>
            ) : null}
        </nav>
    )
}
