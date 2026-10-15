
const bookingForm = document.getElementById("booking-form");
const destinationSelect = document.getElementById("destination");
const travelDate = document.getElementById("travel-date");

const bookingMessage = document.getElementById("booking-message");

// Set minimum travel date to today
const today = new Date();
const localToday = [
  today.getFullYear(),
  String(today.getMonth() + 1).padStart(2, "0"),
  String(today.getDate()).padStart(2, "0")
].join("-");

travelDate.min = localToday;

// Select destination from the destination cards
document.querySelectorAll("[data-destination]").forEach((link) => {
  link.addEventListener("click", () => {
    destinationSelect.value = link.dataset.destination;
  });
});

// Handle booking submission
bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!bookingForm.reportValidity()) return;

  const formData = new FormData(bookingForm);

  const destination = formData.get("destination");
  const date = formData.get("travelDate");
  const travelers = formData.get("travelers");
  const email = formData.get("email");

  // Create a demo booking reference
  const bookingId =
    "TG" + Date.now().toString().slice(-8);

  // Hide the form and display confirmation
  bookingForm.hidden = true;

  const confirmation = document.createElement("section");
  confirmation.className = "confirmation-card";

  const heading = document.createElement("h2");
  heading.textContent = "Booking Confirmed!";

  const message = document.createElement("p");
  message.textContent =
    "Your demo booking request has been recorded on this page.";

  const reference = document.createElement("p");
  reference.textContent = `Booking Reference: ${bookingId}`;

  const details = document.createElement("div");
  details.className = "confirmation-details";

  const items = [
    ["Destination", destination],
    ["Travel Date", date],
    ["Travelers", travelers],
    ["Email", email]
  ];

  items.forEach(([label, value]) => {
    const row = document.createElement("p");
    const strong = document.createElement("strong");

    strong.textContent = `${label}: `;
    row.append(strong, document.createTextNode(value));
    details.appendChild(row);
  });

  const button = document.createElement("button");
  button.type = "button";
  button.className = "primary-button";
  button.textContent = "Book Another Trip";

  button.addEventListener("click", () => {
    confirmation.remove();
    bookingForm.reset();
    bookingForm.hidden = false;
    bookingMessage.textContent = "";
    travelDate.min = localToday;

    document.getElementById("booking").scrollIntoView({
      behavior: "smooth"
    });
  });

  confirmation.append(heading, message, reference, details, button);
  bookingForm.insertAdjacentElement("afterend", confirmation);

  confirmation.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
});