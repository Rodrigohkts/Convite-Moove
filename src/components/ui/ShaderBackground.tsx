import { Canvas } from '@react-three/fiber';
import { ShaderPlane } from './background-paper-shaders';

export function ShaderBackground() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen overflow-hidden">
            <Canvas camera={{ position: [0, 0, 2] }} style={{ width: '100%', height: '100%' }}>
                <ShaderPlane
                    position={[0, 0, 0]}
                    scale={[5, 3, 1]}
                    color1="#111111"
                    color2="#666666"
                />
            </Canvas>
        </div>
    );
}
