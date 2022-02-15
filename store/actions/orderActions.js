export const GET_ORDER_DATA='GET_ORDER_DATA';
export const GET_ORDER_DETAILS='GET_ORDER_DETAILS';
export const UPDATE_ORDER_STATUS='UPDATE_ORDER_STATUS';
export const GET_ORDER_COUNTS='GET_ORDER_COUNTS';
export const UPDATE_ORDER_COUNTS='UPDATE_ORDER_COUNTS';


export const getOrderData=(items)=>{
    return{type:GET_ORDER_DATA,orders:items};
}

export const getOrderDetails=(items)=>{
    return{type:GET_ORDER_DETAILS,orderDetails:items};

}

export const getOrderCounts=(countsObj)=>{
    return{type:GET_ORDER_COUNTS,orderCounts:countsObj};
}

export const updateOrderStatus=(item)=>{
    return{type:UPDATE_ORDER_STATUS,orderId:item};
}

export const updateOrderCounts=(orderType)=>{
    return{type:UPDATE_ORDER_COUNTS,orderStatus:orderType};
}
