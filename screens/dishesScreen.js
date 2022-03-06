import React from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,TouchableOpacity } from "react-native";
import Colors from '../constants/Colors';
import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { getDishes } from "../store/actions/orderActions";
import { Ionicons } from '@expo/vector-icons';
import DishCard from "../components/dishCard";
import IP from "../constants/IP";


const DishesScreen=(props)=>{

    const [isLoading,setLoading]=useState(true);
    const [dishesData,setDishesData]=useState([]);

    const dispatch=useDispatch();
    const dishesRecord=useSelector(state=>state.order.Dishes);
    const chefDetail=useSelector(state=>state.order.chefDetails);

    useEffect(()=>{

        //const kitchen='Bisma Ka Kitchen';
        const chefId=chefDetail.chef_id;
        fetch(`http://${IP.ip}:3000/dish/chef/${chefId}`)
        .then((response)=>response.json())
        .then((response)=>setDishesData(response))
        .then(()=>dispatch(getDishes(dishesData)))
        .then(()=>console.log(dishesRecord))
        //.then(()=>dispatch(getDishes(mealsData)))
        .catch((error)=>console.error(error))
        .finally(()=>setLoading(false));
      },[isLoading]);



    function showItem(itemData) {
        return (
          <DishCard
            imgurl={`http://${IP.ip}:3000/images/${itemData.item.image}`}
            dishname={itemData.item.dish_name}
            onSelect={()=>{
                console.log(itemData.item.cuisine);
                const availability=itemData.item.status===1?true:false;
                props.navigation.navigate({
                    routeName:'DishDetail',
                    params:{
                        dishId:itemData.item.dish_id,
                        imageUrl:itemData.item.image,
                        dishName:itemData.item.dish_name,
                        kitchenName:itemData.item.kitchen_name,
                        available:itemData.item.status,
                        availabilityStatus: availability,
                        price:itemData.item.price,
                        category:itemData.item.cat_name,
                        cuisine:itemData.item.cuisine,
                        description:itemData.item.description,
                        servingSize:itemData.item.serving_size,
                        pushToken:itemData.item.push_token
                    }
                });
            }}
          />
        )
      }
    
        return(
          <View style={styles.screen}>
              {/*<DishCard dishname="Matar Pulao" imgurl="https://www.vegrecipesofindia.com/wp-content/uploads/2021/01/peas-pulao-recipe-2-500x375.jpg"
              onSelect={()=>{

              }}
            />*/}
              <FlatList
                style={styles.flatlist}
                data={dishesRecord}
                renderItem={showItem}
                keyExtractor={(item) => item.dish_id}
                />
              <View style={styles.btnContainer}>
            <TouchableOpacity onPress={()=>{   
                            props.navigation.navigate({
                                routeName:'AddDish',
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
    };


const styles=StyleSheet.create(
    {
        screen:{
            flex:1,

        },
        flatlist:{
            width:'100%',
        },
        buttonContainer:{
            flexDirection:'row',
            backgroundColor:Colors.primaryColor,
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
       
    }
)

export default DishesScreen;
