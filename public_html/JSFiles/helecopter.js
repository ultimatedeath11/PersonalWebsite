function helecopterinit() {
      //---------------Scene--------------------------
      var scene = new THREE.Scene();
      //---------------Renderer--------------------------
      var renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(new THREE.Color('yellow'));
      //--------------Camera--------------------------
      var myCamera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
      myCamera.position.set(0, 75, 200);
      //---------------Lights----------------------------
      var ambLight = new THREE.AmbientLight(new THREE.Color(0x444444));
      var spotLight = new THREE.SpotLight(new THREE.Color(0xffffff));
      spotLight.position.set(0, 50, 100);
      var backSpotLight = new THREE.SpotLight(new THREE.Color(0xffffff));
      backSpotLight.position.set(0, 50, -100);
      var spotlight = new THREE.SpotLight(new THREE.Color(0xffffff));
      spotlight.position.set(0, 500, 100)
      scene.add(ambLight);
      scene.add(spotLight, backSpotLight, spotlight);
      //------------------Model--------------------------
      var body = new THREE.Mesh(new THREE.BoxGeometry(45, 55, 40, 5), new THREE.MeshLambertMaterial({
        color: 0x6960Ec
      }));
      body.position.set(0, 27.5, 0)
      scene.add(body);
      var cockpit = new THREE.Mesh(new THREE.BoxGeometry(30, 27.5, 40, 5), new THREE.MeshLambertMaterial({
        color: 0x6960Ec,
      }));
      cockpit.position.set(-37.5, -13.8, 0);
      body.add(cockpit);
      var connector = new THREE.Mesh(new THREE.CylinderGeometry(5, 5, 7, 10, 10), new THREE.MeshLambertMaterial({
        color: 0x6960Ec
      }));
      connector.position.set(0, 30, 0);
      body.add(connector);
      var tail = new THREE.Mesh(new THREE.CylinderGeometry(15, 5, 55, 6, 6), new THREE.MeshLambertMaterial({
        color: 0x6960Ec
      }));
      tail.position.set(37.5, 0, 0);
      tail.rotateZ(-4.75);
      body.add(tail);
      var rearProppeller = new THREE.Mesh(new THREE.PlaneGeometry(25, 3, 10), new THREE.MeshLambertMaterial({
        side: THREE.DoubleSide,
      }));
      rearProppeller.position.set(0, -20, 8.5)
      tail.add(rearProppeller);
      var Wilms = new THREE.Mesh(new THREE.SphereGeometry(6, 5, 5), new THREE.MeshLambertMaterial({
        color: 'red'
      }));
      Wilms.position.set(0, 18, 0);
      cockpit.add(Wilms);
      var blades = new THREE.Mesh(new THREE.PlaneGeometry(120, 10, 5), new THREE.MeshLambertMaterial({
        side: THREE.DoubleSide
      }));
      blades.rotateX(.5 * Math.PI);
      blades.position.set(0, 2.5, 0);
      connector.add(blades);
      //TODO: make test planes that will give me the points for the windows!!!

      //--------------------------------test planes--------------------------------
      /* the z coordinates for the cockpit geometry
      var testPlane1 = new THREE.Mesh(new THREE.PlaneGeometry(50,50,50), new THREE.MeshLambertMaterial({}));
      testPlane1.position.set(0,0,20.1);
      scene.add(testPlane1);
      var testPlane2 = new THREE.Mesh(new THREE.PlaneGeometry(50,50,50), new THREE.MeshLambertMaterial({
        side: THREE.DoubleSide
      }));
      testPlane2.position.set(0,0,-20.1);
      scene.add(testPlane2);

      var testPlane3 = new THREE.Mesh(new THREE.PlaneGeometry(60,60,50), new THREE.MeshLambertMaterial({side: THREE.DoubleSide}));
      testPlane3.position.set(0,55,0);
      testPlane3.rotateX(Math.PI * .5);
      scene.add(testPlane3);

      var testPlane4 = new THREE.Mesh(new THREE.PlaneGeometry(60,60,50), new THREE.MeshLambertMaterial({side: THREE.DoubleSide}));
      testPlane4.position.set(0,27.5,0);
      testPlane4.rotateX(Math.PI * .5);
      scene.add(testPlane4);
      */

      //---------------------------making my own shape---------------------------

      var vertices = [
        new THREE.Vector3(0, 27.5, 20.1), //0
        new THREE.Vector3(0, 55, 20.1), //1
        new THREE.Vector3(-30, 27.5, 20.1), //2
        new THREE.Vector3(0, 27.5, -20.1), //3
        new THREE.Vector3(0, 55, -20.1), //4
        new THREE.Vector3(-30, 27.5, -20.1) //5
      ];
      var faces = [
        new THREE.Face3(0, 1, 2),
        new THREE.Face3(3, 4, 5),
        new THREE.Face3(5, 2, 1),
        new THREE.Face3(1, 5, 4),
      ];

      var triangleGeom = new THREE.Geometry();
      triangleGeom.vertices = vertices;
      triangleGeom.faces = faces;
      triangleGeom.computeFaceNormals();

      var triangle = new THREE.Mesh(triangleGeom, new THREE.MeshLambertMaterial({
        side: THREE.DoubleSide,
        transparent: true,
        opacity: .60
      }));
      triangle.position.set(-22.5, -27.5, 0);
      body.add(triangle);

      //------------------Globl variables & calling functions---------------------
      renderScene();
      var topPropellerAccelerating, topPropellerDecelerating, backPropellerLeft, backPropellerRight;
      topPropellerAccelerating = topPropellerDecelerating = backPropellerLeft = backPropellerRight = false;
      var bladesCounter = 0;
      var backbladesCounter = 0;
      var neutralPropeller = false;
      var stationaryHeight = true;
      //--------------------------------Functions--------------------------------
      function renderScene() {
        //console.log(bladesCounter);
        //bladesCounter logic
        console.log("blades counter : " + bladesCounter);
        if (topPropellerAccelerating == true) {
          if (bladesCounter < 300) {
            bladesCounter = bladesCounter + 1;
          }
        } else if (topPropellerDecelerating == true) {
          if (bladesCounter > 0) {
            bladesCounter = bladesCounter - 1;
          }
        }
        //speed of the blades
        if (bladesCounter > 0) {
          blades.rotateZ(bladesCounter / 3000);
        } else if (bladesCounter == 300 || bladesCounter == -500) {
          blades.rotateZ(bladesCounter / 2500);
        } else if (topPropellerDecelerating == true && body.position.y > 30) {
          blades.rotateZ(bladesCounter / 3500);
        }

        if (bladesCounter > 100 && body.position.y < 125) {
          body.position.y = body.position.y + .5;
        }
        if (stationaryHeight == false && topPropellerDecelerating == true && body.position.y > 30) {
          body.position.y = body.position.y - 1
        } else if (stationaryHeight == true) {
          body.position.y;
        }

        if (backPropellerLeft == true) {
          if (backbladesCounter < 500) {
            backbladesCounter = backbladesCounter + 1;
          }
          rearProppeller.rotateZ(backbladesCounter / 1000);
        } else if (backPropellerRight == true) {
          if (backbladesCounter > -500) {
            backbladesCounter = backbladesCounter - 1;
          }
          rearProppeller.rotateZ(backbladesCounter / 1000);
        }
        if (backbladesCounter % 500) {
          scene.rotateY(backbladesCounter / 3000);
        } else if (backbladesCounter == 500 || backbladesCounter == -500) {
          scene.rotateY(backbladesCounter / 3000);
        }
        if (neutralPropeller == true) {
          if (backbladesCounter < 0) {
            backbladesCounter += 1;
          }
          if (backbladesCounter > 0) {
            backbladesCounter -= 1;
          }
          if (backbladesCounter == 0) {
            neutralPropeller == false;
          }
        }

        //rearProppeller.rotateZ(.01);

        renderer.render(scene, myCamera);
        requestAnimationFrame(renderScene);
      }

      function onKeyDown(event) {
        console.log(event.which);
        switch (event.which) {
          case 38: //up
            stationaryHeight = false;
            topPropellerAccelerating = true;
            topPropellerDecelerating = false;
            break;
          case 40: //down
            stationaryHeight = false;
            topPropellerAccelerating = false;
            topPropellerDecelerating = true;
            break;
          case 37: //left
            if (body.position.y > 30) {
              backPropellerRight = false;
              neutralPropeller = false;
              backPropellerLeft = true;
            }
            break;
          case 39: //right
            if (body.position.y > 30) {
              backPropellerLeft = false;
              neutralPropeller = false;
              backPropellerRight = true;
            }
            break;
          case 32: //space
            //TODO:first space is stop rotating second space is stop the altitude.
            backPropellerRight = false;
            backPropellerLeft = false;
            neutralPropeller = true;
            stationaryHeight = true;
            break;

        }
      }

      function onResize() {
        myCamera.aspect = window.innerWidth / window.innerHeight;
        myCamera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }

      window.addEventListener('resize', onResize, false);
      window.addEventListener('keydown', onKeyDown, false);
      document.getElementById("output").appendChild(renderer.domElement);
    }