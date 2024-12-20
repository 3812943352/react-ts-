varying vec2 vUv;
varying float vOpacity;

uniform sampler2D alphaTexture;
uniform sampler2D map;
uniform float minOpacity;
uniform float maxOpacity;

#ifdef USE_ACOLOR
varying vec3 vColor;
#endif

void main() {
    // if(vDiscard == 1.)
    //     discard;

    vec4 tColorAlpha = texture2D(alphaTexture, gl_PointCoord);

    #ifdef depthTest
    float round = 0.5 - distance(gl_PointCoord, vec2(.5));

    if(round < 0.1 || vOpacity < 0.1) {
        discard;
    }
    #endif

    float opacity = tColorAlpha.a * min(maxOpacity, max(minOpacity, vOpacity));

    #ifdef USE_ACOLOR
    gl_FragColor = vec4(vColor, opacity);
    #else
    vec4 diffuse = texture2D(map, vUv);
    gl_FragColor = vec4(diffuse.rgb, opacity);
    #endif

}