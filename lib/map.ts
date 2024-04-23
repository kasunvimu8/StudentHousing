import L from "leaflet";

export const createCustomIcon = function (type: string) {
  const url =
    type === "uni"
      ? "/images/uni.png"
      : type === "lab"
      ? "/images/lab.png"
      : "/images/placeholder.gif";

  return new L.Icon({
    iconUrl: url,
    iconSize: type === "uni" || type === "lab" ? [35, 35] : [30, 32],
    iconAnchor: [0, 0],
    popupAnchor: [15, 0],
    tooltipAnchor: [16, -28],
  });
};
