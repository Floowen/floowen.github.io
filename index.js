(function () {
  const probability = 0.3;

  // Prevent redirect loops if arriving on error.html
  const onErrorPage = location.pathname.endsWith('error.html');
  if (onErrorPage) {
    // Clear the tag so normal page can work after going back
    sessionStorage.removeItem('erroredReload');
    return;
  }

  try {
    // 1) First visit logic
    const firstVisitFlag = 'firstVisitDone';
    const isFirstVisit = !localStorage.getItem(firstVisitFlag);
    if (isFirstVisit) {
      localStorage.setItem(firstVisitFlag, '1'); // mark as visited
      if (Math.random() < probability) {
        window.location.replace('error.html');
        return;
      }
    }

    // 2) Reload logic
    const nav = performance.getEntriesByType('navigation')[0];
    const isReload = nav ? nav.type === 'reload' : performance.navigation.type === 1;
    if (isReload) {
      if (Math.random() < probability) {
        const alreadyErrored = sessionStorage.getItem('erroredReload');
        if (!alreadyErrored) {
          sessionStorage.setItem('erroredReload', '1');
          window.location.replace('error.html');
          return;
        } else {
          sessionStorage.removeItem('erroredReload');
        }
      }
    }
  } catch (e) {

  }
})();

//set the volume of the audio element to 0.1 on load
window.onload = function() { 
    var audio = document.getElementById('background-audio');
    audio.volume = 0.1; 
};

const e = "Hello There ^.^",
n = ["color: #f92848;", "font-size: 24px;", "font-weight: bold;", "text-shadow: -1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000;"].join("");
console.log(`%c${e}`, n)
