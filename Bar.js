import createMaterialBottomTabNavigator from 'react-navigation'

export default createMaterialBottomTabNavigator({
  HomeScreen: { screen: HomeScreen },
  Library: { screen: Library },
  History: { screen: History },
  Cart: { screen: Cart },
}, {
  initialRouteName: 'HomeScreen',
  activeColor: '#f0edf6',
  inactiveColor: '#3e2465',
  barStyle: { backgroundColor: '#694fad' },
});

