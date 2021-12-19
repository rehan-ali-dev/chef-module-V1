import React from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,TouchableOpacity } from "react-native";
import Colors from '../constants/Colors';
import { useEffect, useState } from "react";
import OrdersCard from '../components/ordersCard';
import CustomCard from "../components/customCard";


const HomeScreen=()=>{

    
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
