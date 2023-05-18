import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Lottie from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
export default function Card(props) {
  console.log(props.id +"deneme")
  const navigation = useNavigation();
    const toggleAnimation=(degree)=>{
        if(degree<=3 ){
            return require('../assets/okey.json')
        }
        else if(3<degree && degree<6){
            return require('../assets/alert.json')
        }else{
            console.log("girenzi")
            return require('../assets/error3.json')
        }
    }
    const toggleColor = (probability) => {
        console.log(probability)
        if (probability > 40 && probability < 60) {
            return 'rgba(226, 236, 14, 0.46)';
        } else if (probability <= 40) {
            return 'rgba(221, 255, 0, 0.78)';
        } else if (probability >= 70) {
            return 'rgba(255, 27, 52, 0.59)';
        }
    }
  return (
    <TouchableOpacity onPress={()=>navigation.navigate("Details",{title:props.title,detail:props.description,degree:props.riskDegree,id:props.id,action1:props.action1})}>
    <View style={{height:responsiveHeight(10),flexDirection:'row',justifyContent:'space-between',borderRadius:20,overflow:'hidden',marginHorizontal:10,marginTop:20,borderWidth:1,backgroundColor:toggleColor(props.probability)}}>
      <View style={{width:responsiveWidth(20)}}>
      <Lottie source={toggleAnimation(props.riskDegree)} autoPlay  />
      </View>
      <View style={{justifyContent:'center',paddingHorizontal:responsiveWidth(5),width:responsiveWidth(55)}}>
        <Text style={{fontSize:16}}>{props.title}</Text>
        <Text >{props.description}</Text>
      </View>
      <View style={{justifyContent:'center',paddingHorizontal:responsiveWidth(5),width:responsiveWidth(55)}}>
        <Text style={{fontSize:16}}>%{props.probability}</Text>

      </View>
    </View>
    </TouchableOpacity>
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
