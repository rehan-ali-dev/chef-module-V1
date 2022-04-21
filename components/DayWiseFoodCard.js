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
  Picker,
  Button,
  Platform,
} from "react-native"


const DayWiseFoodCard = (props) => {
 
  return (
    <View style={styles.container}>
      <View style={styles.mainplancard}>
        <View style={styles.planDay}>
          <Text style={styles.dayName}>{props.Day}</Text>
        </View>
        {/* <View style={styles.plancard}> */}
        <View style={styles.imageandMealDetailContainer}>
          <View style={styles.imageContainer}>
            <ImageBackground
              source={{
                uri: props.img_url,
              }}
              style={styles.image}
              resizeMode="cover"></ImageBackground>
          </View>
          <View style={styles.planDayMealDetail}>
            <Text
              style={{
                fontWeight: "bold",
                color: "#ff620a",
                fontSize: 20,
                borderColor: "#ffab00",
                borderWidth: 1.5,
                borderRadius: 30,
                padding: 10,

                textAlign: "center",
                marginLeft: 15,
              }}>
              {props.DishName}
            </Text>
            <Text style={styles.mealDetails}>Rs. {props.price}</Text>
            <Text style={styles.mealDetails}>{props.Category}</Text>
          </View>
        </View>

        {/* </View> */}
      </View>
     
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  mainplancard: {
    elevation: 5,
    backgroundColor: "#f5fcff",
    marginVertical: 5,
    height: 140,

    borderRadius: 15,

    overflow: "hidden",
  },
 
  planDay: {
    elevation: 5,

    height: 35,
    width: 130,

    backgroundColor: "#ffab00",
    borderBottomRightRadius: 25,
    borderTopRightRadius: 25,
  },
  dayName: {
    color: "black",
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontSize: 17,
    paddingTop: 7,
  },
  imageandMealDetailContainer: {
    flexDirection: "row",
  },
  imageContainer: {
    height: "70%",
    margin: 10,

    width: "30%",
  },
  image: {
    height: 90,
    width: 90,
    borderRadius: 45,
    overflow: "hidden",
  },
  mealDetails: {
    color: "black",
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "flex-start",
    textAlign: "justify",
    fontSize: 17,

    marginLeft: 25,
  },
})
export default DayWiseFoodCard