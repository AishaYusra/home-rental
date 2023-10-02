const dragzone = document.getElementById('dragzone');

dragzone.addEventListener('dragover', (e) => {
    e.preventDefault();
});

dragzone.addEventListener('drop', (e) => {
    e.preventDefault();

    if (e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0];

        if (file.type.match('image/jpeg') || file.type.match('image/jpg') || file.type.match('image/png')) {
            const img = document.createElement('img');
            img.setAttribute('draggable', 'false');
            // img.style.maxWidth = '12rem';
            // img.style.maxHeight = '6rem';

            const reader = new FileReader();
            reader.onload = (event) => {
                img.src = event.target.result;
            };

            reader.readAsDataURL(file);
            dragzone.innerHTML = '';
            dragzone.appendChild(img);
            newDiv.appendChild(img)
        } else {
            alert('Please drop a valid image (png, jpeg, jpg).');
        }
    }
});

const price = document.querySelector('.price');
const address = document.querySelector('.address');
const btn = document.querySelector('.btn');
const city = document.querySelector('#room');
// const Div = document.querySelector('.cardinfo')
// Get the select element
// const unit = document.querySelector('.unit');

const newDiv = document.createElement('div');
newDiv.className = 'cards';
btn.addEventListener('click', (e) => {
    e.preventDefault();

    // Create a new div for each card
    const div = document.createElement('div')
    div.className = "cardinfo"

    const h6 = document.createElement('h4');
    const h6text = document.createTextNode(address.value);
    h6.appendChild(h6text);
    div.appendChild(h6);

    // Get the value of the selected option from the dropdown
    const selectedOption = document.createElement('p');
    const selectedOptionText = document.createTextNode(city.value);
    selectedOption.appendChild(selectedOptionText);
    div.appendChild(selectedOption);

    // const
    const p = document.createElement('h6');
    const pText = document.createTextNode(`$${price.value}/month`);
    p.appendChild(pText);
    div.appendChild(p);

    newDiv.appendChild(div)
    console.log(newDiv);

    // Append the newDiv to a target div with the class 'property' (modify this to match your target div's class)
    const outputDiv = document.querySelector('.property'); // Change 'outputDiv' to your target div's class
    outputDiv.appendChild(newDiv);
});
