document.getElementById("pxysearch").addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        window.location.href = __uv$config.prefix + __uv$config.encodeUrl(document.getElementById("pxysearch").value)
    }
})