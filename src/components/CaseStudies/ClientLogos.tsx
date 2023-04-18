import React from "react";
import { StaticImage } from "gatsby-plugin-image";

const featuredClients = [
  {
    image: (
      <StaticImage
        src="../../assets/client-logos/rakuten.png"
        alt="Rakuten"
        height={50}
      />
    ),
    name: "Rakuten",
  },
  {
    image: (
      <StaticImage
        src="../../assets/client-logos/mano-mano.png"
        alt="ManoMano"
        height={50}
      />
    ),
    name: "ManoMano",
  },
  {
    image: (
      <StaticImage
        src="../../assets/client-logos/xing.png"
        alt="XING"
        height={60}
      />
    ),
    name: "XING",
  },
  {
    image: (
      <StaticImage
        src="../../assets/client-logos/metro.png"
        alt="Metro"
        height={45}
      />
    ),
    name: "Metro",
  },
];

const allClients = [
  featuredClients,
  [
    {
      image: (
        <StaticImage
          src="../../assets/client-logos/mobilab.png"
          alt="Mobilab"
          height={27}
        />
      ),
      name: "Mobilab",
    },
    {
      image: (
        <StaticImage
          src="../../assets/client-logos/bsdex.png"
          alt="BSDEX"
          height={70}
        />
      ),
      name: "BSDEX",
    },
    {
      image: (
        <StaticImage
          src="../../assets/client-logos/live-art.png"
          alt="LiveArt"
          height={50}
        />
      ),
      name: "LiveArt",
    },
    {
      image: (
        <StaticImage
          src="../../assets/client-logos/vay.png"
          alt="Vay"
          height={30}
        />
      ),
      name: "Vay",
    },
  ],
  [
    {
      image: (
        <StaticImage
          src="../../assets/client-logos/femtasy.png"
          alt="Femtasy"
          height={50}
        />
      ),
      name: "Femtasy",
    },
    {
      image: (
        <StaticImage
          src="../../assets/client-logos/vermietet.png"
          alt="Vermietet"
          height={50}
        />
      ),
      name: "Vermietet",
    },
    {
      image: (
        <StaticImage
          src="../../assets/client-logos/lokalportal.png"
          alt="LokalPortal"
          height={40}
        />
      ),
      name: "LokalPortal",
    },
    {
      image: (
        <StaticImage
          src="../../assets/client-logos/donut.png"
          alt="Donut"
          height={40}
        />
      ),
      name: "Donut",
    },
  ],
  [
    {
      image: (
        <StaticImage
          src="../../assets/client-logos/saloodo.png"
          alt="Saloodo"
          height={65}
        />
      ),
      name: "Saloodo",
    },
    {
      image: (
        <StaticImage
          src="../../assets/client-logos/sharoo.png"
          alt="Sharoo"
          height={50}
        />
      ),
      name: "Sharoo",
    },
    {
      image: (
        <StaticImage
          src="../../assets/client-logos/clincase.png"
          alt="Clincase"
          height={30}
        />
      ),
      name: "Clincase",
    },
    {
      image: (
        <StaticImage
          src="../../assets/client-logos/visca.png"
          alt="Visca"
          height={45}
        />
      ),
      name: "Visca",
    },
  ],
];

function ClientLogos({ short }: { short?: boolean }) {
  const clientRows = short ? [featuredClients] : allClients;

  return (
    <div className="clients">
      {clientRows.map((clients, rowIndex) => (
        <div key={rowIndex} className="logos">
          {clients.map(({ name, image }) => (
            <div className="logo" key={`logo-${name}`}>
              {image}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default ClientLogos;
