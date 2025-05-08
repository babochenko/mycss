const $ = (sel) => document.querySelector(sel);

const onKey = (key, lambda) => {
  document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === key.toLowerCase() && !e.metaKey && !e.ctrlKey) {
      lambda();
    }
  });
};

const chatInput = () => $('#chatframe')?.contentWindow?.document
  ?.querySelector('yt-live-chat-text-input-field-renderer')
  ?.querySelector('#input')

const chatInputObserver = new MutationObserver(() => {
  const input = chatInput();
  if (input) {
    chatInputObserver.disconnect()
    input.focus();
  }
});

onKey('c', () => {
  const closeChat = $('#close-button button');
  const openChat = $('#show-hide-button button');
  (closeChat || openChat)?.click();

  chatInputObserver.disconnect()
  chatInputObserver.observe(document.body, { childList: true, subtree: true });
});

//onKey('Escape', () => {
//  chatInput()?.blur();
//});
//
