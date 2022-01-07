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
      (response)=>{
        console.log("/////////////////     Background Response   ///////////////////////");
        console.log(response);
        console.log("#########################3");
        console.log(response.notification.request.content.data);
      }
    )

    const forgroundSubscription=Notifications.addNotificationReceivedListener(
      (notification)=>{
        console.log("/////////////////     Forground Response   ///////////////////////");
        console.log(notification);
        console.log("#########################3");
        console.log(notification.request.content.data);
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
