import React from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,TouchableOpacity,ToastAndroid,Alert } from "react-native";
import Colors from '../constants/Colors';
import { useEffect, useState } from "react";
import NotificationCard from "../components/notificationCard";

import IP from '../constants/IP';


const NotificationScreen=(props)=>{

    
    const [customerToken,setCustomerToken]=useState('');
    const [notificationsData,setNotificationsData]=useState([]);
    const [ordersData,setOrdersData]=useState([]);
    const [refreshing,setRefreshing]=useState(true);
   

  
    useEffect(()=>{
        let recieverId='ExponentPushToken[-4WJz5C4pXrrGDKP9hB1hW]';
        let chefId='03154562292';
        fetch(`http://${IP.ip}:3000/order/chefOrders/${chefId}`)
        .then((response)=>response.json())
        .then((response)=>{
            setOrdersData(response);
        })
        .then(()=>{
            fetch(`http://${IP.ip}:3000/notifications/chef/chefNotifications/${recieverId}`)
            .then((response)=>response.json())
            .then((response)=>{
                setNotificationsData(response);
            })
        })
        .then(()=>setRefreshing(false))
        .catch((error)=>console.error(error));
      },[refreshing]);


       const renderNotificationCard=(itemData)=>{      
        return(
            <NotificationCard notificationTitle="Hey, Come here Its order for you!!"
            customerFname={itemData.item.firstname}
            orderId={itemData.item.order_id}
            totalAmount={itemData.item.total_amount}
            status={itemData.item.status}
            currentStatus={itemData.item.status}
            forNotificationScreen
            onDetail={()=>{
                props.navigation.navigate({
                    routeName:'Orders',                
                })
            }}         
           />
           )
       }

    
        return(
            <View style={styles.container}>
            <View style={styles.kitchenContainer}>
            <FlatList data={ordersData} renderItem={renderNotificationCard} keyExtractor={(item)=>item.order_id}
            showsVerticalScrollIndicator={false}/>
            </View>
        </View>
        )
    };


const styles=StyleSheet.create(
    {
        container:{
            flex:1,
            flexDirection:'column',
            height:'100%'
          
        },
        kitchenContainer:{
           width:'100%',
          
        }
       
    }
)

export default NotificationScreen;
