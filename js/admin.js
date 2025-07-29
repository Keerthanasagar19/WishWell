import { db } from "../firebase/firebase-config.js";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const adminWishList = document.getElementById("adminWishList");
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");

let allWishes = [];

// Event listeners
searchInput?.addEventListener("input", applyFilters);
statusFilter?.addEventListener("change", applyFilters);

// Load all wishes from Firestore
async function loadAdminWishes() {
  const querySnapshot = await getDocs(collection(db, "wishes"));
  allWishes = querySnapshot.docs.map(docSnap => ({
    id: docSnap.id,
    ...docSnap.data()
  }));
  applyFilters(); // Apply filters after loading
}

// Render filtered wishes
function renderWishes(wishes) {
  adminWishList.innerHTML = "";
  wishes.forEach(wish => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <strong>${wish.beneficiaryName} (${wish.beneficiaryAge} yrs)</strong><br>
      Wish: ${wish.wish}<br>
      Location: ${wish.location}<br>
      Submitted by: ${wish.volunteerName || "N/A"}<br>
      Contact: ${wish.volunteerContact || "N/A"}<br>
      ${wish.ngoName ? `NGO: ${wish.ngoName} (${wish.ngoEmail || "N/A"})<br>` : ""}
      ${wish.fulfilled ? "✔️ Fulfilled by " + wish.fulfilledBy : "❌ Not Fulfilled"}<br>
      ${wish.thankYou ? `💬 Thank You Note: ${wish.thankYou}` : ""}<br><br>
      <button onclick="toggleFulfilled('${wish.id}', ${wish.fulfilled})">
        ${wish.fulfilled ? "❌ Unmark Fulfilled" : "✅ Mark as Fulfilled"}
      </button>
      <button onclick="deleteWish('${wish.id}')">🗑️ Delete</button>
    `;
    listItem.style.marginBottom = "20px";
    adminWishList.appendChild(listItem);
  });
}

// Apply search and status filters
function applyFilters() {
  const searchText = searchInput.value.toLowerCase();
  const selectedStatus = statusFilter.value;

  const filtered = allWishes.filter(wish => {
    const matchesSearch =
      wish.beneficiaryName?.toLowerCase().includes(searchText) ||
      wish.location?.toLowerCase().includes(searchText) ||
      wish.ngoName?.toLowerCase().includes(searchText) ||
      wish.volunteerName?.toLowerCase().includes(searchText);

    const matchesStatus =
      selectedStatus === "all" ||
      (selectedStatus === "fulfilled" && wish.fulfilled) ||
      (selectedStatus === "unfulfilled" && !wish.fulfilled);

    return matchesSearch && matchesStatus;
  });

  renderWishes(filtered);
}

// Mark/unmark as fulfilled
window.toggleFulfilled = async function(id, currentlyFulfilled) {
  const newStatus = !currentlyFulfilled;
  await updateDoc(doc(db, "wishes", id), {
    fulfilled: newStatus
  });
  loadAdminWishes();
};

// Delete wish
window.deleteWish = async function(id) {
  if (confirm("Are you sure you want to delete this wish?")) {
    await deleteDoc(doc(db, "wishes", id));
    loadAdminWishes();
  }
};

// Initial load
loadAdminWishes();
