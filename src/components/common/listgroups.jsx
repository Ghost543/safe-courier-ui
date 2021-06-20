import React from 'react'

const ListGroups = (props) => {
    const {items,onItemSelect,selectedStatus} = props
    return ( 
        <ul className="list-group ">
            {items.map(item => (
                <li onClick={() => onItemSelect(item)} key={item} className={item === selectedStatus ? "list-group-item d-flex justify-content-between align-items-center active" : "list-group-item d-flex justify-content-between align-items-center"}>
                    {item}
                    {/* <span class="badge bg-primary rounded-pill">{itemsCount}</span> */}
                </li>
            ))}
        </ul>
     );
}
 
export default ListGroups; 
