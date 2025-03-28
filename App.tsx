import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { HomeScreen } from '$screen/HomeScreen'

const Stack = createStackNavigator()

export const App = () => {
    return (
        <View style={styles.container}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Home" component={HomeScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
        marginTop: 70 // We don't want this hitting the tippy top of the screen
    }
})
