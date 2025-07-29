import { db } from "../firebase/firebase-config.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Chart DOM elements
const wishStatsCanvas = document.getElementById("wishStatsChart");
const topContributorsCanvas = document.getElementById("topContributorsChart");

async function loadAnalytics() {
  const wishSnapshot = await getDocs(collection(db, "wishes"));
  const wishes = wishSnapshot.docs.map(doc => doc.data());

  const total = wishes.length;
  const fulfilled = wishes.filter(w => w.fulfilled).length;
  const pending = total - fulfilled;

  // Count by volunteer/NGO
  const contributorCounts = {};
  wishes.forEach(wish => {
    const name = wish.volunteerName || "Unknown";
    contributorCounts[name] = (contributorCounts[name] || 0) + 1;
  });

  const topContributors = Object.entries(contributorCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  drawWishStatsChart(total, fulfilled, pending);
  drawTopContributorsChart(topContributors);
}

function drawWishStatsChart(total, fulfilled, pending) {
  new Chart(wishStatsCanvas, {
    type: "pie",
    data: {
      labels: ["Fulfilled", "Pending"],
      datasets: [{
        label: "Wishes Status",
        data: [fulfilled, pending],
        backgroundColor: ["#4CAF50", "#F44336"],
      }]
    }
  });
}

function drawTopContributorsChart(topContributors) {
  const labels = topContributors.map(c => c[0]);
  const data = topContributors.map(c => c[1]);

  new Chart(topContributorsCanvas, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "Top Contributors",
        data,
        backgroundColor: "#2196F3"
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}

loadAnalytics();

