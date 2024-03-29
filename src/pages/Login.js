import React, {useState, useEffect} from 'react';
import {View, AsyncStorage, KeyboardAvoidingView, Image, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';

import logo from '../assets/logo.png'
import api from '../services/api';

export default function Login({navigation}){
    const [email, setEmail] = useState('');
    const [techs, setTechs] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('user').then( user => {
            if(user){
                navigation.navigate('List');
            }
        })
    }, [email]);

    async function handleSubmit(){
        const response = await api.post('/sessions', {
            email
        })

        const {_id} = response.data;

        await AsyncStorage.setItem('user', _id);
        await AsyncStorage.setItem('techs', techs);

        navigation.navigate('List');
    }
    //Async storage é o localstorage mobile, ou seja, um banco de dados dentro do celular

    return (
        //KeyboardAvoidingView ajusta o teclado do celular para não atrapalhar os elementos
        //Isso é apenas necessário no IOS, portanto importamos o Platform e dissemos para apenas usar o keyboardAvoiding no IOS
        //para isso utilizamos o enabled={Platform.OS === 'ios}
        //Após teste, verifiquei que é necessário em algumas versões do android
        <KeyboardAvoidingView  behavior="padding" style={styles.container}>
            <Image source={logo}/>

            <View style={styles.form}>
                <Text style={styles.label} >SEU EMAIL *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Seu e-mail"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail}
                />
                <Text style={styles.label} >TECNOLOGIAS *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Tecnologias de interesse"
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={techs}
                    onChangeText={setTechs}
                />

                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}> Encontrar spots</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

//Cada estilização no react é própria, ou seja, para cada estilização você cria um elemento novo no JSON
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30,
    },
    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },
    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    }

});