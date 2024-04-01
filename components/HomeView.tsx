import { Ionicons } from '@expo/vector-icons';
import { Box, Image, Button, ButtonText, Text } from '@gluestack-ui/themed';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import BagView from './BagView';

const Button1 = () => {
    <Box justifyContent="center" alignItems="center" mt={"$10"}>
        <Image size="md" width={"$full"} height={"$full"} alt="login_image" source={require("../assets/pantalla_inicio.png")} resizeMode="cover" style={{
            alignSelf: "center"
        }} />
        <Text color="black" fontWeight="$bold">
            Hungry Chilaquiles killer
        </Text>
    </Box>;
};

const Button2 = () => {
    <Button action={"primary"} variant={"solid"} size={"lg"} isDisabled={false}>
        <ButtonText>
            Button
        </ButtonText>
    </Button>;
};


const HomeView = () => {
    return (<Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                    iconName = focused ? 'home' : 'home-outline';
                } else if (route.name === 'Search') {
                    iconName = focused ? 'search' : 'search-outline';
                } else if (route.name === 'Bag shop') {
                    iconName = focused ? 'bag' : 'bag-outline';
                } else if (route.name === 'Favorites') {
                    iconName = focused ? 'heart' : 'heart-outline';
                }

                // Puedes devolver cualquier componente que quieras aquí,
                // estamos devolviendo un componente de icono.
                return <Ionicons name={iconName} size={size} color={color} />;
            },
        })}
        tabBarOptions={{
            activeTintColor: '#FFA600',
            inactiveTintColor: 'gray',
        }}
    >
        <Tab.Screen name="Home" component={Button1} />
        <Tab.Screen name="Search" component={Button2} />
        <Tab.Screen name="Bag shop" component={BagView} options={{headerShown:false}} />
        <Tab.Screen name="Favorites" component={Button2} />
    </Tab.Navigator>
    );
};
export default HomeView;