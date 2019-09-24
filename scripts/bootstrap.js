(() => {
  const urls = {
    dev: {
      widget: 'https://dev-dsg11-www.carcodesms.com/widgets/:dealerId.js',
      inventories: 'https://dev-ext-www.carcode.com/carcode/v1/ccapi/dealer/:rooftopId/inventories/widget/search?pagesize=5&pagenum=1',
      inventory: 'https://qa-11-www.edmunds.com/api/inventory/v5/find',
    },
    qa: {
      widget: 'https://qa-dsg11-www.carcodesms.com/widgets/:dealerId.js',
      inventories: 'https://qa-ext-www.carcode.com/carcode/v1/ccapi/dealer/:rooftopId/inventories/widget/search?pagesize=5&pagenum=1',
      inventory: 'https://qa-11-www.edmunds.com/api/inventory/v5/find',
    },
    prod: {
      widget: 'https://www.carcodesms.com/widgets/:dealerId.js',
      inventories: 'https://www.carcode.com/carcode/v1/ccapi/dealer/:rooftopId/inventories/widget/search?pagesize=5&pagenum=1',
      inventory: 'https://www.edmunds.com/api/inventory/v5/find',
    },
  };

  window.carcodeUrls = urls;

  const loadScript = (url, onLoad) => {
    // render widgets/tracker
    const script = document.createElement('script');

    script.type = 'text/javascript';
    script.async = true;
    script.src = url;

    if (onLoad) {
      script.addEventListener('load', onLoad, false);
    }

    script.addEventListener('error', () => {
      alert(`The following script ${url} failed to load. Please recheck configuration (ctrl + p) and network connection.`)
    }, false);

    document.getElementsByTagName('script')[0].parentNode.insertBefore(script, document.getElementsByTagName('script')[0]);
  };

  const loadWidget = () => {
    if (window.carcodeSettingsData.sdk) {
      window.__carcode = window.carcodeSettingsData.sdk;
    }

    loadScript(urls[window.carcodeSettingsData.env].widget.replace(':dealerId', window.carcodeSettingsData.dealerId));
  };

  const loadEva = () => {
    loadScript('https://content-container.edmunds.com/850449.js');
  };

  const init = () => {
    if (!window.carcodeSettingsData) {
      return;
    }


    loadWidget();
    loadEva();
  };

  init();
})();
