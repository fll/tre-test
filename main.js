var scene, camera, renderer;

var WIDTH  = window.innerWidth;
var HEIGHT = window.innerHeight;

var SPEED = 0.01;

function init() {
    scene = new THREE.Scene();

    initMesh();
    initCamera();
    initLights();
    initRenderer();

    document.body.appendChild(renderer.domElement);
}

function initCamera() {
    camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 1, 10);
    camera.position.set(0, 3.5, 5);
    camera.lookAt(scene.position);
}


function initRenderer() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
}

function initLights() {
    var light = new THREE.AmbientLight(0xffffff);
    scene.add(light);
}
var texture = new THREE.TextureLoader().load( "sv20001.jpg" );
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set( 10, 10 );
var mesh = null;
function initMesh() {
    var loader = new THREE.JSONLoader();
    loader.load('./stein.json', function(geometry, materials) {
      materials[1].map.wrapS = THREE.RepeatWrapping;
      materials[1].map.wrapT = THREE.RepeatWrapping;
        mesh = new THREE.Mesh(geometry, materials);
        console.log(materials);

        mesh.scale.x = mesh.scale.y = mesh.scale.z = 0.75;
        mesh.translation = THREE.GeometryUtils.center(geometry);
        scene.add(mesh);
    });
}
var frame = 0;
function rotateMesh() {
  frame ++;
    if (!mesh) {
        return;
    }
    //if (frame>50) {
    var value = 1 * (1+frame/100);
      //mesh.material[1].map.repeat.set( value, value );
      //frame=0;
    //}
    //var texMap = "./sv20001jpg";
    //mesh.material[0] = new THREE.MeshBasicMaterial( { map: texture} );
    //mesh.material[0].needsUpdate = true;
    //mesh.material[1].map = texture;
    //mesh.material[1].needsUpdate = true;
    mesh.rotation.x -= SPEED * 2;
    mesh.rotation.y -= SPEED;
    mesh.rotation.z -= SPEED * 3;
}

function render() {
    requestAnimationFrame(render);
    rotateMesh();
    renderer.render(scene, camera);
}

init();
render();
