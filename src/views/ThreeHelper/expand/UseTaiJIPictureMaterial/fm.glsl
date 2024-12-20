varying vec2 vUv;
uniform sampler2D diffTexture;

void main() {

    vec3 color = texture2D(diffTexture, vUv).rgb;

    gl_FragColor = vec4(color, 1.);
    if(distance(vUv, vec2(0.5, 0.5)) > 0.48)
        discard;
}