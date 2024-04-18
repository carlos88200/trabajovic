import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Button, ButtonText, Modal } from '@gluestack-ui/themed';
import { config } from "./config/gluestack-ui.config";
import { Box, GluestackUIProvider, Text, Image, VStack, FormControl, FormControlLabelText, FormControlLabel, Input, InputField, } from '@gluestack-ui/themed';
import { useState } from "react";
const Stack = createNativeStackNavigator();
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'//async

//Importaciones de componenetes
import HomeView from './Views/HomeView';
import { TouchableOpacity } from 'react-native';
import HomeAdm from './Views/HomeAdm';
import RegisterView from './Views/RegisterView';



export default function App() {
  return (<NavigationContainer>
    <GluestackUIProvider config={config}>
      <Stack.Navigator initialRouteName="Principal">
        <Stack.Screen name="Principal" component={Principal} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeView} options={{headerShown:false}}/>
        <Stack.Screen name="Register" component={RegisterView} options={{ headerShown: false }} />
        <Stack.Screen name="HomeAdm" component={HomeAdm} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </GluestackUIProvider >
  </NavigationContainer >
  );
}

function Principal() {
  




  const navigation = useNavigation();
  let regex_email = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
  const digit = /[0-9]/;
  const upperCase = /[A-Z]/;
  const lowerCase = /[a-z]/;
  const nonAlphanumeric = /[^0-9A-Za-z]/; 
  const [formData, setData] = useState({});
  const [errors, setErrors] = useState({});


  
  const isStrongPassword = Password =>
  [digit, upperCase, lowerCase, nonAlphanumeric]
    .every(re => re.test(Password))
  && Password.length >= 8
  && Password.length <= 32;
  const validate = () => {
    setErrors({});
    console.log('email', formData.Email);
    console.log('password', formData.Password);
    if (regex_email.test(formData.Email) === undefined) {
      console.log('regex_email', formData.Email);
      setErrors({
        ...errors,
        Email: 'email is not valid'
      });
      return false
    }
    if (formData.Email === undefined) {
      console.log('undefined', formData.Email);
      setErrors({
        ...errors,
        Email: 'email is required'
      });
      return false;
    } else if (formData.Email.length < 3) {
      console.log('length', formData.Email);
      setErrors({
        ...errors,
        Email: 'email is too short'
      });
      return false;
    }
    if (!isStrongPassword(formData.Password)) {
      setErrors({
        ...errors,
        Password: 'password is not validate'
      });
      return false;
    }
    return true;
  }

  const onsubmit = async () => {
    // validate() ? navigation.navigate(HomeView) : console.log('Invalid', errors);
    if(validate()){
      try{
        // const response = await axios.post('http://localhost/1.75/backend/public/api/UserLogin', formData);
        const response = await axios.post('http://192.168.100.4/Mobiles/backend/public/api/UserLogin', formData);
        console.log("response login", response);
        const token = response.data.token;
        await AsyncStorage.setItem('token', JSON.stringify(token));
        if(response.data.Rol==1){
          navigation.navigate('HomeAdm');
        }else{
          navigation.navigate("Home");
        }
        
        
      }catch(error){
        alert("User or Password are incorrect");
        console.error("Error:", error);
      }
    }else{

    }
  };

 
  return <Box maxWidth="100%" width={"$full"} height="$1/3" borderRadius="$sm">
    <Image size="md" width={"$full"} height={"$full"} alt="login_image" source={require("../Cafeteria-App/assets/pantalla_inicio2.png")} resizeMode="cover" style={{
      alignSelf: "center"
    }} />
    <Text ml={"$5"} fontWeight='$bold' fontSize={"$2xl"} color='black'>Login</Text>
    <VStack mt={"$5"} marginTop={"$5"} padding={"$5"}>

      <FormControl isInvalid={false} size={"md"} isDisabled={false} isRequired={false}>
        <FormControlLabel>
          <FormControlLabelText color="black" fontSize={"$sm"} fontWeight='$bold'>Email</FormControlLabelText>
        </FormControlLabel>
        <Input width={"$full"} mx={"auto"} borderRadius={"$md"} mt={"$2"} borderColor='$black'>
          <InputField type="text" placeholder="email" borderColor="$black" onChangeText={value => setData({
            ...formData,
            Email: value
          })} />
        </Input>
      </FormControl>

      <FormControl isInvalid={false} size={"md"} isDisabled={false} isRequired={false} mt={"$5"}>
        <FormControlLabel>
          <FormControlLabelText color="black" fontSize="$sm" fontWeight="$bold">Password</FormControlLabelText>
        </FormControlLabel>
        <Input width={"$full"} borderColor="$black" borderRadius={"$md"} mt={"$2"}>
          <InputField type="password" placeholder="password" onChangeText={value => setData({
            ...formData,
            Password: value
          })} />
        </Input>

      </FormControl>

      <Text mx={"$auto"} mt={"$3"} fontWeight=''>Forgot your password?</Text>
    </VStack>

    <Box justifyContent="center" alignItems="center">
      <Button action={"primary"} onPress={onsubmit} backgroundColor={"#FFA600"} size={"lg"} width={"$3/4"} borderRadius={"$lg"} mt={"$2"}>
        <ButtonText>
          Login
        </ButtonText>
      </Button>



      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text mt={"$2"} ml={"$1"}>Doesnt have an account yet? <Text fontWeight='$bold'>Register Here</Text></Text>
      </TouchableOpacity>
    </Box>
  </Box>;
}