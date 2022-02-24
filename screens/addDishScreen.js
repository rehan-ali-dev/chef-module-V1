import React from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,Image,TouchableOpacity,Picker,TextInput,ScrollView,ToastAndroid } from "react-native";
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


const AddDisheScreen=()=>{
    const [dishName,setDishName]=useState('');
    const [selectedCategory,setSelectedCategory]=useState("");
    const [selectedCuisine,setSelectedCuisine]=useState("none");
    const [selectedServing,setSelectedServing]=useState(1);
    const [dishPrice,setDishPrice]=useState('');
    const [description,setDescription]=useState('');
    const [imageUrl,setImageUrl]=useState('');
    const [image, setImage] = useState(null);
    const [imagePath,setImagePath]=useState('');
    const [token,setToken]=useState('');
    
    const [isNameFocused,setNameFocused]=useState(false);
    const [isPriceFocused,setPriceFocused]=useState(false);
    const [isDescFocused,setDescFocused]=useState(false);

    const dispatch=useDispatch();

    const handleNameFocus=()=>setNameFocused(true);
    const handlePriceFocus=()=> setPriceFocused(true);
    const handleNameBlur=()=> setNameFocused(false);
    const handlePriceBlur=()=> setPriceFocused(false);
    const handleDescFocus=()=> setDescFocused(true);
    const handleDescBlur=()=> setDescFocused(false);
    let tokenData;
    //let token;

    useEffect(()=>{
      Notifications.getExpoPushTokenAsync()
      .then(response=>{
        console.log(response);
        setToken(response.data);
        console.log(token);
      })
      .catch((err)=>{
        return null;
      })
    },[]);


    const triggerNotifications=()=>{
      Notifications.scheduleNotificationAsync({
        content:{
          title:'My first local message',
          body:'This is first local message!',
        },
        trigger:{
          seconds:5
        }
      })
    }

    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        setImage(result.uri);
      }
    };


    const uploadDishImage=async ()=>{
      const url=`http://${IP.ip}:3000/uploadImage`
      const formData=new FormData();
      formData.append('upload',{
        name:dishName,
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
        setImagePath(response.path);
        console.log(response);
        })
    
    .catch((error)=>console.log(error));
    }
  



    const addNewDish=()=>{
      console.log("Token");
      console.log(token);
      let url=`http://${IP.ip}:3000/dish`;
      let data={
          dishName:dishName,
          categoryName:selectedCategory,
          price:parseInt(dishPrice),
          description:description,
          //imageUrl:imageUrl,
          imageUrl:imagePath,
          cuisine:selectedCuisine,
          servingSize:selectedServing,
          status:true,
          kitchenName:"Bisma Ka Kitchen",
          pushToken:token

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
        insertedId=response.insertId;
        const NewDish={
                dish_id:insertedId,
                dish_name:dishName,
                cat_name:selectedCategory,
                price:dishPrice,
                description:description,
                image:imagePath,
                cuisine:selectedCuisine,
                serving_size:selectedServing,
                status:true,
                kitchen_name:"Bisma Ka Kitchen",
                push_token:token,
            }
        dispatch(addDish(NewDish));
      })
      .then(()=>ToastAndroid.show(`Dish Added Successfully`, ToastAndroid.SHORT))
      .then(()=>{
        props.navigation.goBack();
      })
      .catch((error)=>console.log(error));

  }
    
        return(
          <View style={styles.screen}>
            <ScrollView>
            <View style={styles.inputTitles}><Text style={styles.inputHeader}>Dish Name</Text></View>
            
            <TextInput style={{...styles.inputText,borderColor:isNameFocused
                 ? Colors.primaryColor
                 : '#F5FCFF',
             borderWidth: isNameFocused?1:0}} placeholder="Dish Name" onFocus={handleNameFocus} onBlur={handleNameBlur}
             value={dishName} onChangeText={(text)=>setDishName(text)}
             />
           
            <View style={styles.inputTitles}><Text style={styles.inputHeader}>Cuisine</Text></View>
            <View style={styles.container}>
            <Picker
        selectedValue={selectedCuisine}
        
        style={{height:30,width: '100%'}}
        onValueChange={(itemValue, itemIndex) => setSelectedCuisine(itemValue)}
      >
        {/*
        //['Pakistani','Hyderabadi','BBQ','Afghani','Indian','Arabic','Chinese','Turkish']
        */}
        <Picker.Item label="Select Cuisine" value=" " disabled={true}/>
        <Picker.Item label="Pakistani" value="Pakistani" />
        <Picker.Item label="BBQ" value="BBQ" />
        <Picker.Item label="Hyderabadi" value="Hyderabadi" />
        <Picker.Item label="Afghani" value="Afghani" />
        <Picker.Item label="Indian" value="Indian" />
        <Picker.Item label="Chinese" value="Chinese"/>
        <Picker.Item label="Turkish" value="Turkish"/>
      </Picker>
            </View>
        

            <View style={styles.inputTitles}><Text style={styles.inputHeader}>Category Name</Text></View>
            <View style={styles.container}>
            <Picker
        selectedValue={selectedCategory}
        style={{height:30,width: '100%' }}
        onValueChange={(itemValue, itemIndex) => setSelectedCategory(itemValue)}
      >
        <Picker.Item label="Select Category" value=" " disabled={true}/>
        <Picker.Item label="Break Fast" value="Break Fast" />
        <Picker.Item label="Lunch" value="Lunch" />
        <Picker.Item label="Dinner" value="Dinner" />
        <Picker.Item label="Supper" value="Supper" />
        
      </Picker>
            </View>


            <View style={styles.inputTitles}><Text style={styles.inputHeader}>Serving Size</Text></View>
            <View style={styles.container}>
            <Picker
        selectedValue={selectedServing}
        style={{height:30,width: '100%' }}
        onValueChange={(itemValue, itemIndex) => setSelectedServing(itemValue)}
      >
        <Picker.Item label="1 Person" value={1} />
        <Picker.Item label="2 Persons" value={2} />
        <Picker.Item label="3 Persons" value={3} />
        <Picker.Item label="4 Persons" value={4} />
        
      </Picker>
            </View>

            <View style={styles.inputTitles}><Text style={styles.inputHeader}>Price</Text></View>    
            <TextInput style={{...styles.inputText,borderColor:isPriceFocused
                 ? Colors.primaryColor
                 : '#F5FCFF',
             borderWidth: isPriceFocused?1:0}} placeholder="Rs. Price" onFocus={handlePriceFocus} onBlur={handlePriceBlur}
             value={dishPrice} onChangeText={(text)=>setDishPrice(text)}
             />

            <View style={styles.inputTitles}><Text style={styles.inputHeader}>Description</Text></View>  
            <View style={styles.container2}>
        <Textarea
        containerStyle={styles.textareaContainer}
        style={styles.textarea}
        value={description}
        onChangeText={(text)=>{setDescription(text)}}
        maxLength={300}
        placeholder={'Describe your dish ....'}
        placeholderTextColor={'#c7c7c7'}
        underlineColorAndroid={'transparent'}
  />
</View>

            <View style={styles.inputTitles
            }><Text style={styles.inputHeader}>Image</Text></View>
            {/**  
            <TextInput style={{...styles.inputText,borderColor:isDescFocused?Colors.primaryColor:'#F5FCFF',
            borderWidth:isDescFocused?1:0,}} multiline={true} placeholder="Image Url" onFocus={handleDescFocus} onBlur={handleDescBlur}
            value={imageUrl} onChangeText={(text)=>setImageUrl(text)}
            />*/}   
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
             {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
             <View style={styles.buttonsContainer}>
             <TouchableOpacity onPress={pickImage}>
                    <View style={styles.btnContainer}>
                    <Text style={styles.btnTitle}>Choose Image</Text>
                    </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={uploadDishImage}>
                <View style={styles.btnContainer}>
                    <Text style={styles.btnTitle}>Save</Text>
                </View>
            </TouchableOpacity>
             </View>
            <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={addNewDish}>
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

export default AddDisheScreen;
