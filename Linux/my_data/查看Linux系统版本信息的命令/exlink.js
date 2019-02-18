function exLinks() {
if (!document.getElementsByTagName) return;
var anchors = document.getElementsByTagName("a");
for (var i=0; i<anchors.length; i++) {
var anchor = anchors[i];
if (anchor.getAttribute("href") &&
anchor.getAttribute("rel") == "exlink")
anchor.target = "_blank";
}
}
window.onload = exLinks;
