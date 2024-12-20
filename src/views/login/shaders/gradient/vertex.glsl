varying vec2 vUv;

void main()
{
    // 确保将 uv 属性传递给片段着色器
    vUv = uv;

    // 应用模型视图投影矩阵变换位置
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}