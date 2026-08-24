// Telegram Mini App
const tg = window.Telegram?.WebApp;

if (tg) {
    tg.ready();
    tg.expand();

    document.documentElement.style.setProperty(
        "--tg-bg",
        tg.backgroundColor || "#0b1020"
    );
}

// Main sections
const welcomeCard = document.querySelector(".welcome-card");
const stats = document.querySelector(".stats");
const taskSection = document.querySelector(".section");
const navItems = document.querySelectorAll(".nav-item");

// Create extra page area
const app = document.querySelector(".app");

const extraPage = document.createElement("section");
extraPage.className = "extra-page";
extraPage.style.display = "none";

app.insertBefore(extraPage, document.querySelector(".bottom-nav"));

// Task button
function startTask(taskName) {

    if (tg) {
        tg.HapticFeedback?.impactOccurred("light");
    }

    alert(
        taskName +
        "\n\nTask opened.\nComplete the task and come back to claim your reward."
    );
}

// Show page
function showPage(page) {

    // Hide extra page first
    extraPage.style.display = "none";

    // Home
    if (page === "Home") {

        welcomeCard.style.display = "flex";
        stats.style.display = "grid";
        taskSection.style.display = "block";
    }

    // Tasks
    else if (page === "Tasks") {

        welcomeCard.style.display = "none";
        stats.style.display = "none";
        taskSection.style.display = "block";

        document.querySelector(".section-title h2").innerText =
            "All Tasks";
    }

    // Wallet
    else if (page === "Wallet") {

        welcomeCard.style.display = "none";
        stats.style.display = "none";
        taskSection.style.display = "none";

        extraPage.innerHTML = `
            <div class="page-card">
                <h2>💰 Wallet</h2>
                <p class="page-balance">$0.00</p>

                <div class="wallet-box">
                    <p>Available Balance</p>
                    <strong>$0.00</strong>
                </div>

                <button class="action-button">
                    Withdraw
                </button>

                <p class="note">
                    Complete tasks to increase your balance.
                </p>
            </div>
        `;

        extraPage.style.display = "block";
    }

    // Profile
    else if (page === "Profile") {

        welcomeCard.style.display = "none";
        stats.style.display = "none";
        taskSection.style.display = "none";

        extraPage.innerHTML = `
            <div class="page-card">
                <h2>👤 Profile</h2>

                <div class="profile-box">
                    <div class="profile-icon">👤</div>

                    <h3>Vexora Earn User</h3>
                    <p>Telegram Mini App</p>
                </div>

                <div class="profile-info">
                    <p><strong>Total Earned:</strong> $0.00</p>
                    <p><strong>Completed Tasks:</strong> 0</p>
                </div>
            </div>
        `;

        extraPage.style.display = "block";
    }

    if (tg) {
        tg.HapticFeedback?.selectionChanged();
    }
}


// Bottom navigation
navItems.forEach((button) => {

    button.addEventListener("click", function () {

        navItems.forEach((item) => {
            item.classList.remove("active");
        });

        this.classList.add("active");

        const page = this.querySelector("small").innerText.trim();

        showPage(page);
    });

});


// Telegram Main Button
if (tg) {
    tg.MainButton.hide();
}


// Prevent text selection
document.querySelectorAll("button").forEach((button) => {

    button.addEventListener("contextmenu", (event) => {
        event.preventDefault();
    });

});


// Start on Home
showPage("Home");
