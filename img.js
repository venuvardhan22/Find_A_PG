// Initialize Firebase
var firebaseConfig = {
    // Your Firebase configuration here
    apiKey: "AIzaSyAuleT2VwEKv0yu1XHeQbAjApoo5S3IaQA",
    authDomain: "find-a-pg.firebaseapp.com",
    databaseURL: "https://find-a-pg-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "find-a-pg",
    storageBucket: "find-a-pg.appspot.com",
    messagingSenderId: "346261878903",
    appId: "1:346261878903:web:80dba29c8b659f51072e72"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  function myMap() {
    var mapProp= {
      center:new google.maps.LatLng(20.4342177502538, 78.00625183746817),
      zoom:7,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
    
    // Fetch data from Firebase
    firebase.database().ref('markers').once('value').then(function(snapshot) {
      var markersData = snapshot.val();
      var latitudes = [];
      var longitudes = [];
      var hostelNames = [];
  
      // Store lat, lon, and hname values in separate arrays
      markersData.forEach(function(markerInfo) {
        latitudes.push(parseFloat(markerInfo.lat));
        longitudes.push(parseFloat(markerInfo.lon));
        hostelNames.push(markerInfo.hname);
      });
  
      // Now you can use latitudes, longitudes, and hostelNames arrays as needed
      console.log("Latitudes:", latitudes);
      console.log("Longitudes:", longitudes);
      console.log("Hostel Names:", hostelNames);
  
      // Proceed to create markers on the map using these values
      // Example:
      for (var i = 0; i < latitudes.length; i++) {
        var marker = new google.maps.Marker({
          position: {lat: latitudes[i], lng: longitudes[i]},
          map: map,
          title: hostelNames[i],
        });
  
        // Add event listener to each marker
        marker.addListener('click', function() {
          localStorage.setItem('globalParam', this.title);
          window.location.href ="sample.html"
        });
      }
    });
  }
  