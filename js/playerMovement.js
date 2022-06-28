AFRAME.registerComponent("player-movement", {
    init: function(){
        this.walk();
    },

    walk: function(){
        window.addEventListener("keydown", (e) => {
            if(e.key === "ArrowUp" || e.key === "ArrowRight" || e.key === "ArrowLeft" || e.key === "ArrowDown" || e.key === "a" || e.key === "w" || e.key === "s" || e.key === "d"){
                var entity = document.querySelector("#walk_sound");
                entity.components.sound.playSound();
            }
        });
    }
});