import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './App.css'

import Header from '../components/Header/Header'
import Card from '../components/Card/Card'

function App() {
  const navigate = useNavigate()


  const [privateMode, setPrivateMode] = useState(true)
  const [savedCards, setSavedCards] = useState([])
  const [activeCard, setActiveCard] = useState(
    {
      cardHolder: '',
      validThru: '',
      cardNumber: '',
      vendor: ''
    }
  )

  useEffect(() => {
    if (localStorage.getItem('savedCards')) {
      setSavedCards(JSON.parse(localStorage.getItem('savedCards')))
    }
  }, [])


  function handleClick() {
    navigate('/addcard')
  }

  function deleteHandle(event) {
    const currentCard = event.currentTarget.parentNode.getAttribute('number')
    
    const updatedCards = savedCards.filter(card => card.cardNumber !== currentCard)

    localStorage.setItem('savedCards', JSON.stringify(updatedCards))
    setActiveCard({
      cardHolder: '',
      validThru: '',
      cardNumber: '',
      vendor: ''
    })
    setSavedCards(updatedCards)
}

  function handleSetActiveCard(event) {
    const number = event.currentTarget.getAttribute('number')
    const selectedCard = savedCards.filter(card => card.cardNumber === number)[0]
    setActiveCard(selectedCard)
  }

  function flipPrivateMode() {
    setPrivateMode((prev) => !prev)
  }


  return (
    <section className="view view--app">
      <Header 
        headerText={ 'E-WALLET' }
        privateMode={privateMode}
        flipPrivateMode={flipPrivateMode}
      />
      <h3>ACTIVE CARD</h3>
      { activeCard.cardNumber ?
        <Card 
          cardHolder={activeCard.cardHolder} 
          validThru={activeCard.validThru} 
          cardNumber={activeCard.cardNumber}
          vendor={activeCard.vendor}
          deleteHandle={ deleteHandle }
          active={true}
          privateMode={privateMode}
        />
      : <article className='phantom-card'>
          <h3>{ savedCards.length < 1 ? <Link to='/addcard'>Add your first card!</Link> 
                : 'Click on a card below to make it active'
              }
          </h3>
        </article>
      }
      <section className='saved-cards-container' style={{height: `${15.0625 + (3.0625 * (savedCards.length - 1))}rem`}}>
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
                  active={false}
                  privateMode={privateMode}

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
