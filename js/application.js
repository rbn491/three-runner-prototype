function init()
{
    console.log('initialized');

    var stats = initStats();
    var width = 1600;
    var height = 620;
    var scene = new THREE.Scene();
    // scene.fog = new THREE.Fog(0xffffff, .015, 100);
    var fov = 45;
    var camera = new THREE.PerspectiveCamera(fov, width / height, .1, 1000);
    
    camera.position.x = -30;
    camera.position.y = 20;
    camera.position.z = 30;
    camera.lookAt(scene.position);

    var renderer = new THREE.WebGLRenderer(
    {
        antialias: true
    });
    renderer.setClearColor(new THREE.Color(0xeeeeee));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;

    var axes = new THREE.AxisHelper(100);
    scene.add(axes);

    var planeGeometry = new THREE.PlaneGeometry(1000, 100);
    var planeMaterial = new THREE.MeshBasicMaterial(
    {
        color: 0x34eedd
    });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;

    plane.rotation.x = -.5 * Math.PI;
    plane.position.x = 500;
    plane.position.y = 0;
    plane.position.z = 0;

    scene.add(plane);

    var boxGeometry = new THREE.BoxGeometry(3.5, 3.5, 3.5);
    var boxMaterial = new THREE.MeshBasicMaterial(
    {
        color: 0x000000
    });
    var box = new THREE.Mesh(boxGeometry, boxMaterial);
    scene.add(box);

    var ambientLight = new THREE.AmbientLight(0x0c0c0c);
    scene.add(ambientLight);

    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 60, -10);
    spotLight.castShadow = true;
    scene.add(spotLight);

    document.getElementById("webgl-container").appendChild(renderer.domElement);

    // var randomPoints = [];
    // for (var i = 0; i < 100; i++)
    // {
    //     randomPoints.push(
    //         new THREE.Vector3(i++, 0, Math.random() * 200 - 100)
    //     );
    // }
    // var spline = new THREE.SplineCurve3(randomPoints);


    var path = [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(50, 0, 0),
        new THREE.Vector3(100, 0, 0),
        new THREE.Vector3(150, 0, 30),
        new THREE.Vector3(200, 0, 0),
        new THREE.Vector3(250, 0, 0),
        new THREE.Vector3(300, 0, 0),
        new THREE.Vector3(350, 0, -34),
        new THREE.Vector3(400, 0, 0),
        new THREE.Vector3(450, 0, -15),
        new THREE.Vector3(500, 0, 0),
        new THREE.Vector3(550, 0, 0),
        new THREE.Vector3(600, 0, -20),
        new THREE.Vector3(650, 0, 0),
        new THREE.Vector3(700, 0, 0),
        new THREE.Vector3(750, 0, -10),
        new THREE.Vector3(800, 0, 0),
        new THREE.Vector3(850, 0, 37),
        new THREE.Vector3(900, 0, 0),
        new THREE.Vector3(950, 0, 0),
        new THREE.Vector3(1000, 0, 0)
    ];

    var spline = new THREE.CatmullRomCurve3(path);

    var splineGeometry = new THREE.Geometry();
    splineGeometry.vertices = spline.getPoints(200);

    var splineMaterial = new THREE.LineBasicMaterial(
    {
        color: 0xff0000
    });

    var splineObject = new THREE.Line(splineGeometry, splineMaterial);

    scene.add(splineObject);

    var boxPosIndex = 0;

    render();

    function render()
    {
        boxPosIndex++;
        if (boxPosIndex > 1000)
        {
            boxPosIndex = 0;
        }
        var boxPos = spline.getPoint(boxPosIndex / 1000);
        // var boxRot = spline.getTangent(boxPosIndex / 10000);

        box.position.x = boxPos.x;
        box.position.y = 2.5;
        // box.position.y = boxPos.y;
        box.position.z = boxPos.z;
      
        // box.rotation.x = boxRot.x;
        // box.rotation.y = boxRot.y;
        // box.rotation.z = boxRot.z;
      
        box.lookAt(spline.getPoint((boxPosIndex + 1) / 10000));

        var relativeCameraOffset = new THREE.Vector3(0, 15, 30);
        var cameraOffset = relativeCameraOffset.applyMatrix4(box.matrixWorld);

        camera.position.x = cameraOffset.x;
        camera.position.y = cameraOffset.y;
        camera.position.z = cameraOffset.z;
        camera.lookAt(box.position);
        
        // camera.updateMatrix();
        // camera.updateProjectionMatrix();

        requestAnimationFrame(render);
        renderer.render(scene, camera);

        stats.update();
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