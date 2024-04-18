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
        <Tab.Screen name="Search" component={SearchView} options={{
            headerShown: true, header: () => {
                return (



                    <Box>

                        <Button alignContent='center' onPress={() => setShowModal(true)} ref={ref} backgroundColor='#FFA600' margin={"$3px"} height={"$50px"} width={"$50px"} borderRadius={"$50%"} size="xs" variant="solid" action="primary" isDisabled={false} isFocusVisible={false} >
                            <ButtonText fontFamily='Arial' fontSize={"$15px"}>{namedosData} </ButtonText>
                            
                        </Button>

                    
                        <Modal
                            isOpen={showModal}
                            onClose={() => {
                                setShowModal(false)
                            }}
                            finalFocusRef={ref}
                        >
                            <ModalBackdrop />
                            <ModalContent>
                                <ModalHeader>
                                    <Heading size="lg">{userData.Name}</Heading>
                                    <ModalCloseButton>
                                        <Icon as={CloseIcon} />
                                    </ModalCloseButton>
                                </ModalHeader>
                                <ModalBody>
                                    <Text>
                                        
                                    </Text>
                                </ModalBody>
                                <ModalFooter>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        action="secondary"
                                        mr="$3"
                                        onPress={() => {
                                            setShowModal(false)
                                        }}
                                    >
                                        <ButtonText>Cancel</ButtonText>
                                    </Button>
                                    <Button
                                        size="sm"
                                        action="positive"
                                        borderWidth="$0"
                                        onPress={logOut}
                                    >
                                        <ButtonText>LogOut</ButtonText>
                                    </Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </Box>

                );
            }
        }} />
        <Tab.Screen name="Bag shop" component={Bagview} options={{ headerShown: false }} />
        <Tab.Screen name="Favorites" component={FavoritesView} options={{
            headerShown: true, header: () => {
                return (



                    <Box>

                        <Button alignContent='center' onPress={() => setShowModal(true)} ref={ref} backgroundColor='#FFA600' margin={"$3px"} height={"$50px"} width={"$50px"} borderRadius={"$50%"} size="xs" variant="solid" action="primary" isDisabled={false} isFocusVisible={false} >
                            <ButtonText fontFamily='Arial' fontSize={"$15px"}>{namedosData} </ButtonText>
                            
                        </Button>

                    
                        <Modal
                            isOpen={showModal}
                            onClose={() => {
                                setShowModal(false)
                            }}
                            finalFocusRef={ref}
                        >
                            <ModalBackdrop />
                            <ModalContent>
                                <ModalHeader>
                                    <Heading size="lg">{userData.Name}</Heading>
                                    <ModalCloseButton>
                                        <Icon as={CloseIcon} />
                                    </ModalCloseButton>
                                </ModalHeader>
                                <ModalBody>
                                    <Text>
                                        
                                    </Text>
                                </ModalBody>
                                <ModalFooter>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        action="secondary"
                                        mr="$3"
                                        onPress={() => {
                                            setShowModal(false)
                                        }}
                                    >
                                        <ButtonText>Cancel</ButtonText>
                                    </Button>
                                    <Button
                                        size="sm"
                                        action="positive"
                                        borderWidth="$0"
                                        onPress={logOut}
                                    >
                                        <ButtonText>LogOut</ButtonText>
                                    </Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </Box>

                );
            }
        }} />
    </Tab.Navigator>
    );
};
export default HomeView;