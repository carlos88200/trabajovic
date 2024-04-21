import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import axios from 'axios';
import { Box, Avatar, AvatarBadge, AvatarFallbackText, ButtonText, AvatarImage, Modal, ModalBackdrop, ModalContent, ModalHeader, Heading, ModalCloseButton, Icon, CloseIcon, ModalBody, Text, ModalFooter, Button } from '@gluestack-ui/themed';
//<--- views---> //
import FavoritesView from './FavoritesView';
import Bagview from './BagView';
import MyStack from './Components/Stack';
import SearchView from './SearchView';
import Account from './account';
import React, { useState, useEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'//async





const HomeView = () => {
    const navigation = useNavigation();


    const [showModal, setShowModal] = useState(false)
    const ref = React.useRef(null)
    const [userData, setUserData] = useState({});
    const [namedosData, setNamedosData] = useState({});


    let tokenString;
    let token;
    const logOut =async()=>{
        
        try {
            await AsyncStorage.removeItem('token');
            console.log('Data removed')
            setShowModal(false);
            navigation.navigate('Principal');
        }
        catch(exception) {
            console.log(exception)
        }



    }
    useEffect(() => {
        const fetchUserData = async () => {
            tokenString = await AsyncStorage.getItem('token');
            token = JSON.parse(tokenString);
            let names = await AsyncStorage.getItem('Name');
            let name=JSON.parse(names);
            let namedos = name.charAt(0);
            let carUser = [];
            let caarEnd = [];
            let total = 0;
            console.log("namedos uuui", namedos);


            if (token) {


                try {


                    const response = await axios.get("http://localhost/1.75/backend/public/api/Userauth", {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                   
                    setUserData(response.data);
                    
                    setNamedosData(namedos);




                } catch (error) {
                    console.log(" we cannot get the information ", error);
                }
            }

        };

        fetchUserData();


    }, []);

    return (<Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'Home') {
                    iconName = focused ? 'home' : 'home-outline';
                } else if (route.name === 'Search') {
                    iconName = focused ? 'search' : 'search-outline';
                } else if (route.name === 'Bag shop') {
                    iconName = focused ? 'bag' : 'bag-outline';
                } else if (route.name === 'Favorites') {
                    iconName = focused ? 'heart' : 'heart-outline';
                }else if (route.name === 'Account') {
                    iconName = focused ? 'ellipsis-horizontal' : 'ellipsis-horizontal-outline';
                }
                return <Ionicons name={iconName} size={size} color={color} />;
            },
        })}
        tabBarOptions={{
            activeTintColor: '#FFA600',
            inactiveTintColor: 'gray',
        }}
    >
        <Tab.Screen name="Home" component={MyStack} options={{ headerShown: false }} />
        <Tab.Screen name="Search" component={SearchView} options={{ headerShown: true, header:()=>{
            return(
                <Box>
                    
                </Box>
            );
        } }} />
        <Tab.Screen name="Bag shop" component={Bagview} options={{ headerShown: false }}/>
        <Tab.Screen name="Favorites" component={FavoritesView} options={{ headerShown: false }} />
        <Tab.Screen name="Account" component={Account} options={{ headerShown: false }} />

    </Tab.Navigator>
    );
};
export default HomeView;