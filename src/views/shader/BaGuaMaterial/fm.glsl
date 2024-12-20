varying vec2 vUv;
#define PI 3.14159265359
#define PI2 6.28318530718
#define IMAGE_MARGIN 0.1
#define BIT_COUNT 3
//#define BIT_COUNT (int(iTime/2.0)%4+2)
#define SMOOTH_PIXEL 1.5
#define BAR_WIDTH (PI/float(1<<BIT_COUNT))
#define BAR_HEIGHT 0.08
#define BAR_MARGIN 0.02
#define CIRCLE_RADIUS 1.
#define CUT_WIDTH (BAR_WIDTH*0.1)

#define RANGE(l,r,x) smoothstep(l, l + EPSILON, x) * smoothstep(r + EPSILON, r, x)
#define RANGE_INVERT(l,r,x) smoothstep(l, l + EPSILON, x) + smoothstep(r + EPSILON, r, x)

mat2 rotateMat(float angle) {
    return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
}

float bar(int x, vec2 uv) {
    float EPSILON = SMOOTH_PIXEL / 30.;
    float ret = RANGE(-BAR_WIDTH * 0.5, BAR_WIDTH * 0.5, uv.x) *
        RANGE(-BAR_HEIGHT * 0.5, BAR_HEIGHT * 0.5, uv.y);
    if(x == 0) {
        ret *= RANGE_INVERT(CUT_WIDTH, -CUT_WIDTH, uv.x);
    }
    return ret;
}

// stem = bar x3
float stem(int x, vec2 uv) {
    // eliminated a for loop, thanks https://www.shadertoy.com/user/FabriceNeyret2
    int bit = int(0.5 - (uv.y + CIRCLE_RADIUS * 0.5) / (BAR_HEIGHT + BAR_MARGIN));
    if(bit < 0 || bit >= BIT_COUNT) {
        return 0.0;
    }
    int k = (x >> bit) & 1;
    vec2 offset = vec2(0.0, CIRCLE_RADIUS * 0.5 + float(bit) * (BAR_HEIGHT + BAR_MARGIN));
    return bar(k, uv + offset);
    // naive approach
    float ret = 0.0;
    for(int bit = 0; bit < BIT_COUNT; bit++) {
        int k = (x >> bit) & 1;
        vec2 offset = vec2(0.0, CIRCLE_RADIUS * 0.5 + float(bit) * (BAR_HEIGHT + BAR_MARGIN));
        ret += bar(k, uv + offset);
    }
    return ret;
}

// bagua = stem x8
float bagua(vec2 uv) {
    // eliminated a for loop, thanks https://www.shadertoy.com/user/FabriceNeyret2
    int n = (1 << BIT_COUNT);
    float i = round(float(n) * (0.75 - atan(uv.y, uv.x) / PI2));
    return stem(int(i), uv * rotateMat(i * PI2 / float(n))); 
    // naive approach
    float ret = 0.0;
    for(int i = 0; i < n; i++) {
        ret += stem(i, uv * rotateMat(float(i) * PI2 / float(n)));
    }
    return ret;
}

void main() {
    vec2 uv = vUv * 2. - 1.;
    // scale uv to fit the bagua
    uv *= (BAR_HEIGHT + BAR_MARGIN) * float(BIT_COUNT * 2) + IMAGE_MARGIN;

    float v = bagua(uv);
    gl_FragColor = vec4(v);
    if(v < 0.7)
        discard;
}