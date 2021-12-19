import React,{useEffect,useState} from "react";
import { Text,View,StyleSheet,TouchableOpacity,Image,ImageBackground} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from "../constants/Colors";
import OrderBox from "./orderBox";


const  CustomCard=props=>{
   
    return(
        <TouchableOpacity style={styles.customCard}>
        <View>
            <View style={styles.dataContainer}>
                <Text style={{color:Colors.whiteColor,fontWeight:'bold',fontSize:16}}>{props.title}</Text>
                <Ionicons name="chevron-forward-sharp" size={22} color={Colors.whiteColor} />
            </View>
        </View>
        </TouchableOpacity>
    )
};

const styles=StyleSheet.create({


    customCard:{
         width:'85%',
         backgroundColor:Colors.lightBlack,
         borderRadius:20,
         elevation:3,
         paddingHorizontal:20,
         paddingVertical:15,
         overflow:'hidden',
         marginVertical:5,
         marginHorizontal:10
       
    }, 
   
    dataContainer:{ 
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between'
    },


});

export default CustomCard;