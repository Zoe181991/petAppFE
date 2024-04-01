import React from 'react';
import {Button, Card, CardBody, CardFooter, CardHeader, Spacer, Text} from "@chakra-ui/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import CountAnimation from "../User/CountAnimation";
import ButtonStyled2 from "./ButtonStyled2";

function DashboardCard({isLoading, header, description, targetNumber, boldStatement, buttonText, buttonAction, icon}) {
    return (
        <Card minHeight='400px' bgColor='purple.50' _hover={{
            bgGradient: 'linear(to-r, orange.200, pink.200)',
        }} >
            <CardHeader className='header-card'>
                <Text fontSize='3xl' className='font-weird'> {header}
                </Text>
                <FontAwesomeIcon size='xl' icon={icon} />
            </CardHeader>
            <CardBody>
                <Text>{description}</Text>
                {!isLoading &&
                    <Text fontSize='6xl' fontWeight='extrabold'>
                        <CountAnimation duration={"2000"} targetNumber={targetNumber}>
                        </CountAnimation></Text>}
                <Text fontSize='xl' color='blackAlpha.700' className='font-weird'>{boldStatement}</Text>
            </CardBody>
            <CardFooter justify='center'>
                <ButtonStyled2 text={buttonText} action={buttonAction}/>
            </CardFooter>
        </Card>
    );
}

export default DashboardCard;