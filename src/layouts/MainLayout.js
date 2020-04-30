import React, {useState, useContext} from "react";
import {View, StyleSheet, Alert} from "react-native";
import {Navbar} from "../components/Navbar";
import {THEME} from "../theme";
import {MainScreen} from "../screens/MainScreen";
import {TodoScreen} from "../screens/TodoScreen";
import {ScreenContext} from "../components/context/screen/ScreenContext";

const MainLayout = () => {
    const {todoID} = useContext(ScreenContext);

    return (
        <View style={styles.wrapper}>
            <Navbar title="Todo App!"/>
            <View style={styles.container}>
                {todoID ? <TodoScreen/> : <MainScreen/>}
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: THEME.PADDING_HORIZONTAL,
        paddingVertical: THEME.PADDING_VERTICAL,
        flex: 1,
    },
    wrapper: {
        flex: 1
    }
});


export default MainLayout;