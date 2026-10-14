import _ from 'lodash'
import React, { useEffect, useState } from 'react'

import AnimatedNumber from './AnimatedNumber'

export interface TrustItem {
  value: number
  unit?: string
  label: string
}

interface Props {
  trustItems?: TrustItem[]
}

const baseItems: TrustItem[] = [
  {
    value: new Date().getFullYear() - 2015,
    label: 'years on the market'
  },
  {
    value: 12,
    unit: '+',
    label: 'average years of programming experience on our team'
  }
]

export default function TrustBarItems({ trustItems }: Props) {
  const [items, setItems] = useState<TrustItem[]>([])

  useEffect(() => {
    const availableItems = trustItems ?? [
      {
        value: new Date().getFullYear() - 2015,
        label: 'years on the market'
      },
      { value: 6, unit: 'years', label: 'longest ongoing client engagement' },
      { value: 25, label: 'satisfied clients' },
      {
        value: 4.8,
        unit: <span style={{ position: 'relative', top: -2 }}>⭑</span>,
        label: 'average store rating of our mobile apps'
      }
      // { value: 2, label: "in-house open-source projects" },
    ]

    setItems([...baseItems, _.shuffle(availableItems)[0]])
  }, [trustItems])

  return (
    <ul className="trustBarList row">
      {items.map(({ value, unit, label }) => (
        <li className="trustBarItem" key={label}>
          <h2 aria-label={`${value}${unit}`}>
            <AnimatedNumber value={value} />
            {unit && (
              <span aria-hidden="true">
                {unit !== '+' && ' '}
                {unit}
              </span>
            )}
          </h2>
          <p className="sub2">{label}</p>
        </li>
      ))}
    </ul>
  )
}
