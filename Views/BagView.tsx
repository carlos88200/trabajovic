import { Box, Divider, Button, ButtonText, View, Text, AvatarFallbackText, Avatar, Card, Heading } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'//async
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ButtonIcon, ButtonSpinner, ButtonGroup } from '@gluestack-ui/themed';
import { Icon } from '@gluestack-ui/themed';
import { CloseIcon } from '@gluestack-ui/themed';
import { ApiUrl } from './API/Config';

const Bagview = () => {
    const navigation = useNavigation();
    // const token = await AsyncStorage.getItem('token');
    //console.log("token en bag", token);

    const [userData, setUserData] = useState({});
    const [carData, setCarData] = useState<any[]>([]);
    const [productData, setProductData] = useState({});
    const [carFullData, setCarFullData] = useState({});
    const [productfinData, setProductfinData] = useState({});
    const [totalData, setTotalData] = useState(0);
    const [carEnd, setCarEnd] = useState<any[]>([]);
    const datos: any[] = [];
    const datosfinal: any[] = [];
    let tokenString;
    let token;
    let total = 0;



    useEffect(() => {
        const fetchUserData = async () => {
            tokenString = await AsyncStorage.getItem('token');
            token = JSON.parse(tokenString);
            let idUser;
            let carUser = [];
            let caarEnd = [];
            let total=0;



            if (token) {

                try {
                    const response = await axios.get(`${ApiUrl}Userauth`, {
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
            try {
                const response = await axios.get(`${ApiUrl}carr/${idUser}`);

                setCarData(response.data);
                console.log(response.data);
                
                response.data.forEach(element => {
                    total += element.food.Price;
                   
                });
                setTotalData(total);

            } catch (error) {
                console.log(" we cannot get the information car", error);
            }
            
        };

        fetchUserData();


    }, []);


    const onDelete = async (id: string) => {
        tokenString = await AsyncStorage.getItem('token');
        token = JSON.parse(tokenString);
        let idUser;
        let carUser = [];
        let caarEnd = [];
        if (token) {
            

            
            try{
                console.log("id", id);
                const response = await axios.post(`${ApiUrl}CarDestroy/${id}`);
                console.log("deleted");

            }catch(error){
                console.log("not deleted", error);

            }
            try {
                const response = await axios.get(`${ApiUrl}Userauth`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUserData(response.data);
                idUser = response.data.id;


            } catch (error) {
                console.log(" we cannot get the information ", error);
            }


            try {
                const response = await axios.get(`${ApiUrl}carr/${idUser}`);

                setCarData(response.data);
                console.log(response.data);
                
                
                response.data.forEach(element => {
                    total += element.food.Price;
                   
                });
                setTotalData(total);

            } catch (error) {
                console.log(" we cannot get the information car", error);
            }
        }
        
    }
     


    const onSubmit = () => {
        navigation.navigate('Home');
    }

 
    return (
        <Box backgroundColor='white' alignItems="center" mt={10} display="flex" flexDirection="column" height={"$full"} >
            <Box borderRadius={" 10px 10px 0 0"} height={'40%'} width={'100%'} backgroundColor='#FFA600' p={4} display='inline-block'>
                <Avatar bgColor='black' size="xl" borderRadius="$full" left={"$5%"} top={"$15%"}>
                    <AvatarFallbackText>{userData.Name}</AvatarFallbackText>
                </Avatar>
                <Text position='absolute' left={"33%"} color='white' fontFamily='Arial' fontSize={"$175%"} top={"$25%"}    >{userData.Name} </Text>
                <Text position='absolute' left={"33%"} color='white' fontFamily='Arial' fontSize={"$175%"} top={"$37%"}    >{userData.FirstSurname}</Text>
                <Text position='absolute' left={"33%"} color='white' fontFamily='Arial' fontSize={"$175%"} top={"$49%"}    >{userData.SecondSurname}</Text>
                <Text position='absolute' left={"$50%"} top={"$80%"} color='white' fontFamily='Arial' fontSize={"$175%"} mb="$1" margin="10" size="sm" style={{ marginLeft: "auto" }}>
                    Total: {totalData}.00 $
                </Text>
            </Box>
            <Box width={"$full"} flex="1" p={4} overflow='auto'>
                {carData.map((car, index) => (
                    <Card key={index} size="md" variant="elevated" m="$3">
                        <Box flexDirection="row" alignItems="center" justifyContent="space-between">
                            <Box>
                                <Heading mb="$1" size="md">
                                    {car.food.Name}
                                </Heading>
                                <Text size="sm">
                                    {car.food.Price}.00 $
                                </Text>
                            </Box>

                            <Button onPress={()=>onDelete(car.id)} size="xs" backgroundColor='red' width={"$35px"} variant="solid"  isDisabled={false} isFocusVisible={false} >
                                <ButtonText>x</ButtonText>
                            </Button>
                        </Box>
                    </Card>
                ))}
            </Box>


            <Button onPress={onSubmit} action='primary' position="fixed" width="300px" backgroundColor='#FFA600' color='white' top={"80%"} p={2}>
                <ButtonText>
                    Order
                </ButtonText>
            </Button>

        </Box>
    );
}


export default Bagview;