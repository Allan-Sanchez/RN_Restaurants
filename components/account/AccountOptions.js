import React, { useState } from "react";
import { map } from "lodash";
import { StyleSheet, Text, View } from "react-native";
import { Icon, ListItem } from "react-native-elements";
//
import Modal from "../Modal";
import ChangeDisplayName from "./ChangeDisplayName";
import ChangeEmail from "./ChangeEmail";
import ChangePassword from "./ChangePassword";

export default function AccountOptions({ user, toastRef, setReloadUser }) {
  const [showModal, setShowModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);
  const generateOptions = () => {
    return [
      {
        title: "Cambiar nombre y apellido",
        iconNameLeft: "account-circle",
        iconColorLeft: "#ff6c6c",
        iconNameRight: "chevron-right",
        iconColorRight: "#ff6c6c",
        onPress: () => selectedComponent("displayName"),
      },
      {
        title: "Cambiar Email",
        iconNameLeft: "at",
        iconColorLeft: "#ff6c6c",
        iconNameRight: "chevron-right",
        iconColorRight: "#ff6c6c",
        onPress: () => selectedComponent("email"),
      },
      {
        title: "Cambiar contraseña",
        iconNameLeft: "lock-reset",
        iconColorLeft: "#ff6c6c",
        iconNameRight: "chevron-right",
        iconColorRight: "#ff6c6c",
        onPress: () => selectedComponent("password"),
      },
    ];
  };

  const selectedComponent = (key) => {
    switch (key) {
      case "displayName":
        setRenderComponent(
          <ChangeDisplayName
            displayName={user.displayName}
            setShowModal={setShowModal}
            toastRef={toastRef}
            setReloadUser={setReloadUser}
          />
        );
        break;
      case "email":
        setRenderComponent(
          <ChangeEmail
            email={user.email}
            setShowModal={setShowModal}
            toastRef={toastRef}
            setReloadUser={setReloadUser}
          />
        );
        break;
      case "password":
        setRenderComponent(
          <ChangePassword setShowModal={setShowModal} toastRef={toastRef} />
        );
        break;
    }
    setShowModal(true);
  };
  const menuOptions = generateOptions();

  return (
    <View>
      {map(menuOptions, (menu, index) => (
        <ListItem key={index} style={styles.menuItem} onPress={menu.onPress}>
          <Icon
            type="material-community"
            name={menu.iconNameLeft}
            color={menu.iconColorLeft}
          />
          <ListItem.Content>
            <ListItem.Title>{menu.title}</ListItem.Title>
          </ListItem.Content>
          <Icon
            type="material-community"
            name={menu.iconNameRight}
            color={menu.iconColorRight}
          />
        </ListItem>
      ))}
      <Modal isVisible={showModal} setVisible={setShowModal}>
        {renderComponent}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#ff6c6c",
  },
});
