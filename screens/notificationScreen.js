import React from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,TouchableOpacity } from "react-native";
import Colors from '../constants/Colors';
import { useEffect, useState } from "react";
import NotificationCard from "../components/notificationCard";
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

import IP from '../constants/IP';


const NotificationScreen=(props)=>{

    const [isLoading,setLoading]=useState(true);
    const [customerName,setCustomerName]=useState('');
    const [firstName,setFirstName]=useState('');
    const [lastName,setLastName]=useState('');
    const [dishName,setDishName]=useState('');
    const [orderedTime,setOrderedTime]=useState('');
    const [customerToken,setCustomerToken]=useState('');
    const [noPlates,setNoOfPlates]=useState(0);
    const [notificationsData,setNotificationsData]=useState([]);
    let formated;

    const getCustomerName=(id)=>{
            fetch(`http://${IP.ip}:3000/order/customerRecord/${id}`)
            .then((response)=>response.json())
            .then((response)=>{
                setFirstName(response[0].firstname);
                setLastName(response[0].lastname);
            })
            .catch((error)=>console.error(error))
    }

    const getDishName=(id)=>{
        fetch(`http://${IP.ip}:3000/order/dishRecord/${id}`)
        .then((response)=>response.json())
        .then((response)=>{
            console.log(response[0]);
            setDishName(response[0].dish_name);        
        })
        .catch((error)=>console.error(error))
}
    
        const getOrderedTime=(id)=>{
            fetch(`http://${IP.ip}:3000/order/time/${id}`)
            .then((response)=>response.json())
            .then((response)=>{
                //console.log(response[0]);
                setOrderedTime(response[0].time);
                //formated=orderedTime.format("dd/mm/yyyy hh:MM:ss");  
                //console.log(formated);      
            })
            .catch((error)=>console.error(error))
        }

        const getServingSize=(id)=>{
            fetch(`http://${IP.ip}:3000/order/dishQuantity/${id}`)
            .then((response)=>response.json())
            .then((response)=>{
                //console.log(response[0]);
                setNoOfPlates(response[0].quantity);
                //formated=orderedTime.format("dd/mm/yyyy hh:MM:ss");  
                //console.log(formated);      
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
            getCustomerName(itemData.item.order_id);
            getDishName(itemData.item.order_id);
            getOrderedTime(itemData.item.order_id);
            getServingSize(itemData.item.order_id);
        return(
            <NotificationCard notificationTitle="Hey, Come here Its order for you!!"
            customerFname={firstName}
            customerLname={lastName}
            orderedDish={dishName}
            timeOfOrder={orderedTime}
            servingSize={noPlates}
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
                        title:'Chef Confirm Your Order',
                        body:"Kindly wait till delivery",  
                        experienceId: "@rehan.ali/customer-module-V1",
                    })
                });
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
