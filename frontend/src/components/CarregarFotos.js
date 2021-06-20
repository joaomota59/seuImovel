import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";
import * as imagePicker from 'expo-image-picker'
import {Button} from 'react-native-paper'

const CarregarFotos = ({modalVisible, setModalVisible, numeroDeFotos, setImovel, imovel}) => {
    
    const [imageUri, setImageUri] = React.useState([])
    const [numeroFotos, setNumeroFotos] = React.useState(0)
   

    const acessarGaleria = async () => {
      let result = await imagePicker.launchImageLibraryAsync({
        mediaTypes: imagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      return result
    }


    const obterImagem = async () => {

        // console.log(imageuri, index);

        if(numeroFotos < numeroDeFotos){

        const result = await acessarGaleria()
       
    
        if (!result.cancelled) {
             setImageUri([...imageUri, result.uri]);
             setNumeroFotos(i => i+1)
        }

       

      }else{
        Alert.alert('Limite', "Você atingiu o numero de fotos do plano")
      }
    }

const envioParaImovel = () => {
  setImovel({...imovel, imagens: imageUri})
}

    // const criaObjetos = () => {
    //   let arr = []
     
    //   for(let i = 0; i < numeroDeFotos; i++){
    //    let uri = ""
    //    arr.push(uri)
    //   }
    //   setImageUri(arr)
    // }

    // React.useEffect(() => {

    // },[])

  


  return (
    <View style={styles.centeredView}>    
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

              {/* Titulo + icone fechar */}
            <View style={{flexDirection:'row', alignItems: 'center', width: '100%', justifyContent: 'space-around'}}>
                <Text style={styles.modalText}>Carregue suas fotos</Text>
                <Pressable
                onPress={() => setModalVisible(!modalVisible)}
                >
               <FontAwesome name="close" size={28} color="green" />
                </Pressable>
            </View>
        
            <View style={{flex: 1, marginVertical: 20, width: '100%'}}>
              <Text>Numero de fotos = {numeroFotos} {imageUri.length}</Text>
              {
              // <AntDesign name="check" size={24} color="black" />
                <View  style={{flexDirection: 'row', justifyContent: 'space-between', width: 250, borderWidth: 1, padding: 5}}>
                    <Text>Imagem</Text>
                    <TouchableOpacity onPress={obterImagem}>
                       <Foundation name="photo" size={24} color="black" />
                    </TouchableOpacity>
                </View>
              
              }

              <Button onPress={envioParaImovel} mode='contained'>Enviar</Button>

            </View>
  



          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    height: 500,
    width: '90%',
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default CarregarFotos;