## 1- Booking an Appointment

📋 Task Description:
Simulate booking a time slot. If the slot is already booked (based on a list), reject the request.

🧩 Methods Used:
Simulated delay with setTimeout
includes() to check booked slot
await usage

🔍 Helpful Notes:
If slot is "b3" or "a1", Promise is rejected.
Good for practicing flow control after rejections.

---

## 2- Check Server Status with Retry
📋 Task Description:
Simulate pinging a server. If it's offline, retry up to 5 times. Stop and log an error after the fifth failure.

🧩 Methods Used:
Math.random() for unpredictability
for loop with await
Promises inside pingServer()

🔍 Helpful Notes:
Uses try/catch inside the loop so failed attempts don’t crash the program.
Can be extended to implement exponential backoff.


## 3- Meal Search by Ingredient


📁 Goal:
Build a simple web app that allows users to search for meals by an ingredient using public API.

🔗 API Endpoint:
Use the following API to filter meals by ingredient:
https://www.themealdb.com/api/json/v1/1/search.php?s=

📌 Requirements:
1. Create a search input field where the user can type an ingredient (e.g., "chicken", "garlic").
2. When the user clicks the "Search" button:
   - Fetch meals that include the entered ingredient.
   - Display each meal in a card format, including:
     - Meal image
     - Meal name
3. If no meals are found, display a friendly message.
4. Style the page using CSS for a clean and responsive layout.