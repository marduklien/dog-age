const calculateBtn = document.getElementById("calculateBtn");
const resultDiv = document.getElementById("result");
const birthInput = document.getElementById("birthdate");

// 🔹 頁面載入時讀取 LocalStorage
window.addEventListener("load", function () {
    const savedDate = localStorage.getItem("dogBirthdate");
    const savedResult = localStorage.getItem("dogResult");

    if (savedDate) {
        birthInput.value = savedDate;
    }

    if (savedResult) {
        resultDiv.innerHTML = savedResult;
    }
});

// 🔹 計算按鈕
calculateBtn.addEventListener("click", function () {
    const birthdateInput = birthInput.value;

    if (!birthdateInput) {
        resultDiv.innerHTML = "請先選擇狗狗出生日期 🐶";
        return;
    }

    const birthDate = new Date(birthdateInput);
    const today = new Date();

    if (birthDate > today) {
        resultDiv.innerHTML = "出生日期不能大於今天 😊";
        return;
    }

    // 計算年齡
    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();

    if (ageMonths < 0) {
        ageYears--;
        ageMonths += 12;
    }

    // 人類年換算
    let humanAge = 0;

    if (ageYears <= 0) {
        humanAge = (ageMonths / 12) * 15;
    } else {
        humanAge += 15;

        if (ageYears > 1) {
            humanAge += 9;
        }

        if (ageYears > 2) {
            humanAge += (ageYears - 2) * 5;
        }

        humanAge += (ageMonths / 12) * 5;
    }

    humanAge = Math.round(humanAge * 10) / 10;

    const resultHTML = `
        狗狗年齡：<strong>${ageYears} 歲 ${ageMonths} 個月</strong><br>
        換算人類年齡：約 <strong>${humanAge} 歲</strong>
    `;

    resultDiv.innerHTML = resultHTML;

    // 🔹 存進 LocalStorage
    localStorage.setItem("dogBirthdate", birthdateInput);
    localStorage.setItem("dogResult", resultHTML);
});