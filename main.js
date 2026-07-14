// const PAYMENT_LINK = "https://buy.stripe.com/00w28t84e0CG306dHMg3600";

// async function startPurchase() {
//   const button = document.getElementById("buy-ticket-btn");
//   const emailInput = document.getElementById("buyer-email");

//   try {
//     button.disabled = true;

//     const email = emailInput ? emailInput.value.trim() : "";

//     let checkoutUrl = PAYMENT_LINK;

//     if (email) {
//       const separator = PAYMENT_LINK.includes("?") ? "&" : "?";
//       checkoutUrl += `${separator}prefilled_email=${encodeURIComponent(email)}`;
//     }

//     window.location.href = checkoutUrl;
//   } catch (err) {
//     button.disabled = false;
//     console.error(err);
//   }
// }

// function modalManager () {
//   const openBtn = document.getElementById("openPopup");
//   const closeBtn = document.getElementById("closePopup");
//   const overlay = document.getElementById("popupOverlay");

//   openBtn.addEventListener("click", () => {
//     overlay.style.display = "flex";
//   });

//   closeBtn.addEventListener("click", () => {
//     overlay.style.display = "none";
//   });
// }

// function ticketQuantityManager () {
//   const qtyInput = document.getElementById("ticket-qty");
//   const minusBtn = document.getElementById("qty-minus");
//   const plusBtn = document.getElementById("qty-plus");
//   const totalPrice = document.getElementById("total-price");

//   const pricePerTicket = 95; // change this to your real ticket price

//   function updateTotal() {
//     let qty = parseInt(qtyInput.value, 10) || 1;

//     const min = parseInt(qtyInput.min, 10) || 1;
//     const max = parseInt(qtyInput.max, 10) || 10;

//     if (qty < min) qty = min;
//     if (qty > max) qty = max;

//     qtyInput.value = qty;
//     totalPrice.textContent = qty * pricePerTicket;
//   }

//   minusBtn.addEventListener("click", () => {
//     qtyInput.value = Math.max(
//       parseInt(qtyInput.min, 10) || 1,
//       (parseInt(qtyInput.value, 10) || 1) - 1
//     );
//     updateTotal();
//   });

//   plusBtn.addEventListener("click", () => {
//     qtyInput.value = Math.min(
//       parseInt(qtyInput.max, 10) || 10,
//       (parseInt(qtyInput.value, 10) || 1) + 1
//     );
//     updateTotal();
//   });

//   qtyInput.addEventListener("input", updateTotal);

//   updateTotal();
// }

// function ageRestrictionPopupManager () {
//   const gate = document.getElementById("age-gate");
//     const checkbox = document.getElementById("age-confirm-checkbox");
//     const enterBtn = document.getElementById("age-enter-btn");
//     const exitBtn = document.getElementById("age-exit-btn");

//     const STORAGE_KEY = "age_verified_21_plus";

//     function openGate() {
//       gate.classList.add("is-open");
//       gate.setAttribute("aria-hidden", "false");
//       document.body.style.overflow = "hidden";
//     }

//     function closeGate() {
//       gate.classList.remove("is-open");
//       gate.setAttribute("aria-hidden", "true");
//       document.body.style.overflow = "";
//     }

//     function hasVerifiedAge() {
//       return localStorage.getItem(STORAGE_KEY) === "true";
//     }

//     function saveVerifiedAge() {
//       localStorage.setItem(STORAGE_KEY, "true");
//     }

//     checkbox.addEventListener("change", function () {
//       enterBtn.disabled = !checkbox.checked;
//     });

//     enterBtn.addEventListener("click", function () {
//       saveVerifiedAge();
//       closeGate();
//     });

//     exitBtn.addEventListener("click", function () {
//       window.location.href = "https://www.google.com";
//     });

//     if (!hasVerifiedAge()) {
//       openGate();
//     }
// }

// document.addEventListener("DOMContentLoaded", async () => {
//   // await loadTicketInfo();
//   ageRestrictionPopupManager();
//   modalManager();
//   // ticketQuantityManager();

//   const button = document.getElementById("buy-ticket-btn");
//   if (button) {
//     button.addEventListener("click", startPurchase);
//   }

//   const params = new URLSearchParams(window.location.search);
//   const ticketSection = document.querySelector(".ticket-box")

//   const popup = document.getElementById("popupContent");
//   if (popup && params.get("checkout") === "success") {
//     button.disabled = false;
//     const overlay = document.getElementById("popupOverlay");
//     overlay.style.display = "flex";
//     popup.innerHTML = "";
//     popup.innerHTML = `
//       <p style="font-size: 20px; font-weight: 700; color: #0058A9; margin: 10px; text-align: center;">THANK YOU FOR YOUR PURCHASE!</p>
//       <p style="font-size: 20px; font-weight: 700; color: #006525; margin-top: 0px;">IL GIRASOLE TRATTORIA</p>
//       <p style="font-size: 20px; font-weight: 500; color: #C93E55; margin-top: 0px;">2700 N Western Ave, <br> Chicago, IL 60647</p>
//       <p style="font-size: 20px; font-weight: 700; color: #006525; margin-top: 0px;">APRIL 15, 2026 . 6.30 PM</p>
//       <img src="./assets/img/TAC_GIF_SIGNATURE.gif" style="width: 80%; height: auto; margin-top: 0;">
//       <p style="font-size: 20px; font-weight: 500; color: #0058A9; margin-top: 0px;">SEE YOU THERE!</p>
//       <p style="font-size: 10px; color: #0058A9; margin-top: 0px; text-align: center;" class="cta">*TASTINGS PROVIDED IN SAMPLE SIZES IN COMPLIANCE WITH ILLINOIS LAW. SERVICE RESTRICTED TO 21+. PLEASE DRINK RESPONSIBLY.</p>
      
//       `;
//   }

//   if (popup && params.get("checkout") === "cancel") {
//     button.disabled = false;
//   }
// });

const PAYMENT_LINK = "https://buy.stripe.com/8x2cN71FQbhk9ou9rwg3604";

function startPurchase() {
  const button = document.getElementById("buy-ticket-btn");
  const emailInput = document.getElementById("buyer-email");

  try {
    if (button) {
      button.disabled = true;
    }

    const email = emailInput ? emailInput.value.trim() : "";

    let checkoutUrl = PAYMENT_LINK;

    if (email) {
      const separator = PAYMENT_LINK.includes("?") ? "&" : "?";
      checkoutUrl += `${separator}prefilled_email=${encodeURIComponent(email)}`;
    }

    window.location.href = checkoutUrl;
  } catch (err) {
    if (button) {
      button.disabled = false;
    }

    console.error(err);
  }
}

// function modalManager() {
//   const openBtn = document.getElementById("openPopup");
//   const closeBtn = document.getElementById("closePopup");
//   const overlay = document.getElementById("popupOverlay");

//   if (!openBtn || !closeBtn || !overlay) {
//     return;
//   }

//   openBtn.addEventListener("click", () => {
//     overlay.style.display = "flex";
//   });

//   closeBtn.addEventListener("click", () => {
//     overlay.style.display = "none";
//   });

//   overlay.addEventListener("click", (event) => {
//     if (event.target === overlay) {
//       overlay.style.display = "none";
//     }
//   });
// }

function modalManager() {
  const openButtons = document.querySelectorAll(".open-popup-button");
  const closeButton = document.getElementById("closePopup");
  const overlay = document.getElementById("popupOverlay");

  if (!openButtons.length || !closeButton || !overlay) {
    console.warn("Ticket popup: required elements are missing.");
    return;
  }

  function openPopup() {
    overlay.style.display = "flex";
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closePopup() {
    overlay.style.display = "none";
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  openButtons.forEach((button) => {
    button.addEventListener("click", openPopup);
  });

  closeButton.addEventListener("click", closePopup);

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      closePopup();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closePopup();
    }
  });
}

function ageRestrictionPopupManager() {
  const gate = document.getElementById("age-gate");
  const checkbox = document.getElementById("age-confirm-checkbox");
  const enterBtn = document.getElementById("age-enter-btn");
  const exitBtn = document.getElementById("age-exit-btn");

  if (!gate || !checkbox || !enterBtn || !exitBtn) {
    return;
  }

  const STORAGE_KEY = "age_verified_21_plus";

  function openGate() {
    gate.classList.add("is-open");
    gate.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeGate() {
    gate.classList.remove("is-open");
    gate.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function hasVerifiedAge() {
    return localStorage.getItem(STORAGE_KEY) === "true";
  }

  function saveVerifiedAge() {
    localStorage.setItem(STORAGE_KEY, "true");
  }

  checkbox.addEventListener("change", function () {
    enterBtn.disabled = !checkbox.checked;
  });

  enterBtn.addEventListener("click", function () {
    saveVerifiedAge();
    closeGate();
  });

  exitBtn.addEventListener("click", function () {
    window.location.href = "https://www.google.com";
  });

  if (!hasVerifiedAge()) {
    openGate();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  ageRestrictionPopupManager();
  modalManager();

  const button = document.getElementById("buy-ticket-btn");

  if (button) {
    button.addEventListener("click", startPurchase);
  }

  const params = new URLSearchParams(window.location.search);
  const popup = document.getElementById("popupContent");

  if (popup && params.get("checkout") === "success") {
    if (button) {
      button.disabled = false;
    }

    const overlay = document.getElementById("popupOverlay");

    if (overlay) {
      overlay.style.display = "flex";
    }

    popup.innerHTML = `
      <p style="font-size: 20px; font-weight: 700; color: #0058A9; margin: 10px; text-align: center;">
        THANK YOU FOR YOUR PURCHASE!
      </p>

      <p style="font-size: 20px; font-weight: 700; color: #006525; margin-top: 0px;">
        FIGO WINE BAR
      </p>

      <p style="font-size: 20px; font-weight: 500; color: #C93E55; margin-top: 0px; text-align: center;">
        JULY 28, 2026<br>
        6:30 PM
      </p>

      <img src="./assets/img/TAC_GIF_SIGNATURE.gif" style="width: 80%; height: auto; margin-top: 0;">

      <p style="font-size: 20px; font-weight: 500; color: #0058A9; margin-top: 0px;">
        SEE YOU THERE!
      </p>

      <p style="font-size: 10px; color: #0058A9; margin-top: 0px; text-align: center;" class="cta">
        *TASTINGS PROVIDED IN SAMPLE SIZES IN COMPLIANCE WITH ILLINOIS LAW. SERVICE RESTRICTED TO 21+. PLEASE DRINK RESPONSIBLY.
      </p>
    `;
  }

  if (params.get("checkout") === "cancel") {
    if (button) {
      button.disabled = false;
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
    const logo = document.querySelector(".scrolling-logo");
    const logoSlot = document.querySelector(".header-logo-slot");
    const header = document.querySelector(".header");

    if (!logo || !logoSlot || !header) {
        console.warn("Scrolling logo: required elements are missing.");
        return;
    }

    const clamp = (value, min, max) => {
        return Math.min(Math.max(value, min), max);
    };

    const lerp = (start, end, progress) => {
        return start + (end - start) * progress;
    };

    /*
    Gives the animation a softer, more natural ending.
    */
    const easeOutCubic = (progress) => {
        return 1 - Math.pow(1 - progress, 3);
    };

    let animationFrameRequested = false;

    function updateScrollingLogo() {
        animationFrameRequested = false;

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        /*
        The animation finishes after approximately 60% of
        the viewport height has been scrolled.

        Increase this number to make the shrinking slower.
        Decrease it to make the shrinking faster.
        */
        const animationDistance = Math.max(
            380,
            viewportHeight * 0.6
        );

        const rawProgress = clamp(
            window.scrollY / animationDistance,
            0,
            1
        );

        const progress = easeOutCubic(rawProgress);

        /*
        Starting position: center of the hero.
        */
        const startX = viewportWidth / 2;
        const startY = viewportHeight * 0.55;

        /*
        Finishing position: center of the invisible header slot.
        Because the header is fixed, this position remains stable.
        */
        const slotRect = logoSlot.getBoundingClientRect();

        const endX = slotRect.left + slotRect.width / 2;
        const endY = slotRect.top + slotRect.height / 2;

        /*
        Starting and ending logo sizes.
        */
        const startWidth = Math.min(
            viewportWidth * 0.6,
            1700
        );

        const endWidth = slotRect.width;

        logo.style.left = `${lerp(startX, endX, progress)}px`;
        logo.style.top = `${lerp(startY, endY, progress)}px`;
        logo.style.width = `${lerp(
            startWidth,
            endWidth,
            progress
        )}px`;

        /*
        Change the header background gradually during the animation.
        */
        header.classList.toggle(
            "is-docked",
            rawProgress > 0.18
        );

        /*
        Make the logo clickable once it has reached the header.
        */
        logo.classList.toggle(
            "is-docked",
            rawProgress > 0.96
        );
    }

    function requestLogoUpdate() {
        if (animationFrameRequested) {
            return;
        }

        animationFrameRequested = true;
        window.requestAnimationFrame(updateScrollingLogo);
    }

    window.addEventListener("scroll", requestLogoUpdate, {
        passive: true
    });

    window.addEventListener("resize", requestLogoUpdate);

    updateScrollingLogo();
});

document.addEventListener("DOMContentLoaded", () => {
  const marqueeRoot = document.querySelector(".vertical-marquees");

  if (!marqueeRoot) {
      console.warn("Vertical marquee: .vertical-marquees was not found.");
      return;
  }

  const columns = Array.from(
      marqueeRoot.querySelectorAll(".marquee-column")
  );

  const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
  );

  let resizeTimer = null;

  /*
  Wait for each image to either load or fail before measuring
  the height of the marquee groups.
  */
  const waitForImage = (image) => {
      if (image.complete) {
          return Promise.resolve();
      }

      return new Promise((resolve) => {
          image.addEventListener("load", resolve, {
              once: true
          });

          image.addEventListener("error", resolve, {
              once: true
          });
      });
  };

  /*
  Removes everything previously generated by this script.

  This allows the marquee to be safely rebuilt when the
  viewport changes size.
  */
  function resetColumn(column) {
      const track = column.querySelector(".marquee-track");

      if (!track) {
          return null;
      }

      const originalGroup = track.querySelector(
          ".marquee-group:not([data-marquee-clone])"
      );

      if (!originalGroup) {
          return null;
      }

      track.classList.remove("is-animated");

      track
          .querySelectorAll("[data-marquee-clone]")
          .forEach((clone) => clone.remove());

      originalGroup
          .querySelectorAll("[data-marquee-repeat]")
          .forEach((repeat) => repeat.remove());

      track.style.removeProperty("--travel");
      track.style.removeProperty("--duration");

      return {
          track,
          originalGroup
      };
  }

  function buildColumn(column) {
      const elements = resetColumn(column);

      if (!elements) {
          return;
      }

      const { track, originalGroup } = elements;

      /*
      Do not create the moving loop when reduced-motion
      mode is enabled.
      */
      if (reducedMotionQuery.matches) {
          return;
      }

      /*
      A hidden mobile column has no measurable height.
      It will be rebuilt automatically if the viewport
      later becomes wider.
      */
      if (
          column.offsetParent === null ||
          column.clientHeight === 0
      ) {
          return;
      }

      const originalItems = Array.from(
          originalGroup.children
      );

      if (originalItems.length === 0) {
          return;
      }

      const groupStyles = window.getComputedStyle(
          originalGroup
      );

      const imageGap =
          parseFloat(groupStyles.rowGap) || 0;

      const requiredHeight =
          column.clientHeight + imageGap;

      let repetitionCount = 0;
      const maximumRepetitions = 30;

      /*
      If a column contains only a few images, repeat its
      original image set until the group is taller than
      the visible column.

      This prevents empty areas during the animation.
      */
      while (
          originalGroup.getBoundingClientRect().height <
              requiredHeight &&
          repetitionCount < maximumRepetitions
      ) {
          originalItems.forEach((item) => {
              const repeatedItem = item.cloneNode(true);

              repeatedItem.setAttribute(
                  "data-marquee-repeat",
                  ""
              );

              originalGroup.appendChild(repeatedItem);
          });

          repetitionCount += 1;
      }

      const groupHeight =
          originalGroup.getBoundingClientRect().height;

      if (groupHeight === 0) {
          return;
      }

      /*
      Duplicate the completed group to create the second
      half of the seamless loop.
      */
      const clonedGroup = originalGroup.cloneNode(true);

      clonedGroup.setAttribute(
          "data-marquee-clone",
          ""
      );

      clonedGroup.setAttribute(
          "aria-hidden",
          "true"
      );

      track.appendChild(clonedGroup);

      /*
      Measure the exact distance between the beginning of
      the first group and the beginning of its duplicate.

      This includes the gap between the two groups.
      */
      const firstGroupTop =
          originalGroup.getBoundingClientRect().top;

      const clonedGroupTop =
          clonedGroup.getBoundingClientRect().top;

      const travelDistance =
          clonedGroupTop - firstGroupTop;

      /*
      data-speed is measured in pixels per second.

      A larger number creates faster movement.
      Because the duration is calculated from the actual
      group height, columns with different image counts
      still move at a consistent visual speed.
      */
      const speed = Math.max(
          Number.parseFloat(column.dataset.speed) || 30,
          1
      );

      const duration = travelDistance / speed;

      track.style.setProperty(
          "--travel",
          `${travelDistance}px`
      );

      track.style.setProperty(
          "--duration",
          `${duration}s`
      );

      /*
      Force the browser to register the reset before
      restarting the animation.
      */
      void track.offsetHeight;

      requestAnimationFrame(() => {
          track.classList.add("is-animated");
      });
  }

  function buildAllColumns() {
      columns.forEach(buildColumn);
  }

  const images = Array.from(
      marqueeRoot.querySelectorAll("img")
  );

  Promise.all(images.map(waitForImage)).then(() => {
      buildAllColumns();

      /*
      Recalculate the loop when the marquee container
      changes dimensions.
      */
      const resizeObserver = new ResizeObserver(() => {
          window.clearTimeout(resizeTimer);

          resizeTimer = window.setTimeout(() => {
              buildAllColumns();
          }, 150);
      });

      resizeObserver.observe(marqueeRoot);
  });

  /*
  Rebuild immediately when the user's reduced-motion
  preference changes.
  */
  const handleMotionPreferenceChange = () => {
      buildAllColumns();
  };

  if (typeof reducedMotionQuery.addEventListener === "function") {
      reducedMotionQuery.addEventListener(
          "change",
          handleMotionPreferenceChange
      );
  } else {
      reducedMotionQuery.addListener(
          handleMotionPreferenceChange
      );
  }
});