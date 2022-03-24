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
  FlatList,
  Pressable,
  Modal,
  Alert,
} from "react-native"
import { useState } from "react"
import WeeklyPlanCard from "../components/weeklyPlanCard"
import DayWiseFoodCard from "../components/DayWiseFoodCard"
import { DAYSDATA } from "../constants/daysData"


const WeeklyPlanDetailsScreen = (props) => {
    const imageUrl = props.navigation.getParam("imgurl")
    const planName = props.navigation.getParam("planname")
    const KitchenName = props.navigation.getParam("KitchenName")
    const price = props.navigation.getParam("price")
    const [currentmodalVisible, setModalVisible] = useState(false)
  
    function showItem(itemData) {
      return (
        <DayWiseFoodCard
          img_url={itemData.item.img_url}
          Day={itemData.item.Day}
          DishName={itemData.item.DishName}
          price={itemData.item.price}
          Category={itemData.item.Category}
          onSelect={() => {
            console.log("clicked")
           
          }}
        />
      )
    }
    return (
      <View style={styles.plancard}>
        <View>
          <WeeklyPlanCard
            imgurl={imageUrl}
            planname={planName}
            KitchenName={KitchenName}
            price={price}
         
          />
        </View>
  
        {/* <ScrollView> */}
      
          <View style={styles.plantable}>
            <FlatList
              style={styles.flatlist}
              data={DAYSDATA}
              renderItem={showItem}
              keyExtractor={(item) => item.Day}
            />
          {/* <View style={{position: 'absolute', bottom: 5,left:0,right:0, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity
            style={styles.btnsubscribe}
            onPress={() => {
              setModalVisible(true)
            }}>
            <View>
              <Text style={styles.btntext}>Subscribe</Text>
            </View>
          </TouchableOpacity>
        </View> */}
         
        </View>
        {/* </ScrollView> */}
        <View>
          <Modal
            animationType="fade"
            transparent={true}
            visible={currentmodalVisible}
            onRequestClose={() => {
              setModalVisible(false)
            }}>
            <View style={styles.subscribepopup}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Subscribed Weekly Plan!</Text>
                <Text style={styles.planText}>Desi Khana</Text>
                <Text style={styles.planText}>Ta'am Khana 2</Text>
                <Text style={styles.planText}>2390 Rs.</Text>
                <Text style={styles.planText}>
                  Kindly Confirm or Cancel the order!
                </Text>
                <View style={styles.modalbtn}>
                  <Pressable
                    style={[styles.button, styles.btnConfirmCancel]}
                    onPress={() => {
                      Alert.alert("Your Weekly Plan has been Cancelled!")
                      setModalVisible(false)
                    }}>
                    <Text style={styles.textStyle}>Cancel</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.btnConfirmCancel]}
                    onPress={() => {
                      Alert.alert(
                        "Your Weekly Plan has been Subscribed Successfully!"
                      )
                      setModalVisible(false)
                    }}>
                    <Text style={styles.textStyle}>Confirm</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </View>
        
      </View>
    )
  }
  
  const styles = StyleSheet.create({
    plancard: {
      flex: 1,
     
    },
    plantable: {
      backgroundColor: "#ff620a",
      width: "95%",
      elevation: 5,
      marginTop: 15,
      flex:1,
      marginHorizontal: 10,
      borderRadius: 15,
      margin: 15,
      paddingVertical: 15,
    },
    flatlist: {
      width: "100%",
    
      
    },
    btnsubscribe: {
      backgroundColor: "#ffab00",
      position: "absolute",
      bottom: 3,
      height: 45,
      width: 170,
      alignItems: "center",
      borderRadius: 40,
      justifyContent: "center",
    },
    btntext: {
      fontWeight: "bold",
      fontSize: 18,
      color: "white",
    },
    subscribepopup: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
      backgroundColor: "#000a",
    },
    modalView: {
      height: 350,
      width: "75%",
      elevation: 5,
      margin: 20,
      backgroundColor: "#f5fcff",
      borderRadius: 10,
      padding: 20,
      shadowColor: "#000",
      shadowOffset: {
        width: 1,
        height: 2,
      },
      shadowOpacity: 0.5,
      shadowRadius: 4,
      elevation: 5,
    },
  
    btnConfirmCancel: {
      backgroundColor: "#ff620a",
      width: 100,
      height: 40,
      borderRadius: 30,
      justifyContent: "center",
      marginBottom: 10,
      elevation: 5,
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 18,
    },
    modalText: {
      margin: 15,
      textAlign: "center",
      color: "#ff620a",
      fontWeight: "bold",
      fontSize: 18,
    },
    planText: {
      color: "black",
      padding: 6,
      fontSize: 18,
      fontWeight: "bold",
    },
    modalbtn: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      marginTop: 50,
      // paddingLeft: 20,
      // paddingRight: 20,
    },
  })
  
  export default WeeklyPlanDetailsScreen