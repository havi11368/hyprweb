//Using file from UV example

"use strict";

const stockSW = "/uv/sw.js";

//List of hostnames that are allowed to run serviceworkers on http://
const swAllowedHostnames = ["localhost", "127.0.0.1"];

/*Global util
Used in 404.html and index.html*/

async function registerSW() {
	if (!navigator.serviceWorker) {
		if (
			location.protocol !== "https:" &&
			!swAllowedHostnames.includes(location.hostname)
		)
			throw new Error("Service workers cannot be registered without https.");

		throw new Error("Your browser doesn't support service workers.");
	}

	await navigator.serviceWorker.register(stockSW);
}

function addWindowTab() {
    const windowTab = document.createElement("div");
    windowTab.id = "windowTab"
    windowTab.innerHTML = `<iframe class="frame" src="./search.html"></iframe>`
    document.querySelector("#windowContainer").appendChild(windowTab);
    windowTab.style.animation = ".4s ease-out 0s 1 slideIn"
}

//Taken from ACE

async function setTransport() {

  const connection = new BareMux.BareMuxConnection("/baremux/worker.js")
  const wispUrl = "wss://lrga.space/wisp/";

    await connection.setTransport("/epoxy/index.mjs", [{ wisp: wispUrl }]);

}
setTransport()