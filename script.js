function validateForm() {
    const cardName = document.getElementById('cardName').value.trim();
    const cardNumber = document.getElementById('cardNumber').value.trim();
    const expMonth = document.getElementById('expMonth').value.trim();
    const expYear = document.getElementById('expYear').value.trim();
    const cvc = document.getElementById('cvc').value.trim();
    
    const nameError = document.getElementById('nameError');
    const numberError = document.getElementById('numberError');
    const dateError = document.getElementById('dateError');
    const cvcError = document.getElementById('cvcError');
    
    let isValid = true;

    // Clear previous error messages
    nameError.textContent = '';
    numberError.textContent = '';
    dateError.textContent = '';
    cvcError.textContent = '';

    // Name validation
    if (cardName === '') {
        nameError.textContent = 'Please input a valid name';
        isValid = false;
    }

    // Card number validation
    const cardNumberPattern = /^\d{4} \d{4} \d{4} \d{4}$/;
    if (!cardNumberPattern.test(cardNumber)) {
        numberError.textContent = 'Wrong format, numbers only';
        isValid = false;
    }

    // Expiry date validation
    if (expMonth === '' || expYear === '') {
        dateError.textContent = 'Can\'t be blank';
        isValid = false;
    } else if (isNaN(expMonth) || isNaN(expYear) || expMonth.length !== 2 || expYear.length !== 2) {
        dateError.textContent = 'Invalid date';
        isValid = false;
    }

    // CVC validation
    const cvcPattern = /^\d{3}$/;
    if (!cvcPattern.test(cvc)) {
        cvcError.textContent = 'Invalid CVC';
        isValid = false;
    }

    if (isValid) {
        displayThankYouMessage();
    }
}

function displayThankYouMessage() {
    const paymentForm = document.getElementById('paymentForm');
    const thankYouMessage = document.getElementById('thankYouMessage');

    paymentForm.style.display = 'none';
    thankYouMessage.style.display = 'flex';
}

document.getElementById('cardName').addEventListener('input', function() {
    document.getElementById('displayCardName').textContent = this.value || 'Jane Appleseed';
});

document.getElementById('cardNumber').addEventListener('input', function() {
    let value = this.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let matches = value.match(/\d{4,16}/g);
    let match = matches && matches[0] || '';
    let parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
        this.value = parts.join(' ');
    } else {
        this.value = value;
    }
    document.getElementById('displayCardNumber').textContent = this.value || '0000 0000 0000 0000';
});

document.getElementById('expMonth').addEventListener('input', function() {
    document.getElementById('displayExpDate').textContent = `${this.value}/${document.getElementById('expYear').value}` || '00/00';
});

document.getElementById('expYear').addEventListener('input', function() {
    document.getElementById('displayExpDate').textContent = `${document.getElementById('expMonth').value}/${this.value}` || '00/00';
});

document.getElementById('cvc').addEventListener('input', function() {
    document.getElementById('cvcDisplay').textContent = this.value || '123';
});
