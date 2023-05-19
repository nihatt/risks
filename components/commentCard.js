import { StyleSheet, Text, View, StatusBar, ImageBackground, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import {
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";
export default function CommentCard(props) {

    return (
        <View style={{ overflow: 'hidden', borderWidth: 1, height: responsiveHeight(10), borderRadius: 30, flexDirection: 'row', width: responsiveWidth(80),marginBottom:15 }}>
            <View style={{ borderWidth: 1, width: responsiveWidth(15), height: responsiveHeight(10), alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 30, fontFamily: 'Roboto-BoldItalic' }}>{props.username? props.username?.toUpperCase()[0] : 0}</Text>
            </View>
            <ScrollView style={{ width: responsiveWidth(60), height: responsiveHeight(10) }}>
                <Text style={{ textAlign: 'left', margin: 5 }}>{props.comment}</Text>
            </ScrollView>

        </View>


    );
}


