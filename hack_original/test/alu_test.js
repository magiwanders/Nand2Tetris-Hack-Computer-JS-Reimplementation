class ALU_test {

  test(verbose) {
    console.log('***** ALU TEST START ******')

    // FUNCTIONALITY TEST
    var alu = new ALU()
    var x = [
      0b0000000000000000,
      0b0000000000000000,
      0b0000000000000000,
      0b0000000000000000,
      0b0000000000000000,
      0b0000000000000000,
      0b0000000000000000,
      0b0000000000000000,
      0b0000000000000000,
      0b0000000000000000,
      0b0000000000000000,
      0b0000000000000000,
      0b0000000000000000,
      0b0000000000000000,
      0b0000000000000000,
      0b0000000000000000,
      0b0000000000000000,
      0b0000000000000000,
      0b0000000000010001,
      0b0000000000010001,
      0b0000000000010001,
      0b0000000000010001,
      0b0000000000010001,
      0b0000000000010001,
      0b0000000000010001,
      0b0000000000010001,
      0b0000000000010001,
      0b0000000000010001,
      0b0000000000010001,
      0b0000000000010001,
      0b0000000000010001,
      0b0000000000010001,
      0b0000000000010001,
      0b0000000000010001,
      0b0000000000010001,
      0b0000000000010001
    ]
    var y = [
      0b1111111111111111,
      0b1111111111111111,
      0b1111111111111111,
      0b1111111111111111,
      0b1111111111111111,
      0b1111111111111111,
      0b1111111111111111,
      0b1111111111111111,
      0b1111111111111111,
      0b1111111111111111,
      0b1111111111111111,
      0b1111111111111111,
      0b1111111111111111,
      0b1111111111111111,
      0b1111111111111111,
      0b1111111111111111,
      0b1111111111111111,
      0b1111111111111111,
      0b0000000000000011,
      0b0000000000000011,
      0b0000000000000011,
      0b0000000000000011,
      0b0000000000000011,
      0b0000000000000011,
      0b0000000000000011,
      0b0000000000000011,
      0b0000000000000011,
      0b0000000000000011,
      0b0000000000000011,
      0b0000000000000011,
      0b0000000000000011,
      0b0000000000000011,
      0b0000000000000011,
      0b0000000000000011,
      0b0000000000000011,
      0b0000000000000011
    ]
    var comp = [
      0b101010,
      0b111111,
      0b111010,
      0b001100,
      0b110000,
      0b001101,
      0b110001,
      0b001111,
      0b110011,
      0b011111,
      0b110111,
      0b001110,
      0b110010,
      0b000010,
      0b010011,
      0b000111,
      0b000000,
      0b010101,
      0b101010,
      0b111111,
      0b111010,
      0b001100,
      0b110000,
      0b001101,
      0b110001,
      0b001111,
      0b110011,
      0b011111,
      0b110111,
      0b001110,
      0b110010,
      0b000010,
      0b010011,
      0b000111,
      0b000000,
      0b010101,
    ]
    var out = [
      0b0000000000000000,
      0b0000000000000001,
      0b1111111111111111,
      0b0000000000000000,
      0b1111111111111111,
      0b1111111111111111,
      0b0000000000000000,
      0b0000000000000000,
      0b0000000000000001,
      0b0000000000000001,
      0b0000000000000000,
      0b1111111111111111,
      0b1111111111111110,
      0b1111111111111111,
      0b0000000000000001,
      0b1111111111111111,
      0b0000000000000000,
      0b1111111111111111,
      0b0000000000000000,
      0b0000000000000001,
      0b1111111111111111,
      0b0000000000010001,
      0b0000000000000011,
      0b1111111111101110,
      0b1111111111111100,
      0b1111111111101111,
      0b1111111111111101,
      0b0000000000010010,
      0b0000000000000100,
      0b0000000000010000,
      0b0000000000000010,
      0b0000000000010100,
      0b0000000000001110,
      0b1111111111110010,
      0b0000000000000001,
      0b0000000000010011
    ]
    var zr = [
      1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ]
    var ng = [
      0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0
    ]

    var nTests = x.length

    if (verbose) console.log('*** Functionality Test Start ***')

    var failed=0

    for (var i=0; i<nTests; i++) {
      var outString = 'ALU Test ' + (i+1).toString().padStart(2, '0') + ': '

      var currentTestResults = alu.out(x[i], y[i], comp[i])

      if (currentTestResults[0] == out[i] && currentTestResults[1] == zr[i] && currentTestResults[2] == ng[i] ) {
        outString += 'Passed'
      } else {
        outString += 'Failed'
        failed++
      }

      // To test only one output
      // if (i==35) {
      //   console.log('x=' + x[i].toString(2) + ' y=' + y[i].toString(2) + ' comp=' + comp[i].toString(2))
      //   console.log('out: obtained ' + currentTestResults[0] +' <=> '+ out[i] +' expected')
      //   console.log('zr : obtained ' + currentTestResults[1] +' <=> '+ zr[i] +' expected')
      //   console.log('ng : obtained ' + currentTestResults[2] +' <=> '+ ng[i] +' expected')
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
      alu.out(x[a], y[b], comp[c])
      var end = performance.now()
      timeElapsed+=(end-start)
    }

    var msPerOperation = timeElapsed/repeat

    console.log('The ALU performance is ' + msPerOperation + 'ms/operation.' )
    if (verbose) console.log('*** Speed Test End ***')

    console.log('***** ALU TEST END ******')
  }

}
