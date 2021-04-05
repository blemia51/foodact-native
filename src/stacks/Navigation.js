import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons'


import Home from '../screens/Home'
import ProductCards from '../screens/ProductCard'
import ProductDetail from '../screens/ProductDetail'
import SignIn from '../screens/SignIn'
import SignUp from '../screens/SignUp'
import Menu from '../screens/Menu'
import FaqClient from '../screens/FaqClient'


const Stack = createStackNavigator();
const BottomTabs = createBottomTabNavigator();

function BottomTabsNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        
        options={{
          //cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          title: 'FoodAct',
          headerStyle: {
            backgroundColor: '#16214b',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProductCards"
        component={ProductCards}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          title: 'FoodAct',
          headerStyle: {
            backgroundColor: '#16214b',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          //headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          title: 'Reservez',
          headerStyle: {
            backgroundColor: '#16214b',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          //headerShown: false,
        }}
      />
      <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{
            title: 'FoodAct',
            headerStyle: {
              backgroundColor: '#16214b',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            //headerShown: false,
          }}
        />
    </Stack.Navigator>
  )
}

const MenuStack = createStackNavigator();

function MenuStackScreen() {
  return (
    <MenuStack.Navigator>
      <MenuStack.Screen
        name="Menu" 
        component={Menu}
        options={{
          title: 'Menu',
          headerStyle: {
            backgroundColor: '#16214b',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          //headerShown: false,
        }}
      />
      <MenuStack.Screen
        name="FAQ"
        component={FaqClient}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          title: 'FAQ',
          headerStyle: {
            backgroundColor: '#16214b',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <MenuStack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          title: 'Se connecter',
          headerStyle: {
            backgroundColor: '#16214b',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <MenuStack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          title: 'S\'inscrire',
          headerStyle: {
            backgroundColor: '#16214b',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
    </MenuStack.Navigator>
  );
}


function Navigation() {
  return (
    <NavigationContainer>
      <BottomTabs.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            size = 30
            if (route.name=='Accueil') {
              iconName='home'
            } else if (route.name === 'Favoris') {
              iconName='favorite-border'
            } else if (route.name === 'Menu') {
              iconName='menu'
            } else if (route.name === 'Explorer') {
              iconName='explore'
            }
            return <MaterialIcons name={iconName} size={size} color={color} />;
          }
        })}
        tabBarOptions={{
          activeTintColor: '#16214b',
          inactiveTintColor: 'lightgrey',
          labelStyle: {
            fontSize: 12,
          },
        }}
      >
        <BottomTabs.Screen
          name='Accueil'
          component={BottomTabsNavigation}
        />
        {/* <BottomTabs.Screen
          name='Explorer'
          component={ProductCards}
        />
        <BottomTabs.Screen
          name='Favoris'
          component={ProductCards}
        /> */}
        <BottomTabs.Screen
          name='Menu'
          component={MenuStackScreen}
        />
      </BottomTabs.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
