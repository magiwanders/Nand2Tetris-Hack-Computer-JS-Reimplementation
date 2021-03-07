var tutorial_button = document.getElementById('tutorial_button')
var tutorial_div = document.getElementById('tutorial');
var canvas = document.getElementById('screen')
var screen = canvas.getContext('2d')
var hack = new HACK_original()
var refresh_button = document.getElementById('refresh_screen')
var load_button = document.getElementById('load_button')
var cycle_button = document.getElementById('cycle_button')
var settings_button = document.getElementById('settings_button')
var settings_div = document.getElementById('settings')
var reset_button = document.getElementById('reset_button')
var start_button = document.getElementById('start_button')
var write_button = document.getElementById('write_button')
var frame_button = document.getElementById('frame_button')
var cycle, on_color, off_color

frame_button.onclick = function() {
  const cycles_per_frame = parseInt(document.getElementById('cycles_per_frame_value').innerHTML, 10)
  for(var i=0; i<cycles_per_frame; i++) {
     hack.cycle()
  }
  refresh_screen()
}

write_button.onclick = function() {
  const ram_cell = document.getElementById('ram_cell')
  const ram_value = document.getElementById('ram_value')
  hack.ram.write_word(ram_cell.value, ram_value.value)
  ram_cell.value = 0
  ram_value.value = 0
}

off_color = Default.hexToRGBA('#EDEDED')
on_color = Default.hexToRGBA('#000000')

reset_button.onclick = function () {
  hack.reset=1
}

tutorial_button.onclick = function() {
  if (tutorial_div.style.display === 'none') {
    tutorial_div.style.display = 'block';
    tutorial_button.innerHTML = 'Hide Tutorial'
  } else {
    tutorial_div.style.display = 'none';
    tutorial_button.innerHTML = 'Show Tutorial'
  }
}

settings_button.onclick = function() {
  if (settings_div.style.display === 'none') {
    settings_div.style.display = 'block';
    settings_button.innerHTML = 'Hide Settings'
  } else {
    settings_div.style.display = 'none';
    settings_button.innerHTML = 'Show Settings'
  }
}

function refresh_screen() {
  const frame = screen.createImageData(512, 256);
  for (var y = 0; y < Default.height; y++) {
    for (var x = 0; x < Default.width; x++) {
      var bit = hack.ram.read_pixel(x, y)
      var off = (y * Default.width + x) * 4;
      frame.data[off] = bit==1 ? on_color[0] : off_color[0]
      frame.data[off + 1] = bit==1 ? on_color[1] : off_color[1]
      frame.data[off + 2] = bit==1 ? on_color[2] : off_color[2]
      frame.data[off + 3] = 255
    }
  }
  screen.putImageData(frame, 0, 0);
}

refresh_button.onclick = refresh_screen

start_button.onclick = function() {
  if (settings_div.style.display != 'none') {
    settings_div.style.display = 'none';
    settings_button.innerHTML = 'Show Settings'
  }
  if (settings_button.style.display === 'none') {
    settings_button.style.display = 'block';
  } else {
    settings_button.style.display = 'none';
  }
  if (start_button.innerHTML === 'START') {
    start_button.innerHTML = 'STOP'
    start_button.style.backgroundColor = 'red'

    // Hack Computer

    const setup_cycles = parseInt(document.getElementById('setup_cycles_value').innerHTML, 10)
    const cycles_per_frame = parseInt(document.getElementById('cycles_per_frame_value').innerHTML, 10)
    const fps = parseInt(document.getElementById('fps_value').innerHTML, 10)

    for(var i=0; i<setup_cycles; i++) {
       hack.cycle()
    }

    if (fps!=0) cycle = setInterval(function() {
      for(var i=0; i<cycles_per_frame; i++) {
         hack.cycle()
      }
      refresh_screen()
    }, 1000/fps)



  } else {
    start_button.innerHTML = 'START'
    start_button.style.backgroundColor = 'lightgreen'
    clearInterval(cycle)
    hack.reset=1
    hack.ram.wipe()
    console.log('Reset')
    console.log('Ram Wiped')
  }
}

load_button.onclick = load_rom

function load_rom() {
  const programContainer = document.getElementById('program')
  var programString = programContainer.value;
  var program = Default.stringProgramToBin(programString)
  hack.rom.flash(program)
  hack.ram.wipe()
  hack.reset = 1
  console.log('Rom loaded.')
}

cycle_button.onclick = function() {
  for(var i=0; i<1; i++) {
    hack.cycle()
  }
  console.log('----- ' + '\n| pc = ' + hack.cpu.pc + '\n| regA = ' + hack.cpu.registerA + '\n| writeM = ' + hack.cpu.writeM + '\n| regD = ' + hack.cpu.registerD)
  console.log(hack.ram.memory)
}



// Keyboard

var kbd = document.getElementById('KBD')

document.addEventListener('keydown', (event) => {
  //console.log(`DOWN | key=${event.key},code=${event.code},keyCode=${event.which}`);
  var scancode = Default.KBDscancode(event.key)
  kbd.innerHTML = 'KBD=\"' + event.key + "\" (" + scancode + ")"
  hack.ram.write_KBD(scancode)
});

document.addEventListener('keyup', (event) => {
  //console.log(`UP | key=${event.key},code=${event.code},keyCode=${event.which}`);
  hack.ram.write_KBD(0)
  kbd.innerHTML = 'KBD=""'
});


// Color
document.getElementById('pixelOFF_color').addEventListener("change", watchOFF, false);

function watchOFF(event) {
  off_color = Default.hexToRGBA(event.target.value)
  // console.log(colorOFF)
}

document.getElementById('pixelON_color').addEventListener("change", watchON, false);

function watchON(event) {
  on_color = Default.hexToRGBA(event.target.value)
  // console.log(colorOFF)
}

// Settings
document.getElementById('setup_cycles').addEventListener("change", changeSetupCycles, false);

function changeSetupCycles(event) {
  document.getElementById('setup_cycles_value').innerHTML = document.getElementById('setup_cycles').value
}

document.getElementById('cycles_per_frame').addEventListener("change", changeCyclesPerFrame, false);

function changeCyclesPerFrame(event) {
  document.getElementById('cycles_per_frame_value').innerHTML = document.getElementById('cycles_per_frame').value
}

document.getElementById('fps').addEventListener("change", changeFPS, false);

function changeFPS(event) {
  document.getElementById('fps_value').innerHTML = document.getElementById('fps').value
}

// File

document.getElementById('rom_file').addEventListener('change', function() {
    var fr=new FileReader();
    fr.onload=function(){
        document.getElementById('program')
                .textContent=fr.result;
    }

    fr.readAsText(this.files[0]);

    setTimeout(load_rom, 1000)
})

// Preload Pong
fetch('https://raw.githubusercontent.com/magiwanders/Nand2Tetris-Hack-Computer-JS-Reimplementation/master/Pong.hack')
  .then(response => response.text())
  .then(text => {
    document.getElementById('program').textContent=text;
    setTimeout(load_rom, 1000)
  })
