import React,{useEffect,useState} from "react";
import { Text,View,StyleSheet,TouchableOpacity,Image,ImageBackground} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Colors from "../constants/Colors";


const  PlanNotificationCard=props=>{
   
    return(
        <View style={styles.notificationCard}>
                
                {props.forOrderScreen &&
                 <View>
                <View style={{width:'100%',flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={styles.title}>Plan Subscription : #{props.subscriptionId}</Text>
                <TouchableOpacity onPress={props.onViewDetails}>
                <Text style={{...styles.title,color:Colors.primaryColor,textDecorationLine:'underline'}}>View Details</Text>
                </TouchableOpacity>
                </View>
                <Text style={styles.title}>Cusomter Wants to Subscribe Your Plan</Text>
                </View>
                }
               
                <View style={styles.notificationContainer}>
                <Text style={{...styles.subTitle}}>Plan Name</Text>
                <Text style={{...styles.subTitle}}>{props.planName}</Text>
                </View>
                <View style={styles.notificationContainer}>
                <Text style={{...styles.subTitle}}>Total Amount</Text>
                <Text style={{...styles.subTitle}}>Rs. {props.totalAmount}</Text>
                </View>
               
                <View style={styles.notificationContainer}>
                <Text style={{...styles.subTitle}}>Current Status</Text>
                <Text style={{...styles.subTitle}}>{props.status}</Text>
                </View>
                {props.forOrderScreen &&
                <View style={styles.notificationContainer}>
                <Text style={{...styles.subTitle}}>Plan Starts From</Text>
                <Text style={{...styles.subTitle}}>{props.subscribedDate.substring(0, 10)}</Text>
                </View>
                }
                
            {props.status==='Approval Required' &&
            <View>
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
        marginLeft:5,
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

export default PlanNotificationCard;