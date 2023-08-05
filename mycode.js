
class Bt {
  constructor(label, sound) {
    this.label = label;
    this.sound = sound;
  }
}

var global_buttons = [
  new Bt("We build this city", "build_city.mp3"),
  new Bt("She's a brick house", "brick_house.mp3"),
  new Bt("Country roads", "country_roads.mp3"),
  new Bt("Imperial March", "imperial_march.mp3"),
  new Bt("On the road again", "road_again.mp3"),
  new Bt("Thick as a brick", "thick_as_a_brick.mp3"),
  new Bt("We will rock you", "rock.mp3"),
  new Bt("Whool?", "sheep.mp3"),
  new Bt("Piece of wood", "piece_of_wood.mp3"),
  new Bt("Rolling in the deep", "rolling.mp3"),
  new Bt("Jeopardy", "jeopardy.mp3"),
  new Bt("What do you want?", "wannabe.mp3"),
  new Bt("We are the champions", "champions.mp3")
]

function create_buttons() {
  t = document.getElementById("main_div");

  for (let b = 0; b < global_buttons.length; b++) {
    let tr = document.createElement("div")
    tr.setAttribute("class", "btn");
    tr.setAttribute("id", "div_" + global_buttons[b].sound)

    let sp = document.createElement("span");
    sp.innerHTML = global_buttons[b].label;
    tr.appendChild(sp);
    tr.setAttribute("onclick", "on_click_play('" + global_buttons[b].sound + "')");

    t.appendChild(tr)
  }
}


function on_click_play(sound) {
  var current_play = who_is_playing();
  on_stop_all();
  if (sound != current_play) {
    let ding = new Audio('sound/' + sound);
    ding.setAttribute("id", sound);
    document.body.appendChild(ding);
    ding.addEventListener('ended', (event) => {
      document.getElementById(sound).remove();
      unselect_btn(sound);
    });
    ding.play();

    let div = document.getElementById("div_" + sound);
    div.style.backgroundColor = "lightskyblue"
  }
  else {
    unselect_btn(current_play);
  }
}

function who_is_playing() {
  var audio_elts = document.querySelectorAll("audio");
  if (audio_elts.length > 0) {
    return audio_elts[0].id;
  }
  return "";
}

function unselect_btn(sound_name) {
  let div = document.getElementById("div_" + sound_name);
  div.style.backgroundColor = ""

}

function on_stop_all() {
  var audio_elts = document.querySelectorAll("audio");
  audio_elts.forEach(elt => {
    elt.pause();
    elt.currentTime = 0;
    elt.remove();

    let div = document.getElementById("div_" + elt.id);
    div.style.backgroundColor = ""
  });
}


function on_load() {
  create_buttons();
}