import React, { useState,useEffect } from "react"
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Textarea,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
  Picker,
  Switch,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { useSelector,useDispatch } from "react-redux"
// import { Switch } from "react-native-gesture-handler"

const PaymentsScreen = (props) => {


    const [weeklyPayments,setWeeklyPayments]=useState(0);
    const [recentRecievedPayments,setRecentRecievedPayments]=useState(0);
    const [totalEarned,setTotalEarned]=useState(0);
    const [totalWithdrawn,setTotalWithdrawn]=useState(0);
    const [isLoading,setLoading]=useState(true);

    const chefDetail=useSelector(state=>state.order.chefDetails);

    useEffect(()=>{

    },[])








  return (
    <ScrollView>
    <View style={styles.screencontainer}>
       
      <LinearGradient
        colors={["transparent", "#ff620a"]}
        style={styles.background}>
        <View style={styles.iconview}>
          <View style={styles.icon}>
            {/* <ImageBackground>
          <Ionicons name="camera" size={40} color="#aaa" />
        </ImageBackground> */}
            <Ionicons name="wallet" size={140} color="#ff620a" />
            {/* <Image
            source={{
              uri: "https://www.freeiconspng.com/thumbs/payment-icon/cash-payment-icon-5.png",
            }}
            style={styles.image}
          /> */}
          </View>
          <Text style={styles.icontext}>Payments</Text>
        </View>

        <View style={styles.maincard}>
          {/* Weekly Payments Card */}
          <View style={styles.infofield}>
            <Text style={styles.payments}>Recent Weekly Payments</Text>
            {/* {"//inputbox "} */}
            <View style={styles.inputContainer}>
              <Text style={styles.money}>2000</Text>
            </View>
          </View>

          {/* Recent recieved Payments Card */}
          <View style={styles.infofield}>
            <Text style={styles.payments}>Recent Recieved Payment</Text>
            {/* {"//inputbox "} */}
            <View style={styles.inputContainer}>
              <Text style={styles.money}>5000</Text>
            </View>
          </View>

          {/* Total Earned money Card */}
          <View style={styles.infofield}>
            <Text style={styles.payments}>Total Earned Money</Text>
            {/* {"//inputbox "} */}
            <View style={styles.inputContainer}>
              <Text style={styles.money}>20000</Text>
            </View>
          </View>

          {/* Total withdrawn money Card */}
          <View style={styles.infofield}>
            <Text style={styles.payments}>Total Withdarwn Money</Text>
            {/* {"//inputbox "} */}
            <View style={styles.inputContainer}>
              <Text style={styles.money}>5000</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
      
    </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  screencontainer: {
    flex: 1,

    justifyContent: "center",

   // paddingTop: 100,
   // paddingBottom: 100,

    //  backgroundColor: "#ff620a",
  },
  iconview: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },

  icon: {
    alignItems: "center",
    justifyContent: "center",
    height: 150,
    width: 150,
    marginLeft: 5,
    padding: 10,
  },
  icontext: {
    fontWeight: "bold",
    fontSize: 30,
  },
  maincard: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    // backgroundColor: "#ff620a",
    padding: 20,
    margin: 20,
    // height: 530,

    borderRadius: 10,
  },
  infofield: {
    flexDirection: "column",
    backgroundColor: "#ff620a",
    elevation: 10,
    borderRadius: 10,
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
  },
  inputContainer: {
    backgroundColor: "white",
    padding: 5,
    margin: 10,
    height: 40,
    width: 120,
    elevation: 5,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  money: {
    fontSize: 19,
  },

  payments: {
    fontSize: 15,
    color: "black",
    marginTop:10,
    marginLeft: 10,
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
  },
})

export default PaymentsScreen