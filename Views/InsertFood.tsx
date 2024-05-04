import { Box, Heading, ModalBody, ModalFooter, Center, Modal, ModalBackdrop, ModalContent, ModalHeader, ModalCloseButton, Icon, CloseIcon, Card, VStack, Text, Button, ButtonText, FormControl, FormControlLabel, Input, InputField, FormControlLabelText } from '@gluestack-ui/themed';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Image, View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ApiUrl, Img } from './API/Config';
import { Picker } from '@react-native-picker/picker';

const InsertFood = () => {
    const [formData, setData] = useState({});
    const [foodData, setFoodData] = useState<any[]>([]);
    const [groupData, setGroupData] = useState<any[]>([]);
    const [image, setImage] = useState(null);
    const [showModal, setShowModal] = useState(false)
    const [selectedFood, setSelectedFood] = useState(null); // Nuevo estado para almacenar el producto seleccionado
    console.log(showModal)
    const ref = React.useRef(null)
    const [mode, setmode] = useState("register");
    const [Id, setId] = useState('');



    useEffect(() => {
        const data = async () => {
            try {
                const response = await axios.get(`${ApiUrl}foodIndex`);
                setFoodData(response.data);
            } catch (error) {
                console.log("error getting the groups", error);
            }
        };
        const dataGroup = async () => {
            try {
                const response = await axios.get(`${ApiUrl}FoodGroupIndex`);
                setGroupData(response.data);
            } catch (error) {
                console.log("error getting the groups", error);
            }
        };
        data();
        dataGroup();
    }, []);


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };
    const onSubmit = async () => {
        try {
            const responsee = await fetch(image);
            const blob = await responsee.blob();


            console.log("name", formData.Name, "yyyy00", formData);
            let formDta = new FormData();
            formDta.append('Name', formData.Name);
            formDta.append('Description', formData.Description);
            formDta.append('Price', formData.Price);
            formDta.append('idFoodGroupFK', formData.idFoodGroupFK);
            formDta.append('Image', blob, 'filename.jpg');

            const response = await axios({
                method: 'POST',
                url: `${ApiUrl}foodStore`,
                data: formDta,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log("add", response.data);
            try {
                const response = await axios.get(`${ApiUrl}foodIndex`);
                setFoodData(response.data);
                console.log("new", response.data);
            } catch (error) {
                console.log("error getting the groups", error);
            }
            setShowModal(false);
        } catch (error) {
            console.log("error", error);
        }
    }

    const onDelete = async (id: string) => {
        try {
            axios.post(`${ApiUrl}FoodDestroy/${id}`);
            setShowModal(false);
            const response = await axios.get(`${ApiUrl}foodIndex`);
            setFoodData(response.data);
            console.log("deleted");

        } catch (error) {
            console.log("not deleted");
        }
    }

    const onModify = (food: any, id: string) => {
        setSelectedFood(food);
        setId(id);
        setmode("modify");
        console.log(Id);
        console.log(food);
        setData({
            Name: food.Name,
            Description: food.Description,
            Price: food.Price,
            idFoodGroupFK: food.idFoodGroupFK,
            Image: Blob
        });
        setShowModal(true);
    };

    const update = async (food) => {
        console.log("que se manda: ", food);
        console.log(Id);

        const send = await axios({
            method: 'PUT',
            url: `${ApiUrl}FoodUpdate/${Id}`,
            data: food,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(send.data);
        setShowModal(false);
        const response = await axios.get(`${ApiUrl}foodIndex`);
        setFoodData(response.data);
        console.log("deleted");
    }
    const clear = () => {
        setData({});
    }
    return (
        <Box height={"$full"} width={"$full"}>
            <Box alignContent='center'>
                <Button width={"$full"} mx={"auto"} mt={"$10"} onPress={() => setShowModal(true)} ref={ref}>
                    <ButtonText>Add new Item</ButtonText>
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
                            <Heading size="lg">Food</Heading>
                            <ModalCloseButton>
                                <Icon as={CloseIcon} />
                            </ModalCloseButton>
                        </ModalHeader>
                        <ModalBody>
                            <FormControl size={"md"} isDisabled={false} isRequired={false}>
                                <Text>Name</Text>
                                <Input>
                                    <InputField placeholder='Name' value={formData.Name} type='text' onChangeText={value => setData({
                                        ...formData,
                                        Name: value
                                    })} />
                                </Input>

                            </FormControl>
                            <FormControl size={"md"} isDisabled={false} isRequired={false}>
                                <Text>Description</Text>
                                <Input>
                                    <InputField placeholder='Description' value={formData.Description} type='text' onChangeText={value => setData({
                                        ...formData,
                                        Description: value
                                    })} />
                                </Input>

                            </FormControl>
                            <FormControl size={"md"} isDisabled={false} isRequired={false}>
                                <Text>Price</Text>
                                <Input>
                                    <InputField placeholder='Price' value={formData.Price} type='number' onChangeText={value => setData({
                                        ...formData,
                                        Price: value
                                    })} />
                                </Input>

                            </FormControl>
                            <FormControl size={"md"} isDisabled={false} isRequired={false}>
                                <Text>Category</Text>

                                <Picker
                                    selectedValue={formData.idFoodGroupFK}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setData({ ...formData, idFoodGroupFK: itemValue })
                                    }>
                                    <Picker.Item label="Choosee..." value="" />
                                    {groupData.map((group, index) => (
                                        <Picker.Item key={index} label={group.Name} value={group.id} />
                                    ))}
                                </Picker>

                            </FormControl>

                            <FormControl size={"md"} isDisabled={false} isRequired={false}>
                                <Text>Image</Text>
                                <Button  onPress={pickImage} />
                            </FormControl>

                        </ModalBody>
                        <ModalFooter>
                            {mode === "register" ? (
                                <Button
                                    size="sm"
                                    action="positive"
                                    borderWidth="$0"
                                    onPress={onSubmit}>
                                    <ButtonText>add</ButtonText>
                                </Button>
                            ) : (
                                <Button
                                    size="sm"
                                    action="positive"
                                    borderWidth="$0"
                                    onPress={() => { update(formData, Id) }}>
                                    <ButtonText>update</ButtonText>
                                </Button>
                            )}
                            <Button
                                variant="outline"
                                size="sm"
                                action="secondary"
                                mr="$3"
                                onPress={() => {
                                    setShowModal(false), clear()
                                }}>
                                <ButtonText>Cancel</ButtonText>
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>

            <Box width={"$full"} height={"$full"} p={4}>
                {foodData.map((food, index) => (
                    <Card key={index} size="md" variant="filled" m="$3">
                        <Image
                            size="md"
                            width={"$full"}
                            alt="login_image"
                            source={{ uri: `${Img + food.Image}` }}
                            resizeMode="cover" style={{
                                alignSelf: "center"
                            }} />
                        <Box>
                            <Heading mb="$1" size="md">
                                {food.Name}
                            </Heading>
                        </Box>
                        <VStack>
                            <Text size="sm">{food.Description}</Text>
                            <Text size="sm" fontWeight="$extrabold">Precio: {food.Price}</Text>
                        </VStack>
                        <Button onPress={() => onModify(food, food.id)} my={"$5"} ref={ref} backgroundColor='#f59e0b'>
                            <ButtonText>Modify</ButtonText>
                        </Button>
                        <Button onPress={() => onDelete(food.id)} backgroundColor='#dc2626' variant="solid" isDisabled={false} isFocusVisible={false} >
                            <ButtonText>Delete</ButtonText>
                        </Button>
                    </Card>
                ))}
            </Box>
        </Box>
    );
}
export default InsertFood;