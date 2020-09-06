import React from 'react';

import CountUp from 'react-countup';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';

export const Cards = ({ data }) => {

    if(!data.data) {

        return "Cargando ...";
        
    } else {
        return (

            <div>
                <Row>
                    <Card>
                        <Card.Body>

                            <Card.Title>Número de contagiados</Card.Title>

                            <Card.Text>

                                <CountUp 
                                    start = { 0 }
                                    end = { data.data.confirmed.value }
                                    duration = { 3 }
                                    separator = "."
                                />

                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>

                            <Card.Title>Número de muertos</Card.Title>

                            <Card.Text>

                                <CountUp 
                                    start = { 0 }
                                    end = { data.data.deaths.value }
                                    duration = { 3 }
                                    separator = "."
                                />

                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>

                            <Card.Title>Número de recuperados</Card.Title>

                            <Card.Text>

                                <CountUp 
                                    start = { 0 }
                                    end = { data.data.recovered.value }
                                    duration = { 3 }
                                    separator = "."
                                />

                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Row>
            </div>

        );



    }



}
