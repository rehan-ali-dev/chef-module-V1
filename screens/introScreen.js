import React,{useState,useEffect} from "react";
import {View,Text,StyleSheet, KeyboardAvoidingView,TextInput,TouchableOpacity,ToastAndroid} from 'react-native';
import Colors from "../constants/Colors";
import IP from "../constants/IP";
import { useDispatch } from "react-redux";
import { SvgUri } from 'react-native-svg';
import {LinearGradient} from 'expo-linear-gradient'
import { getChefDetail } from "../store/actions/orderActions";

const IntroScreen=(props)=>{

    const GetStartedHandler=()=>{
        
           props.navigation.navigate('ChefInfo')
               
    }



    return(
       
        <LinearGradient colors={["#FF620A","#FF620A"]} style={styles.screen}>
        
            <LinearGradient colors={["#FFAB00","#FF620A"]} style={styles.gradient}>
            <View style={styles.svgContainer}>
            <SvgUri
            width="100%"
            height="100%"
            uri={`http://${IP.ip}:3000/images/appLogo.svg`}
            />
            </View>
            <View style={styles.card}>
               
                <View style={{width:'100%',alignItems:'center'}}><Text style={{color:Colors.whiteColor,fontSize:18}}>BECOME A CHEF</Text></View>
                <View style={styles.inputTitles}><Text style={styles.inputHeader}>Would you like to join us? Earning money by cooking home cooked food and selling it on this platform easily.</Text>
                <Text style={styles.inputHeader}>It's simple: we advertise your menu and product lists online, assist you in order processing, pick up orders, and deliver them to eager customers.
                    Interested? Let's get started with our collaboration right away!
                </Text></View>    
   
               
              <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={GetStartedHandler}>
                <View style={styles.btnContainer}>
                    <Text style={styles.btnTitle}>GET STARTED</Text>
                </View>
            </TouchableOpacity>
            </View>

            </View>
            </LinearGradient>
            {/* </View> */}
            
            </LinearGradient>
    
    )

}

IntroScreen.navigationOptions=()=>{
    return{
        headerShown:false
    }
}

const styles=StyleSheet.create({



    screen:{
        flex:1,
        
       
    },
    gradient:{
        width:'100%',
        height:'100%',
        alignItems:'center',
        //justifyContent:'center'
        justifyContent:'center'
    },
    card:{
        width:'80%',
        height:300,
        maxHeight:300,
        //backgroundColor:Colors.whiteColor,
        backgroundColor:'rgba(255,255,255,0.3)',
        paddingHorizontal:15,
        paddingVertical:10,
        borderRadius:20,
        
    },
    svgContainer:{
        width:350,
        height:350,
    },
    inputHeader:{
        fontSize:16,
        color:Colors.whiteColor,
        textAlign:'justify'
    },
    buttonContainer:{
  
        width:'100%',
        alignItems:'center',
        paddingBottom:10,
        
        
    },
    btnContainer:{
       //flex:1,
       width:150,
       height:40,
        backgroundColor:Colors.primaryColor,
        //padding:5,
        borderRadius:15,
        alignItems:'center',
        justifyContent:'center'
        
    },
    buttonsContainer:{
      flex:1,
      flexDirection:'row',
     
      width:'50%',
      justifyContent:'space-between'
    },
    btnTitle:{
        color:Colors.whiteColor,
        fontSize:16,
    },

})

export default IntroScreen;