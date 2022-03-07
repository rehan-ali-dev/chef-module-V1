import React, { useState,Component,useCallback } from "react"
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
  ToastAndroid
} from "react-native"
import { DatePickerModal } from "react-native-paper-dates";
import { TimePickerModal } from "react-native-paper-dates";
import { Button,TouchableRipple } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import SelectBox from "react-native-multi-selectbox";
import { xorBy } from 'lodash';
import Colors from "../constants/Colors";
import IP from "../constants/IP";
import 'intl';
import 'intl/locale-data/jsonp/en';

const CUISINES =[{item:'Pakistani',id:'PAK'},{item:'Indian',id:'IND'},{item:'Hyderabadi',id:'HYD'},
{item:'Turkish',id:'TURK'},{item:'Chinese',id:'CH'},{item:'Afghani',id:'AFG'}]

const DISHES=[{item:'Biryani',id:'BIR'},{item:'Karahi',id:'KAR'},{item:'Dessert',id:'DES'},
{item:'Pulao',id:'PUL'},{item:'Beef',id:'BE'},{item:'Kbabs',id:'KB'}]

const KitchenInfoScreen = (props) => {
  
    //states

    const [selectedDishes,setSelectedDishes]=useState([]);
    const [selectedCuisines,setSelectedCuisines]=useState([]);
    const [visible,setVisible]=useState(false);
    const [startTimeVisible,setStartTimeVisible]=useState(false);
    const [endTimeVisible,setEndTimeVisible]=useState(false);
    const [startTimeS,setStartTimeS]=useState("");
    const [endTimeS,setEndTimeS]=useState("");
    let startTime;
    let endTime;
    let stringStartTime;
    let stringEndTime;

    

    const chefData=props.navigation.getParam('chefDetail');
    let chefCounts;
    let authData;
    const date = new Date()

    
    function onMultiChangeCuisines() {
        return (item) => setSelectedCuisines(xorBy(selectedCuisines, [item], 'id'))
      }
  /************************************** */
  function onMultiChangeDishes() {
    return (item) => setSelectedDishes(xorBy(selectedDishes, [item], 'id'))
  }
  /********************************* */
  // Date Model Handling
  // const onDismiss = useCallback(() => {
  //   setVisible(false)
  // }, [setVisible])

  // const onChange = useCallback(({ date }) => {
  //   setVisible(false)
  //   console.log({ date })
  // }, [])

  /************************************* */

  /// Time Picker Handlering
  const onDismissStartTime = useCallback(() => {
    setStartTimeVisible(false)
  }, [setStartTimeVisible])

  const onConfirmStartTime = useCallback(
    ({ hours, minutes }) => {
      setStartTimeVisible(false);
      const time={hours,minutes};
    
      startTime=time
      stringStartTime=time.hours+":"+time.minutes;
      setStartTimeS(stringStartTime)
      console.log(stringStartTime)
      console.log("START TIME");
      console.log(startTime);
      
    },
    [setStartTimeVisible]
  );

  /************************************* */

  /// Time Picker Handlering
  const onDismissEndTime = useCallback(() => {
    setEndTimeVisible(false)
  }, [setEndTimeVisible])


  const onConfirmEndTime = useCallback(
    ({ hours, minutes }) => {
      setEndTimeVisible(false);
      //console.log({ hours, minutes });
      console.log("END TIME");
      const time={hours,minutes};
      endTime=time;
      stringEndTime=time.hours+":"+time.minutes;
      setEndTimeS(stringEndTime)
      //setEndTime({hours,minutes});
      console.log(endTime);
      
    },
    [setEndTimeVisible]
  );
  /************************************* */

  const showAlert=()=>{
    Alert.alert("Your request has been submitted","We will inform you later for further process\n\nStay Tuned :)",[{
        text:'Okey!',
        style:'cancel'
    }]);
}

  /************************************888 */

  const submitBtnHandler = () => {
    showAlert();
     console.log(selectedCuisines);
     const cuisinesArray= selectedCuisines.map(element => element.item);
      let cuisinesString = cuisinesArray.toString();
      console.log(cuisinesString);

      const dishesArray= selectedDishes.map(element => element.item);
      let dishesString = dishesArray.toString();
      console.log(dishesString);

    // console.log(selectedDishes);
     console.log(chefData);
     let reqData=chefData;
     reqData['cuisines']=cuisinesString;
     reqData['dishes']=dishesString;
     reqData['start_time']=startTimeS;
     reqData['end_time']=endTimeS;
     reqData['status']='pending';
     reqData['push_token']='ExponentPushToken[-4WJz5C4pXrrGDKP9hB1hW]';
    
    
        let url=`http://${IP.ip}:3000/chef/chefRequest`;
        let data={
            requestData:reqData,
        }
        fetch(url,{
            method:'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(data)
        }).then((response)=>response.json())
        .then(()=>ToastAndroid.show(`Request Sent`, ToastAndroid.SHORT))
        .then(()=>props.navigation.navigate('Login'))
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
                    title:`New Kitchen Request Recieved`,
                    body:`New request has been recieved from ${reqData.firstname} ${reqData.lastname}`,  
                    experienceId: "@rehan.ali/Admin-module-app-V1",
                })
            }).then(()=>{
                console.log("Notification Sent to Admin")
            })
            })
        showAlert();
    

    
  }
  return (
    <View style={styles.screencontainer}>

      <View style={{width:'100%',alignItems:'center'}}><Text style={{color:Colors.primaryColor,fontSize:18,fontWeight:'bold'}}>Menu Information</Text></View>
        
        
      <Text style={{ fontSize: 20, paddingBottom: 10 }}>Cuisines</Text>
      <Text style={{ fontSize: 16, paddingBottom: 10 }}>Select cuisines that you can prepare</Text>
      <SelectBox
        label="Select multiple"
        options={CUISINES}
        selectedValues={selectedCuisines}
        toggleIconColor={Colors.lightBlack}
        arrowIconColor={Colors.primaryColor}
        optionsLabelStyle={{color:Colors.lightBlack}}
        multiOptionContainerStyle={{backgroundColor:Colors.primaryColor}}
        onMultiSelect={onMultiChangeCuisines()}
        onTapClose={onMultiChangeCuisines()}
        isMulti
      />


    <Text style={{ fontSize: 20, paddingVertical: 10 }}>Specialities</Text>
      <Text style={{ fontSize: 16, paddingBottom: 10 }}>Select dishes which you can prepare very well</Text>
      <SelectBox
        label="Select multiple"
        options={DISHES}
        selectedValues={selectedDishes}
        toggleIconColor={Colors.lightBlack}
        arrowIconColor={Colors.primaryColor}
        optionsLabelStyle={{color:Colors.lightBlack}}
        multiOptionContainerStyle={{backgroundColor:Colors.primaryColor}}
        onMultiSelect={onMultiChangeDishes()}
        onTapClose={onMultiChangeDishes()}
        isMulti
      />

        {/* <DatePickerModal
                mode="single"
                visible={visible}
                onDismiss={onDismiss}
                date={date}
                onConfirm={onChange}
                saveLabel="Save" // optional
                label="Select date" // optional
                animationType="slide" // optional, default is 'slide' on ios/android and 'none' on web
               // locale={'en'} // optional, default is automically detected by your system
            />
            <Button onPress={()=> setVisible(true)}>
                Pick date
            </Button> */}

            <Text style={{ fontSize: 20, paddingVertical: 10 }}>Kitchen Hours</Text>
            <TimePickerModal
                visible={startTimeVisible}
                onDismiss={onDismissStartTime}
                onConfirm={onConfirmStartTime}
                hours={12} // default: current hours
                minutes={14} // default: current minutes
                label="Select time" // optional, default 'Select time'
                cancelLabel="Cancel" // optional, default: 'Cancel'
                confirmLabel="Ok" // optional, default: 'Ok'
                animationType="fade" // optional, default is 'none'
                locale={'en'} // optional, default is automically detected by your system
            />
            <View style={styles.timeContainer}>
            <TouchableRipple onPress={()=> setStartTimeVisible(true)} style={styles.btnTime}>
                <Text style={{color:Colors.primaryColor,fontSize:18}}>Start Time</Text>
            </TouchableRipple>
            <Text style={{color:Colors.lightBlack,fontSize:18}}>{startTimeS}</Text>
            </View>

            <TimePickerModal
                visible={endTimeVisible}
                onDismiss={onDismissEndTime}
                onConfirm={onConfirmEndTime}
                hours={12} // default: current hours
                minutes={14} // default: current minutes
                label="Select time" // optional, default 'Select time'
                cancelLabel="Cancel" // optional, default: 'Cancel'
                confirmLabel="Ok" // optional, default: 'Ok'
                animationType="fade" // optional, default is 'none'
                locale={'en'} // optional, default is automically detected by your system
            />
             <View style={styles.timeContainer}>
            <TouchableRipple onPress={()=> setEndTimeVisible(true)} style={styles.btnTime}>
                <Text style={{color:Colors.primaryColor,fontSize:18}}>End Time</Text>
            </TouchableRipple>
            <Text style={{color:Colors.lightBlack,fontSize:18}}>{endTimeS}</Text>
            </View>

            <View
              style={{
                borderBottomColor: "#ccc",
                borderBottomWidth: 1,
                marginVertical:5
              }}
            />
            <View style={{borderWidth:1,borderColor:Colors.primaryColor,padding:5,borderRadius:10}}>
            <Text style={{color:Colors.primaryColor,fontSize:16,textAlign:'justify'}}>Kindly review entered information. Once you submit your request it can't be changed leter.</Text>
            </View>
        <View style={styles.btnview}>
          <TouchableOpacity
            style={styles.buttons}
            // onPress={() => console.log("Kitchen Hours")}
            onPress={submitBtnHandler}>
            <View>
              <Text style={styles.btntext}>SUBMIT</Text>
            </View>
          </TouchableOpacity>
        </View>
     
    </View>
  )
}


KitchenInfoScreen.navigationOptions=()=>{
    return{
        headerShown:false
    }
}

const styles = StyleSheet.create({
  screencontainer: {
    paddingHorizontal:25,
    paddingVertical:10,
    paddingTop:100,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    padding: 20,
  },
  
  fieldsname: {
    fontSize: 15,
    color: "black",
    marginLeft: 20,
    fontWeight: "bold",
    justifyContent: "flex-start",
    marginTop: 10,
  },
  
  
  picker: {
    
    width: "95%",
    justifyContent: "space-between",
  },

  timeContainer:{

    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
    paddingVertical:5,

  },

  btnTime:{

    width:130,
    alignItems:'center',
    borderWidth:1,
    borderColor:Colors.primaryColor,
    borderRadius:5,
  },

  container: {
            
    alignItems:'center',
    justifyContent:'center',
    //borderWidth:0.5,
    height:35,
    backgroundColor: '#F5FCFF',
    borderWidth:0.3,
    marginLeft:13,
    marginTop:5,
    borderColor:Colors.lightBlack,
    paddingHorizontal:10,
    borderRadius:5
  },

  btnview: {
    paddingVertical:20,
    flex: 1,
    alignItems: "center",
  },
  buttons: {
    backgroundColor: "#ff620a",
    width: "50%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,

    // elevation: 30,
  },
  btntext: {
    color: "white",
    fontSize: 16,
  },
})
export default KitchenInfoScreen