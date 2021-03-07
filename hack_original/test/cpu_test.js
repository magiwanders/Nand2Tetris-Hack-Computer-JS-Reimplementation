class CPU_test {

  test(verbose) {
    console.log('***** CPU TEST START ******')

    // FUNCTIONALITY TEST
    var cpu = new CPU()

    var instruction = [
        0b0011000000111001,
        0b1110110000010000,
        0b0101101110100000,
        0b1110000111010000,
        0b0000001111101000,
        0b1110001100001000,
        0b0000001111101001,
        0b1110001110011000,
        0b0000001111101000,
        0b1111010011010000,
        0b0000000000001110,
        0b1110001100000100,
        0b0000001111100111,
        0b1110110111100000,
        0b1110001100001000,
        0b0000000000010101,
        0b1110011111000010,
        0b0000000000000010,
        0b1110000010010000,
        0b0000001111101000,
        0b1110111010010000,
        0b1110001100000001,
        0b1110001100000010,
        0b1110001100000011,
        0b1110001100000100,
        0b1110001100000101,
        0b1110001100000110,
        0b1110001100000111,
        0b1110101010010000,
        0b1110001100000001,
        0b1110001100000010,
        0b1110001100000011,
        0b1110001100000100,
        0b1110001100000101,
        0b1110001100000110,
        0b1110001100000111,
        0b1110111111010000,
        0b1110001100000001,
        0b1110001100000010,
        0b1110001100000011,
        0b1110001100000100,
        0b1110001100000101,
        0b1110001100000110,
        0b1110001100000111,
        0b1110001100000111,
        0b0111111111111111,
    ]
    var outM = [
      '*',
      '*',
      '*',
      '*',
      '*',
      '*',
      11111,
      '*',
      11110,
      '*',
      '*',
      '*',
      '*',
      '*',
      '*',
      -1,
      '*',
      '*',
      '*',
      '*',
      '*',
      '*',
      '*',
      '*',
      '*',
      '*',
      '*',
      '*',
      '*',
      '*',
      '*',
      '*',
      '*',
      '*',
      '*',
      '*',
      '*',
      '*',
      '*',
      '*',
      '*',
      '*',
      '*',
      '*',
      '*',
      '*',
      '*'
    ]
    var addressM = [
      0,
      12345,
      12345,
      23456,
      23456,
      1000,
      1000,
      1001,
      1001,
      1000,
      1000,
      14,
      14,
      999,
      1000,
      1000,
      21,
      21,
      2,
      2,
      1000,
      1000,
      1000,
      1000,
      1000,
      1000,
      1000,
      1000,
      1000,
      1000,
      1000,
      1000,
      1000,
      1000,
      1000,
      1000,
      1000,
      1000,
      1000,
      1000,
      1000,
      1000,
      1000,
      1000,
      1000,
      1000,
      32767
    ]
    var minusOne = Default.complement2_16(-1)
    var registerD = [
      0,
      0,
      12345,
      12345,
      11111,
      11111,
      11111,
      11111,
      11110,
      11110,
      minusOne,
      minusOne,
      minusOne,
      minusOne,
      minusOne,
      minusOne,
      minusOne,
      minusOne,
      minusOne,
      1,
      1,
      minusOne,
      minusOne,
      minusOne,
      minusOne,
      minusOne,
      minusOne,
      minusOne,
      minusOne,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1
    ]
    var writeM = [
      0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ]
    var reset = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0
    ]
    var inM = [
      0, 0, 0, 0, 0, 0, 0, 0, 0,
      11111,
      11111,
      11111,
      11111,
      11111,
      11111,
      11111,
      11111,
      11111,
      11111,
      11111,
      11111,
      11111,
      11111,
      11111,
      11111,
      11111,
      11111,
      11111,
      11111,
      11111,
      11111,
      11111,
      11111,
      11111,
      11111,
      11111,
      11111,
      11111,
      11111,
      11111,
      11111,
      11111,
      11111,
      11111,
      11111,
      11111
    ]
    var pc = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 14, 15, 16, 17, 18, 21, 22, 23, 24, 25, 26, 27, 28,
      1000, 1000, 1000, 1000, 1001, 1002, 1000, 1000, 1001, 1002, 1000, 1000, 1001, 1000, 1001, 1000, 1001, 1000, 1001, 1000, 0, 1
    ]


    var nTests = instruction.length

    if (verbose) console.log('*** Functionality Test Start ***')

    var failed=0

    for (var i=0; i<nTests; i++) {
      var outString = 'CPU Test ' + (i+1).toString().padStart(2, '0') + ': '

      var currentTestResults = cpu.out(inM[i], instruction[i], reset[i])

      if(outM[i]=='*' || outM[i+1]=='*') {
        if (
          //currentTestResults[0][0] == outM[i] && currentTestResults[1][0] == outM[i+1] &&
          currentTestResults[0][1] == writeM[i] && currentTestResults[1][1] == writeM[i+1] &&
          currentTestResults[0][2] == addressM[i] && currentTestResults[1][2] == addressM[i+1] &&
          currentTestResults[0][3] == pc[i] && currentTestResults[1][3] == pc[i+1] &&
          currentTestResults[0][4] == registerD[i] && currentTestResults[1][4] == registerD[i+1]
        ) {
          outString += 'Passed'
        } else {
          outString += 'Failed'
          failed++
        }
      } else {
        if (
          currentTestResults[0][0] == outM[i] && currentTestResults[1][0] == outM[i+1] &&
          currentTestResults[0][1] == writeM[i] && currentTestResults[1][1] == writeM[i+1] &&
          currentTestResults[0][2] == addressM[i] && currentTestResults[1][2] == addressM[i+1] &&
          currentTestResults[0][3] == pc[i] && currentTestResults[1][3] == pc[i+1] &&
          currentTestResults[0][4] == registerD[i] && currentTestResults[1][4] == registerD[i+1]
        ) {
          outString += 'Passed'
        } else {
          outString += 'Failed'
          failed++
        }
      }

      // To test only one output
      // if (i>=0 && i<21) {
      //
      //   currentTestResults[0][0] == outM[i] ? console.log('ok') : outM[i]=='*' ? console.log('ok') : console.log('fail')
      //   currentTestResults[1][0] == outM[i+1] ? console.log('ok') : outM[i+1]=='*' ? console.log('ok') : console.log('fail')
      //   currentTestResults[0][1] == writeM[i] ? console.log('ok') : console.log('fail')
      //   currentTestResults[1][1] == writeM[i+1] ? console.log('ok') : console.log('fail')
      //   currentTestResults[0][2] == addressM[i] ? console.log('ok') : console.log('fail')
      //   currentTestResults[1][2] == addressM[i+1] ? console.log('ok') : console.log('fail')
      //   currentTestResults[0][3] == pc[i] ? console.log('ok') : console.log('fail')
      //   currentTestResults[1][3] == pc[i+1] ? console.log('ok') : console.log('fail')
      //   currentTestResults[0][4] == registerD[i] ? console.log('ok') : console.log('fail')
      //   currentTestResults[1][4] == registerD[i+1] ? console.log('ok') : console.log('fail')
      //
      //   console.log('inM=' + inM[i].toString(2).padStart(16, '0') + ' instruction=' + instruction[i].toString(2).padStart(16, '0') + ' reset=' + reset[i])
      //   console.log('outM:          obtained ' + currentTestResults[0][0] +' <=> '+ outM[0] + ' expected')
      //   console.log('new outM:      obtained ' + currentTestResults[1][0] +' <=> '+ outM[i+1]+ ' expected')
      //   console.log('writeM:        obtained ' + currentTestResults[0][1] +' <=> '+ writeM[i] + ' expected')
      //   console.log('new writeM:    obtained ' + currentTestResults[1][1] +' <=> '+ writeM[i+1]+ ' expected')
      //   console.log('addressM:      obtained ' + currentTestResults[0][2] +' <=> '+ addressM[i] + ' expected')
      //   console.log('new addressM:  obtained ' + currentTestResults[1][2] +' <=> '+ addressM[i+1]+ ' expected')
      //   console.log('pc:            obtained ' + currentTestResults[0][3] +' <=> '+ pc[i] + ' expected')
      //   console.log('new pc:        obtained ' + currentTestResults[1][3] +' <=> '+ pc[i+1]+ ' expected')
      //   console.log('registerD:     obtained ' + currentTestResults[0][4] +' <=> '+ registerD[i] + ' expected')
      //   console.log('new registerD: obtained ' + currentTestResults[1][4] +' <=> '+ registerD[i+1]+ ' expected')
      // }

      if (verbose) console.log(outString)
    }

    console.log('Completed ' + nTests + ' functionality tests of which ' + failed + ' failed.')
    if (verbose) console.log('*** Functionality Test End ***')

    // SPEED TEST
    if (verbose) console.log('*** Speed Test Start ***')

    var repeat = 1000000, timeElapsed=0


    for(var j=0; j<repeat;j++) {
      if(j%100000==0) if (verbose) console.log('[Testing performance...]')
      var a = Math.floor(Math.random() * nTests);
      var b = Math.floor(Math.random() * nTests);
      var c = Math.floor(Math.random() * nTests);
      var start = performance.now()
      cpu.out(inM[a], instruction[b], reset[c])
      var end = performance.now()
      timeElapsed+=(end-start)
    }

    var msPerOperation = timeElapsed/repeat

    console.log('The CPU performance is ' + msPerOperation + 'ms/operation.' )
    if (verbose) console.log('*** Speed Test End ***')

    console.log('***** CPU TEST END ******')
  }
}
