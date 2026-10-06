import React from 'react'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <>
            <div className="flex items-center justify-between pt-4 mt-2">
                <button onClick={() => {
                    onPageChange(currentPage - 1)
                }}
                    disabled={currentPage === 1}
                    className="rounded border border-gray-300 bg-white px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >Previous</button>

                <span className="text-xs text-gray-600 font-medium">
                    Page {currentPage} of {totalPages}
                </span>

                <button onClick={() => {
                    onPageChange(currentPage + 1)
                }} disabled={currentPage === totalPages}
                    className="rounded border border-gray-300 bg-white px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >Next</button>
            </div>
        </>
    )
}

export default Pagination