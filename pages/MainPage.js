import { StyleSheet, Text, View, StatusBar, KeyboardAvoidingView, Alert, FlatList, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import { Input, Icon } from '@rneui/themed';
import Modal from "react-native-modal";
import { FloatingAction } from "react-native-floating-action";
import { FAB, Button } from '@rneui/themed';
import { Slider } from '@rneui/themed';
import { useEffect, useState } from 'react';
import { db } from '../FireBase/firebaseConfig.js';
import { addDoc, collection, getDocs } from 'firebase/firestore/lite';
import { doc, setDoc } from "firebase/firestore/lite";
import uuid from 'react-native-uuid';
import Card from '../components/card.js';
import Lottie from 'lottie-react-native';
import { useIsFocused } from '@react-navigation/native';
export default function MainPage() {
  const isFocused = useIsFocused();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);
  const [isModalVisible3, setModalVisible3] = useState(false);
  const [problemTitle, setProblemTitle] = useState("");
  const [problemDetail, setProblemDetail] = useState("");
  const [value, setValue] = useState(0);
  const [value1, setValue1] = useState(0);
  const [actionTitle, setActionTitle] = useState("")
  const [actionDetail, setActionDetail] = useState("")
  const [data, setData] = useState([])
  const [spinner, setSpinner] = useState(false);
  var uniqueId = uuid.v4();
  const getData = async () => {
    setSpinner(true);
    const records = collection(db, 'record')
    const workoutSnapshot = await getDocs(records)
    const recordsData = workoutSnapshot.docs.map(doc => doc.data())



    setData(recordsData)
    setSpinner(false);
    console.log(data)
  }
  useEffect(() => {
    getData()
  }, [isFocused])
  const addRecord = async () => {

    await setDoc(doc(db, "record", uniqueId), {
      actionDetail: actionDetail,
      actionTitle: actionTitle,
      problemDetail: problemDetail,
      problemTitle: problemTitle,
      riskDegree: value,
      riskProbability: value1
    }).then(() => { setModalVisible3(false), Alert.alert("Kayıt Başarıyla Eklendi"), getData() })
      .catch(e => Alert.alert("Hata", e))
  }
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },

  ];
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleModal2 = () => {
    setModalVisible2(!isModalVisible2);
  };
  const toggleModal3 = () => {
    setModalVisible3(!isModalVisible3);
  };
  const interpolate = (start, end) => {
    let k = (value - 0) / 10;
    return Math.ceil((1 - k) * start + k * end) % 256;
  };
  const interpolate100 = (start, end) => {
    let k = (value1 - 0) / 100;
    return Math.ceil((1 - k) * start + k * end) % 256;
  };

  const color = () => {
    let r = interpolate(0, 255);
    let g = interpolate(255, 0);
    let b = interpolate(0, 0);
    return `rgb(${r},${g},${b})`;
  };
  const color1 = () => {
    let r = interpolate100(0, 255);
    let g = interpolate100(255, 0);
    let b = interpolate100(0, 0);
    return `rgb(${r},${g},${b})`;
  };
  return (
    <ImageBackground blurRadius={0} source={require('../assets/bgg.jpg')} resizeMode="cover" >
      <View style={{ paddingTop: StatusBar.currentHeight }}>

        <View style={{}}>

          <Modal deviceHeight={1000} statusBarTranslucent={true} avoidKeyboard={false} onBackdropPress={() => setModalVisible(false)} isVisible={isModalVisible} animationIn={"slideInLeft"} animationOut={"slideOutLeft"}>
            <View style={{ minHeight: responsiveHeight(52), height: responsiveHeight(50), justifyContent: 'center', paddingHorizontal: 30, width: responsiveWidth(100), alignSelf: 'center', backgroundColor: 'white', borderRadius: 40 }}>


              <View style={{}}>

                <Text>Problem Başlığı</Text>
                <Input
                  placeholder="Başlık"
                  value={problemTitle}
                  leftIcon={{ type: 'MaterialIcons', name: 'sync-problem' }}
                  onChangeText={value => setProblemTitle(value)}
                />
              </View>
              <View style={{}}>
                <Text>Problem Açıklaması</Text>
                <Input
                  placeholder="Açıklama"
                  value={problemDetail}
                  leftIcon={{ type: 'font-awesome', name: 'comment' }}
                  onChangeText={value => setProblemDetail(value)}
                />
              </View>
              <View style={{ flexDirection: 'row', width: responsiveWidth(80), justifyContent: 'space-evenly' }}>
                <Button buttonStyle={{ width: responsiveWidth(35) }} title="Kapat" onPress={() => { toggleModal() }} />
                <Button buttonStyle={{ width: responsiveWidth(35) }} title="İleri" onPress={() => { toggleModal2(), toggleModal() }} />

              </View>


            </View>

          </Modal>

        </View>

        <View style={{ flex: 1 }}>
          <StatusBar hidden />
          <Modal onBackdropPress={() => setModalVisible2(false)} isVisible={isModalVisible2} animationIn={"slideInRight"} animationOut={"slideOutLeft"}>
            <View style={{ minHeight: responsiveHeight(52), height: responsiveHeight(50), justifyContent: 'space-evenly', paddingHorizontal: 30, width: responsiveWidth(100), alignSelf: 'center', backgroundColor: 'white', borderRadius: 40, overflow: 'scroll' }}>
              <Text>Risk Derecesi : {value}</Text>
              <Slider
                value={value}
                onValueChange={setValue}
                maximumValue={10}
                minimumValue={0}
                step={1}
                allowTouchTrack
                trackStyle={{ height: 5, backgroundColor: 'transparent' }}
                thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
                thumbProps={{
                  children: (
                    <Icon
                      name="heartbeat"
                      type="font-awesome"
                      size={20}
                      reverse
                      containerStyle={{ bottom: 20, right: 20 }}
                      color={color()}
                    />
                  ),
                }}
              />

              <Text>Risk Olasılığı : % {value1}</Text>
              <Slider
                value={value1}
                onValueChange={setValue1}
                maximumValue={100}
                minimumValue={0}
                step={1}
                allowTouchTrack
                trackStyle={{ height: 5, backgroundColor: 'transparent' }}
                thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
                thumbProps={{
                  children: (
                    <Icon
                      name="heartbeat"
                      type="font-awesome"
                      size={20}
                      reverse
                      containerStyle={{ bottom: 20, right: 20 }}
                      color={color1()}
                    />
                  ),
                }}
              />

              <View style={{ flexDirection: 'row', width: responsiveWidth(80), justifyContent: 'space-evenly' }}>
                <Button buttonStyle={{ width: responsiveWidth(35) }} title="Geri" onPress={() => { toggleModal2(), toggleModal() }} />
                <Button buttonStyle={{ width: responsiveWidth(35) }} title="İleri" onPress={() => { toggleModal2(), toggleModal3() }} />
              </View>
            </View>
          </Modal>
        </View>

        <View style={{}}>

          <Modal deviceHeight={1000} statusBarTranslucent={true} avoidKeyboard={false} onBackdropPress={() => setModalVisible(false)} isVisible={isModalVisible3} animationIn={"slideInRight"} animationOut={"slideOutLeft"}>
            <View style={{ minHeight: responsiveHeight(52), height: responsiveHeight(50), justifyContent: 'center', paddingHorizontal: 30, width: responsiveWidth(100), alignSelf: 'center', backgroundColor: 'white', borderRadius: 40 }}>


              <View style={{}}>

                <Text>Önlem Başlığı</Text>
                <Input
                  placeholder="Başlık"
                  value={actionTitle}
                  leftIcon={{ type: 'MaterialIcons', name: 'sync-problem' }}
                  onChangeText={value => setActionTitle(value)}
                />
              </View>
              <View style={{}}>
                <Text>Önlem Açıklaması</Text>
                <Input
                  placeholder="Açıklama"
                  value={actionDetail}
                  leftIcon={{ type: 'font-awesome', name: 'comment' }}
                  onChangeText={value => setActionDetail(value)}
                />
              </View>
              <View style={{ flexDirection: 'row', width: responsiveWidth(80), justifyContent: 'space-evenly' }}>
                <Button buttonStyle={{ width: responsiveWidth(35) }} title="Geri" onPress={() => { toggleModal2(), toggleModal3() }} />
                <Button buttonStyle={{ width: responsiveWidth(35) }} title="Kaydet" onPress={() => { addRecord() }} />

              </View>


            </View>

          </Modal>

        </View>


        <View style={{ height: responsiveHeight(20) }}>

          <Lottie source={require('../assets/main.json')} autoPlay loop />

        </View>

        <View style={{ height: responsiveHeight(80), borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
          {spinner ? <Lottie source={require('../assets/loading.json')} autoPlay loop /> : <FlatList
            data={data}
            renderItem={({ item }) => <Card probability={item.riskProbability} riskDegree={item.riskDegree} title={item.problemTitle} description={item.problemDetail}></Card>}
            keyExtractor={item => item.id}
          />}
        </View>
        <FAB
          visible={true}
          onPress={() => setModalVisible(!isModalVisible)}
          placement="right"

          icon={{ name: 'add', color: 'white' }}
          color="red"
        />

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
