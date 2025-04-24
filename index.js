//set the volume of the audio element to 0.1 on load
window.onload = function() { 
    var audio = document.getElementById('background-audio');
    audio.volume = 0.1; 
};

const e = "Hello There ^.^",
n = ["color: #f92848;", "font-size: 24px;", "font-weight: bold;", "text-shadow: -1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000;"].join("");
console.log(`%c${e}`, n)