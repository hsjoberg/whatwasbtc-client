import React from 'react';

export default function Price(props) {
  return (
    <div className="price-holder">
      {
        props.price ?
        <div>
          <h1 className="price">
            <span className="price__currency">{props.currency}</span>
            <span className="price__value">{props.price}</span>
          </h1>
        </div>
        :
        <div className="lead">
          <i>No price information.</i>
        </div>
      }
    </div>
  )
}
