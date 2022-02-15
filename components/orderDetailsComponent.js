import React,{useState,useEffect} from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,TouchableOpacity } from "react-native";
import Colors from '../constants/Colors';
import IP from "../constants/IP";

const OrderDetailsComponent=(props)=>{

    const [items,setItems]=useState([]);
    const [orderedItems,setOrderedItems]=useState([]);
    const [refreshing,setRefreshing]=useState(true);
    
    useEffect(()=>{
        const orderId=props.orderID;
        fetch(`http://${IP.ip}:3000/orderDetail/orderedDishes/${orderId}`)
        .then((response)=>response.json())
        .then((response)=>setItems(response))
        .then(()=>console.log(items))
        .then(()=>setRefreshing(false))

        .catch((error)=>console.error(error))
        
        
      },[refreshing]);

      const renderOrderItem=(itemData)=>{
          return(
              <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                <Text>{itemData.item.dish_name}</Text>
                <Text>{itemData.item.quantity}</Text>
                <Text>{itemData.item.total_amount}</Text>
              </View>
          )
      }
    
        return(
            <View style={styles.container}>
            <FlatList 
            data={items} renderItem={renderOrderItem} keyExtractor={(item)=>item.dish_id}
            showsVerticalScrollIndicator={false}
            />
          </View>
        )
    };


const styles=StyleSheet.create(
    {
        container: { flex: 1, backgroundColor: '#fff' },
        head: { height: 35, backgroundColor: 'orange'},
        wrapper: { flexDirection: 'row' },
        row: { height: 26 },
        text: { textAlign: 'center' },
       
    }
)

export default OrderDetailsComponent;
