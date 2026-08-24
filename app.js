// Vexora Earn Telegram Mini App

const tg = window.Telegram?.WebApp;

if (tg) {
    tg.ready();
    tg.expand();

    document.documentElement.style.setProperty(
        "--tg-bg",
        tg.backgroundColor || "#0b1020"
    );
}


// App elements
const app = document.querySelector(".app");
const welcome = document.querySelector(".welcome-card");
const stats = document.querySelector(".stats");
const section = document.querySelector(".section");
const navItems = document.querySelectorAll(".nav-item");


// Dynamic page
const pageBox = document.createElement("section");

pageBox.id = "dynamic-page";

pageBox.style.display = "none";

app.insertBefore(
    pageBox,
    document.querySelector(".bottom-nav")
);


// Telegram user information
function getUserInfo() {

    if (
        tg &&
        tg.initDataUnsafe &&
        tg.initDataUnsafe.user
    ) {

        const user = tg.initDataUnsafe.user;

        return {

            name:
                user.first_name ||
                "Telegram User",

            username:
                user.username
                    ? "@" + user.username
                    : "No username"

        };

    }

    return {

        name: "Telegram User",

        username: "No username"

    };
}


// Task
function startTask(taskName) {

    if (tg) {
        tg.HapticFeedback?.impactOccurred("light");
    }

    alert(
        taskName +
        "\n\nTask opened.\nComplete the task and come back to claim your reward."
    );
}


// Home
function showHome() {

    welcome.style.display = "";
    stats.style.display = "";
    section.style.display = "";

    pageBox.style.display = "none";
}


// Tasks
function showTasks() {

    welcome.style.display = "none";
    stats.style.display = "none";
    section.style.display = "block";

    pageBox.style.display = "none";

    const title =
        section.querySelector(".section-title h2");

    if (title) {
        title.textContent = "Available Tasks";
    }
}


// Referral
function showReferral() {

    welcome.style.display = "none";
    stats.style.display = "none";
    section.style.display = "none";

    pageBox.style.display = "block";

    pageBox.innerHTML = `

        <div class="page-card">

            <h2>👥 Referral</h2>

            <p>
                Invite friends and earn rewards.
            </p>

            <div class="referral-box">

                <p>Your Referral Link</p>

                <div class="referral-link">
                    Coming Soon
                </div>

                <button
                    class="action-button"
                    onclick="alert('Referral system will be available soon.')"
                >
                    Invite Friends
                </button>

            </div>

        </div>

    `;
}


// Profile
function showProfile() {

    welcome.style.display = "none";
    stats.style.display = "none";
    section.style.display = "none";

    pageBox.style.display = "block";

    const user = getUserInfo();

    pageBox.innerHTML = `

        <div class="profile-page">

            <div class="profile-header">

                <div class="profile-avatar">
                    👤
                </div>

                <div class="profile-name">

                    <h2>${user.name}</h2>

                    <p>${user.username}</p>

                </div>

            </div>


            <div class="profile-status">

                <div>
                    <span>LEVEL</span>
                    <strong>Level 1</strong>
                </div>

                <div>
                    <span>STATUS</span>
                    <strong>Active</strong>
                </div>

            </div>


            <div class="profile-card">

                <h3>💳 Wallet</h3>

                <p>Available Balance</p>

                <strong class="profile-balance">
                    $0.00
                </strong>

            </div>


            <div class="profile-card">

                <h3>💰 Withdraw</h3>

                <p>
                    Withdraw your available balance.
                </p>

                <button
                    class="action-button"
                    onclick="alert('Withdrawal will be available soon.')"
                >
                    Withdraw
                </button>

            </div>


            <div class="profile-card community-card">

                <h3>🌐 Community</h3>

                <p>
                    Join our community and stay updated.
                </p>

                <button
                    class="action-button"
                    onclick="alert('Community link will be added soon.')"
                >
                    Join Community
                </button>

            </div>

        </div>

    `;
}


// Navigation
navItems.forEach(function(button) {

    button.addEventListener("click", function() {

        navItems.forEach(function(item) {

            item.classList.remove("active");

        });

        this.classList.add("active");

        const page =
            this.dataset.page;

        if (page === "home") {
            showHome();
        }

        else if (page === "tasks") {
            showTasks();
        }

        else if (page === "referral") {
            showReferral();
        }

        else if (page === "profile") {
            showProfile();
        }

        if (tg) {
            tg.HapticFeedback?.selectionChanged();
        }

    });

});


// Start on Home
showHome();


// Telegram Main Button
if (tg) {
    tg.MainButton.hide();
}
/* =========================================
   VEXORA THEME FIX
   Referral + Profile
   ========================================= */

function applyVexoraTheme() {

    document.querySelectorAll("button").forEach(button => {

        const text = button.innerText.trim().toLowerCase();

        if (
            text.includes("invite") ||
            text.includes("referral")
        ) {
            button.classList.add("referral-button");
        }

        if (
            text.includes("withdraw")
        ) {
            button.classList.add("profile-withdraw");
        }
    });

    document.querySelectorAll("div, section").forEach(el => {

        const text = el.innerText?.trim() || "";

        if (
            text.includes("Your Referral Link") &&
            text.includes("Invite Friends")
        ) {
            el.classList.add("referral-card");
        }

        if (
            text.includes("Available Balance") &&
            text.includes("Withdraw")
        ) {
            el.classList.add("profile-wallet");
        }

        if (
            text.includes("Community") &&
            text.includes("Join Community")
        ) {
            el.classList.add("profile-community");
        }
    });
}

applyVexoraTheme();
