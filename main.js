function getAmount(name) {
    var labelNode = document.querySelector("a[href*='" + name + "']");
    var contentNode = labelNode.parentNode.nextSibling;
    if (contentNode.getAttribute("data-title") == "USD:") {
        contentNode = contentNode.nextSibling;
    }
    var textContent = contentNode.textContent;
    console.log({labelNode, contentNode, textContent});
    return Math.floor(parseInt(textContent.replace(/[^\d]+/gi, "")) / 100);
}

var savingAccountCount = 3;
var accounts = [
    { name: "Credit Card", value: -getAmount("CreditCard") }
];

for (var i = 0; i < savingAccountCount; i++) {
    accounts.push({ name: "Account" + (i + 1), value: getAmount("account=" + i) });
}

console.log(accounts);
var total = accounts.map(x => x.value).reduce((a, b) => a + b);
console.log(total);
var span = document.createElement("span");
span.textContent = total + " $";
span.style.color = "green";
if (total < 1000) {
    span.style.color = "red";
}

var title = document.querySelector("h1");
title.textContent += " : ";
title.appendChild(span);

Date.prototype.addDays = function(days) {
  var dat = new Date(this.valueOf());
  dat.setDate(dat.getDate() + days);
  return dat;
}

var payDate = new Date("2017-02-16");
while (payDate < new Date()) {
    payDate = payDate.addDays(14);
}

var days = (payDate - new Date()) / (24 * 60 * 60 * 1000);
var left =  Math.floor(days) + " days";

if (days < 1) {
    left = Math.floor(days * 12) + " hours";
}

title.innerHTML += "<br />Next Pay in " + left;
