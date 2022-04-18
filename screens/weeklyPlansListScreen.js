import React from "react"
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
  FlatList,
} from "react-native"
import WeeklyPlanCard from "../components/weeklyPlanCard"
import { PLANSDATA } from "../constants/plansData";
import { HeaderButtons,Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/customHeaderButton";
import Colors from "../constants/Colors";
import { Ionicons } from '@expo/vector-icons'; 

const WeeklyPlansListScreen = (props) => {
  function showItem(itemData) {
    return (
      <WeeklyPlanCard
        imgurl={itemData.item.img_url}
        planname={itemData.item.PlanName}
        KitchenName={itemData.item.KitchenName}
        price={itemData.item.price}
        onSelect={() => {
          console.log("clicked")
          props.navigation.navigate({
            routeName: "WeeklyPlanDetails",
            params: {
              imgurl: itemData.item.img_url,
              planname: itemData.item.PlanName,
              KitchenName: itemData.item.KitchenName,
              price: itemData.item.price,
            },
          })
        }}
      />
    )
  }
  return (
    <View style={styles.planscreen}>
      <FlatList
        style={styles.flatlist}
        data={PLANSDATA}
        renderItem={showItem}
        keyExtractor={(item) => item.PlanName}
      />
      <View style={styles.btnContainer}>
            <TouchableOpacity onPress={()=>{   
                            props.navigation.navigate({
                                routeName:'AddPlan',
                });
               }
            }>
                <View style={styles.buttonContainer}>
                    <Ionicons name="md-add" size={24} color={Colors.whiteColor} />
                    <Text style={styles.btnTitle}>ADD NEW</Text>
                </View>
            </TouchableOpacity>
            </View>
    </View>
  )
}

WeeklyPlansListScreen.navigationOptions=navigationData=>{
  const moveNotifications=()=>{
      navigationData.navigation.navigate({
          routeName:'Notifications2'
      })
  }
  return{
      headerRight: ()=><HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item title="notification" iconName='ios-notifications' onPress={moveNotifications}/>
      </HeaderButtons>
  }
}
const styles = StyleSheet.create({
  planscreen: {
    paddingTop: 10,
    flex: 1,
  },
  flatlist: {
    width: "100%",
  },
  buttonContainer:{
    flexDirection:'row',
    backgroundColor:Colors.primaryLightColor,
    width:160,
    justifyContent:'center',
    alignItems:'center',
    padding:5,
    borderRadius:20,
    
},
btnContainer:{
    paddingTop:10,
    position:'absolute',
    bottom:10,
    left:'30%'
   
    
    
},
btnTitle:{
    color:Colors.whiteColor,
    fontSize:16,
    paddingEnd:10
},
})

export default WeeklyPlansListScreen
