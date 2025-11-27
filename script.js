// ----------------------
// NUTRITRACK SCRIPT
// ----------------------

// Reference Nutrient Data (per typical Indian serving)
const foodData = {
  "Poha": { cal: 180, protein: 4, fat: 5, carbs: 30, sodium: 200 },
  "Upma": { cal: 190, protein: 5, fat: 6, carbs: 28, sodium: 250 },
  "Idli": { cal: 150, protein: 5, fat: 2, carbs: 28, sodium: 180 },
  "Dosa": { cal: 200, protein: 4, fat: 8, carbs: 26, sodium: 200 },
  "Bread Omelette": { cal: 220, protein: 14, fat: 12, carbs: 12, sodium: 270 },
  "Roti": { cal: 100, protein: 3, fat: 2, carbs: 18, sodium: 70 },
  "Rice": { cal: 130, protein: 2, fat: 0.3, carbs: 28, sodium: 1 },
  "Dal": { cal: 120, protein: 6, fat: 4, carbs: 14, sodium: 50 },
  "Paneer Curry": { cal: 250, protein: 12, fat: 18, carbs: 8, sodium: 220 },
  "Chicken Curry": { cal: 280, protein: 22, fat: 16, carbs: 5, sodium: 300 },
  "Fish Curry": { cal: 260, protein: 20, fat: 15, carbs: 4, sodium: 280 },
  "Vegetable Curry": { cal: 150, protein: 4, fat: 6, carbs: 18, sodium: 150 },
  "Egg Curry": { cal: 210, protein: 15, fat: 14, carbs: 6, sodium: 250 },
  "Samosa": { cal: 250, protein: 5, fat: 14, carbs: 28, sodium: 350 },
  "Sandwich": { cal: 200, protein: 7, fat: 8, carbs: 25, sodium: 400 },
  "Fruit Chaat": { cal: 120, protein: 1, fat: 0.5, carbs: 30, sodium: 70 },
  "Tea": { cal: 90, protein: 2, fat: 4, carbs: 12, sodium: 40 },
  "Coffee": { cal: 80, protein: 2, fat: 3, carbs: 10, sodium: 50 }
};

// RDA reference values (ICMR, approximate for 18–25 years)
const rda = {
  male: {
    sedentary: { cal: 2500, protein: 60, fat: 70, carbs: 400, sodium: 2300 },
    moderate: { cal: 2700, protein: 70, fat: 75, carbs: 420, sodium: 2300 },
    active: { cal: 3000, protein: 80, fat: 80, carbs: 450, sodium: 2300 }
  },
  female: {
    sedentary: { cal: 2000, protein: 55, fat: 60, carbs: 350, sodium: 2000 },
    moderate: { cal: 2200, protein: 65, fat: 65, carbs: 370, sodium: 2000 },
    active: { cal: 2400, protein: 70, fat: 70, carbs: 400, sodium: 2000 }
  }
};

// Utility: Round number to 1 decimal
function round(num) {
  return Math.round(num * 10) / 10;
}

// Main Calculation
document.getElementById("calculateBtn").addEventListener("click", function () {
  const gender = document.getElementById("gender").value;
  const activity = document.getElementById("activity").value;
  const targets = rda[gender][activity];

  let totals = { cal: 0, protein: 0, fat: 0, carbs: 0, sodium: 0 };

  // Iterate through each meal section
  document.querySelectorAll(".meal-group").forEach(group => {
    const foodSelect = group.querySelector(".food-select");
    const qtyInput = group.querySelector(".quantity");
    const foodName = foodSelect.value;
    const qty = parseInt(qtyInput.value);

    if (foodData[foodName]) {
      totals.cal += foodData[foodName].cal * qty;
      totals.protein += foodData[foodName].protein * qty;
      totals.fat += foodData[foodName].fat * qty;
      totals.carbs += foodData[foodName].carbs * qty;
      totals.sodium += foodData[foodName].sodium * qty;
    }
  });

  // Compute % of RDA achieved
  const pct = {
    cal: (totals.cal / targets.cal) * 100,
    protein: (totals.protein / targets.protein) * 100,
    fat: (totals.fat / targets.fat) * 100,
    carbs: (totals.carbs / targets.carbs) * 100,
    sodium: (totals.sodium / targets.sodium) * 100
  };

  // Feedback logic
  let feedback = "";
  if (pct.cal < 85) feedback = "Your calorie intake is low. Add more grains or dairy.";
  else if (pct.cal > 115) feedback = "Your calorie intake is high. Try reducing fried or sugary foods.";
  else feedback = "You are within your ideal calorie range. Great job maintaining balance!";

  if (pct.protein < 80) feedback += " Increase protein intake (dal, paneer, eggs).";
  if (pct.sodium > 110) feedback += " Sodium is high. Reduce packaged or salty snacks.";

  // Output display
  const outputDiv = document.getElementById("output");
  const resultSection = document.getElementById("results");
  resultSection.classList.remove("hidden");

  outputDiv.innerHTML = `
    <div class="space-y-2">
      <p><strong>Calories:</strong> ${round(totals.cal)} kcal (${round(pct.cal)}% of RDA)</p>
      <p><strong>Protein:</strong> ${round(totals.protein)} g (${round(pct.protein)}% of RDA)</p>
      <p><strong>Fat:</strong> ${round(totals.fat)} g (${round(pct.fat)}% of RDA)</p>
      <p><strong>Carbs:</strong> ${round(totals.carbs)} g (${round(pct.carbs)}% of RDA)</p>
      <p><strong>Sodium:</strong> ${round(totals.sodium)} mg (${round(pct.sodium)}% of RDA)</p>
      <p class="mt-2 text-green-700 font-medium">${feedback}</p>
    </div>
  `;
});
