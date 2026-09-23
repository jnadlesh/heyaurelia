import{r as e}from"./rolldown-runtime-S-ySWqyJ.js";import{i as t,r as n}from"./framework-CXnKph_e.js";import{a as r,c as i,d as a,f as o,i as s,l as c,o as l,p as u,r as d,s as f,t as p,u as m}from"./three.module-D6Hlm6YC.js";var h=e(t(),1),g=n();function _({dotColor:e=`#000000`}={}){let t=(0,h.useRef)(null);return(0,h.useEffect)(()=>{let n=t.current;if(!n)return;let h=window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,g=n.parentElement;if(!g)return;let _=`
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,v=new p({canvas:n,alpha:!0,antialias:!1,powerPreference:`high-performance`,premultipliedAlpha:!1});v.setClearColor(0,0);let y=new l(-1,1,1,-1,0,1),b=new f(2,2),x=new u(1,1,{minFilter:r,magFilter:r,format:i,type:a,depthBuffer:!1,stencilBuffer:!1}),S=new m({vertexShader:_,fragmentShader:`
      precision highp float;
      uniform float uTime;
      uniform float uAmplitude;
      uniform float uReveal;
      varying vec2 vUv;

      void main() {
        vec2 coordinate = 2.0 * vUv - 1.0;
        float displacement = uAmplitude * uReveal;
        coordinate += displacement * 0.4 * sin(coordinate.yx + vec2(1.2, 3.4) + uTime);
        coordinate += displacement * 0.2 * sin(5.2 * coordinate.yx + vec2(3.5, 0.4) + uTime);
        coordinate += displacement * 0.3 * sin(3.5 * coordinate.yx + vec2(1.2, 3.1) + uTime);
        coordinate += displacement * 1.6 * sin(0.4 * coordinate.yx + vec2(0.8, 2.4) + uTime);

        float distanceFromCenter = length(coordinate);
        float value = 0.0;
        for (int index = 0; index < 4; index++) {
          value = mix(value, float(index) / 3.0, cos(float(index) * distanceFromCenter));
        }

        gl_FragColor = vec4(clamp(value, 0.0, 1.0), 0.0, 0.0, 1.0);
      }
    `,uniforms:{uTime:{value:0},uAmplitude:{value:1.53},uReveal:{value:0}}}),C=new m({vertexShader:_,fragmentShader:`
      precision highp float;
      uniform sampler2D uFieldTexture;
      uniform vec2 uFieldResolution;
      uniform vec2 uResolution;
      uniform float uReveal;
      uniform float uPixelSize;
      uniform float uContrast;
      uniform float uBias;
      uniform vec3 uDotColor;
      uniform float uWaveFrequency;
      uniform float uWaveAmplitude;
      varying vec2 vUv;

      float radiusFromLuma(float luma, float pixelSize, float waveBias) {
        float mapped = clamp((luma - 0.5 + uBias + waveBias) * uContrast + 0.5, 0.0, 1.0);
        return mapped * pixelSize * 0.54 + pixelSize * 0.11;
      }

      void main() {
        vec2 pixelCoordinate = vUv * uResolution;
        vec2 baseCell = floor(pixelCoordinate / uPixelSize);
        float minimumDistance = 1.0e5;

        for (int offsetX = -1; offsetX <= 1; offsetX++) {
          for (int offsetY = -1; offsetY <= 1; offsetY++) {
            vec2 cell = baseCell + vec2(float(offsetX), float(offsetY));
            if (mod(cell.x + cell.y, 2.0) > 0.5) continue;

            vec2 center = (cell + 0.5) * uPixelSize;
            vec2 fieldUv = (cell + 0.5) / uFieldResolution;
            float luma = texture2D(uFieldTexture, fieldUv).r;
            float verticalPosition = center.y / uResolution.y;
            float wave = sin(verticalPosition * uWaveFrequency * 6.2831853) * uWaveAmplitude;
            float radius = radiusFromLuma(luma, uPixelSize, wave);
            minimumDistance = min(minimumDistance, length(pixelCoordinate - center) - radius);
          }
        }

        float antialias = max(fwidth(minimumDistance), 0.0001);
        float dot = 1.0 - smoothstep(-antialias, antialias, minimumDistance);
        gl_FragColor = vec4(uDotColor, dot * uReveal);
      }
    `,transparent:!0,depthWrite:!1,uniforms:{uFieldTexture:{value:x.texture},uFieldResolution:{value:new o(1,1)},uResolution:{value:new o(1,1)},uReveal:{value:0},uPixelSize:{value:3},uContrast:{value:.9},uBias:{value:-.25},uDotColor:{value:new d(e)},uWaveFrequency:{value:3.9},uWaveAmplitude:{value:.29}}}),w=new c,T=new c;w.add(new s(b,S)),T.add(new s(b,C));let E=0,D=!0,O=0,k=0,A=()=>{let e=g.getBoundingClientRect(),t=Math.max(1,Math.round(e.width)),n=Math.max(1,Math.round(e.height)),r=Math.min(window.devicePixelRatio,1);v.setPixelRatio(r),v.setSize(t,n,!1);let i=t*r,a=n*r;C.uniforms.uResolution.value.set(i,a);let o=C.uniforms.uPixelSize.value,s=Math.ceil(i/o)+1,c=Math.ceil(a/o)+1;x.setSize(s,c),C.uniforms.uFieldResolution.value.set(s,c)},j=e=>{if(!D)return;let t=(O?Math.min((e-O)/1e3,.05):1/60)/(1/60);O=e,k||=e;let n=1-(1-(h?1:Math.min(1,(e-k)/3e3)))**3;h||(S.uniforms.uTime.value+=.0065*t),S.uniforms.uReveal.value=n,C.uniforms.uReveal.value=n,v.setRenderTarget(x),v.render(w,y),v.setRenderTarget(null),v.render(T,y),(!h||n<1)&&(E=requestAnimationFrame(j))},M=new IntersectionObserver(([e])=>{D=e.isIntersecting,cancelAnimationFrame(E),D&&(E=requestAnimationFrame(j))}),N=new ResizeObserver(()=>{A(),cancelAnimationFrame(E),D&&(E=requestAnimationFrame(j))});return A(),M.observe(n),N.observe(g),E=requestAnimationFrame(j),()=>{D=!1,M.disconnect(),N.disconnect(),cancelAnimationFrame(E),b.dispose(),S.dispose(),C.dispose(),x.dispose(),v.dispose(),v.forceContextLoss()}},[e]),(0,g.jsx)(`canvas`,{ref:t,className:`mono-hero__fabric`,"data-interaction":`autonomous-flowing-bands`,"aria-hidden":`true`})}export{_ as t};