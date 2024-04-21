import { Box, Text, Button,Avatar,AvatarFallbackText, ButtonText } from "@gluestack-ui/themed";
import { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'//async
import { NavigationContainer, useNavigation } from '@react-navigation/native';





const Account = () => {
    const [userData, setUserData] = useState({});
    let tokenString;
    let token;
    const navigation = useNavigation();


    useEffect(() => {
        const fetchUserData = async () => {
            tokenString = await AsyncStorage.getItem('token');
            token = JSON.parse(tokenString);
            let idUser;
            let carUser = [];
            let caarEnd = [];
            let total = 0;



            if (token) {

                try {
                    const response = await axios.get("http://localhost/1.75/backend/public/api/Userauth", {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    setUserData(response.data);
                    idUser = response.data.id;


                } catch (error) {
                    console.log(" we cannot get the information ", error);
                }
            }


        };

        fetchUserData();
    }, []);
    const onSubmit = async () => {
        await AsyncStorage.removeItem('token');
        navigation.navigate('Principal');

    }

    return (
        <Box backgroundColor='white' alignItems="center" mt={10} display="flex" flexDirection="column" height={"$full"} >

            <Box borderRadius={"10px 10px 0 0"} height={'30%'} width={'100%'} backgroundColor='#FFA600' p={4} display='inline-block'>
                <Avatar bgColor='black' size="xl" borderRadius="$full" left={"$5%"} top={"$15%"}>
                    <AvatarFallbackText>{userData.Name}</AvatarFallbackText>
                </Avatar>
                <Text position='absolute' left={"33%"} color='white' fontFamily='Arial' fontSize={"$175%"} top={"$25%"} >Hi, {userData.Name}</Text>
            </Box>
            <Box width={"$full"} flex="1" p={4} overflow='auto'>
                <Text color='black' fontFamily='Arial' fontSize={"$175%"}><strong>Name:</strong> {userData.Name}</Text>
                <Text color='black' fontFamily='Arial' fontSize={"$175%"}><strong>FirstSurname:</strong> {userData.FirstSurname}</Text>
                <Text color='black' fontFamily='Arial' fontSize={"$175%"}><strong>SecondSurname:</strong> {userData.SecondSurname}</Text>
                <Text color='black' fontFamily='Arial' fontSize={"$175%"}><strong>PhoneNumber:</strong> {userData.PhoneNumber}</Text>
                <Text color='black' fontFamily='Arial' fontSize={"$175%"}><strong>Email:</strong> {userData.Email}</Text>
            </Box>
            <Button onPress={onSubmit} action='primary' position="fixed" width="300px" backgroundColor='#FFA600' color='white' top={"80%"} p={2}>
                <ButtonText>
                    LogOut
                </ButtonText>
            </Button>
        </Box>
    );

}
export default Account;