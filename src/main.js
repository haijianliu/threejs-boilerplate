import * as THREE from 'three'
import vertexShader from './shaders/sample.vert'
import fragmentShader from './shaders/sample.frag'

export default class Main {
  constructor () {
    this.scene = new THREE.Scene()
    // this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000)
    // this.camera.position.z = 1000
    this.camera = new THREE.Camera();
		this.camera.position.z = 1;
    this.geometry = new THREE.PlaneBufferGeometry( 1, 1 )
    // this.geometry = new THREE.BoxGeometry(200, 200, 200)
    // this.material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
    this.uniforms = {
					time:       { value: 1.0 },
					resolution: { value: new THREE.Vector2() }
		};

    this.material = new THREE.ShaderMaterial( {
				uniforms: this.uniforms,
				vertexShader: vertexShader,
				fragmentShader: fragmentShader
		} );

    
    let mesh = new THREE.Mesh(this.geometry, this.material)
    this.scene.add(mesh)
    
    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setPixelRatio( window.devicePixelRatio )
    document.body.appendChild(this.renderer.domElement)
    this.animate()

    // this.stats = new THREE.Stats()
    // document.body.appendChild( stats.dom );

    this.onWindowResize()
    window.addEventListener( 'resize', this.onWindowResize.bind(this), false );

  }
  
  onWindowResize( event ) {
			this.renderer.setSize( window.innerWidth, window.innerHeight );
			this.uniforms.resolution.value.x = this.renderer.domElement.width;
			this.uniforms.resolution.value.y = this.renderer.domElement.height;
	}
  animate () {
    window.requestAnimationFrame(this.animate.bind(this))
		this.render()
		// this.stats.update()
    // window.requestAnimationFrame(this.animate.bind(this))
    // this.mesh.rotation.x += 0.01
    // this.mesh.rotation.y += 0.02
    // this.uniforms.time.value += 0.05;
    // this.renderer.render(this.scene, this.camera)
  }

  render() {
			this.uniforms.time.value += 0.05
			this.renderer.render( this.scene, this.camera )
	}
}

window.mainApp = new Main()
