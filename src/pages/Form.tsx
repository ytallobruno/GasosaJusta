import { Button, ButtonGroup } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import {
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
} from "@chakra-ui/input";
import { Stack } from "@chakra-ui/layout";
import { Component } from "react";
import FuelCost from "../components/FuelCost";
import { HStack, Switch } from "@chakra-ui/react";
import { GasFormDetails } from "../types/GasFormDetails.interface";

type Props = Record<string, never>;

export default class GasForm extends Component<Props, GasFormDetails> {
  state: GasFormDetails = {
    distance: 0,
    consume: 0,
    price: 0,
    people: 2,
    toll: false,
    tollValue: 0,
    showResult: false,
    tempDistance: "0",
    tempConsume: "0",
    tempPrice: "0,00",
    tempPeople: "2",
    tempTollValue: "0,00",
    calculatedOnce: false,
    errors: {
      distance: false,
      consume: false,
      price: false,
    },
  };

  handleEmptyInput = (value: string) => {
    return value === "" ? "0" : value;
  };

  formatInputValue = (name: string, value: string) => {
    if (name === "price" || name === "tollValue") {
      return this.formatPrice(value);
    }
    return value.replace(/^0+(?!$)/, "");
  };

  formatPrice = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    const formattedValue = (parseInt(numericValue, 10) / 100)
      .toFixed(2)
      .replace(".", ",");
    return formattedValue;
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const formattedValue = this.formatInputValue(name, value);
    const finalValue = this.handleEmptyInput(formattedValue);
    const parsedValue = parseFloat(finalValue.replace(",", "."));

    if (parsedValue < 0) {
      return;
    }

    this.setState((prevState) => ({
      ...prevState,
      [`temp${name.charAt(0).toUpperCase() + name.slice(1)}`]: finalValue,
      ...(prevState.calculatedOnce && {
        [name]: parsedValue,
      }),
      errors: {
        ...prevState.errors,
        [name]: parsedValue <= 0,
      },
    }));
  };

  handleSwitchChange = () => {
    this.setState((prevState) => ({
      toll: !prevState.toll,
    }));
  };

  validateInputs = () => {
    const { tempDistance, tempConsume, tempPrice, tempPeople } = this.state;
    const errors = {
      distance: parseFloat(tempDistance) <= 0,
      consume: parseFloat(tempConsume) <= 0,
      price: parseFloat(tempPrice.replace(",", ".")) <= 0,
      people: parseFloat(tempPeople) < 1,
    };
    this.setState({ errors });
    return (
      !errors.distance && !errors.consume && !errors.price && !errors.people
    );
  };

  handleCalculate = () => {
    if (this.validateInputs()) {
      this.setState((prevState) => ({
        distance: parseFloat(prevState.tempDistance),
        consume: parseFloat(prevState.tempConsume),
        price: parseFloat(prevState.tempPrice.replace(",", ".")),
        people: parseFloat(prevState.tempPeople),
        tollValue: parseFloat(prevState.tempTollValue.replace(",", ".")),
        showResult: true,
        calculatedOnce: true,
      }));
    }
  };

  handleClearInputs = () => {
    this.setState({
      tempDistance: "0",
      tempConsume: "0",
      tempPrice: "0,00",
      tempPeople: "2",
      tempTollValue: "0,00",
    });
  };

  render() {
    const {
      distance,
      consume,
      price,
      people,
      toll,
      tollValue,
      showResult,
      tempDistance,
      tempConsume,
      tempPrice,
      tempPeople,
      tempTollValue,
      errors,
    } = this.state;

    return (
      <>
        <FormControl>
          <Stack>
            <FormLabel>Distância da viagem</FormLabel>
            <InputGroup size="sm" marginBottom="4">
              <Input
                type="number"
                placeholder="0"
                name="distance"
                value={tempDistance}
                onChange={this.handleChange}
                autoFocus
                borderColor={errors.distance ? "red" : undefined}
              />
              <InputRightAddon>km</InputRightAddon>
            </InputGroup>

            <FormLabel>Consumo do veículo</FormLabel>
            <InputGroup size="sm" marginBottom="4">
              <Input
                type="number"
                placeholder="0"
                name="consume"
                value={tempConsume}
                onChange={this.handleChange}
                borderColor={errors.consume ? "red" : undefined}
              />
              <InputRightAddon>km/L</InputRightAddon>
            </InputGroup>

            <FormLabel>Preço da gasolina</FormLabel>
            <InputGroup size="sm" marginBottom="4">
              <InputLeftAddon>R$</InputLeftAddon>
              <Input
                type="text"
                placeholder="00,00"
                name="price"
                value={tempPrice}
                onChange={this.handleChange}
                borderColor={errors.price ? "red" : undefined}
              />
              <InputRightAddon>por L</InputRightAddon>
            </InputGroup>

            <FormLabel>Quantidade de pessoas</FormLabel>
            <InputGroup size="sm" marginBottom="4">
              <Input
                type="number"
                defaultValue="2"
                name="people"
                min="1"
                value={tempPeople}
                onChange={this.handleChange}
              />
              <InputRightAddon>pessoas</InputRightAddon>
            </InputGroup>

            <HStack>
              <FormLabel>Incluir pedágio?</FormLabel>
              <Switch
                colorScheme="teal"
                isChecked={toll}
                onChange={this.handleSwitchChange}
              />
            </HStack>

            {toll && (
              <InputGroup size="sm">
                <InputLeftAddon>R$</InputLeftAddon>
                <Input
                  type="text"
                  placeholder="00,00"
                  name="tollValue"
                  value={tempTollValue}
                  onChange={this.handleChange}
                />
              </InputGroup>
            )}
          </Stack>

          <ButtonGroup spacing="4" marginBottom="4" marginTop="4">
            <Button
              onClick={this.handleCalculate}
              colorScheme="teal"
              variant="solid"
            >
              Calcular
            </Button>
            <Button
              onClick={this.handleClearInputs}
              colorScheme="teal"
              variant="outline"
            >
              Limpar
            </Button>
          </ButtonGroup>
        </FormControl>

        {showResult && (
          <FuelCost
            distance={distance}
            consume={consume}
            price={price}
            people={people}
            toll={toll}
            tollValue={tollValue}
          />
        )}
      </>
    );
  }
}
