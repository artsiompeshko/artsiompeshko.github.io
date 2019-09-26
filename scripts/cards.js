(() => {
  const defaultInventories = {
    new: [
      {
        vin: "JM1DKFD78K0401501",
        make: "Mazda",
        model: "CX-3",
        year: 2019,
        trim: "Grand Touring",
        type: "NEW",
        stockNumber: "M14000",
        rooftopId: 57,
        displayPrice: 28910.0,
        baseMsrp: 27145.0,
        totalMsrp: 28960.0,
        mileage: 94,
        photoUrl: "https://media.ed.edmunds-media.com/for-sale/ac-jm1dkfd78k0401501/img-1-600x400.jpg",
      },
      {
        vin: "JM3KFADM7K1646277",
        make: "Mazda",
        model: "CX-5",
        year: 2019,
        trim: "Grand Touring",
        type: "NEW",
        stockNumber: "M15094",
        rooftopId: 57,
        displayPrice: 31550.0,
        baseMsrp: 30045.0,
        totalMsrp: 31490.0,
        mileage: 0,
        photoUrl: "https://media.ed.edmunds-media.com/mazda/cx-5/2017/oem/2017_mazda_cx-5_4dr-suv_grand-touring_fq_oem_6_300.jpg",
      },
      {
        vin: "JM1BPAMM4K1120937",
        make: "Mazda",
        model: "3",
        year: 2019,
        trim: "Preferred",
        type: "NEW",
        stockNumber: "M14722",
        rooftopId: 57,
        displayPrice: 26715.0,
        baseMsrp: 25200.0,
        totalMsrp: 26120.0,
        mileage: 89,
        photoUrl: "https://media.ed.edmunds-media.com/for-sale/42-jm1bpamm4k1120937/img-1-600x400.jpg",
      },
      {
        vin: "JM3KFADM7K1646277",
        make: "Mazda",
        model: "CX-5",
        year: 2019,
        trim: "Grand Touring",
        type: "NEW",
        stockNumber: "M15094",
        rooftopId: 57,
        displayPrice: 31550.0,
        baseMsrp: 30045.0,
        totalMsrp: 31490.0,
        mileage: 0,
        photoUrl: "https://media.ed.edmunds-media.com/mazda/cx-5/2017/oem/2017_mazda_cx-5_4dr-suv_grand-touring_fq_oem_6_300.jpg",
      },
      {
        vin: "JM1BPAMM4K1120937",
        make: "Mazda",
        model: "3",
        year: 2019,
        trim: "Preferred",
        type: "NEW",
        stockNumber: "M14722",
        rooftopId: 57,
        displayPrice: 26715.0,
        baseMsrp: 25200.0,
        totalMsrp: 26120.0,
        mileage: 89,
        photoUrl: "https://media.ed.edmunds-media.com/for-sale/42-jm1bpamm4k1120937/img-1-600x400.jpg",
      },
    ],
    used: [
      {
        baseMsrp: 24700,
        displayPrice: 11364,
         make: "Hyundai",
        mileage: 107110,
        model: "Santa Fe",
        photoUrl: "https://media.ed.edmunds-media.com/for-sale/79-5xyzu3lbxdg102545/img-1-600x400.jpg",
        rooftopId: 57,
        stockNumber: "P9550",
        totalMsrp: 32635,
        trim: "Sport",
        type: "USED",
        vin: "5XYZU3LBXDG102545",
        year: 2013,
      },
      {
        baseMsrp: 22795,
        displayPrice: 12495,
        make: "Mitsubishi",
        mileage: 70235,
        model: "Outlander Sport",
        photoUrl: "https://media.ed.edmunds-media.com/mitsubishi/outlander-sport/2015/evox/2015_mitsubishi_outlander-sport_4dr-suv_se_tds_evox_3_300.jpg",
        rooftopId: 57,
        stockNumber: "P9674",
        totalMsrp: 23620,
        trim: "SE",
        type: "USED",
        vin: "4A4AP4AU0FE009195",
        year: 2015,
      },
      {
        baseMsrp: 30045,
        displayPrice: 27995,
        make: "Mazda",
        mileage: 15187,
        model: "CX-5",
        photoUrl: "https://media.ed.edmunds-media.com/mazda/cx-5/2017/oem/2017_mazda_cx-5_4dr-suv_grand-touring_fq_oem_6_300.jpg",
        rooftopId: 57,
        stockNumber: "P9657",
        totalMsrp: 31090,
        trim: "Grand Touring",
        type: "USED",
        vin: "JM3KFADM8K0548302",
        year: 2019,
      },
      {
        baseMsrp: 22795,
        displayPrice: 12495,
        make: "Mitsubishi",
        mileage: 70235,
        model: "Outlander Sport",
        photoUrl: "https://media.ed.edmunds-media.com/mitsubishi/outlander-sport/2015/evox/2015_mitsubishi_outlander-sport_4dr-suv_se_tds_evox_3_300.jpg",
        rooftopId: 57,
        stockNumber: "P9674",
        totalMsrp: 23620,
        trim: "SE",
        type: "USED",
        vin: "4A4AP4AU0FE009195",
        year: 2015,
      },
      {
        baseMsrp: 30045,
        displayPrice: 27995,
        make: "Mazda",
        mileage: 15187,
        model: "CX-5",
        photoUrl: "https://media.ed.edmunds-media.com/mazda/cx-5/2017/oem/2017_mazda_cx-5_4dr-suv_grand-touring_fq_oem_6_300.jpg",
        rooftopId: 57,
        stockNumber: "P9657",
        totalMsrp: 31090,
        trim: "Grand Touring",
        type: "USED",
        vin: "JM3KFADM8K0548302",
        year: 2019,
      }
    ]
  };

  const getInventories = ({
    type,
  }) => fetch(
      `${window.carcodeUrls[window.carcodeSettingsData.env].inventories.replace(':rooftopId', window.carcodeSettingsData.rooftopId)}&type=${type}`,
    )
      .then(data => data.json());

  const insertCards = async () => {
    const type = location.href.includes('new.html') ? 'new' : 'used';

    let [inventories, cardHtml] = await Promise.all([
      getInventories({
        type,
      }),
      fetch('/inventory-card')
        .then(response => response.text())
    ]);

    // concat with default if needed
    inventories = inventories.concat(defaultInventories[type]);

    let cardsHtml = '';
    for (let i = 0; i < 5; i += 1) {
      const isSdkButtonAvailable = i < 3;

      cardsHtml = cardsHtml + cardHtml
        .replace('{{src}}', inventories[i].photoUrl)
        .replace('{{title}}', `${inventories[i].year} ${inventories[i].make} ${inventories[i].model}`)
        .replace('{{make}}', inventories[i].make)
        .replace('{{model}}', inventories[i].model)
        .replace('{{year}}', inventories[i].year)
        .replace('{{vin}}', inventories[i].vin)
        .replace('{{trim}}', inventories[i].trim)
        .replace('{{dataVin}}', inventories[i].vin)
        .replace('{{dataVin}}', inventories[i].vin)
        .replace('{{dataVin}}', inventories[i].vin)
        .replace('{{displayPrice}}', inventories[i].displayPrice)
        .replace('{{href}}', `/vdp.html?vin=${inventories[i].vin}${isSdkButtonAvailable ? '' : '&sdk=disabled'}`)
        .replace('{{href}}', `/vdp.html?vin=${inventories[i].vin}${isSdkButtonAvailable ? '' : '&sdk=disabled'}`)
        .replace('{{stockNumber}}', inventories[i].stockNumber);
    }

    $('#cards').html(cardsHtml);

    $('.card-actions')
      .each((index, actions) => {
        if (index >= 3) {
          $(actions).remove();
        }
      });
  };

  const init = async () => {
    await insertCards();
  };

  init();
})();
