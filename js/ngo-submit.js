import { db } from "../firebase/firebase-config.js";
import {
  addDoc,
  collection,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const form = document.getElementById("ngoForm");
const wishContainer = document.getElementById("wishContainer");

window.addWishInput = function () {
  const newWish = document.createElement("div");
  newWish.classList.add("wishItem");
  newWish.innerHTML = `
    <input type="text" placeholder="Beneficiary Name" class="bName" required />
    <input type="number" placeholder="Age" class="bAge" required />
    <input type="text" placeholder="Location" class="bLocation" required />
    <input type="text" placeholder="Wish Description" class="bWish" required />
    <input type="date" class="bDeadline" required />
    <hr />
  `;
  wishContainer.appendChild(newWish);
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const ngoName = document.getElementById("ngoName").value;
  const ngoEmail = document.getElementById("ngoEmail").value;
  const ngoContact = document.getElementById("ngoContact").value;
  const ngoAddress = document.getElementById("ngoAddress").value;

  const wishes = [...document.querySelectorAll(".wishItem")];

  for (const item of wishes) {
    const wishData = {
      beneficiaryName: item.querySelector(".bName").value,
      beneficiaryAge: item.querySelector(".bAge").value,
      location: item.querySelector(".bLocation").value,
      wish: item.querySelector(".bWish").value,
      deadline: item.querySelector(".bDeadline").value,
      submittedAt: serverTimestamp(),
      fulfilled: false,
      ngoName,
      ngoEmail,
      ngoContact,
      ngoAddress,
    };

    await addDoc(collection(db, "wishes"), wishData);
  }

  alert("Wishes submitted successfully!");
  form.reset();
  wishContainer.innerHTML = '<div class="wishItem">' + wishContainer.firstChild.innerHTML + '</div>';
});
