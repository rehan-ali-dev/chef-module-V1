import React from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,TouchableOpacity } from "react-native";
import Colors from '../constants/Colors';
import OrdersCard from "../components/ordersCard";

import { useEffect, useState } from "react";


const OrdersScreen=(props)=>{

    
        return(
          <View style={styles.screen}>
              <OrdersCard box1="Pending" box2="Confirmed" box3="Pre-order" header="ORDERS"/>
              <OrdersCard box1="Completed" box2="Cancelled" box3="Total" header="ORDERS HISTORY"/>
              <View style={styles.btnContainer}>
                <TouchableOpacity onPress={props.onSelect}>
                <View style={styles.buttonContainer}>
                    <Text style={styles.btnTitle}>VIEW ORDERS HISTORY</Text>
                </View>
            </TouchableOpacity>
            </View>
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
        }
       
    }
)

export default OrdersScreen;
