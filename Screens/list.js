import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { ListItem, CheckBox, FAB, Dialog } from '@rneui/themed'
import { getCompany } from '../api/company'

const list = () => {
  const [check, setCheck] = useState(-1);
  const [visible, setVisible] = useState(false);
  const [dialog, setDialog] = useState({
    title: '',
    description: ''
  })
  const [listado, setListado] = useState(false);

  useEffect(() => {
    try {
      getCompany()
        .then((data) => {
          setListado(data.maincompanies)
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  const toggleDialog = () => {
    setVisible(!visible);
  };

  const openDialog = () => {
    if (check != -1) {
      setDialog({
        title: listado[check].name,
        description: listado[check].acronym
      })
    } else {
      setDialog({
        title: 'ERROR',
        description: 'Debe seleccionar una empresa de la lista'
      })
    }

    setVisible(true);
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        {listado ? (
          listado.map((l, i) => (
            <ListItem key={i} bottomDivider>
              <CheckBox
                center
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={check == i}
                onPress={() => setCheck(i)}
              />
              <ListItem.Content>
                <ListItem.Title>{l.name}</ListItem.Title>
                <ListItem.Subtitle>{l.acronym}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          )) ): (<></>)
        }
      </ScrollView>
      <FAB
        onPress={() => { openDialog() }}
        placement="right"
        title="Mostrar Empresa"
        icon={{ name: 'more', color: 'white' }}
        color="blue"
      />
      <Dialog
        isVisible={visible}
        onBackdropPress={toggleDialog}
      >
        <Dialog.Title title={dialog.title} />
        <Text>{dialog.description}</Text>
      </Dialog>
    </View>
  )
}

export default list