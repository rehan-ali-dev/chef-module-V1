import React from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,TouchableOpacity,RefreshControl,Alert,Modal } from "react-native";
import Colors from '../constants/Colors';
import OrdersCard from "../components/ordersCard";

import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { updateOrderStatus,updateOrderCounts } from "../store/actions/orderActions";
import { ScrollView } from "react-native-gesture-handler";
import NotificationCard from "../components/notificationCard";
import OrderDetailsTable from "../components/orderDetailsTable";
import OrderDetailsComponent from "../components/orderDetailsComponent";
import IP from "../constants/IP";


const OrdersScreen=(props)=>{

   
    const [customerToken,setCustomerToken]=useState('');
    const [notificationData,setNotificationData]=useState([]);
    const [ordersData,setOrdersData]=useState([]);
    const [refreshing,setRefreshing]=useState(false);
    const [showModal,setShowModal]=useState(false);
    const [selectedOrderId,setSelectedOrderId]=useState(0);
    const [customerData,setCustomerData]=useState({});
    const [items,setItems]=useState([]);

    const dispatch=useDispatch();
    const ordersCounts=useSelector(state=>state.order.OrdersCounts);
    const chefOrders=useSelector(state=>state.order.Orders);


    /*useEffect(()=>{
        const chefId='03154562292';
            fetch(`http://${IP.ip}:3000/order/chefOrders/${chefId}`)
            .then((response)=>response.json())
            .then((response)=>{
            setOrdersData(response);
        })
        .then(()=>setRefreshing(false))
        .catch((error)=>console.error(error))   
      },[refreshing]);*/
    
      // Function to confirm the order
      const updateOrderAsConfirmed=(orderId)=>{
        let url=`http://${IP.ip}:3000/order/updateStatus/${orderId}`;
        let data={
            status:'confirmed',
        }
        fetch(url,{
            method:'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
            body:JSON.stringify(data)
        }).then((response)=>response.json())
        .then(()=>showAlert(orderId,"Order Confirmed!"))
        .then(()=>dispatch(updateOrderCounts('confirmed')))
        .then(()=>dispatch(updateOrderStatus(orderId,'confirmed')))
        
        //.then(()=>setRefreshing(true))
        .catch((error)=>console.error(error))   
      }

      // Function to confirm the order
      const updateOrderAsCancelled=(orderId)=>{
        let url=`http://${IP.ip}:3000/order/updateStatus/${orderId}`;
        let data={
            status:'cancelled',
        }
        fetch(url,{
            method:'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
            body:JSON.stringify(data)
        }).then((response)=>response.json())
        .then(()=>showAlert(orderId,"Order Cancelled!"))
        .then(()=>dispatch(updateOrderCounts('cancelled')))
        .then(()=>dispatch(updateOrderStatus(orderId,'cancelled')))
        
        //.then(()=>setRefreshing(true))
        .catch((error)=>console.error(error))   
      }


      const showAlert=(orderId,title)=>{
        Alert.alert(`${title}`,`Order# : ${orderId}\nCustomer Name : ${customerData.firstname} ${customerData.lastname}\nTotal Items : ${items.map(item => item.quantity).reduce((prev, curr) => prev + curr, 0)}\nTotal Amount : ${items.map(item => item.total_amount).reduce((prev, curr) => prev + curr, 0)}\nOrder Status: Confirmed\n`,[{
            text:'Okey!',
            style:'cancel'
        }]);
    }


      const renderNotificationCard=(itemData)=>{  
        return(
            <NotificationCard
            timeOfOrder={itemData.item.time}
            orderId={itemData.item.order_id}
            forOrderScreen
            status={itemData.item.status}
            currentStatus={itemData.item.status}

            onViewDetails={()=>{
                    setSelectedOrderId(itemData.item.order_id);
                    getOrderDetailsList(itemData.item.order_id);
                    console.log(selectedOrderId);
                    setShowModal(true);
            }}

            onSelect={()=>{
            updateOrderAsConfirmed(itemData.item.order_id);
            fetch(`http://${IP.ip}:3000/notifications/order/${itemData.item.order_id}`)
            .then((response)=>response.json())
           // .then((response)=>setNotificationData(response))
           // .then(()=>console.log(notificationData))
            
            .then((response)=>{
            console.log(response);
            setCustomerToken(response[0].sender);
            console.log(customerToken);
            console.log("%%%%%%%%%%%%%%%%%%");
            })
            .then(()=>{
                console.log("Fetching.........");
                fetch('https://exp.host/--/api/v2/push/send',{
                    method:'POST',
                    headers:{
                        'Accept':'application/json',
                        'Accept-Encoding':'gzip,deflate',
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        to:customerToken,
                        data:{
                            sender:'ExponentPushToken[-4WJz5C4pXrrGDKP9hB1hW]',
                            reciever:customerToken,
                            orderId:itemData.item.order_id,
                            status:false
                        },
                        title:'Chef Confirm Your Order',
                        body:"Kindly wait till delivery",  
                        //experienceId: "@rehan.ali/customer-module-V1",
                    })
                }).then(()=>console.log("Confirmation notification sent to Customer"))
                .then(()=>{
                        //send notification to Admin
                fetch('https://exp.host/--/api/v2/push/send',{
                    method:'POST',
                    headers:{
                        'Accept':'application/json',
                        'Accept-Encoding':'gzip,deflate',
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        to:'ExponentPushToken[jXY39COY1qo-vtkAP4_dnh]',
                        data:{
                            orderId:itemData.item.order_id,
                            sender:'ExponentPushToken[-4WJz5C4pXrrGDKP9hB1hW]',
                            reciever:customerToken,
                            orderStatus:'confirmed'
                        },
                        title:`New Order Confirmed`,
                        body:`New Order Confirmed Order Id: #${itemData.item.order_id}`,  
                        experienceId: "@rehan.ali/Admin-module-app-V1",
                    })
                }).then(()=>{
                    console.log("Notification Sent to Admin")
                })
                })
            })
            .then(()=>{console.log("Clicked Working")})
            .catch((error)=>console.error(error));  
           }}



           onCancel={()=>{
            updateOrderAsCancelled(itemData.item.order_id);
            fetch(`http://${IP.ip}:3000/notifications/order/${itemData.item.order_id}`)
            .then((response)=>response.json())
           // .then((response)=>setNotificationData(response))
           // .then(()=>console.log(notificationData)) 
            .then((response)=>{
            console.log(response);
            setCustomerToken(response[0].sender);
            console.log(customerToken);
            console.log("%%%%%%%%%%%%%%%%%%");
            })
            .then(()=>{
                console.log("Fetching.........");
                fetch('https://exp.host/--/api/v2/push/send',{
                    method:'POST',
                    headers:{
                        'Accept':'application/json',
                        'Accept-Encoding':'gzip,deflate',
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        to:customerToken,
                        data:{
                            sender:'ExponentPushToken[-4WJz5C4pXrrGDKP9hB1hW]',
                            reciever:customerToken,
                            orderId:itemData.item.order_id,
                            status:false
                        },
                        title:"Sorry, We Cant't Serve You at this moment",
                        body:"Chef Cancelled Your Order",  
                        //experienceId: "@rehan.ali/customer-module-V1",
                    })
                }).then(()=>console.log("Confirmation notification sent to Customer"))
                .then(()=>{
                        //send notification to Admin
                fetch('https://exp.host/--/api/v2/push/send',{
                    method:'POST',
                    headers:{
                        'Accept':'application/json',
                        'Accept-Encoding':'gzip,deflate',
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        to:'ExponentPushToken[jXY39COY1qo-vtkAP4_dnh]',
                        data:{
                            orderId:itemData.item.order_id,
                            sender:'ExponentPushToken[-4WJz5C4pXrrGDKP9hB1hW]',
                            reciever:customerToken,
                            orderStatus:'cancelled'
                        },
                        title:`Chef Cancelled The Order`,
                        body:`Order Cancelled Order Id: #${itemData.item.order_id}`,  
                        experienceId: "@rehan.ali/Admin-module-app-V1",
                    })
                }).then(()=>{
                    console.log("Notification Sent to Admin")
                })
                })
            })
            .then(()=>{console.log("Clicked Working")})
            .catch((error)=>console.error(error));  
           }}
           />
           )
       }

       const getOrderDetailsList=(orderId)=>{
        fetch(`http://${IP.ip}:3000/orderDetail/orderedDishes/${orderId}`)
        .then((response)=>response.json())
        .then((response)=>setItems(response))
        .then(()=>console.log(items))
        .then(async ()=>{
            await fetch(`http://${IP.ip}:3000/order/customerRecord/${orderId}`)
            .then((response)=>response.json())
            .then((response)=>setCustomerData(response[0]))
        })
        .catch((error)=>console.error(error))
       }


       const renderOrderItem=(itemData)=>{
        return(
            <View style={{flex:1,flexDirection:'row',justifyContent:'space-around',}}>
              <Text style={{flex:4}}>{itemData.item.dish_name}</Text>
              <Text style={{flex:1}}>{itemData.item.quantity}</Text>
              <Text style={{flex:1}}>{itemData.item.total_amount}</Text>
            </View>
        )
        }


        return(
          <View style={styles.screen}>
              <OrdersCard box1="Pending" box2="Confirmed" box3="Delivered"  header="ORDERS" pendingCounts={ordersCounts.pendingCounts!==null?ordersCounts.pendingCounts:0} confirmedCounts={ordersCounts.confirmedCounts!==null?ordersCounts.confirmedCounts:0} deliveredCounts={ordersCounts.deliveredCounts!==null?ordersCounts.deliveredCounts:0}/>
              {/* 
              <OrdersCard box1="Completed" box2="Cancelled" box3="Total" header="ORDERS HISTORY"/>
              
              <View style={styles.btnContainer}>
                <TouchableOpacity onPress={props.onSelect}>
                <View style={styles.buttonContainer}>
                    <Text style={styles.btnTitle}>VIEW ORDERS HISTORY</Text>
                </View>
            </TouchableOpacity>
            </View>
            */}
            <View style={styles.kitchenContainer}>
            <FlatList 
            //data={ordersData}
            data={chefOrders} renderItem={renderNotificationCard} keyExtractor={(item)=>item.order_id}
            showsVerticalScrollIndicator={false}
            />
            </View>


            <Modal
                transparent={true}
                visible={showModal}>
                <View style={{backgroundColor:'#000000aa',flex:1}}>
                    <View style={{backgroundColor:'#fff',margin:40,marginTop:120,borderRadius:10,padding:10}}>
                    <View style={styles.orderHeader}>
                    <Text style={styles.headerText}>Order Details</Text>
                    </View>
                    <Text style={styles.title}>Order Id: #{selectedOrderId}</Text>
                    <Text style={styles.subTitle}>Customer Name: {customerData.firstname} {customerData.lastname}</Text>
                  
                    <Text style={styles.headerText}>Ordered Dishes</Text>
                    <View>
                    {/*<OrderDetailsComponent orderID={selectedOrderId}/>*/}
                    <View style={{width:'100%',flexDirection:'row',justifyContent:'space-around',}}>
                    <Text style={{...styles.title,flex:2.5,fontSize:14}}>Dish Name</Text>
                    <Text style={{...styles.title,flex:1,fontSize:14}}>Quantity</Text>
                    <Text style={{...styles.title,flex:1,fontSize:14}}>Amount</Text>
                    </View>
                    <FlatList 
                    data={items} renderItem={renderOrderItem} keyExtractor={(item)=>item.dish_id}
                    showsVerticalScrollIndicator={false}
                    />
                    <View style={{width:'95%',flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{...styles.title,fontSize:14}}>Total Amount: </Text>
                    <Text style={{...styles.title,fontSize:14}}>Rs.{items.map(item => item.total_amount).reduce((prev, curr) => prev + curr, 0)}</Text>
                    </View>
                    </View>

                    {/*<OrderDetailsTable orderID={selectedOrderId}/>*/}   
                <View style={{...styles.btnContainer,justifyContent:'flex-end'}}>
                <TouchableOpacity onPress={()=>{
                    setShowModal(false);
                    }}>       
                <View style={{...styles.buttonContainer,backgroundColor:Colors.primaryLightColor,paddingHorizontal:10,borderRadius:10}}>
                    <Text style={{...styles.btnTitle,fontSize:14}}>OK</Text>
                </View>
                </TouchableOpacity>
                </View>

                </View>
                </View>
            </Modal>


          </View>
        )
    };


const styles=StyleSheet.create(
    {
        screen:{
            flex:1,
            
        },
        buttonContainer:{
            flexDirection:'row',
            backgroundColor:Colors.primaryColor,
            justifyContent:'center',
            padding:10,
            borderRadius:20
        },
        btnContainer:{
            flexDirection:'row',
            justifyContent:'center',
            paddingTop:15
        },
        btnTitle:{
            color:Colors.whiteColor,
            fontSize:16,
           
            paddingEnd:10
        },
        kitchenContainer:{
            width:'100%',
            flex:1
           
         },
         orderHeader:{
            justifyContent:'center',
            alignItems:'center'
        }, 
        headerText:{
            color:Colors.primaryColor,
            fontSize:16,
            marginBottom:5,
            fontWeight:'bold'
        }, 
        title:{
            fontSize:16,
            fontWeight:"bold",
            color:'#000'
        },
        subTitle:{
            fontSize:16,
            color:"#000"
        },
       
    }
)

export default OrdersScreen;
