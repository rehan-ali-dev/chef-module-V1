import { createAppContainer,createSwitchNavigator } from 'react-navigation';
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
import DishDetailScreen from '../screens/dishDetailScreen';
import NotificationScreen from '../screens/notificationScreen';
import LoginScreen from '../screens/loginScreen';
import IntroScreen from '../screens/introScreen';
import ChefInfoScreen from '../screens/chefInfo';
import AddressInfoScreen from '../screens/addressInfo';
import KitchenInfoScreen from '../screens/kitchenInfoScreen';
import WeeklyPlansListScreen from '../screens/weeklyPlansListScreen';
import WeeklyPlanDetailsScreen from '../screens/weeklyPlanDetailsScreen';
import AddPlanScreen from '../screens/AddPlanScreen';
import AddPlanScreen2 from '../screens/AddPlanScreen2';
import OTPScreen from '../screens/otpTakingScreen';
import PasswordScreen from '../screens/passwordScreen';

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
        Notifications:NotificationScreen,
        WeeklyPlansList:WeeklyPlansListScreen,
        WeeklyPlanDetails:WeeklyPlanDetailsScreen,
        AddPlan:AddPlanScreen,
        AddPlan2:AddPlanScreen2,
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
        DishDetail:DishDetailScreen,
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

const AuthNavigator=createStackNavigator(
    {  
        Login:LoginScreen,
        OTP:OTPScreen,
        Password:PasswordScreen,
        Intro:IntroScreen,
        ChefInfo:ChefInfoScreen,
        AddressInfo:AddressInfoScreen,
        KitchenInfo:KitchenInfoScreen,
    },defaultNavConfiguration
)


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

const MainNavigator=createSwitchNavigator({
    Auth:AuthNavigator,
    MainHome:ChefBottomNavigator
})


export default createAppContainer(MainNavigator);