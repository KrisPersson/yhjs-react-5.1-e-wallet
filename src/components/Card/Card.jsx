import './Card.css'

import LightChipLogo from '../../assets/chip-light.svg'
import DarkChipLogo from '../../assets/chip-dark.svg'

import BitcoinLogo from '../../assets/vendor-bitcoin.svg'
import BlockchainLogo from '../../assets/vendor-blockchain.svg'
import EvilLogo from '../../assets/vendor-evil.svg'
import NinjaLogo from '../../assets/vendor-ninja.svg'

const vendors = {
    bitcoin: {
        logo: BitcoinLogo,
        background: 'rgb(255, 174, 52)',
        chip: DarkChipLogo,
        mainTextColor: 'rgb(0 0 0)',
        secondaryTextColor: 'rgb(0 0 0 / 0.8)'
    },
    blockchain: {
        logo: BlockchainLogo,
        background: 'rgb(139, 88, 249)',
        chip: LightChipLogo,
        mainTextColor: 'rgb(255 255 255)',
        secondaryTextColor: 'rgb(255 255 255)'
    },
    evil: {
        logo: EvilLogo,
        background: 'rgb(243, 51, 85)',
        chip: LightChipLogo,
        mainTextColor: 'rgb(255 255 255)',
        secondaryTextColor: 'rgb(255 255 255)'
    },
    ninja: {
        logo: NinjaLogo,
        background: 'rgb(34, 34, 34)',
        chip: LightChipLogo,
        mainTextColor: 'rgb(255 255 255)',
        secondaryTextColor: 'rgb(255 255 255)'
    },
    empty: {
        logo: BitcoinLogo,
        background: 'rgb(208 208 208)',
        chip: DarkChipLogo,
        mainTextColor: 'rgb(0 0 0)',
        secondaryTextColor: 'rgb(0 0 0 / 0.8)'
    }
}




function Card({cardNumber, cardHolder, validThru, vendor, clickHandler, deleteHandle, active, privateMode}) {
    let group = [
        'XXXX',
        'XXXX',
        'XXXX',
        'XXXX'
    ]

    if (cardNumber.length === 16) {
        let newArr = []
        let j = 0
        for (let i = 0; i < group.length; i++) {
            newArr.push(cardNumber.slice(j, (j + 4)))
            j += 4
        }
        group = newArr
    }


    return (
        <article number={ cardNumber } onClick={ clickHandler } className='card' style={{background: `${vendors[vendor].background}`, color: `${vendors[vendor].mainTextColor}`}}>
            <section className='card__inner-container'>
                <img className='card__chip' src={ vendors[vendor].chip } alt="chip" />
                <img className='card__vendor' src={ vendors[vendor].logo } alt="vendor" />
                <section className='full-card-number'>
                    <p className='card-nr card-nr--1'>{ privateMode ? '****' : group[0] }</p>
                    <p className='card-nr card-nr--2'>{ privateMode ? '****' : group[1] }</p>
                    <p className='card-nr card-nr--3'>{ privateMode ? '****' : group[2] }</p>
                    <p className='card-nr card-nr--4'>{ group[3] }</p>
                </section>
                <h4 className='card__cardholder-name' style={{color: vendors[vendor].secondaryTextColor}}>CARDHOLDER NAME</h4>
                <h4 className='card__valid-thru'>VALID THRU</h4>
                <p className='card__cardholder-name '>{ cardHolder }</p>
                <p className='card__valid-thru'>{ `${validThru[0]}${validThru[1]}/${validThru[2]}${validThru[3]} `}</p>


            </section>
            {active && <i onClick={deleteHandle} className="fa-regular fa-trash-can delete-card-btn"></i>}

        </article>
    )
}

export default Card