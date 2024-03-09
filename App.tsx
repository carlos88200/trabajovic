import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Button, ButtonText } from '@gluestack-ui/themed';
import { config } from "./config/gluestack-ui.config";
import { Box, GluestackUIProvider, Text, Image, VStack, FormControl, FormControlLabelText, FormControlLabel, Input, InputField, } from '@gluestack-ui/themed';
import { useState } from "react";
const Stack = createNativeStackNavigator();

//Importaciones de componenetes
import HomeView from './components/HomeView';
import RegisterView from './components/RegisterView';
import { TouchableOpacity } from 'react-native';


export default function App() {
  return (<NavigationContainer>
    <GluestackUIProvider config={config}>
      <Stack.Navigator initialRouteName="Principal">
        <Stack.Screen name="Principal" component={Principal} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeView} />
        <Stack.Screen name="Register" component={RegisterView} options={{ headerShown: false }} />
      </Stack.Navigator>
    </GluestackUIProvider >
  </NavigationContainer >
  );
}

function Principal() {
  const [formData, setData] = useState({});
  const [errors, setErrors] = useState({});
  const navigation = useNavigation();
  let regex_email = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/;
  const digit = /[0-9]/;
  const upperCase = /[A-Z]/;
  const lowerCase = /[a-z]/;
  const nonAlphanumeric = /[^0-9A-Za-z]/;
  const isStrongPassword = password => [digit, upperCase, lowerCase, nonAlphanumeric].every(re => re.test(password)) && password.length >= 8 && password.length <= 3;

  //validate the password and email fields. 
  const validate = () => {
    setErrors({});
    if (regex_email.test(formData.email) === false) {
      console.log('regex_email', formData.email);
      setErrors({
        ...errors,
        email: 'email is not valid'
      });
      return false;
    }
    if (formData.email === undefined) {
      console.log('undefined', formData.email);
      setErrors({
        ...errors,
        email: 'email is required'
      });
      return false;
    } else if (formData.email.length < 3) {
      console.log('lengt', formData.email);
      setErrors({
        ...errors,
        email: 'email is too short'
      });
      return false;
    }
    if (!isStrongPassword(formData.password)) {
      setErrors({
        ...errors,
        password: 'password is not validate'
      });
      return false;
    }
    return true;
  };

  const onsubmit = () => {
    // validate() ? navigation.navigate(HomeView) : console.log('Invalid', errors);
    navigation.navigate('Home');
  };

  return <Box maxWidth="100%" width={"$full"} height="$1/3" borderRadius="$sm">
    <Image size="md" width={"$full"} height={"$full"} alt="login_image" source={require("/assets/pantalla_inicio.png")} resizeMode="cover" style={{
      alignSelf: "center"
    }} />
    <Text ml={"$5"} fontWeight='$bold' fontSize={"$2xl"} color='black'>Login</Text>
    <VStack mt={"$5"}>
      <FormControl isInvalid={false} size={"md"} isDisabled={false} isRequired={false}>
        <FormControlLabel>
          <FormControlLabelText color="black" ml="$9" fontSize={"$sm"} fontWeight='$bold'>Username</FormControlLabelText>
        </FormControlLabel>
        <Input width={"$3/4"} mx={"auto"} borderRadius={"$md"} mt={"$2"} borderColor='$black'>
          <InputField type="text" placeholder="email" borderColor="$black" onChange={value => setData({
            ...formData,
            email: value
          })} />
        </Input>
      </FormControl>

      <FormControl isInvalid={false} size={"md"} isDisabled={false} isRequired={false} mt={"$5"}>
        <FormControlLabel>
          <FormControlLabelText color="black" fontSize="$sm" fontWeight='$bold' mt="" ml="$9">Password</FormControlLabelText>
        </FormControlLabel>
        <Input width={"$3/4"} mx="$auto" borderColor="$black" borderRadius={"$md"} mt={"$2"}>
          <InputField onChange={value => setData({
            ...formData,
            password: value
          })} type="password" placeholder="password" />
        </Input>

      </FormControl>

      <Text mx={"$auto"} mt={"$3"} fontWeight=''>Forgot your password?</Text>
    </VStack>

    <Button action={"primary"} onPress={onsubmit} backgroundColor={"#FFA600"} size={"lg"} mx={"$auto"} width={"$3/4"} borderRadius={"$lg"} mt={"$2"} isDisabled={false} sx={{
      ':hover': {
        backgroundColor: '#c4871d'
      }
    }}>
      <ButtonText>
        Login
      </ButtonText>

    </Button>

    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
      <Text mt={"$2"} ml={"$1"}>Doesnt have an account yet? register here..</Text>
    </TouchableOpacity>
  </Box>;
}