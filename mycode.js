
class Bt {
    constructor(label, sound) {
      this.label = label;
      this.sound = sound;
    }
  }

var global_buttons = [
  new Bt("We build this city", "build_city.mp3"),
  new Bt("She's a brick house", "brick_house.mp3"),
  new Bt("Thick as a brick", "thick_as_a_brick.mp3"),
  new Bt("Country roads", "country_roads.mp3"),
  new Bt("On the road again", "road_again.mp3"),
  new Bt("We will rock you", "rock.mp3"),
  new Bt("Whool?", "sheep.mp3"),
  new Bt("I'm a wood", "wood.mp3"),
  new Bt("We are the champions", "champions.mp3")
]

function create_buttons() {

    t = document.getElementById("main_div");

    for (let b = 0; b < global_buttons.length ; b++) {
        let tr = document.createElement("button")
        tr.setAttribute("class", "btn btn-outline-primary");
        tr.innerHTML =  global_buttons[b].label;

        tr.setAttribute("onclick", "on_click_play('" + global_buttons[b].sound + "')");

        t.appendChild(tr)
    }
}

function on_click_play(sound) {
  let ding = new Audio('sound/' + sound);
	ding.play();
}

function on_load() {
    create_buttons();
}