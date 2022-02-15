import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,ToastAndroid } from 'react-native';
import HomeNavigator from './navigation/chefBottomNavigator';
import { useEffect } from 'react';
import { combineReducers,createStore } from 'redux';
import { Provider,useDispatch } from 'react-redux';
import * as Notifications from 'expo-notifications';
import orderReducer from './store/reducers/orderReducer';
import IP from './constants/IP';


Notifications.setNotificationHandler({
  handleNotification: async () =>{
    return{
      shouldShowAlert:true,
      shouldPlaySound:true
    };
  }
});

const rootReducer=combineReducers({
  order:orderReducer
});

const store=createStore(rootReducer);



export default function App() {

  useEffect(()=>{
    const backgroundSubscription=Notifications.addNotificationResponseReceivedListener(
      (response)=>{
        console.log("/////////////////     Background Response   ///////////////////////");
        console.log(response);
        console.log("#########################3");
      }
    )

    const forgroundSubscription=Notifications.addNotificationReceivedListener(
      (notification)=>{
        console.log("/////////////////     Forground Response   ///////////////////////");
        console.log(notification);
        console.log("#########################3");
        let senderToken=notification.request.content.data.sender;
        let recieverToken=notification.request.content.data.reciever;
        let orderId=notification.request.content.data.orderId;
        let status=notification.request.content.data.status;
        addnewNotification(orderId,senderToken,recieverToken,status);
        //you can navigate to different screen
        //send http request
      }
    );

    return () =>{
      backgroundSubscription.remove();
      forgroundSubscription.remove();
    }
  },[]);

  const addnewNotification=(orderId,sender,reciever,status)=>{
    let url=`http://${IP.ip}:3000/notifications`;
    let data={
        orderId:orderId,
        senderToken:sender,
        recieverToken:reciever,
        status:status
    }
    fetch(url,{
        method:'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
        body:JSON.stringify(data)
    }).then((response)=>response.json())
    .then(()=>ToastAndroid.show(`You recieved new notification`, ToastAndroid.SHORT))
    .catch((error)=>console.log(error));

}


  return (
    <Provider store={store}>
    <HomeNavigator/>
    </Provider>
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
