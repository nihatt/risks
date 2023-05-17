
import { StyleSheet, Text, View, StatusBar, ImageBackground, ScrollView, KeyboardAvoidingView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import {

  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import KeyboardAccessory from 'react-native-sticky-keyboard-accessory';
import { Input } from '@rneui/themed';
import CommentCard from '../components/commentCard';
import { useState } from 'react';
import InputComp from '../components/input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function DetailsPage({ route, navigation }) {
  const { title, detail, degree } = route.params;
  const [comment, setComment] = useState("")
  return (
  
      <View style={{ height: responsiveHeight(100), paddingTop: StatusBar.currentHeight }} >
       
          <ImageBackground blurRadius={0} source={require('../assets/bgg.jpg')} resizeMode="cover" >
            <View style={{ height: responsiveHeight(35) }}>
              <View style={{ width: responsiveWidth(80), height: responsiveHeight(15), justifyContent: 'space-around', alignSelf: 'center', marginTop: 40 }}>
                <Text style={{ fontFamily: 'Inter-Bold', fontSize: 18 }}>Example</Text>
                <Text numberOfLines={3} style={{ fontFamily: 'Roboto-Medium' }}></Text>
              </View>
            </View>
          </ImageBackground>


          <View style={{ paddingHorizontal: responsiveWidth(10), paddingVertical: responsiveWidth(10), height: responsiveHeight(65),  borderTopLeftRadius: 40, borderTopRightRadius: 40, marginTop: -responsiveHeight(10), backgroundColor: 'white' }}>
            <View style={{ height: responsiveHeight(50)}}>
              <CommentCard></CommentCard>
            </View>
          </View>
     


          <View style={{ height: responsiveHeight(6), backgroundColor: 'white' }}>
          <KeyboardAccessory>
            <View style={{ flexDirection: 'row', height: 40 }}>
              <Input
              containerStyle={{backgroundColor:'white'}}
                style={{ flex: 1, height: 30,backgroundColor:'white' }}
                placeholder='Click me!' />

            </View>
          </KeyboardAccessory>
        </View>

      </View>
 
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
