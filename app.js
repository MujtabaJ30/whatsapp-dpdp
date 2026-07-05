const icons = {
  back: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M15 18l-6-6 6-6"></path>
    </svg>
  `,
  spark: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3z"></path>
    </svg>
  `,
  shield: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3l7 3v5c0 4.6-2.9 8.7-7 10-4.1-1.3-7-5.4-7-10V6l7-3z"></path>
    </svg>
  `,
  chat: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 17l-4 3V6.8A2.8 2.8 0 0 1 6.8 4h10.4A2.8 2.8 0 0 1 20 6.8v6.4A2.8 2.8 0 0 1 17.2 16H8z"></path>
    </svg>
  `,
  briefcase: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 7V5.8A1.8 1.8 0 0 1 10.8 4h2.4A1.8 1.8 0 0 1 15 5.8V7"></path>
      <path d="M4 9.5h16v7.7A1.8 1.8 0 0 1 18.2 19H5.8A1.8 1.8 0 0 1 4 17.2V9.5z"></path>
      <path d="M4 11.4a29.4 29.4 0 0 0 16 0"></path>
    </svg>
  `,
  contacts: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 12a8 8 0 0 1 13.6-5.6L20 9"></path>
      <path d="M20 4v5h-5"></path>
      <path d="M20 12a8 8 0 0 1-13.6 5.6L4 15"></path>
      <path d="M4 20v-5h5"></path>
    </svg>
  `,
  cloud: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 18a4 4 0 0 1-.3-8A5.5 5.5 0 0 1 17 8.5a4 4 0 0 1 .7 7.9H7z"></path>
    </svg>
  `,
  chevron: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 6l6 6-6 6"></path>
    </svg>
  `,
  download: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 4v10"></path>
      <path d="M8 11.5L12 15.5l4-4"></path>
      <path d="M5 19h14"></path>
    </svg>
  `,
  info: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9"></circle>
      <path d="M12 10.2v5.4"></path>
      <path d="M12 7.8h.01"></path>
    </svg>
  `,
  send: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 4L9 15"></path>
      <path d="M20 4l-7 16-4-6-6-4 17-6z"></path>
    </svg>
  `,
};

const validScreens = new Set([
  "intro",
  "chats",
  "chat-thread",
  "backup",
  "businesses",
  "privacy",
  "request-status",
]);

function createState() {
  return {
    screen: "intro",
    contactsOn: false,
    messageSent: false,
    backupOn: false,
    discoveryConsent: "off",
    requestOpen: false,
    sheet: null,
    toast: null,
  };
}

function restoreState() {
  const state = createState();
  const params = new URLSearchParams(window.location.search);
  const screen = params.get("screen");

  if (validScreens.has(screen)) {
    state.screen = screen;
  }

  state.contactsOn = params.get("contacts") === "1";
  state.messageSent = params.get("message") === "1";
  state.backupOn = params.get("backup") === "1";
  state.requestOpen = params.get("request") === "1";

  const discoveryConsent = params.get("discovery");
  if (discoveryConsent === "basic" || discoveryConsent === "personalized") {
    state.discoveryConsent = discoveryConsent;
  }

  if (state.screen === "request-status") {
    state.requestOpen = true;
  }

  if (state.backupOn && !state.messageSent) {
    state.messageSent = true;
  }

  return state;
}

let state = restoreState();

const screenRoot = document.getElementById("screen-root");
const sheetRoot = document.getElementById("sheet-root");
const toastRoot = document.getElementById("toast-root");
const timeRoot = document.getElementById("status-time");

function iconButton(action, icon, label) {
  return `
    <button class="icon-button" type="button" data-action="${action}" aria-label="${label}">
      ${icon}
    </button>
  `;
}

function topbar({ title, subtitle, backAction, rightAction }) {
  return `
    <header class="topbar">
      <div class="topbar-left">
        ${
          backAction
            ? iconButton(backAction, icons.back, "Go back")
            : iconButton("noop", icons.chat, "WhatsApp")
        }
        <div class="topbar-copy">
          <h1 class="topbar-title">${title}</h1>
          <div class="topbar-subtitle">${subtitle}</div>
        </div>
      </div>
      ${rightAction ? iconButton(rightAction.action, rightAction.icon, rightAction.label) : ""}
    </header>
  `;
}

function primaryButton(action, label) {
  return `<button class="primary-button" type="button" data-action="${action}">${label}</button>`;
}

function secondaryButton(action, label) {
  return `<button class="secondary-button" type="button" data-action="${action}">${label}</button>`;
}

function nav(active) {
  return `
    <nav class="nav-shell" aria-label="App navigation">
      <button class="nav-item ${active === "chats" ? "active" : ""}" type="button" data-action="go-chats">
        ${icons.chat}
        <span>Chats</span>
      </button>
      <button class="nav-item ${active === "businesses" ? "active" : ""}" type="button" data-action="go-businesses">
        ${icons.briefcase}
        <span>Businesses</span>
      </button>
      <button class="nav-item ${active === "privacy" ? "active" : ""}" type="button" data-action="go-privacy">
        ${icons.shield}
        <span>Privacy</span>
      </button>
    </nav>
  `;
}

function chatItem({ title, subtitle, time, avatar, action, passive = false, neutral = false }) {
  const tag = passive ? "div" : "button";
  const attrs = passive ? "" : `type="button" data-action="${action}"`;

  return `
    <${tag} class="list-item ${passive ? "passive" : ""}" ${attrs}>
      <div class="avatar ${neutral ? "neutral" : ""}">${avatar}</div>
      <div class="item-copy">
        <div class="item-title-row">
          <span class="item-title">${title}</span>
          <span class="item-time">${time}</span>
        </div>
        <div class="item-subtitle">${subtitle}</div>
      </div>
      ${passive ? "" : `<span class="chat-arrow">${icons.chevron}</span>`}
    </${tag}>
  `;
}

function spotlight({ label, title, copy, action, cta }) {
  return `
    <button class="hero-spotlight" type="button" data-action="${action}">
      <span class="spotlight-label">${label}</span>
      <div class="spotlight-title">${title}</div>
      <div class="spotlight-copy">${copy}</div>
      <div class="spotlight-link">${cta} ${icons.chevron}</div>
    </button>
  `;
}

function renderIntro() {
  return `
    <section class="screen">
      <div class="content">
        <div class="stack">
          <div style="padding-top: 18px;"></div>
          <span class="eyebrow">Before you continue</span>

          <section class="hero-card">
            <h2 class="hero-title">What WhatsApp needs to get you started</h2>
            <p class="hero-copy">
              WhatsApp uses your phone number and basic device and service information to create
              your account, deliver messages, and help keep your account secure.
            </p>
          </section>

          <section class="panel">
            <div class="panel-row">
              <span class="panel-label">Needed now</span>
              <p class="panel-copy">
                Account setup, message delivery, security checks, and spam prevention.
              </p>
            </div>
            <div class="panel-row">
              <span class="status-chip optional">Optional later</span>
              <p class="panel-copy">
                Contacts, chat backup, and business discovery settings can be turned on later.
              </p>
            </div>
          </section>

          <div class="button-stack">
            ${primaryButton("start", "Continue")}
            ${secondaryButton("show-essential-sheet", "Learn more")}
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderChats() {
  let topCard = "";

  if (!state.contactsOn) {
    topCard = spotlight({
      label: "Optional",
      title: "Find friends on WhatsApp",
      copy: "Allow access to your contacts to find people you already know.",
      action: "show-contacts-sheet",
      cta: "Review",
    });
  } else if (!state.messageSent) {
    topCard = spotlight({
      label: "Contacts on",
      title: "Your contacts are ready",
      copy: "Start a chat with people you already know on WhatsApp.",
      action: "open-chat-thread",
      cta: "Open chat",
    });
  } else if (!state.backupOn) {
    topCard = spotlight({
      label: "Recommended",
      title: "Back up your chats",
      copy: "Keep your messages safe so you can restore them if you switch phones.",
      action: "open-backup",
      cta: "Set up backup",
    });
  } else if (state.discoveryConsent === "off") {
    topCard = spotlight({
      label: "Optional",
      title: "Find nearby businesses",
      copy: "Choose whether WhatsApp can personalize business results for you.",
      action: "go-businesses",
      cta: "Explore",
    });
  } else {
    topCard = spotlight({
      label: "Privacy",
      title: "Review your privacy settings",
      copy: "Manage contacts, backup, business discovery, and data requests in one place.",
      action: "go-privacy",
      cta: "Open",
    });
  }

  const aaravPreview = state.messageSent ? "You: On my way." : "Landing at 7. Need anything from the store?";

  return `
    <section class="screen">
      ${topbar({
        title: "WhatsApp",
        subtitle: "Chats",
        rightAction: { action: "go-privacy", icon: icons.shield, label: "Privacy" },
      })}

      <div class="content">
        <div class="stack">
          ${topCard}

          <section class="panel">
            <div class="section-header">
              <h2 class="section-title">Chats</h2>
              <span class="status-chip ${state.contactsOn ? "optional" : ""}">
                ${state.contactsOn ? "Contacts active" : "Manual start still works"}
              </span>
            </div>

            <div class="list">
              ${
                state.contactsOn
                  ? chatItem({
                      title: "Aarav",
                      subtitle: aaravPreview,
                      time: "7:02 PM",
                      avatar: "A",
                      action: "open-chat-thread",
                    })
                  : chatItem({
                      title: "Start with a phone number",
                      subtitle: "You can still message someone even if you skip contact sync.",
                      time: "Manual",
                      avatar: "+",
                      passive: true,
                      neutral: true,
                    })
              }
              ${chatItem({
                title: "Mom",
                subtitle: "Call me when you reach home.",
                time: "6:18 PM",
                avatar: "M",
                passive: true,
              })}
              ${chatItem({
                title: "Ved Bookstore",
                subtitle:
                  state.discoveryConsent === "personalized"
                    ? "Business results can be personalized if you turn that on."
                    : "Browse and message businesses on WhatsApp.",
                time: "Business",
                avatar: "V",
                passive: true,
              })}
            </div>
          </section>
        </div>
      </div>

      ${nav("chats")}
    </section>
  `;
}

function renderChatThread() {
  return `
    <section class="screen chat-surface">
      ${topbar({
        title: "Aarav",
        subtitle: "online",
        backAction: "go-chats",
        rightAction: { action: "go-privacy", icon: icons.shield, label: "Privacy" },
      })}

      <div class="chat-feed">
        <div class="date-pill">Today</div>
        <div class="message incoming">
          Landing at 7. Need anything from the store?
          <div class="message-meta">6:54 PM</div>
        </div>
        <div class="message outgoing">
          Fruit works. Maybe sparkling water too.
          <div class="message-meta">6:56 PM</div>
        </div>
        <div class="message incoming">
          Done. See you in a bit.
          <div class="message-meta">6:58 PM</div>
        </div>
        ${
          state.messageSent
            ? `
              <div class="message outgoing">
                On my way.
                <div class="message-meta">7:02 PM</div>
              </div>
              <section class="summary-card" style="padding: 14px;">
                <h2 class="summary-title" style="font-size: 0.98rem;">Back up this chat history</h2>
                <p class="summary-copy" style="margin: 6px 0 0; font-size: 0.92rem;">
                  Keep your recent chats safe in case you lose or change your phone.
                </p>
              </section>
            `
            : ""
        }
      </div>

      <div class="composer">
        ${
          !state.messageSent
            ? `
              <div class="quick-row">
                <button class="quick-chip" type="button" data-action="send-message">On my way</button>
                <button class="quick-chip" type="button" data-action="send-message">Leaving now</button>
              </div>
            `
            : ""
        }

        <div class="compose-bar">
          <span class="compose-placeholder">
            ${state.messageSent ? "Backup can be reviewed now" : "Quick reply demo"}
          </span>
          <button
            class="send-button"
            type="button"
            data-action="${state.messageSent ? "open-backup" : "send-message"}"
            aria-label="${state.messageSent ? "Review backup" : "Send quick reply"}"
          >
            ${state.messageSent ? icons.cloud : icons.send}
          </button>
        </div>
      </div>
    </section>
  `;
}

function renderBackup() {
  return `
    <section class="screen">
      ${topbar({
        title: "Chat backup",
        subtitle: "Optional",
        backAction: "go-chats",
      })}

      <div class="content">
        <div class="stack">
          <div class="visual-block">
            <div class="visual-card">
              <div style="color: var(--text-faint); font-size: 0.78rem;">Protects</div>
              <div style="margin-top: 6px; font-weight: 700; color: var(--text-strong);">Conversation history</div>
            </div>
            <div class="visual-stack"></div>
            <div class="visual-cloud"></div>
          </div>

          <div>
            <span class="eyebrow">Recommended</span>
            <h2 class="hero-title" style="font-size: 1.5rem; margin-top: 10px;">Back up your chats</h2>
            <p class="hero-copy">
              Restore your chats if you lose your phone or move to a new one.
            </p>
          </div>

          <section class="panel">
            <div class="meta-row">
              <div class="meta-icon">${icons.cloud}</div>
              <div class="meta-copy">
                <strong>What you get</strong>
                <span>Restore your chats when you switch devices or reinstall WhatsApp.</span>
              </div>
            </div>
            <div class="meta-row">
              <div class="meta-icon">${icons.shield}</div>
              <div class="meta-copy">
                <strong>Where it is stored</strong>
                <span>Your backup is saved in your cloud account and can be turned off anytime.</span>
              </div>
            </div>
            <div class="meta-row">
              <div class="meta-icon">${icons.info}</div>
              <div class="meta-copy">
                <strong>If you skip this</strong>
                <span>You can keep using WhatsApp normally, but your chats may not be easy to restore later.</span>
              </div>
            </div>
          </section>

          <div class="button-stack">
            ${primaryButton("enable-backup", "Turn on backup")}
            ${secondaryButton("go-chats", "Not now")}
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderBusinesses() {
  const personalized = state.discoveryConsent === "personalized";
  const basic = state.discoveryConsent === "basic";

  return `
    <section class="screen">
      ${topbar({
        title: "Businesses",
        subtitle: "Explore businesses",
        rightAction: { action: "go-privacy", icon: icons.shield, label: "Privacy" },
      })}

      <div class="content">
        <div class="stack">
          <section class="hero-card">
            <span class="panel-label">${personalized ? "On" : "Optional"}</span>
            <h2 class="hero-title" style="font-size: 1.42rem; margin-top: 12px;">
              Get more relevant business results
            </h2>
            <p class="hero-copy">
              Allow WhatsApp to use your city and business browsing activity to improve what you see here.
            </p>
          </section>

          <section class="panel">
            <div class="section-header">
              <h2 class="section-title">Business results</h2>
              <span class="status-chip ${personalized ? "optional" : ""}">
                ${personalized ? "Personalized" : basic ? "Standard" : "Choose setting"}
              </span>
            </div>

            <div class="meta-row">
              <div class="meta-icon">${icons.briefcase}</div>
              <div class="meta-copy">
                <strong>What changes</strong>
                <span>If you turn this on, WhatsApp can show more relevant businesses based on your location and activity here.</span>
              </div>
            </div>
          </section>

          ${
            state.discoveryConsent === "off"
              ? `
                <div class="button-stack">
                  ${primaryButton("enable-discovery", "Allow personalized results")}
                  ${secondaryButton("basic-discovery", "Use standard results")}
                </div>
              `
              : ""
          }

          <section class="panel">
            <div class="section-header">
              <h2 class="section-title">Business chats</h2>
            </div>
            <div class="list">
              ${chatItem({
                title: "Ved Bookstore",
                subtitle:
                  personalized
                    ? "Suggested based on your city and recent business activity."
                    : "Textbooks, stationery, and delivery support.",
                time: personalized ? "Suggested" : "Available now",
                avatar: "V",
                passive: true,
              })}
              ${chatItem({
                title: "Math Mentor Studio",
                subtitle: "Home tutoring and doubt-solving sessions.",
                time: "Replies fast",
                avatar: "M",
                passive: true,
              })}
            </div>
          </section>
        </div>
      </div>

      ${nav("businesses")}
    </section>
  `;
}

function renderPrivacy() {
  const discoveryOn = state.discoveryConsent === "personalized";

  return `
    <section class="screen">
      ${topbar({
        title: "Privacy",
        subtitle: "Manage your data and settings",
        rightAction: { action: "restart", icon: icons.spark, label: "Restart flow" },
      })}

      <div class="content">
        <div class="stack">
          <section class="panel">
            <div class="section-header">
              <h2 class="section-title">Always on</h2>
              <span class="status-chip">Active</span>
            </div>
            <p class="panel-copy">
              Your phone number and basic service and security information are used to keep WhatsApp working and help protect your account.
            </p>
          </section>

          <section class="panel">
            <div class="section-header">
              <h2 class="section-title">Optional features</h2>
              <span class="status-chip optional">You can change these anytime</span>
            </div>

            <div class="setting-row">
              <div class="setting-copy">
                <strong>Contact sync</strong>
                <span>Lets WhatsApp match people in your address book when you want to find them by name.</span>
              </div>
              <button
                class="setting-toggle ${state.contactsOn ? "on" : ""}"
                type="button"
                role="switch"
                aria-checked="${state.contactsOn}"
                data-action="toggle-contacts"
              ></button>
            </div>

            <div class="setting-row">
              <div class="setting-copy">
                <strong>Encrypted backup</strong>
                <span>Protects chat history in your cloud account so it can be restored later.</span>
              </div>
              <button
                class="setting-toggle ${state.backupOn ? "on" : ""}"
                type="button"
                role="switch"
                aria-checked="${state.backupOn}"
                data-action="toggle-backup"
              ></button>
            </div>

            <div class="setting-row">
              <div class="setting-copy">
                <strong>Business discovery personalization</strong>
                <span>Uses optional discovery signals to rank merchants more helpfully.</span>
              </div>
              <button
                class="setting-toggle ${discoveryOn ? "on" : ""}"
                type="button"
                role="switch"
                aria-checked="${discoveryOn}"
                data-action="toggle-discovery"
              ></button>
            </div>
          </section>

          <section class="panel">
            <div class="section-header">
              <h2 class="section-title">Your data</h2>
              <span class="status-chip ${state.requestOpen ? "optional" : ""}">
                ${state.requestOpen ? "Request in progress" : "No active request"}
              </span>
            </div>

            <button class="rights-button" type="button" data-action="open-request-status">
              <div class="rights-row">
                <div class="rights-copy">
                  <strong>Request your account data</strong>
                  <span>Get a copy of your account information and privacy settings.</span>
                </div>
                <div class="meta-icon">${icons.download}</div>
              </div>
            </button>

            <button class="rights-button" type="button" data-action="show-rights-sheet">
              <div class="rights-row">
                <div class="rights-copy">
                  <strong>Correction and deletion options</strong>
                  <span>See how to update your information or delete your account.</span>
                </div>
                <div class="meta-icon">${icons.info}</div>
              </div>
            </button>
          </section>
        </div>
      </div>

      ${nav("privacy")}
    </section>
  `;
}

function renderRequestStatus() {
  return `
    <section class="screen">
      ${topbar({
        title: "Account data request",
        subtitle: "Status",
        backAction: "go-privacy",
      })}

      <div class="content">
        <div class="stack">
          <section class="hero-card">
            <span class="panel-label">Submitted</span>
            <h2 class="hero-title" style="font-size: 1.42rem; margin-top: 12px;">Your request is being prepared</h2>
            <p class="hero-copy">
              We’ll let you know here when your account data is ready to download.
            </p>
          </section>

          <section class="timeline">
            <h2 class="section-title">Progress</h2>
            <p class="timeline-copy" style="margin: 6px 0 0;">Request ID: WA-IND-0714</p>

            <div class="timeline-step">
              <div class="timeline-index">1</div>
              <div>
                <strong>Requested</strong>
                <span>Your request has been received.</span>
              </div>
            </div>

            <div class="timeline-step">
              <div class="timeline-index">2</div>
              <div>
                <strong>Preparing</strong>
                <span>Your account data is being prepared. This can take up to 24 hours.</span>
              </div>
            </div>

            <div class="timeline-step">
              <div class="timeline-index">3</div>
              <div>
                <strong>Ready to download</strong>
                <span>You’ll see an in-app update when it’s ready.</span>
              </div>
            </div>
          </section>

          <div class="button-stack">
            ${primaryButton("go-privacy", "Back to Privacy Center")}
            ${secondaryButton("restart", "Restart flow")}
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderScreenMarkup() {
  switch (state.screen) {
    case "intro":
      return renderIntro();
    case "chats":
      return renderChats();
    case "chat-thread":
      return renderChatThread();
    case "backup":
      return renderBackup();
    case "businesses":
      return renderBusinesses();
    case "privacy":
      return renderPrivacy();
    case "request-status":
      return renderRequestStatus();
    default:
      return renderIntro();
  }
}

function sheetMarkup() {
  if (state.sheet === "essential") {
    return `
      <div class="sheet-backdrop" data-action="close-sheet"></div>
      <div class="sheet-wrap">
        <section class="sheet">
          <div class="sheet-handle"></div>
          <h2 class="sheet-title">How WhatsApp uses your information</h2>
          <p class="sheet-copy">
            WhatsApp uses your phone number and basic device and service information to create your account, deliver messages, and help keep the service secure.
          </p>
          <div class="sheet-points">
            <div class="meta-row">
              <div class="meta-icon">${icons.shield}</div>
              <div class="meta-copy">
                <strong>Used to keep WhatsApp running</strong>
                <span>Includes account setup, message delivery, and security checks.</span>
              </div>
            </div>
            <div class="meta-row">
              <div class="meta-icon">${icons.contacts}</div>
              <div class="meta-copy">
                <strong>Optional features come later</strong>
                <span>Contacts, chat backup, and business discovery can be turned on later.</span>
              </div>
            </div>
          </div>
          <div class="sheet-actions">
            <button class="sheet-button secondary" type="button" data-action="close-sheet">Close</button>
          </div>
        </section>
      </div>
    `;
  }

  if (state.sheet === "contacts") {
    return `
      <div class="sheet-backdrop" data-action="close-sheet"></div>
      <div class="sheet-wrap">
        <section class="sheet">
          <div class="sheet-handle"></div>
          <h2 class="sheet-title">Find friends from your contacts</h2>
          <p class="sheet-copy">
            Allow WhatsApp to access your contacts so you can find people you already know.
          </p>
          <div class="sheet-points">
            <div class="meta-row">
              <div class="meta-icon">${icons.contacts}</div>
              <div class="meta-copy">
                <strong>What this does</strong>
                <span>Matches people in your address book who are already on WhatsApp.</span>
              </div>
            </div>
            <div class="meta-row">
              <div class="meta-icon">${icons.info}</div>
              <div class="meta-copy">
                <strong>If you choose not now</strong>
                <span>You can still start chats by entering a phone number manually.</span>
              </div>
            </div>
          </div>
          <div class="sheet-actions">
            <button class="sheet-button primary-button" type="button" data-action="enable-contacts">Allow contact sync</button>
            <button class="sheet-button secondary" type="button" data-action="close-sheet">Not now</button>
          </div>
        </section>
      </div>
    `;
  }

  if (state.sheet === "rights") {
    return `
      <div class="sheet-backdrop" data-action="close-sheet"></div>
      <div class="sheet-wrap">
        <section class="sheet">
          <div class="sheet-handle"></div>
          <h2 class="sheet-title">Correction and deletion</h2>
          <p class="sheet-copy">
            You can update some information in the app. For account deletion, additional confirmation may be required.
          </p>
          <div class="sheet-points">
            <div class="meta-row">
              <div class="meta-icon">${icons.info}</div>
              <div class="meta-copy">
                <strong>Correction</strong>
                <span>Update profile details and privacy settings from within the app.</span>
              </div>
            </div>
            <div class="meta-row">
              <div class="meta-icon">${icons.shield}</div>
              <div class="meta-copy">
                <strong>Deletion</strong>
                <span>Deleting your account may require confirmation before it is completed.</span>
              </div>
            </div>
          </div>
          <div class="sheet-actions">
            <button class="sheet-button secondary" type="button" data-action="close-sheet">Close</button>
          </div>
        </section>
      </div>
    `;
  }

  return "";
}

function renderSheet() {
  if (!state.sheet) {
    sheetRoot.className = "sheet-root";
    sheetRoot.innerHTML = "";
    return;
  }

  sheetRoot.className = "sheet-root active";
  sheetRoot.innerHTML = sheetMarkup();
}

function renderToast() {
  if (!state.toast) {
    toastRoot.innerHTML = "";
    return;
  }

  toastRoot.innerHTML = `<div class="toast">${state.toast}</div>`;
}

function syncUrl() {
  const params = new URLSearchParams();

  if (state.screen !== "intro") {
    params.set("screen", state.screen);
  }
  if (state.contactsOn) {
    params.set("contacts", "1");
  }
  if (state.messageSent) {
    params.set("message", "1");
  }
  if (state.backupOn) {
    params.set("backup", "1");
  }
  if (state.discoveryConsent !== "off") {
    params.set("discovery", state.discoveryConsent);
  }
  if (state.requestOpen) {
    params.set("request", "1");
  }

  const nextUrl = `${window.location.pathname}${params.toString() ? `?${params}` : ""}`;
  window.history.replaceState(null, "", nextUrl);
}

function renderScreen(direction = null) {
  const markup = renderScreenMarkup();
  const current = screenRoot.querySelector(".screen-panel");

  if (!current || !direction) {
    if (current) {
      current.innerHTML = markup;
    } else {
      const panel = document.createElement("div");
      panel.className = "screen-panel";
      panel.innerHTML = markup;
      screenRoot.appendChild(panel);
    }
    syncUrl();
    renderSheet();
    renderToast();
    return;
  }

  const next = document.createElement("div");
  next.className = `screen-panel is-entering ${direction === "back" ? "is-back" : ""}`;
  next.innerHTML = markup;
  screenRoot.appendChild(next);

  requestAnimationFrame(() => {
    next.classList.add("is-live");
    current.classList.add("is-exiting");
    if (direction === "back") {
      current.classList.add("is-back");
    }
  });

  window.setTimeout(() => {
    current.remove();
    next.className = "screen-panel";
  }, 300);

  syncUrl();
  renderSheet();
  renderToast();
}

function go(screen, direction = "forward") {
  state.screen = screen;
  renderScreen(direction);
}

function refresh() {
  renderScreen();
}

function showToast(message) {
  state.toast = message;
  renderToast();

  window.setTimeout(() => {
    if (state.toast === message) {
      state.toast = null;
      renderToast();
    }
  }, 2200);
}

function reset() {
  state = createState();
  screenRoot.innerHTML = "";
  go("intro");
}

function openRequestStatus() {
  state.requestOpen = true;
  go("request-status", "forward");
  showToast("Your data summary request is now in progress.");
}

function handleAction(action) {
  switch (action) {
    case "noop":
      return;
    case "restart":
      reset();
      return;
    case "start":
      state.sheet = null;
      go("chats", "forward");
      return;
    case "show-essential-sheet":
      state.sheet = "essential";
      renderSheet();
      return;
    case "show-contacts-sheet":
      state.sheet = "contacts";
      renderSheet();
      return;
    case "show-rights-sheet":
      state.sheet = "rights";
      renderSheet();
      return;
    case "close-sheet":
      state.sheet = null;
      renderSheet();
      return;
    case "enable-contacts":
      state.contactsOn = true;
      state.sheet = null;
      refresh();
      showToast("Contact sync is active.");
      return;
    case "open-chat-thread":
      go("chat-thread", "forward");
      return;
    case "send-message":
      state.messageSent = true;
      refresh();
      showToast("You now have chat history worth protecting.");
      return;
    case "open-backup":
      go("backup", "forward");
      return;
    case "enable-backup":
      state.backupOn = true;
      go("chats", "back");
      showToast("Encrypted backup is on.");
      return;
    case "enable-discovery":
      state.discoveryConsent = "personalized";
      refresh();
      showToast("Business discovery personalization is active.");
      return;
    case "basic-discovery":
      state.discoveryConsent = "basic";
      refresh();
      showToast("Browsing continues without personalization.");
      return;
    case "toggle-contacts":
      state.contactsOn = !state.contactsOn;
      if (!state.contactsOn) {
        state.messageSent = false;
      }
      refresh();
      showToast(state.contactsOn ? "Contact sync turned on." : "Contact sync turned off.");
      return;
    case "toggle-backup":
      state.backupOn = !state.backupOn;
      refresh();
      showToast(state.backupOn ? "Encrypted backup turned on." : "Encrypted backup turned off.");
      return;
    case "toggle-discovery":
      state.discoveryConsent = state.discoveryConsent === "personalized" ? "basic" : "personalized";
      refresh();
      showToast(
        state.discoveryConsent === "personalized"
          ? "Discovery personalization turned on."
          : "Discovery personalization turned off."
      );
      return;
    case "open-request-status":
      openRequestStatus();
      return;
    case "go-chats":
      go("chats", "back");
      return;
    case "go-businesses":
      go("businesses", "forward");
      return;
    case "go-privacy":
      go("privacy", "forward");
      return;
    default:
      return;
  }
}

function updateClock() {
  const now = new Date();
  timeRoot.textContent = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (!button) {
    return;
  }

  handleAction(button.dataset.action);
});

updateClock();
window.setInterval(updateClock, 60000);
renderScreen();
