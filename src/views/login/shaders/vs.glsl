varying vec2 vUv;


precision lowp float;
void main(){
    vec4 modelPosition=modelMatrix*vec4(position,1.);
    vUv=uv;
    gl_Position=projectionMatrix*viewMatrix*modelPosition;
    
}

