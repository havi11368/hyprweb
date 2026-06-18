function addWindowTab() {
    const windowTab = document.createElement("div");
    windowTab.id = "windowTab"
    windowTab.innerHTML = `<div class="windowHeader justified">
    <div class="infoHolder">
    <img id="icon" src="/images/icon.png"></img>
    <h3 id="title">New Window</h3>
    </div>
    </div>
    <iframe class="frame" src="./search.html"></iframe>`
    document.querySelector("#windowContainer").appendChild(windowTab);
    if (window.getComputedStyle(document.getElementById("greeting")).opacity === "1") {
      document.getElementById("greeting").style.animation = ".4s ease-out 0s 1 sizeOut";
      document.getElementById("greeting").style.opacity = "0";
      document.getElementById("greeting").style.zIndex = "-1";
      windowTab.style.animation = ".4s ease-out 0s 1 sizeIn";
    } else {
      windowTab.style.animation = ".4s ease-out 0s 1 slideIn";
    }
    
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