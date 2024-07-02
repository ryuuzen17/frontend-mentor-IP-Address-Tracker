const getApi = document.getElementById("ipAddress");
const result = document.getElementById("result");
const input = document.getElementById("inputText");
const text = document.getElementById("text");
const detailIp = document.getElementById("detail-ip");
const detailLocation = document.getElementById("detail-location");
const detailTimeZone = document.getElementById("detail-timezone");
const detailIsp = document.getElementById("detail-isp");
let inputText = "";
("172.70.143.120");
let latLing = [-5.1617, 119.4351];
let map;
const mapScreen = (coordinat) => {
  if (map) {
    map.remove();
  }
  map = L.map("map").setView(coordinat, 13);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
  var marker = L.marker(coordinat).addTo(map);
  var circle = L.circle(coordinat, {
    color: "red",
    fillColor: "#f03",
    fillOpacity: 0.5,
    radius: 500,
  }).addTo(map);
  var polygon = L.polygon(coordinat).addTo(map);
};
const getApiAddress = async () => {
  const ip = await fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_nt85smUIEvXazMPzLSix2cP2QaBp3&ipAddress=${inputText}`
  );
  const res = await ip.json();
  detailIp.innerHTML = `<span>${res?.ip}</span>`;
  detailLocation.innerHTML = `<span>${res.location.city}</span>`;
  detailTimeZone.innerHTML = `<span>${res.location.timezone}</span>`;
  detailIsp.innerHTML = `<span>${res.isp}</span>`;
  mapScreen([res.location.lat, res.location.lng]);
};
document.addEventListener("DOMContentLoaded", () => {
  mapScreen(latLing);
});

input.addEventListener("input", (val) => {
  inputText = val.target.value;
});
getApi.addEventListener("click", getApiAddress);
