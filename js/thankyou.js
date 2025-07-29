import { db } from "../firebase/firebase-config.js";
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const thankYouList = document.getElementById("thankYouList");

async function loadThankYous() {
  const querySnapshot = await getDocs(collection(db, "wishes"));
  thankYouList.innerHTML = "";

  querySnapshot.forEach((docSnap) => {
    const wish = docSnap.data();

    if (wish.fulfilled && wish.thankYou) {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
        <p><strong>🎁 ${wish.beneficiaryName}</strong> (${wish.location})</p>
        <p style="font-style: italic; color: #444;">"${wish.thankYou}"</p>
        <p style="color: green;">✔️ Fulfilled by ${wish.fulfilledBy || "a kind donor"}</p>
        <hr style="margin: 10px 0;" />
      `;
      thankYouList.appendChild(listItem);
    }
  });
}

window.addEventListener("load", loadThankYous);
