function addWindowTab() {
    const windowTab = document.createElement("div");
    windowTab.id = "windowTab"
    windowTab.tabIndex = -1
    windowTab.innerHTML = `<div class="windowHeader justified">
    <div class="infoHolder">
    <img id="icon" src="/images/icon.png"></img>
    <h3 id="title">New Window</h3>
    </div>
    <button id="closeButton">Close</button>
    </div>
    <iframe class="frame" id="tabFrame" src="./search.html"></iframe>`
    document.querySelector("#windowContainer").appendChild(windowTab);
    if (window.getComputedStyle(document.getElementById("greeting")).opacity === "1") {
      document.getElementById("greeting").style.animation = ".4s ease-out 0s 1 sizeOut";
      document.getElementById("greeting").style.opacity = "0";
      document.getElementById("greeting").style.zIndex = "-1";
      windowTab.style.animation = ".4s ease-out 0s 1 sizeIn";
    } else {
      windowTab.style.animation = ".4s ease-out 0s 1 slideIn";
    }
    windowTab.querySelector("#tabFrame").addEventListener("load", (e) => {
      windowTab.querySelector("#title").innerHTML = windowTab.querySelector("#tabFrame").contentDocument.title
      windowTab.querySelector("#icon").src = windowTab.querySelector("#tabFrame").contentWindow.document.querySelector("link[rel~='icon']").href || windowTab.querySelector("#tabFrame").contentWindow.document.querySelector("link[rel~='shortcut icon']").href
      windowTab.querySelector("#tabFrame").contentWindow.document.addEventListener('mousedown', () => {
        windowTab.focus();
    });
    })
    windowTab.querySelector("#closeButton").addEventListener("click", (e) => {
      windowTab.remove();
    })
}

function openSettings() {
  if (window.getComputedStyle(document.getElementById("settings")).display === "none") {
    document.getElementById("settings").style.display = "block"
  } else {
    document.getElementById("settings").style.display = "none"
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