const THREE = window.THREE;

export function imageToPlane(image) {
  const texture = new THREE.Texture(image);
  texture.needsUpdate = true;

  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshPhongMaterial({
      map: texture,
      transparent: true,
    })
  );

  return mesh;
}
