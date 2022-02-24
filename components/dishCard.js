import React from "react"
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native"

const DishCard = (props) => {
  return (
    <View style={styles.dishcard}>
       <TouchableOpacity onPress={props.onSelect}>
      <ImageBackground
        source={{ uri: props.imgurl }}
        style={styles.image}
        resizeMode="cover">
        <View style={styles.dishnameContainer}>
          <Text style={styles.dishname}>
            {props.dishname}
          </Text>
        </View>
      </ImageBackground>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  dishcard: {
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 10,
    height: 200,
    width: "95%",
    marginTop: 15,
    marginHorizontal: 10,
    borderRadius: 15,
    overflow: "hidden",
  },
  dishnameContainer: {
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    paddingVertical: 4,
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
})

export default DishCard;
