(() => {
  const loadForm = async () => fetch('/settings-form')
    .then(response => response.text())
    .then((formHtml) => {
      $('body').append(formHtml);
    });

  const toggleModal = () => {
    $('#settingsModal').modal('toggle');
  };

  const submitModal = () => {
    if(!$('#settingsModalForm')[0].checkValidity()) {
      $('#settingsModalForm')[0].classList.add('was-validated');
    } else {
      save();
      toggleModal();

      // navigate to home
      if (location.href.includes('settings.html')) {
        window.location.href = '/index.html';
      } else { // reload page
        location.reload();
      }
    }
  };

  const listenShortcuts = () => {
    hotkeys('ctrl+p', (event, handler) => {
      switch (handler.key) {
        case 'ctrl+p': {
          toggleModal();
          event.preventDefault();
          break;
        }
      }
    });
  };

  const listenActions = () => {
    $('#modalSave').click((e) => {
      e.preventDefault();

      submitModal();
    });

    $('#settingsModalForm').submit((e) => {
      e.preventDefault();

      submitModal();
    });
  }

  const listenSdk = () => {
    $('#sdk input')
      .change(() => {
        $('#sdkJsonInput').val()
      });
  };

  const getSettings = () => JSON.parse(window.localStorage.getItem('carcode_test_page_settings'));

  const extractEnv = () => $('#environment input:checked').val();

  const extractDealerId = () => $('#dealerIdInput').val();

  const extractRooftopId = () => $('#rooftopIdInput').val();

  const extractSdkSettings = () => {
    let result = {};

    if ($('#sdkJsonInput').val()) {
      result = JSON.parse($('#sdkJsonInput').val());
    }

    return result;
  };

  const extractForm = () => {
    const result = {
      env: extractEnv(),
      dealerId: extractDealerId(),
      rooftopId: extractRooftopId(),
      sdk: extractSdkSettings(),
    };

    return result;
  }

  const save = () => {
    const settingsData = extractForm();

    window.localStorage.setItem('carcode_test_page_settings', JSON.stringify(settingsData));
  };

  const setFormData = () => {
    const settingsData = getSettings();

    if (!settingsData) {
      return;
    }

    $('#dealerIdInput').val(settingsData.dealerId);
    $('#rooftopIdInput').val(settingsData.rooftopId);
    $(`input[name=gridRadios][value=${settingsData.env}]`).prop('checked',true);

    if (settingsData.sdk) {
      $('#sdkJsonInput').val(JSON.stringify(settingsData.sdk));
    }
  }

  const firstVisit = () => {
    $('#settingsModal').modal({ backdrop: 'static', keyboard: false });
    toggleModal();
    $('#modalClose').hide();
  }

  const init = async () => {
    // init settings global variable
    window.carcodeSettingsData = getSettings();

    // load form html
    await loadForm();

    // first opennning
    if (location.href.includes('settings.html')
      || Object.keys(window.carcodeSettingsData || {}).length === 0) {
      firstVisit();
    }

    // init form actions
    listenShortcuts();
    listenActions();
    listenSdk();
    setFormData();
  };

  init();
})();
