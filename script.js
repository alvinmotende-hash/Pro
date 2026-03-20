// CreativePro Interactive Script
// Handles all button interactions and feedback wall logic

// -------------------- CTA BUTTON --------------------
const ctaBtn = document.getElementById("ctaBtn");
if (ctaBtn) {
  ctaBtn.addEventListener("click", () => {
    alert("🚀 Your journey begins now!");
  });
}

// -------------------- FEEDBACK WALL --------------------
const feedbackInput = document.getElementById("feedbackInput");
const addFeedbackBtn = document.getElementById("addFeedback");
const feedbackWall = document.getElementById("feedbackWall");

async function loadFeedback() {
  const res = await fetch("http://localhost:5000/api/feedback");
  const data = await res.json();
  feedbackWall.innerHTML = "";
  data.forEach(fb => {
    const card = document.createElement("div");
    card.className = "feedback-card";
    card.textContent = fb.text;
    feedbackWall.appendChild(card);
  });
}

if (addFeedbackBtn && feedbackInput) {
  addFeedbackBtn.addEventListener("click", async () => {
    const text = feedbackInput.value.trim();
    if (!text) return alert("⚠️ Please enter feedback before posting.");
    await fetch("http://localhost:5000/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });
    feedbackInput.value = "";
    loadFeedback();
  });
}

if (feedbackWall) loadFeedback();

// -------------------- PRICING BUTTONS --------------------
const pricingButtons = document.querySelectorAll(".plan button");
pricingButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const planName = btn.parentElement.querySelector("h3").textContent;
    alert(`✅ You selected the ${planName} plan!`);
  });
});

// -------------------- BUTTON HOVER EFFECT --------------------
document.querySelectorAll("button, .btn").forEach(btn => {
  btn.addEventListener("mouseover", () => {
    btn.style.transform = "scale(1.05)";
    setTimeout(() => {
      btn.style.transform = "scale(1)";
    }, 200);
  });
});

// -------------------- FAQ TOGGLES --------------------
const faqDetails = document.querySelectorAll(".faq details");
faqDetails.forEach(detail => {
  detail.addEventListener("toggle", () => {
    if (detail.open) {
      console.log(`FAQ opened: ${detail.querySelector("summary").textContent}`);
    }
  });
});

// -------------------- DEBUG --------------------
console.log("✅ CreativePro script loaded. All buttons are functional.");
