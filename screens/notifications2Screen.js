import React from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,TouchableOpacity,ToastAndroid,Alert,RefreshControl } from "react-native";
import Colors from '../constants/Colors';
import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import PlanNotificationCard from "../components/planNotificationCard";

import IP from '../constants/IP';


const Notification2Screen=(props)=>{

    
    const [customerToken,setCustomerToken]=useState('');
    const [notificationsData,setNotificationsData]=useState([]);
    const [plansData,setPlansData]=useState([]);
    const [selectedPlanId,setSelectedPlanId]=useState('');
    const [selectedCustomer,setSelectedCustomer]=useState('');
    const [refreshing,setRefreshing]=useState(true);
    const chefDetail=useSelector(state=>state.order.chefDetails);
   

  
    useEffect(()=>{
        let chefId=chefDetail.chef_id;
        fetch(`http://${IP.ip}:3000/weeklyPlan/getAllSubscriptions/${chefId}`)
        .then((response)=>response.json())
        .then((response)=>{
            setPlansData(response);
        })
        .then(()=>setRefreshing(false))
        .catch((error)=>console.error(error));
      },[refreshing]);

      // Function to confirm the order
      const updateOrderAsConfirmed=async (planId)=>{
        let url=`http://${IP.ip}:3000/weeklyPlan/updateStatus/${planId}`;
        let data={
            status:'Approved',
        }
        await fetch(url,{
            method:'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
            body:JSON.stringify(data)
        }).then((response)=>response.json())
        .then(()=>showAlert(planId,"Subscribed","Plan has been Confirmed Successfully!"))
        // .then(()=>dispatch(updateOrderCounts('confirmed')))
        // .then(()=>dispatch(updateOrderStatus(orderId,'confirmed')))
        
        //.then(()=>setRefreshing(true))
        .catch((error)=>console.error(error))   
      }

      // Function to cancel the Plan
      const updateOrderAsCancelled=async (planId)=>{
        let url=`http://${IP.ip}:3000/weeklyPlan/updateStatus/${planId}`;
        let data={
            status:'Cancelled',
        }
        await fetch(url,{
            method:'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
            body:JSON.stringify(data)
        }).then((response)=>response.json())
        .then(()=>showAlert(planId,"Cancelled","Plan Cancelled!"))
        // .then(()=>dispatch(updateOrderCounts('cancelled')))
        // .then(()=>dispatch(updateOrderStatus(orderId,'cancelled')))
        
        //.then(()=>setRefreshing(true))
        .catch((error)=>console.error(error))   
      }

      const showAlert=(planId,status,title)=>{
        Alert.alert(`${title}`,`Weekly Plan# : ${planId}\nPlan Status: ${status}\n`,[{
            text:'Okey!',
            style:'cancel'
        }]);
    }




       const renderNotificationCard=(itemData)=>{      
        return(
            <PlanNotificationCard
            planName={itemData.item.plan_name}
            subscriptionId={itemData.item.subscription_id}
            status={itemData.item.status}
            totalAmount={itemData.item.total}
            subscribedDate={itemData.item.subscribed_date}
            expiredDate={itemData.item.expired_date}
            forOrderScreen
            onViewDetails={()=>{
                console.log("clicked")
                props.navigation.navigate({
                  routeName: "WeeklyPlanDetails",
                  params: {
                    imgurl: itemData.item.logo,
                    planname: itemData.item.plan_name,
                    KitchenName: itemData.item.kitchen_name,
                    price: itemData.item.total,
                    planId:itemData.item.plan_id,
                    showButton:false,
                  },
                })
            }}

            onSelect={()=>{
            updateOrderAsConfirmed(itemData.item.plan_id)
            .then(()=>{
                let phoneNumber=itemData.item.customer_id.substring(1);
                let numForQuery='92'+phoneNumber;
                let url=`http://${IP.ip}:3000/sendMessage`;
                let data={
                phone:numForQuery,
                message:`Your subscription has been reviewed\n We are very happy to announce that Your wished Weekly Plan has been subscribed. Your plan will starts from your entered date.\n  \n\n Thanks\nBest Wishes From Team Ta'am Khana`
            }
            fetch(url,{
                method:'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(data)
            }).then((response)=>response.json())
            .then(()=>ToastAndroid.show("Message Sent To Customer", ToastAndroid.SHORT))
            .then(()=>{
                          //send notification to Admin
                        fetch('https://exp.host/--/api/v2/push/send',{
                            method:'POST',
                            headers:{
                                'Accept':'application/json',
                                'Accept-Encoding':'gzip,deflate',
                                'Content-Type':'application/json'
                            },
                            body: JSON.stringify({
                                to:'ExponentPushToken[jXY39COY1qo-vtkAP4_dnh]',
                                data:{
                                   
                                },
                                title:`New Weekly Plan Confirmed`,
                                body:`New Weekly Plan has been confirmed from ${itemData.item.kitchen_name}`,  
                                experienceId: "@rehan.ali/Admin-module-app-V1",
                            })
                        }).then(()=>{
                            console.log("Notification Sent to Admin")
                        })
                    })
        })
        //     fetch(`http://${IP.ip}:3000/notifications/order/${itemData.item.order_id}`)
        //     .then((response)=>response.json())
        //    // .then((response)=>setNotificationData(response))
        //    // .then(()=>console.log(notificationData))
            
        //     .then((response)=>{
        //     console.log(response);
        //     setCustomerToken(response[0].sender);
        //     console.log(customerToken);
        //     console.log("%%%%%%%%%%%%%%%%%%");
        //     })
        //     .then(()=>{
        //         console.log("Fetching.........");
        //         fetch('https://exp.host/--/api/v2/push/send',{
        //             method:'POST',
        //             headers:{
        //                 'Accept':'application/json',
        //                 'Accept-Encoding':'gzip,deflate',
        //                 'Content-Type':'application/json'
        //             },
        //             body: JSON.stringify({
        //                 to:customerToken,
        //                 data:{
        //                     sender:'ExponentPushToken[-4WJz5C4pXrrGDKP9hB1hW]',
        //                     reciever:customerToken,
        //                     orderId:itemData.item.order_id,
        //                     status:false
        //                 },
        //                 title:'Chef Confirm Your Order',
        //                 body:"Kindly wait till delivery",  
        //                 //experienceId: "@rehan.ali/customer-module-V1",
        //             })
        //         }).then(()=>console.log("Confirmation notification sent to Customer"))
        //         .then(()=>{
        //                 //send notification to Admin
        //         fetch('https://exp.host/--/api/v2/push/send',{
        //             method:'POST',
        //             headers:{
        //                 'Accept':'application/json',
        //                 'Accept-Encoding':'gzip,deflate',
        //                 'Content-Type':'application/json'
        //             },
        //             body: JSON.stringify({
        //                 to:'ExponentPushToken[jXY39COY1qo-vtkAP4_dnh]',
        //                 data:{
        //                     orderId:itemData.item.order_id,
        //                     sender:'ExponentPushToken[-4WJz5C4pXrrGDKP9hB1hW]',
        //                     reciever:customerToken,
        //                     orderStatus:'confirmed'
        //                 },
        //                 title:`New Order Confirmed`,
        //                 body:`New Order Confirmed Order Id: #${itemData.item.order_id}`,  
        //                 experienceId: "@rehan.ali/Admin-module-app-V1",
        //             })
        //         }).then(()=>{
        //             console.log("Notification Sent to Admin")
        //         })
        //         })
        //     })
        //     .then(()=>{console.log("Clicked Working")})
        //     .catch((error)=>console.error(error));  
        //    }
          }}



           onCancel={()=>{
            updateOrderAsCancelled(itemData.item.plan_id)
            .then(()=>{
                let phoneNumber=itemData.item.customer_id.substring(1);
                let numForQuery='92'+phoneNumber;
                let url=`http://${IP.ip}:3000/sendMessage`;
                let data={
                phone:numForQuery,
                message:`Your subscription has been reviewed\n We are realy sorry that we can't serve you at this time due to some unfortunate reason. Stay with us for the next time.\n  \n\n Thanks\nBest Wishes From Team Ta'am Khana`
            }
            fetch(url,{
                method:'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(data)
            }).then((response)=>response.json())
            .then(()=>ToastAndroid.show("Message Sent To Customer", ToastAndroid.SHORT))
            .then(()=>{
                //send notification to Admin
              fetch('https://exp.host/--/api/v2/push/send',{
                  method:'POST',
                  headers:{
                      'Accept':'application/json',
                      'Accept-Encoding':'gzip,deflate',
                      'Content-Type':'application/json'
                  },
                  body: JSON.stringify({
                      to:'ExponentPushToken[jXY39COY1qo-vtkAP4_dnh]',
                      data:{
                         
                      },
                      title:`New Weekly Plan Cancelled`,
                      body:`New Plan has been cancelled from ${itemData.item.kitchen_name}`,  
                      experienceId: "@rehan.ali/Admin-module-app-V1",
                  })
              }).then(()=>{
                  console.log("Notification Sent to Admin")
              })
          })
        })
        //     fetch(`http://${IP.ip}:3000/notifications/order/${itemData.item.order_id}`)
        //     .then((response)=>response.json())
        //    // .then((response)=>setNotificationData(response))
        //    // .then(()=>console.log(notificationData)) 
        //     .then((response)=>{
        //     console.log(response);
        //     setCustomerToken(response[0].sender);
        //     console.log(customerToken);
        //     console.log("%%%%%%%%%%%%%%%%%%");
        //     })
        //     .then(()=>{
        //         console.log("Fetching.........");
        //         fetch('https://exp.host/--/api/v2/push/send',{
        //             method:'POST',
        //             headers:{
        //                 'Accept':'application/json',
        //                 'Accept-Encoding':'gzip,deflate',
        //                 'Content-Type':'application/json'
        //             },
        //             body: JSON.stringify({
        //                 to:customerToken,
        //                 data:{
        //                     sender:'ExponentPushToken[-4WJz5C4pXrrGDKP9hB1hW]',
        //                     reciever:customerToken,
        //                     orderId:itemData.item.order_id,
        //                     status:false
        //                 },
        //                 title:"Sorry, We Cant't Serve You at this moment",
        //                 body:"Chef Cancelled Your Order",  
        //                 //experienceId: "@rehan.ali/customer-module-V1",
        //             })
        //         }).then(()=>console.log("Confirmation notification sent to Customer"))
        //         .then(()=>{
        //                 //send notification to Admin
        //         fetch('https://exp.host/--/api/v2/push/send',{
        //             method:'POST',
        //             headers:{
        //                 'Accept':'application/json',
        //                 'Accept-Encoding':'gzip,deflate',
        //                 'Content-Type':'application/json'
        //             },
        //             body: JSON.stringify({
        //                 to:'ExponentPushToken[jXY39COY1qo-vtkAP4_dnh]',
        //                 data:{
        //                     orderId:itemData.item.order_id,
        //                     sender:'ExponentPushToken[-4WJz5C4pXrrGDKP9hB1hW]',
        //                     reciever:customerToken,
        //                     orderStatus:'cancelled'
        //                 },
        //                 title:`Chef Cancelled The Order`,
        //                 body:`Order Cancelled Order Id: #${itemData.item.order_id}`,  
        //                 experienceId: "@rehan.ali/Admin-module-app-V1",
        //             })
        //         }).then(()=>{
        //             console.log("Notification Sent to Admin")
        //         })
        //         })
        //     })
        //     .then(()=>{console.log("Clicked Working")})
        //     .catch((error)=>console.error(error));  
           }}
           />
           )
       }

    
        return(
            <View style={styles.container}>
            <View style={styles.kitchenContainer}>
            <FlatList data={plansData} renderItem={renderNotificationCard} keyExtractor={(item)=>item.plan_id}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>{setRefreshing(true)}}/>}

            showsVerticalScrollIndicator={false}/>
            </View>
        </View>
        )
    };


const styles=StyleSheet.create(
    {
        container:{
            flex:1,
            flexDirection:'column',
            height:'100%'
          
        },
        kitchenContainer:{
           width:'100%',
          
        }
       
    }
)

export default Notification2Screen;
