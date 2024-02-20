import React from 'react'
import { Oval } from 'react-loader-spinner'

const Loader = () => {
    return (
        <Oval
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
            strokeWidth	= "5"
        />
    )
}

export default Loader