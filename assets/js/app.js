document.addEventListener("DOMContentLoaded", function () {
  const checkBox = document.getElementById("consent");
  const checkBoxAlt = document.getElementById("consent-alt");
  const nextBtn = document.getElementById("submit-button");
  const nextBtnAlt = document.getElementById("submit-button-alt");
  const inst1 = document.getElementById("instructions-one");
  const inst2 = document.getElementById("instructions-two");
  const instructionsBtn = document.getElementById("instructions-button");
  const faceOneDiv = document.getElementById("face-one");
  const faceTwoDiv = document.getElementById("face-two");
  const buttons = document.getElementsByClassName("rating-btn");
  const urlParams = new URLSearchParams(window.location.search);
  const subjectPool = urlParams.get("subjectPool") || false;
  const test = "BWLB-Wprot";
  const surveyURL =
    "https://csunsbs.qualtrics.com/jfe/form/SV_9ThbcqJQBdtGSkS?";

  let count = 0;
  let randFace1;
  let randFace2;
  let temp;
  let temp2;
  let temp3;
  let temp4;
  let ratingsArr = [];

  if (checkBox) {
    if(window.location.href.indexOf("face-study-hi") != -1){
      document.getElementById("hawaii").style.display = "block";
    } else {
      document.getElementById("not-hawaii").style.display = "block";
    }
    checkBox.onchange = function () {
      if (this.checked) {
        nextBtn.disabled = false;
      } else {
        nextBtn.disabled = true;
      }
    };
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function (e) {
      e.preventDefault;
      localStorage.setItem("consent", "true");
      window.location.href = "instructions.html";
    });
  }

  if (instructionsBtn) {
    instructionsBtn.addEventListener("click", function (e) {
      e.preventDefault;

      inst1.style.display = "none";

      if (inst2.style.display === "block") {
        window.location.href = "study.html";
      }

      inst2.style.display = "block";
    });
  }

  let faces = [
    "./assets/images/BH-CFD-BF-033-028-N.jpg",
    "./assets/images/BH-CFD-BF-227-137-N.jpg",
    "./assets/images/BH-CFD-BF-229-179-N.jpg",
    "./assets/images/BH-CFD-BF-253-202-N.jpg",
    "./assets/images/BL-CFD-BF-025-002-N-low.jpg",
    "./assets/images/BL-CFD-BF-217-189-N-low.jpg",
    "./assets/images/BL-CFD-BF-223-250-N-low.jpg",
    "./assets/images/BL-CFD-BF-241-222-N-low.jpg",
    "./assets/images/CFD-MF-301-024-N.jpg",
    "./assets/images/CFD-MF-304-018-N.jpg",
    "./assets/images/CFD-MF-305-014-N.jpg",
    "./assets/images/CFD-MF-332-014-N.jpg",
    "./assets/images/CFD-MF-333-012-N.jpg",
    "./assets/images/CFD-MF-334-002-N.jpg",
    "./assets/images/CFD-MF-335-002-N.jpg",
    "./assets/images/CFD-MF-348-018-N.jpg",
    "./assets/images/LH-CFD-LF-209-072-N.jpg",
    "./assets/images/LH-CFD-LF-214-090-N.jpg",
    "./assets/images/LH-CFD-LF-215-157-N.jpg",
    "./assets/images/LH-CFD-LF-255-088-N.jpg",
    "./assets/images/LL-CFD-LF-204-133-N.jpg",
    "./assets/images/LL-CFD-LF-212-066-N.jpg",
    "./assets/images/LL-CFD-LF-221-002-N.jpg",
    "./assets/images/LL-CFD-LF-252-172-N.jpg",
    "./assets/images/WH-CFD-WF-003-003-N.jpg",
    "./assets/images/WH-CFD-WF-008-002-N.jpg",
    "./assets/images/WH-CFD-WF-011-002-N.jpg",
    "./assets/images/WH-CFD-WF-244-163-N.jpg",
    "./assets/images/WL-CFD-WF-217-085-N.jpg",
    "./assets/images/WL-CFD-WF-218-087-N.jpg",
    "./assets/images/WL-CFD-WF-225-101-N.jpg",
    "./assets/images/WL-CFD-WF-248-129-N.jpg",
  ];

  //firebase config
  var firebaseConfig = {
    apiKey: "AIzaSyCNqc507gTBdijFLJ5sQos0LQtQs36nlAY",
    authDomain: "face-study.firebaseapp.com",
    projectId: "face-study",
    storageBucket: "face-study.appspot.com",
    messagingSenderId: "532553767359",
    appId: "1:532553767359:web:09f59ca82fc04a9862290a",
  };
  //Initialize firebase
  const primaryDB = firebase.initializeApp(firebaseConfig);

  //firebase ref
  const today = new Date();
  const todayString = today.toDateString();
  const refPrimary = primaryDB.database().ref(todayString);
  const newUserRef = refPrimary.push();
  const id = newUserRef.key;

  class FaceRating {
    constructor(face1, face2, rating, id, test, subjectPool) {
      this.firstFace = face1;
      this.secondFace = face2;
      this.rating = rating;
      this.id = id;
      this.test = test;
      this.subjectPool = subjectPool;
    }
  }

  const loadFaces = function () {
    do {
      randFace1 = Math.floor(Math.random() * 32);
    } while (
      randFace1 === temp ||
      randFace1 === temp2 ||
      randFace1 === temp3 ||
      randFace1 === temp4
    );

    do {
      randFace2 = Math.floor(Math.random() * 32);
    } while (
      randFace1 === randFace2 ||
      randFace2 === temp ||
      randFace2 === temp2 ||
      randFace2 === temp3 ||
      randFace2 === temp4
    );

    temp3 = temp;
    temp4 = temp2;
    temp = randFace1;
    temp2 = randFace2;

    if (!faceOneDiv.firstElementChild || !faceTwoDiv.firstElementChild) {
      faceOneEl = document.createElement("img");
      faceTwoEl = document.createElement("img");

      faceOneEl.setAttribute("id", "face-1");
      faceTwoEl.setAttribute("id", "face-2");
      faceOneEl.setAttribute("src", faces[randFace1]);
      faceTwoEl.setAttribute("src", faces[randFace2]);
      faceOneEl.setAttribute("class", "img-fluid mx-auto d-block");
      faceTwoEl.setAttribute("class", "img-fluid mx-auto d-block");

      faceOneDiv.appendChild(faceOneEl);
      faceTwoDiv.appendChild(faceTwoEl);
    } else {
      faceOne = document.getElementById("face-1");
      faceTwo = document.getElementById("face-2");

      faceOneEl.setAttribute("src", faces[randFace1]);
      faceTwoEl.setAttribute("src", faces[randFace2]);
    }
  };

  const buttonSetup = function () {
    for (let i = 0; i < buttons.length; i++) {
      let button = buttons[i];
      button.onclick = function () {
        let rating = new FaceRating(
          faces[randFace1].substring(16),
          faces[randFace2].substring(16),
          parseInt(button.innerHTML),
          id,
          test,
          subjectPool
        );
        ratingsArr.push(rating);

        if (count < 119) {
          //119
          count++;
          loadFaces();
        } else {
          disableButtons();
          writeToDBs();
        }
      };
    };
  };

  const disableButtons = function() {
    for (let i = 0; i < buttons.length; i++) {
      let button = buttons[i];
      button.setAttribute("disabled", true);
    }
  }

  function writeToDBs() {
    newUserRef
      .set(ratingsArr)
      .then(function () {
        window.location.href = surveyURL + "ID=" + id + "&study=" + test;
      })
      .catch(function (error) {
        console.log(error);
        alert("There was an error with your submission. Trying again.");
        writeToDBs();
      });
  }

  buttonSetup();
  loadFaces();
});
