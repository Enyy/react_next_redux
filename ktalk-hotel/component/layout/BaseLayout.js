import React from 'react'
import Meta from '../../component/common/Meta';
const BaseLayout = ({ children}) => {
    return <div>
            <Meta />

            {children}
        </div>
}

export default BaseLayout;
