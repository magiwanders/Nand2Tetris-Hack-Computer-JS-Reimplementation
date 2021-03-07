// FINAL
class ALU {

  // ALU is (ideally) istantaneous and has no memory. Given input, it spits out output.
  out(x, y, comp, debug) {

    var out=0, zr=0, ng=0

    // All the ALU functions.
    switch(comp) {
      case 0b101010: out = 0; break;

      case 0b111111: out = 1; break;

      case 0b111010: out = -1; break;

      case 0b001100: out = x; break;

      case 0b110000: out = y; break;

      case 0b001101: out = 0b1111111111111111 - x; break;

      case 0b110001: out = 0b1111111111111111 - y; break;

      case 0b001111: out = -x; break;

      case 0b110011: out = -y; break;

      case 0b011111: out = x+1; break;

      case 0b110111: out = y+1; break;

      case 0b001110: out = x-1; break;

      case 0b110010: out = y-1; break;

      case 0b000010: out = x+y; break;

      case 0b010011: out = x-y; break;

      case 0b000111: out = y-x; break;

      case 0b000000: out = x&y; break;

      case 0b010101: out = x|y; break;

      default: return 'error'
    }

    // Calculate 2-complement (in case out<0)
    if (out<0) out = Default.complement2_16(out)

    // Handle overflow (clip anything over 16 bits)
    out = out & 0b1111111111111111

    // Calculate zr and ng
    if (out==0) zr=1
    if (out>0b1000000000000000) ng=1


    // DEBUG
    if (debug) {
      console.log('---------ALU-IN----------')
      console.log('x = ' + x.toString(2))
      console.log('y = ' + y.toString(2))
      console.log('comp = ' + comp.toString(2))
      console.log('---------ALU-OUT----------')
      console.log('out = ' + out.toString(2))
      console.log('zr = ' + zr.toString(2))
      console.log('ng = ' + ng.toString(2))
      console.log('---------ALU-END----------')
    }


    return [out, zr, ng]
  }

}
