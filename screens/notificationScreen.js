import React from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,TouchableOpacity } from "react-native";
import Colors from '../constants/Colors';
import { useEffect, useState } from "react";
import NotificationCard from "../components/notificationCard";
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

import IP from '../constants/IP';


const NotificationScreen=(props)=>{

    
    const [customerToken,setCustomerToken]=useState('');
    const [notificationsData,setNotificationsData]=useState([]);

  
    useEffect(()=>{
        let recieverId='ExponentPushToken[-4WJz5C4pXrrGDKP9hB1hW]';
        fetch(`http://${IP.ip}:3000/notifications/chef/chefNotifications/${recieverId}`)
        .then((response)=>response.json())
        .then((response)=>{
            setNotificationsData(response);
        })
        .catch((error)=>console.error(error));
      },[]);



       const renderNotificationCard=(itemData)=>{
           
        return(
            <NotificationCard notificationTitle="Hey, Come here Its order for you!!"
            customerFname={itemData.item.firstname}
           // customerLname={lastName}
            orderedDish={itemData.item.dish_name}
            servingSize={itemData.item.quantity}
            timeOfOrder={itemData.item.time}
            notSeen
            onSelect={()=>{
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
            <View style={styles.container}>
            <View style={styles.kitchenContainer}>
            <FlatList data={notificationsData} renderItem={renderNotificationCard} keyExtractor={(item)=>item.order_id}
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
