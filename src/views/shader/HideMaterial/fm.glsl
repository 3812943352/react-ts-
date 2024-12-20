varying float hide;

void main() {

    if(hide == 0.0) {
        discard;
    }

    vec3 color = vec3(0);

    gl_FragColor = vec4(color, 1);
}