import React, { useState,useEffect } from "react"
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
  Picker,
  Button,
  Platform,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import * as ImagePicker from "expo-image-picker"
import Colors from "../constants/Colors"
import IP from "../constants/IP"

const ProfileScreen = (props) => {

     const [loading,setLoading]=useState(true);
     const [kitchenName,setKitchenName]=useState("");
     const [firstName,setFirstName]=useState("");
     const [lastName,setLastName]=useState("");
     const [contact,setContact]=useState("");
     const [address,setAddress]=useState("");
     const [city,setCity]=useState("");
    const [image, setImage] = useState(
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt_NZykul07nU3cliFuRZQr4_q-gOdkRTmRA&usqp=CAU"
      );
     const [kitchenDetail,setKitchenDetail]=useState({});

    useEffect(()=>{
        const chefId='03154562292';
        fetch(`http://${IP.ip}:3000/kitchen/kitchenDetail/${chefId}`)
        .then((response)=>response.json())
        .then((response)=>setKitchenDetail(response[0]))
        .then(()=>{
            setKitchenName(kitchenDetail.kitchen_name);
            setImage(kitchenDetail.logo);
            setFirstName(kitchenDetail.firstname);
            setLastName(kitchenDetail.lastname);
            setContact(kitchenDetail.phone);
            setCity(kitchenDetail.city);
            setAddress(kitchenDetail.address);
            
        })
        .catch((error)=>console.error(error))
        .finally(()=>setLoading(false))
    },[loading]);
  

  return (
    <View style={styles.screencontainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profilecontainer}>
          <View style={styles.profileview}>

            <ImageBackground source={{ uri: image }} style={styles.image}>
            </ImageBackground>
          </View>

          {/* //style={styles.chefdetails} */}
        </View>

        {/* kitchen name view */}
        <Text style={styles.fieldsname}>Kitchen Name</Text>
        <Text style={{...styles.kitchenname,fontSize:14,color:Colors.lightBlack}}>{kitchenName}</Text>

        <Text style={styles.fieldsname}>Chef First Name</Text>
        <Text style={{...styles.kitchenname,fontSize:14,color:Colors.lightBlack}}>{firstName}</Text>

        

        {/*chef last name view */}
        <Text style={styles.fieldsname}>Chef Last Name</Text>
        <Text style={{...styles.kitchenname,fontSize:14,color:Colors.lightBlack}}>{lastName}</Text>


        {/*contact view */}
        <Text style={styles.fieldsname}>Contact</Text>
        <Text style={{...styles.kitchenname,fontSize:14,color:Colors.lightBlack}}>{contact}</Text>

        {/* city picker */}
        <Text style={styles.fieldsname}>City</Text>
        <Text style={{...styles.kitchenname,fontSize:14,color:Colors.lightBlack}}>{city}</Text>

        {/*address view */}
        <Text style={styles.fieldsname}>Address</Text>
        <Text style={{...styles.kitchenname,fontSize:14,color:Colors.lightBlack}}>{address}</Text>


        
       
        {/* //time picker   */}

      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  screencontainer: {
    paddingHorizontal: 10,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    padding: 20,
  },
  profilecontainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  profileview: {
    height: 200,
    width: 200,
    // marginLeft: "25%",
    elevation: 1,
    marginTop: 20,
    borderRadius: 125,
    marginTop: 80,

    overflow: "hidden",
  },

  image: {
    height: "100%",
    width: "100%",
    justifyContent: "flex-end",
    borderRadius: 125,
  },
  camera: {
    alignItems: "center",

    paddingVertical: 7,
    width: "100%",
    height: 50,
  },

  // chefdetails: {
  //   paddingHorizontal: 20,
  //   // flexDirection: "row",
  //   // alignItems: "center",
  //   marginTop: 50,
  //   // justifyContent: "space-around",
  // },
  kitchenname: {
    fontSize: 15,
    color: "black",
    marginLeft: 20,
    fontWeight: "bold",
    justifyContent: "flex-start",
  },
  fieldsname: {
    fontSize: 15,
    color: "black",
    marginLeft: 20,
    fontWeight: "bold",
    marginTop:10,
    justifyContent: "flex-start",
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
    marginTop: 10,
    height: 35,
    width: "95%",
    justifyContent: "space-between",
    margin: 10,
  },

  btnview: {
    paddingVertical:20,
    flex: 1,
    alignItems: "center",
  },
  buttons: {
    backgroundColor: "#ff620a",
    width: "60%",
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
export default ProfileScreen
