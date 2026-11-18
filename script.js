/* ===== SERVICE DATA (exact prices from flyer) ===== */
const SERVICES = {
  freehand: {
    label: "Free Hand",
    options: [
      { name: "Straight Up", price: 120 },
      { name: "Straight Back", price: 100 },
      { name: "Two Line", price: 200 },
      { name: "Fish Bone", price: 120 }
    ]
  },
  lemonade: {
    label: "Lemonade Braids",
    options: [
      { name: "Medium Length", price: 200 },
      { name: "Long Length", price: 250 },
      { name: "Extra Length", price: 300 }
    ]
  },
  fulani: {
    label: "Fulani (Tribal) Braids",
    options: [
      { name: "Short Length", price: 250 },
      { name: "Medium Length", price: 300 },
      { name: "Long Length", price: 350 },
      { name: "Extra Long Length", price: 400 }
    ]
  },
  knotless: {
    label: "Knotless Braids",
    options: [
      { name: "Short Length", price: 300 },
      { name: "Medium Length", price: 400 },
      { name: "Long Length", price: 500 },
      { name: "Extra Long Length", price: 550 }
    ]
  },
  straightup: {
    label: "Straight Up Braids",
    options: [
      { name: "Medium Length", price: 250 },
      { name: "Long Length", price: 300 },
      { name: "Extra Long Length", price: 350 }
    ]
  },
  straightback: {
    label: "Straight Back Braids",
    options: [
      { name: "Short Length", price: 150 },
      { name: "Medium Length", price: 200 },
      { name: "Long Length", price: 250 },
      { name: "Extra Long Length", price: 300 }
    ]
  },
  ponytails: {
    label: "Ponytails",
    options: [
      { name: "Slick Down Fluffy", price: 180 },
      { name: "Slick Down Puffy", price: 200 },
      { name: "Slick Up, Side Side", price: 230 },
      { name: "Frontal Ponytails", price: 300 }
    ]
  },
  lashes: {
    label: "Lashes Cluster",
    options: [
      { name: "Classic Lashes", price: 100 },
      { name: "Volume Lashes", price: 180 },
      { name: "Mega Volume", price: 200 },
      { name: "Hybrid Lashes", price: 250 },
      { name: "Temporary Lashes", price: 50 }
    ]
  },
  makeup: {
    label: "Makeup",
    options: [
      { name: "Soft Glam", price: 250 },
      { name: "Full Glam", price: 350 },
      { name: "Smokey Eyes Only", price: 100 },
      { name: "Bridal Makeup", price: 600 },
      { name: "Bridesmaid", price: 450 }
    ]
  },
  nails: {
    label: "Nails",
    options: [
      { name: "Nails (from)", price: 150 }
    ]
  },
  haircut: {
    label: "Hair Cut",
    options: [
      { name: "Hair Cut (from)", price: 50 }
    ]
  }
};

/* ===== MOBILE MENU ===== */
const menuButton = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");

menuButton.addEventListener("click", () => {
  const opened = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(opened));
  menuButton.textContent = opened ? "×" : "☰";
});

nav.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.textContent = "☰";
  });
});

/* ===== YEAR ===== */
document.getElementById("year").textContent = new Date().getFullYear();

/* ===== BACK TO TOP ===== */
const backTop = document.getElementById("backTop");
window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    backTop.classList.add("visible");
  } else {
    backTop.classList.remove("visible");
  }
});
backTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ===== BOOKING FORM LOGIC ===== */
const categorySelect = document.getElementById("category");
const serviceSelect = document.getElementById("service");
const priceDisplay = document.getElementById("priceDisplay");
const priceValue = document.getElementById("priceValue");
const form = document.getElementById("bookingForm");

categorySelect.addEventListener("change", () => {
  const key = categorySelect.value;
  serviceSelect.innerHTML = "";
  priceDisplay.hidden = true;

  if (!key || !SERVICES[key]) {
    serviceSelect.disabled = true;
    serviceSelect.innerHTML = '<option value="">Select service first</option>';
    return;
  }

  serviceSelect.disabled = false;
  const data = SERVICES[key];
  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = "Select service / style";
  serviceSelect.appendChild(placeholder);

  data.options.forEach((opt) => {
    const option = document.createElement("option");
    option.value = opt.name;
    option.dataset.price = opt.price;
    option.textContent = `${opt.name} — R${opt.price}`;
    serviceSelect.appendChild(option);
  });
});

serviceSelect.addEventListener("change", () => {
  const selected = serviceSelect.options[serviceSelect.selectedIndex];
  if (selected && selected.dataset.price) {
    priceValue.textContent = `R${selected.dataset.price}`;
    priceDisplay.hidden = false;
  } else {
    priceDisplay.hidden = true;
  }
});

/* ===== SUBMIT → WHATSAPP ===== */
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const categoryKey = categorySelect.value;
  const serviceName = serviceSelect.value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const message = document.getElementById("message").value.trim();

  if (!name || !categoryKey || !serviceName) {
    alert("Please fill in your name, category and service.");
    return;
  }

  const categoryLabel = SERVICES[categoryKey]?.label || categoryKey;
  const selectedOption = serviceSelect.options[serviceSelect.selectedIndex];
  const price = selectedOption?.dataset.price || "";

  const lines = [
    "Hello EPICENE SALON & SPA,",
    "I would like to request an appointment.",
    "",
    `Name: ${name}`,
    `Category: ${categoryLabel}`,
    `Service: ${serviceName}`,
    price ? `Price (student rate): R${price}` : "",
    date ? `Preferred date: ${date}` : "",
    time ? `Preferred time: ${time}` : "",
    message ? `Extra details: ${message}` : "",
    "",
    "Please confirm availability and final price. Thank you!"
  ].filter((line) => line !== "");

  const text = lines.join("\n");
  const url = "https://wa.me/27682867446?text=" + encodeURIComponent(text);
  window.open(url, "_blank", "noopener");
});
