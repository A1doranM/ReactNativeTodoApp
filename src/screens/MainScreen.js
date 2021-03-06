import React, {useState, useEffect, useContext, useCallback} from "react";
import {StyleSheet, View, FlatList, Image, Dimensions} from "react-native";
import {AddTodo} from "../components/AddTodo";
import {Todo} from "../components/Todo";
import {THEME} from "../theme";
import {TodoContext} from "../components/context/todo/TodoContext";
import {ScreenContext} from "../components/context/screen/ScreenContext";
import {AppLoader} from "../components/ui/AppLoader";
import {AppText} from "../components/ui/AppText";
import {AppButton} from "../components/ui/AppButton";
import ErrorScreen from "./ErrorScreen";

export const MainScreen = () => {
    const {addTodo, todos, removeTodo, fetchTodos, loading, error} = useContext(TodoContext);
    const {changeScreen} = useContext(ScreenContext);
    const [deviceWidth, setDeviceWidth] = useState(Dimensions.get("window").width - THEME.PADDING_HORIZONTAL * 2);

    const loadTodos = useCallback(async () => {
        await fetchTodos()
    }, [fetchTodos]);

    useEffect(() => {
        loadTodos();
    }, []);

    useEffect(() => {
        const update = () => {
            const width = Dimensions.get("window").width - THEME.PADDING_HORIZONTAL * 2;
            setDeviceWidth(width);
        };

        Dimensions.addEventListener("change", update);

        return () => {
            Dimensions.removeEventListener("change", update);
        };
    }, []);

    if (loading) {
        return <AppLoader />
    }

    if(error) {
        return (
           <ErrorScreen
               errText={error}
               btnText="Try one more time."
               onPress={loadTodos}
           />
        )
    }

    let content = (
        <View style={{width: deviceWidth}}>
            <FlatList
                keyExtractor={item => item.id.toString()}
                data={todos}
                renderItem={({item}) => (
                    <Todo todo={item} onRemove={removeTodo} onOpen={changeScreen}/>
                )}
            />
        </View>
    );

    if (todos.length === 0) {
        content = (
            <View style={styles.imgWrap}>
                <Image
                    style={styles.image}
                    source={require("../../assets/no-items.png")}
                />
            </View>
        );
    }

    return (
        <View>
            <AddTodo onSubmit={addTodo}/>
            {content}
        </View>
    );
};

const styles = StyleSheet.create({
    imgWrap: {
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        height: 300
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "contain"
    },
});
