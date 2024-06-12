let map1, map2;
      let districtBounds = {
        "งาว": { lat: 18.6138, lng: 99.8813 },
        "แม่ทะ": { lat: 18.1853, lng: 99.6855 },
        "เมืองปาน":  { lat: 18.8361, lng: 99.5443 },
        "แจ้ห่ม": { lat: 18.6591, lng: 99.7036 },
        "แม่เมาะ": { lat: 18.2962, lng: 99.7167 },
      };

      function initMap() {
        // Initialize the first map
        map1 = new google.maps.Map(document.getElementById("map1"), {
          zoom: 8,
          center: { lat: 18.275, lng: 99.4926 }, // Starting position in Lampang
        });

        var kmzLayer2 = new google.maps.KmlLayer({
            url: "https://drive.google.com/uc?export=download&id=1S7fxTifjfm2NqpSCvn1EWeC0gNoCKIrB",
            map: map1,
          });

        // Load GEOJSON data
        map1.data.loadGeoJson('https://drive.google.com/uc?export=download&id=1Gm7RGFr96ZIkMagoRNB0p1JCIDiGKXB2');

         // Get selected district
         const selectedDistrict = document.getElementById('district-select').value;

         // Set center and zoom based on the selected district
         let center = { lat: 18.275, lng: 99.4926 }; // Default center (Lampang)
         let zoom = 8; // Default zoom level
         if (selectedDistrict !== "all" && districtBounds[selectedDistrict]) {
           center = districtBounds[selectedDistrict];
           zoom = 10; // Adjust zoom level as needed
         }

        // Initialize the second map
        map2 = new google.maps.Map(document.getElementById("map2"), {
          zoom: zoom,
          center: center,
        });

        var kmzLayer2 = new google.maps.KmlLayer({
            url: "https://drive.google.com/uc?export=download&id=1S7fxTifjfm2NqpSCvn1EWeC0gNoCKIrB",
            map: map2,
          });

        // Add filtering functionality
        document.getElementById('district-select').addEventListener('change', function() {
          var district = this.value;
          if (district === "all") {
            map2.setCenter({ lat: 18.275, lng: 99.4926 });
            map2.setZoom(8);
          } else if (districtBounds[district]) {
            map2.setCenter(districtBounds[district]);
            map2.setZoom(12); // Adjust zoom level as needed
          }
        });
      }

      // Create the script tag, set the appropriate attributes
      var script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCnVPyj9T5XQhRhXMVzILQi8b5PQ3DZP_w&callback=initMap';
      script.async = true;

      // Append the 'script' element to 'head'
      document.head.appendChild(script);