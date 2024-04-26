import React, { useEffect, useState } from 'react';
import { getFoodItem } from '../API/Request';
import { FoodResponse, Img } from '../API/Config';
import { AlertIcon,AlertText, InfoIcon, Box, Image, VStack, Text, Button, Alert, ButtonText } from '@gluestack-ui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage'//async
import axios from 'axios';
import { ApiUrl } from '../API/Config';


const DetailScreen = ({ route }) => {
    const [userData, setUserData] = useState({});
    const [alertMessage, setAlertMessage] = useState('');

    let tokenString;
    let token;

    const { Id } = route.params;
    const [FoodItem, SetFoodItem] = useState<FoodResponse[]>([]);

    const food = async () => {
        const data = await getFoodItem(Id);
        if (data != null) {
            SetFoodItem(data);
        }
    }

    useEffect(() => {
        food();
    }, []);

    useEffect(() => {
        if (FoodItem !== undefined) {
            console.log("que tiene FOOD Item:", FoodItem);
        }
    }, [FoodItem]);
    const addBag = async (idUser: String, id: String) => {
        console.log("id", idUser, "y", id);

        try {
            const response = await axios.post(`${ApiUrl}storecar`, {
                IdUserFK: idUser,
                IdFoodFK: id
            });
            console.log("do", response);


            <Alert mx='$2.5' action="info" variant="solid" >
                <AlertIcon as={InfoIcon} mr="$3" />
                <AlertText>
                   added to cart

                </AlertText>
            </Alert>
            console.log("al");


        } catch (error) {
            console.error("Error al agregar a favoritos:", error);
        }
    }
    useEffect(() => {
        const fetchUserData = async () => {
            tokenString = await AsyncStorage.getItem('token');
            token = JSON.parse(tokenString);
            let idUser;




            if (token) {

                try {
                    const response = await axios.get(`${ApiUrl}Userauth`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    setUserData(response.data);
                    idUser = response.data.id;
                    //console.log("inf", response.data);


                } catch (error) {
                    console.log(" we cannot get the information ", error);
                }
            }


        };

        fetchUserData();


    }, []);

    return (
        <Box mt={"$5"} padding={"$5"} height={"$full"}>
            <Image
                size="md"
                width={"$full"}
                height={"$1/2"}
                alt="login_image"
                source={{ uri: `${Img + FoodItem.Image}` }}
                resizeMode="cover" style={{
                    alignSelf: "center"
                }} />
            <VStack>
                <Text size="lg" fontWeight="bold">{FoodItem.Name}</Text>
                <Text size="sm">{FoodItem.Description}</Text>
                <Text size="sm" fontWeight="$extrabold">Precio: {FoodItem.Price}</Text>
            </VStack>
            <Button action='primary' onPress={() => addBag(userData.id, FoodItem.id)}>
                <ButtonText>
                    Add Bag
                </ButtonText>

            </Button>
        </Box>
    );
};

export default DetailScreen;