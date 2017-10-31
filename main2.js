var container;
var camera, scene, renderer,hemiLight,dirLight,controls,textureArray,currentTexture = -1;
var mesh, zmesh, lightMesh, geometry;
var mixers = [];
var clock = new THREE.Clock();
//var spheres = [];
var directionalLight, pointLight;
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
//document.addEventListener( 'mousemove', onDocumentMouseMove, false );
init();
animate();
function init() {
  textureArray = new Array();
	container = document.createElement( 'div' );
	document.body.appendChild( container );
	camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 5000 );
	//camera.position.z = 3200;
	//
	var path = "./";
	var format = '.jpg';
	var urls = [
			path + 'posx' + format, path + 'negx' + format,
			path + 'posy' + format, path + 'negy' + format,
			path + 'posz' + format, path + 'negz' + format
		];
	var textureCube = new THREE.CubeTextureLoader().load( urls );
	textureCube.format = THREE.RGBFormat;
	scene = new THREE.Scene();
  scene.background = new THREE.Color().setHSL( 0.6, 0, 1 );
  scene.fog = new THREE.Fog( scene.background, 1, 5000 );
	//scene.background = textureCube;
  var loader = new THREE.JSONLoader();

  var texture = new THREE.TextureLoader().load( "steni-nature-sn-20_web.jpg" );
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set( 2, 2 );


  var texture2 = new THREE.TextureLoader().load( "gulstein.jpg" );
  texture2.wrapS = THREE.RepeatWrapping;
  texture2.wrapT = THREE.RepeatWrapping;
  texture2.repeat.set( 2, 2 );


  var texture3 = new THREE.TextureLoader().load( "sn-305.jpg" );
  texture3.wrapS = THREE.RepeatWrapping;
  texture3.wrapT = THREE.RepeatWrapping;
  texture3.repeat.set( 2, 2 );

  var texture4 = new THREE.TextureLoader().load( "sn-130.jpg" );
  texture4.wrapS = THREE.RepeatWrapping;
  texture4.wrapT = THREE.RepeatWrapping;
  texture4.repeat.set( 2, 2 );


  var texture5 = new THREE.TextureLoader().load( "vision_sv10001.jpg" );
  texture5.wrapS = THREE.RepeatWrapping;
  texture5.wrapT = THREE.RepeatWrapping;
  texture5.repeat.set( 2, 2 );

  var texture6 = new THREE.TextureLoader().load( "vision_sv40004.jpg" );
  texture6.wrapS = THREE.RepeatWrapping;
  texture6.wrapT = THREE.RepeatWrapping;
  texture6.repeat.set( 2, 2 );

  var texture7 = new THREE.TextureLoader().load( "vision_sv40005.jpg" );
  texture7.wrapS = THREE.RepeatWrapping;
  texture7.wrapT = THREE.RepeatWrapping;
  texture7.repeat.set( 2, 2 );



  textureArray.push(texture);
  textureArray.push(texture2);
  textureArray.push(texture3);
  textureArray.push(texture4);
  textureArray.push(texture5);
  textureArray.push(texture6);
  textureArray.push(texture7);
  /*var texture = new THREE.TextureLoader().load( "gulstein.jpg" );
  var texture = new THREE.TextureLoader().load( "gulstein.jpg" );
  var texture = new THREE.TextureLoader().load( "gulstein.jpg" );*/
  //var reflMat = new THREE.MeshLambertMaterial( { color: 0xff6600, envMap : skybox ,combine: THREE.MixOperation, reflectivity: 0.3 } );


  loader.load('./testbygg.json', function(geometry,materials) {
      //console.log(materials);


      //materials[m].map = texture;
      //materials[m] = new THREE.MeshBasicMaterial({map: texture});
      //materials[m] = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture("gulstein.jpg") });




    mesh = new THREE.Mesh(geometry,materials);
    mesh.scale.x = mesh.scale.y = mesh.scale.z = 15;
    mesh.position.z = 0;
    mesh.position.y = 0;
    mesh.rotation.y = 4;
    mesh.translation = THREE.GeometryUtils.center(geometry);
    scene.add(mesh);
    camera.position.x = -350;
    camera.position.z = -50;
    camera.position.y = -126;
    camera.rotation.x = 0.1;

    /*for (var m in mesh.material) {
      //veggBak veggHoyreTopp foran hoyreNede ramme
      if (mesh.material[m].name == 'hotel_glas') {
        //mesh.material[m].map = textureTemp;
        console.log('asdsa');
        var params = { opacity: 0.75 };
        mesh.material[m] = new THREE.MeshStandardMaterial( {
					opacity: params.opacity,
					transparent: true
				} );

          textureLoader.load( "REF 1.jpg", function ( map ) {
  					map.anisotropy = 8;
  					mesh.material[m].map = map;
  					mesh.material[m].needsUpdate = true;
  				} );

      }
    }*/

    //222.49032637434084, y: -126.75619595658546, z: -51.90908034178561
    //camera.lookAt( sprite );
});

loader.load('./plane.json', function(geometry,materials) {
    console.log("materials");

  /*for (var m in materials) {
    materials[m].map = texture;
    //materials[m] = new THREE.MeshBasicMaterial({map: texture});
    //materials[m] = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture("gulstein.jpg") });
    materials[m].needsUpdate = true;
  }*/


  var asfalt = new THREE.Mesh(geometry,materials);
  //asfalt.position.z = 1050;
  asfalt.scale.x = asfalt.scale.y = asfalt.scale.z = 15;
  asfalt.position.y = -140;
  asfalt.position.x = -150;
  //asfalt.rotation.y = 4;
  //mesh.scale.x = mesh.scale.y = mesh.scale.z = 150;
  //mesh.position.z = -1850;
  //mesh.rotation.y = 4;
  asfalt.translation = THREE.GeometryUtils.center(geometry);
  scene.add(asfalt);

  //camera.lookAt( sprite );
});


/*var spriteMap = new THREE.TextureLoader().load( "./tree_by_turcuman-d68urw7.png" );
spriteMap.needsUpdate = true;
var spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap, color: 0xffffff} );
var sprite = new THREE.Sprite( spriteMaterial );

scene.add( sprite );

sprite.position.x = 200;
sprite.position.z = 300;
sprite.position.y = -900;

sprite.position.normalize();
sprite.position.multiplyScalar( 1500 );*/

// LIGHTS
hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
hemiLight.color.setHSL( 0.6, 1, 0.6 );
hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
hemiLight.position.set( 0, 50, 0 );
scene.add( hemiLight );


//
dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
dirLight.color.setHSL( 0.1, 1, 0.95 );
dirLight.position.set( -1, 1.75, 1 );
dirLight.position.multiplyScalar( 30 );
scene.add( dirLight );
dirLight.castShadow = true;
dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;
var d = 50;
dirLight.shadow.camera.left = -d;
dirLight.shadow.camera.right = d;
dirLight.shadow.camera.top = d;
dirLight.shadow.camera.bottom = -d;
dirLight.shadow.camera.far = 3500;
dirLight.shadow.bias = -0.0001;

/*var groundGeo = new THREE.PlaneBufferGeometry( 10000, 10000 );
var groundMat = new THREE.MeshPhongMaterial( { color: 0x000000, specular: 0x050505 } );
groundMat.color.setHSL( 0.095, 1, 0.75 );
var ground = new THREE.Mesh( groundGeo, groundMat );
ground.rotation.x = -Math.PI/2;
ground.position.y = -33;
scene.add( ground );
ground.receiveShadow = true;*/

  var vertexShader = document.getElementById( 'vertexShader' ).textContent;
  var fragmentShader = document.getElementById( 'fragmentShader' ).textContent;
	var uniforms = {
		topColor:    { value: new THREE.Color( 0x0077ff ) },
		bottomColor: { value: new THREE.Color( 0xffffff ) },
		offset:      { value: 33 },
		exponent:    { value: 0.6 }
	};

	uniforms.topColor.value.copy( hemiLight.color );
	scene.fog.color.copy( uniforms.bottomColor.value );
	var skyGeo = new THREE.SphereGeometry( 4000, 32, 15 );
	var skyMat = new THREE.ShaderMaterial( { vertexShader: vertexShader, fragmentShader: fragmentShader, uniforms: uniforms, side: THREE.BackSide } );
	var sky = new THREE.Mesh( skyGeo, skyMat );
	scene.add( sky );
	//
	/*var geometry = new THREE.SphereGeometry( 100, 32, 16 );
	var shader = THREE.FresnelShader;
	var uniforms = THREE.UniformsUtils.clone( shader.uniforms );
	uniforms[ "tCube" ].value = textureCube;
	var material = new THREE.ShaderMaterial( {
		uniforms: uniforms,
		vertexShader: shader.vertexShader,
		fragmentShader: shader.fragmentShader
	} );
	for ( var i = 0; i < 500; i ++ ) {
		var mesh = new THREE.Mesh( geometry, material );
		mesh.position.x = Math.random() * 10000 - 5000;
		mesh.position.y = Math.random() * 10000 - 5000;
		mesh.position.z = Math.random() * 10000 - 5000;
		mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 1;
		scene.add( mesh );
		spheres.push( mesh );
	}*/
	scene.matrixAutoUpdate = false;
	//
	renderer = new THREE.WebGLRenderer( { antialias: false } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );

  controls = new THREE.OrbitControls( camera, renderer.domElement );
  controls.addEventListener( 'change', render ); // remove when using animation loop
  // enable animation loop when using damping or autorotation
  //controls.enableDamping = true;
  //controls.dampingFactor = 0.25;
  controls.enableZoom = true;

	container.appendChild( renderer.domElement );
	//


  //changeMat();
	window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}
function onDocumentMouseMove( event ) {
	mouseX = ( event.clientX - windowHalfX ) * 10;
	mouseY = ( event.clientY - windowHalfY ) * 10;
}
//
function animate() {
	requestAnimationFrame( animate );
  controls.update()
	render();
}

function changeMat(inputIndex) {

  if (!mesh) {
    return;
  }
  //if (inputIndex)
  console.log(inputIndex);
  var textureTemp = textureArray[inputIndex];
  /*if (currentTexture >= textureArray.length) {
    currentTexture = -1;
  }*/

  for (var m in mesh.material) {
    //veggBak veggHoyreTopp foran hoyreNede ramme
    if (mesh.material[m].name == 'veggBak'
      || mesh.material[m].name =='veggHoyreTopp'
      || mesh.material[m].name =='foran'
      || mesh.material[m].name =='hoyreNede'
      || mesh.material[m].name =='ramme'
    ) {
      mesh.material[m].map = textureTemp;
      mesh.material[m].needsUpdate = true;
    }
  }
}

function changeTextureValue(val) {
  if (!mesh) {
    return;
  }
console.log(val);
  for (var m in mesh.material) {
    //veggBak veggHoyreTopp foran hoyreNede ramme
    if (mesh.material[m].name == 'veggBak'
      || mesh.material[m].name =='veggHoyreTopp'
      || mesh.material[m].name =='foran'
      || mesh.material[m].name =='hoyreNede'
      || mesh.material[m].name =='ramme'
    ) {
      //mesh.material[m].map = textureTemp;

      mesh.material[m].map.repeat.set( val, val );
      mesh.material[m].needsUpdate = true;
    }
  }
  }


function render() {
	var timer = 0.0001 * Date.now();
  if (mesh)

	//camera.position.x += ( mouseX - camera.position.x ) * .05;
	//camera.position.y += ( - mouseY - camera.position.y ) * .05;
//console.log(camera.position);
	//camera.lookAt( mesh.position );
	/*for ( var i = 0, il = spheres.length; i < il; i ++ ) {
		var sphere = spheres[ i ];
		sphere.position.x = 5000 * Math.cos( timer + i );
		sphere.position.y = 5000 * Math.sin( timer + i * 1.1 );
	}*/
	renderer.render( scene, camera );
}
