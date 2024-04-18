import axios from 'axios';
import { Box, Divider, Button, ButtonText, View, Text, AvatarFallbackText, Avatar, Card, Heading } from '@gluestack-ui/themed';
import React, { useState, useEffect } from 'react';


const SearchView = () => {
  const [formData, setData] = useState({});
  const [foodData, setFoodData] = useState<any[]>([]);
  const [groupData, setGroupData] = useState<any[]>([]);
  const [foodcateg, setFoodcateg ] = useState<any[]>([]);

  useEffect(() => {
    const data = async () => {
      try {
        const response = await axios.get('http://localhost/1.75/backend/public/api/foodIndex');
        setFoodData(response.data);
      } catch (error) {
        console.log("error getting the groups", error);
      }
    };
    const dataGroup = async () => {
      try {
        const response = await axios.get('http://localhost/1.75/backend/public/api/FoodGroupIndex');
        setGroupData(response.data);
      } catch (error) {
        console.log("error getting the groups", error);
      }
    };
    data();
    dataGroup();
  }, []);

  const produc = (id:string)=>{

    console.log("name", id);

    console.log("getting", foodData);
    const filteredFood = foodData.filter(food => food.idFoodGroupFK === id);
    console.log("filtrado", filteredFood)
    setFoodcateg(filteredFood);
  }
 

  return (
    <Box backgroundColor='white' height={"$full"} width={"$full"}>
      <Box marginTop={"$3px"} display='$flex' flexDirection='row' borderRadius={"$10px"} overflowX='scroll' backgroundColor='#FAF7F6'>
        {groupData.map((group, index) => (

          <Button onPress={()=>produc(group.id)} backgroundColor='#FFA600' margin={"$5px"}  key={index} size="md" variant="solid" action="primary" isDisabled={false} isFocusVisible={false} >
            <ButtonText color='white' >{group.Name} </ButtonText>
            
          </Button>

        ))}

      </Box>
      <Box overflow='auto' marginTop={"$3px"} backgroundColor='#FAF7F6' borderRadius={"$20px"}>
        {foodcateg.map((foof, index)=>(
          <Card key={index} size="md" variant="elevated" m="$3">
          <Heading mb="$1" size="md">
              {foof.Name}
          </Heading>
          <Text size="sm">
              {foof.Price}.00 $
          </Text>
      </Card>
        ))}

      </Box>


    </Box>
  );
};

export default SearchView;