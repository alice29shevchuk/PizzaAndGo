import React from 'react'
import ReactPaginate from 'react-paginate';
import styles from '../Pagination/Pagination.module.scss';
export const Pagination = ({onChangePage,pageCount}) => {
  return (
    <ReactPaginate
    className={styles.root}
    breakLabel="..."
    nextLabel=">"
    onPageChange={(e)=>onChangePage(e.selected+1)}
    pageRangeDisplayed={4}
    pageCount={pageCount}
    previousLabel="<"
    renderOnZeroPageCount={null}
  />
  )
}
