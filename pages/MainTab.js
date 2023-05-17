import * as React from 'react';
import { KeyboardAvoidingView, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainPage from './MainPage';
import DetailsPage from './DetailsPage';
import { Button, ButtonGroup, Input, Icon } from '@rneui/themed';
const Tab = createBottomTabNavigator();

export default function MainTab() {
    return (
       
        <Tab.Navigator screenOptions={{tabBarHideOnKeyboard:true}}>
           
            <Tab.Screen name="MainPage" options={{tabBarLabel:'Ana Sayfa',
                headerShown: false, tabBarIcon: ({ focused }) => {
                    return (
                        <View>
                                <Icon
                                    name='home'
                                    size={36}
                                    color='green'
                                />
                        </View>
                    );
                },
            }} component={MainPage} />
            <Tab.Screen name="DetailsPage" options={{tabBarLabel:'Detay Sayfası',
                headerShown: false, tabBarIcon: ({ focused }) => {
                    return (
                        <View>
                                <Icon
                                    name='person'
                                    size={36}
                                    color='green'
                                />
                        </View>
                    );
                },
            }}component={DetailsPage} />
       
        </Tab.Navigator>
       
    );
}