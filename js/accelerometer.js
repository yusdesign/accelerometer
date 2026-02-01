        // ============================================================================
        // COMPONENT IMPLEMENTATIONS (Same as in code blocks)
        // ============================================================================
        
        // Horizontal Accelerometer Component
        class HorizontalAccelerometer {
            constructor(knobId, trackId, valueId) {
                this.knob = document.getElementById(knobId);
                this.track = document.getElementById(trackId);
                this.valueDisplay = document.getElementById(valueId);
                
                this.value = 0;
                this.velocity = 0;
                this.isDragging = false;
                this.startX = 0;
                this.startValue = 0;
                
                this.init();
            }
            
            init() {
                this.knob.addEventListener('mousedown', (e) => this.startDrag(e.clientX));
                this.knob.addEventListener('touchstart', (e) => {
                    e.preventDefault();
                    this.startDrag(e.touches[0].clientX);
                });
                
                document.addEventListener('mousemove', (e) => {
                    if (this.isDragging) this.drag(e.clientX);
                });
                
                document.addEventListener('touchmove', (e) => {
                    if (this.isDragging && e.touches[0]) {
                        e.preventDefault();
                        this.drag(e.touches[0].clientX);
                    }
                }, { passive: false });
                
                document.addEventListener('mouseup', () => this.stopDrag());
                document.addEventListener('touchend', () => this.stopDrag());
            }
            
            startDrag(clientX) {
                this.isDragging = true;
                this.startX = clientX;
                this.startValue = this.value;
                this.velocity = 0;
                this.updateTrackColor();
            }
            
            drag(clientX) {
                const delta = (clientX - this.startX) / 80;
                this.value = Math.max(-1, Math.min(1, this.startValue + delta));
                this.velocity = (this.value - this.startValue) * 0.3;
                this.update();
            }
            
            stopDrag() {
                this.isDragging = false;
                this.updateTrackColor();
            }
            
            update() {
                this.knob.style.left = `${85 + this.value * 80}px`;
                this.valueDisplay.textContent = this.value.toFixed(2);
                this.updateTrackColor();
            }
            
            updateTrackColor() {
                const intensity = Math.abs(this.value);
                const velocityIntensity = Math.abs(this.velocity);
                
                if (this.isDragging) {
                    this.track.style.background = `rgba(0, 180, 216, ${0.3 + intensity * 0.4})`;
                } else if (velocityIntensity > 0.05) {
                    this.track.style.background = `rgba(0, 180, 216, ${0.2 + velocityIntensity * 0.3})`;
                } else {
                    this.track.style.background = `rgba(255, 255, 255, ${0.05 + intensity * 0.05})`;
                }
            }
            
            updatePhysics() {
                if (!this.isDragging) {
                    const springForce = -this.value * 0.2;
                    this.velocity += springForce;
                    this.velocity *= 0.9;
                    this.value += this.velocity * 0.1;
                    
                    if (Math.abs(this.value) < 0.005 && Math.abs(this.velocity) < 0.005) {
                        this.value = this.velocity = 0;
                    }
                    
                    this.update();
                }
                
                return this.value;
            }
        }

        // Vertical Accelerometer Component
        class VerticalAccelerometer {
            constructor(knobId, trackId, valueId) {
                this.knob = document.getElementById(knobId);
                this.track = document.getElementById(trackId);
                this.valueDisplay = document.getElementById(valueId);
                
                this.value = 0;
                this.velocity = 0;
                this.isDragging = false;
                this.startY = 0;
                this.startValue = 0;
                
                this.init();
            }
            
            init() {
                this.knob.addEventListener('mousedown', (e) => this.startDrag(e.clientY));
                this.knob.addEventListener('touchstart', (e) => {
                    e.preventDefault();
                    this.startDrag(e.touches[0].clientY);
                });
                
                document.addEventListener('mousemove', (e) => {
                    if (this.isDragging) this.drag(e.clientY);
                });
                
                document.addEventListener('touchmove', (e) => {
                    if (this.isDragging && e.touches[0]) {
                        e.preventDefault();
                        this.drag(e.touches[0].clientY);
                    }
                }, { passive: false });
                
                document.addEventListener('mouseup', () => this.stopDrag());
                document.addEventListener('touchend', () => this.stopDrag());
            }
            
            startDrag(clientY) {
                this.isDragging = true;
                this.startY = clientY;
                this.startValue = this.value;
                this.velocity = 0;
                this.updateTrackColor();
            }
            
            drag(clientY) {
                const delta = (this.startY - clientY) / 80;
                this.value = Math.max(-1, Math.min(1, this.startValue + delta));
                this.velocity = (this.value - this.startValue) * 0.3;
                this.update();
            }
            
            stopDrag() {
                this.isDragging = false;
                this.updateTrackColor();
            }
            
            update() {
                this.knob.style.top = `${85 - this.value * 80}px`;
                this.valueDisplay.textContent = this.value.toFixed(2);
                this.updateTrackColor();
            }
            
            updateTrackColor() {
                const intensity = Math.abs(this.value);
                const velocityIntensity = Math.abs(this.velocity);
                
                if (this.isDragging) {
                    this.track.style.background = `rgba(255, 109, 109, ${0.3 + intensity * 0.4})`;
                } else if (velocityIntensity > 0.05) {
                    this.track.style.background = `rgba(255, 109, 109, ${0.2 + velocityIntensity * 0.3})`;
                } else {
                    this.track.style.background = `rgba(255, 255, 255, ${0.05 + intensity * 0.05})`;
                }
            }
            
            updatePhysics() {
                if (!this.isDragging) {
                    const springForce = -this.value * 0.2;
                    this.velocity += springForce;
                    this.velocity *= 0.9;
                    this.value += this.velocity * 0.1;
                    
                    if (Math.abs(this.value) < 0.005 && Math.abs(this.velocity) < 0.005) {
                        this.value = this.velocity = 0;
                    }
                    
                    this.update();
                }
                
                return this.value;
            }
        }

        // Coordinate Transformer
        class CoordinateTransformer {
            static toCompassAngle(x, y) {
                const mathAngle = Math.atan2(y, x) * 180 / Math.PI;
                let compassAngle = 90 - mathAngle;
                if (compassAngle < 0) compassAngle += 360;
                if (compassAngle >= 360) compassAngle -= 360;
                return compassAngle;
            }
            
            static getDirection(angle) {
                const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
                const index = Math.round(angle / 45) % 8;
                return directions[index];
            }
            
            static getDirectionFull(angle) {
                if (angle >= 337.5 || angle < 22.5) return "UP";
                if (angle >= 22.5 && angle < 67.5) return "UP-RIGHT";
                if (angle >= 67.5 && angle < 112.5) return "RIGHT";
                if (angle >= 112.5 && angle < 157.5) return "DOWN-RIGHT";
                if (angle >= 157.5 && angle < 202.5) return "DOWN";
                if (angle >= 202.5 && angle < 247.5) return "DOWN-LEFT";
                if (angle >= 247.5 && angle < 292.5) return "LEFT";
                return "UP-LEFT";
            }
        }

        // Result Display
        class ResultDisplay {
            constructor() {
                this.vecX = document.getElementById('vecX');
                this.vecY = document.getElementById('vecY');
                this.angle = document.getElementById('angle');
                this.status = document.getElementById('status');
                this.lastUpdate = 0;
            }
            
            update(x, y, isDragging = false) {
                this.vecX.textContent = x.toFixed(2);
                this.vecY.textContent = y.toFixed(2);
                
                const compassAngle = CoordinateTransformer.toCompassAngle(x, y);
                const direction = CoordinateTransformer.getDirectionFull(compassAngle);
                
                this.angle.textContent = `${Math.round(compassAngle)}° ${direction}`;
                
                const magnitude = Math.sqrt(x*x + y*y);
                if (magnitude > 0.7) {
                    this.angle.style.color = '#ff6d6d';
                } else if (magnitude > 0.3) {
                    this.angle.style.color = '#ffd166';
                } else {
                    this.angle.style.color = '#64ffda';
                }
                
                if (isDragging) {
                    this.status.textContent = "Dragging";
                    this.status.style.background = 'rgba(100, 255, 218, 0.2)';
                } else if (magnitude > 0.01) {
                    this.status.textContent = "Returning to zero";
                    this.status.style.background = 'rgba(255, 109, 109, 0.1)';
                } else {
                    this.status.textContent = "Ready";
                    this.status.style.background = 'rgba(100, 255, 218, 0.1)';
                }
                
                this.lastUpdate = Date.now();
            }
        }

        // ============================================================================
        // DEMO APPLICATION
        // ============================================================================
        
        // Initialize demo
        const xAccel = new HorizontalAccelerometer('hKnob', 'hTrack', 'xValue');
        const yAccel = new VerticalAccelerometer('vKnob', 'vTrack', 'yValue');
        const result = new ResultDisplay();

        function animate() {
            const x = xAccel.updatePhysics();
            const y = yAccel.updatePhysics();
            const isDragging = xAccel.isDragging || yAccel.isDragging;
            result.update(x, y, isDragging);
            requestAnimationFrame(animate);
        }
        animate();

        // ============================================================================
        // CODE DISPLAY UTILITIES
        // ============================================================================
        
        function showCode(component) {
            // Hide all code blocks in the main component panel only
            document.querySelectorAll('#code-panel-container .code-block').forEach(block => {
                block.style.display = 'none';
            });
            
            // Remove active class from all tabs
            document.querySelectorAll('.code-tab').forEach(tab => {
                tab.classList.remove('active');
            });
            
            // Show selected code block
            document.getElementById(`${component}-code`).style.display = 'block';
            
            // Activate selected tab
            document.querySelector(`.code-tab[onclick="showCode('${component}')"]`).classList.add('active');
        }
        
        function copyCode(elementId) {
            // Get the code block element
            const codeBlock = document.getElementById(elementId);
            let codeText;
            
            // Handle two different HTML structures:
            // 1. Component code: <div id="horizontal-code" class="code-block"><button>...<pre>text</pre>
            // 2. Example code: <div id="example-basic" class="code-block"><button>...<pre><code>text</code></pre>
            const preElement = codeBlock.querySelector('pre');
            
            if (preElement.firstElementChild && preElement.firstElementChild.tagName === 'CODE') {
                // For example code blocks: get text from <code> inside <pre>
                codeText = preElement.firstElementChild.textContent || preElement.firstElementChild.innerText;
            } else {
                // For component code blocks: get text directly from <pre>
                codeText = preElement.textContent || preElement.innerText;
            }
            
            navigator.clipboard.writeText(codeText).then(() => {
                const btn = codeBlock.querySelector('.copy-btn');
                const originalText = btn.textContent;
                btn.textContent = 'Copied!';
                btn.style.background = 'rgba(100, 255, 218, 0.3)';
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = 'rgba(100, 255, 218, 0.1)';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy code:', err);
            });
        }
