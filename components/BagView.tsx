import {Box, Button, ButtonText, View, Text, AvatarFallbackText, Avatar, Card, Heading} from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'//async
import { useEffect, useState } from 'react';
import axios from 'axios';





const Bagview =  ()=>{
    const navigation = useNavigation();
   // const token = await AsyncStorage.getItem('token');
    //console.log("token en bag", token);

    
    
    
    const [userData, setUserData] = useState({});
    const [carData, setCarData]= useState({});
    const [productData, setProductData]= useState({});
    const [carFullData, setCarFullData]= useState({});
    const [productfinData, setProductfinData]= useState({});
    const [carEnd, setCarEnd] = useState<any[]>([]);
    const datos: any[] = [];
    const datosfinal: any[] = [];
    let tokenString ;
    let token;

    
    
    useEffect(() => {
            const fetchUserData = async () => {
                tokenString = await AsyncStorage.getItem('token');
                token = JSON.parse(tokenString);
                let idUser;
                let carUser=[];
                let caarEnd=[];

            

                if (token) {
                            
                    try {
                        const response = await axios.get("http://localhost/1.75/backend/public/api/Userauth", {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        });
                        setUserData(response.data);
                         idUser=response.data.id;
                        
                        
                    } catch (error) {
                        console.log(" we cannot get the information ", error);
                    }
                }
                try {
                    const response = await axios.get("http://localhost/1.75/backend/public/api/CarIndex");
                    
                    setCarData(response.data);
                    
                    
                    for (const objeto of response.data) {
                        
                        if(idUser==objeto.IdUserFK){
                            
                            carUser.push(objeto.IdFoodFK);
                            
                        }
                      }

                    
                } catch (error) {
                    console.log(" we cannot get the information ", error);
                }
                try{
                    const response = await axios.get("http://localhost/1.75/backend/public/api/foodIndex");
                    setProductData(response.data);
                    
                    
                        for(const carrr of carUser){
                            for (const objeto of response.data) {
                                if(carrr==objeto.id){
                                    caarEnd.push(objeto);
                                }
                            }
                        }
                        console.log("carr", caarEnd);
                        setCarEnd(caarEnd);
                }catch(error){
                    console.log(" we cannot get the information ", error);

                }
        };

        fetchUserData();
        

    }, []);
    
    
    


    const onSubmit=()=>{
        navigation.navigate('Home');
    }

    console.log("end", carEnd);
    return(
        <Box   alignItems="center" mt={"$10"}   height={'$full'} paddingTop={"$0"} marginTop={"$0"} padding={"$0"} margin={"$0"}>
            
            
            <Box width={"$full"} height={'$full'}>
                
                <Box paddingTop={"$0"} marginTop={"$0%"} width={"$full"}  mt={"$0"} backgroundColor='#FFA600' height={'$45%'} >
                    <Avatar bgColor='$amber600' size="xl" borderRadius="$full"  marginTop={"$5%"} marginLeft={"$5"} >
                        <AvatarFallbackText>{userData.Name}</AvatarFallbackText>
                    </Avatar>
                </Box>

                
            </Box> 
            
            <Box>
            {carEnd.map((item, index)=>(
                
                <Card key={index} size="lg" variant="elevated"  m="$3">
                    <Heading mb="$1" size="md">
                        {item.Name}
                    </Heading>
                    <Text size="sm">{item.Description}</Text>
                    <Text size="sm">{item.Price}</Text>
                </Card>
    
            ))}
                
            </Box>
            <Button onPress={onSubmit} position='absolute' width="305px" backgroundColor='#FFA600' color='white' marginTop={"100%"}>
                    <ButtonText >
                        Order
                    </ButtonText>

            </Button>
                

        </Box>

    ); 
}


export default Bagview;