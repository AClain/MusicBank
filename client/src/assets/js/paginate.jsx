import React from 'react';

export const paginate = (url, page, max) => {
    page = parseInt(page);

    const queryString = require('query-string');

    const newPage = (newPage) => {
        const currentUrl = window.location.href;
        const urlArray = currentUrl.split('?');
        const parsed = queryString.parse("?" + urlArray[1]);

        parsed.page = newPage;

        const newQuery = queryString.stringify(parsed);
        const newUrl = urlArray[0] + '?' + newQuery;

        return newUrl;
    }

    return (
        <nav className='paginate'>
            {page > 2 ? (
                <a className='paginate-link' href={newPage(1)}>&lt;&lt;</a>
            ) : null}
            {page > 1 ? (
                <a className='paginate-link' href={newPage(page - 1)}>&lt;</a>
            ) : null}
            <span className='paginate-link active'>{page}</span>
            {page < max ? (
                <a className='paginate-link' href={newPage(page + 1)}>&gt;</a>
            ) : null}
            {page < (max - 1) ? (
                <a className='paginate-link' href={newPage(max)}>&gt;&gt;</a>
            ) : null}
        </nav>
    )
}
