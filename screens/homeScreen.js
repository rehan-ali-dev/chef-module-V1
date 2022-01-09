import React from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,TouchableOpacity } from "react-native";
import Colors from '../constants/Colors';
import { useEffect, useState } from "react";
import OrdersCard from '../components/ordersCard';
import CustomCard from "../components/customCard";
import { HeaderButtons,Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/customHeaderButton";


const HomeScreen=(props)=>{


        const moveToNotifications=()=>{
            props.navigation.navigate({
                routeName:'Notifications',
            });
        }
    
        return(
          <View style={styles.screen}>
              <OrdersCard box1="Pending" box2="Confirmed" box3="Pre-order" header="ORDERS"/>
              <View style={styles.cardContainer}>
              <CustomCard title="Your Dishes"/>
              <CustomCard title="Kitchen Hours"/>
              <CustomCard title="Weekly Plans"/>
              </View>

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
