import { useState } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import './App.css'

import Header from '../components/Header/Header'
import Card from '../components/Card/Card'

function App() {


  const [activeCard, setActiveCard] = useState(
    {
      cardHolder: '',
      validThru: '',
      cardNumber: '',
      vendor: ''
    }
  )
  const [savedCards, setSavedCards] = useState([
    // {
    //   cardHolder: 'KRISTOFER PERSSON',
    //   validThru: '12/23',
    //   cardNumber: '1234567890123456',
    //   vendor: 'bitcoin'
    // }
    // {
    //   cardHolder: 'KRISTOFER PERSSON',
    //   validThru: '1223',
    //   cardNumber: '1234561736408456',
    //   vendor: 'ninja'
    // },
    // {
    //   cardHolder: 'KRISTOFER PERSSON',
    //   validThru: '1223',
    //   cardNumber: '1234567890120089',
    //   vendor: 'blockchain'
    // },
    // {
    //   cardHolder: 'KRISTOFER PERSSON',
    //   validThru: '1223',
    //   cardNumber: '1234567890121233',
    //   vendor: 'evil'
    // }
  ])
  const [lastKey, setLastKey] = useState('')

  const location = useLocation()
  console.log(location)
  if (location.key !== lastKey && location.state != null) {

    const newCard = {
      cardHolder: location.state.cardHolder,
      validThru: location.state.validThru,
      cardNumber: location.state.cardNumber,
      vendor: location.state.vendor
    }

    setLastKey(location.key)
    setSavedCards(currentCards => {
      return [...currentCards, newCard]
    })
  }
  

  const navigate = useNavigate()

  function handleClick() {
    navigate('/addcard')
  }

  function handleSetActiveCard(event) {
    const number = event.currentTarget.getAttribute('number')
    const selectedCard = savedCards.filter(card => card.cardNumber === number)[0]
    setActiveCard(selectedCard)
    console.log(selectedCard)
  }


  return (
    <section className="view view--app">
      <Header headerText={ 'E-WALLET' } />
      <h3>ACTIVE CARD</h3>
      { activeCard.cardNumber ?
        <Card 
          cardHolder={activeCard.cardHolder} 
          validThru={activeCard.validThru} 
          cardNumber={activeCard.cardNumber}
          vendor={activeCard.vendor}
        />
      : <article className='phantom-card'>
          <h3>{ savedCards.length < 1 ? <Link to='/addcard'>Add your first card!</Link> 
                : 'Click on a card below to make it active'
              }
          </h3>
        </article>
      }
      <section className='saved-cards-container' style={{height: `${15.0625 + (3.0625 * (savedCards.length - 2))}rem`}}>
        {
          savedCards.length === 0 ? <article className='phantom-card'><h2>No Saved Cards</h2></article> :
          savedCards.length === 1 && activeCard.cardNumber ? <article className='phantom-card'><Link to='/addcard'><h2>Add a Second Card</h2></Link></article> :
          savedCards.map((card, i) => {
            if (card.cardNumber !== activeCard.cardNumber) {
              return (
                <Card 
                  cardHolder={card.cardHolder} 
                  validThru={card.validThru}
                  cardNumber={card.cardNumber}
                  vendor={card.vendor}
                  key={i}
                  clickHandler={handleSetActiveCard}
                />)
            }
            
          })
        }
      </section>
      <button className='btn-navigate' onClick={ handleClick }>ADD A NEW CARD</button>
    </section>
  )
}

export default App
