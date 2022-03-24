import React,{useEffect,useState} from "react";
import { Text,View,StyleSheet,TouchableOpacity,Image,ImageBackground} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Colors from "../constants/Colors";


const  NotificationCard=props=>{
   
    return(
        <View style={styles.notificationCard}>
                {props.forNotificationScreen && <View>
                    <Text style={styles.title}>Order Id: #{props.orderId}</Text>
                    <Text style={styles.title}>{props.notificationTitle}</Text>
                    <Text style={{...styles.subTitle}}>{props.customerFname} Placed An Order At Your Kitchen</Text>
                    </View>}
                {props.forOrderScreen &&
                 <View>
                <View style={{width:'100%',flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={styles.title}>Order Id: #{props.orderId}</Text>
                <TouchableOpacity onPress={props.onViewDetails}>
                <Text style={{...styles.title,color:Colors.primaryColor,textDecorationLine:'underline'}}>View Details</Text>
                </TouchableOpacity>
                </View>
                {/*<Text style={styles.title}>{props.customerFname}{props.customerLname} wants to eat your {props.orderedDish}</Text>*/}
                <Text style={styles.title}>New Order For You</Text>
                </View>
                }
                {props.forNotificationScreen && 
                <View>
               
                
                <View style={styles.notificationContainer}>
                <Text style={{...styles.subTitle}}>Total Amount</Text>
                <Text style={{...styles.subTitle}}>Rs. {props.totalAmount}</Text>
                </View>
                </View>
                }
                <View style={styles.notificationContainer}>
                <Text style={{...styles.subTitle}}>Order Status</Text>
                <Text style={{...styles.subTitle}}>{props.status}</Text>
                </View>
                {props.forOrderScreen &&
                <View style={styles.notificationContainer}>
                <Text style={{...styles.subTitle}}>Order Placed At</Text>
                {/* <Text style={{...styles.subTitle}}>{props.timeOfOrder.substring(11, 16)}  {props.timeOfOrder.substring(0, 10)}</Text> */}
                <Text style={{...styles.subTitle}}>{props.timeOfOrder}</Text>
                </View>
                }
                
            {props.currentStatus==='pending' &&
            <View>
            {props.forNotificationScreen &&
            <View style={styles.btnContainer}>
            <TouchableOpacity onPress={props.onDetail}>
            <View style={{...styles.buttonContainer,width:100}}>
                <Text style={styles.btnTitle}>View Details</Text>
            </View>
            </TouchableOpacity>
            </View>
            }
            {props.forOrderScreen &&
            <View style={styles.btnContainer}>
            <TouchableOpacity onPress={props.onCancel}>
                <View style={{...styles.buttonContainer}}>
                    <Text style={styles.btnTitle}>Cancel</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.onSelect}>
                <View style={{...styles.buttonContainer}}>
                    <Text style={styles.btnTitle}>Confirm</Text>
                </View>
            </TouchableOpacity>
            </View>
            }
            </View>
            }
        </View>
    )
};

const styles=StyleSheet.create({


    notificationCard:{
         width:'95%',
         backgroundColor:'#f5f5f5',
         borderRadius:15,
         elevation:5,
         padding:15,
         overflow:'hidden',
         marginVertical:5,
         marginHorizontal:10
       
    },   
    
    title:{
        fontSize:16,
        fontWeight:"bold",
        color:'#000'
    },
    subTitle:{
        fontSize:16,
        color:"#000"
    },
    notificationContainer:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    buttonContainer:{
        backgroundColor:Colors.primaryColor,
        justifyContent:'center',
        alignItems:'center',
        padding:5,
        width:70,
        marginHorizontal:5,
        borderRadius:10
    },
    btnContainer:{
        flexDirection:'row',
        justifyContent:'flex-end',
        paddingTop:5
    },
    btnTitle:{
        color:Colors.whiteColor,
        fontSize:16,
    }


});

export default NotificationCard;