import React, { useState,useEffect } from "react"
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Textarea,
  KeyboardAvoidingView,
  ScrollView,
  
  Switch,
  ToastAndroid
} from "react-native";
import IP from "../constants/IP";
import { Picker } from "@react-native-picker/picker";

const DishDetailScreen = (props) => {
  //picker

  const [dishId,setDishId]=useState(props.navigation.getParam('dishId'));
  const [dishName,setDishName]=useState(props.navigation.getParam('dishName'));
  const [imageUrl,setImageUrl]=useState(props.navigation.getParam('imageUrl'));
  const [kitchenName,setKitchenName]=useState(props.navigation.getParam('kitchenName'));
  const [availability,setAvailability]=useState(props.navigation.getParam('available'));
  const [price,setPrice]=useState(props.navigation.getParam('price').toString());
  const [category,setCategory]=useState(props.navigation.getParam('category'));
  const [cuisine,setCuisine]=useState(props.navigation.getParam('cuisine'));
  const [description,setDescription]=useState(props.navigation.getParam('description'));
  const [servingSize,setServingSize]=useState(props.navigation.getParam('servingSize').toString());
  const [pushToken,setPushToken]=useState(props.navigation.getParam('pushToken'));


  //switch or toggle button
  const [switchValue, setSwitchValue] = useState(props.navigation.getParam('availabilityStatus'))

  const toggleSwitch = (value) => {
    setSwitchValue(value);
    if(availability===1){
        setAvailability(0);
    }
    else if(availability===0){
        setAvailability(1);
    }
  }

  //price handlers

  const PriceInputHandler = (enteredText) => {
    setPrice(enteredText)
  }
  
  //Serving Size handlers

  const ServingSizeInputHandler = (enteredText) => {
    setServingSize(enteredText)
  }
  /***********************************/

  //description handler
  const descriptionInputHandler = (enteredText) => {
    setDescription(enteredText)
  }
  const saveChangesHandler = () => {
    let url=`http://${IP.ip}:3000/dish/updateDish/${dishId}`;
        let data={
            category:category,
            price:price,
            description:description,
            cuisine:cuisine,
            servingSize:servingSize,
            status:availability,
        }
        fetch(url,{
            method:'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
            body:JSON.stringify(data)
        }).then((response)=>response.json())
        .then(()=>ToastAndroid.show(`${dishName} has been updated`, ToastAndroid.SHORT))
        //.then(()=>dispatch(updateOrderCounts('delivered')))
        //.then(()=>dispatch(updateOrderStatus(orderId,'delivered')))
        //.then(()=>getUpdatedPayments())
        //.then(()=>sendNotificationToChef(orderId))
        .catch((error)=>console.error(error))   

  }
  /************************************/

  return (
    <View>
      <ScrollView>
        <View style={styles.dishcard}>
          <ImageBackground
            source={{
              uri:`http://${IP.ip}:3000/images/${imageUrl}`,
            }}
            style={styles.image}
            resizeMode="cover">
            <View style={styles.dishnameContainer}>
              <Text style={styles.dishname} numberOfLines={1}>
                {dishName}
              </Text>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.ktchname}>
          <Text style={styles.kitchenname} numberOfLines={1}>
            {kitchenName}
          </Text>
        </View>
        {/* toggle button */}
        <View style={styles.toggle}>
          <Text style={styles.toggletxt}>
            {switchValue ? "Dish Available" : "Dish Unavailable"}
          </Text>
          <Switch onValueChange={toggleSwitch} value={switchValue} />
        </View>
        <View style={styles.dishdetails}>
          <View style={styles.headerview}>
            <Text style={styles.price}>Price</Text>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Price"
            keyboardType="numeric"
            onChangeText={PriceInputHandler}
            defaultValue={price.toString()}
            value={price}
          />
        </View>
        <View style={styles.dishdetails}>
          <View style={styles.headerview}>
            <Text style={styles.ctgry}>Category</Text>
          </View>

          {/* <TextInput
            style={styles.input}
            placeholder="Category"
            onChangeText={CategoryInputHandler}
            value={enteredCategory}
          /> */}
          <Picker
            style={styles.picker}
            selectedValue={category}
            onValueChange={(itemValue, itemIndex) =>
              setCategory(itemValue)
            }>
            <Picker.Item label="Select Category" value="diabled" color="#aaa" />
            <Picker.Item label="Break Fast" value="Break Fast" />
            <Picker.Item label="Lunch" value="Lunch" />
            <Picker.Item label="Dinner" value="Dinner" />
          </Picker>
        </View>

        <View style={styles.dishdetails}>
          <View style={styles.headerview}>
            <Text style={styles.cusine}>Cuisine</Text>
          </View>
          {/* {<Text style={styles.cusine}>{cuisine}</Text> */}

          <Picker
            style={styles.picker}
            selectedValue={cuisine}
            onValueChange={(itemValue, itemIndex) =>
              setCuisine(itemValue)
            }>
            <Picker.Item label="Select Cuisine" value="diabled" color="#aaa" />
            <Picker.Item label="Indian" value="Indian " />
            <Picker.Item label="Pakistani" value="Pakistani" />
            <Picker.Item label="Indian" value="Indian" />
            <Picker.Item label="BBQ" value="BBQ" />
            <Picker.Item label="Hyderabadi" value="Hyderabadi" />
            <Picker.Item label="Chinese" value="Chinese" />
        </Picker>
          {/* <TextInput
            style={styles.input}
            placeholder="Cusine"
            onChangeText={CusineInputHandler}
            value={enteredCusine}
          /> */}
        </View>

        <View style={styles.dishdetails}>
          <View style={styles.headerview}>
            <Text style={styles.srvngsize}>Serving Size</Text>
          </View>
          {/* <Picker
            style={styles.picker}
            selectedValue={selectedValue}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }>
            <Picker.Item label="Size Per person" value="Select Category" />
            <Picker.Item label="Breakfast" value="Breakfast" />
            <Picker.Item label="Lunch" value="Lunch" />
            <Picker.Item label="Dinner" value="Dinner" />
          </Picker> */}
          <TextInput
            style={styles.input}
            placeholder="Serving Size Per Person"
            onChangeText={ServingSizeInputHandler}
            value={servingSize}
            defaultValue={servingSize}
          />
        </View>

        <View style={styles.descriptionview}>
          <Text style={styles.description}>Description</Text>
          <View style={styles.inputdesbox}>
            <TextInput
              style={styles.inputdes}
              placeholder="Add some details"
              {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
              editable
              multiline={true}
              onChangeText={descriptionInputHandler}
              value={description}
            />
          </View>
        </View>

        <View style={styles.btnview}>
          <TouchableOpacity
            style={styles.buttons}
            // onPress={() => console.log("Kitchen Hours")}
            onPress={saveChangesHandler}>
            <View>
              <Text style={styles.btntext}>Save Changes</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  dishcard: {
    elevation: 5,
    backgroundColor: "white",

    height: 250,
  },
  toggle: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    height: 28,
  },
  toggletxt: {
    fontWeight: "bold",
    fontSize: 18,
    color: "grey",
  },
  picker: {
    height: 50,
    width: 150,
    justifyContent: "center",
  },

  dishnameContainer: {
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    paddingVertical: 7,
    width: "100%",
  },
  dishname: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },

  image: {
    height: "100%",
    width: "100%",
    justifyContent: "flex-end",
  },

  kitchenname: {
    fontSize: 22,
    color: "#ff620a",
    fontWeight: "bold",
    justifyContent: "flex-end",
    paddingVertical: 7,
    paddingHorizontal: 20,
  },
  dishdetails: {
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",

    // justifyContent: "space-around",
  },
  descriptionview: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  input: {
    flex: 1,
    // width: 150,
    textAlign: "left",
    color: "black",
    marginLeft: 50,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
  inputdesbox: {
    borderColor: "#aaa",
    marginTop: 5,
    borderWidth: 0.5,
    borderRadius: 8,
    width: "100%",
    height: 150,
  },
  inputdes: {
    color: "black",
    padding: 5,
  },
  headerview: {
    width: 80,
  },
  price: {
    fontSize: 15,
    color: "black",
    fontWeight: "bold",
  },
  ctgry: {
    fontSize: 15,
    color: "black",
    fontWeight: "bold",
  },
  cusine: {
    fontSize: 15,
    color: "black",
    fontWeight: "bold",
  },
  srvngsize: {
    fontSize: 14,
    color: "black",
    fontWeight: "bold",
  },

  description: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
  btnview: {
    //paddingTop: 25,
    flex: 1,
    alignItems: "center",
    paddingVertical:15,
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
  picker: {
    width: "70%",
    height: 40,
    marginLeft: 43,
    borderColor: "#aaa",
    borderWidth: 1,
    justifyContent: "space-around",
  },
})

export default DishDetailScreen