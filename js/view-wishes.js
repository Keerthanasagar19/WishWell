import { db } from "../firebase/firebase-config.js";
import {
  collection,
  getDocs,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const wishList = document.getElementById("wishList");

async function loadWishes() {
  const querySnapshot = await getDocs(collection(db, "wishes"));
  wishList.innerHTML = "";

  querySnapshot.forEach((docSnap) => {
    const wish = docSnap.data();
    const wishId = docSnap.id;

    let dateStr = "Unknown";
    if (wish.timestamp?.toDate) {
      const dateObj = wish.timestamp.toDate();
      dateStr = dateObj.toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    }

    let deadlineStr = "";
    if (wish.deadline) {
      const deadlineDate = new Date(wish.deadline);
      if (!isNaN(deadlineDate)) {
        deadlineStr = `⏰ Deadline: ${deadlineDate.toLocaleDateString("en-IN", {
          year: "numeric",
          month: "short",
          day: "numeric"
        })}<br>`;
      }
    }

    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <strong>🎁 ${wish.beneficiaryName} (${wish.beneficiaryAge} yrs)</strong><br>
      📍 Location: ${wish.location}<br>
      🙏 Wish: ${wish.wish}<br>
      🧑‍🤝‍🧑 Submitted by: ${wish.volunteerName || "N/A"}<br>
      📞 Contact: ${wish.volunteerContact || "N/A"}<br>
      🗓️ Submitted on: ${dateStr}<br>
      ${deadlineStr}
    `;

    if (wish.fulfilled) {
      const fulfilledText = document.createElement("p");
      fulfilledText.style.color = "green";
      fulfilledText.style.fontWeight = "bold";
      fulfilledText.innerText = wish.fulfilledBy
        ? `✔️ Fulfilled by ${wish.fulfilledBy}`
        : "✔️ Fulfilled";
      listItem.appendChild(fulfilledText);
    }

    if (wish.thankYou) {
      const thankYouPara = document.createElement("p");
      thankYouPara.style.marginTop = "5px";
      thankYouPara.style.fontStyle = "italic";
      thankYouPara.innerText = `💬 "${wish.thankYou}"`;
      listItem.appendChild(thankYouPara);
    }

    if (!wish.fulfilled) {
      const fulfillBtn = document.createElement("button");
      fulfillBtn.innerText = "✅ Mark as Fulfilled";
      fulfillBtn.style.marginTop = "5px";

      fulfillBtn.addEventListener("click", async () => {
        const donorName = prompt("Please enter your name (Donor):");
        if (!donorName) return alert("Donor name is required.");

        const thankYouMsg = `Thank you so much ${donorName} for fulfilling this wish. You made a big difference!`;

        try {
          await updateDoc(doc(db, "wishes", wishId), {
            fulfilled: true,
            fulfilledBy: donorName,
            thankYou: thankYouMsg
          });
          loadWishes(); // Refresh
        } catch (err) {
          console.error(err);
          alert("Failed to update wish.");
        }
      });

      listItem.appendChild(fulfillBtn);
    }

    listItem.style.marginBottom = "20px";
    wishList.appendChild(listItem);
  });
}

// Initial load
window.addEventListener("load", loadWishes);
