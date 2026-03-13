const API_BASE = "https://tac.micaela-8e6.workers.dev";

async function loadTicketInfo() {
  const status = document.getElementById("purchase-status");

  try {
    const res = await fetch(`${API_BASE}/api/product`);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Unable to load ticket");
    }

    document.getElementById("event-name").textContent = data.eventName || data.productName;
    document.getElementById("event-description").textContent = data.description || "";

    const amount = ((data.unitAmount || 0) / 100).toFixed(2);
    document.getElementById("event-price").textContent =
      `${data.currencySymbol || ""}${amount} ${data.currency || ""}`.trim();
  } catch (err) {
    if (status) {
      status.textContent = err.message || "Unable to load ticket info.";
    }
  }
}

async function startPurchase() {
  const button = document.getElementById("buy-ticket-btn");
  const status = document.getElementById("purchase-status");
  const emailInput = document.getElementById("buyer-email");
  const qtyInput = document.getElementById("ticket-qty");

  try {
    button.disabled = true;
    status.textContent = "Redirecting to secure checkout...";

    const email = emailInput ? emailInput.value.trim() : "";
    const quantity = qtyInput ? Number(qtyInput.value || 1) : 1;

    const res = await fetch(`${API_BASE}/api/create-checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        quantity
      })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Unable to start checkout");
    }

    if (!data.url) {
      throw new Error("Missing checkout URL");
    }

    window.location.href = data.url;
  } catch (err) {
    status.textContent = err.message || "Something went wrong.";
    button.disabled = false;
  }
}

function modalManager () {
  const openBtn = document.getElementById("openPopup");
  const closeBtn = document.getElementById("closePopup");
  const overlay = document.getElementById("popupOverlay");

  openBtn.addEventListener("click", () => {
    overlay.style.display = "flex";
  });

  closeBtn.addEventListener("click", () => {
    overlay.style.display = "none";
  });
}

function ticketQuantityManager () {
  const qtyInput = document.getElementById("ticket-qty");
const minusBtn = document.getElementById("qty-minus");
const plusBtn = document.getElementById("qty-plus");
const totalPrice = document.getElementById("total-price");

const pricePerTicket = 95; // change this to your real ticket price

function updateTotal() {
  let qty = parseInt(qtyInput.value, 10) || 1;

  const min = parseInt(qtyInput.min, 10) || 1;
  const max = parseInt(qtyInput.max, 10) || 10;

  if (qty < min) qty = min;
  if (qty > max) qty = max;

  qtyInput.value = qty;
  totalPrice.textContent = qty * pricePerTicket;
}

minusBtn.addEventListener("click", () => {
  qtyInput.value = Math.max(
    parseInt(qtyInput.min, 10) || 1,
    (parseInt(qtyInput.value, 10) || 1) - 1
  );
  updateTotal();
});

plusBtn.addEventListener("click", () => {
  qtyInput.value = Math.min(
    parseInt(qtyInput.max, 10) || 10,
    (parseInt(qtyInput.value, 10) || 1) + 1
  );
  updateTotal();
});

qtyInput.addEventListener("input", updateTotal);

updateTotal();
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadTicketInfo();
  modalManager();
  ticketQuantityManager();

  const button = document.getElementById("buy-ticket-btn");
  if (button) {
    button.addEventListener("click", startPurchase);
  }

  const params = new URLSearchParams(window.location.search);
  const status = document.getElementById("purchase-status");
  const ticketSection = document.querySelector(".ticket-box")

  if (status && params.get("checkout") === "success") {
    ticketSection.innerHTML = "";
    ticketSection.innerHTML = "Payment received. Confirmation is being processed.";
  }

  if (status && params.get("checkout") === "cancel") {
    status.textContent = "Checkout was canceled.";
  }
});