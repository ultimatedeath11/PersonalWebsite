    function cubeinit() {
      //Scene
      var scene = new THREE.Scene();
      //Renderer
      var renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(new THREE.Color(0xffffff));

      var myTimer = 0; //something just for fun

      //Camera
      var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.set(0, 0, 400);
      //Lights
      var ambLight = new THREE.AmbientLight(new THREE.Color(0x222222));
      var spotLight = new THREE.SpotLight(new THREE.Color(0xffffff));
      var spotLight2 = new THREE.SpotLight(new THREE.Color(0xffffff));
      var spotLight3 = new THREE.SpotLight(new THREE.Color(0xffffff));
      var spotLight4 = new THREE.SpotLight(new THREE.Color(0xffffff));
      var spotLight5 = new THREE.SpotLight(new THREE.Color(0xffffff));
      var spotLight6 = new THREE.SpotLight(new THREE.Color(0xffffff));
      spotLight.position.set(0, 0, -200);
      spotLight2.position.set(200, 0, 0);
      spotLight3.position.set(0, 200, 0);
      spotLight4.position.set(0, -200, 0);
      spotLight5.position.set(-200, 0, 0);
      spotLight6.position.set(0, 0, 200);
      var cubes = [];
      scene.add(ambLight);
      scene.add(spotLight, spotLight2, spotLight3, spotLight4, spotLight5, spotLight6);
      //Model

      //creating 8 cubes.
      function cubeCreate(x, y, z, hex, scene) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.hex = hex
        var cubeSize = 20;
        var cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
        this.object = new THREE.Mesh(new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize), new THREE.MeshBasicMaterial({
          color: Math.random() * 0xffffff
        }));

        //lesson learned, one must do this.object = new THREE.Mesh() and define eveything inside of the () for the geometry and the material

        this.object.position.set(x, y, z);

        //this.object.name = "cube-" + scene.children.length;

        /*
              this.object.positionX = x;
              this.object.positionY = y;
              this.object.positionZ = z;
              // add the cube to the scene

              */
        cubes.push(this.object);
        scene.add(this.object);

        console.log(x, y, z, hex);
      };
      /*
      I need to figure out the actual dimensions of the cube, to use in the XYZ in below

      -40 - 40 x
      -40 - 40 y
      -40 - 40 z
      */

      var cube = new cubeCreate(10, 10, 0, 0x12ac47, scene); // back top right
      var cube1 = new cubeCreate(10, 10, 20, 0xaaaaaa, scene); //front top Right
      var cube2 = new cubeCreate(10, -10, 0, 0x557327, scene); //back bottom right
      var cube3 = new cubeCreate(10, -10, 20, 0x81740a, scene); //front bottom right
      var cube4 = new cubeCreate(-10, -10, 20, 0x0000ff, scene); //front bottom left
      var cube5 = new cubeCreate(-10, 10, 20, 0x990033, scene); //front top Left
      var cube6 = new cubeCreate(-10, -10, 0, 0x83ffd3, scene); //back bottom left
      var cube7 = new cubeCreate(-10, 10, 0, 0x5813af, scene); //back left top



      renderScene();

      function onResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }

      function renderScene() {

        scene.rotateY(.01);
        scene.rotateX(.01);

        myTimer += 1;
        console.log(myTimer);

        if (myTimer > 500 && myTimer < 1000) {
          /*
          Goal of this is to have the cubes seporate into different pieces along the diagional plane and then come back together over time.
          */

          cube.object.position.y += .1;
          cube.object.position.x += .1;
          cube.object.position.z += -.1;

          cube1.object.position.y += .1;
          cube1.object.position.x += .1;
          cube1.object.position.z += .1;

          cube2.object.position.y += -.1;
          cube2.object.position.x += .1;
          cube2.object.position.z += -.1;

          cube3.object.position.y += -.1;
          cube3.object.position.x += .1;
          cube3.object.position.z += .1;

          cube4.object.position.y += -.1;
          cube4.object.position.x += -.1;
          cube4.object.position.z += .1;

          cube5.object.position.y += .1;
          cube5.object.position.x += -.1;
          cube5.object.position.z += .1;

          cube6.object.position.y += -.1;
          cube6.object.position.x += -.1;
          cube6.object.position.z += -.1;

          cube7.object.position.y += .1;
          cube7.object.position.x += -.1;
          cube7.object.position.z += -.1;

        } else if (myTimer >= 1000 && myTimer < 1500) {
          cube.object.position.y += -.1;
          cube.object.position.x += -.1;
          cube.object.position.z += .1;

          cube1.object.position.y += -.1;
          cube1.object.position.x += -.1;
          cube1.object.position.z += -.1;

          cube2.object.position.y += .1;
          cube2.object.position.x += -.1;
          cube2.object.position.z += .1;

          cube3.object.position.y += .1;
          cube3.object.position.x += -.1;
          cube3.object.position.z += -.1;

          cube4.object.position.y += .1;
          cube4.object.position.x += .1;
          cube4.object.position.z += -.1;

          cube5.object.position.y += -.1;
          cube5.object.position.x += .1;
          cube5.object.position.z += -.1;

          cube6.object.position.y += .1;
          cube6.object.position.x += .1;
          cube6.object.position.z += .1;

          cube7.object.position.y += -.1;
          cube7.object.position.x += .1;
          cube7.object.position.z += .1;

        } else if (myTimer >= 1500) {
          myTimer = 0;

          cube.object.position.set(10, 10, 0);
          cube1.object.position.set(10, 10, 20);
          cube2.object.position.set(10, -10, 0);
          cube3.object.position.set(10, -10, 20);
          cube4.object.position.set(-10, -10, 20);
          cube5.object.position.set(-10, 10, 20);
          cube6.object.position.set(-10, -10, 0);
          cube7.object.position.set(-10, 10, 0);

        }

        renderer.render(scene, camera);
        requestAnimationFrame(renderScene);
      }


      document.getElementById("output").appendChild(renderer.domElement);

      window.addEventListener('resize', onResize, false);
      document.onmousedown = function (event) {
        //console.log(event);
        var vector = new THREE.Vector3(event.clientX / window.innerWidth * 2 - 1, -event.clientY / window.innerHeight *
          2 + 1, 0.5);
        //magic step
        vector = vector.unproject(camera); //using the prjection matrix to unproject the click and throw it into 3d space
        console.log("unprojected vector: ", vector)
        var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
        var intersects = raycaster.intersectObjects(cubes);
        if (intersects.length > 0) {
          var intersectedObjIndex = cubes.indexOf(intersects[0].object);
          scene.remove(intersects[0].object);
          cubes.splice(intersectedObjIndex, 1);
          //directions.splice(intersectedObjIndex);
          //totalCubes = totalCubes - 1;
        }
      }
    }
