const packages = [
  {id:"100", diamonds:100, price: "Нарх баъдтар муайян мешавад"},
  {id:"310", diamonds:310, price: "Нарх баъдтар муайян мешавад"},
  {id:"520", diamonds:520, price: "Нарх баъдтар муайян мешавад"},
  {id:"1060", diamonds:1060, price: "Нарх баъдтар муайян мешавад"},
  {id:"2180", diamonds:2180, price: "Нарх баъдтар муайян мешавад"},
  {id:"5600", diamonds:5600, price: "Нарх баъдтар муайян мешавад"}
];
let selected = null;
const grid = document.querySelector("#packagesGrid");
const priceText = "Нарх баъдтар муайян мешавад";

packages.forEach(item => {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "package";
  button.innerHTML = `<span class="gem">◆</span><strong>${item.diamonds.toLocaleString("en-US")} алмос</strong><small>Бастаи Free Fire</small><div class="price">${priceText}</div>`;
  button.addEventListener("click", () => {
    selected = item;
    document.querySelectorAll(".package").forEach(el => el.classList.remove("selected"));
    button.classList.add("selected");
    document.querySelector("#selectedPackage").textContent = `${item.diamonds} алмос`;
    document.querySelector("#selectedPrice").textContent = priceText;
    document.querySelector("#notice").classList.remove("show");
  });
  grid.appendChild(button);
});

document.querySelector("#orderForm").addEventListener("submit", event => {
  event.preventDefault();
  const notice = document.querySelector("#notice");
  if (!selected) {
    notice.textContent = "Лутфан аввал бастаи алмосро интихоб кун.";
    notice.classList.add("show");
    return;
  }
  const playerId = document.querySelector("#playerId").value.trim();
  const playerName = document.querySelector("#playerName").value.trim();
  if (!/^[0-9]{6,15}$/.test(playerId)) {
    notice.textContent = "Player ID бояд аз 6 то 15 рақам бошад.";
    notice.classList.add("show");
    return;
  }
  const order = {
    reference: "SONI-" + Date.now().toString().slice(-8),
    playerId,
    playerName,
    diamonds: selected.diamonds,
    status: "pending-payment",
    createdAt: new Date().toISOString()
  };
  // Demo only: this saves the order in this browser, not on a server.
  const orders = JSON.parse(localStorage.getItem("soniff_demo_orders") || "[]");
  orders.push(order);
  localStorage.setItem("soniff_demo_orders", JSON.stringify(orders));
  notice.textContent = `Фармоиши намоишӣ сабт шуд. Рақам: ${order.reference}. Ҳоло пардохт фаъол нест ва алмос фиристода намешавад.`;
  notice.classList.add("show");
});
document.querySelector("#year").textContent = new Date().getFullYear();
