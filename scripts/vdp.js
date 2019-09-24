(() => {
  const getInventory = () => {
    const vin = new URLSearchParams(window.location.search).get('vin');

    return fetch(
        `${window.carcodeUrls[window.carcodeSettingsData.env].inventory}?vin=${vin}`,
      )
        .then(data => data.json());
  };

  const insertCard = async () => {
    let [{ results: [ inventory ] }, cardHtml] = await Promise.all([
      getInventory(),
      fetch('/inventory-card')
        .then(response => response.text())
    ]);

    cardHtml = cardHtml
      .replace('{{src}}', inventory.vehicleInfo.photo.defaultPhoto ? inventory.vehicleInfo.photo.defaultPhoto.large.url : null)
      .replace('{{title}}', `${inventory.vehicleInfo.styleInfo.year} ${inventory.vehicleInfo.styleInfo.make} ${inventory.vehicleInfo.styleInfo.model}`)
      .replace('{{make}}', inventory.vehicleInfo.styleInfo.make)
      .replace('{{model}}', inventory.vehicleInfo.styleInfo.model)
      .replace('{{year}}', inventory.vehicleInfo.styleInfo.year)
      .replace('{{vin}}', inventory.vin)
      .replace('{{trim}}', inventory.vehicleInfo.styleInfo.trim)
      .replace('{{dataVin}}', inventory.vin)
      .replace('{{dataVin}}', inventory.vin)
      .replace('{{href}}', `#`)
      .replace('{{href}}', `#`)
      .replace('{{stockNumber}}', inventory.stockNumber);

    $('#card').html(cardHtml);

    if (location.href.includes('sdk=disabled')) {
      $('.card-actions').remove();
    }
  };

  const init = async () => {
    await insertCard();
  };

  init();
})();
