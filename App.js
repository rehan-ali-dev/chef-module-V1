import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeNavigator from './navigation/chefBottomNavigator';
import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';


Notifications.setNotificationHandler({
  handleNotification: async () =>{
    return{
      shouldShowAlert:true,
      shouldPlaySound:true
    };
  }
});


export default function App() {

  useEffect(()=>{
    const backgroundSubscription=Notifications.addNotificationResponseReceivedListener(
      (response)=>{console.log(response);
      }
    )

    const forgroundSubscription=Notifications.addNotificationReceivedListener(
      (notification)=>{
        console.log(notification);
        //you can navigate to different screen
        //send http request
      }
    );

    return () =>{
      backgroundSubscription.remove();
      forgroundSubscription.remove();
    }
  },[]);

  return (
    <HomeNavigator/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
