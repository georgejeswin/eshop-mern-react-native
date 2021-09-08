import React, { useState } from "react";

import { View, Button } from "react-native";
import Dropdown from "../../../Components/Dropdown";
import {
  Container,
  Header,
  Content,
  ListItem,
  Text,
  Radio,
  Right,
  Left,
  Picker,
  Icon,
  Body,
  Title,
} from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";
// import RNPickerSelect from "react-native-picker-select";
const methods = [
  { name: "Cash on Delivery", value: 1 },
  { name: "Bank Transfer", value: 2 },
  { name: "Card Payment", value: 3 },
];

const paymentCards = [
  { label: "Wallet", value: "Wallet" },
  { label: "Visa", value: "Visa" },
  { label: "MasterCard", value: "MasterCard" },
  { label: "Other", value: "Other" },
];

const Payment = (props) => {
  const order = props.route.params;
  const addressTrue = props.route.params;

  const [selected, setSelected] = useState(1);
  const [card, setCard] = useState();

  const paymentConfirm = () => {
    props.navigation.navigate("Confirm", { order, addressTrue });
  };

  return (
    <Container>
      <Header style={{ backgroundColor: "#F8F8F8" }}>
        <Body style={{ alignItems: "center" }}>
          <Title style={{ color: "black" }}>Choose your payment method</Title>
        </Body>
      </Header>
      <Content>
        {methods.map((item, index) => {
          return (
            <ListItem onPress={() => setSelected(item.value)} key={item.name}>
              <Left>
                <Text>{item.name}</Text>
              </Left>
              <Right>
                <Radio selected={selected == item.value} />
              </Right>
            </ListItem>
          );
        })}
        {selected == 3 ? (
          <Dropdown
            placeholder={{
              label: "Select type",
              value: null,
              color: "red",
            }}
            onValueChange={(e) => setCard(e)}
            items={paymentCards}
            value={card}
          />
        ) : null}
        <View style={{ marginTop: 60, alignSelf: "center" }}>
          <TouchableOpacity
            onPress={() => paymentConfirm()}
            style={{
              backgroundColor: "#1e90ff",
              width: 200,
              height: 60,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 30,
              marginTop: 40,
            }}
          >
            <Text>Checkout</Text>
          </TouchableOpacity>
        </View>
      </Content>
    </Container>
  );
};
export default Payment;
