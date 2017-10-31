var scene, camera, renderer,skybox;

var WIDTH  = window.innerWidth;
var HEIGHT = window.innerHeight;

var SPEED = 0.01;

function init() {
  skybox = new THREE.CubeTextureLoader()
  	.setPath( './' )
  	.load( [
  		'1.png',
  		'2.png',
  		'3.png',
  		'4.png',
  		'bot.png',
  		'top.png'
  	] );
    scene = new THREE.Scene();
    //scene.background = skybox;

    initMesh();
    initCamera();
    initLights();
    initRenderer();

    document.body.appendChild(renderer.domElement);
}

function initCamera() {
    camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 1, 10);
    camera.position.set(0, 10,0);
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




var mesh = null;
function initMesh() {

  var texture = new THREE.TextureLoader().load( "sv20001.jpg" );
  //var reflMat = new THREE.MeshLambertMaterial( { color: 0xff6600, envMap : skybox ,combine: THREE.MixOperation, reflectivity: 0.3 } );
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set( 10, 10 );

    var loader = new THREE.JSONLoader();
    loader.load('./mattest.json', function(geometry, materials) {
      //materials[1].map.wrapS = THREE.RepeatWrapping;
      //materials[1].map.wrapT = THREE.RepeatWrapping;
        mesh = new THREE.Mesh(geometry, materials);
        console.log(materials);
        
        mesh.scale.x = mesh.scale.y = mesh.scale.z = 0.9;
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
    var value = 1 * (1+frame/100);
    if (skybox) {
      ///console.log(skybox);
      //scene.background = skybox;
    }
    //if (frame>50) {

      //mesh.material[1].map.repeat.set( value, value );
      //frame=0;
    //}
    if (frame>50) {
    //  mesh.material[0] = reflMat;
      //mesh.material[0].map = texture;
      //mesh.material[0].needsUpdate = true;
    }
      //frame=0;

    //var texMap = "./sv20001jpg";
    //mesh.material[0] = new THREE.MeshBasicMaterial( { map: texture} );
    //mesh.material[0].needsUpdate = true;



    //mesh.material[1].map = texture;
    //mesh.material[1].needsUpdate = true;
    mesh.rotation.x -= SPEED * 0.5;
    mesh.rotation.y -= SPEED*0.5;
    //mesh.rotation.z -= SPEED * 3;
}

function render() {
    requestAnimationFrame(render);
    rotateMesh();
    renderer.render(scene, camera);
}

init();
render();
