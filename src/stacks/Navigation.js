import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons'


import Home from '../containers/HomeContainer'
import ProductDetail from '../containers/ProductDetailContainer'
import ProductCards from '../screens/ProductCards'
import ProductOrder from '../containers/ProductOrderContainer'
import SignIn from '../containers/SignInContainer'
import SignUp from '../containers/SignUpContainer'
import Menu from '../containers/MenuContainer'
import FaqClient from '../screens/FaqClient'
import Reciept from '../screens/Reciept';
import ModalAddAddress from '../screens/ModalAddAddress'
import MyFavorites from '../containers/MyFavoritesContainer'
import UserProfile from '../containers/UserProfileContainer'
import Explore from '../containers/ExploreContainer'
import UserOrders from '../containers/UserOrdersContainer'
//import LogoHeader from '../components/LogoHeader'


const Stack = createStackNavigator();

function HomeStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Group>
      <Stack.Screen
        name="Home"
        component={Home}
        
        options={{
          //cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          // headerTitle: () => <LogoHeader />,
          headerStyle: {
            backgroundColor: '#16214b',
            //height: 85
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
          title: '',
          headerStyle: {
            backgroundColor: '#16214b',
            //height: 85
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
            //height: 85
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          //headerShown: false,
        }}
      />
      </Stack.Group>
      
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
      <Stack.Screen
        name="ProductOrder"
        component={ProductOrder}
        options={{
          // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          // title: 'Reservez',
          // headerStyle: {
          //   backgroundColor: '#16214b',
          //   //height: 85
          // },
          // headerTintColor: '#fff',
          // headerTitleStyle: {
          //   fontWeight: 'bold',
          // },
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Reciept"
        component={Reciept}
        options={{
          // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          // title: 'Reservez',
          // headerStyle: {
          //   backgroundColor: '#16214b',
          //   //height: 85
          // },
          // headerTintColor: '#fff',
          // headerTitleStyle: {
          //   fontWeight: 'bold',
          // },
          headerShown: false,
        }}
      />
      </Stack.Group>
      
    </Stack.Navigator>
  )
}


const FavoritesStack = createStackNavigator()

function FavoritesStackScreen() {
  return (
    <FavoritesStack.Navigator>
      <MenuStack.Screen
        name="MyFavorites" 
        component={MyFavorites}
        options={{
          title: 'Mes Favoris',
          headerStyle: {
            backgroundColor: '#16214b',
            //height: 85
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          //headerShown: false,
        }}
      />
    </FavoritesStack.Navigator>
  )
}

const ExploreStack = createStackNavigator()

function ExploreStackScreen() {
  return (
    <ExploreStack.Navigator>
      <MenuStack.Screen
        name="Explore" 
        component={Explore}
        options={{
          title: 'Explorer',
          headerStyle: {
            backgroundColor: '#16214b',
            //height: 85
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerShown: false,
        }}
      />
    </ExploreStack.Navigator>
  )
}

const MenuStack = createStackNavigator();

function MenuStackScreen() {
  return (
    <MenuStack.Navigator>
      <MenuStack.Screen
        name="Menubase" 
        component={Menu}
        options={{
          title: 'Menu',
          headerStyle: {
            backgroundColor: '#16214b',
            //height: 85
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          //headerShown: false,
        }}
      />
       <MenuStack.Screen
        name="Profile"
        component={UserProfile}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          title: 'Mon Profil',
          headerStyle: {
            backgroundColor: '#16214b',
            //height: 85
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
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
            //height: 85
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
            //height: 85
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
            //height: 85
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <Stack.Screen
        name="UserOrders"
        component={UserOrders}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          title: 'Mes Paniers Sauvés',
          headerStyle: {
            backgroundColor: '#16214b',
          //   //height: 85
          },
          headerTintColor: '#fff',
            headerTitleStyle: {
            fontWeight: 'bold',
            },
          //headerShown: false,
        }}
      />
      <MenuStack.Screen
        name="ModalAddAddress"
        component={ModalAddAddress}
        options={{
          //cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          title: '',
          headerStyle: {
            backgroundColor: '#16214b',
            //height: 85
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

const BottomTabs = createBottomTabNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <BottomTabs.Navigator
        detachInactiveScreens
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
          },
          tabBarActiveTintColor: '#16214b',
          tabBarInactiveTintColor: 'lightgrey',
          tabBarLabelStyle: {
            fontSize: 12,
            paddingBottom: 6
          },
          tabBarStyle: {
            height: 60,
            paddingVertical: 10
          },
          headerShown: false,
        })}
       
      >
        <BottomTabs.Screen
          name='Accueil'
          component={HomeStackScreen}
        />
        <BottomTabs.Screen
          name='Explorer'
          component={ExploreStackScreen}
        />
        <BottomTabs.Screen
          name='Favoris'
          component={FavoritesStackScreen}
        />
        <BottomTabs.Screen
          name='Menu'
          component={MenuStackScreen}
        />
      </BottomTabs.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
