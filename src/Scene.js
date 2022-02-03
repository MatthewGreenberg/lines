import React, { Suspense } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import Spline from './Spline'
import { Bloom, EffectComposer, Noise, SSAO } from '@react-three/postprocessing'
import { Stats } from '@react-three/drei'
import { useControls } from 'leva'

function Rig({ mouse }) {
    const { camera, viewport } = useThree()
    useFrame((state) => {
        camera.position.x +=
            (state.mouse.x * viewport.width - camera.position.x) * 0.01
        camera.position.y +=
            (-state.mouse.y * viewport.height - camera.position.y) * 0.01
        camera.lookAt(0, 0, 0)
    })
    return null
}

function Scene() {
    const { stringCount, stringWidth, ssao, bloom } = useControls({
        stringCount: {
            value: 100,
            min: 10,
            max: 1000,
            step: 10,
        },
        stringWidth: {
            value: 2,
            min: 1,
            max: 10,
            step: 1,
        },
        ssao: true,
        bloom: true,
    })
    return (
        <Canvas
            style={{
                background:
                    'radial-gradient(circle, rgba(101,66,80,1) 0%, rgba(188,210,237,1) 0%, rgba(3,33,69,1) 100%)',
            }}
            shadows
            colorManagement
            dpr={[1, 2]}
            linear
            camera={{ position: [0, 0, 5], fov: 105 }}
        >
            <Suspense fallback={null}>
                <Stats />
                <Rig />
                {/* <OrbitControls /> */}
                <ambientLight intensity={0.45} />
                <pointLight args={[0, 3, 5]} />
                <fog color="pink" attach="fog" near={0} far={10} />
                {/* <mesh receiveShadow={true} castShadow={true}>
                    <planeBufferGeometry args={[100, 10]} />
                    <meshStandardMaterial color="pink" />
                </mesh> */}
                <Spline stringCount={stringCount} stringWidth={stringWidth} />
                <EffectComposer multisampling={0} disableNormalPass={false}>
                    {ssao && (
                        <>
                            <SSAO
                                samples={11}
                                radius={30}
                                intensity={20}
                                luminanceInfluence={0.6}
                                color="darkblue"
                            />

                            <SSAO
                                samples={20}
                                radius={5}
                                intensity={30}
                                luminanceInfluence={0.6}
                                color="blue"
                            />
                        </>
                    )}
                    {bloom && (
                        <Bloom
                            luminanceThreshold={0}
                            luminanceSmoothing={0.9}
                            height={300}
                        />
                    )}
                </EffectComposer>
            </Suspense>
        </Canvas>
    )
}

export default Scene
