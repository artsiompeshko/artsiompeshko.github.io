const buttonsList = document.getElementById('buttonsList');

const createCarcodeButton = () => {
  const button = document.createElement('button');

  button.innerHTML = 'Open Widget';

  button.classList.add('sms-button');

  button.classList.add('btn');
  button.classList.add('btn-primary');
  button.classList.add('m-2');

  return button;
}

document.getElementById('addMore').addEventListener('click', () => {
  buttonsList.appendChild(createCarcodeButton());
});
