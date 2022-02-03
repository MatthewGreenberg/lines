import { Extrude, Line } from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber'
import React, { useLayoutEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

function Fatline({ points, width, color, stringWidth }) {
    const ref = useRef()
    useFrame(() => {
        // if (ref.current.material.uniforms.dashOffset.value <= -3) {
        //     return
        // }
        ref.current.material.uniforms.dashOffset.value -= 0.005
    })
    return (
        <group>
            <mesh receiveShadow={true} castShadow={true}>
                <sphereGeometry args={[1.5, 28, 28]} />
                <meshLambertMaterial color="blue" emissive={'deeppink'} />
            </mesh>
            <Line
                receiveShadow={true}
                castShadow={true}
                ref={ref}
                lineWidth={stringWidth}
                points={points}
                color={color}
                dashed={true}
                dashOffset={0}
                gapSize={1}
                dashSize={1}
                dashScale={0.08}
                depthTest={true}
            />
        </group>
    )
}

function Lines({ stringCount, stringWidth }) {
    console.log(stringCount)
    const count = stringCount
    const lines = useMemo(
        () =>
            new Array(count).fill().map(() => {
                const pos = new THREE.Vector3(Math.random(), 0, Math.random())
                const points = new Array(20)
                    .fill()
                    .map(() =>
                        pos
                            .add(
                                new THREE.Vector3(
                                    Math.random(),
                                    Math.random(),
                                    Math.random()
                                )
                            )
                            .clone()
                    )
                const curve = new THREE.CatmullRomCurve3(points).getPoints(1000)

                const colors = [
                    '#A2CCB6',
                    '#FCEEB5',
                    '#EE786E',
                    '#e0feff',
                    'lightpink',
                    'lightblue',
                ]
                return {
                    color: colors[parseInt(colors.length * Math.random())],
                    speed: Math.max(0.0001, 0.0005 * Math.random()),
                    points: curve,
                    stringWidth: stringWidth,
                }
            }),
        [count, stringWidth]
    )

    return lines.map((props, index) => <Fatline key={index} {...props} />)
}

const Spline = ({ stringCount, stringWidth }) => {
    return <Lines stringCount={stringCount} stringWidth={stringWidth} />
}

export default Spline
