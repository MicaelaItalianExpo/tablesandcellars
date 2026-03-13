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

document.addEventListener("DOMContentLoaded", async () => {
  await loadTicketInfo();

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