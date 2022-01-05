import React from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,TouchableOpacity } from "react-native";
import Colors from '../constants/Colors';
import { useEffect, useState } from "react";
import { Ionicons } from '@expo/vector-icons';


const DishesScreen=(props)=>{
    
        return(
          <View style={styles.screen}>
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
