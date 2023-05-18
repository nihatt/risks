
import { StyleSheet, Text, View, StatusBar, ImageBackground, ScrollView, KeyboardAvoidingView, TouchableOpacity, Alert, FlatList } from 'react-native';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import {

  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import uuid from 'react-native-uuid';
import KeyboardAccessory from 'react-native-sticky-keyboard-accessory';
import { Input } from '@rneui/themed';
import CommentCard from '../components/commentCard';
import { useEffect, useState } from 'react';
import InputComp from '../components/input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from '../FireBase/firebaseConfig.js';
import { addDoc, collection, getDocs } from 'firebase/firestore/lite';
import { doc, setDoc } from "firebase/firestore/lite";
import Lottie from 'lottie-react-native';
export default function DetailsPage({ route, navigation }) {
  const { title, detail, degree, id,action1 } = route.params;

  const [comment, setComment] = useState("")
  const [data,setData]=useState([])
  var uniqueId = uuid.v4();
  const auth = getAuth();
  const user = auth.currentUser;
  const isFocused = useIsFocused();
  const [spinner, setSpinner] = useState(false);
  let username= "nihat"
  const getData = async () => {
    setSpinner(true);
    const records = collection(db, 'comments')
    const workoutSnapshot = await getDocs(records)
    const commentsData = workoutSnapshot.docs.map(doc => doc.data())


    console.log(commentsData)
    let newComments = commentsData.filter(e=>{e.problemId==id})
    var newArray = [ { comment: action1,username : username},...newComments ];

  
    setData(newArray);
    setSpinner(false);
    console.log(data)
  }
  useEffect(() => {
    getData()
  }, [])

  const addComment = async () => {


    await setDoc(doc(db, "comments",uniqueId), {
      comment: comment,
      id: uniqueId,
      problemId: id,
      userId: user.uid,
      userName: user.email
    }).then(() => { setModalVisible3(false), Alert.alert("Kayıt Başarıyla Eklendi"), getData(),setComment("") })
      .catch(e => Alert.alert("Hata", e))
  }


  return (

    <View style={{ height: responsiveHeight(100), paddingTop: StatusBar.currentHeight,backgroundColor:'white' }} >

      <ImageBackground blurRadius={0} source={require('../assets/bgg.jpg')} resizeMode="cover" >
        <View style={{ height: responsiveHeight(35) }}>
          <View style={{ width: responsiveWidth(80), height: responsiveHeight(15), justifyContent: 'space-around', alignSelf: 'center', marginTop: 40 }}>
            <Text style={{ fontFamily: 'Inter-Bold', fontSize: 18 }}>SORUN :  {title}</Text>
            <Text numberOfLines={3} style={{ fontFamily: 'Roboto-Medium' }}>Detay : {detail}</Text>
          </View>
        </View>
      </ImageBackground>


      <View style={{ paddingHorizontal: responsiveWidth(10), paddingVertical: responsiveWidth(10), height: responsiveHeight(65), borderTopLeftRadius: 40, borderTopRightRadius: 40, marginTop: -responsiveHeight(10), backgroundColor: 'white' }}>
        <View style={{ height: responsiveHeight(50) }}>
        {spinner ? <Lottie source={require('../assets/loading.json')} autoPlay loop /> : <FlatList
            data={data}
            renderItem={({ item }) => <CommentCard comment={item.comment} username={item.userName}></CommentCard>}
            keyExtractor={item => item.id}
          />}
        </View>
      </View>



      <View style={{ height: responsiveHeight(5), backgroundColor: 'white' }}>
        <KeyboardAccessory>
          <View style={{ flexDirection: 'row', height: 30 }}>
            <Input
              containerStyle={{ backgroundColor: 'white', width: responsiveWidth(75) }}
              style={{ height: 30, backgroundColor: 'white' }}
              value={comment}
              onChangeText={(value) => setComment(value)}
              placeholder='Yorum Öner' />
              <TouchableOpacity onPress={()=>addComment()}>
            <View style={{ height: 50, backgroundColor: 'white', width: responsiveWidth(25), alignSelf: 'center', justifyContent: 'center' }}>
              <Text style={{ alignSelf: 'center',color:'red',fontFamily:'Roboto-Medium' }}>
                GÖNDER
              </Text>
            </View>
            </TouchableOpacity>
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
