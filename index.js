(() => {
  const init = () => {
    const chatButton = document.getElementById('chat');
    const smsButton = document.getElementById('sms');
    const facebookButton = document.getElementById('facebook');

    let isSmsWidgetAttached;
    let isChatWidgetAttached;

    const closeSmsWidget = () => {
      widget.detachSmsWidget();

      isSmsWidgetAttached = false;
    }

    const closeChatWidget = () => {
      widget.closeChat();

      isChatWidgetAttached = false;
    }

    chatButton.addEventListener('click', () => {
      isSmsWidgetAttached && closeSmsWidget();

      widget.openChat();

      isChatWidgetAttached = true;
    });

    smsButton.addEventListener('click', () => {
      isChatWidgetAttached && closeChatWidget();

      widget.openSmsSalesForm();
      widget.attachSmsWidget();

      isSmsWidgetAttached = true;
    });

    smsButton.addEventListener('click', () => {
      isChatWidgetAttached && closeChatWidget();

      widget.openSmsSalesForm();
      widget.attachSmsWidget();

      isSmsWidgetAttached = true;
    });

    facebookButton.addEventListener('click', () => {
      widget.openFacebook();
    });
  };

  window.widget = new CarcodeWidget();
  widget.init(init);
})();
