uniform float axis;
uniform float axisLength;
uniform float process;
uniform float reverse;

varying float hide;

void main() {

    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * worldPosition;

    gl_Position = projectionMatrix * viewPosition;

    float dis = 0.;
    float l = axisLength * process;

    if(axis == 0.) {
        dis = distance(position.x + axisLength, l);
    } else if(axis == 1.) {
        dis = distance(position.y + axisLength, l);
    } else {
        dis = distance(position.z + axisLength, l);
    }

    hide = dis > l ? 0.0 : 1.0;

    if(reverse != 0.) {

    }

}