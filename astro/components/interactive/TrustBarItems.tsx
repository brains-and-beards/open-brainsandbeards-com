import _ from 'lodash'
import React, { useEffect, useState } from 'react'

export interface TrustItem {
  value: string
  label: string
}

interface Props {
  trustItems?: TrustItem[]
}

export default function TrustBarItems({ trustItems }: Props) {
  const [items, setItems] = useState<TrustItem[]>([])

  useEffect(() => {
    const availableItems = trustItems ?? [
      {
        value: String(new Date().getFullYear() - 2015),
        label: 'years on the market'
      },
      { value: '6 years', label: 'longest ongoing client engagement' },
      { value: '16', label: 'satisfied clients' },
      {
        value: '12+',
        label: 'average years of programming experience on our team'
      },
      { value: '4.76 stars', label: 'average store rating of our mobile apps' },
      { value: '2', label: 'in-house open-source projects' }
    ]

    setItems(_.shuffle(availableItems).slice(0, 3))
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
