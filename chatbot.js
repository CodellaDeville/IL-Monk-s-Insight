// Initialize Three.js scene
let scene, camera, renderer, model;
let rotateSpeed = 0.01; // Speed of rotation

// Initialize scene and model loader
function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('3d-container').appendChild(renderer.domElement);

    // Load 3D model (GLB file)
    const loader = new THREE.GLTFLoader();
    loader.load('https://raw.githubusercontent.com/CodellaDeville/IL-Monk-s-Insight/main/ImageToStl.com_monk.glb', function(gltf) {
        console.log('Model Loaded Successfully!');
        model = gltf.scene;
        scene.add(model);
    }, undefined, function(error) {
        console.error('Error loading model:', error);
    });

    // Lighting
    const light = new THREE.AmbientLight(0x404040, 1); // Ambient light
    scene.add(light);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Directional light
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    camera.position.z = 5;

    // Animation loop (rotation)
    function animate() {
        requestAnimationFrame(animate);
        if (model) {
            model.rotation.x += rotateSpeed;
            model.rotation.y += rotateSpeed;
        }
        renderer.render(scene, camera);
    }
    animate();

    // Handle window resizing
    window.addEventListener('resize', function() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });
}

init();
