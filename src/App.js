import React from 'react'
import { Form } from 'react-bootstrap'
import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend } from 'chart.js'
import { PolarArea } from 'react-chartjs-2'

import './App.scss'

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend)

function App() {
  const [areas, setAreas] = React.useState([
    { area: 'Espiritual', value: undefined },
    { area: 'Matrimonio / Relación Intima', value: undefined },
    { area: 'Social y Diversión', value: undefined },
    { area: 'Salud y autocuidado', value: undefined },
    { area: 'Finanzas', value: undefined },
    { area: 'Comunidad (Familia y amigos)', value: undefined },
    { area: 'Trabajo / Carrera', value: undefined },
    { area: 'Crecimiento personal', value: undefined },
  ])

  const data = {
    labels: areas.map((a) => a.area),
    datasets: [
      {
        label: 'Rueda de la Vida',
        data: areas.map((a) => a.value),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          'rgb(46,139,87, 0.5)',
          'rgb(255, 0, 242, 0.5)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    updateMode: 'resize',
    scales: {
      r: {
        angleLines: {
          display: false,
        },
        min: 0,
        max: 10,
      },
    },
  }

  const handleInputChange = (area, event) => {
    const value = parseInt(event.target.value, 10)

    if (value > 10) {
      return
    }

    const newAreas = areas.map((a) => {
      if (a.area === area.area) {
        return { ...a, value }
      } else {
        return a
      }
    })
    setAreas(newAreas)
  }

  return (
    <div id="WheelOfLife">
      <h1>Rueda de la Vida</h1>
      <div className="wol-form">
        {areas.map((a) => {
          return (
            <Form.Group>
              <Form.Label>{a.area}</Form.Label>
              <Form.Control type="number" max="10" value={a.value} onChange={(event) => handleInputChange(a, event)} />
            </Form.Group>
          )
        })}
      </div>
      <div id="polar-area-chart">
        <PolarArea data={data} options={options} />
      </div>
    </div>
  )
}

export default App
