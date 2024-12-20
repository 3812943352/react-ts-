varying vec2 vUv;
varying float vOpacity;

uniform float pixelRatio;

uniform float near;
uniform float far;
uniform float fadeDistance;
uniform float blur;
uniform float baseParticleSize;

attribute float size;

#ifdef USE_ACOLOR

attribute vec3 aColor;
varying vec3 vColor;

#endif

void main() {

    #ifdef USE_ACOLOR
    vColor = aColor;
    #else
    vUv = uv;
    #endif

    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vec4 modelViewPosition = viewMatrix * worldPosition;

    float z = worldPosition.z;
    vOpacity = 1.;
    float scale;
    //近 前0 - 后1
    if(z > near) {
        vOpacity = smoothstep(near + fadeDistance, near, z);
    }
    //远 前1 - 后0
    if(z < far) {
        vOpacity = smoothstep(far - fadeDistance, far, z);
    }
    // opacity: 1 - 0
    // scale:   1-0
    scale = 1.0 - vOpacity;
    scale *= 2.;

    gl_PointSize = pixelRatio * (size * baseParticleSize + scale * blur);
    gl_Position = projectionMatrix * modelViewPosition;

}