
import { StyleSheet, Text, View, StatusBar, ImageBackground, Alert, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button, ButtonGroup, Input, Icon } from '@rneui/themed';
import { auth } from '../FireBase/firebaseConfig.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { authentication } from '../FireBase/firebaseConfig.js';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";
import Lottie from 'lottie-react-native';
import React from 'react';
export default function LoginPage({navigation}) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("")
    const [isLoading, setIsLoading] = React.useState(false)
    const SignIn = async () => {
        await signInWithEmailAndPassword(auth, email, password)
            .then(re => {

                
                setIsLoading(false)
                navigation.navigate("MainTab")
            })
            .catch(function (error) {

                Alert.alert("Hatalı Bilgi", "Bilgilerinizden birisi veya hepsi hatalı")
                navigation.navigate("MainTab")
                setIsLoading(false)
                return error
            });
    }
    return (
        <View style={styles.container}>
            <ImageBackground blurRadius={3} source={require('../assets/bgc.jpg')} resizeMode="cover" >
                <View style={{ height: responsiveHeight(35) }}>
                    <Lottie source={require('../assets/pcanimation.json')} autoPlay loop />
                </View>
                <View style={{ height: responsiveHeight(23), justifyContent: 'space-evenly' }}>
                    <View style={{ flex: 1, alignContent: 'center', alignItems: 'center', justifyContent: 'center', padding: "auto" }}>
                        <Input

                            containerStyle={{ flexDirection: 'row', display: 'flex', alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}
                            placeholder='E-mail'
                            value={email}
                            onChangeText={text => setEmail(text)}
                            inputContainerStyle={{ display: 'flex', width: responsiveWidth(75), alignSelf: 'center', justifyContent: 'center', backgroundColor: '#ebecee', borderRadius: 20, paddingLeft: 15 }}
                            inputStyle={{ alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}
                            leftIcon={
                                <Icon
                                    name='person'
                                    size={24}
                                    color='green'
                                />
                            }
                        />
                    </View>
                    <View style={{ flex: 1, alignContent: 'flex-start', alignItems: 'flex-end', justifyContent: 'center', padding: "auto" }}>
                        <Input
                            placeholder='Şifre'
                            value={password}
                            onChangeText={text => setPassword(text)}
                            secureTextEntry={true}
                            containerStyle={{ flexDirection: 'row', display: 'flex', alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}
                            inputContainerStyle={{ width: responsiveWidth(75), alignSelf: 'center', borderRadius: 20, paddingLeft: 15, alignSelf: 'center', justifyContent: 'center', backgroundColor: '#ebecee' }}
                            leftIcon={
                                <Icon
                                    name='lock'
                                    size={24}
                                    color='green'
                                />
                            }
                        />
                    </View>

                </View>
                <View style={{ height: responsiveHeight(15)}}>
                    <Button
                        onPress={() => { setIsLoading(true), SignIn() }}
                        title="Giriş Yap"
                        loading={isLoading}
                        titleStyle={{ fontWeight: '700' }}
                        buttonStyle={{
                            backgroundColor: 'rgb(0, 128, 0)',
                            borderColor: 'transparent',
                            paddingVertical: 5,
                            height: responsiveHeight(6),
                            borderRadius: 20
                        }}
                        containerStyle={{
                            width: responsiveWidth(75),

                            alignSelf: 'flex-end',

                            marginHorizontal: 50,
                            marginVertical: 10,
                        }}
                    />
                    <Text style={{ alignSelf: 'flex-start', width: responsiveWidth(85), textAlign: 'right', fontSize: 16, color: 'green' }}>Veya Hemen Kaydol !</Text>
                </View>
                <View style={{height:responsiveHeight(25),alignSelf:'center',justifyContent:'flex-start'}}>
                    <Image style={{width:responsiveWidth(80),height:responsiveHeight(20)}} source={require('../assets/logo.png')} resizeMode='cover'></Image>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: StatusBar.currentHeight,
        height: responsiveHeight(100),
        backgroundColor: '#fff',
    },
});
