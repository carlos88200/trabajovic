import React, { useEffect, useState } from 'react';
import { getFoodItem } from '../API/Request';
import { FoodResponse, Img } from '../API/Config';
import { Box, Image, VStack , Text} from '@gluestack-ui/themed';

const DetailScreen = ({ route }) => {

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


    return (
        <Box mt={"$5"} padding={"$5"} height={"$full"}>
            <Image
                size="md"
                width={"$full"}
                height={"$1/2"}
                alt="login_image"
                source={{ uri: `${Img+FoodItem.Image}` }}
                resizeMode="cover" style={{
                    alignSelf: "center"
                }} />
            <VStack>
                <Text size="lg" fontWeight="bold">{FoodItem.Name}</Text>
                <Text size="sm">{FoodItem.Description}</Text>
                <Text size="sm" fontWeight="$extrabold">Precio: {FoodItem.Price}</Text>
            </VStack>
        </Box>
    );
};

export default DetailScreen;