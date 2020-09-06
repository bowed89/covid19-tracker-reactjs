import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line, Doughnut } from 'react-chartjs-2';

export const Graficos = ({ data, pais }) => {

    const [datosDiarios, setDatosDiarios] = useState({});

    useEffect(() => {

        const cargarDatos = async() => {

            const data = await cargarDatosDiarios();
            setDatosDiarios(data);

        };

        cargarDatos();

    });
    
    const cargarDatosDiarios = async() => {

        try {

            const data = await axios.get("https://covid19.mathdro.id/api/daily");
            return data;

        } catch(err) {

            console.log(err);

        }

    };

    let chart;

    if( datosDiarios.data && (pais === "World" || pais === "") ) {

        chart = (
            <Line 
                data={{
                    labels: datosDiarios.data.map(e => e.reportDate),
                    datasets: [{
                        data: datosDiarios.data.map(e => e.confirmed.total),
                        label: 'Infectados',
                        borderColor: 'red',
                        fill: true
                    }, {
                        data: datosDiarios.data.map(e => e.deaths.total),
                        label: 'Muertos',
                        borderColor: 'black',
                        fill: true
                    }]
                }}

                options={{
                    legend: {
                        labels: {
                            fontColor: 'black',
                            fontSize: 18
                        }
                    },
                    title: {
                        display: true,
                        text: 'Coronavirus en el mundo',
                        fontColor: 'black'
                    }
                }}
            />
        )
    } else if(data.data) {

        chart = (
            <Doughnut 
                data={{
                    labels: ['Infectados', 'Recuperados', 'Muertos'],
                    datasets: [{
                        label: 'Gente',
                        backgroundColor: [
                            'cornflowerblue',
                            'grey',
                            'red'
                        ],
                        data: [data.data.confirmed.value, data.data.recovered.value, data.data.deaths.value]
                    }]
                }}

                options={{
                    legend: {
                        display: true,
                        fontColor: 'white'
                    },
                    title: {
                        display: true, 
                        text: `Coronavirus en ${pais}`,
                        fontColor: 'black'
                    }
                }}
            />
        );

    }

    if(!data.data) {

        return "Cargando ...";

    } else {

        return (

            <div>

                { chart }
            
            </div>

        );

    }
}
