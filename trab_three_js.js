var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
var objectLoader = new THREE.ObjectLoader();


// world_center
world_center = new THREE.Object3D();
scene.add( world_center );

// pivots
var pivot1 = new THREE.Object3D();
var pivot2 = new THREE.Object3D();
var pivot3 = new THREE.Object3D();
world_center.add( pivot1 );
world_center.add( pivot2 );
world_center.add( pivot3 );

var radius = 70;
var texture = THREE.ImageUtils.loadTexture( "skysphere.jpg" );
var geometry = new THREE.SphereGeometry( radius, 60, 60);
var material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: 0.5});
material.depthWrite = false;
sky = new THREE.Mesh( geometry, material );
sky.material.side = THREE.DoubleSide;
sky.radius = radius;
pivot1.add( sky );

var pointLight = new THREE.PointLight( 0xffffff, 1, 100 );
pointLight.position.set(  45, 45, 20 );
scene.add( pointLight );

var pointLight2 = new THREE.PointLight( 0xffffff, 1, 100 );
pointLight2.position.set( -45, 45, 20 );
scene.add( pointLight2 );

var pointLight3 = new THREE.PointLight( 0xffffff, 1, 100 );
pointLight3.position.set( 10, 50, -20 );
scene.add( pointLight3 );

var pointLight4 = new THREE.PointLight( 0xffffff, 1, 100 );
pointLight4.position.set( 10, 10, -20 );
scene.add( pointLight4 );

var ambient = new THREE.AmbientLight( 0x777777 );
pivot1.add( ambient );

var toy_train, mesh;
objectLoader.load("toy-train-threejs/toy-train.json", function (obj) {
	toy_train = obj;
	toy_train.rotation.set(0,Math.PI*0.75,0);
	toy_train.scale.set(2,2,2);
	toy_train.position.x = 20;
	toy_train.position.z = -15;
	pivot1.add( obj );
});

var tree1, mesh;
objectLoader.load("tree.json", function (obj) {
	tree1 = obj;
	tree1.scale.set(10,10,10);
	tree1.position.x = -30;
	tree1.position.y = 4.5;
	tree1.position.z = 30;
	pivot1.add( obj );
});

var tree2, mesh;
objectLoader.load("tree.json", function (obj) {
	tree2 = obj;
	tree2.scale.set(10,10,10);
	tree2.position.x = 30;
	tree2.position.y = 4.5;
	tree2.position.z = 30;
	pivot1.add( obj );
});

var broccoli, mesh;
objectLoader.load("either-a-broccoli-or-a-tree.json", function (obj) {
	broccoli = obj;
	broccoli.scale.set(8,8,8);
	broccoli.position.x = -16;
	broccoli.position.y = 13;
	broccoli.position.z = -16;
	pivot1.add( obj );
});

var castle, mesh;
objectLoader.load("castle.json", function (obj) {
	castle = obj;
	castle.scale.set(.9,.9,.9);
	castle.position.x = 0;
	castle.position.y = 1;
	castle.position.z = 37;
	pivot1.add( obj );
});

var alien;
objectLoader.load("alien-monster.json", function ( obj ) {
	alien = obj;
	alien.position.z = -120;
	alien.position.y = 60;
	alien.rotation.y = Math.PI;
	alien.rotation.x = 0;
	alien.rotation.z = 0;
	alien.scale.x = 40;
	alien.scale.y = 40;
	alien.scale.z = 40;
	pivot1.add( alien );
});

floor_texture = THREE.ImageUtils.loadTexture( "floor.jpg" );
floor_texture.wrapS = floor_texture.wrapT = THREE.RepeatWrapping;
floor_texture.repeat.set( 25, 25);

var segments = 32;
var circleGeometry = new THREE.CircleGeometry( sky.radius, segments );
var material = new THREE.MeshBasicMaterial({color: 0xffffff,
																						specular: 0x222222,
																						shininess: 35,
																						map: floor_texture,
																						shading: THREE.FlatShading,
																						transparent: true,
																						opacity: 0.5
																					});

var floor = new THREE.Mesh( circleGeometry, material );
floor.material.side = THREE.DoubleSide;
floor.rotation.x = -Math.PI/2;
pivot1.add( floor );

snow = create_snow(1.7, 1000, sky.radius);
// add it to the scene
scene.add(snow.particleSystem);

var listener = new THREE.AudioListener();
camera.add( listener );

var sound1 = new THREE.Audio( listener );
sound1.load( 'PinkMartini_Snowglobe.ogg' );
sound1.setRefDistance( 20 );
sound1.autoplay = true;
sound1.loop = true;
scene.add(sound1);

camera.position.set(0, 10, 25);

window.addEventListener('resize', function() {
	var WIDTH = window.innerWidth,
	HEIGHT = window.innerHeight;
	renderer.setSize(WIDTH, HEIGHT);
	camera.aspect = WIDTH / HEIGHT;
	camera.updateProjectionMatrix();
});

controls = new THREE.OrbitControls( camera, renderer.domElement );

render();

function render() {
	requestAnimationFrame( render );

	pivot1.rotation.y += .001;
	toy_train.rotation.y += .005;
	render_snow(snow);
	renderer.render( scene, camera );
}
