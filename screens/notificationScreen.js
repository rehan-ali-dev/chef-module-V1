import React from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,TouchableOpacity } from "react-native";
import Colors from '../constants/Colors';
import { useEffect, useState } from "react";
import NotificationCard from "../components/notificationCard";
import IP from '../constants/IP';


const NotificationScreen=(props)=>{

    const [isLoading,setLoading]=useState(true);
    const [notificationsData,setNotificationsData]=useState([]);

    const getCustomerName=(id)=>{
        let customerName;
           fetch(`http://${IP.ip}:3000/order/customerId/${id}`)
            .then((response)=>response.json())
            .then((response)=>{
                customerName=response[0].cust_id;
                console.log("customer");
                console.log(customerName);
                return customerName;
            })
            .catch((error)=>console.error(error))
          
    }
    

    useEffect(()=>{
        let recieverId='ExponentPushToken[-4WJz5C4pXrrGDKP9hB1hW]';
        fetch(`http://${IP.ip}:3000/notifications/${recieverId}`)
        .then((response)=>response.json())
        .then((response)=>setNotificationsData(response))
        .catch((error)=>console.error(error))
        .finally(()=>setLoading(false));
      },[]);


       const renderNotificationCard=(itemData)=>{

        return(
            <NotificationCard notificationTitle="Hey, Come here Its order for you!!"
            customerName={getCustomerName(itemData.item.order_id)}
            notSeen
             onSelect={()=>{
                     }

                }
           />
           )
         
        
       }

    
        return(
            <View style={styles.container}>
            <View style={styles.kitchenContainer}>
            <FlatList data={notificationsData} renderItem={renderNotificationCard} keyExtractor={(item)=>item.not_id}
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
