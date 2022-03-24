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


const AddPlanScreen=(props)=>{


    const dishesData=useSelector(state=>state.order.Dishes);

    const [dishName,setDishName]=useState('');
    const [selectedMonday,setSelectedMonday]=useState("");
    const [selectedTuesday,setSelectedTuesday]=useState("");
    const [selectedWednesday,setSelectedWednesday]=useState("");
    const [selectedThursday,setSelectedThursday]=useState("");
    const [selectedFriday,setSelectedFriday]=useState("");
    const [selectedSaturday,setSelectedSaturday]=useState("");
   

   
    const dispatch=useDispatch();

   
    
        return(
          <View style={styles.screen}>
            <ScrollView>
            <View style={{paddingVertical:10,width:'100%',alignItems:'center'}}><Text style={{...styles.inputHeader,fontSize:18,color:Colors.primaryColor,fontWeight:'bold'}}>Add Dishes</Text></View>

            <View style={{...styles.inputTitles,borderWidth:0.7,borderRadius:10,width:'92%'}}><Text style={{...styles.inputHeader,color:Colors.lightBlack}}>Kindly select the dishes for each day and then click next.</Text></View>
            
           

            <View style={styles.inputTitles}><Text style={styles.inputHeader}>Monday</Text></View>
            <View style={styles.container}>
            <Picker
            selectedValue={selectedMonday}
            style={{height:30,width: '100%'}}
            onValueChange={(itemValue, itemIndex) => setSelectedMonday(itemValue)}
            >
            <Picker.Item label={'select dish for Monday'} value={'disabled'} color='#ccc' />
                          {dishesData.map((item, index) => {
                            return (<Picker.Item label={item.dish_name} value={item.dish_id} key={index}/>) 
                            })}
        </Picker>
        </View>

        <View style={styles.inputTitles}><Text style={styles.inputHeader}>Tuesday</Text></View>
        <View style={styles.container}>
            <Picker
            selectedValue={selectedTuesday}
            style={{height:30,width: '100%'}}
            onValueChange={(itemValue, itemIndex) => setSelectedTuesday(itemValue)}
            >
            <Picker.Item label={'select dish for Tuesday'} value={'disabled'} color='#ccc' />
                          {dishesData.map((item, index) => {
                            return (<Picker.Item label={item.dish_name} value={item.dish_id} key={index}/>) 
                            })}
        </Picker>
        </View>

        <View style={styles.inputTitles}><Text style={styles.inputHeader}>Wednesday</Text></View>
        <View style={styles.container}>
            <Picker
            selectedValue={selectedWednesday}
            style={{height:30,width: '100%'}}
            onValueChange={(itemValue, itemIndex) => setSelectedWednesday(itemValue)}
            >
            <Picker.Item label={'select dish for Wednesday'} value={'disabled'} color='#ccc' />
                          {dishesData.map((item, index) => {
                            return (<Picker.Item label={item.dish_name} value={item.dish_id} key={index}/>) 
                            })}
        </Picker>
        </View>

        <View style={styles.inputTitles}><Text style={styles.inputHeader}>Thursday</Text></View>
        <View style={styles.container}>
            <Picker
            selectedValue={selectedThursday}
            style={{height:30,width: '100%'}}
            onValueChange={(itemValue, itemIndex) => setSelectedThursday(itemValue)}
            >
            <Picker.Item label={'select dish for Thursday'} value={'disabled'} color='#ccc' />
                          {dishesData.map((item, index) => {
                            return (<Picker.Item label={item.dish_name} value={item.dish_id} key={index}/>) 
                            })}
        </Picker>
        </View>

        <View style={styles.inputTitles}><Text style={styles.inputHeader}>Friday</Text></View>
        <View style={styles.container}>
            <Picker
            selectedValue={selectedFriday}
            style={{height:30,width: '100%'}}
            onValueChange={(itemValue, itemIndex) => setSelectedFriday(itemValue)}
            >
            <Picker.Item label={'select dish for Friday'} value={'disabled'} color='#ccc' />
                          {dishesData.map((item, index) => {
                            return (<Picker.Item label={item.dish_name} value={item.dish_id} key={index}/>) 
                            })}
        </Picker>
        </View>

        <View style={styles.inputTitles}><Text style={styles.inputHeader}>Saturday</Text></View>
        <View style={styles.container}>
            <Picker
            selectedValue={selectedSaturday}
            style={{height:30,width: '100%'}}
            onValueChange={(itemValue, itemIndex) => setSelectedSaturday(itemValue)}
            >
            <Picker.Item label={'select dish for Saturday'} value={'disabled'} color='#ccc' />
                          {dishesData.map((item, index) => {
                            return (<Picker.Item label={item.dish_name} value={item.dish_id} key={index}/>) 
                            })}
        </Picker>
        </View>
        
            <View style={{width:'100%',alignItems:'center'}}>
            <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={()=>{
                props.navigation.navigate({
                    routeName:'AddPlan2',
                    params:{ 
                        mondayDish:selectedMonday,
                        tuesdayDish:selectedTuesday,
                        wednesdayDish:selectedWednesday,
                        thursdayDish:selectedThursday,
                        fridayDish:selectedFriday,
                        saturdayDish:selectedSaturday      
                  }
                })
            }}>
                <View style={styles.btnContainer}>
                    <Text style={styles.btnTitle}>Next</Text>
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

export default AddPlanScreen;
