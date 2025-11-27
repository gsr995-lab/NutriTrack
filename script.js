// ----------------------------
// NutriTrack Script (Extended)
// ----------------------------

// Base dataset for 40 Indian foods (can be expanded to 150)
const foodData = {
  "poha": {cal: 180, protein: 4, fat: 5, carbs: 30},
  "upma": {cal: 200, protein: 5, fat: 6, carbs: 32},
  "idli": {cal: 150, protein: 5, fat: 1, carbs: 30},
  "dosa": {cal: 170, protein: 4, fat: 6, carbs: 28},
  "roti": {cal: 120, protein: 3, fat: 2, carbs: 22},
  "paratha": {cal: 220, protein: 4, fat: 10, carbs: 28},
  "rice": {cal: 200, protein: 4, fat: 0.5, carbs: 45},
  "dal": {cal: 130, protein: 9, fat: 3, carbs: 18},
  "paneer": {cal: 300, protein: 18, fat: 25, carbs: 4},
  "rajma": {cal: 240, protein: 15, fat: 5, carbs: 35},
  "chole": {cal: 210, protein: 12, fat: 4, carbs: 30},
  "chicken curry": {cal: 270, protein: 25, fat: 18, carbs: 5},
  "fish curry": {cal: 230, protein: 26, fat: 14, carbs: 3},
  "egg": {cal: 80, protein: 6, fat: 5, carbs: 0},
  "egg curry": {cal: 160, protein: 12, fat: 10, carbs: 3},
  "tea": {cal: 40, protein: 1, fat: 1, carbs: 7},
  "coffee": {cal: 50, protein: 1, fat: 1, carbs: 8},
  "biscuits": {cal: 100, protein: 2, fat: 3, carbs: 16},
  "sandwich": {cal: 220, protein: 8, fat: 10, carbs: 28},
  "biryani": {cal: 400, protein: 15, fat: 15, carbs: 50},
  "fried rice": {cal: 350, protein: 10, fat: 12, carbs: 45},
  "rice and dal": {cal: 330, protein: 13, fat: 6, carbs: 48},
  "samosa": {cal: 250, protein: 4, fat: 15, carbs: 30},
  "chips": {cal: 150, protein: 2, fat: 10, carbs: 14},
  "maggie": {cal: 350, protein: 8, fat: 14, carbs: 44},
  "pulao": {cal: 310, protein: 10, fat: 9, carbs: 45},
  "curd": {cal: 80, protein: 4, fat: 4, carbs: 5},
  "milk": {cal: 120, protein: 6, fat: 6, carbs: 8},
  "banana": {cal: 90, protein: 1, fat: 0, carbs: 22},
  "apple": {cal: 80, protein: 0, fat: 0, carbs: 20},
  "orange": {cal: 60, protein: 1, fat: 0, carbs: 15},
  "almonds": {cal: 160, protein: 6, fat: 14, carbs: 6},
  "peanuts": {cal: 180, protein: 8, fat: 14, carbs: 6},
  "lassi": {cal: 200, protein: 7, fat: 8, carbs: 25},
  "buttermilk": {cal: 60, protein: 2, fat: 2, carbs: 8},
  "oats": {cal: 180, protein: 6, fat: 3, carbs: 30},
  "cornflakes": {cal: 160, protein: 4, fat: 2, carbs: 28},
  "vegetable curry": {cal: 150, protein: 5, fat: 8, carbs: 15},
  "mix veg": {cal: 160, protein: 5, fat: 7, carbs: 18}
};

// Daily goal calculator
function getDailyGoal(gender, activity) {
  if (gender === "male") {
    if (activity === "sedentary") return 2500;
    if (activity === "active") return 2800;
    return 2600; // weight gain/loss
  } else {
    if (activity === "sedentary") return 2000;
    if (activity === "active") return 2200;
    return 2100;
  }
}

// Calculate intake
function calculateIntake(foodList) {
  let total = {cal: 0, protein: 0, fat: 0, carbs: 0};
  foodList.forEach(item => {
    let key = item.toLowerCase().trim();
    if (foodData[key]) {
      total.cal += foodData[key].cal;
      total.protein += foodData[key].protein;
      total.fat += foodData[key].fat;
      total.carbs += foodData[key].carbs;
    }
  });
  return total;
}

// Event listener for button
document.getElementById("calculate").addEventListener("click", function() {
  const gender = document.getElementById("gender").value;
  const activity = document.getElementById("activity").value;

  const foods = [
    document.getElementById("breakfast").value,
    document.getElementById("lunch").value,
    document.getElementById("dinner").value,
    document.getElementById("snacks").value
  ].filter(f => f !== "");

  const totals = calculateIntake(foods);
  const goal = getDailyGoal(gender, activity);

  document.getElementById("goal").textContent = goal;
  document.getElementById("intake").textContent = totals.cal.toFixed(0);

  let summaryText = "";
  if (totals.cal < goal - 200) summaryText = "You are below your daily requirement.";
  else if (totals.cal > goal + 200) summaryText = "You are above your daily requirement.";
  else summaryText = "You are within your healthy calorie range!";

  summaryText += `<br><br>Protein: ${totals.protein.toFixed(1)} g | Fat: ${totals.fat.toFixed(1)} g | Carbs: ${totals.carbs.toFixed(1)} g`;

  document.getElementById("summary").innerHTML = summaryText;
});
