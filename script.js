const loginView = document.querySelector("#loginView");
const appView = document.querySelector("#appView");
const loginForm = document.querySelector("#loginForm");
const loginError = document.querySelector("#loginError");
const toast = document.querySelector("#toast");
const posts = document.querySelector("#posts");
const composerPanel = document.querySelector("#composerPanel");
const postInput = document.querySelector("#postInput");

const feed = [
  {
    initials: "MP",
    name: "Maya Patel",
    time: "18 min ago",
    copy: "A quiet morning, a good playlist, and a fresh page in my notebook. Sometimes that is all the reset you need.",
    likes: 24,
    comments: 6,
    color: "avatar-pink",
  },
  {
    initials: "JD",
    name: "Jordan Davis",
    time: "1 hr ago",
    copy: "Found a beautiful walking route through the city today. Sharing the little moments that make a busy week feel lighter.",
    likes: 41,
    comments: 12,
    color: "avatar-green",
  },
  {
    initials: "RC",
    name: "Riley Chen",
    time: "3 hrs ago",
    copy: "What is one small win you are celebrating this week? I finally shipped a project I have been quietly working on.",
    likes: 18,
    comments: 4,
    color: "avatar-orange",
  },
];

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2600);
}

function renderPosts() {
  posts.innerHTML = "";
  feed.forEach((post) => {
    const card = document.createElement("article");
    card.className = "post-card";
    card.dataset.search = `${post.name} ${post.copy}`.toLowerCase();
    card.innerHTML = `
      <div class="post-header">
        <span class="avatar ${post.color}">${post.initials}</span>
        <div><strong>${post.name}</strong><p>${post.time} · <span>◉</span></p></div>
        <button class="more-button" type="button" aria-label="More options">•••</button>
      </div>
      <p class="post-copy">${post.copy}</p>
      <div class="post-stats"><span><b>${post.likes}</b> likes</span><span>${post.comments} comments</span></div>
      <div class="post-actions">
        <button class="like-button" type="button"><span>♡</span> Like</button>
        <button type="button" class="comment-button"><span>◌</span> Comment</button>
        <button type="button" class="share-button"><span>↗</span> Share</button>
      </div>`;
    posts.append(card);
  });
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value;
  if (!email || !email.includes("@")) {
    loginError.textContent = "Please enter a valid email address.";
    return;
  }
  if (password.length < 4) {
    loginError.textContent = "Password must be at least 4 characters.";
    return;
  }
  loginError.textContent = "";
  loginView.classList.add("hidden");
  appView.classList.remove("hidden");
  renderPosts();
  window.scrollTo(0, 0);
});

document.querySelector(".password-toggle").addEventListener("click", (event) => {
  const password = document.querySelector("#password");
  const isPassword = password.type === "password";
  password.type = isPassword ? "text" : "password";
  event.currentTarget.textContent = isPassword ? "Hide" : "Show";
  event.currentTarget.setAttribute("aria-label", `${isPassword ? "Hide" : "Show"} password`);
});

document.querySelector("#logoutButton").addEventListener("click", () => {
  appView.classList.add("hidden");
  loginView.classList.remove("hidden");
  loginForm.reset();
  showToast("You’ve been logged out.");
});

document.querySelector("#forgotLink").addEventListener("click", (event) => {
  event.preventDefault();
  showToast("Password reset instructions are on their way.");
});

document.querySelector("#signupLink").addEventListener("click", (event) => {
  event.preventDefault();
  showToast("Sign-up is coming soon.");
});

document.querySelectorAll(".social-button").forEach((button) => {
  button.addEventListener("click", () => showToast(`${button.textContent.trim()} sign-in is coming soon.`));
});

document.querySelector("#composerTrigger").addEventListener("click", () => {
  composerPanel.classList.toggle("hidden");
  if (!composerPanel.classList.contains("hidden")) postInput.focus();
});

document.querySelector("#postSubmit").addEventListener("click", () => {
  const copy = postInput.value.trim();
  if (!copy) {
    showToast("Write something before posting.");
    postInput.focus();
    return;
  }
  feed.unshift({ initials: "AS", name: "Alex Smith", time: "Just now", copy, likes: 0, comments: 0, color: "avatar-profile" });
  postInput.value = "";
  composerPanel.classList.add("hidden");
  renderPosts();
  showToast("Your post was shared.");
});

posts.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  const card = button.closest(".post-card");
  if (button.classList.contains("like-button")) {
    const count = card.querySelector(".post-stats b");
    const liked = button.classList.toggle("liked");
    button.querySelector("span").textContent = liked ? "♥" : "♡";
    count.textContent = Number(count.textContent) + (liked ? 1 : -1);
  } else if (button.classList.contains("comment-button")) {
    showToast("Comments are ready to view.");
  } else if (button.classList.contains("share-button")) {
    showToast("Post link copied to your clipboard.");
  }
});

document.querySelector("#searchInput").addEventListener("input", (event) => {
  const query = event.target.value.toLowerCase().trim();
  document.querySelectorAll("#posts .post-card").forEach((post) => {
    post.style.display = !query || post.dataset.search.includes(query) ? "" : "none";
  });
});

document.querySelectorAll(".add-friend").forEach((button) => {
  button.addEventListener("click", () => {
    button.textContent = button.textContent === "+" ? "✓" : "+";
    button.classList.toggle("added");
    showToast(button.classList.contains("added") ? "Friend request sent." : "Friend request cancelled.");
  });
});

document.querySelectorAll(".story").forEach((story) => {
  story.addEventListener("click", () => showToast(`${story.querySelector("small").textContent}’s story opened.`));
});

document.querySelectorAll(".nav-item").forEach((item) => {
  item.addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelectorAll(".nav-item").forEach((nav) => nav.classList.remove("active"));
    item.classList.add("active");
    showToast(item.textContent.includes("Home") ? "You’re already on your home feed." : `${item.textContent.trim()} is coming soon.`);
  });
});
