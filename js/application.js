function init()
{
    console.log('initialized');

    var stats = initStats();
    var width = 1024;
    var height = 620;
    var scene = new THREE.Scene();
    // scene.fog = new THREE.Fog(0xffffff, .015, 100);
    var fov = 45;
    var camera = new THREE.PerspectiveCamera(fov, width / height, .1, 1000);
    
    camera.position.x = -30;
    camera.position.y = 20;
    camera.position.z = 30;
    // camera.lookAt(scene.position);

    var renderer = new THREE.WebGLRenderer(
    {
        antialias: true
    });
    renderer.setClearColor(new THREE.Color(0xeeeeee));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;

    var axes = new THREE.AxisHelper(100);
    scene.add(axes);

    var planeGeometry = new THREE.PlaneGeometry(100, 100);
    var planeMaterial = new THREE.MeshBasicMaterial(
    {
        color: 0x34eedd
    });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;

    plane.rotation.x = -.5 * Math.PI;
    plane.position.x = 0;
    plane.position.y = 0;
    plane.position.z = 0;

    scene.add(plane);


    // Create a sine-like wave
    var spline = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-15, 0, -5),
        new THREE.Vector3(-10, 0, 0),
        new THREE.Vector3(-5, 0, 3),
        new THREE.Vector3(0, 0, 5),
        new THREE.Vector3(5, 0, 0),
        new THREE.Vector3(10, 0, 5),
        new THREE.Vector3(15, 0, 5)
    ]);

    var path = new THREE.Path(spline.getPoints(50));

    var splineGeometry = path.createPointsGeometry(50);
    var splineMaterial = new THREE.LineBasicMaterial(
    {
        color : 0xff00ff 
    });

    var splineObject = new THREE.Line(splineGeometry, splineMaterial);
    scene.add(splineObject);

    camera.lookAt(splineObject.position);

    var ambientLight = new THREE.AmbientLight(0x0c0c0c);
    scene.add(ambientLight);

    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 60, -10);
    spotLight.castShadow = true;
    scene.add(spotLight);

    document.getElementById("webgl-container").appendChild(renderer.domElement);

    render();

    function render()
    {
        stats.update();

        camera.updateProjectionMatrix();

        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }

    function initStats()
    {
        var stats = new Stats();

        stats.setMode(0);
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';


        document.getElementById("stats").appendChild(stats.domElement);

        return stats;
    }
}

window.onload = init;