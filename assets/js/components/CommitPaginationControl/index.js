import React from 'react';

function getPageQuery(props){
    const rawSearch = new URLSearchParams(props.location.search); 
    return rawSearch.get('page')    
}

const addQuery = (props) => (key, value) => {
    let pathname = props.location.pathname;
    // returns path: '/app/books'
    let searchParams = new URLSearchParams(props.location.search);
    // returns the existing query string: '?type=fiction&author=fahid'
  
    if(searchParams.has(key)){
       searchParams.delete(key)  
    }
  
    searchParams.append(key, value);
    
    props.history.push({
      pathname: pathname,
      search: searchParams.toString()
    })
  }

const CommitPaginationControl = (props) => {
    const { extraProps } = props
    const page = getPageQuery(extraProps) || 1
    const paginateTable = addQuery(extraProps)
    return (<nav aria-label="Page navigation example">
    <ul className="pagination">
      <li className="page-item">
        <a className="page-link" href="#" aria-label="Previous" onClick={(e) => {
                         e.preventDefault()
                         paginateTable('page', Math.max(Number(page) - 1, 1))
                      }}>
          <span aria-hidden="true">&laquo;</span>
          <span className="sr-only">Previous</span>
        </a>
      </li>
      <li className="page-item"><a className="page-link" href="#">{page}</a></li>
      <li className="page-item">
        <a className="page-link" href="#" aria-label="Next" onClick={(e) => {
                         e.preventDefault()
                         paginateTable('page', Number(page) + 1)
                      }}>
          <span aria-hidden="true">&raquo;</span>
          <span className="sr-only">Next</span>
        </a>
      </li>
    </ul>
  </nav>)
}



export default CommitPaginationControl