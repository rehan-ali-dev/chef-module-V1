import React from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,Image,TouchableOpacity,TextInput,ScrollView,ToastAndroid } from "react-native";
import { Picker } from "@react-native-picker/picker";
import DropDownPicker from "react-native-dropdown-picker";
import * as ImagePicker from 'expo-image-picker';
import Colors from '../constants/Colors';
import Textarea from "react-native-textarea";
import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { addDish } from "../store/actions/orderActions";
import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions'; 
import IP from "../constants/IP";


const AddPlanScreen2=(props)=>{


    const dishesData=useSelector(state=>state.order.Dishes);

    const mondayDish=props.navigation.getParam('mondayDish');
    const tuesdayDish=props.navigation.getParam('tuesdayDish');
    const wednesdayDish=props.navigation.getParam('wednesdayDish');
    const thursdayDish=props.navigation.getParam('thursdayDish');
    const fridayDish=props.navigation.getParam('fridayDish');
    const saturdayDish=props.navigation.getParam('saturdayDish');
    const [planName,setPlanName]=useState('');
    const [planLogo,setPlanLogo]=useState(`no_logo.png`);
    const [isLoading,setLoading]=useState(true);

    const dishesIds=[mondayDish,tuesdayDish,wednesdayDish,thursdayDish,fridayDish,saturdayDish];
   
    let planDishes = dishesData.filter(item => dishesIds.includes(item.dish_id));
    let kitchen_name=planDishes[0].kitchen_name;
    let totalPlanPrice = planDishes.map(item => item.price).reduce((prev, curr) => prev + curr, 0);
    console.log(totalPlanPrice);
    let responseAfterInsertion;
    let weeklyPlanId;

    // useEffect(()=>{
    //     console.log("/// Plan Dishes ///////")
    //     console.log(planDishes)
    // })

    useEffect(()=>{
        fetch(`http://${IP.ip}:3000/kitchen/getLogo/${kitchen_name}`)
        .then((response)=>response.json())
        .then((response)=>setPlanLogo(response[0].logo))
        .then(()=>console.log("///   Logo   ///"))
        .then(()=>console.log(planLogo))
        .catch((error)=>console.error(error))
        .finally(()=>setLoading(false));
    },[isLoading])
   
    const dispatch=useDispatch();

    const addWeeklyPlan=async ()=>{
        let url=`http://${IP.ip}:3000/weeklyPlan`;
        let data={
            planName:planName,
            kitchenName:kitchen_name,
            planLogo:planLogo,
            planPrice:totalPlanPrice
        }
        await fetch(url,{
            method:'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
            body:JSON.stringify(data)
        }).then((response)=>response.json())
        .then((response)=>{
            //responseAfterInsertion=response;
            weeklyPlanId=response.insertId;
            console.log(weeklyPlanId);})
        .then(()=>ToastAndroid.show(`Pland Added successfully`, ToastAndroid.SHORT))

        }

        const addWeeklyPlanDetails=async ()=>{
            let url=`http://${IP.ip}:3000/weeklyPlan/insertPlanDetails`;
            let data={
                planId:weeklyPlanId,
                monday:mondayDish,
                tuesday:tuesdayDish,
                wednesday:wednesdayDish,
                thursday:thursdayDish,
                friday:fridayDish,
                saturday:saturdayDish,
            }
            await fetch(url,{
                method:'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                  },
                body:JSON.stringify(data)
            }).then((response)=>response.json())
            .then(()=>ToastAndroid.show(`Plan Details Inserted successfully`, ToastAndroid.SHORT))
    
            }


    
        return(
          <View style={styles.screen}>
            <ScrollView>
            <View style={{paddingVertical:10,width:'100%',alignItems:'center'}}><Text style={{...styles.inputHeader,fontSize:18,color:Colors.primaryColor,fontWeight:'bold'}}>Confirm Plan</Text></View>

            <View style={{...styles.inputTitles,borderWidth:0.7,borderRadius:10,width:'92%'}}><Text style={{...styles.inputHeader,color:Colors.lightBlack}}>Kindly enter and confirm plan data and click on submit button.</Text></View>
            
           

            <View style={styles.inputTitles}><Text style={styles.inputHeader}>Weekly Plan Name</Text></View>
            <TextInput style={{...styles.inputText}} placeholder="Enter Plan Name e.g:Lentils/Kitchens"
             value={planName} onChangeText={(text)=>setPlanName(text)}
             />


            <View style={styles.inputTitles}><Text style={styles.inputHeader}>Kitchen Name</Text></View>
                    <View style={{...styles.container,alignItems:'flex-start'}}> 
                    <Text style={{...styles.inputText}}>{kitchen_name}</Text>   
                    </View>

            <View style={styles.inputTitles}><Text style={styles.inputHeader}>Total Amount</Text></View>
                    <View style={{...styles.container,alignItems:'flex-start'}}> 
                    <Text style={{...styles.inputText}}>{totalPlanPrice}</Text>   
                    </View>
        
            <View style={{width:'100%',alignItems:'center'}}>
            <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={()=>{
                addWeeklyPlan().then(()=>{
                    addWeeklyPlanDetails().then(()=>{
                        props.navigation.navigate('Home');
                    })
                });
                
               
            }}>
                <View style={styles.btnContainer}>
                    <Text style={styles.btnTitle}>Submit</Text>
                </View>
            </TouchableOpacity>
            </View> 
            </View>
            </ScrollView>
             </View>
         
        )
    };


const styles=StyleSheet.create(
    {
        screen:{
            flex:1,
            paddingBottom:10,
            backgroundColor:Colors.whiteColor
           

        },
        inputContainer:{
            alignItems:'center',
        },
        inputTitles:{
            padding:5,
            marginLeft:15,
            
        },
        inputText:{
            marginHorizontal:20,
            //borderWidth:0.5,
            backgroundColor: '#F5FCFF',
            padding:5,
            paddingHorizontal:10,
            borderRadius:10,
            fontSize:16
        },
        container: {
            
            alignItems:'center',
            justifyContent:'center',
            //borderWidth:0.5,
            backgroundColor: '#F5FCFF',
            marginHorizontal:20,
            padding:5,
            paddingHorizontal:10,
            borderRadius:10
          },
        inputHeader:{
            fontSize:16
        },
        buttonContainer:{
  
            width:180,
            flex:1,
            padding:10,
            
            
        },
        btnContainer:{
           flex:1,
            backgroundColor:Colors.primaryColor,
            padding:5,
            borderRadius:10,
            alignItems:'center'
            
        },
        buttonsContainer:{
          flex:1,
          flexDirection:'row',
          paddingTop:10,
          width:'50%',
          justifyContent:'space-between'
        },
        btnTitle:{
            color:Colors.whiteColor,
            fontSize:16,
            paddingEnd:10
        },
        container2: {
            flex: 1,
            marginHorizontal:20,
            borderRadius:10,
            justifyContent: 'center',
            alignItems: 'center',
          },
          textareaContainer: {
            padding: 5,
            paddingHorizontal:10,
            borderRadius:10,
            backgroundColor: '#F5FCFF',
          },
          textarea: {
            textAlignVertical: 'top',  // hack android
            height: 120,
            fontSize: 16,
            color: '#333',
          },
       
    }
)

export default AddPlanScreen2;
