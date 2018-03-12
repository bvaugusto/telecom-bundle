import React from 'react'

export default props => {

    const renderRows = () => {
        const list = props.list || []
        let cont = 0
        return list.map(packageList => (
            
                <div className="plan">
                    <div className="description">{packageList.name}</div>
                    <div className="price">R$ {packageList.price}</div>
                </div>
        ))
    }


    return (
        <div className="container-plans">
            {renderRows()}
        </div>
    )
}