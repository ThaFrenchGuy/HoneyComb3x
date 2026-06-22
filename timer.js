(() => {
  "use strict";

  const TIME_ZONE = "America/New_York";
  const ids = ["status", "timer-copy", "target", "days", "hours", "minutes", "seconds", "current-time"];
  const elements = Object.fromEntries(ids.map((id) => [id, document.getElementById(id)]));

  if (Object.values(elements).some((element) => !element)) {
    console.error("Raid Weekend timer could not start because one or more page elements are missing.");
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

    return {
      year: raw.year,
      month: raw.month,
      day: raw.day,
      hour: raw.hour,
      minute: raw.minute,
      second: raw.second
    };
  }

  function easternWallTimeToUtc(year, month, day, hour, minute, second = 0) {
    const desiredWallTimeAsUtc = Date.UTC(year, month - 1, day, hour, minute, second);
    let guess = desiredWallTimeAsUtc;

    // Correct the UTC guess against the actual America/New_York wall time.
    // This keeps the schedule at 7:30 AM Eastern through DST changes.
    for (let attempt = 0; attempt < 4; attempt += 1) {
      const actual = getZonedParts(new Date(guess));
      const actualWallTimeAsUtc = Date.UTC(
        actual.year,
        actual.month - 1,
        actual.day,
        actual.hour,
        actual.minute,
        actual.second
      );
      guess += desiredWallTimeAsUtc - actualWallTimeAsUtc;
    }

    return new Date(guess);
  }

  function shiftCalendarDate(parts, numberOfDays) {
    const shifted = new Date(Date.UTC(parts.year, parts.month - 1, parts.day + numberOfDays));
    return {
      year: shifted.getUTCFullYear(),
      month: shifted.getUTCMonth() + 1,
      day: shifted.getUTCDate()
    };
  }

  function getRaidWeekendState(now) {
    const local = getZonedParts(now);
    const weekday = new Date(Date.UTC(local.year, local.month - 1, local.day)).getUTCDay();

    const daysSinceFriday = (weekday - 5 + 7) % 7;
    const currentFriday = shiftCalendarDate(local, -daysSinceFriday);
    const currentOpen = easternWallTimeToUtc(
      currentFriday.year,
      currentFriday.month,
      currentFriday.day,
      7,
      30
    );

    const currentMonday = shiftCalendarDate(currentFriday, 3);
    const currentClose = easternWallTimeToUtc(
      currentMonday.year,
      currentMonday.month,
      currentMonday.day,
      7,
      30
    );

    if (now >= currentOpen && now < currentClose) {
      return {
        isOpen: true,
        target: currentClose
      };
    }

    let daysUntilFriday = (5 - weekday + 7) % 7;
    let nextFriday = shiftCalendarDate(local, daysUntilFriday);
    let nextOpen = easternWallTimeToUtc(
      nextFriday.year,
      nextFriday.month,
      nextFriday.day,
      7,
      30
    );

    if (nextOpen <= now) {
      nextFriday = shiftCalendarDate(nextFriday, 7);
      nextOpen = easternWallTimeToUtc(
        nextFriday.year,
        nextFriday.month,
        nextFriday.day,
        7,
        30
      );
    }

    return {
      isOpen: false,
      target: nextOpen
    };
  }

  function pad(value) {
    return String(value).padStart(2, "0");
  }

  function renderTimer() {
    try {
      const now = new Date();
      const state = getRaidWeekendState(now);
      const remainingMilliseconds = Math.max(0, state.target.getTime() - now.getTime());
      const totalSeconds = Math.floor(remainingMilliseconds / 1000);

      elements.days.textContent = pad(Math.floor(totalSeconds / 86400));
      elements.hours.textContent = pad(Math.floor((totalSeconds % 86400) / 3600));
      elements.minutes.textContent = pad(Math.floor((totalSeconds % 3600) / 60));
      elements.seconds.textContent = pad(totalSeconds % 60);

      elements.status.textContent = state.isOpen ? "Raiding Active" : "Bases Protected";
      elements.status.className = `status ${state.isOpen ? "open" : "closed"}`;

      elements["timer-copy"].textContent = state.isOpen
        ? "Time remaining before Raid Weekend ends"
        : "Time remaining before Raid Weekend begins";

      elements.target.textContent = displayFormatter.format(state.target);
      elements["current-time"].textContent = `Current Eastern time: ${displayFormatter.format(now)}`;
    } catch (error) {
      console.error("Raid Weekend timer error:", error);
      elements.status.textContent = "Timer Unavailable";
      elements.status.className = "status closed";
      elements["timer-copy"].textContent = "Raid Weekend runs Friday 7:30 AM EST through Monday 7:30 AM EST.";
      elements.target.textContent = "Refresh the page in a modern browser.";
    }
  }

  renderTimer();
  window.setInterval(renderTimer, 1000);
})();
