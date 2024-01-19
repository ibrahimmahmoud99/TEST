/*import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';
const RoboticArm = () => {
    const mountRef = useRef(null);
    const [showSimulation, setShowSimulation] = useState(false);
    const [showRealtime, setShowRealtime] = useState(false);

    useEffect(() => {
        // Scene setup
        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 1, 700);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setClearColor(new THREE.Color(0xF6F7FB)); // Set background color 
        renderer.setSize(width, height);
        mountRef.current.appendChild(renderer.domElement);

        // Lighting

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        ambientLight.castShadow = true;
        scene.add(ambientLight);

        //scene.add( new THREE.HemisphereLight( 0x8d7c7c, 0x494966, 1 ) );

        const spotlight = new THREE.SpotLight(0xffffff, 0.5);
        spotlight.castShadow = true;
        spotlight.position.set(200, 200, 200);
        scene.add(spotlight);

        var pointlight = new THREE.PointLight(0xffffff, 1);
        pointlight.position.copy(camera.position).multiplyScalar(-1);
        scene.add(pointlight);

        var directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
        directionalLight.castShadow = true;
        directionalLight.position.set(200, 200, 200);

        camera.position.set(250, 145, 0); // Set position like this

        camera.lookAt(new THREE.Vector3(0, 0, 0));


        function createPolarGrid(radius, divisions, color) {
            var group = new THREE.Group();
            var material = new THREE.LineBasicMaterial({ color: color });

            // Create concentric circles
            for (var i = 1; i <= divisions; i++) {
                var circleRadius = radius * (i / divisions);
                var circleGeometry = new THREE.CircleGeometry(circleRadius, 64);
                circleGeometry.deleteAttribute('normal'); // Remove normals
                circleGeometry.deleteAttribute('uv'); // Remove UVs
                var circle = new THREE.LineLoop(circleGeometry, material);
                circle.rotation.x = Math.PI / 2; // Rotate to lay flat on the XZ plane
                group.add(circle);
            }

            return group;
        }

        // Usage
        var polarGrid = createPolarGrid(70, 15, 0x808080); // 60 is the radius, 30 is the number of divisions
        polarGrid.position.set(0, 0, 0); // Adjust the Y position as needed
        scene.add(polarGrid);

        const controls = new OrbitControls(camera, renderer.domElement);

        // TransformControls :
        const transformControls1 = new TransformControls(camera, renderer.domElement);
        transformControls1.setSize(0.5);
        transformControls1.setMode("rotate");

        transformControls1.addEventListener("dragging-changed", function (event) {
            controls.enabled = !event.value;
        });
        const simulationModel  = new THREE.Object3D();
        simulationModel .position.set(0, 0, 0);
       // scene.add(simulationModel );
        
        const zoomFactorr = 0.4; // Adjust this value to zoom in or out
        camera.position.multiplyScalar(zoomFactorr);
        // Load model
        let joint1, joint2, joint3, Link2, joint4, joint5, link1;
        let joint6 = new THREE.Object3D();

        const mtlLoader = new MTLLoader();
        mtlLoader.load(process.env.PUBLIC_URL + '/models/JOINT1.mtl', (materials) => {
            materials.preload();
            const objLoader = new OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.load(process.env.PUBLIC_URL + '/models/JOINT1.obj', function (OBJNEW1) {
                joint1 = OBJNEW1;
                simulationModel .add(joint1);
                joint1.position.set(0, 0, 0);
                joint1.rotation.set(Math.PI / -2, 0, Math.PI);

                if (joint2) {
                    console.log("Joint2 loaded");
                    joint1.add(joint2);
                }
            },
                undefined,
                (error) => {
                    console.error("Error loading object_base.obj", error);
                    //loadingError = true;
                });
        });


        mtlLoader.load(process.env.PUBLIC_URL + '/models/JOINT2.mtl', function (materials) {
            materials.preload();
            var loaderXReal = new OBJLoader();
            loaderXReal.setMaterials(materials);
            loaderXReal.load(process.env.PUBLIC_URL + '/models/JOINT2.obj', function (OBJNEW2) {
                joint2 = OBJNEW2;
                console.log("Joint2 loaded");
                console.log(joint2);
                if (joint1) {
                    console.log("Joint2 loaded");
                    joint1.add(joint2);
                }
                if (link1) {
                    console.log("link1 is loaded");
                    joint2.add(link1);
                }
                joint2.position.set(0, 16.9, 7.85);
                joint2.rotation.set(Math.PI / -2, 0, -Math.PI / 2);
            });
        });

        mtlLoader.load(process.env.PUBLIC_URL + '/models/LINK1.mtl', function (materials) {
            materials.preload();
            var loaderXReal = new OBJLoader();
            loaderXReal.setMaterials(materials);
            loaderXReal.load(process.env.PUBLIC_URL + '/models/LINK1.obj', function (OBJNEW3) {
                link1 = OBJNEW3;
                console.log("LINK1 LOADED");
                console.log(link1);
                if (joint2) {
                    console.log("link1 loaded");
                    joint2.add(link1);
                }
                if (joint3) {
                    console.log("link1 is loaded");
                    link1.add(joint3);
                }
                link1.position.set(0, 0, 0);
                link1.rotation.set(Math.PI / -2, 0, 0);
            });
        });
        mtlLoader.load(process.env.PUBLIC_URL + '/models/JOINT3.mtl', function (materials) {
            materials.preload();
            var loaderXReal = new OBJLoader();
            loaderXReal.setMaterials(materials);
            loaderXReal.load(
                process.env.PUBLIC_URL + '/models/JOINT3.obj',
                function (OBJNEW4) {
                    joint3 = OBJNEW4;
                    if (link1) {
                        link1.add(joint3);
                    }
                    if (Link2) {
                        joint3.add(Link2);
                    }
                    joint3.position.set(22, 0, 0);
                    joint3.rotation.set(Math.PI / -2, 0, 0);
                },
                undefined,
                (error) => {
                    console.error("Error loading object_link3.obj", error);
                    //loadingError = true;
                }
            );
        });
        mtlLoader.load(process.env.PUBLIC_URL + '/models/Link2.mtl', function (materials) {
            materials.preload();
            var loaderXReal = new OBJLoader();
            loaderXReal.setMaterials(materials);
            loaderXReal.load(
                process.env.PUBLIC_URL + '/models/Link2.obj',
                function (OBJNEW5) {
                    Link2 = OBJNEW5;
                    if (joint3) {
                        joint3.add(Link2);
                    }
                    if (joint4) {
                        Link2.add(joint4);
                    }
                    Link2.position.set(0, 0, 17);
                    //Link2.rotation.set(Math.PI / -2, 0, 0);
                },
                undefined,
                (error) => {
                    console.error("Error loading object_link3.obj", error);
                    //loadingError = true;
                }
            );
        });
        mtlLoader.load(process.env.PUBLIC_URL + '/models/JOINT4.mtl', function (materials) {
            materials.preload();
            var loaderXReal = new OBJLoader();
            loaderXReal.setMaterials(materials);
            loaderXReal.load(
                process.env.PUBLIC_URL + '/models/JOINT4.obj',
                function (OBJNEW6) {
                    joint4 = OBJNEW6;
                    if (Link2) {
                        Link2.add(joint4);
                    }
                    if (joint4) {
                        joint4.add(joint5);
                    }
                    joint4.position.set(24, 0, 0);
                    joint4.rotation.set(Math.PI, 0, 0);
                },
                undefined,
                (error) => {
                    console.error("Error loading object_link3.obj", error);
                    //loadingError = true;
                }
            );
        });
        mtlLoader.load(process.env.PUBLIC_URL + '/models/JOINT5.mtl', function (materials) {
            materials.preload();
            var loaderXReal = new OBJLoader();
            loaderXReal.setMaterials(materials);
            loaderXReal.load(
                process.env.PUBLIC_URL + '/models/JOINT5.obj',
                function (OBJNEW8) {
                    joint5 = OBJNEW8;
                    if (joint4) {
                        joint4.add(joint5);
                    }
                    if (joint5) {
                        joint5.add(joint6);
                    }
                    joint5.position.set(0, 0, 12);
                    //joint5.scale.set(1, 1, 1);
                    joint5.rotation.set(0, 0, Math.PI / 2);
                },
                undefined,
                (error) => {
                    console.error("Error loading object_link3.obj", error);
                    //loadingError = true;
                }
            );
        });
        mtlLoader.load(process.env.PUBLIC_URL + '/models/JOINT6.mtl', function (materials) {
            materials.preload();
            var loaderXReal = new OBJLoader();
            loaderXReal.setMaterials(materials);
            loaderXReal.load(
                "JOINT6.obj",
                function (OBJNEW7sim) {
                    joint6 = OBJNEW7sim;
                    if (joint5) {
                        joint5.add(joint6);
                    }
                    joint6.position.set(0, -12.5, 0);
                    transformControls1.attach(joint6);
                },
                undefined,
                (error) => {
                    console.error("Error loading object_link3.obj", error);
                }
            );
        });

        const realtimeModel  = new THREE.Object3D();
        realtimeModel .position.set(0, 0, 0);
      //  scene.add(realtimeModel );
        let joint1_r, joint2_r, joint3_r, Link2_r, joint4_r, joint5_r, link1_r;
        let joint6_r = new THREE.Object3D();


        const mtlLoader_Real = new MTLLoader();
        mtlLoader_Real.load(process.env.PUBLIC_URL + '/models/JOINT1.mtl', (materials) => {
            materials.preload();
            const objLoader = new OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.load(process.env.PUBLIC_URL + '/models/JOINT1.obj', function (OBJNEW1) {
                joint1_r = OBJNEW1;
                realtimeModel .add(joint1_r);
                joint1_r.position.set(0, 0, 0);
                joint1_r.rotation.set(Math.PI / -2, 0, Math.PI);

                if (joint2_r) {
                    console.log("Joint2 loaded");
                    joint1_r.add(joint2_r);
                }
            },
                undefined,
                (error) => {
                    console.error("Error loading object_base.obj", error);
                    //loadingError = true;
                });
        });


        mtlLoader_Real.load(process.env.PUBLIC_URL + '/models/JOINT2.mtl', function (materials) {
            materials.preload();
            var loaderXReal = new OBJLoader();
            loaderXReal.setMaterials(materials);
            loaderXReal.load(process.env.PUBLIC_URL + '/models/JOINT2.obj', function (OBJNEW2) {
                joint2_r = OBJNEW2;
                console.log("Joint2 loaded");
                console.log(joint2_r);
                if (joint1_r) {
                    console.log("Joint2 loaded");
                    joint1_r.add(joint2_r);
                }
                if (link1_r) {
                    console.log("link1 is loaded");
                    joint2_r.add(link1_r);
                }
                joint2_r.position.set(0, 16.9, 7.85);
                joint2_r.rotation.set(Math.PI / -2, 0, -Math.PI / 2);
            });
        });

        mtlLoader_Real.load(process.env.PUBLIC_URL + '/models/LINK1.mtl', function (materials) {
            materials.preload();
            var loaderXReal = new OBJLoader();
            loaderXReal.setMaterials(materials);
            loaderXReal.load(process.env.PUBLIC_URL + '/models/LINK1.obj', function (OBJNEW3) {
                link1_r = OBJNEW3;
                console.log("LINK1 LOADED");
                console.log(link1_r);
                if (joint2_r) {
                    console.log("link1 loaded");
                    joint2_r.add(link1_r);
                }
                if (joint3_r) {
                    console.log("link1 is loaded");
                    link1_r.add(joint3_r);
                }
                link1_r.position.set(0, 0, 0);
                link1_r.rotation.set(Math.PI / -2, 0, 0);
            });
        });
        mtlLoader_Real.load(process.env.PUBLIC_URL + '/models/JOINT3.mtl', function (materials) {
            materials.preload();
            var loaderXReal = new OBJLoader();
            loaderXReal.setMaterials(materials);
            loaderXReal.load(
                process.env.PUBLIC_URL + '/models/JOINT3.obj',
                function (OBJNEW4) {
                    joint3_r = OBJNEW4;
                    if (link1_r) {
                        link1_r.add(joint3_r);
                    }
                    if (Link2_r) {
                        joint3_r.add(Link2_r);
                    }
                    joint3_r.position.set(22, 0, 0);
                    joint3_r.rotation.set(Math.PI / -2, 0, 0);
                },
                undefined,
                (error) => {
                    console.error("Error loading object_link3.obj", error);
                    //loadingError = true;
                }
            );
        });
        mtlLoader_Real.load(process.env.PUBLIC_URL + '/models/Link2.mtl', function (materials) {
            materials.preload();
            var loaderXReal = new OBJLoader();
            loaderXReal.setMaterials(materials);
            loaderXReal.load(
                process.env.PUBLIC_URL + '/models/Link2.obj',
                function (OBJNEW5) {
                    Link2_r = OBJNEW5;
                    if (joint3_r) {
                        joint3_r.add(Link2_r);
                    }
                    if (joint4_r) {
                        Link2_r.add(joint4_r);
                    }
                    Link2_r.position.set(0, 0, 17);
                    //Link2.rotation.set(Math.PI / -2, 0, 0);
                },
                undefined,
                (error) => {
                    console.error("Error loading object_link3.obj", error);
                    //loadingError = true;
                }
            );
        });
        mtlLoader_Real.load(process.env.PUBLIC_URL + '/models/JOINT4.mtl', function (materials) {
            materials.preload();
            var loaderXReal = new OBJLoader();
            loaderXReal.setMaterials(materials);
            loaderXReal.load(
                process.env.PUBLIC_URL + '/models/JOINT4.obj',
                function (OBJNEW6) {
                    joint4_r = OBJNEW6;
                    if (Link2_r) {
                        Link2_r.add(joint4_r);
                    }
                    if (joint4_r) {
                        joint4_r.add(joint5_r);
                    }
                    joint4_r.position.set(24, 0, 0);
                    joint4_r.rotation.set(Math.PI, 0, 0);
                },
                undefined,
                (error) => {
                    console.error("Error loading object_link3.obj", error);
                    //loadingError = true;
                }
            );
        });
        mtlLoader_Real.load(process.env.PUBLIC_URL + '/models/JOINT5.mtl', function (materials) {
            materials.preload();
            var loaderXReal = new OBJLoader();
            loaderXReal.setMaterials(materials);
            loaderXReal.load(
                process.env.PUBLIC_URL + '/models/JOINT5.obj',
                function (OBJNEW8) {
                    joint5_r = OBJNEW8;
                    if (joint4_r) {
                        joint4_r.add(joint5_r);
                    }
                    if (joint5_r) {
                        joint5_r.add(joint6_r);
                    }
                    joint5_r.position.set(0, 0, 12);
                    //joint5.scale.set(1, 1, 1);
                    joint5_r.rotation.set(0, 0, Math.PI / 2);
                },
                undefined,
                (error) => {
                    console.error("Error loading object_link3.obj", error);
                    //loadingError = true;
                }
            );
        });
        mtlLoader_Real.load(process.env.PUBLIC_URL + '/models/JOINT6.mtl', function (materials) {
            materials.preload();
            var loaderXReal = new OBJLoader();
            loaderXReal.setMaterials(materials);
            loaderXReal.load(
                "JOINT6.obj",
                function (OBJNEW7sim) {
                    joint6_r = OBJNEW7sim;
                    if (joint5_r) {
                        joint5_r.add(joint6_r);
                    }
                    joint6_r.position.set(0, -12.5, 0);
                    transformControls1.attach(joint6_r);
                },
                undefined,
                (error) => {
                    console.error("Error loading object_link3.obj", error);
                }
            );
        });







        const axeshelper = new THREE.AxesHelper(50);
        axeshelper.renderOrder = 999;
        axeshelper.onBeforRender = function (renderer) {
            renderer.clearDepth();
        };
        axeshelper.position.set(0, 0, 0);
        scene.add(axeshelper);
        axeshelper.matrix.set(0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1);
        axeshelper.matrixWorldNeedsUpdate = true;
        // Animation loop
        const handleResize = () => {
            const width = mountRef.current.clientWidth;
            const height = mountRef.current.clientHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        };

        // Add event listener for resize
        window.addEventListener('resize', handleResize);

        const animate = () => {
            requestAnimationFrame(animate);
            controls.update(); // Update camera position based on controls
            renderer.render(scene, camera);
        };

        animate();
        scene.add(simulationModel);
        if (showSimulation) {
            scene.add(simulationModel);
        } else {
            scene.remove(simulationModel);
        }

        if (showRealtime) {
            scene.add(realtimeModel);
        } else {
            scene.remove(realtimeModel);
        }
        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            mountRef.current.removeChild(renderer.domElement);
        };
    }, [showSimulation, showRealtime]);
    const toggleSimulation = () => {
        setShowSimulation(true);
        setShowRealtime(false);
    };

    const toggleRealtime = () => {
        setShowRealtime(true);
        setShowSimulation(false);
    };
    return <div>
    <button onClick={toggleSimulation}>Simulation</button>
    <button onClick={toggleRealtime}>Realtime</button>
    <div ref={mountRef} style={{ width: '40vw', height: '70vh', margin: 'auto' }}></div>
</div>

};

export default RoboticArm;*/

/*

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';
import SimulationModel from './SimulationModel';
import RealtimeModel from './RealtimeModel';

const RoboticArm = () => {
    const mountRef = useRef(null);
    const [showSimulation, setShowSimulation] = useState(false);
    const [showRealtime, setShowRealtime] = useState(false);
    const [scene, setScene] = useState(new THREE.Scene()); // Initialize the scene here

    useEffect(() => {

        // Scene setup
        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 1, 700);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setClearColor(new THREE.Color(0xF6F7FB)); // Set background color 
        renderer.setSize(width, height);
        mountRef.current.appendChild(renderer.domElement);

        // Lighting

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        ambientLight.castShadow = true;
        scene.add(ambientLight);

        //scene.add( new THREE.HemisphereLight( 0x8d7c7c, 0x494966, 1 ) );

        const spotlight = new THREE.SpotLight(0xffffff, 0.5);
        spotlight.castShadow = true;
        spotlight.position.set(200, 200, 200);
        scene.add(spotlight);

        var pointlight = new THREE.PointLight(0xffffff, 1);
        pointlight.position.copy(camera.position).multiplyScalar(-1);
        scene.add(pointlight);

        var directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
        directionalLight.castShadow = true;
        directionalLight.position.set(200, 200, 200);

        camera.position.set(250, 145, 0); // Set position like this

        camera.lookAt(new THREE.Vector3(0, 0, 0));


        function createPolarGrid(radius, divisions, color) {
            var group = new THREE.Group();
            var material = new THREE.LineBasicMaterial({ color: color });

            // Create concentric circles
            for (var i = 1; i <= divisions; i++) {
                var circleRadius = radius * (i / divisions);
                var circleGeometry = new THREE.CircleGeometry(circleRadius, 64);
                circleGeometry.deleteAttribute('normal'); // Remove normals
                circleGeometry.deleteAttribute('uv'); // Remove UVs
                var circle = new THREE.LineLoop(circleGeometry, material);
                circle.rotation.x = Math.PI / 2; // Rotate to lay flat on the XZ plane
                group.add(circle);
            }

            return group;
        }

        // Usage
        var polarGrid = createPolarGrid(70, 15, 0x808080); // 60 is the radius, 30 is the number of divisions
        polarGrid.position.set(0, 0, 0); // Adjust the Y position as needed
        scene.add(polarGrid);

        const controls = new OrbitControls(camera, renderer.domElement);

        // TransformControls :
        const transformControls1 = new TransformControls(camera, renderer.domElement);
        transformControls1.setSize(0.5);
        transformControls1.setMode("rotate");

        transformControls1.addEventListener("dragging-changed", function (event) {
            controls.enabled = !event.value;
        });
        
      //  simulationModel .position.set(0, 0, 0);
       // scene.add(simulationModel );
        
        const zoomFactorr = 0.4; // Adjust this value to zoom in or out
        camera.position.multiplyScalar(zoomFactorr);
        // Load model

        const axeshelper = new THREE.AxesHelper(50);
        axeshelper.renderOrder = 999;
        axeshelper.onBeforRender = function (renderer) {
            renderer.clearDepth();
        };
        axeshelper.position.set(0, 0, 0);
        scene.add(axeshelper);
        axeshelper.matrix.set(0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1);
        axeshelper.matrixWorldNeedsUpdate = true;

        // Animation loop
      //  setScene(new THREE.Scene());
        const handleResize = () => {
            const width = mountRef.current.clientWidth;
            const height = mountRef.current.clientHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        };

        // Add event listener for resize
        window.addEventListener('resize', handleResize);

        const animate = () => {
            requestAnimationFrame(animate);
            controls.update(); // Update camera position based on controls
            renderer.render(scene, camera);
        };

        animate();
        
        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            mountRef.current.removeChild(renderer.domElement);
        };
    }, []);

    return (
        <div>
            <button onClick={() => setShowSimulation(!showSimulation)}>Toggle Simulation</button>
            <button onClick={() => setShowRealtime(!showRealtime)}>Toggle Realtime</button>
            <div ref={mountRef} style={{ width: '40vw', height: '70vh', margin: 'auto' }}></div>
            {showSimulation && <SimulationModel scene={scene} />}
            {showRealtime && <RealtimeModel scene={scene} />}
        </div>
    );

};

export default RoboticArm;*/

/*
import React, { useState } from 'react';
import SimulationModel from './SimulationModel';
import RealtimeModel from './RealtimeModel';

const RoboticArm = () => {
    const [showModel, setShowModel] = useState('none'); // 'simulation', 'realtime', or 'none'

    const toggleModel = (model) => {
        setShowModel(model);
    };

    return (
        <div>
            <button onClick={() => toggleModel('simulation')}>Toggle Simulation</button>
            <button onClick={() => toggleModel('realtime')}>Toggle Realtime</button>
            <div style={{ display: showModel === 'simulation' ? 'block' : 'none' }}>
                <SimulationModel />
            </div>
            <div style={{ display: showModel === 'realtime' ? 'block' : 'none' }}>
                <RealtimeModel />
            </div>
        </div>
    );
};

export default RoboticArm;
*/
/*
import React, { useState } from 'react';
import SimulationModel from './SimulationModel';
import RealtimeModel from './RealtimeModel';

const RoboticArm = () => {
    const [currentModel, setCurrentModel] = useState('simulation'); // 'simulation', 'realtime', or 'none'

    return (
        <div>
            <button onClick={() => setCurrentModel('simulation')}>Simulation</button>
            <button onClick={() => setCurrentModel('realtime')}>Realtime</button>

            <div style={{ width: '40vw', height: '70vh', margin: 'auto' }}>
                {currentModel === 'simulation' && <SimulationModel />}
                {currentModel === 'realtime' && <RealtimeModel />}
            </div>
        </div>
    );
};

export default RoboticArm;*/

import React, { useEffect, useRef, useState } from "react";
import Photo from "./WhatsApp Image 2024-01-19 at 16.34.22_449faf4d.jpg";

const RoboticArm = () => {
  return (
    <div>
      <img
        src={Photo}
        alt="Logo"
        width="auto"
        height="auto"
        className="d-inline-block align-top logo-react"
      />
    </div>
  );
};

export default RoboticArm;
