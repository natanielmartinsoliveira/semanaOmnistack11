import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native' ;
import Style from './style';
import { useNavigation, useRoute } from '@react-navigation/native';
import Logo from '../../../assets/logo.png';
import * as MailComposer from 'expo-mail-composer';


export default function Detail(){
    const [incidents, setIncident] = useState([]); 
    const route = useRoute();
    const navigation = useNavigation();
    const incident = route.params.incident;
    const message = `Ola estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" com o valor de ${Intl.NumberFormat('pt-BR', {style : 'currency', currency :'BRL' }).format(incident.value)}` ;
    function navigationBack(){
        navigation.goBack();
    }

    function sendMail(){
        MailComposer.composeAsync({
           subject:`Heroi do caso: ${incident.title}`,
           recipients:[incident.email],
           body: message,
        })
    }
    function sendWhats(){
        Linking.openURL(`whatsapp://send?phone=${incident.whatapp}&text=${message}`)
    }
    return (
        <View style={Style.container} >
             <View style={Style.header}>
                <Image source={Logo} />
                <TouchableOpacity 
                    style={Style.detailButton} 
                    onPress={navigationBack}>
                        <Feather name='arrow-left' size={28} color='#e02041'></Feather>
                        
                </TouchableOpacity>
            </View>

            <View style={Style.incident}>
                    <Text style={Style.incidentProperty, {marginTop : 0}}>ONG: </Text>
                    <Text style={Style.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

                    <Text style={Style.incidentProperty}>CASO: </Text>
                    <Text style={Style.incidentValue}>{incident.description}</Text>

                    <Text style={Style.incidentProperty}>VaLOR: </Text>
                    <Text style={Style.incidentValue}>{Intl.NumberFormat('pt-BR', {style : 'currency', currency :'BRL' }).format(incident.value)}</Text>
            </View>

            <View style={Style.contactBox}>
                    <Text style={Style.heroTitle}>Salve o Dia!</Text>
                    <Text style={Style.heroTitle}>Seja o Heroi desse caso.</Text>

                    <Text style={Style.heroDescription}>Entre em contato: </Text>

                    <View style={Style.actions}>
                        <TouchableOpacity 
                        style={Style.action} 
                        onPress={sendWhats}>
                            <Text style={Style.actionText}>WhatsApp</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                        style={Style.action} 
                        onPress={sendMail}>
                            <Text style={Style.actionText}>Email</Text>
                        </TouchableOpacity>
                    </View>
            </View>
        </View>
    );
}