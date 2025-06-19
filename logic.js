// logic.js

document.getElementById("actionForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = new FormData(e.target);

  const order = ["왕자", "병사", "의붓어머니", "앨리시아", "신데렐라", "돌리"];
  const destroyers = ["신데렐라", "앨리시아", "병사"];
  const ringers = ["돌리", "의붓어머니", "왕자"];

  let bellResult = null;
  for (const name of order) {
    const item = form.get(`${name}_action2`)?.trim();
    if (item === "철제 펜") {
      if (destroyers.includes(name)) {
        bellResult = "B";
        break;
      } else if (ringers.includes(name)) {
        bellResult = "R";
        break;
      }
    }
  }
  if (!bellResult) bellResult = "R"; // 기본값

  const vote = form.get("vote");
  const assassination = form.get("assassination");

  const motherItem = form.get("의붓어머니_action1")?.toLowerCase();
  const hasWeapon = motherItem?.includes("빗") || motherItem?.includes("과도");
  const target = assassination;

  let thirdLetter = "N"; // 기본값: 암살 실패

  if (hasWeapon) {
    const guardAction = form.get("병사_action1")?.replaceAll(" ", "");
    const isProtected = guardAction?.includes("의붓어머니") && guardAction?.includes(target);
    thirdLetter = isProtected ? "G" : target;
  }

  const endingCode = `${bellResult}${vote}${thirdLetter}`;
  document.getElementById("endingCode").textContent = endingCode;
  document.getElementById("result").style.display = "block";
});
