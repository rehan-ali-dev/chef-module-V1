import React from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,TouchableOpacity,ScrollView,RefreshControl } from "react-native";
import Colors from '../constants/Colors';
import { useEffect, useState } from "react";
import OrdersCard from '../components/ordersCard';
import CustomCard from "../components/customCard";
import { HeaderButtons,Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/customHeaderButton";
import IP from "../constants/IP";


const HomeScreen=(props)=>{

    const [pendingOrderCounts,setPendingOrderCounts]=useState(0);
    const [confirmedOrderCounts,setConfirmedOrderCounts]=useState(0);
    const [deliveredOrderCounts,setDeliveredOrderCounts]=useState(0);
    const [refreshing,setRefreshing]=useState(true);
    

        const moveToNotifications=()=>{
            props.navigation.navigate({
                routeName:'Notifications',
            });
        }

        
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
        .then(()=>setRefreshing(false))
        .catch((error)=>console.error(error))
       
      },[refreshing]);
    
        return(
          <View style={styles.screen}>
              <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>{setRefreshing(true)}}/>}>
              <OrdersCard box1="Pending" box2="Confirmed" box3="Delivered" header="ORDERS" pendingCounts={pendingOrderCounts} confirmedCounts={confirmedOrderCounts} deliveredCounts={deliveredOrderCounts}/>
              <View style={styles.cardContainer}>
              <CustomCard title="Your Dishes"/>
              <CustomCard title="Kitchen Hours"/>
              <CustomCard title="Weekly Plans"/>
             
              </View>
              </ScrollView>

          </View>
        )
    };

HomeScreen.navigationOptions=navigationData=>{
    const moveNotifications=()=>{
        navigationData.navigation.navigate({
            routeName:'Notifications'
        })
    }
    return{
        headerRight: ()=><HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title="notification" iconName='ios-notifications' onPress={moveNotifications}/>
        </HeaderButtons>
    }
}


const styles=StyleSheet.create(
    {
        screen:{
            flex:1,
        },
        cardContainer:{
            alignItems:'center',
            marginTop:20
        }
       
    }
)

export default HomeScreen;
