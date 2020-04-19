window.onload = function(){



var mapSketch = function(p5j){
    p5j.earthquakes;
    p5j.loaded = 0; // 確認是否有讀取檔案
    p5j.map = L.map('map').setView([0,0], 2); // 經緯度 比例

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(p5j.map); // 將openstreetmap資料下載到 畫面中

    p5j.preload = function() { // 需要先讀取 json

      let url = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=2014-01-02';

      p5j.httpGet(url, 'jsonp', false, function(response) {
        p5j.earthquake = response; 
      });
    }

    p5j.setup = function(){
    }
    p5j.draw = function(){
      if(!p5j.earthquake){
        return;
      }else{
        if (p5j.loaded ===1) {
          p5j.earthquake.features.forEach((val)=>{
           L.marker([val.geometry.coordinates[1],val.geometry.coordinates[0]]).addTo(p5j.map)
           .bindPopup('Place : '+ val.properties.place)
           .openPopup();
            L.circle([val.geometry.coordinates[1],val.geometry.coordinates[0]],{
              color:'blue',
              fillColor:'#00f',
              radius:val.properties.mag*150000
            }).addTo(p5j.map).bindPopup('ID : '+val.id+' Detail:'+val.properties.detail);
          });
        }
        p5j.loaded += 1;
      }
   }
  }
  
  new p5(mapSketch, 'map');
}