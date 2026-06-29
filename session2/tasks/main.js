// 1. Booking an Appointment

const bookedSlots = ["a1", "b3", "c2"];

function bookAppointment(slot) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (bookedSlots.includes(slot)) {
        reject(`Slot "${slot}" is already booked.`);
      } else {
        bookedSlots.push(slot);
        resolve(`Appointment booked successfully for "${slot}".`);
      }
    }, 1500);
  });
}

async function bookingDemo() {
  try {
    const result = await bookAppointment("d4");
    console.log(result);
  } catch (error) {
    console.log(error);
  }

  try {
    const result = await bookAppointment("b3");
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

bookingDemo();


// 2. Check Server Status with Retry
function pingServer() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const isOnline = Math.random() > 0.7;

      if (isOnline) {
        resolve("Server is Online");
      } else {
        reject("Server is Offline");
      }
    }, 1000);
  });
}

async function checkServer() {
  const maxRetries = 5;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Attempt ${attempt}...`);

      const result = await pingServer();
      console.log(result);

      // Stop retrying if server is online
      return;
    } catch (error) {
      console.log(error);

      if (attempt === maxRetries) {
        console.log("Server is still offline after 5 attempts.");
      }
    }
  }
}

checkServer();