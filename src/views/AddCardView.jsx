import './AddCardView.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header/Header'
import Card from '../components/Card/Card'

import selectArrow from '../assets/select-arrow.png'

function AddCardView() {



    const [cardNumber, setCardNumber] = useState('XXXXXXXXXXXXXXXX')
    const [cardHolder, setCardHolder] = useState('FIRSTNAME LASTNAME')
    const [validThru, setValidThru] = useState('MMYY')
    const [ccv, setCcv] = useState('')
    const [vendor, setVendor] = useState('empty')

    const navigate = useNavigate()

    function handleCardNumber(event) {
        const value = event.target.value
        const arr = []
        for (let i = 0; i < 16; i++) {
            if (value[i] !== undefined) {
                arr.push(value[i])
            } else {
                arr.push('X')
            }
        }
        setCardNumber(arr.join(''))
    }

    function handleCardholder(event) {
        const value = event.target.value
        setCardHolder(value)
    }

    function handleValidThru(event) {
        const value = event.target.value
        const arr = []
        for (let i = 0; i < 4; i++) {
            if (value[i] !== undefined) {
                arr.push(value[i])
            } else if (i < 2) {
                arr.push('M')
            } else {
                arr.push('Y')
            }
        }
        setValidThru(arr.join(''))
    }

    function handleCCV(event) {
        const value = event.target.value
        if (value.length < 4) {
            setCcv(value)
        }
    }

    function handleVendor(event) {
        const value = event.target.value
        setVendor(value)
    }

    function submitHandler(event) {
        event.preventDefault()

        const newCard = {
            cardHolder: cardHolder,
            validThru: validThru,
            cardNumber: cardNumber,
            vendor: vendor
        }

        const currentYear = new Date().toString().split(' ')[3].slice(2, 4)

        if (cardNumber.length === 16
            && cardHolder.length > 3
            && Number(validThru[0]) < 2
            && Number(validThru[1]) < 3
            && Number(validThru.slice(2, 4)) >= Number(currentYear)

            
            ) {
                
                if (localStorage.getItem('savedCards')) {
                    const cards = JSON.parse(localStorage.getItem('savedCards')) 
                    cards.push(newCard)
                    localStorage.setItem('savedCards', JSON.stringify(cards))
                } else {
                    localStorage.setItem('savedCards', JSON.stringify([newCard]))
                }
                
                navigate('/')
            }

        
    }

    return (
        <section className='view view--add-card'>
            <Header headerText={ 'ADD A NEW BANK CARD' } />
            <h3>NEW CARD</h3>
            <Card 
                cardNumber={ cardNumber }
                cardHolder={ cardHolder }
                validThru={ validThru }
                vendor={ vendor }
                // privateMode={privateMode}

            />
            <form onSubmit={ submitHandler }>
                <label>
                    CARD NUMBER 
                    <input required maxLength={16} onChange={ handleCardNumber } type="text" />
                </label>
                <label>
                    CARDHOLDER NAME
                    <input onChange={ handleCardholder } type="text" placeholder='FIRSTNAME LASTNAME' />
                </label>
                <section className='form__short-inputs-container'>
                    <label>
                        VALID THRU (MMYY)
                        <input onChange={ handleValidThru } type="number" />
                    </label>
                    <label>
                        CCV 
                        <input onChange={ handleCCV } type="number" />
                    </label>
                </section>
                <label>
                    VENDOR
                    <img className='form__select-arrow' src={ selectArrow } alt="" />
                    <select onChange={ handleVendor } name="vendor" id="vendor-input" defaultValue={'empty'}>
                        <option value="empty">-none selected-</option>
                        <option value="bitcoin">Bitcoin</option>
                        <option value="ninja">Ninja</option>
                        <option value="blockchain">Blockchain</option>
                        <option value="evil">Evil Corp</option>
                    </select>
                </label>
                <button>ADD CARD</button>
            </form>
        </section>
    )
}

export default AddCardView