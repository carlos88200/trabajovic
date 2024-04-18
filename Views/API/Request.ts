import {Api, FoodResponse} from '../API/Config';

//retorna las comidas... 
export const getFoodItems = async () => {
    const response = await Api.get<FoodResponse>('foodIndex');
    return response.data;
}

export const getFoodItem = async (id:number | null) => {
    const response = await Api.get<FoodResponse>(`food/${id}`);
    return response.data;
}


