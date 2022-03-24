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
  ImageBackground,

  ToastAndroid,
  Button,
  Platform,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import * as ImagePicker from "expo-image-picker"
import IP from '../constants/IP';
const ChefInfoScreen = (props) => {

    
  
  //imagepicker
  const [imageLogo, setImageLogo] = useState(
  `http://${IP.ip}:3000/images/no_logo.png`
  )
  let image=`http://${IP.ip}:3000/images/no_logo.png`;
  let imagePath="no_logo.png";
  const [imageLogoPath,setImageLogoPath]=useState("no_logo.png");
  let isNumberAlreadyExist;
  //const [imagePath,setImagePath]=useState("no_logo.png");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    console.log(result)

    if (!result.cancelled) {
      //setImage(result.uri)
      image=result.uri;
      setImageLogo(result.uri)
      console.log(image)
      console.log(result.uri);
      uploadDishImage();
        }
  }

/*********   Save Image Path   ****** */
const uploadDishImage=async ()=>{
  const url=`http://${IP.ip}:3000/uploadImage`
  const formData=new FormData();
  formData.append('upload',{
    name:"kitchenName",
    uri:image,
    type:'image/jpg'
  })

 await fetch(url,{
    method:'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
      },
    body:formData
})
.then((response)=>response.json())
.then((response)=>{
    //setImagePath(response.path);
    imagePath=response.path;
    setImageLogoPath(response.path);
    console.log(imagePath);
    console.log(response);
    })

.catch((error)=>console.log(error));
}




  //Kitchen name handlers
  const [enteredKitchenname, setEnteredKitchenname] = useState("")

  const KitchennameInputHandler = (enteredText) => {
    setEnteredKitchenname(enteredText)
  }
  /************************************/

  //Chef First name handlers
  const [enteredChefFirstname, setEnteredChefFirstname] = useState("")

  const ChefFirstnameInputHandler = (enteredText) => {
    setEnteredChefFirstname(enteredText)
  }
  /************************************/

  //Chef Last name handlers
  const [enteredChefLastname, setEnteredChefLastname] = useState("")

  const ChefLastnameInputHandler = (enteredText) => {
    setEnteredChefLastname(enteredText)
  }
  /************************************/

  //Contacthandlers
  const [enteredContact, setEnteredContact] = useState("")

  const ContactInputHandler = (enteredText) => {
    setEnteredContact(enteredText)
  }
  /************************************/

  //CNIC handlers
  const [enteredCNIC, setEnteredCNIC] = useState("")

  const CNICInputHandler = (enteredText) => {
    setEnteredCNIC(enteredText)
  }
  /************************************/
  //Contacthandlers
  const [enteredEmail, setEnteredEmail] = useState("")

  const EmailInputHandler = (enteredText) => {
    setEnteredEmail(enteredText)
  }
  
const isChefExist=async ()=>{
      const response=await fetch(`http://${IP.ip}:3000/chef/getChefData/${enteredContact}`)
       const chData=await response.json()
       if(chData>=0){
         return true;
       }
       else{
         return false;
       }

}




  const NextBtnHandler = () => {
    if(isChefExist()){
      ToastAndroid.show(`You already have account log in kindly`, ToastAndroid.SHORT)
      props.navigation.navigate({
        routeName:'Login',
    })
    return;
    }
      const personalInfo={
        logo:imagePath,
        kitchen_name:enteredKitchenname,
        firstname:enteredChefFirstname,
        lastname:enteredChefLastname,
        phone:enteredContact,
        chef_id:enteredContact,
        cnic:enteredCNIC,
        email:enteredEmail
      }
    props.navigation.navigate({
        routeName:'AddressInfo',
        params:{ 
          personalData:personalInfo
      }
    })
    
  }
  return (
    <View style={styles.screencontainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profilecontainer}>
          <View style={styles.profileview}>
           
            <ImageBackground source={{ uri: imageLogo }} style={styles.image}>
              {/* // {{ width: 200, height: 200 }} */}
              <View style={styles.camera}>
                <TouchableOpacity onPress={pickImage}>
                  <Ionicons name="camera" size={40} color="#aaa" />
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>

          {/* //style={styles.chefdetails} */}
        </View>

        {/* kitchen name view */}
        <Text style={styles.kitchenname}>Kitchen Name</Text>
        <View style={styles.inputbox}>
          <TextInput
            style={styles.input}
            placeholder="Kitchen Name"
            onChangeText={KitchennameInputHandler}
            value={enteredKitchenname}
          />
        </View>

        {/*chef fisrt name view */}
        <Text style={styles.fieldsname}>Chef First Name</Text>
        <View style={styles.inputbox}>
          <TextInput
            style={styles.input}
            placeholder="Enter your first name"
            onChangeText={ChefFirstnameInputHandler}
            value={enteredChefFirstname}
          />
        </View>

        {/*chef last name view */}
        <Text style={styles.fieldsname}>Chef Last Name</Text>
        <View style={styles.inputbox}>
          <TextInput
            style={styles.input}
            placeholder="Enter your last name"
            onChangeText={ChefLastnameInputHandler}
            value={enteredChefLastname}
          />
        </View>

        {/*contact view */}
        <Text style={styles.fieldsname}>Contact</Text>
        <View style={styles.inputbox}>
          <TextInput
            style={styles.input}
            placeholder="03xx"
            keyboardType="numeric"
            onChangeText={ContactInputHandler}
            value={enteredContact}
          />
        </View>

         {/*CNIC view */}
         <Text style={styles.fieldsname}>CNIC</Text>
        <View style={styles.inputbox}>
          <TextInput
            style={styles.input}
            placeholder="xxxxx-xxxxxxx-x"
            onChangeText={CNICInputHandler}
            keyboardType="numeric"
            value={enteredCNIC}
          />
        </View>

        {/*Email view */}
        <Text style={styles.fieldsname}>Email</Text>
        <View style={styles.inputbox}>
          <TextInput
            style={styles.input}
            placeholder="xyz@gmail.com"
            onChangeText={EmailInputHandler}
            keyboardType="email-address"
            value={enteredEmail}
          />
        </View>

        <View style={styles.btnview}>
          <TouchableOpacity
            style={styles.buttons}
            onPress={NextBtnHandler}>
            <View>
              <Text style={styles.btntext}>NEXT</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}


ChefInfoScreen.navigationOptions=()=>{
    return{
        headerShown:false
    }
}

const styles = StyleSheet.create({
  screencontainer: {
    paddingHorizontal:15,
    paddingVertical:10,
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
    height: 160,
    width: 160,
    // marginLeft: "25%",
    elevation: 1,
    borderRadius: 80,
    marginTop: 40,
    overflow: "hidden",
  },

  image: {
    height: "100%",
    width: "100%",
    justifyContent: "flex-end",
    borderRadius: 80,
  },
  camera: {
    alignItems: "center",
    paddingVertical: 7,
    width: "100%",
    height: 50,
  },

  kitchenname: {
    fontSize: 15,
    color: "black",
    marginTop: 50,
    marginLeft: 20,
    fontWeight: "bold",
    justifyContent: "flex-start",
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
export default ChefInfoScreen