import { Button, ButtonGroup } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import {
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
} from "@chakra-ui/input";
import { Stack } from "@chakra-ui/layout";
import React, { useState } from "react";
import FuelCost from "../components/FuelCost";
import { HStack, Switch } from "@chakra-ui/react";
import { GasFormDetails } from "../types/GasFormDetails.interface";
import {
  formatInputValue,
  handleEmptyInput,
  parseFloatWithComma,
} from "../utils/helpers";

const gasFormDefaultValues: GasFormDetails = {
  mainDetails: {
    distance: 0,
    consume: 0,
    price: 0,
    people: 2,
    hasToll: false,
    tollValue: 0,
    showResult: false,
    calculatedOnce: false,
  },
  tempValues: {
    tempDistance: "0",
    tempConsume: "0",
    tempPrice: "0,00",
    tempPeople: "2",
    tempTollValue: "0,00",
  },
  errors: {
    distance: false,
    consume: false,
    price: false,
  },
};

export default function GasForm(): React.ReactElement {
  const [state, setState] = useState<GasFormDetails>(gasFormDefaultValues);

  const updateState = (
    name: string,
    finalValue: string,
    parsedValue: number
  ) => {
    setState((prevState) => ({
      ...prevState,
      tempValues: {
        ...prevState.tempValues,
        [`temp${name.charAt(0).toUpperCase() + name.slice(1)}`]: finalValue,
      },
      ...(prevState.mainDetails.calculatedOnce && {
        mainDetails: {
          ...prevState.mainDetails,
          [name]: parsedValue,
        },
      }),
      errors: {
        ...prevState.errors,
        [name]: parsedValue <= 0,
      },
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const formattedValue = formatInputValue(name, value);
    const finalValue = handleEmptyInput(formattedValue);
    const parsedValue = parseFloatWithComma(finalValue);

    if (parsedValue < 0) {
      return;
    }

    updateState(name, finalValue, parsedValue);
  };

  const handleSwitchChange = () => {
    setState((prevState) => ({
      ...prevState,
      mainDetails: {
        ...prevState.mainDetails,
        hasToll: !prevState.mainDetails.hasToll,
      },
    }));
  };

  const validateInputs = () => {
    const { tempDistance, tempConsume, tempPrice, tempPeople } =
      state.tempValues;
    const errors = {
      distance: parseFloat(tempDistance) <= 0,
      consume: parseFloat(tempConsume) <= 0,
      price: parseFloatWithComma(tempPrice) <= 0,
      people: parseFloat(tempPeople) < 1,
    };
    setState((prevState) => ({ ...prevState, errors }));
    return (
      !errors.distance && !errors.consume && !errors.price && !errors.people
    );
  };

  const handleCalculateTotal = () => {
    if (validateInputs()) {
      setState((prevState) => ({
        ...prevState,
        mainDetails: {
          ...prevState.mainDetails,
          distance: parseFloat(prevState.tempValues.tempDistance),
          consume: parseFloat(prevState.tempValues.tempConsume),
          price: parseFloatWithComma(prevState.tempValues.tempPrice),
          people: parseFloat(prevState.tempValues.tempPeople),
          tollValue: parseFloatWithComma(prevState.tempValues.tempTollValue),
          showResult: true,
          calculatedOnce: true,
        },
      }));
    }
  };

  const handleClearInputs = () => {
    setState((prevState) => ({
      ...prevState,
      tempValues: {
        tempDistance: "0",
        tempConsume: "0",
        tempPrice: "0,00",
        tempPeople: "2",
        tempTollValue: "0,00",
      },
    }));
  };

  const setBorderColor = (fieldName: keyof GasFormDetails["errors"]) => {
    return state.errors[fieldName] ? "red" : undefined;
  };

  const {
    mainDetails: {
      distance,
      consume,
      price,
      people,
      hasToll,
      tollValue,
      showResult,
    },
    tempValues: {
      tempDistance,
      tempConsume,
      tempPrice,
      tempPeople,
      tempTollValue,
    },
  } = state;

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
              onChange={handleChange}
              autoFocus
              borderColor={setBorderColor("distance")}
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
              onChange={handleChange}
              borderColor={setBorderColor("consume")}
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
              onChange={handleChange}
              borderColor={setBorderColor("price")}
            />
            <InputRightAddon>por L</InputRightAddon>
          </InputGroup>

          <FormLabel>Quantidade de pessoas</FormLabel>
          <InputGroup size="sm" marginBottom="4">
            <Input
              type="number"
              name="people"
              min="1"
              value={tempPeople}
              onChange={handleChange}
            />
            <InputRightAddon>pessoas</InputRightAddon>
          </InputGroup>

          <HStack>
            <FormLabel>Incluir pedágio?</FormLabel>
            <Switch
              colorScheme="orange"
              isChecked={hasToll}
              onChange={handleSwitchChange}
            />
          </HStack>

          {hasToll && (
            <InputGroup size="sm">
              <InputLeftAddon>R$</InputLeftAddon>
              <Input
                type="text"
                placeholder="00,00"
                name="tollValue"
                value={tempTollValue}
                onChange={handleChange}
              />
            </InputGroup>
          )}
        </Stack>

        <ButtonGroup spacing="4" marginBottom="4" marginTop="4">
          <Button
            onClick={handleCalculateTotal}
            colorScheme="orange"
            variant="solid"
          >
            Calcular
          </Button>
          <Button
            onClick={handleClearInputs}
            colorScheme="orange"
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
          hasToll={hasToll}
          tollValue={tollValue}
        />
      )}
    </>
  );
}
