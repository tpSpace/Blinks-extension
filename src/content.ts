// find the body element
const body = document.getElementsByTagName("body")[0];
const div = document.createElement("div");
div.id = "content-script";
div.innerHTML = "<h1>KHoi was here</h1>";
div.style.color = "red";
body?.appendChild(div);
console.log("content script loaded");
