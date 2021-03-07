class PC_test {

  test(verbose) {
    console.log('***** PC TEST START ******')

    var negVal = Default.complement2_16(-32123)

    // FUNCTIONALITY TEST
    var pc = new PC()
    var inn = [
      0b0000000000000000,
      0b0000000000000000,
      negVal,
      negVal,
      negVal,
      negVal,
      0b0011000000111001,
      0b0011000000111001,
      0b0011000000111001,
      0b0011000000111001,
      0b0011000000111001,
      0b0011000000111001,
      0b0000000000000000,
      0b0000000000000000,
      0b0101011011001110,
    ]
    var out = [
      0b0000000000000000,
      0b0000000000000000,
      0b0000000000000001,
      0b0000000000000010,
      negVal,
      negVal+1,
      negVal+2,
      0b0011000000111001,
      0b0000000000000000,
      0b0011000000111001,
      0b0000000000000000,
      0b0000000000000001,
      0b0000000000000000,
      0b0000000000000000,
      0b0000000000000001,
      0b0000000000000000,
    ]
    var reset = [
      0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1
    ]
    var load = [
      0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0
    ]
    var inc = [
      0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0
    ]

    var nTests = inn.length

    if (verbose) console.log('*** Functionality Test Start ***')

    var failed=0

    for (var i=0; i<nTests; i++) {
      var outString = 'PC Test ' + (i+1).toString().padStart(2, '0') + ': '

      var currentTestResults = pc.out(inn[i], reset[i], load[i], inc[i])

      if (currentTestResults[0] == out[i] && currentTestResults[1] == out[i+1] ) {
        outString += 'Passed'
      } else {
        outString += 'Failed'
        failed++
      }

      // To test only one output
      // if (i>=0) {
      //   console.log('in=' + inn[i].toString(2) + ' reset=' + reset[i] + ' load=' + load[i] + ' inc=' + inc[i])
      //   console.log('outOld: obtained ' + currentTestResults[0] +' <=> '+ out[i]+ ' expected')
      //   console.log('outNew: obtained ' + currentTestResults[1] +' <=> '+ out[i+1]+ ' expected')
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
      var d = Math.floor(Math.random() * nTests);
      var start = performance.now()
      pc.out(inn[a], reset[b], load[c], inc[d])
      var end = performance.now()
      timeElapsed+=(end-start)
    }

    var msPerOperation = timeElapsed/repeat

    console.log('The PC performance is ' + msPerOperation + 'ms/operation.' )
    if (verbose) console.log('*** Speed Test End ***')

    console.log('***** PC TEST END ******')
  }

}
