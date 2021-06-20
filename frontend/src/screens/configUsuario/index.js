import React, { useState, useEffect } from 'react'
import { FlatList, Text, View, TouchableOpacity, Image, StatusBar, TextInput, Switch, Modal } from 'react-native'
import styles from './style'
import api from '../../services/api'
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native'
import { ScrollView } from 'react-native';



export default function ConfigUsuario() {

    const [isEnabled, setIsEnabled] = useState(false)
    const toggleSwitch = () => setIsEnabled(previousState => !previousState)
    const [modalVisible, setModalVisible] = useState(false)
    const [usuarioConfig, setusuarioConfig] = useState([])
    const [plano, setPlano] = useState()
    const [descricaoPlano, setDescricaoPlano] = useState()
    const [quantImagens, setQuantImagens] = useState()
    const [quantImoveis, setQuantImoveis] = useState()
    const [notificacoes, setNotificacoes] = useState()
    const navigation = useNavigation()

    //conexão de api
    async function loadUsuarioConfig() {
        const response = await api.get('/usuarioConfig/41789623615')
        setusuarioConfig(response.data)
        setIsEnabled(usuarioConfig.notificacoes)
    }


    async function changeUsuario() {
        console.log(usuarioConfig)
            await api.put('/usuarioConfig/41789623615', {
            plano: usuarioConfig.plano,
            descricaoPlano: usuarioConfig.descricaoPlano,
            quantImagens: usuarioConfig.quantImagens,
            quantImoveis: usuarioConfig.quantImoveis,
            notificacoes: usuarioConfig.notificacoes,
        })
    }

    //falta criar a tela de editar perfil
    function navigateToEditProfile() {
        navigation.navigate('ListagemDeImoveis')
    }

    function actionNotification() {
        if (isEnabled === false) {
            setIsEnabled(true)
            console.log('aqui')
        } else setIsEnabled(false)
    }


    useEffect(() => {
        loadUsuarioConfig()
    }, []);


    return (
        <View style={styles.container}>
            <View style={styles.firstContainer}>
                <Image
                    style={styles.imageUser}
                    source={require('../../../assets/me.jpeg')}
                />

                <Text style={styles.notificationText}>{isEnabled ? 'Notificações ativadas' : 'Notificações desativadas'}</Text>
                <Switch
                    trackColor={{ false: '#767577', true: '#7FFF00' }}
                    thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
                    ios_backgroundColor='#3e3e3e'
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                    onPress={actionNotification}
                />
                <View style={styles.containerText}>
                    <Text style={styles.editPerfil}>Editar informações do perfil</Text>
                    <TouchableOpacity onPress={() => navigateToEditProfile()}>
                        <FontAwesome name="pencil-square-o" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.containerText}>
                    <Text style={styles.firstText}>Plano</Text>
                    <Text style={styles.secondText}>{usuarioConfig.plano}</Text>
                </View>
                <View style={styles.containerText}>
                    <Text style={styles.firstText}>Descrição</Text>
                    <Text style={styles.secondText}>{usuarioConfig.descricaoPlano}</Text>
                </View>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Text style={styles.upgradeText}>{'MUDAR PLANO'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={changeUsuario}><Text style={styles.upgradeText}>Salvar Mudança</Text></TouchableOpacity>

            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => { setModalVisible(false) }}
            >

                <View style={styles.modalContent}>
                    <ScrollView>
                        <View style={{ flexDirection: 'column', justifyContent: 'flex-start', borderBottomWidth: 2, borderColor: '#1E90FF', marginRight: 15 }}>
                            <TouchableOpacity onPress={() => {
                                alert("Plano alterado para Plano Premium 1 com sucesso!");
                                setModalVisible(false);
                                setusuarioConfig({
                                    plano: 'premium 1',
                                    descricaoPlano: 'Até 7 imóveis , 7 imagens por imóvel venda/aluguel',
                                    quantImagens: 7,
                                    quantImoveis: 7,
                                    notificacoes: true,
                                })

                            }}><Text style={{ fontSize: 19, textAlign: 'left', color: '#1E90FF', textAlign: 'left', fontStyle: 'italic' }}>Plano Premium 1</Text></TouchableOpacity>
                        </View>
                        <View style={{ paddingTop: 10 }}>
                            <Text style={styles.textPlano}>*     Até 7 imóveis</Text>
                            <Text style={styles.textPlano}>*     7 Imagens por imóvel </Text>
                            <Text style={styles.textPlano}>*     Venda/Aluguel </Text>
                        </View>

                        <View style={{ flexDirection: 'column', justifyContent: 'flex-start', borderBottomWidth: 2, borderColor: '#1E90FF', marginRight: 15 }}>
                            <TouchableOpacity onPress={() => {
                                alert("Plano alterado para Plano Premium 2 com sucesso!");
                                setModalVisible(false);
                                setusuarioConfig({
                                    plano: 'premium 2',
                                    descricaoPlano: 'Até 10 imóveis , 10 imagens por imóvel venda/aluguel',
                                    quantImagens: 10,
                                    quantImoveis: 10,
                                    notificacoes: true,
                                })

                            }}><Text style={{ fontSize: 19, textAlign: 'left', color: '#1E90FF', textAlign: 'left', fontStyle: 'italic' }}>Plano Premium 2</Text></TouchableOpacity>
                        </View>
                        <View style={{ paddingTop: 10 }}>
                            <Text style={styles.textPlano}>*     Até 10 imóveis</Text>
                            <Text style={styles.textPlano}>*     10 Imagens por imóvel </Text>
                            <Text style={styles.textPlano}>*     Venda/Aluguel </Text>
                        </View>

                        <View style={{ flexDirection: 'column', justifyContent: 'flex-start', borderBottomWidth: 2, borderColor: '#1E90FF', marginRight: 15 }}>
                            <TouchableOpacity onPress={() => {
                                alert("Plano alterado para Plano Premium 3 com sucesso!");
                                setModalVisible(false);
                                setusuarioConfig({
                                    plano: 'premium 3',
                                    descricaoPlano: 'Até 15 imóveis , 15 imagens por imóvel venda/aluguel',
                                    quantImagens: 15,
                                    quantImoveis: 15,
                                    notificacoes: true,
                                })

                            }}><Text style={{ fontSize: 19, textAlign: 'left', color: '#1E90FF', textAlign: 'left', fontStyle: 'italic' }}>Plano Premium 3</Text></TouchableOpacity>
                        </View>
                        <View style={{ paddingTop: 10 }}>
                            <Text style={styles.textPlano}>*     Até 15 imóveis</Text>
                            <Text style={styles.textPlano}>*     15 Imagens por imóvel </Text>
                            <Text style={styles.textPlano}>*     Venda/Aluguel </Text>
                        </View>

                        <View style={{ flexDirection: 'column', justifyContent: 'flex-start', borderBottomWidth: 2, borderColor: '#1E90FF', marginRight: 15 }}>
                            <TouchableOpacity onPress={() => {
                                alert("Plano alterado para Premium 4 com sucesso!");
                                setModalVisible(false);
                                setusuarioConfig({
                                    plano: 'premium 4',
                                    descricaoPlano: 'Até 20 imóveis , 20 imagens por imóvel venda/aluguel',
                                    quantImagens: 20,
                                    quantImoveis: 20,
                                    notificacoes: true,
                                })


                            }}><Text style={{ fontSize: 19, textAlign: 'left', color: '#1E90FF', textAlign: 'left', fontStyle: 'italic' }}>Plano Premium 4</Text></TouchableOpacity>
                        </View>
                        <View style={{ paddingTop: 10 }}>
                            <Text style={styles.textPlano}>*     Até 20 imóveis</Text>
                            <Text style={styles.textPlano}>*     20 Imagens por imóvel </Text>
                            <Text style={styles.textPlano}>*     Venda/Aluguel </Text>
                        </View>
                    </ScrollView>


                    <TouchableOpacity onPress={() => setModalVisible(false)}><Text style={{ textAlign: 'center', paddingTop: 20, color: 'black' }}>Fechar</Text></TouchableOpacity>


                </View>
            </Modal>

        </View>
    )
}