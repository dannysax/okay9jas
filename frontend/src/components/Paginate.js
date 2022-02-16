import React from 'react';
import { Button, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom'

function Paginate({page, pages, keyword}){
    
    if(keyword){
        keyword = keyword.split('?keyword=')[1].split('&')[0]
    }

    console.log("keyword:", keyword)

    return(
        pages > 1 && (
            <Pagination>
                {
                    [...Array(pages).keys()].map((x)=>(
                        <Link key={x+1}
                        to = {`/?keyword=${keyword}&page=${x+1}`}
                        active = {x + 1 === page}
                        >
                        <Button>{x+1}</Button>
                        </Link>
                    ))
                }
            </Pagination>
        )
    )
}
export default Paginate;