import React, { useState } from "react"
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
  ImageBackground,
  ToastAndroid,
  Button,
  Platform,
} from "react-native"
import { Picker } from "@react-native-picker/picker";
import Colors from "../constants/Colors";
import IP from "../constants/IP";
const AddressInfoScreen = (props) => {
  
    //picker

    const [selectedCity, setSelectedCity] = useState("")
    const [selectedLocality, setSelectedLocality] = useState("")

    const chefData=props.navigation.getParam('personalData');
    let chefCounts;
    let authData;


  //Address handlers
  const [enteredAddress, setEnteredAddress] = useState("")

  const AddressInputHandler = (enteredText) => {
    setEnteredAddress(enteredText)
  }
  /************************************/

  const getData=async ()=>{
    const response=await fetch(`http://${IP.ip}:3000/chef/${chefData.phone}`)
    const chData=await response.json()
    chefCounts=chData
 }


  /************************************* */

  const nextBtnHandler = () => {
    let trimNum = chefData.phone.substring(1);
    let numForQuery='92'+trimNum;
    let tempObj=chefData;
    tempObj['city']=selectedCity;
    tempObj['locality']=selectedLocality;
    tempObj['address']=enteredAddress;

    getData().then(()=>{
       
    if(chefCounts.length>0){
        console.log("User is already Registered")
        ToastAndroid.show(`You are already registered!!`, ToastAndroid.SHORT)
        props.navigation.navigate('Login');
    }
    else{
        let url=`http://${IP.ip}:3000/sendOTP`;
        let data={
            phone:numForQuery,
        }
        fetch(url,{
            method:'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(data)
        }).then((response)=>response.json())
        .then((response)=>{
            authData=response;
        })
        .then(()=>ToastAndroid.show(`OTP sent to you`, ToastAndroid.SHORT))
        .then(()=>console.log(authData))
        .then(()=>{
            props.navigation.navigate({
                routeName:'OTP',
                params:{
                    otpData:authData,  
                    chefDetail:tempObj   
              }
            })
        })
     }
    })

    
  }
  return (
    <View style={styles.screencontainer}>
      <ScrollView showsVerticalScrollIndicator={false}>

      <View style={{width:'100%',alignItems:'center'}}><Text style={{color:Colors.primaryColor,fontSize:18,fontWeight:'bold'}}>Address Information</Text></View>
        
        {/* city picker */}
        <Text style={styles.fieldsname}>City</Text>
        <View style={styles.container}>
        <Picker
          style={styles.picker}
          selectedValue={selectedCity}
          onValueChange={(itemValue, itemIndex) => setSelectedCity(itemValue)}>
          <Picker.Item label="Select City" value="diabled" color="#aaa" />
          <Picker.Item label="Mianwali" value="Mianwali" />
          <Picker.Item label="Chakwal" value="Chakwal" color="#aaa"/>
        </Picker>
        </View>

        {/* Locality picker */}
        <Text style={styles.fieldsname}>Nearby Locality</Text>
        <View style={styles.container}>
        <Picker
          style={styles.picker}
          selectedValue={selectedLocality}
          onValueChange={(itemValue, itemIndex) => setSelectedLocality(itemValue)}>
          <Picker.Item label="Near By Locality" value="diabled" color="#aaa" />
          <Picker.Item label="Awami Chowk" value="Awami Chowk" />
          <Picker.Item label="Balo Khel" value="Balo Khel"/>
          <Picker.Item label="Wata Khel" value="Wata Khel"/>
          <Picker.Item label="PAF Road" value="PAF Road"/>
        </Picker>
        </View>


        {/*address view */}
        <Text style={styles.fieldsname}>Address</Text>
        <View style={styles.inputbox}>
          <TextInput
            style={styles.input}
            placeholder="Complet Address"
            multiline={true}
            onChangeText={AddressInputHandler}
            value={enteredAddress}
          />
        </View>

      
        <View style={styles.btnview}>
          <TouchableOpacity
            style={styles.buttons}
            // onPress={() => console.log("Kitchen Hours")}
            onPress={nextBtnHandler}>
            <View>
              <Text style={styles.btntext}>VERIFY</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}


AddressInfoScreen.navigationOptions=()=>{
    return{
        headerShown:false
    }
}

const styles = StyleSheet.create({
  screencontainer: {
    paddingHorizontal:15,
    paddingVertical:10,
    paddingTop:100,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    padding: 20,
  },
  
  fieldsname: {
    fontSize: 15,
    color: "black",
    marginLeft: 20,
    fontWeight: "bold",
    justifyContent: "flex-start",
    marginTop: 10,
  },
  input: {
    flex: 1,
    // width: 150,
    textAlign: "left",
    // backgroundColor: "#aaa",
    color: "#aaa",

    color: "black",
  },
  inputbox: {
    borderColor: "#aaa",
    backgroundColor: "#f5fcff",
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 35,
    marginTop: 5,
    marginLeft: 13,
    width: "95%",
  },
  picker: {
    
    width: "95%",
    justifyContent: "space-between",
  },
  container: {
            
    alignItems:'center',
    justifyContent:'center',
    //borderWidth:0.5,
    height:35,
    backgroundColor: '#F5FCFF',
    borderWidth:0.3,
    marginLeft:13,
    marginTop:5,
    borderColor:Colors.lightBlack,
    paddingHorizontal:10,
    borderRadius:5
  },

  btnview: {
    paddingVertical:20,
    flex: 1,
    alignItems: "center",
  },
  buttons: {
    backgroundColor: "#ff620a",
    width: "50%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,

    // elevation: 30,
  },
  btntext: {
    color: "white",
    fontSize: 16,
  },
})
export default AddressInfoScreen