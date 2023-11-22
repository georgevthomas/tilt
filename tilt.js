// Check if the device supports orientation events
if (window.DeviceOrientationEvent) {
    // Request permission to access accelerometer data
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
        DeviceMotionEvent.requestPermission()
            .then(permissionState => {
                if (permissionState === 'granted') {
                    startOrientationListener();
                } else {
                    console.error('Permission to access accelerometer data denied.');
                }
            })
            .catch(console.error);
    } else {
        startOrientationListener();
    }
} else {
    // Display message for desktop users
    showDesktopMessage();
    console.error("Device orientation not supported.");
}

function startOrientationListener() {
    // Listen for device orientation changes
    window.addEventListener('deviceorientation', handleOrientation);
}



function handleOrientation(event) {
    // Get the tilt angle
    var tiltAngle = event.beta; // beta represents the tilt front-to-back

    // Update diagnostic display
    updateDiagnosticDisplay(tiltAngle);

// Check if the device is upside down (tilt angle in a wider range)
if (Math.abs(tiltAngle) >= 150 && Math.abs(tiltAngle) <= 180) {
    // Display images or perform any other actions
    showImages();
} else {
    // Hide images or reset to the initial state
    hideImages();
}
}

function onClick() {
  if (typeof DeviceMotionEvent.requestPermission === 'function') {
    // Handle iOS 13+ devices.
    DeviceMotionEvent.requestPermission()
      .then((state) => {
        if (state === 'granted') {
          window.addEventListener('devicemotion', handleOrientation);
        } else {
          console.error('Request to access the orientation was rejected');
        }
      })
      .catch(console.error);
  } else {
    // Handle regular non iOS 13+ devices.
    window.addEventListener('devicemotion', handleOrientation);
  }
  // Optionally, you can hide the button after requesting permission.
  document.getElementById('tilt-button').style.display = 'none';
}
    
function updateDiagnosticDisplay(tiltAngle) {
    // Display tilt angle in the diagnostic display
    document.getElementById('diagnosticDisplay').innerText = `Tilt Angle: ${tiltAngle.toFixed(2)} degrees`;
}

function showImages() {
    // Code to display images
    document.getElementById('imageContainer').style.display = 'block';
}

function hideImages() {
    // Code to hide images or reset to initial state
    document.getElementById('imageContainer').style.display = 'none';
}

function showDesktopMessage() {
    // Display message for desktop users
    document.getElementById('desktopMessage').style.display = 'block';
}
