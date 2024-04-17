import { Box } from "@gluestack-ui/themed";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import InsertFood from './InsertFood';
import InsertFoodGroups from './InserFoodGroups'
const Tab = createBottomTabNavigator();

const HomeAdm = () => {

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Food Groups') {
                        iconName = focused ? 'Food Groups' : 'FoodGroups-outline';
                    } else if (route.name === 'Food') {
                        iconName = focused ? 'Food' : 'Food-outline';
                    } 

                    // Puedes devolver cualquier componente que quieras aquí,
                    // estamos devolviendo un componente de icono.
                    
                },
            })}
            tabBarOptions={{
                activeTintColor: '#FFA600',
                inactiveTintColor: 'gray',
            }}
        >
            
            <Tab.Screen name="Food Groups" component={InsertFoodGroups} options={{ headerShown: false }} />
            <Tab.Screen name="Food" component={InsertFood} options={{ headerShown: false }} />
        </Tab.Navigator>
    );

    


}

export default HomeAdm;