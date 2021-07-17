# go to android folder

>> step-1: create local.properties file

```
    sdk.dir=C\:\\Users\\milon\\AppData\\Local\\Android\\Sdk
```

>> step-2: for emulator you need to use android studio(run the android project first time)

<br>

>> step-3: usb debuging on psyiscal device

```
Ensure that both

    Developer Options -> USB debugging
    Developer Options -> USB debugging (Security settings)

```

>> step-4: create folder structur

```
/root->
    /src->
        app.js 
        /assets
        /components->
            /layouts
            /navigation
            /screens
        /utils
            /context
                /actions
                /reducers
                MainContext.js
        /helpers
            /hooks
                useLocalStorage.js
            Define.js
            Helper.js
            Response.js
            URL.js
              
```


>> step-5: setup react navigation navigation
    
* Instalation

````
    npm install @react-navigation/native
    npm install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
    
````
* setting native navigation in IOS
```
    npx pod-install ios
```

* import gesture at the top of your entry file, such as index.js or App.js and wrap everything in NavigationContainer 
```
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>{/* Rest of your app code */}</NavigationContainer>
  );
}


```

## note : you may got error: try to clear the cache,or run on android studio

```
npx react-native start --reset-cache
```

* Create Navigator
    * install stack navigator
    * install drawer navigator
```
npm i @react-navigation/stack
npm i @react-navigation/drawer
```

for cookie enable

```
npm i @react-native-community/cookies

npx react-native link @react-native-community/cookies

Add “import CookieManager from '@react-native-community/cookies’;” to App.js
```