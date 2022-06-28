AFRAME.registerComponent("bullets", {
    init: function(){
        this.shootBullet();
    },

    shootBullet: function(){
        window.addEventListener("keydown", (e) => {
            if(e.key === "z"){
                var bullet = document.createElement("a-entity");
                
                bullet.setAttribute("geometry", {
                    primitive: "sphere",
                    radius: 0.1,
                });
          
                bullet.setAttribute("material", "color", "white");

                var camera = document.querySelector("#camera-rig");

                var position = camera.getAttribute("position");

                bullet.setAttribute("position", {
                    x: position.x,
                    y: position.y,
                    z: position.z
                });

                var camera = document.querySelector("#camera").object3D;
                var direction = new THREE.Vector3();

                camera.getWorldDirection(direction);

                bullet.setAttribute("velocity", direction.multiplyScalar(-15));

                var scene = document.querySelector("#scene");

                bullet.setAttribute("dynamic-body", {
                    shape: "sphere",
                    mass: "0",
                });

                bullet.addEventListener("collide", this.removeBullet);

                scene.appendChild(bullet);

                this.shootSound();
            }
        });
    },

    removeBullet: function(e){
        var scene = document.querySelector("#scene");

        var element = e.detail.target.el;
        var elementHit = e.detail.body.el;

        var paint = document.createElement("a-entity");
        var position = element.getAttribute("position");

        var color = parseInt(Math.random() * 5 + 1)

        paint.setAttribute("position", {
            x: position.x,
            y: position.y,
            z: position.z
        });

        paint.setAttribute("material", {
            src: "./assets/images/splash_" + color + ".png"
        });

        paint.setAttribute("scale", {
            x: 1,
            y: 1,
            z: 1
        });

        paint.setAttribute("geometry", {
            primitive: "plane",
            width: 1,
            height: 1
        });

        scene.appendChild(paint);

        element.removeEventListener("collide", this.removeBullet);
        
        scene.removeChild(element);
    },

    shootSound: function(){
        var sound = document.querySelector("#shoot_sound");

        sound.components.sound.playSound();
    }
})