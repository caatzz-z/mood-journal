let selectedMood = null;

document.querySelectorAll(".emotion").forEach((emotion) => {
  emotion.addEventListener("click", () => {
    selectedMood = emotion.dataset.emotion;

    document
      .querySelectorAll(".emotion")
      .forEach((e) => e.classList.remove("selected"));
    emotion.classList.add("selected");

    if (selectedMood === "Happy") launchConfetti();

    changeBackground(selectedMood);
  });
});

document.getElementById("saveBtn").addEventListener("click", () => {
  const today = document.getElementById("today").value;
  const wentWell = document.getElementById("wentWell").value;

  if (!selectedMood) return alert("Please select your mood first!");

  const entry = {
    mood: selectedMood,
    today,
    wentWell,
    date: new Date().toLocaleString(),
  };
  let entries = JSON.parse(localStorage.getItem("moodEntries") || "[]");
  entries.push(entry);
  localStorage.setItem("moodEntries", JSON.stringify(entries));

  alert("mood saved successfully! 😎");
  document.getElementById("today").value = "";
  document.getElementById("wentWell").value = "";
  selectedMood = null;
  document
    .querySelectorAll(".emotion")
    .forEach((e) => e.classList.remove("selected"));
});

function launchConfetti() {
  const canvas = document.getElementById("confettiCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const confetti = [];
  const colors = [
    "#ff92a0",
    "#ffda80",
    "#c586f2",
    "#ffd55a",
    "#86e3d0",
    "#e63939",
  ];

  for (let i = 0; i < 150; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 2,
      d: Math.random() * 10 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      tilt: Math.random() * 10 - 10,
    });
  }

  let frame = 0;
  const interval = setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach((c) => {
      ctx.beginPath();
      ctx.lineWidth = c.r;
      ctx.strokeStyle = c.color;
      ctx.moveTo(c.x + c.tilt + c.r / 2, c.y);
      ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r / 2);
      ctx.stroke();

      c.y += c.d / 2;
      c.x += Math.sin(frame / 10);
      if (c.y > canvas.height) c.y = -10;
    });
    frame++;
  }, 20);

  setTimeout(() => {
    clearInterval(interval);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, 4000);
}

function changeBackground(mood) {
  const body = document.body;
  switch (mood) {
    case "Angry":
      body.style.background = "linear-gradient(270deg, #e63939, #d62828)";
      break;
    case "Cry":
      body.style.background = "linear-gradient(270deg, #3ea0f0, #2a80c0)";
      break;
    case "Don't know":
      body.style.background = "linear-gradient(270deg, #7fd9c8, #5fc8b8)";
      break;
    case "Embarrassed":
      body.style.background = "linear-gradient(270deg, #6dc9b9, #4db8a9)";
      break;
    case "Flushed":
      body.style.background = "linear-gradient(270deg, #ffd55a, #ffcc33)";
      break;
    case "Happy":
      body.style.background =
        "linear-gradient(270deg, #ff92a0, #ffb6c1, #ffd76b, #86e3d0)";
      break;
    case "Mid":
      body.style.background = "linear-gradient(270deg, #ffda80, #ffd150)";
      break;
    case "Shout":
      body.style.background = "linear-gradient(270deg, #c586f2, #a465f0)";
      break;
    default:
      body.style.background =
        "linear-gradient(270deg, #ffb6c1, #ffd76b, #86e3d0, #c586f2)";
  }
}
