// User Details and Navbar Function

function createUserDetails(user) {
  let dashboard = document.getElementById("user-page-dashboard");

  let userNav = document.createElement("div");
  userNav.setAttribute("class", "user-nav");

  let title = document.createElement("h1");
  title.textContent = "VivaPal";

  let settingsIcon = document.createElement("p");
  settingsIcon.innerHTML =
    '<button id="open"><i class="fa-solid fa-user-gear" style="font-size: 18px;"></i></button>';
  settingsIcon.setAttribute("class", "icons");

  let chartBtn = document.createElement("p");
  chartBtn.setAttribute("class", "chart-btn-container");
  chartBtn.innerHTML = `<button class="chart-btn"> See Chart </button>&nbsp<span class="material-symbols-outlined" style="font-size: 30px;"> equalizer </span>`;

  chartBtn.addEventListener("click", () => {
    if (!document.querySelector(".chart").classList.contains("chart-visible")) {
      document.querySelector(".chart").classList.add("chart-visible");
      document.getElementById("habits-container").style.display = "none";
      chartBtn.innerHTML = `<button class="chart-btn"> Back </button>&nbsp<span class="material-symbols-outlined" style="font-size: 30px;"> equalizer </span>`;
    } else {
      document.querySelector(".chart").classList.remove("chart-visible");
      document.getElementById("habits-container").style.display = "block";
      chartBtn.innerHTML = `<button class="chart-btn"> See Chart </button>&nbsp<span class="material-symbols-outlined" style="font-size: 30px;"> equalizer </span>`;
    }

    let buttonElement = document.querySelector("button.chart-btn");
    buttonElement.style.backgroundColor = window
      .getComputedStyle(document.querySelector("#user-page-dashboard h1"))
      .getPropertyValue("background-color");
    buttonElement.style.color = window
      .getComputedStyle(document.querySelector("#user-page-dashboard h1"))
      .getPropertyValue("color");
  });

  let settingsIcon2 = document.createElement("p");
  settingsIcon2.innerHTML = `<button id="moon-button"><span class="material-symbols-outlined" style="font-size: 25px;"> dark_mode </span></button>`;
  settingsIcon2.setAttribute("class", "btn-toggle");

  let name = document.createElement("p");
  name.innerText = user;
  name.setAttribute("class", "userName");
  userNav.append(title, settingsIcon, settingsIcon2, name, chartBtn);
  dashboard.prepend(userNav);
}

// Create Habits Function

function createHabits(habits) {
  let habitsDiv = document.getElementById("habits-container");
  if (habits.water) {
    waterDiv = createWaterDiv(habits.water);
    habitsDiv.append(waterDiv);
  }
  if (habits.sleep) {
    sleepDiv = createSleepDiv(habits.sleep);
    habitsDiv.append(sleepDiv);
  }
  if (habits.exercise) {
    exerciseDiv = createExerciseDiv(habits.exercise);
    habitsDiv.append(exerciseDiv);
  }
}

// Water Function

function createWaterDiv(data) {
  let div = document.createElement("div");
  div.setAttribute("id", "water-container");
  div.setAttribute("class", "habit-container");

  let title = document.createElement("h3");
  title.innerText = "Water Intake";

  let streak = document.createElement("p");
  streak.innerText = "Streak: " + data.streak;
  streak.setAttribute("class", "habit-streak");
  streak.setAttribute("id", "water-streak");

  let target = document.createElement("p");
  target.innerText = "Target: " + data.required + " ml";
  target.setAttribute("class", "habit-target");
  target.setAttribute("id", "water-target");

  let current = document.createElement("p");
  current.innerText = "Water Drank Today: " + data.current + " ml";
  current.setAttribute("class", "habit-current");
  current.setAttribute("id", "water-current");

  let addBtn = document.createElement("button");
  addBtn.setAttribute("id", "habit-button");
  addBtn.innerText = "+";
  addBtn.addEventListener("click", (e) => {
    if (e.target === document.getElementById("water-current").nextSibling) {
      let inputDiv = document.createElement("div");
      let inputBorder = window.getComputedStyle(document.querySelector('.userName')).getPropertyValue('border-color');
      inputDiv.setAttribute('class', "water-input-container");
      inputDiv.style.display = "flex";
      inputDiv.style.flexDirection = "column";
      inputDiv.style.borderTop =
      `1px solid ${inputBorder}`;

      let inputContainer = document.createElement("div");
      inputContainer.style.display = "flex";

      let btnsContainer = document.createElement("div");
      btnsContainer.style.display = "flex";

      let inputLabel = document.createElement("label");
      inputLabel.textContent = "Water Consumed (ml):";

      let inputNumber = document.createElement("input");
      inputNumber.style.backgroundColor = window.getComputedStyle(document.querySelector('body')).getPropertyValue('background-color');
      inputNumber.style.color = window.getComputedStyle(document.getElementById('moon-button')).getPropertyValue('color');
      inputNumber.style.borderBottom =
      `1px solid ${inputBorder}`;
      inputNumber.setAttribute("type", "number");

      let inputSubmitBtn = document.createElement("button");
      inputSubmitBtn.textContent = "Add Entry";
      inputSubmitBtn.style.color = window.getComputedStyle(document.querySelector('body')).getPropertyValue('background-color');
      inputSubmitBtn.style.backgroundColor = window.getComputedStyle(document.getElementById('moon-button')).getPropertyValue('color');

      inputSubmitBtn.addEventListener("click", () => {
        let waterStreak = parseInt(
          document.getElementById("water-streak").innerText.split(" ")[1]
        );

        let waterTarget = parseInt(
          document.getElementById("water-target").innerText.split(" ")[1]
        );

        let waterCurrent = parseInt(
          document.getElementById("water-current").innerText.split(" ")[3]
        );

        let newEntry = parseInt(inputNumber.value);
        if (!newEntry || newEntry <= 0) {
          alert("Please input a positive number to add an entry");
        } else {
          let newSum = waterCurrent + newEntry;
          if (waterCurrent < waterTarget && newSum >= waterTarget) {
            waterStreak += 1;
            document.getElementById("water-streak").innerText =
              "Streak: " + waterStreak;
          }
          document.getElementById("water-current").textContent =
            "Water Drank Today: " + newSum + " ml";
          inputDiv.remove();
          updateHabits({
            "habits.water": {
              required: waterTarget,
              current: newSum,
              streak: waterStreak,
              met: newSum >= waterTarget,
            },
          });
        }
        inputDiv.remove();
      });
      let inputUndoBtn = document.createElement("button");
      inputUndoBtn.textContent = "Undo";
      inputUndoBtn.style.color = window.getComputedStyle(document.querySelector('body')).getPropertyValue('background-color');
      inputUndoBtn.style.backgroundColor = window.getComputedStyle(document.getElementById('moon-button')).getPropertyValue('color');

      inputUndoBtn.addEventListener("click", () => {
        inputDiv.remove();
      });
      inputContainer.append(inputLabel, inputNumber);
      btnsContainer.append(inputUndoBtn, inputSubmitBtn);
      inputDiv.append(inputContainer, btnsContainer);
      document
        .getElementById("water-current")
        .parentNode.insertBefore(
          inputDiv,
          document.getElementById("water-current").nextSibling
        );
    }
  });

  div.append(title, streak, target, current, addBtn);
  return div;
}

// Exercise Function

function createExerciseDiv(data) {
  let div = document.createElement("div");
  div.setAttribute("id", "exercise-container");
  div.setAttribute("class", "habit-container");

  let title = document.createElement("h3");
  title.innerText = "Exercise";

  let streak = document.createElement("p");
  streak.innerText = "Streak: " + data.streak;
  streak.setAttribute("class", "habit-streak");
  streak.setAttribute("id", "exercise-streak");

  let target = document.createElement("p");
  target.innerText = "Target: " + data.required + " minutes";
  target.setAttribute("class", "habit-target");
  target.setAttribute("id", "exercise-target");

  let current = document.createElement("p");
  current.innerText = "Minutes Exercised Today: " + data.current + " minutes";
  current.setAttribute("class", "habit-current");
  current.setAttribute("id", "exercise-current");

  let addBtn = document.createElement("button");
  addBtn.setAttribute("id", "habit-button");
  addBtn.innerText = "+";
  addBtn.addEventListener("click", (e) => {
    if (e.target === document.getElementById("exercise-current").nextSibling) {
      let inputDiv = document.createElement("div");
      let inputBorder = window.getComputedStyle(document.querySelector('.userName')).getPropertyValue('border-color');
      inputDiv.setAttribute('class', "exercise-input-container");
      inputDiv.style.display = "flex";
      inputDiv.style.flexDirection = "column";
      inputDiv.style.borderTop =
      `1px solid ${inputBorder}`;

      let inputContainer = document.createElement("div");
      inputContainer.style.display = "flex";

      let btnsContainer = document.createElement("div");
      btnsContainer.style.display = "flex";

      let inputLabel = document.createElement("label");
      inputLabel.textContent = "Minutes of Exercise:";

      let inputNumber = document.createElement("input");
      inputNumber.style.backgroundColor = window.getComputedStyle(document.querySelector('body')).getPropertyValue('background-color');
      inputNumber.style.color = window.getComputedStyle(document.getElementById('moon-button')).getPropertyValue('color');
      inputNumber.style.borderBottom =
      `1px solid ${inputBorder}`;
      inputNumber.setAttribute("type", "number");

      let inputSubmitBtn = document.createElement("button");
      inputSubmitBtn.textContent = "Add Entry";
      inputSubmitBtn.style.color = window.getComputedStyle(document.querySelector('body')).getPropertyValue('background-color');
      inputSubmitBtn.style.backgroundColor = window.getComputedStyle(document.getElementById('moon-button')).getPropertyValue('color');

      inputSubmitBtn.addEventListener("click", () => {
        let exerciseStreak = parseInt(
          document.getElementById("exercise-streak").innerText.split(" ")[1]
        );
        let exerciseTarget = parseInt(
          document.getElementById("exercise-target").innerText.split(" ")[1]
        );
        let exerciseCurrent = parseInt(
          document.getElementById("exercise-current").innerText.split(" ")[3]
        );
        let newEntry = parseInt(inputNumber.value);
        if (!newEntry || newEntry <= 0) {
          alert("Please input a positive number to add an entry");
        } else {
          let newSum = exerciseCurrent + newEntry;
          if (exerciseCurrent < exerciseTarget && newSum >= exerciseTarget) {
            exerciseStreak += 1;
            document.getElementById("exercise-streak").innerText =
              "Streak: " + exerciseStreak;
          }
          document.getElementById("exercise-current").textContent =
            "Minutes exercised today: " + newSum + " minutes";
          inputDiv.remove();
          updateHabits({
            "habits.exercise": {
              required: exerciseTarget,
              current: newSum,
              streak: exerciseStreak,
              met: newSum >= exerciseTarget,
            },
          });
        }
        inputDiv.remove();
      });
      let inputUndoBtn = document.createElement("button");
      inputUndoBtn.textContent = "Undo";
      inputUndoBtn.style.color = window.getComputedStyle(document.querySelector('body')).getPropertyValue('background-color');
      inputUndoBtn.style.backgroundColor = window.getComputedStyle(document.getElementById('moon-button')).getPropertyValue('color');

      inputUndoBtn.addEventListener("click", () => {
        inputDiv.remove();
      });
      inputContainer.append(inputLabel, inputNumber);
      btnsContainer.append(inputUndoBtn, inputSubmitBtn);
      inputDiv.append(inputContainer, btnsContainer);
      document
        .getElementById("exercise-current")
        .parentNode.insertBefore(
          inputDiv,
          document.getElementById("exercise-current").nextSibling
        );
    }
  });

  div.append(title, streak, target, current, addBtn);
  return div;
}

// Sleep Function

function createSleepDiv(data) {
  let div = document.createElement("div");
  div.setAttribute("id", "sleep-container");
  div.setAttribute("class", "habit-container");

  let title = document.createElement("h3");
  title.innerText = "Sleep";

  let streak = document.createElement("p");
  streak.innerText = "Streak: " + data.streak;
  streak.setAttribute("class", "habit-streak");
  streak.setAttribute("id", "sleep-streak");

  let target = document.createElement("p");
  target.innerText = "Target Hours of Sleep: " + data.required + " hours";
  target.setAttribute("class", "habit-target");
  target.setAttribute("id", "sleep-target");

  let current = document.createElement("p");
  current.innerText = "Hours Slept: " + data.current + " hours";
  current.setAttribute("class", "habit-current");
  current.setAttribute("id", "sleep-current");

  let addBtn = document.createElement("button");
  addBtn.setAttribute("id", "habit-button");
  addBtn.innerText = "+";
  addBtn.addEventListener("click", (e) => {
    if (e.target === document.getElementById("sleep-current").nextSibling) {
      let inputDiv = document.createElement("div");
      let inputBorder = window.getComputedStyle(document.querySelector('.userName')).getPropertyValue('border-color');
      inputDiv.setAttribute('class', "sleep-input-container");
      inputDiv.style.display = "flex";
      inputDiv.style.flexDirection = "column";
      inputDiv.style.borderTop =
      `1px solid ${inputBorder}`;

      let inputContainer = document.createElement("div");
      inputContainer.style.display = "flex";

      let btnsContainer = document.createElement("div");
      btnsContainer.style.display = "flex";

      let inputLabel = document.createElement("label");
      inputLabel.textContent = "Hours of Sleep:";

      let inputNumber = document.createElement("input");
      inputNumber.setAttribute("type", "number");
      inputNumber.style.backgroundColor = window.getComputedStyle(document.querySelector('body')).getPropertyValue('background-color');
      inputNumber.style.color = window.getComputedStyle(document.getElementById('moon-button')).getPropertyValue('color');
      inputNumber.style.borderBottom =
      `1px solid ${inputBorder}`;

      let inputSubmitBtn = document.createElement("button");
      inputSubmitBtn.textContent = "Add Entry";
      inputSubmitBtn.style.color = window.getComputedStyle(document.querySelector('body')).getPropertyValue('background-color');
      inputSubmitBtn.style.backgroundColor = window.getComputedStyle(document.getElementById('moon-button')).getPropertyValue('color');

      inputSubmitBtn.addEventListener("click", () => {
        let sleepStreak = parseInt(
          document.getElementById("sleep-streak").innerText.split(" ")[1]
        );
        let sleepTarget = parseInt(
          document.getElementById("sleep-target").innerText.split(" ")[4]
        );
        let sleepCurrent = parseInt(
          document.getElementById("sleep-current").innerText.split(" ")[2]
        );
        let newEntry = parseInt(inputNumber.value);
        if (!newEntry || newEntry <= 0) {
          alert("Please input a positive number to add an entry");
        } else {
          let newSum = sleepCurrent + newEntry;
          if (sleepCurrent < sleepTarget && newSum >= sleepTarget) {
            sleepStreak += 1;
            document.getElementById("sleep-streak").innerText =
              "Streak: " + sleepStreak;
          }
          document.getElementById("sleep-current").textContent =
            "Hours Slept: " + newSum + " hours";
          inputDiv.remove();
          updateHabits({
            "habits.sleep": {
              required: sleepTarget,
              current: newSum,
              streak: sleepStreak,
              met: newSum >= sleepTarget,
            },
          });
        }
        inputDiv.remove();
      });
      let inputUndoBtn = document.createElement("button");
      inputUndoBtn.textContent = "Undo";
      inputUndoBtn.style.color = window.getComputedStyle(document.querySelector('body')).getPropertyValue('background-color');
      inputUndoBtn.style.backgroundColor = window.getComputedStyle(document.getElementById('moon-button')).getPropertyValue('color');
      
      inputUndoBtn.addEventListener("click", () => {
        inputDiv.remove();
      });
      inputContainer.append(inputLabel, inputNumber);
      btnsContainer.append(inputUndoBtn, inputSubmitBtn);
      inputDiv.append(inputContainer, btnsContainer);
      document
        .getElementById("sleep-current")
        .parentNode.insertBefore(
          inputDiv,
          document.getElementById("sleep-current").nextSibling
        );
    }
  });
  div.append(title, streak, target, current, addBtn);
  return div;
}

// Create Chart Function

function createChart(dataHabit) {
  const ctx = document.getElementById("myChart").getContext("2d");
  // what goes on the x axis
  const labels = dataHabit.map((d) => d.date);
  const values = dataHabit.map((habits) =>
    calcValues(Object.entries(habits.habits))
  );
  //   const goals = Object.keys(dataHabit).length;
  const data = {
    labels,
    datasets: calcDatasets(dataHabit),
  };
  const config = {
    type: "bar",
    data: data,
    options: {
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    },
  };
  const myChart = new Chart(ctx, config);
}

function calcValues(habits) {
  let dataSet = []; //each index is for a different habit
  let numberOfHabits = habits.length;
  habits.forEach((habit) => {
    if (habit[1].current > habit[1].required) {
      habit[1].current = habit[1].required;
    }
    let value = (habit[1].current / habit[1].required) * (100 / numberOfHabits);
    dataSet.push(value);
  });
  return dataSet;
}

function calcDatasets(habits) {
  const habitArr = habits.map((habit) => Object.entries(habit.habits));
  let dataset = [];
  let numberOfHabits = habitArr[0].length;
  let labels = habitArr[0].map((habit) => habit[0]);
  const values = habits.map((habits) =>
    calcValues(Object.entries(habits.habits))
  );
  let backgrounds = ["#3decdd", "blue", "#49799b"];
  let borders = ["rgb(255, 99, 132)", "rgb(255, 99, 132)", "rgb(255, 99, 132)"];
  for (let count = 0; count < numberOfHabits; count++) {
    dataset.push({
      label: labels[count],
      backgroundColor: backgrounds[count],
      borderColor: borders[count],
      data: values.map((arr) => arr[count]),
    });
  }

  return dataset;
}

function userLogOut() {
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("email");
  window.localStorage.removeItem("userId");
  window.localStorage.removeItem("name");
  window.location.pathname = "";
}
// createChart();

function addEventListeners() {
  const btn = document.getElementById("moon-button");
  btn.addEventListener("click", () => {
    
    if (
      window
        .getComputedStyle(document.querySelector("#user-page-dashboard h1"))
        .getPropertyValue("background-color") == "rgb(61, 236, 221)"
    ) {
      darkMode();
    } else {
      lightMode();
    }
  });

  const open = document.getElementById("open");
  const modal_container = document.getElementById("modal-container");
  const close = document.getElementById("close");

  open.addEventListener("click", () => {
    modal_container.classList.add("show");
  });

  close.addEventListener("click", () => {
    modal_container.classList.remove("show");
  });

  document.querySelector("div.modal button").addEventListener("click", () => {
    userLogOut();
  });
}
