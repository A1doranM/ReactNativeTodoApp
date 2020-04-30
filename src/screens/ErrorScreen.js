import React from "react";
import {StyleSheet, View} from "react-native";
import {AppText} from "../components/ui/AppText";
import {AppButton} from "../components/ui/AppButton";
import {THEME} from "../theme";

const ErrorScreen = ({onPress, errText, btnText}) =>{
    return (
        <View style={styles.center}>
            <AppText style={styles.error}>
                {errText}
            </AppText>
            <AppButton onPress={onPress}>
                {btnText}
            </AppButton>
        </View>
    );
};

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    error: {
        fontSize: 20,
        marginBottom: 10,
        color: THEME.DANGER_COLOR,
    },
});


export default ErrorScreen;