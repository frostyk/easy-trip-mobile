import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/CreateScreen';
import EstablishmentsScreen from "../screens/EstablishmentsScreen";
import EstablishmentDetailsScreen from '../screens/EstablishmentDetailsScreen'
import TourDetailsScreen from "../screens/TourDetailsScreen";
import FavouriteScreen from "../screens/FavouriteScreen";


const HomeStack = createStackNavigator({
  Home: HomeScreen,
  EstablishmentDetails: EstablishmentDetailsScreen,
  TourDetails: TourDetailsScreen,
  Establishments: EstablishmentsScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
});

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'}
    />
  ),
};

const FavouriteStack = createStackNavigator({
  Favourite: FavouriteScreen,
});

FavouriteStack.navigationOptions = {
  tabBarLabel: 'Favourites',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-heart' : 'md-heart'}
    />
  ),
};

const PostStack = createStackNavigator({
  Settings: SettingsScreen,
});

PostStack.navigationOptions = {
  tabBarLabel: 'Create',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-create' : 'md-create'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  PostStack,
  FavouriteStack,
  ProfileStack
});
