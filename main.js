const API_BASE = "https://tac.micaela-8e6.workers.dev";

// async function loadTicketInfo() {

//   try {
//     const res = await fetch(`${API_BASE}/api/product`);
//     const data = await res.json();

//     if (!res.ok) {
//       throw new Error(data.error || "Unable to load ticket");
//     }

//     document.getElementById("event-name").textContent = data.eventName || data.productName;
//     document.getElementById("event-description").textContent = data.description || "";

//     const amount = ((data.unitAmount || 0) / 100).toFixed(2);
//     document.getElementById("event-price").textContent =
//       `${data.currencySymbol || ""}${amount} ${data.currency || ""}`.trim();
//   } catch (err) {
//     console.log(err)
//   }
// }

async function startPurchase() {
  const button = document.getElementById("buy-ticket-btn");
  const emailInput = document.getElementById("buyer-email");
  const qtyInput = document.getElementById("ticket-qty");

  try {
    button.disabled = true;

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
  // await loadTicketInfo();
  modalManager();
  ticketQuantityManager();

  const button = document.getElementById("buy-ticket-btn");
  if (button) {
    button.addEventListener("click", startPurchase);
  }

  const params = new URLSearchParams(window.location.search);
  const ticketSection = document.querySelector(".ticket-box")

  const popup = document.getElementById("popupContent");
  if (popup && params.get("checkout") === "success") {
    const overlay = document.getElementById("popupOverlay");
    overlay.style.display = "flex";
    popup.innerHTML = "";
    popup.innerHTML = `
      <p style="font-size: 20px; font-weight: 700; color: #0058A9; margin: 10px; text-align: center;">THANK YOU FOR YOUR PURCHASE!</p>
      <p style="font-size: 20px; font-weight: 700; color: #006525; margin-top: 0px;">IL GIRASOLE TRATTORIA</p>
      <p style="font-size: 20px; font-weight: 500; color: #C93E55; margin-top: 0px;">2700 N Western Ave, <br> Chicago, IL 60647</p>
      <p style="font-size: 20px; font-weight: 700; color: #006525; margin-top: 0px;">APRIL 15, 2026 . 6.30 PM</p>
      <img src="./assets/img/TAC_GIF_SIGNATURE.gif" style="width: 80%; height: auto; margin-top: 0;">
      <p style="font-size: 20px; font-weight: 500; color: #0058A9; margin-top: 0px;">SEE YOU THERE!</p>
      <p style="font-size: 10px; color: #0058A9; margin-top: 0px; text-align: center;" class="cta">*TASTINGS PROVIDED IN SAMPLE SIZES IN COMPLIANCE WITH ILLINOIS LAW. SERVICE RESTRICTED TO 21+. PLEASE DRINK RESPONSIBLY.</p>
      
      `;
  }

  if (popup && params.get("checkout") === "cancel") {
    popup.textContent = "Checkout was canceled.";
  }
});