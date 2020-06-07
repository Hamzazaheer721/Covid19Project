import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import React,{Component} from 'react';
import continent from './src/Tabs';
import Worldwide from './src/Worldwide';
import Home from './src/countriesList';
import { createDrawerNavigator,drawerBackgroundColor,drawerLabel,DrawerMenu } from '@react-navigation/drawer';
import ByCountry from './src/countryDetails'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

class Extreme extends Component {
  render(){
    return(
  <Stack.Navigator>
      <Stack.Screen 
      name="Home" 
      component={Home} 
      options={{ title: 'Corona Virus Statistics',
        headerTitleAlign: 'center',
        headerTintColor: 'black',
        headerStyle: {backgroundColor: '#feda6a'},
        headerLeft: () => (
        <Icon name="menu" size={30} style={{marginLeft: 20 ,backgroundColor: '#feda6a', color : "blue"}} onPress={() => this.props.navigation.openDrawer()} color='white'></Icon>
    ), }} />
      
       <Stack.Screen name="ByCountry" 
       component={ByCountry}
        options={{ title: 'Country',
        headerTitleAlign: 'left',
        headerTintColor: 'white',
        headerStyle: {backgroundColor: '#ec7f37'},
        headerRight: () => (
        <Icon name="menu" size={30} style={{marginRight: 20}} onPress={() => this.props.navigation.openDrawer()} color='white'></Icon>
    ), }} />
      <Stack.Screen 
      name="Worldwide" 
      backgroundColor='black'
      component={Worldwide} 
      options={{ title: 'Worldwide',
      headerTintColor: 'white',    
    }} 
      />
      <Stack.Screen     
      name="continent"
      component={continent} 
      options={{ title: 'continent',
      headerTintColor: 'black',
       headerStyle: {backgroundColor: 'black'}
      }}
      />
  </Stack.Navigator> 
    );
    }
}



export default class App extends Component{
  render(){
  return (
    <NavigationContainer>
    <Drawer.Navigator >
      <Drawer.Screen name="Home" 
      component={Extreme} 
      options={{ 
        drawerLabel: 'Main Menu' 
      }}
      />
      <Drawer.Screen 
      name="Worldwide"
    
      component={Worldwide} 
      options={{drawerLabel: 'Global Epedemic Condition',title: "Global Summary" }}
       />
      <Drawer.Screen 
      name="continent" 
      component={continent} 
      options={{ drawerLabel: 'Condition across Continents' }}
      />
    </Drawer.Navigator>
    </NavigationContainer>
  );
}


}