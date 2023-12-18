import React from 'react';
import { I18nManager } from 'react-native';
import MainNavigator from "./assets/navigation/mainNavigator";


const App = () => {
    I18nManager.forceRTL(false);
    I18nManager.allowRTL(false);

    return (
        <MainNavigator />
    );
  
};


export default App;