(() => {
  "use strict";

  const TIME_ZONE = "America/New_York";

  function updateText(selector, text) {
    const element = document.querySelector(selector);
    if (element) element.textContent = text;
  }

  function enhancePage() {
    document.title = "Honeycomb Oasis 3X | Wipe Schedule, Rules & Live Timers";

    const description = "Honeycomb Oasis 3X Rust server rules, monthly wipe schedule, live Raid Weekend and wipe countdowns, PvP zones, Purge Week, Hive Events, Offline Protection, and Discord access.";
    const metaDescription = document.querySelector('meta[name="description"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (metaDescription) metaDescription.content = description;
    if (ogDescription) ogDescription.content = "Monthly wipe schedule, live timers, official rules, Hive Events, Purge Week information, and Discord access.";

    const nav = document.querySelector(".nav-links");
    if (nav) {
      nav.querySelectorAll("a:not(.discord-button)").forEach((link) => link.remove());
      const discord = nav.querySelector(".discord-button");
      if (discord) {
        discord.insertAdjacentHTML(
          "beforebegin",
          '<a href="#timer">Raid Timer</a><a href="#schedule">Wipe Schedule</a><a href="#rules">Rules</a><a href="#events">Events</a>'
        );
      }
    }

    updateText(
      ".lead",
      "A PvE-focused Rust server with monument and arena PvP, scheduled Raid Weekends, a monthly map wipe, Zorp Offline Protection, Hive Events, and a full seven-day Purge."
    );

    const primaryAction = document.querySelector(".actions .primary-button");
    const secondaryAction = document.querySelector(".actions .secondary-button");
    if (primaryAction) primaryAction.textContent = "View Live Timers";
    if (secondaryAction) {
      secondaryAction.textContent = "View Wipe Schedule";
      secondaryAction.href = "#schedule";
    }

    const stats = document.querySelectorAll(".quick-stats .stat");
    if (stats[3]) {
      stats[3].innerHTML = "<span>Map Wipe</span><strong>Last Day Monthly — 2 PM</strong>";
    }

    const findRuleCard = (heading) =>
      Array.from(document.querySelectorAll(".rule-card")).find(
        (card) => card.querySelector("h3")?.textContent.trim() === heading
      );

    const pvpCard = findRuleCard("PvP Zones");
    if (pvpCard?.querySelector("li")) {
      pvpCard.querySelector("li").textContent = "PvP is enabled at all Monuments and at the Hive Arena.";
    }

    const purgeCard = findRuleCard("Purge Week");
    const purgeItems = purgeCard?.querySelectorAll("li");
    if (purgeItems?.[2]) purgeItems[2].textContent = "Expect increased PvP, raids, and chaos.";

    const protectionCard = findRuleCard("Offline Protection");
    const protectionItems = protectionCard?.querySelectorAll("li");
    if (protectionItems?.[1]) protectionItems[1].textContent = "Protection only applies while Zorp protection is active.";
    if (protectionItems?.[2]) protectionItems[2].textContent = "Players must correctly link and maintain their protection.";

    updateText(".raid-banner h3", "Build Your Hive. Defend Your Territory. Rule The Oasis.");
    const footerLine = document.querySelector(".footer p");
    if (footerLine) footerLine.innerHTML = "<strong>Honeycomb Oasis 3X</strong> — Build Your Hive. Defend Your Territory. Rule The Oasis.";

    if (!document.getElementById("schedule")) {
      const rulesSection = document.getElementById("rules");
      rulesSection?.insertAdjacentHTML(
        "beforebegin",
        `
        <section class="section" id="schedule" aria-labelledby="schedule-title">
          <div class="container">
            <span class="section-label">Monthly Wipe Cycle</span>
            <h2 class="section-heading" id="schedule-title">Honeycomb Oasis 3X Wipe Schedule</h2>
            <p class="section-copy">The map wipes on the last day of every month at 2:00 PM EST. The final seven days before that wipe become Purge Week, with raiding active 24/7.</p>

            <div class="hero-grid">
              <article class="panel timer-panel" aria-labelledby="wipe-title">
                <div class="timer-header">
                  <div><span class="panel-kicker">Next Map Wipe</span><h2 id="wipe-title">Monthly Wipe Timer</h2></div>
                  <div id="wipe-status" class="status closed" role="status" aria-live="polite">Checking</div>
                </div>
                <p id="wipe-copy" class="timer-copy">Calculating the next map wipe...</p>
                <p id="wipe-target" class="target">Last day of the month at 2:00 PM EST</p>
                <div class="countdown" aria-label="Countdown to the next map wipe">
                  <div class="time-unit"><span id="wipe-days" class="time-number">00</span><span class="time-label">Days</span></div>
                  <div class="time-unit"><span id="wipe-hours" class="time-number">00</span><span class="time-label">Hours</span></div>
                  <div class="time-unit"><span id="wipe-minutes" class="time-number">00</span><span class="time-label">Minutes</span></div>
                  <div class="time-unit"><span id="wipe-seconds" class="time-number">00</span><span class="time-label">Seconds</span></div>
                </div>
                <div class="schedule-grid">
                  <div class="schedule-card"><span>Map Wipe</span><strong>Last Day of Every Month</strong></div>
                  <div class="schedule-card"><span>Wipe Time</span><strong>2:00 PM EST</strong></div>
                  <div class="schedule-card"><span>Purge Begins</span><strong id="purge-target">Seven Days Before Wipe</strong></div>
                  <div class="schedule-card"><span>Purge Raiding</span><strong>24/7 Until Wipe</strong></div>
                </div>
              </article>

              <article class="panel intro-panel">
                <span class="eyebrow">Wipe Schedule</span>
                <h2 class="section-heading">What Changes During the Wipe</h2>
                <div class="schedule-grid">
                  <div class="schedule-card"><span>PvP Rules</span><strong>PvE Map · PvP at Monuments and Hive Arena</strong></div>
                  <div class="schedule-card"><span>Weekend Raiding</span><strong>Friday 7:30 AM → Monday 7:30 AM</strong></div>
                  <div class="schedule-card"><span>Seven-Day Purge</span><strong>No Raid-Time Restrictions</strong></div>
                  <div class="schedule-card"><span>Zorp Protection</span><strong>Protected While Active</strong></div>
                </div>
                <div class="timer-note"><strong>Weekend Raiding:</strong> Online and offline raids are allowed while raiding is active. During Purge Week, raiding stays enabled around the clock.</div>
              </article>
            </div>
          </div>
        </section>`
      );
    }

    if (!document.getElementById("events")) {
      const communitySection = document.querySelector(".community")?.closest("section");
      communitySection?.insertAdjacentHTML(
        "beforebegin",
        `
        <section class="section" id="events" aria-labelledby="events-title">
          <div class="container">
            <span class="section-label">Throughout the Wipe</span>
            <h2 class="section-heading" id="events-title">Hive Events</h2>
            <p class="section-copy">Fight, explore, raid, compete, and earn rewards through rotating events across the wipe.</p>
            <div class="rule-grid">
              <article class="rule-card"><div class="rule-heading"><span class="rule-icon" aria-hidden="true">🔫</span><div><span class="rule-number">EVENT</span><h3>Sting or Be Stung</h3></div></div><ul><li>Fast-paced Gun Game battles.</li></ul></article>
              <article class="rule-card"><div class="rule-heading"><span class="rule-icon" aria-hidden="true">🏚️</span><div><span class="rule-number">EVENT</span><h3>Raid Bases</h3></div></div><ul><li>Attack custom raid targets and claim the loot.</li></ul></article>
              <article class="rule-card"><div class="rule-heading"><span class="rule-icon" aria-hidden="true">🚢</span><div><span class="rule-number">EVENT</span><h3>Docked Cargo</h3></div></div><ul><li>Fight for control of high-value cargo events.</li></ul></article>
              <article class="rule-card"><div class="rule-heading"><span class="rule-icon" aria-hidden="true">🛡️</span><div><span class="rule-number">EVENT</span><h3>Bradley Events</h3></div></div><ul><li>Take down Bradley and secure the crates.</li></ul></article>
              <article class="rule-card"><div class="rule-heading"><span class="rule-icon" aria-hidden="true">⚔️</span><div><span class="rule-number">EVENT</span><h3>Arena Battles</h3></div></div><ul><li>Enter the Hive Arena and prove your skill.</li></ul></article>
              <article class="rule-card"><div class="rule-heading"><span class="rule-icon" aria-hidden="true">🗺️</span><div><span class="rule-number">EVENT</span><h3>Treasure Hunts</h3></div></div><ul><li>Track clues and discover hidden rewards.</li></ul></article>
              <article class="rule-card"><div class="rule-heading"><span class="rule-icon" aria-hidden="true">🐝</span><div><span class="rule-number">EVENT</span><h3>Community Challenges</h3></div></div><ul><li>Work together or compete for server-wide rewards.</li></ul></article>
            </div>
          </div>
        </section>`
      );
    }
  }

  enhancePage();

  const ids = [
    "status", "timer-copy", "target", "days", "hours", "minutes", "seconds", "current-time",
    "wipe-status", "wipe-copy", "wipe-target", "wipe-days", "wipe-hours", "wipe-minutes", "wipe-seconds", "purge-target"
  ];
  const elements = Object.fromEntries(ids.map((id) => [id, document.getElementById(id)]));

  if (Object.values(elements).some((element) => !element)) {
    console.error("Live schedule timers could not start because one or more page elements are missing.");
    return;
  }

  const partFormatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23"
  });

  const displayFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short"
  });

  function getZonedParts(date) {
    const raw = Object.fromEntries(
      partFormatter
        .formatToParts(date)
        .filter((part) => part.type !== "literal")
        .map((part) => [part.type, Number(part.value)])
    );
    return { year: raw.year, month: raw.month, day: raw.day, hour: raw.hour, minute: raw.minute, second: raw.second };
  }

  function easternWallTimeToUtc(year, month, day, hour, minute, second = 0) {
    const desiredWallTimeAsUtc = Date.UTC(year, month - 1, day, hour, minute, second);
    let guess = desiredWallTimeAsUtc;
    for (let attempt = 0; attempt < 4; attempt += 1) {
      const actual = getZonedParts(new Date(guess));
      const actualWallTimeAsUtc = Date.UTC(actual.year, actual.month - 1, actual.day, actual.hour, actual.minute, actual.second);
      guess += desiredWallTimeAsUtc - actualWallTimeAsUtc;
    }
    return new Date(guess);
  }

  function shiftCalendarDate(parts, numberOfDays) {
    const shifted = new Date(Date.UTC(parts.year, parts.month - 1, parts.day + numberOfDays));
    return { year: shifted.getUTCFullYear(), month: shifted.getUTCMonth() + 1, day: shifted.getUTCDate() };
  }

  function getLastDayOfMonth(year, month) {
    return new Date(Date.UTC(year, month, 0)).getUTCDate();
  }

  function getNextWipeState(now) {
    const local = getZonedParts(now);
    let year = local.year;
    let month = local.month;
    let day = getLastDayOfMonth(year, month);
    let wipe = easternWallTimeToUtc(year, month, day, 14, 0);

    if (now >= wipe) {
      month += 1;
      if (month > 12) {
        month = 1;
        year += 1;
      }
      day = getLastDayOfMonth(year, month);
      wipe = easternWallTimeToUtc(year, month, day, 14, 0);
    }

    const purgeDate = shiftCalendarDate({ year, month, day }, -7);
    const purgeStart = easternWallTimeToUtc(purgeDate.year, purgeDate.month, purgeDate.day, 14, 0);
    return { wipe, purgeStart, isPurge: now >= purgeStart && now < wipe };
  }

  function getRaidState(now, wipeState) {
    if (wipeState.isPurge) return { mode: "purge", isOpen: true, target: wipeState.wipe };

    const local = getZonedParts(now);
    const weekday = new Date(Date.UTC(local.year, local.month - 1, local.day)).getUTCDay();
    const daysSinceFriday = (weekday - 5 + 7) % 7;
    const currentFriday = shiftCalendarDate(local, -daysSinceFriday);
    const currentOpen = easternWallTimeToUtc(currentFriday.year, currentFriday.month, currentFriday.day, 7, 30);
    const currentMonday = shiftCalendarDate(currentFriday, 3);
    const currentClose = easternWallTimeToUtc(currentMonday.year, currentMonday.month, currentMonday.day, 7, 30);

    if (now >= currentOpen && now < currentClose) return { mode: "weekend", isOpen: true, target: currentClose };

    let nextFriday = shiftCalendarDate(local, (5 - weekday + 7) % 7);
    let nextOpen = easternWallTimeToUtc(nextFriday.year, nextFriday.month, nextFriday.day, 7, 30);
    if (nextOpen <= now) {
      nextFriday = shiftCalendarDate(nextFriday, 7);
      nextOpen = easternWallTimeToUtc(nextFriday.year, nextFriday.month, nextFriday.day, 7, 30);
    }
    return { mode: "protected", isOpen: false, target: nextOpen };
  }

  function pad(value) {
    return String(value).padStart(2, "0");
  }

  function setCountdown(prefix, target, now) {
    const totalSeconds = Math.floor(Math.max(0, target.getTime() - now.getTime()) / 1000);
    elements[`${prefix}days`].textContent = pad(Math.floor(totalSeconds / 86400));
    elements[`${prefix}hours`].textContent = pad(Math.floor((totalSeconds % 86400) / 3600));
    elements[`${prefix}minutes`].textContent = pad(Math.floor((totalSeconds % 3600) / 60));
    elements[`${prefix}seconds`].textContent = pad(totalSeconds % 60);
  }

  function renderTimers() {
    try {
      const now = new Date();
      const wipeState = getNextWipeState(now);
      const raidState = getRaidState(now, wipeState);

      setCountdown("", raidState.target, now);
      setCountdown("wipe-", wipeState.wipe, now);

      if (raidState.mode === "purge") {
        elements.status.textContent = "Purge Active";
        elements.status.className = "status open";
        elements["timer-copy"].textContent = "Purge Week is active — raiding remains enabled 24/7 until map wipe";
      } else if (raidState.isOpen) {
        elements.status.textContent = "Raiding Active";
        elements.status.className = "status open";
        elements["timer-copy"].textContent = "Time remaining before Weekend Raiding ends";
      } else {
        elements.status.textContent = "Bases Protected";
        elements.status.className = "status closed";
        elements["timer-copy"].textContent = "Time remaining before Weekend Raiding begins";
      }

      elements.target.textContent = displayFormatter.format(raidState.target);
      elements["wipe-status"].textContent = wipeState.isPurge ? "Purge Active" : "Wipe Scheduled";
      elements["wipe-status"].className = `status ${wipeState.isPurge ? "open" : "closed"}`;
      elements["wipe-copy"].textContent = wipeState.isPurge
        ? "Purge Week is active. Time remaining until the map wipes"
        : "Time remaining until the next monthly map wipe";
      elements["wipe-target"].textContent = displayFormatter.format(wipeState.wipe);
      elements["purge-target"].textContent = wipeState.isPurge
        ? `Active since ${displayFormatter.format(wipeState.purgeStart)}`
        : displayFormatter.format(wipeState.purgeStart);
      elements["current-time"].textContent = `Current Eastern time: ${displayFormatter.format(now)}`;
    } catch (error) {
      console.error("Live schedule timer error:", error);
      elements.status.textContent = "Timer Unavailable";
      elements.status.className = "status closed";
      elements["timer-copy"].textContent = "Weekend Raiding runs Friday 7:30 AM EST through Monday 7:30 AM EST.";
      elements.target.textContent = "Refresh the page in a modern browser.";
      elements["wipe-status"].textContent = "Timer Unavailable";
      elements["wipe-status"].className = "status closed";
      elements["wipe-copy"].textContent = "The map wipes on the last day of every month at 2:00 PM EST.";
      elements["wipe-target"].textContent = "Refresh the page in a modern browser.";
    }
  }

  renderTimers();
  window.setInterval(renderTimers, 1000);
})();
