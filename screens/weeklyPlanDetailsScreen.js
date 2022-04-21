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
import { useState,useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import WeeklyPlanCard from "../components/weeklyPlanCard"
import DayWiseFoodCard from "../components/DayWiseFoodCard"
import { DAYSDATA } from "../constants/daysData"

import IP from "../constants/IP";


const WeeklyPlanDetailsScreen = (props) => {
    const imageUrl = props.navigation.getParam("imgurl")
    const planName = props.navigation.getParam("planname")
    const KitchenName = props.navigation.getParam("KitchenName")
    const price = props.navigation.getParam("price");
    const planId=props.navigation.getParam("planId");

    const allDishes=useSelector(state=>state.order.Dishes);


    const [planDetails,setPlanDetails]=useState({});
    const [isLoading,setLoading]=useState(true);
    const [daysData,setDaysData]=useState([]);
    const [planDishes,setPlanDishes]=useState([]);
    let days=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

   
    useEffect(()=>{
      let daysArr=[];
      fetch(`http://${IP.ip}:3000/weeklyPlan/getWeekDetails/${planId}`)
      .then((response)=>response.json())
      .then((response)=>setPlanDetails(response[0]))

      .then(()=>console.log(planDetails))
      .then(()=>{
        //let daysArr=[];
        daysArr.push(planDetails["monday"]);
        daysArr.push(planDetails["tuesday"]);
        daysArr.push(planDetails["wednesday"]);
        daysArr.push(planDetails["thursday"]);
        daysArr.push(planDetails["friday"]);
        daysArr.push(planDetails["saturday"]);
        setDaysData(daysArr);
        console.log(daysData);

      })
      .then(()=>{
        console.log("////    All Dihses ///////////")
        console.log(allDishes);
       let selectedDishes= allDishes.filter(dish => daysArr.includes(dish.dish_id))
       console.log("////    All Dihses ///////////")
       console.log(selectedDishes);
      
       for(let i=0;i<selectedDishes.length;i++){
         selectedDishes[i]["day"]=days[i]
        
       }
       setPlanDishes(selectedDishes);
       console.log("///  Slected Dishes //")
       console.log(selectedDishes);
       //people.filter(person => id_filter.includes(person.id))
      // setCategoricalMeals(categories.filter(item=>filteredCuisines.includes(item.cuisine)));
      })
      .catch((error)=>console.error(error))
      .finally(()=>setLoading(false));
    },[isLoading]);



    function showItem(itemData) {
      return (
        <DayWiseFoodCard
        img_url={`http://${IP.ip}:3000/images/${itemData.item.image}`}
        DishName={itemData.item.dish_name}
        price={itemData.item.price}
        Category={itemData.item.cat_name}
        Day={itemData.item.day}
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
            imgurl={`http://${IP.ip}:3000/images/${imageUrl}`}
            planname={planName}
            KitchenName={KitchenName}
            price={price}
         
          />
        </View>
  
        {/* <ScrollView> */}
      
          <View style={styles.plantable}>
            <FlatList
              style={styles.flatlist}
              data={planDishes}
              renderItem={showItem}
              keyExtractor={(item) => item.dish_id}
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