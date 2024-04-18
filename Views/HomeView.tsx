import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

//<--- views---> //

import FavoritesView from './FavoritesView';
// import MainView from './MainView';

//<!-- componets --> //
import Bagview from './FavoritesView';
import MyStack from './Components/Stack';
import SearchView from './SearchView';


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
                return <Ionicons name={iconName} size={size} color={color} />;
            },
        })}
        tabBarOptions={{
            activeTintColor: '#FFA600',
            inactiveTintColor: 'gray',
        }}
    >
        <Tab.Screen name="Home" component={MyStack} />
        <Tab.Screen name="Search" component={SearchView} />
        <Tab.Screen name="Bag shop" component={Bagview} options={{ headerShown: false }} />
        <Tab.Screen name="Favorites" component={FavoritesView} />
    </Tab.Navigator>
    );
};
export default HomeView;