import React, { useState, useEffect } from 'react';
import { NavBar } from './componentes/Navbar';
import { Paises } from './componentes/Paises';
import { Cards } from './componentes/Cards';
import { Graficos } from './componentes/Graficos';

import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const App = () => {

    const [pais, setPais] = useState("");
    const [data, setData] = useState({});

    // cargara cada vez que 'pais' del useState cambie...
    useEffect(() => {

        const cargarDatos = async() => {

            const apiData = await fetchDatos(pais);
            setData(apiData);
        }

        cargarDatos();

    }, [pais]);

    console.log(data)

    // Esta funcion se envia mediante props a componente Paises 
    // donde recibe en App el pais que se eligio en el select de Paises y 
    // lo almacena en setPais acá.
    const paisForm = async(paisElegido) => {

        setPais(paisElegido);

    }

    const fetchDatos = async(pais) => {

        let url = "";

        if(pais === "" || pais === "World"){

            url = "https://covid19.mathdro.id/api";

        }else{

            url = `https://covid19.mathdro.id/api/countries/${ pais }`;

        }

        try {

            const data = await axios.get(url);
            return data;

        } catch(err) {

            console.log(err);

        }

    }

    return (

        <div>
            <NavBar />
            <Container fluid>
                <Row>

                    <Col xl={2}>
                        <Paises paisForm={paisForm}/>
                    </Col>
                    
                    <Col xl={8}>

                        <Graficos pais={pais} data={data} />
                        
                    </Col>
                    
                    <Col xl={2}>
                        <Cards data={data}/>
                    </Col>
                
                </Row>

            </Container>

        </div>

    )

}
