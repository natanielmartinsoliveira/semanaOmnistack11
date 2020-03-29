import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native' ;
import Style from './style';
import { useNavigation } from '@react-navigation/native';
import Logo from '../../../assets/logo.png';
import api from '../../services/api';

export default function Incident(){
    const navigation = useNavigation();
    const [incidents, setIncident] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setloading] = useState(false);

    async function loadIncidents(){
        if(loading){
            return;
        }
        if(total > 0 & incidents.length == total){
            return;
        }
        setloading(true);
        const response = await api.get('incident', { params : { page }});
        setIncident([...incidents, ...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page +1);
        setloading(false);
    }
    useEffect(() => {
        loadIncidents();
    },[]);

    function navigationToDetail(incident){
        navigation.navigate('detail',{ incident });
    }

    
    return (
        <View style={Style.container}>
            <View style={Style.header}>
                <Image source={Logo} />
                <Text style={Style.headerText}>
                    Total de <Text style={Style.headerTextbold}>{total} Casos</Text>.
                </Text>
            </View>
            <Text style={Style.title}>Ben-vindo! </Text>
            <Text style={Style.description}>Escolha um caso e salve o dia. </Text>
            
            <FlatList data={incidents}  
            style={Style.incidentList}
            showsVerticalScrollIndicator={false}
            keyExtrator={incident => incident.id}
            onEndReached={loadIncidents}
            onEndReachedThreshold={0.2}
            renderItem={({ item : incident }) => ( 
            <View style={Style.incident}>
                    <Text style={Style.incidentProperty}>ONG: </Text>
                    <Text style={Style.incidentValue}>{incident.name} </Text>

                    <Text style={Style.incidentProperty}>CASO: </Text>
                    <Text style={Style.incidentValue}>{incident.title} </Text>

                    <Text style={Style.incidentProperty}>VaLOR: </Text>
                    <Text style={Style.incidentValue}>{Intl.NumberFormat('pt-BR', {style : 'currency', currency :'BRL' }).format(incident.value)}</Text>
                    <TouchableOpacity 
                    style={Style.detailButton} 
                    onPress={() => navigationToDetail(incident)}>
                        <Text style={Style.detailButtonText}>Ver mais Detalhes</Text>
                        <Feather name='arrow-right' size={16} color='#e02041'></Feather>
                    </TouchableOpacity>
                </View>)} />
        </View>
       
    );
}