import React, {useState} from "react";
import * as Font from "expo-font";
import {AppLoading} from "expo";
import MainLayout from "./src/layouts/MainLayout";
import {TodoState} from "./src/components/context/todo/TodoState";

async function loadApplication() {
    await Font.loadAsync({
        "roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
        "roboto-bold": require("./assets/fonts/Roboto-Bold.ttf")
    });
}

export default function App() {
    const [isReady, setIsReady] = useState(false);

    if (!isReady) {
        return (
            <AppLoading
                startAsync={loadApplication}
                onError={err => console.log(err)}
                onFinish={() => setIsReady(true)}
            />
        );
    }

    return (
        <TodoState>
            <MainLayout/>
        </TodoState>
    );
};

