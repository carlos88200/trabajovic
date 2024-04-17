import { FormControl, Text, Image, FormControlLabel, Button, ButtonText, FormControlLabelText, Input, InputField } from '@gluestack-ui/themed';
import { Box, VStack, Modal, ModalBackdrop, ModalContent, ModalHeader, Heading, ModalCloseButton, CloseIcon, Icon, ModalBody, ModalFooter } from '@gluestack-ui/themed';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';


const RegisterView = () => {
    const [showModal, setShowModal] = useState(false)
    const [adminPassword, setAdminPassword]= useState();
    console.log(showModal)
    const ref = React.useRef(null)



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
    const onSubmit = async () => {
        if (validate()) {
            try {
                formData.Rol = 0;
                console.log("dates", formData)
                const response = await axios.post('http://localhost/1.75/backend/public/api/StoreRegister', formData);
                console.log("Successful registration", response.data);
                navigation.navigate('Principal');
            } catch (error) {
                console.error("Error:", error);
            }

        } else {
            console.log('Validation failed', errors);
        }
    }
    const onSubmitreg = async () => {
        if (validate()) {

            if(adminPassword === "123"){
                try {
                    formData.Rol = 1;
                    
                    const response = await axios.post('http://localhost/1.75/backend/public/api/StoreRegister', formData);
                    console.log("Successful registration", response.data);
                    setShowModal(false);
                    navigation.navigate('Principal');
                } catch (error) {
                    console.error("Error:", error);
                }

            }else{
                console.log("Contraseña incorrecta");


            }
           

        } else {
            console.log('Validation failed', errors);
        }
    }


    return <Box maxWidth="100%" width={"$full"} height="$1/3" borderRadius="$sm">
        <Image size="md" width={"$full"} height={"$full"} alt="login_image" source={require("/assets/pantalla_inicio.png")} resizeMode="cover" style={{
            alignSelf: "center"
        }} />
        <Text ml={"$5"} fontWeight='$bold' fontSize={"$2xl"} my={"$3"} borderBottomColor='black'>Register</Text>
        <VStack>
            <FormControl size={"md"} isDisabled={false} isRequired={false}>
                <FormControlLabel>
                    <FormControlLabelText color="black" ml="$5" fontSize={"$sm"} fontWeight='$bold'>Name</FormControlLabelText>
                </FormControlLabel>

                <Input>
                    <InputField placeholder='Name' defaultValue='' type='text' onChangeText={value => setData({
                        ...formData,
                        Name: value
                    })} />
                </Input>

            </FormControl>

            <FormControl isInvalid={false} size={"md"} isDisabled={false} isRequired={false}>
                <FormControlLabel>
                    <FormControlLabelText color="black" ml="$5" fontSize={"$sm"} fontWeight='$bold'>FirstSurname</FormControlLabelText>
                </FormControlLabel>
                <Input>
                    <InputField type='text' placeholder='FirstSurname' defaultValue='' onChangeText={value => setData({
                        ...formData,
                        FirstSurname: value
                    })} />

                </Input>

            </FormControl>

            <FormControl isInvalid={false} size={"md"} isDisabled={false} isRequired={false}>
                <FormControlLabel>
                    <FormControlLabelText color="black" ml="$5" fontSize={"$sm"} fontWeight='$bold'>SecondSurname</FormControlLabelText>
                </FormControlLabel>
                <Input>
                    <InputField type='text' placeholder='SecondSurname' defaultValue='' onChangeText={value => setData({
                        ...formData,
                        SecondSurname: value
                    })} />

                </Input>

            </FormControl>

            <FormControl isInvalid={false} size={"md"} isDisabled={false} isRequired={false}>
                <FormControlLabel>
                    <FormControlLabelText color="black" ml="$5" fontSize={"$sm"} fontWeight='$bold'>number control</FormControlLabelText>
                </FormControlLabel>
                <Input width={"$3/4"} borderRadius={"$sm"} mx={"$auto"} marginBottom={"$1"} borderBottomColor={"$black"} borderRadius="$sm">
                    <InputField type='number' defaultValue='' placeholder='Control number'
                        onChangeText={value => setData({
                            ...formData,
                            ControlNumber: value
                        })} />

                </Input>

            </FormControl>


            <FormControl isInvalid={false} size={"md"} isDisabled={false} isRequired={false}>
                <FormControlLabel>
                    <FormControlLabelText color="black" ml="$5" fontSize={"$sm"} fontWeight='$bold'>Phone number</FormControlLabelText>
                </FormControlLabel>
                <Input width={"$3/4"} borderRadius={"$sm"} mx={"$auto"} marginBottom={"$1"} borderBottomColor={"$black"} borderRadius="$sm">

                    <InputField type="number" defaultValue="" placeholder="Phone number"
                        onChangeText={value => setData({
                            ...formData,
                            PhoneNumber: value
                        })} />

                </Input>

            </FormControl>


            <FormControl isInvalid={false} size={"md"} isDisabled={false} isRequired={false}>
                <FormControlLabel>
                    <FormControlLabelText color="black" ml="$5" fontSize={"$sm"} fontWeight='$bold'>Email</FormControlLabelText>
                </FormControlLabel>
                <Input width={"$3/4"} borderRadius={"$sm"} mx={"$auto"} marginBottom={"$1"} borderBottomColor={"$black"} borderRadius="$sm">

                    <InputField type="text" defaultValue="" placeholder="email"
                        onChangeText={value => setData({
                            ...formData,
                            Email: value
                        })} />

                </Input>
            </FormControl>
            <FormControl isInvalid={false} size={"md"} isDisabled={false} isRequired={false}>
                <FormControlLabel>
                    <FormControlLabelText color="black" ml="$5" fontSize={"$sm"} fontWeight='$bold'>Password</FormControlLabelText>
                </FormControlLabel>
                <Input width={"$3/4"} borderRadius={"$sm"} mx={"$auto"} marginBottom={"$1"} borderBottomColor={"$black"} borderRadius="$sm">

                    <InputField type="password" defaultValue="" placeholder="password"
                        onChangeText={value => setData({
                            ...formData,
                            Password: value
                        })} />

                </Input>
            </FormControl>

        </VStack>
        <Button onPress={onSubmit} action={"primary"} backgroundColor={"#FFA600"} mt={"$5"} size={"lg"} mx={"$auto"} width={"$3/4"} borderRadius={"$lg"} mt={"$2"} isDisabled={false} sx={{
            ':hover': {
                backgroundColor: '#c4871d'
            }
        }}>
            <ButtonText>
                Register
            </ButtonText>

        </Button>
        <Button onPress={() => setShowModal(true)}   ref={ref} backgroundColor={"#FFA600"} mt={"$5"} size={"lg"} mx={"$auto"} width={"$3/4"} borderRadius={"$lg"} mt={"$2"} isDisabled={false} sx={{
            ':hover': {
                backgroundColor: '#c4871d'
            }
        }}>
            <ButtonText>
                Register admin
            </ButtonText>

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
                    <Heading size="lg">register Admin</Heading>
                    <ModalCloseButton>
                        <Icon as={CloseIcon} />
                    </ModalCloseButton>
                </ModalHeader>
                <ModalBody>
                    <Input>
                        <InputField 
                        type="number" 
                        defaultValue="" 
                        placeholder="Admin password"
                        value={adminPassword}
                        onChange={(event) => setAdminPassword(event.target.value)}
                         />
                    </Input>
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
                        onPress={onSubmitreg}
                    >
                        <ButtonText>Register</ButtonText>
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </Box>;
};
export default RegisterView;