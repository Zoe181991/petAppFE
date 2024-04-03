import React from "react";
import { Card, CardBody, CardFooter, CardHeader, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CountAnimation from "../User/CountAnimation";
import ButtonStyled2 from "./ButtonStyled2";

function DashboardCard({
  isLoading,
  header,
  description,
  targetNumber,
  boldStatement,
  buttonText,
  buttonAction,
  icon,
}) {
  return (
    <Card
      size="md"
      minHeight="350px"
      bgColor="purple.50"
      _hover={{
        bgGradient: "linear(to-r, orange.200, pink.200)",
      }}
    >
      <CardHeader className="header-card">
        <Text fontSize="2xl" className="font-weird">
          {header}
        </Text>
        <FontAwesomeIcon size="xl" icon={icon} />
      </CardHeader>
      <CardBody>
        <Text>{description}</Text>
        {!isLoading && (
          <Text fontSize="5xl" fontWeight="extrabold">
            <CountAnimation
              duration={"2000"}
              targetNumber={targetNumber}
            ></CountAnimation>
          </Text>
        )}
        <Text fontSize="lg" color="blackAlpha.700" className="font-weird">
          {boldStatement}
        </Text>
      </CardBody>
      <CardFooter justify="center">
        <ButtonStyled2 text={buttonText} action={buttonAction} />
      </CardFooter>
    </Card>
  );
}

export default DashboardCard;
