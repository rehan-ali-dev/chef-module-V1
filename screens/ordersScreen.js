import React from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,TouchableOpacity,RefreshControl,Alert } from "react-native";
import Colors from '../constants/Colors';
import OrdersCard from "../components/ordersCard";

import { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import NotificationCard from "../components/notificationCard";
import IP from "../constants/IP";


const OrdersScreen=(props)=>{

    const [pendingOrderCounts,setPendingOrderCounts]=useState(0);
    const [confirmedOrderCounts,setConfirmedOrderCounts]=useState(0);
    const [deliveredOrderCounts,setDeliveredOrderCounts]=useState(0);
    const [customerToken,setCustomerToken]=useState('');
    const [ordersData,setOrdersData]=useState([]);
    const [refreshing,setRefreshing]=useState(true);

    useEffect(()=>{
        const chefId='03154562292';
        fetch(`http://${IP.ip}:3000/orderCounts/pending/${chefId}`)
        .then((response)=>response.json())
        .then((response)=>setPendingOrderCounts(response[0].orders))
        .then(()=>{
            fetch(`http://${IP.ip}:3000/orderCounts/confirmed/${chefId}`)
            .then((response)=>response.json())
            .then((response)=>setConfirmedOrderCounts(response[0].orders))
        })
        .then(()=>{
            fetch(`http://${IP.ip}:3000/orderCounts/delivered/${chefId}`)
            .then((response)=>response.json())
            .then((response)=>setDeliveredOrderCounts(response[0].orders))
        })
        .then(()=>{
            fetch(`http://${IP.ip}:3000/order/chefOrders/${chefId}`)
            .then((response)=>response.json())
            .then((response)=>{
            setOrdersData(response);
        })
        })
        .then(()=>setRefreshing(false))
        .catch((error)=>console.error(error))   
      },[refreshing]);
    


      // Function to confirm the order
      const updateOrderAsConfirmed=(orderId,dishName,quantity)=>{
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
        .then(()=>showAlert(orderId,dishName,quantity))
        .then(()=>setRefreshing(true))
        .catch((error)=>console.error(error))   
      }


      const showAlert=(orderId,dishName,quantity)=>{
        Alert.alert("Order Confirmed!",`Order# : ${orderId}\nDish Name : ${dishName}\nQuantity : ${quantity}\nOrder Status: Confirmed\n`,[{
            text:'Okey!',
            style:'cancel'
        }]);
    }




      const renderNotificationCard=(itemData)=>{  
        return(
            <NotificationCard notificationTitle="You recently recieved order"
            customerFname={itemData.item.firstname}
           // customerLname={lastName}
            orderedDish={itemData.item.dish_name}
            servingSize={itemData.item.quantity}
            timeOfOrder={itemData.item.time}
            totalAmount={itemData.item.total_amount}
            status={itemData.item.status}
            currentStatus={itemData.item.status}
            onSelect={()=>{
            updateOrderAsConfirmed(itemData.item.order_id,itemData.item.dish_name,itemData.item.quantity);
            fetch(`http://${IP.ip}:3000/notifications/order/${itemData.item.order_id}`)
            .then((response)=>response.json())
            .then((response)=>{
            setCustomerToken(response[0].sender);
            console.log("%%%%%%%%%%%%%%%%%%");
            console.log(customerToken);
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
                        experienceId: "@rehan.ali/customer-module-V1",
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
           />
           )
       }



        return(
          <View style={styles.screen}>
              <OrdersCard box1="Pending" box2="Confirmed" box3="Delivered"  header="ORDERS" pendingCounts={pendingOrderCounts} confirmedCounts={confirmedOrderCounts} deliveredCounts={deliveredOrderCounts}/>
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
            <FlatList data={ordersData} renderItem={renderNotificationCard} keyExtractor={(item)=>item.order_id}
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>{setRefreshing(true)}}/>}
            />
            </View>
          </View>
        )
    };


const styles=StyleSheet.create(
    {
        screen:{
            flex:1,
            paddingBottom:20
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
           
         }
       
    }
)

export default OrdersScreen;
