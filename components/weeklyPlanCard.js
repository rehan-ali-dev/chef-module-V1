import React from "react"
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"

const WeeklyPlanCard = (props) => {
  return (
    <TouchableOpacity style={styles.plancarddetail} onPress={props.onSelect}>
      <View style={styles.plancard}>
        <View style={styles.imageContainer}>
          <ImageBackground
            source={{ uri: props.imgurl }}
            style={styles.image}
            resizeMode="cover"></ImageBackground>
        </View>

        <View style={styles.planDetailContainer}>
          {/* <LinearGradient
          // Background Linear Gradient
          colors={["#ff620a, 'transparent', #ffab00"]}
          style={styles.background}
        /> */}

          <View>
            <Text style={styles.planname} numberOfLines={1}>
              {props.planname}
            </Text>
          </View>
          <View>
            <Text style={styles.KitchenName} numberOfLines={1}>
              {props.KitchenName}
            </Text>
          </View>
          <View>
            <Text style={styles.price} numberOfLines={1}>
              {props.price}
            </Text>
          </View>

          {/* </LinearGradient> */}
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  plancard: {
    elevation: 5,
    backgroundColor: "#ff620a",
    borderRadius: 10,

    height: 120,
    width: "95%",

    marginTop: 15,
    marginHorizontal: 10,
    borderRadius: 15,
    flexDirection: "row",
    overflow: "hidden",
  },

  planDetailContainer: {
    backgroundColor: "#ff620a",
    alignItems: "flex-start",
    justifyContent: "center",
    borderRadius: 20,
    borderColor: "#ffab0a",
    borderWidth: 2,
    width: "70%",
    padding: 10,
    margin: 8,
    elevation: 5,
  },
  planname: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  price: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
  },
  KitchenName: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
  },
  imageContainer: {
    height: "100%",
    justifyContent: "center",
    padding: 10,
  },
  // background: {
  //   position: "relative",
  //   left: 0,
  //   right: 0,
  //   top: 0,
  //   height: 300,
  // },
  image: {
    height: 85,
    width: 85,
    borderRadius: 42,
    overflow: "hidden",
  },
})

export default WeeklyPlanCard