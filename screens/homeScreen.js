import React from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,TouchableOpacity,ScrollView,RefreshControl } from "react-native";
import Colors from '../constants/Colors';
import { useEffect, useState } from "react";
import OrdersCard from '../components/ordersCard';
import CustomCard from "../components/customCard";
import { HeaderButtons,Item } from "react-navigation-header-buttons";
import { useDispatch,useSelector } from "react-redux";
import { getOrderCounts,getOrderData, getOrderDetails,getDishes } from "../store/actions/orderActions";
import CustomHeaderButton from "../components/customHeaderButton";
import IP from "../constants/IP";


const HomeScreen=(props)=>{

    const [pendingOrderCounts,setPendingOrderCounts]=useState(0);
    const [confirmedOrderCounts,setConfirmedOrderCounts]=useState(0);
    const [deliveredOrderCounts,setDeliveredOrderCounts]=useState(0);
    const [OrderCountsDetails,setOrderCountsDetails]=useState([]);
    const [chefOrders,setChefOrders]=useState([]);
    const [chefOrderDetails,setChefOrderDetails]=useState([]);
    const [refreshing,setRefreshing]=useState(true);
    const [dishesLoading,setDishesLoading]=useState(true);

    const totalOrdersCounts=useSelector(state=>state.order.OrdersCounts);
    const chefDetail=useSelector(state=>state.order.chefDetails);
    const ordersData=useSelector(state=>state.order.Orders);
    const dispatch=useDispatch();

        const moveToNotifications=()=>{
            props.navigation.navigate({
                routeName:'Notifications',
            });
        }

        
    useEffect(()=>{
        //const chefId='03154562292';
        const chefId=chefDetail.chef_id;
        fetch(`http://${IP.ip}:3000/orderCounts/counts/${chefId}`)
        .then((response)=>response.json())
        .then((response)=>setOrderCountsDetails(response[0]))
        .then(()=>dispatch(getOrderCounts(OrderCountsDetails)))
        .then(async()=>{
            await fetch(`http://${IP.ip}:3000/order/${chefId}`)
            .then((response)=>response.json())
            .then((response)=>setChefOrders(response))
            .then(()=>dispatch(getOrderData(chefOrders)))
            .then(()=>console.log(ordersData))
        })
        .then(async()=>{
            await fetch(`http://${IP.ip}:3000/orderDetail/orderedDishesForChef/${chefId}`)
            .then((response)=>response.json())
            .then((response)=>setChefOrderDetails(response))
            .then(()=>dispatch(getOrderDetails(chefOrderDetails)))
        })
        
        .then(()=>setRefreshing(false))
        .catch((error)=>console.error(error))
       
      },[refreshing]);


      useEffect(()=>{

        //const kitchen='Bisma Ka Kitchen';
        const chefId=chefDetail.chef_id;
        fetch(`http://${IP.ip}:3000/dish/chef/${chefId}`)
        .then((response)=>response.json())
        .then((response)=>dispatch(getDishes(response)))
        //.then(()=>dispatch(getDishes(mealsData)))
        .catch((error)=>console.error(error))
        .finally(()=>setDishesLoading(false));
      },[dishesLoading]);
    
        return(
          <View style={styles.screen}>
              <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>{setRefreshing(true)}}/>}>
              <OrdersCard box1="Pending" box2="Confirmed" box3="Delivered" header="ORDERS" pendingCounts={totalOrdersCounts.pendingCounts!==null?totalOrdersCounts.pendingCounts:0} confirmedCounts={totalOrdersCounts.confirmedCounts!==null?totalOrdersCounts.confirmedCounts:0} deliveredCounts={totalOrdersCounts.deliveredCounts!==null?totalOrdersCounts.deliveredCounts:0}/>
              <View style={styles.cardContainer}>
              <CustomCard title="Your Dishes" onSelect={()=>{
                  props.navigation.navigate('Dishes');
              }}/>
              {/* <CustomCard title="Kitchen Hours"/> */}
              <CustomCard title="Weekly Plans" onSelect={()=>{
                  props.navigation.navigate('WeeklyPlansList');
              }}/>
             
              </View>
              </ScrollView>

          </View>
        )
    };

HomeScreen.navigationOptions=navigationData=>{
    const moveNotifications=()=>{
        navigationData.navigation.navigate({
            routeName:'Notifications'
        })
    }
    return{
        headerRight: ()=><HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title="notification" iconName='ios-notifications' onPress={moveNotifications}/>
        </HeaderButtons>
    }
}


const styles=StyleSheet.create(
    {
        screen:{
            flex:1,
        },
        cardContainer:{
            alignItems:'center',
            marginTop:20
        }
       
    }
)

export default HomeScreen;
