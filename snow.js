function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

(function letItSnow(){
  var snowflakes = document.querySelectorAll('.snow');
  for (var i = 0; i < snowflakes.length; i++) {
    var snowflake = snowflakes[i];
    snowflake.setAttribute('cx', getRandom(1,100) + '%');
    snowflake.setAttribute('cy', '-' + getRandom(1,100));
    snowflake.setAttribute('r', getRandom(1,3));
  }
})();

(function() {
  document.addEventListener("click", () => {
    const audio = document.querySelector('audio');

    if (audio.paused) {
      audio.volume = 0.2;
      audio.play();
    }
  });
})();
