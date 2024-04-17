import { Box, Divider, Button, ButtonText, View, Text, AvatarFallbackText, Avatar, Card, Heading } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'//async
import { useEffect, useState } from 'react';
import axios from 'axios';







const Bagview = () => {
    const navigation = useNavigation();
    // const token = await AsyncStorage.getItem('token');
    //console.log("token en bag", token);







    const [userData, setUserData] = useState({});
    const [FavoriteData, setFavoriteData] = useState({});
    const [productData, setProductData] = useState<any[]>([]);
    const [carFullData, setCarFullData] = useState({});
    const [productfinData, setProductfinData] = useState({});
    const [totalData, setTotalData] = useState(0);
    const [FavoreEnd, setFavoreEnd] = useState<any[]>([]);
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
            let FavoriteUser = [];
            let FavoriteEndarr = [];



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
            
            try {
                const response = await axios.get(`http://localhost/1.75/backend/public/api/showfav/${idUser}`);
                setProductData(response.data);

            } catch (error) {
                console.log(" we cannot get the information fav ", error);

            }
        };

        fetchUserData();


    }, []);





    const onSubmit = () => {
        navigation.navigate('Home');
    }

    return (
        <Box backgroundColor='white'  mt={10} display="flex" flexDirection="column" height={"$full"} width={"$full"} overflow='auto' >

            {productData.map((fav, index) => (



                <Card key={index} size="md" variant="elevated" m="$3">
                    <Heading mb="$1" size="md">
                        {fav.food.Name}
                    </Heading>
                    <Text size="sm">
                        {fav.food.Price}.00 $
                    </Text>
                </Card>

            ))}



        </Box>
    );
}


export default Bagview;