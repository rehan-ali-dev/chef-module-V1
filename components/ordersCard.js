import React,{useEffect,useState} from "react";
import { Text,View,StyleSheet,TouchableOpacity,Image,ImageBackground} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Colors from "../constants/Colors";
import OrderBox from "./orderBox";


const  OrdersCard=props=>{
   
    return(
        <View style={styles.orderCard}>
            <View style={styles.orderHeader}>
                <Text style={styles.headerText}>ORDERS</Text>
            </View>
            <View style={styles.boxesContainer}>
                <OrderBox number={5} title="Pending"/>
                <OrderBox number={500} title="Confirmed"/>
                <OrderBox number={5} title="Pre-orders"/>
            </View>
        </View>
    )
};

const styles=StyleSheet.create({


    orderCard:{
         width:'95%',
         backgroundColor:'#f5f5f5',
         borderRadius:15,
         elevation:5,
         padding:15,
         overflow:'hidden',
         marginVertical:5,
         marginHorizontal:10
       
    }, 
    orderHeader:{
        justifyContent:'center',
        alignItems:'center'
    }, 
    headerText:{
        color:Colors.primaryColor,
        fontSize:16,
        fontWeight:'bold'
    }, 
    boxesContainer:{ 
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between'
    },


});

export default OrdersCard;