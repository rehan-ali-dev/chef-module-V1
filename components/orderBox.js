import React from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,TouchableOpacity } from "react-native";
import Colors from '../constants/Colors';


const OrderBox=(props)=>{

    
        return(
          <View style={styles.orderItem}>
          <View style={styles.numberContainer}>
            <Text style={styles.category}>{props.number}</Text>   
        </View>
        <View style={styles.titleContainer}>
        <Text style={styles.title}>{props.title}</Text>
          </View>
        </View>
        )
    };


const styles=StyleSheet.create(
    {
        orderItem:{
            flex:1,
            marginHorizontal:10,
            marginVertical:5,
            height:60,
           
        },
    
        numberContainer:{
            flex:1,
            borderRadius:10,
            shadowColor:Colors.lightBlack,
            //shadowOpacity:0.16,
            //shadowOffset:{width:0,height:2},
            //shadowRadius:10, 
           // elevation:1,
           borderWidth:0.6,
           borderColor:Colors.lightBlack,
           paddingVertical:5,
            paddingHorizontal:10,
            justifyContent:'center',
            alignItems:'center'
        },
        titleContainer:{
            marginTop:5,
            alignItems:'center'
        },
        title:{
            color:Colors.lightBlack,
            fontWeight:'bold'
        },
        category:{
            fontSize:14,
            color:Colors.primaryColor,
            textAlign:'center'
        } 
    
       
    }
)

export default OrderBox;
