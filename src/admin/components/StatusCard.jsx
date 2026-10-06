import React from 'react'

const StatusCard = ({ title, value, icon }) => {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className='text-sm font-medium text-gray-500'>{title}</h3>
            <p className='mt-1 text-2xl font-bold text-gray-900'>{value}</p>
            {icon && <div>{icon}</div>}
        </div>
    )
}

export default StatusCard