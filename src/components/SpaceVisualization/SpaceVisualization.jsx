import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './SpaceVisualization.css';
import sunTexture from '../../images/earth.jpg';
import mercuryTexture from '../../images/mercury.jpg';
import venusTexture from '../../images/venus.jpg';
import earthTexture from '../../images/earth.jpg';
import earthClouds from '../../images/clouds.jpg';
import marsTexture from '../../images/mars.jpg';
import jupiterTexture from '../../images/juypter.jpg';
import saturnTexture from '../../images/saturn.jpg';
import uranusTexture from '../../images/uranus.jpg';
import neptuneTexture from '../../images/neptune.jpg';
import starsTexture from '../../images/stars.jpg';
const SpaceVisualization = () => {
    const mountRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);

    // Planet textures
    const textures = {
        sun: sunTexture,
        mercury: mercuryTexture,
        venus: venusTexture,
        earth: {
            map: earthTexture,
            // normalMap: sunTexture,
            // specularMap: sunTexture,
            clouds: earthClouds,
        },
        mars: marsTexture,
        jupiter: jupiterTexture,
        saturn: saturnTexture,
        uranus: uranusTexture,
        neptune: neptuneTexture,
        stars: starsTexture,
    };

    useEffect(() => {
        let scene, camera, renderer, controls;

        const init = () => {
            // Scene setup
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(
                75,
                window.innerWidth / window.innerHeight,
                0.1,
                2000
            );

            // Initialize renderer with correct settings
            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.outputColorSpace = THREE.SRGBColorSpace;
            mountRef.current.appendChild(renderer.domElement);


            // Background
            const starfieldTexture = new THREE.TextureLoader().load(textures.stars);
            scene.background = starfieldTexture;

            // Lighting
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Increased intensity
            scene.add(ambientLight);

            const sunLight = new THREE.PointLight(0xffffff, 3); // Increased intensity
            sunLight.position.set(0, 0, 0);
            scene.add(sunLight);

            // Add hemispheric light for better overall illumination
            const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
            scene.add(hemisphereLight);
            // Create planets
            const planets = {
                sun: createPlanet(20, textures.sun, 0, true),
                mercury: createPlanet(0.38, textures.mercury, 35),
                venus: createPlanet(0.95, textures.venus, 50),
                earth: createEarth(),
                mars: createPlanet(0.53, textures.mars, 90),
                jupiter: createPlanet(11.2, textures.jupiter, 130),
                saturn: createSaturnSystem(),
                uranus: createPlanet(4.0, textures.uranus, 200),
                neptune: createPlanet(3.9, textures.neptune, 230)
            };

            // Add planets to scene
            Object.values(planets).forEach(planet => scene.add(planet));

            // Create asteroid belt
            createAsteroidBelt();

            // Camera position
            camera.position.z = 150;
            camera.position.y = 50;
            camera.lookAt(0, 0, 0);

            // Controls
            controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.05;
            controls.minDistance = 30;
            controls.maxDistance = 500;

            setIsLoading(false);

            // Animation loop
            const animate = () => {
                requestAnimationFrame(animate);

                // Rotate planets
                Object.values(planets).forEach((planet, index) => {
                    if (planet) {
                        planet.rotation.y += 0.001 * (1 / (index + 1));

                        // Orbit animation
                        if (index > 0) { // Skip sun
                            const time = Date.now() * 0.0001;
                            const radius = (index + 1) * 20;
                            planet.position.x = Math.cos(time * (1 / index)) * radius;
                            planet.position.z = Math.sin(time * (1 / index)) * radius;
                        }
                    }
                });

                controls.update();
                renderer.render(scene, camera);
            };

            animate();
        };

        // Helper function to create a basic planet
        const createPlanet = (radius, textureUrl, orbitRadius, isSun = false) => {
            const geometry = new THREE.SphereGeometry(radius, 32, 32);
            const texture = new THREE.TextureLoader().load(textureUrl);
            texture.colorSpace = THREE.SRGBColorSpace; // Add this line

            let material;
            if (isSun) {
                material = new THREE.MeshBasicMaterial({
                    map: texture,
                    emissive: 0xffffff,
                    emissiveMap: texture,
                    emissiveIntensity: 1
                });
            } else {
                material = new THREE.MeshStandardMaterial({
                    map: texture,
                    metalness: 0.1,
                    roughness: 0.7
                });
            }

            const planet = new THREE.Mesh(geometry, material);
            if (orbitRadius) {
                planet.position.x = orbitRadius;
            }
            return planet;
        };
        // Create detailed Earth with clouds
        const createEarth = () => {
            const earthGroup = new THREE.Group();
            const textureLoader = new THREE.TextureLoader();

            // Earth sphere
            const earthGeometry = new THREE.SphereGeometry(1, 32, 32);
            const earthTexture = textureLoader.load(textures.earth.map);
            const normalMap = textureLoader.load(textures.earth.normalMap);
            const specularMap = textureLoader.load(textures.earth.specularMap);

            earthTexture.colorSpace = THREE.SRGBColorSpace;

            const earthMaterial = new THREE.MeshStandardMaterial({
                map: earthTexture,
                normalMap: normalMap,
                roughnessMap: specularMap,
                metalness: 0.1,
                roughness: 0.7
            });

            const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);

            // Cloud layer
            const cloudGeometry = new THREE.SphereGeometry(1.02, 32, 32);
            const cloudTexture = textureLoader.load(textures.earth.clouds);
            cloudTexture.colorSpace = THREE.SRGBColorSpace;

            const cloudMaterial = new THREE.MeshStandardMaterial({
                map: cloudTexture,
                transparent: true,
                opacity: 0.4,
                depthWrite: false
            });

            const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);

            earthGroup.add(earthMesh);
            earthGroup.add(cloudMesh);
            earthGroup.position.x = 70;

            return earthGroup;
        };

        // Create Saturn with rings
        const createSaturnSystem = () => {
            const saturnGroup = new THREE.Group();

            // Saturn sphere
            const saturn = createPlanet(9.5, textures.saturn, 0);

            // Saturn rings
            const ringGeometry = new THREE.RingGeometry(12, 20, 64);
            const ringMaterial = new THREE.MeshStandardMaterial({
                color: 0xffffff,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.8,
                metalness: 0.1,
                roughness: 0.7
            });
            const rings = new THREE.Mesh(ringGeometry, ringMaterial);
            rings.rotation.x = Math.PI / 2;

            saturnGroup.add(saturn);
            saturnGroup.add(rings);
            saturnGroup.position.x = 170;

            return saturnGroup;
        };

        // Create asteroid belt
        const createAsteroidBelt = () => {
            const asteroidCount = 2000;
            const geometry = new THREE.BufferGeometry();
            const positions = new Float32Array(asteroidCount * 3);

            for (let i = 0; i < asteroidCount; i++) {
                const angle = (Math.random() * Math.PI * 2);
                const radius = 110 + Math.random() * 10;

                positions[i * 3] = Math.cos(angle) * radius;
                positions[i * 3 + 1] = (Math.random() - 0.5) * 5;
                positions[i * 3 + 2] = Math.sin(angle) * radius;
            }

            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

            const material = new THREE.PointsMaterial({
                color: 0x666666,
                size: 0.5
            });

            const asteroidBelt = new THREE.Points(geometry, material);
            scene.add(asteroidBelt);
        };

        init();

        // Handle window resize
        const handleResize = () => {
            if (camera && renderer) {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (mountRef.current && renderer) {
                mountRef.current.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div className="space-container">
            {isLoading && (
                <div className="loading-screen">
                    <div className="loader"></div>
                    <p>Loading Solar System...</p>
                </div>
            )}
            <div ref={mountRef} className="space-visualization" />
            <div className="space-controls">
                <h3>Solar System Explorer</h3>
                <p>Controls:</p>
                <ul>
                    <li>Left Click + Drag to Rotate</li>
                    <li>Right Click + Drag to Pan</li>
                    <li>Scroll to Zoom</li>
                </ul>
            </div>
        </div>
    );
};

export default SpaceVisualization;