export function generateAvatar(name, size = 40) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");

  // Draw background
  context.fillStyle = "#3498db"; // Blue background
  context.fillRect(0, 0, size, size);

  // Draw text
  context.font = `${size / 2}px Arial`;
  context.fillStyle = "white";
  context.textAlign = "center";
  context.textBaseline = "middle";
  const initial = name ? name.charAt(0).toUpperCase() : "?";
  context.fillText(initial, size / 2, size / 2);

  return canvas.toDataURL("image/png");
}
