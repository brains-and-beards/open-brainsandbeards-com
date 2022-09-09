import React from 'react'
import Rakuten from '../assets/client-logos/rakuten.png'
import Sharoo from '../assets/client-logos/sharoo.png'
import Xing from '../assets/client-logos/xing.png'
import Mobilab from '../assets/client-logos/mobilab.png'
import Vermietet from '../assets/client-logos/vermietet.png'
import Visca from '../assets/client-logos/visca.png'
import Clincase from '../assets/client-logos/clincase.png'
import Saloodo from '../assets/client-logos/saloodo.png'
import Metro from '../assets/client-logos/metro.png'
import Kidpick from '../assets/client-logos/kidpick.png'
import LokalPortal from '../assets/client-logos/lokalportal.png'
import Donut from '../assets/client-logos/donut.png'
import Ree from '../assets/client-logos/ree.png'
import ManoMano from '../assets/client-logos/mano-mano.png'
import Femtasy from '../assets/client-logos/femtasy.png'

const featuredClients = [
  { image: Rakuten, height: 50, name: 'Rakuten' },
  { image: Sharoo, height: 50, name: 'Sharoo' },
  { image: Xing, height: 60, name: 'XING' },
  { image: Metro, height: 45, name: 'Metro' },
]

const allClients = [
  featuredClients,
  [
    { image: Mobilab, height: 27, name: 'Mobilab' },
    { image: Kidpick, height: 70, name: 'KidPick' },
    { image: Visca, height: 45, name: 'Visca' },
    { image: Saloodo, height: 65, name: 'Saloodo' },
  ],
  [
    { image: Clincase, height: 30, name: 'Clincase' },
    { image: Vermietet, height: 50, name: 'Vermietet' },
    { image: LokalPortal, height: 40, name: 'LokalPortal' },
    { image: Donut, height: 40, name: 'Donut' },
  ],
  [
    { image: Ree, height: 30, name: 'Ree' },
    { image: ManoMano, height: 50, name: 'ManoMano' },
    { image: Femtasy, height: 50, name: 'Femtasy' },
  ],
]

function ClientLogos({ short }) {
  const clientRows = short ? [featuredClients] : allClients

  return (
    <div className="clients">
      {clientRows.map((clients) => (
        <div className="logos">
          {clients.map((client) => (
            <div className="logo" key={`logo-${client.name}`}>
              <img
                src={client.image}
                height={client.height}
                alt={client.name}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default ClientLogos
