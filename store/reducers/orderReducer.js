import { GET_ORDER_DETAILS,GET_ORDER_DATA,
    UPDATE_ORDER_STATUS,GET_ORDER_COUNTS,UPDATE_ORDER_COUNTS
 } from "../actions/orderActions";

import IP from "../../constants/IP";




const initialState={
    Orders:[],
    OrderDetails:[],
    OrdersCounts:{
        totalOrders:0,
        pendingCounts:0,
        confirmedCounts:0,
        deliveredCounts:0
    },
}

const orderReducer=(state=initialState,action)=>{
    switch(action.type){
        case GET_ORDER_DATA:
          return {...state,Orders:action.orders};
        
        case GET_ORDER_DETAILS:
            return {...state,OrderDetails:action.orderDetails};
        
        case GET_ORDER_COUNTS:
            return {...state,OrdersCounts:action.orderCounts};
        
        case UPDATE_ORDER_STATUS:
            const ifSelected=state.Orders.findIndex(order=>order.order_id===action.orderId);
                if(ifSelected>=0){
                    let selectedOrder=state.Orders[ifSelected];
                    selectedOrder.status='confirmed';
                    const ordersData=[...state.Orders];
                    ordersData.splice(ifSelected, 1,selectedOrder);
                    return {...state,Orders:ordersData};
                };
            return state;
        case UPDATE_ORDER_COUNTS:
                    let counts=state.OrdersCounts;
                    if(action.orderStatus==='pending'){
                        counts.pendingCounts=counts.pendingCounts+1;
                    }
                    else if(action.orderStatus==='confirmed'){
                        counts.confirmedCounts=counts.confirmedCounts+1;
                        counts.pendingCounts=counts.pendingCounts-1;
                    }
                    else if(action.orderStatus==='delivered'){
                        counts.deliveredCounts=counts.deliveredCounts+1;
                    }
                    return {...state,OrdersCounts:counts};
                 

        default:
            return state;    
    }
 
  
}

export default orderReducer;