uniform float time;

varying vec2 vUv;
varying vec4 vPosition;

void main()	{

	float pi = 3.1415;

	vec3 color1 = vec3(1.,1.,1.);
	vec3 color2 = vec3(0.,.5,.5);

	float k;
	float f_line = sin(pi * 100. * vUv.x + vUv.y/10. + time*4.);

	if(f_line < 0.) {
		k = 1.;
	} else {
		k = 0.;
	}

	vec3 resultColor = k*color1 + color2*(1.- k);
	gl_FragColor = vec4(resultColor,1.0);
}