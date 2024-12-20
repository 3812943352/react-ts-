uniform float iTime;

varying vec2 vUv;
#define BIG_CIRCLE_RADIUS 0.97
#define SMALL_CIRCLE_RADIUS 0.2
#define STROKE_WIDTH 0.02
#define SMOOTH_PIXEL 1.5
#define SMOOTH(t, x) smoothstep(t - EPSILON*0.5, t + EPSILON*0.5, x)
#define SMOOTHR(t, x) smoothstep(t + EPSILON*0.5, t - EPSILON*0.5, x)
#define WHITE_CIRCLE(r, o) SMOOTHR((r)*0.5, length(uv - o))
#define BLACK_CIRCLE(r, o) SMOOTH((r)*0.5, length(uv - o))

mat2 rotateMat(float angle) {
    return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
}

void main() {
    float EPSILON = SMOOTH_PIXEL / 30.;
    vec2 uv = vUv * 2. - 1.;
    uv *= rotateMat(-iTime);
    float v = 0.0;
    vec2 center = vec2(0.0);
    vec2 centerTop = center + vec2(0.0, BIG_CIRCLE_RADIUS / 2.0);
    vec2 centerBottom = center + vec2(0.0, -BIG_CIRCLE_RADIUS / 2.0);

    if(distance(uv, center) > BIG_CIRCLE_RADIUS)
        discard;

    v += WHITE_CIRCLE(BIG_CIRCLE_RADIUS * 2.0, center) * SMOOTH(0.0, uv.x);
    v += WHITE_CIRCLE(BIG_CIRCLE_RADIUS, centerTop);
    v *= BLACK_CIRCLE(BIG_CIRCLE_RADIUS, centerBottom);
    v += WHITE_CIRCLE(SMALL_CIRCLE_RADIUS, centerBottom);
    v *= BLACK_CIRCLE(SMALL_CIRCLE_RADIUS, centerTop);
    v += BLACK_CIRCLE(BIG_CIRCLE_RADIUS * 2.0 + STROKE_WIDTH, center);

    gl_FragColor = vec4(v, v, v, 1.);

}