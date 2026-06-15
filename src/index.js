function addWindow() {
    const window = document.createElement("div");
    window.id = "windowTab"
    window.innerHTML = `
    <iframe class="frame" src="./search.html"></iframe>
    `
    document.querySelector("#windowContainer").appendChild(window);
}