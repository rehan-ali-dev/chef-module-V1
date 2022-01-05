import React from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,TouchableOpacity,Picker,TextInput,ScrollView } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Colors from '../constants/Colors';
import Textarea from "react-native-textarea";
import { useEffect, useState } from "react";
import { Ionicons } from '@expo/vector-icons';


const AddDisheScreen=()=>{
    const [selectedCategory,setSelectedCategory]=useState("none");
    const [selectedCuisine,setSelectedCuisine]=useState("none");
    const [selectedServing,setSelectedServing]=useState(1);
    
    const [isNameFocused,setNameFocused]=useState(false);
    const [isCuisineFocused,setCuisineFocused]=useState(false);
    const [isCategoryFocused,setCategoryFocused]=useState(false);
    const [isSizeFocused,setSizeFocused]=useState(false);
    const [isPriceFocused,setPriceFocused]=useState(false);
    const [isDescFocused,setDescFocused]=useState(false);

    const handleNameFocus=()=>setNameFocused(true);
    const handlePriceFocus=()=> setPriceFocused(true);
    const handleNameBlur=()=> setNameFocused(false);
    const handlePriceBlur=()=> setPriceFocused(false);

    const handleCuisineFocus=()=>setCuisineFocused(true);
    const handleCategoryFocus=()=> setCategoryFocused(true);
    const handleCuisineBlur=()=> setCuisineFocused(false);
    const handleCategoryeBlur=()=> setCategoryFocused(false);
    const handleSizeFocus=()=>setSizeFocused(true);
    const handleDescFocus=()=> setDescFocused(true);
    const handleSizeBlur=()=> setSizeFocused(false);
    const handleDescBlur=()=> setDescFocused(false);
    
        return(
          <View style={styles.screen}>
            <ScrollView>
            <View style={styles.inputTitles}><Text style={styles.inputHeader}>Dish Name</Text></View>
            
            <TextInput style={{...styles.inputText,borderColor:isNameFocused
                 ? Colors.primaryColor
                 : '#F5FCFF',
             borderWidth: isNameFocused?1:0}} placeholder="Dish Name" onFocus={handleNameFocus} onBlur={handleNameBlur}/>
           
            <View style={styles.inputTitles}><Text style={styles.inputHeader}>Cuisine</Text></View>
            <View style={styles.container}>
            <Picker
        selectedValue={selectedCuisine}
        
        style={{height:30,width: '100%'}}
        onValueChange={(itemValue, itemIndex) => setSelectedCuisine(itemValue)}
      >
        <Picker.Item label="Select Cuisine" value=" " disabled={true}/>
        <Picker.Item label="Pakistani" value="Pakistani" />
        <Picker.Item label="BBQ" value="BBQ" />
        <Picker.Item label="Hyderabadi" value="Hyderabadi" />
        <Picker.Item label="Italian" value="Italian" />
        <Picker.Item label="Sindhi" value="Sindhi" />
        <Picker.Item label="Dessert" value="Dessert" />
      </Picker>
            </View>
        

            <View style={styles.inputTitles}><Text style={styles.inputHeader}>Category Name</Text></View>
            <View style={styles.container}>
            <Picker
        selectedValue={selectedCategory}
        style={{height:30,width: '100%' }}
        onValueChange={(itemValue, itemIndex) => setSelectedCategory(itemValue)}
      >
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
             borderWidth: isPriceFocused?1:0}} placeholder="Rs. Price" onFocus={handlePriceFocus} onBlur={handlePriceBlur}/>

            <View style={styles.inputTitles}><Text style={styles.inputHeader}>Description</Text></View>  
            <View style={styles.container2}>
        <Textarea
        containerStyle={styles.textareaContainer}
        style={styles.textarea}
        onChangeText={()=>{}}
        maxLength={300}
        placeholder={'Describe your dish ....'}
        placeholderTextColor={'#c7c7c7'}
        underlineColorAndroid={'transparent'}
  />
</View>

            <View style={styles.inputTitles
            }><Text style={styles.inputHeader}>Image</Text></View>    
            <TextInput style={{...styles.inputText,borderColor:isDescFocused?Colors.primaryColor:'#F5FCFF',
            borderWidth:isDescFocused?1:0,}} multiline={true} placeholder="Image Url" onFocus={handleDescFocus} onBlur={handleDescBlur}/>

<View style={styles.btnContainer}>
            <TouchableOpacity onPress={()=>{   
                           
              
               }
            }>
                <View style={styles.buttonContainer}>
                    <Text style={styles.btnTitle}>Submit</Text>
                </View>
            </TouchableOpacity>
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
            flexDirection:'row',
            backgroundColor:Colors.primaryColor,
            width:160,
            justifyContent:'center',
            alignItems:'center',
            padding:5,
            borderRadius:20,
            
        },
        btnContainer:{
            paddingTop:10,
            marginVertical:10,
            justifyContent:'center',
            alignItems:'center'
           
            
            
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
            fontSize: 14,
            color: '#333',
          },
       
    }
)

export default AddDisheScreen;
