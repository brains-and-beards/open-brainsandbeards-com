import _ from 'lodash'
import React, { useEffect, useState } from 'react'

export interface TrustItem {
  value: string
  label: string
}

interface Props {
  trustItems?: TrustItem[]
}

const baseItems: TrustItem[] = [
  {
    value: String(new Date().getFullYear() - 2015),
    label: 'years on the market'
  },
  {
    value: '12+',
    label: 'average years of programming experience on our team'
  }
]

export default function TrustBarItems({ trustItems }: Props) {
  const [items, setItems] = useState<TrustItem[]>([])

  useEffect(() => {
    const extraItems = trustItems ?? [
      { value: '6 years', label: 'longest ongoing client engagement' },
      { value: '25', label: 'satisfied clients' },
      {
        value: (
          <>
            4.8 <span style={{ position: 'relative', top: -2 }}>⭑</span>
          </>
        ),
        label: 'average store rating of our mobile apps'
      }
      //   { value: '2', label: 'in-house open-source projects' }
    ]

    setItems([...baseItems, _.shuffle(extraItems)[0]])
  }, [trustItems])

  return (
    <ul className="trustBarList row">
      {items.map(({ value, label }) => (
        <li className="trustBarItem" key={label}>
          <h2>{value}</h2>
          <p className="sub2">{label}</p>
        </li>
      ))}
    </ul>
  )
}
