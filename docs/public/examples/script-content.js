let count = 0;

setInterval(function () {
  count++;
  document.querySelector('#style-this').Style.color = count % 2 === 0 ? 'black' : 'crimson';
}, 500);
