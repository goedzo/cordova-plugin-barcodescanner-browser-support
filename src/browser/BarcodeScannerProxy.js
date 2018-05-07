

function startScan(deviceId, videoOutputElementId, success, error) {
    var library = require('./library.min');
    var codeReader = new library.Library.BrowserBarcodeReader();
    console.log(codeReader);
    var devices = codeReader.getVideoInputDevices();

    codeReader.decodeFromInputVideoDevice(devices[deviceId], videoOutputElementId).then(function (res) {
        console.log(res);
        var result = {
            text: res.getText(),
            format: res.getBarcodeFormat(),
            cancelled: false
        };
        success(result);
    }).catch(function (err) {
        console.error(err);
        error("Barcode could not be decoded");
    });
    console.log('Started continous decode from camera with id' + deviceId);

/*    document.getElementById('resetButton').addEventListener('click', () => {
        document.getElementById('result').textContent = '';
    codeReader.reset();
    })
    .catch((err) => {
          error(err);
    })*/
}

function scan(success, error) {
    var videoElement = document.getElementById("video");
    if(videoElement){
        devideId = document.getElementById("device");
        if (devideId) {
            startScan(devideId, videoElement, success, error);
        }
        else {
            startScan(0, videoElement, success, error);
        }
    }
    else {
        var code = window.prompt("Enter barcode value (empty value will fire the error handler):");
        if (code) {
            var result = {
                text: code,
                format: "Fake",
                cancelled: false
            };
            success(result);
        } else {
            error("No barcode");
        }
    }
}

function encode(type, data, success, errorCallback) {
    success();
}

module.exports = {
    startScan: startScan,
    scan: scan,
    encode: encode
};
require("cordova/exec/proxy").add("BarcodeScanner",module.exports);
