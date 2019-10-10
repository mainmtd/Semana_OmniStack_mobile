import React from 'react';
import {YellowBox} from 'react-native';
import { StyleSheet, Text, View } from 'react-native';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
])

import Routes from './src/routes'
//View é o mesmo que div para mobile
//Text é um texto
//Android não tem css, então os estilos são criados em um container
//No caso, os styles estão logo abaixo, e são referenciados com style={styles.container} e é importado o StyleSheet do react native
export default function App() {
  return <Routes/>
}

//Container contendo os Estilos do app
//Diferente do css, ao invés de utilizar hifen nos comandos, utiliza-se CamelCase
//Propriedades de texto, como cores, sempre vêm entre aspas
//Por padrão, todas as aplicações do react têm display flex com flex direction columns
