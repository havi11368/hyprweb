function addWindowTab() {
    if(document.getElementById("greeting").style.display == "block") {
      document.getElementById("greeting").style.display = "none"
    }
    const windowTab = document.createElement("div");
    windowTab.id = "windowTab"
    windowTab.innerHTML = `<iframe class="frame" src="./search.html"></iframe>`
    document.querySelector("#windowContainer").appendChild(windowTab);
    windowTab.style.animation = ".4s ease-out 0s 1 slideIn"
}



//Taken from ACE

function startTime() {
  const today = new Date();
  document.getElementById('time').innerHTML =  today.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true})
  setTimeout(startTime, 5000);
}

function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}

startTime();