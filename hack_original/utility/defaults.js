class Default {
  static DEBUG = false
  static width = 512
  static height = 256
  static RAM_length = 16384 // 2^14
  static ROM_length = 32768 // 2^32
  static SCREEN_length = 8192 // 2^13
  static SCREEN_address = 16384
  static KBD_address = 24576

  static setup_cycles = 0
  static cycles_per_frame = 0
  static fps = 0
  static colorON = 0xEBEBEBFF
  static colorOFF = 0x00000000

  static complement2_16(value) {
    if (value>=0) return value
    else return (0b1111111111111111 - (-value-1))
  }

  static stringProgramToBin(programString) {
    var program = new Array()

    // CLEANUP
    var splitProgramString = programString.split('')
    var cleanedProgramString = ''
    for(var i=0; i<splitProgramString.length; i++) {
      //console.log(splitProgramString[i]);
      if(splitProgramString[i]=='\n') {
        //console.log('Found nl')
      } else if(splitProgramString[i]=='0') {
        //console.log('Found zero')
        cleanedProgramString+=splitProgramString[i]
      } else if (splitProgramString[i]==1) {
        //console.log('Found one');
        cleanedProgramString+=splitProgramString[i]
      } else {
        //console.log('Found invalid char');
      }
    }

    //console.log(cleanedProgramString);

    //programString.replace(/\r?\n|\r/g, " ");
    for(var i=0; i<cleanedProgramString.length/16; i++) {
      var currentByte = cleanedProgramString.substring(16*i, 16*(i+1))
      var currentNumber = parseInt(currentByte, 2)                                //;console.log(currentNumber)
      program.push(currentNumber)
    }
    //console.log(program)
    return program
  }

  static KBDscancode(keyCode) {
    switch(keyCode) {

      case "0": return 48
      case "1": return 49
      case "2": return 50
      case "3": return 51
      case "4": return 52
      case "5": return 53
      case "6": return 54
      case "7": return 55
      case "8": return 56
      case "9": return 57

      case "a": return 97
      case "b": return 98
      case "c": return 99
      case "d": return 100
      case "e": return 101
      case "f": return 102
      case "g": return 103
      case "h": return 104
      case "i": return 105
      case "j": return 106
      case "k": return 107
      case "l": return 108
      case "m": return 109
      case "n": return 110
      case "o": return 111
      case "p": return 112
      case "q": return 113
      case "r": return 114
      case "s": return 115
      case "t": return 116
      case "u": return 117
      case "v": return 118
      case "w": return 119
      case "x": return 120
      case "y": return 121
      case "z": return 122

      case "A": return 65
      case "B": return 66
      case "C": return 67
      case "D": return 68
      case "E": return 69
      case "F": return 70
      case "G": return 71
      case "H": return 72
      case "I": return 73
      case "J": return 74
      case "K": return 75
      case "L": return 76
      case "M": return 77
      case "N": return 78
      case "O": return 79
      case "P": return 80
      case "Q": return 81
      case "R": return 82
      case "S": return 83
      case "T": return 84
      case "U": return 85
      case "V": return 86
      case "W": return 87
      case "X": return 88
      case "Y": return 89
      case "Z": return 90

      case ":": return 58
      case ";": return 59
      case "<": return 60
      case "=": return 61
      case ">": return 62
      case "?": return 63
      case "@": return 64

      case "[": return 91
      case "\\": return 92
      case "]": return 93
      case "^": return 94
      case "_": return 95

      case " ": return 32
      case "!": return 33
      case "\"": return 34
      case "#": return 35
      case "$": return 36
      case "%": return 37
      case "&": return 38
      case "\'": return 39
      case "(": return 40
      case ")": return 41
      case "*": return 42
      case "+": return 43
      case ",": return 44
      case "-": return 45
      case ".": return 46
      case "/": return 47

      case "Enter": return 128
      case "Backspace": return 129
      case "ArrowLeft": return 130
      case "ArrowUp": return 131
      case "ArrowRight": return 132
      case "ArrowDown": return 133
      case "Home": return 134
      case "End": return 135
      case "PageUp": return 136
      case "PageDown": return 137
      case "Insert": return 138
      case "Delete": return 139
      case "Escape": return 140

      case "F1": return 141
      case "F2": return 142
      case "F3": return 143
      case "F4": return 144
      case "F5": return 145
      case "F6": return 146
      case "F7": return 147
      case "F8": return 148
      case "F9": return 149
      case "F10": return 150
      case "F11": return 151
      case "F12": return 152

      default: return 'Unrecognized'
    }
  }

  static hexToRGBA(hex){
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return [(c>>16)&255, (c>>8)&255, c&255]
    }
    throw new Error('Bad Hex');
}
}
