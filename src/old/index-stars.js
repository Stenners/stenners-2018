
var scene, camera, renderer;

/* We need this stuff too */
var container, aspectRatio,
    HEIGHT, WIDTH, isMobile, fieldOfView,
    nearPlane, farPlane,
    mouseX, mouseY, windowHalfX,
    windowHalfY, stats, geometry, controls,
    starStuff, materialOptions, stars;

init();
animate();

function init() {

    container = document.createElement('div');
    document.body.appendChild(container);
    document.body.style.overflow = 'hidden';

    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;
    isMobile = window.innerWidth < 900 ? true : false;
    aspectRatio = WIDTH / HEIGHT;
    fieldOfView = 75;
    nearPlane = 1;
    farPlane = 1000;
    mouseX = 0;
    mouseY = 0;

    windowHalfX = WIDTH / 2;
    windowHalfY = HEIGHT / 2;

    camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);

    controls = new THREE.DeviceOrientationControls(camera);

    //Z positioning of camera

    camera.position.z = farPlane / 2;

    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.0003);

    starForge();
    planet();

    if (webGLSupport()) {
        console.log('webGLSupport')
        //yeah?  Right on...
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.gammaInput = true;
        renderer.gammaOutput = true;

    } else {
        //No?  Well that's okay.
        renderer = new THREE.CanvasRenderer();
    }

    renderer.setClearColor(0x000111, 1);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(WIDTH, HEIGHT);
    container.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('mousemove', onMouseMove, false);
    

}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    
    // if (isMobile) {
    //     controls.update();
    //     // console.log(window.alpha, window.beta)
    //     // camera.position.x += (window.alpha) * 0.0001;
    //     // camera.position.y += (window.beta - camera.position.y) * 0.0001;
    // } else {
    //     camera.position.x += (mouseX - camera.position.x) * 0.0001;
    //     camera.position.y += (- mouseY - camera.position.y) * 0.0001;
        
    // }
    camera.lookAt(scene.position);
    controls.update();
    renderer.render(scene, camera);
}

function webGLSupport() {

    try {
        var canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (
            canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
        );
    } catch (e) {
        return false;
    }
}

function onWindowResize() {

    // Everything should resize nicely if it needs to!
    var WIDTH = window.innerWidth,
        HEIGHT = window.innerHeight;

    camera.aspect = aspectRatio;
    camera.updateProjectionMatrix();
    renderer.setSize(WIDTH, HEIGHT);
}

function createCircleTexture(color, size) {
    var matCanvas = document.createElement('canvas');
    matCanvas.width = matCanvas.height = size;
    var matContext = matCanvas.getContext('2d');
    // create texture object from canvas.
    var texture = new THREE.Texture(matCanvas);
    // Draw a circle
    var center = size / 2;
    matContext.beginPath();
    matContext.arc(center, center, size / 2, 0, 2 * Math.PI, false);
    matContext.closePath();
    matContext.fillStyle = color;
    matContext.fill();
    // need to set needsUpdate
    texture.needsUpdate = true;
    // return a texture made from the canvas
    return texture;
}

function starForge() {

    var starQty = 12000;
    geometry = new THREE.SphereGeometry(1000, 21, 50);

    var starStuff = new THREE.PointsMaterial({
        size: 0.7,
        map: createCircleTexture('#ffffff', 256),
        transparent: true,
        depthWrite: false
    });

    for (var i = 0; i < starQty; i++) {

        var starVertex = new THREE.Vector3();
        starVertex.x = Math.random() * 2000 - 1000;
        starVertex.y = Math.random() * 2000 - 1000;
        starVertex.z = Math.random() * 400 - 1;

        geometry.vertices.push(starVertex);

    }

    stars = new THREE.Points(geometry, starStuff);
    scene.add(stars);
}

function planet() {

    var geometry = new THREE.SphereGeometry(100, 31, 50);
    var material = new THREE.MeshStandardMaterial({color: '#fff', roughness: 0});
    var planet = new THREE.Mesh(geometry, material);
    scene.add(planet);
}

function onMouseMove(e) {
    mouseX = e.clientX - windowHalfX;
    mouseY = e.clientY - windowHalfY;
}	

// window.addEventListener('deviceorientation', function(e) {
//     window.alpha = e.alpha;
//     window.beta = e.beta;
// });