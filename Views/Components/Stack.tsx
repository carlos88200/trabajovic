import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailScreen from './Details';
import MainView from '../MainView';

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="MainView">
      <Stack.Screen name="MainView" component={MainView} options={{headerShown:false}} />
      <Stack.Screen name="Details" component={DetailScreen} />
    </Stack.Navigator>
  );
}

export default MyStack;