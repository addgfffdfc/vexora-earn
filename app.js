const tg = window.Telegram?.WebApp;

if (tg) {
    tg.ready();
    tg.expand();
}

function startTask(name) {
    alert(name + "\n\nTask opened.");
}

const welcome = document.querySelector(".welcome-card");
const stats = document.querySelector(".stats");
const section = document.querySelector(".section");
const nav = document.querySelectorAll(".nav-item");

let pageBox = document.createElement("div");
pageBox.id = "page-box";
pageBox.style.display = "none";

document.querySelector(".app").insertBefore(
    pageBox,
    document.querySelector(".bottom-nav")
);

function openPage(page) {

    welcome.style.display = "none";
    stats.style.display = "none";
    section.style.display = "none";
    pageBox.style.display = "none";

    if (page === "Home") {
        welcome.style.display = "";
        stats.style.display = "";
        section.style.display = "";
    }

    if (page === "Tasks") {
        section.style.display = "";

        section.querySelector(".section-title h2").textContent =
            "All Tasks";
    }

    if (page === "Wallet") {
        pageBox.style.display = "block";

        pageBox.innerHTML = `
            <div style="
                padding:30px;
                text-align:center;
                color:white;
            ">
                <h2>💰 Wallet</h2>
                <h1>$0.00</h1>
                <p>Your available balance</p>
                <button onclick="alert('Complete tasks to earn rewards.')">
                    Withdraw
                </button>
            </div>
        `;
    }

    if (page === "Profile") {
        pageBox.style.display = "block";

        pageBox.innerHTML = `
            <div style="
                padding:30px;
                text-align:center;
                color:white;
            ">
                <h2>👤 Profile</h2>
                <h3>Vexora Earn User</h3>
                <p>Total Earned: $0.00</p>
                <p>Completed Tasks: 0</p>
            </div>
        `;
    }
}

nav.forEach(function(button) {

    button.addEventListener("click", function() {

        nav.forEach(function(item) {
            item.classList.remove("active");
        });

        this.classList.add("active");

        const page =
            this.querySelector("small").textContent.trim();

        openPage(page);
    });

});

openPage("Home");
