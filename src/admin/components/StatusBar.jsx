import React from 'react'

const StatusBar = ({ status }) => {
    let statusStyle = "";
    if (status === "delivered") {
        statusStyle = "bg-green-100 text-green-700"
    }
    if (status === "blocked") {
        statusStyle = "bg-red-100 text-red-700"
    }
    if (status === "processing" || status === "placed" || status === "pending") {
        statusStyle = "bg-yellow-100 text-yellow-700"
    }
    if (status === "confirmed" || status === "shipped") {
        statusStyle = "bg-blue-100 text-blue-700"
    }
    if(status === "active"){
        statusStyle="bg-green-100 text-green-700"
    }
    return (
        <span className={`${statusStyle} rounded-full px-2.5 py-1 text-xs font-medium`}>
            {status}
        </span>
    )
}

export default StatusBar