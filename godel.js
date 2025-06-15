const $ = (sel) => document.querySelector(sel);

// auto-close onboarding prompt
const onboardingObs = new MutationObserver(() => {
  const closeBtn = $('.absolute.cursor-pointer.top-0.right-0');
  if (closeBtn) {
    onboardingObs.disconnect()
    closeBtn.click();
  }
});
onboardingObs.observe(document.body, { childList: true, subtree: true });

