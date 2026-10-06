import React from 'react'

const DataTable = ({ data, columns }) => {
    return (
        <>
            <table className="w-full text-left text-sm">
                <thead className="bg-gray-100 border-b border-gray-200">
                    <tr>
                        {columns.map((column) => {
                            return (
                                <th key={column.header}
                                className="px-4 py-3 font-semibold text-gray-700"
                                >
                                    {column.header}
                                </th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {
                        data.length > 0 ?(
                            data.map((item) => {
                            return (
                                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                                    {
                                        columns.map((column) => {
                                            return (
                                                <td key={column.header}  className="px-4 py-3 text-gray-600">
                                                    {
                                                        column.render ? column.render(item):item[column.accessor]
                                                    }
                                                </td>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })
                        ):(
                            <tr>
                                <td colSpan={columns.length} className='px-4 py-10 text-center text-gray-500'>
                                    No Data found
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </>
    )
}

export default DataTable