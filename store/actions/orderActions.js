export const GET_ORDER_DATA='GET_ORDER_DATA';
export const GET_ORDER_DETAILS='GET_ORDER_DETAILS';
export const UPDATE_ORDER_STATUS='UPDATE_ORDER_STATUS';
export const GET_ORDER_COUNTS='GET_ORDER_COUNTS';
export const UPDATE_ORDER_COUNTS='UPDATE_ORDER_COUNTS';
export const GET_DISHES='GET_DISHES';
export const ADD_DISH='ADD_DISH';
export const EDIT_DISH='EDIT_DISH';


export const getOrderData=(items)=>{
    return{type:GET_ORDER_DATA,orders:items};
}

export const getDishes=(items)=>{
    return{type:GET_DISHES,dishes:items};
}

export const addDish=(item)=>{
    return{type:ADD_DISH,newDish:item};
}

export const editDish=(item)=>{
    return{type:EDIT_DISH,editableDish:item};
}

export const getOrderDetails=(items)=>{
    return{type:GET_ORDER_DETAILS,orderDetails:items};

}

export const getOrderCounts=(countsObj)=>{
    return{type:GET_ORDER_COUNTS,orderCounts:countsObj};
}

export const updateOrderStatus=(item,stat)=>{
    return{type:UPDATE_ORDER_STATUS,orderId:item,status:stat};
}

export const updateOrderCounts=(orderType)=>{
    return{type:UPDATE_ORDER_COUNTS,orderStatus:orderType};
}
