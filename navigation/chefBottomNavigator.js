import { createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import React from 'react';
import { Platform } from 'react-native';

import HomeScreen from '../screens/homeScreen';
import OrdersScreen from '../screens/ordersScreen';
import ProfileScreen from '../screens/profileScreen';
import DishesScreen from '../screens/dishesScreen';
import PaymentsScreen from '../screens/paymentsScreen';
import AddDisheScreen from '../screens/addDishScreen';
import NotificationScreen from '../screens/notificationScreen';

const defaultNavConfiguration= {
    //set Default Configuration
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:Colors.primaryColor
        },
        headerTintColor:'white',
        
    }
}

const HomeNavigator=createStackNavigator(
    {
        Home: HomeScreen,
        Notifications:NotificationScreen
    },defaultNavConfiguration
);

const OrdersNavigator=createStackNavigator(
    {
        Orders:OrdersScreen,     
    },defaultNavConfiguration
);

const DishesNavigator=createStackNavigator(
    {    
        Dishes:DishesScreen,
        AddDish: AddDisheScreen,
    },defaultNavConfiguration
);

const PaymentsNavigator=createStackNavigator(
    {  
       Payments:PaymentsScreen,
    },defaultNavConfiguration
);

const ProfileNavigator=createStackNavigator(
    {      
        Profile:ProfileScreen,   
    },defaultNavConfiguration
);


const navigationConfiguration={
    Orders:{
        screen:OrdersNavigator,
        navigationOptions:{
            tabBarIcon:(tabInfo)=>{
                return (
                    <MaterialCommunityIcons name="shopping" size={24} color={tabInfo.tintColor} />)
            }
        },
    },
    Dishes:{
        screen:DishesNavigator,
        navigationOptions:{
            tabBarIcon:(tabInfo)=>{
                return (<MaterialIcons name="restaurant" size={24} color={tabInfo.tintColor} />)
            }
        }
    },
    Home:{
        screen:HomeNavigator,
        navigationOptions:{
            tabBarIcon:(tabInfo)=>{
                return (<Ionicons name="md-home" size={24} color={tabInfo.tintColor} />)
            }
        }
    },

    Payments:{
        screen:PaymentsNavigator,
        navigationOptions:{
            tabBarIcon:(tabInfo)=>{
                return (<Fontisto name="wallet" size={24} color={tabInfo.tintColor} />)
            }
        }
    },
    Profile:{
        screen:ProfileNavigator,
        navigationOptions:{
            tabBarIcon:(tabInfo)=>{
                return (<FontAwesome name="user" size={24} color={tabInfo.tintColor} />)
            }
        }
    }
}



const ChefBottomNavigator=Platform.OS === 'android'
? createMaterialBottomTabNavigator(
   navigationConfiguration,{
       activeColor:Colors.primaryColor,
       inactiveColor:'#888',
       shifting:true,
       barStyle:{backgroundColor:Colors.whiteColor},
       initialRouteName:'Home'
       
   }
) 
: createBottomTabNavigator(
  navigationConfiguration,{
       tabBarOptions:{
           activeTintColor:Colors.primaryColor
       } 
   });


export default createAppContainer(ChefBottomNavigator);