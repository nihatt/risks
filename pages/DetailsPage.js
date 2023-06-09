
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
import { addDoc, collection, getDocs ,deleteDoc} from 'firebase/firestore/lite';
import { doc, setDoc } from "firebase/firestore/lite";
import Lottie from 'lottie-react-native';
import { Button, ButtonGroup } from '@rneui/base';
export default function DetailsPage({ route, navigation }) {
  const { title, detail, degree, id,action1 } = route.params;

  const [comment, setComment] = useState("")
  const [data,setData]=useState([])
  var uniqueId = uuid.v4();
  const auth = getAuth();
  const user = auth.currentUser;
  const isFocused = useIsFocused();
  const [spinner, setSpinner] = useState(false);
  const username= "emin"
  const getData = async () => {
    console.log("xxxxxx" + id)
    setSpinner(true);
    const records = collection(db, 'comments')
    const workoutSnapshot = await getDocs(records)
    const commentsData = workoutSnapshot.docs.map(doc => doc.data())


    console.log(commentsData[0].problemId)
    let newComments=[] ;
    for(var i =0;i<commentsData.length;i++){
      if(commentsData[i].problemId==id){
        newComments.push(commentsData[i])
      }
    }

    console.log(newComments.length)
    var newArray = [ { comment: action1,username : username},...newComments ];


  
    setData(newArray);
    setSpinner(false);
   
  }
  useEffect(() => {
    getData()
  }, [])

  const handleDelete = async (idToDelete) => {
  
    await deleteDoc(doc(db, "record", idToDelete.toString())).then(() => { navigation.goBack(),Alert.alert("Kayıt Başarıyla Silindi"), getData() })
        .catch(e => Alert.alert("Hata", e))
}

  const addComment = async () => {


    await setDoc(doc(db, "comments",uniqueId), {
      comment: comment,
      id: uniqueId,
      problemId: id,
      userId: user.uid,
      userName: user.email
    }).then(() => {getData(), Alert.alert("Kayıt Başarıyla Eklendi"), setComment("") })
      .catch(e => Alert.alert("Hata",e.message))
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
            keyExtractor={item => item.actionDeatil}
          />}
        </View>
        <Button onPress={()=>handleDelete(id)}  containerStyle={{borderRadius:20,marginTop:20}} >Kaydı Sil</Button>
      </View>



      <View style={{ height: responsiveHeight(5), backgroundColor: 'white' }}>
        <KeyboardAccessory>
          <View style={{ flexDirection: 'row', height: 30 }}>
            <Input
              containerStyle={{ backgroundColor: 'white', width: responsiveWidth(75) }}
              style={{ height: 30, backgroundColor: 'white' }}
              value={comment}
              onChangeText={(comment) => setComment(comment)}
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
