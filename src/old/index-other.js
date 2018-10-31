var renderer, scene, camera, composer, circle, skelet, particle;

window.onload = function () {
    init();
    animate();
}

function init() {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.autoClear = false;
    renderer.setClearColor(0x000000, 0.0);
    document.getElementById('canvas').appendChild(renderer.domElement);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 0;
    scene.add(camera);

    //This will add a starfield to the background of a scene
    var starsGeometry = new THREE.Geometry();

    for (var i = 0; i < 10000; i++) {

        var star = new THREE.Vector3();
        star.x = THREE.Math.randFloatSpread(2000);
        star.y = THREE.Math.randFloatSpread(2000);
        star.z = THREE.Math.randFloatSpread(2000);

        starsGeometry.vertices.push(star);

    }

    var starsMaterial = new THREE.PointsMaterial({ color: 0x888888 });

    var starField = new THREE.Points(starsGeometry, starsMaterial);

    scene.add(starField);

    // var ambientLight = new THREE.AmbientLight(0x999999);
    // scene.add(ambientLight);

    // var lights = [];
    // lights[0] = new THREE.DirectionalLight(0xffffff, 1);
    // lights[0].position.set(1, 0, 0);
    // lights[1] = new THREE.DirectionalLight(0x11E8BB, 1);
    // lights[1].position.set(0.75, 1, 0.5);
    // lights[2] = new THREE.DirectionalLight(0x8200C9, 1);
    // lights[2].position.set(-0.75, -1, 0.5);
    // scene.add(lights[0]);
    // scene.add(lights[1]);
    // scene.add(lights[2]);


    window.addEventListener('resize', onWindowResize, false);

};

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    renderer.clear();

    renderer.render(scene, camera)
};
