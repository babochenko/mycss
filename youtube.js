const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const onKey = (key, lambda) => {
  onKeyOn(document, key, lambda);
};

const onKeyOn = (document, key, lambda) => {
  document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === key.toLowerCase() && !e.metaKey && !e.ctrlKey) {
      lambda();
    }
  });
};

const chat = () => $('#chatframe')?.contentWindow?.document;

const chatInput = () => chat()
  ?.querySelector('yt-live-chat-text-input-field-renderer')
  ?.querySelector('#input')

const chatInputObserver = new MutationObserver(() => {
  const input = chatInput();
  if (input) {
    chatInputObserver.disconnect()
    input.focus();

    onKeyOn(chat(), 'Escape', () => {
      chatInput()?.blur();
      window.focus();
    });
  }
});

onKey('c', () => {
  const closeChat = $('#close-button button');
  const openChat = $('#show-hide-button button');
  (closeChat || openChat)?.click();

  chatInputObserver.disconnect()
  chatInputObserver.observe(document.body, { childList: true, subtree: true });
});

// hide video suggestions, if no playlist chapters
const rightColObserver = new MutationObserver(() => {
  const rightCol = $('#columns > #secondary');

  if (rightCol) {
    rightColObserver.disconnect()
    if ($$('#playlist > #container > #items > *').length == 0) {
      rightCol.style.display = 'none';
    }
  }
});
rightColObserver.observe(document.body, { childList: true, subtree: true });

